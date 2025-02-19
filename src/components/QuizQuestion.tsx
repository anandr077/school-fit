// QuizQuestion.tsx
import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Question } from '../data/questions'
import WeightSlider from './WeightSlider'

interface QuizQuestionProps {
  question: Question
  onAnswer: (questionId: string, answer: any, weight: number) => void
  answer?: any
  weight?: number
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  answer,
  weight: initialWeight = 0.5

}) => {
  const [currentWeight, setCurrentWeight] = useState(initialWeight)

  const handleAnswerChange = (newAnswer: any) => {
    onAnswer(question.id, newAnswer, currentWeight)
  }

  const handleWeightChange = (newWeight: number) => {
    setCurrentWeight(newWeight)
    onAnswer(question.id, answer, newWeight)
  }

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-4">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={option}
                  name={question.id}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor={option} className="ml-2">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )
      case 'checkbox':
        return (
          <div className="space-y-4">
            {question.options?.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={(e) => {
                    const newAnswer = Array.isArray(answer) ? [...answer] : []
                    if (e.target.checked) {
                      newAnswer.push(option)
                    } else {
                      const index = newAnswer.indexOf(option)
                      if (index > -1) {
                        newAnswer.splice(index, 1)
                      }
                    }
                    handleAnswerChange(newAnswer)
                  }}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor={option} className="ml-2">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )
      case 'select':
        return (
          <select
            value={answer || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderQuestionContent()}
        <WeightSlider
          label={question.weight?.label}
          value={currentWeight}
          onChange={handleWeightChange}
        />
      </CardContent>
    </Card>
  )
}

export default QuizQuestion