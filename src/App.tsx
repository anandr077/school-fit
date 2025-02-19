"use client"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Introduction from "./components/Introduction"
import Quiz from "./components/Quiz"
import Results from "./components/Results"

const App = () => {
  const [quizData, setQuizData] = useState({})

  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-100 flex justify-center ">
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/quiz" element={<Quiz setQuizData={setQuizData} />} />
          <Route path="/results" element={<Results quizData={quizData} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App