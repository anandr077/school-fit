import React from "react"
import { useState, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { useNavigate } from "react-router-dom"
import { cn } from "../lib/utils"

interface ResultsProps {
  quizData: any
}

interface SchoolRecommendation {
  name: string
  url: string
  justification: string
}

const Results: React.FC<ResultsProps> = ({ quizData }) => {
  const [recommendations, setRecommendations] = useState<SchoolRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [retrying, setRetrying] = useState(false)
  const navigate = useNavigate()


  const cleanAndParseJSON = (text: string) => {
    // Remove any markdown formatting or backticks
    let cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    try {
      return JSON.parse(cleanText)
    } catch (e) {
      console.error("First JSON parse attempt failed:", e)
      
      // Try to find JSON-like structure within the text
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0])
        } catch (e) {
          console.error("Second JSON parse attempt failed:", e)
          throw new Error("Could not parse JSON response")
        }
      }
      throw new Error("No JSON structure found in response")
    }
  }
  const generateRecommendations = async () => {
    setLoading(true)
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

      const { location, schoolType, schoolSector, religiousAffiliation, gender, schoolSize, academicResults, 
              specialRequirements, tuitionFees, extraCurricularActivities, facilities, specialistSubjects, 
              languagesTaught, distanceToTrainStation, distanceToBeach, weights } = quizData

      const weightedAttributes = [
        { key: "Academic Performance", value: academicResults, weight: weights?.academicResults || 1 },
        { key: "Tuition Fees", value: tuitionFees?.join(", "), weight: weights?.tuitionFees || 1 },
        { key: "Special Requirements", value: specialRequirements?.join(", "), weight: weights?.specialRequirements || 1 },
        { key: "Facilities", value: facilities?.join(", "), weight: weights?.facilities || 0.5 },
        { key: "Extra Curricular Activities", value: extraCurricularActivities?.join(", "), weight: weights?.extraCurricularActivities || 0.5 },
        { key: "Distance to Train Station", value: distanceToTrainStation, weight: weights?.distanceToTrainStation || 0.5 },
        { key: "Distance to Beach", value: distanceToBeach, weight: weights?.distanceToBeach || 1 }
      ]

      const sortedAttributes = weightedAttributes
        .filter(attr => attr.weight > 0)
        .sort((a, b) => b.weight - a.weight)

      const weightedDescriptions = sortedAttributes.map(attr => {
        if (attr.weight > 0.7) return `**Highly important:** ${attr.key} - ${attr.value}`
        if (attr.weight > 0.4) return `**Preferred:** ${attr.key} - ${attr.value}`
        return `**Nice to have:** ${attr.key} - ${attr.value}`
      }).join("\n")

      const prompt = `
      You are a school recommendation system. The user has provided specific criteria and weightage for selecting a ${schoolType} school in ${location.address}. Instead of searching for schools, your task is to justify why *Barker College* is the best match for the user’s preferences.
    
      SCHOOL REQUIREMENTS:
      - Type: ${schoolSector} school
      - Religious Affiliation: ${religiousAffiliation?.join(", ")}
      - Gender: ${gender?.join(", ")}
      - Size: ${schoolSize?.join(", ")}
    
      PREFERENCES & WEIGHTAGE (in order of importance):
      ${weightedDescriptions}
    
      RESPONSE INSTRUCTIONS:
      1. Write a **100-word explanation** highlighting how *Barker College* aligns with the user’s requirements and preferences.
      2. Focus on the strongest matches based on user-provided weightage.
      3. Keep the response **objective, structured, and persuasive**.
      4. Format the response **only** as a JSON object without any extra text or markdown.
      5. Use this exact structure:
    
      {
        "recommendation": {
          "name": "Barker College",
          "url": "https://www.barker.college",
          "justification": "A compelling 100-word explanation of why Barker College is the best match based on user inputs."
        }
      }
    `.trim();
    
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      console.log("text response", text)
      const cleanText = text.replace(/^```json\s+|\s*```$/g, ''); // Remove wrapping ```json and ```
      const data = JSON.parse(cleanText); // Direct parsing
      if (!data.recommendation) {
        throw new Error("Invalid response format: Missing recommendation field");
      }
      setRecommendations([data.recommendation]); // Convert object to array
    } catch (error) {
      console.error("Error fetching results:", error)
      setRecommendations([{
        name: "Error",
        url: "#",
        justification: "An error occurred while fetching recommendations. Please try again."
      }])
    } finally {
      setLoading(false)
      setRetrying(false)
    }
  }

  useEffect(() => {
    generateRecommendations()
  }, [quizData])

  const handleRetry = async () => {
    setRetrying(true)
    await generateRecommendations()
  }

  const handleEditPreferences = () => {
    navigate('/quiz', { state: { previousData: quizData } })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Your Perfect School Match</h2>
          <div className="flex space-x-4">
  {/* Try Again Button */}
  <button 
    onClick={handleRetry}
    disabled={retrying}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200",
      retrying 
        ? "bg-gray-400 cursor-not-allowed"  // Disabled state
        : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
    )}
  >
    {retrying ? (
      <>
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"></path>
        </svg>
        Generating...
      </>
    ) : "Try Again"}
  </button>

  {/* Edit Preferences Button */}
  <button 
    onClick={handleEditPreferences}
    className="px-4 py-2 rounded-lg border border-blue-500 text-blue-500 font-medium transition-all duration-200
               hover:bg-blue-500 hover:text-white active:bg-blue-600"
  >
    Edit Preferences
  </button>
</div>

        </div>

        <div className="grid gap-6">
          {recommendations.map((recommendation, index) => (
            <Card key={index} className="transform transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle>
                  <a 
                    href={recommendation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {recommendation.name}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {recommendation.justification}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Results