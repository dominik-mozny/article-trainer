import React from 'react';
import * as actions from '../../actions/index'

describe('addQuestionForm', () => {
    it('should create action to add a question form', () => {
        const question = {
            id: 'some ID',
            question: 'some question',
            possibleAnswers: 'possibleAnswers'
        }
        const expectedAction = {
            type: 'ADD_QUESTION_FORM',
            id: question.id,
            question: question.question,
            possibleAnswers: question.possibleAnswers
        }
        expect(actions.addQuestionForm(question)).toEqual(expectedAction)
    })
})

describe('replaceQuestionForm', () => {
    it('should create action to replace a question form', () => {
        const atbResToUserAnswer = {
            questionId: 'some ID',
            nextQuestion: 'some question'
        }
        const expectedAction = {
            type: 'REPLACE_QUESTION_FORM',
            previousId: atbResToUserAnswer.questionId,
            nextQuestion: atbResToUserAnswer.nextQuestion
        }
        expect(actions.replaceQuestionForm(atbResToUserAnswer)).toEqual(expectedAction)
    })
})

describe('addRightAnswer', () => {
    it('should create action to add rightAnswer', () => {
        const atbResToUserAnswer = {
            questionId: 'some ID',
            userAnswerResult: 'some user answer result',
            statisticsAnswers: 'some statistics',
            nextQuestion: 'some question'
        }
        const expectedAction = {
            type: 'ADD_RIGHT_ANSWER',
            questionId: atbResToUserAnswer.questionId,
            userAnswerResult: atbResToUserAnswer.userAnswerResult,
            statisticsAnswers: atbResToUserAnswer.statisticsAnswers,
            nextQuestion: atbResToUserAnswer.nextQuestion
        }
        expect(actions.addRightAnswer(atbResToUserAnswer)).toEqual(expectedAction)
    })
})

describe('removeRightAnswer', () => {
    it('should create action to remove rightAnswer', () => {
        const atbResToUserAnswer = {
            questionId: 'some ID',
        }
        const expectedAction = {
            type: 'REMOVE_RIGHT_ANSWER',
            questionId: atbResToUserAnswer.questionId,
        }
        expect(actions.removeRightAnswer(atbResToUserAnswer)).toEqual(expectedAction)
    })
})

