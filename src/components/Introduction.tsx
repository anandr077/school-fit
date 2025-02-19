import type React from "react"
import { Link } from "react-router-dom"

const Introduction: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Ed Scout Quiz: Finding Your School Fit</h1>
      <p className="mb-2">Trying to figure out what school is right for your family?</p>
      <p className="mb-2">Choosing a school can be overwhelming.</p>
      <p className="mb-2">Thankfully, we're here to help.</p>
      <p className="mb-4">Take our quiz to begin your search and find the right school for your child.</p>
      <p className="mb-4 font-italic">
        Note: If you have children with different needs or preferences and are willing to send your children to
        different schools, please complete the quiz separately for each child.
      </p>
      <Link to="/quiz" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Start Quiz
      </Link>
    </div>
  )
}

export default Introduction

