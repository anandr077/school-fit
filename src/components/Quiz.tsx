"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import MapBox from "./MapBox"
import { questions } from "../data/questions"
import QuizQuestion from "./QuizQuestion";

interface QuizProps {
  setQuizData: (data: any) => void
  selectedSchool:string
  setSelectedSchool:(selectedSchool:string) => void  
}

interface Answer {
  value: any
  weight: number
}


const Quiz: React.FC<QuizProps> = ({ setQuizData,selectedSchool,setSelectedSchool }) => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: Answer }>({})
  
  const [journey, setJourney] = useState("")

  const filteredQuestions = questions.filter(q => 
    q.journey === "all" || q.journey === journey
  )

  const handleAnswer = (questionId: string, value: any, weight: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { value, weight }
    }))
  
    console.log("answer", value)
    console.log(value === "I need help finding the right school and an area to live")

    if (questionId === "situation" && value === "I need help finding the right school and an area to live") {
      setJourney("journey2")
      console.log(journey)
    } else if (questionId === "situation" && value !== "I need help finding the right school and an area to live") {
      setJourney("journey1")
    }
  }
  const processQuizData = (data: { [key: string]: Answer }) => {
    return Object.entries(data).reduce((acc, [key, { value, weight }]) => ({
      ...acc,
      [key]: Array.isArray(value) ? value : [value], // Ensures it's an array
      weights: {
        ...acc.weights,
        [key]: weight
      }
    }), { weights: {} });
  };
  

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizData({ journey, ...answers })
      const processedData = processQuizData(answers)
      setQuizData(processedData)
      navigate("/results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const currentQuestionData = filteredQuestions[currentQuestion]

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl mt-4 ">
      <h2 className="text-2xl font-bold mb-4">{currentQuestionData.section}</h2>
      {currentQuestionData.type === "map" ? (
        <MapBox onLocationSelect={(location) => handleAnswer(currentQuestionData.id, location, currentQuestionData.weight?.defaultValue ?? 0.5)} />
      ) : (
        <QuizQuestion
        question={currentQuestionData}
        onAnswer={handleAnswer}
        answer={answers[currentQuestionData.id]?.value}
        weight={answers[currentQuestionData.id]?.weight}
        />
      )}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestionData.id]}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          {currentQuestion === filteredQuestions.length - 1 ? "Submit" : "Next"}
        </button>

        {currentQuestion === filteredQuestions.length - 1 && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2" htmlFor="selectedSchool">
              Please select one school you are interested in below:
            </label>
            <select
              id="selectedSchool"
              name="selectedSchool"
              className="block w-full px-3 py-2 text-base text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedSchool}
              onChange={(e) => handleAnswer("situation", e.target.value, 0.5)}
            >
              <option value="">Select one</option>
              {["Barker College", "Northern Beaches Christian School", "Pittwater House"].map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>
        )}
        

      </div>
    </div>
  )
}

export default Quiz
