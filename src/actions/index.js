import {articleQuestionsToJson} from "../logic/FileContentToJson";
import {BACKEND, WAIT_BEFORE_NEW_QUESTION_IN_MS} from "../constants/staticConfiguration";
import {
    ADD_QUESTION_FORM,
    ADD_RIGHT_ANSWER_WITH_STATS,
    REMOVE_RIGHT_ANSWER_WITH_STATS,
    REPLACE_QUESTION_FORM,
    UPDATE_CONFIG_STATUS
} from "../constants/actionTypes";
import {QUESTION_FORMS, USER_ANSWER} from "../constants/urls";

export const addQuestionForm = (questionForm) => ({
    type: ADD_QUESTION_FORM,
    id: questionForm.id,
    question: questionForm.question,
    possibleAnswers: questionForm.possibleAnswers
})

export const replaceQuestionForm = (atbResToUserAnswer) => ({
    type: REPLACE_QUESTION_FORM,
    previousId: atbResToUserAnswer.questionId,
    nextQuestion: atbResToUserAnswer.nextQuestion
})

export const addRightAnswerWithStats = (atbResToUserAnswer) => ({
    type: ADD_RIGHT_ANSWER_WITH_STATS,
    questionId: atbResToUserAnswer.questionId,
    userAnswerResult: atbResToUserAnswer.userAnswerResult,
    statisticsAnswers: atbResToUserAnswer.statisticsAnswers,
    nextQuestion: atbResToUserAnswer.nextQuestion
})

export const removeRightAnswerWithStats = (atbResToUserAnswer) => ({
    type: REMOVE_RIGHT_ANSWER_WITH_STATS,
    questionId: atbResToUserAnswer.questionId
})

export const updateConfigStatus = (status) => ({
    type: UPDATE_CONFIG_STATUS,
    status: status
})

export const fetchQuestionForms = () => dispatch => {
    return fetch(QUESTION_FORMS)
        .then(response => response.json())
        .then(json => {
            json.questionForms.map((q) => dispatch(addQuestionForm(q)))
        })
        .catch(e => alert(e.toString()))
}

export const sendUserAnswer = (questionId, answer) => dispatch => {
    return fetch(USER_ANSWER, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            questionId: questionId,
            answer: answer,
        })
    })
        .then(response => response.json())
        .then(json => {
            dispatch(addRightAnswerWithStats(json))
            setTimeout(() => dispatch(replaceQuestionForm(json)), WAIT_BEFORE_NEW_QUESTION_IN_MS)
            setTimeout(() => dispatch(removeRightAnswerWithStats(json)), WAIT_BEFORE_NEW_QUESTION_IN_MS)
        })
        .catch(e => alert("Problem huston"))
}

export const addAllQuestions = (event) => dispatch => {
    const reader = new FileReader()
    reader.onload = (e) => {
        const fileContentAsJson = articleQuestionsToJson(e.target.result);
        fetch(BACKEND + 'initFrQuestions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: fileContentAsJson
        })
            .then(response => response.json())
            .catch(e => alert("Problem huston: " + e.toString()))
    }
    reader.readAsText(event.target.files[0])
}
