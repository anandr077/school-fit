// types.ts
export interface QuestionWeight {
  label: string
  defaultValue?: number
}

export interface Question {
  id: string
  section: string
  text: string
  type: "radio" | "checkbox" | "map" | "select"
  options?: string[]
  journey?: "all" | "journey1" | "journey2"
  dependsOn?: {
    question: string
    value: string
  }
  weight?: QuestionWeight
}
  export const questions: Question[] = [
    // Section 1: Your Situation
    {
      id: "situation",
      section: "Section 1: Your Situation",
      text: "What best describes your situation?",
      type: "radio",
      options: [
        "I'm not planning to move; I just want to find the best school in my current location",
        "I need help finding the right school and an area to live",
      ],
      journey: "all",
    },
  
    // Section 2: Housing Requirements (Journey 2 only)
    {
      id: "bedrooms",
      section: "Section 2: Housing Requirements",
      text: "How many bedrooms do you need?",
      type: "checkbox",
      options: ["Any", "1", "2", "3", "4", "5+"],
      journey: "journey2",
    },
    {
      id: "houseType",
      section: "Section 2: Housing Requirements",
      text: "Would you prefer a house or a unit?",
      type: "radio",
      options: ["House", "Unit", "No preference"],
      journey: "journey2",
    },
    {
      id: "housingIntentions",
      section: "Section 2: Housing Requirements",
      text: "Are you planning to buy or rent?",
      type: "radio",
      options: ["Buy", "Rent", "Rent first, then buy"],
      journey: "journey2",
    },
    {
      id: "priceBuy",
      section: "Section 2: Housing Requirements",
      text: "What is your budget for purchasing a home (AUD)?",
      type: "radio",
      options: [
        "Less than $500,000",
        "Less than $1 million",
        "Less than $1.5 million",
        "Less than $2 million",
        "Less than $3 million",
        "Less than $4 million",
        "Less than $5 million",
        "More than $5 million",
      ],
      journey: "journey2",
      dependsOn: {
        question: "housingIntentions",
        value: "Buy",
      },
    },
    {
      id: "priceRent",
      section: "Section 2: Housing Requirements",
      text: "What is the approximate weekly rent you're willing to pay?",
      type: "radio",
      options: [
        "Less than $500",
        "Less than $750",
        "Less than $1,000",
        "Less than $1,500",
        "Less than $2,000",
        "Less than $3,000",
        "More than $3,000",
      ],
      journey: "journey2",
      dependsOn: {
        question: "housingIntentions",
        value: "Rent",
      },
    },
  
    // Section 3: School Requirements (Both Journeys)
    {
      id: "schoolType",
      section: "Section 3: School Requirements",
      text: "What type of school are you looking for?",
      type: "radio",
      options: ["Primary", "Secondary", "Special"],
      journey: "all",
    },
    {
      id: "schoolSector",
      section: "Section 3: School Requirements",
      text: "Which school sectors are you considering?",
      type: "radio",
      options: ["Government", "Independent", "Open to all options"],
      journey: "all",
    },
    {
      id: "religiousAffiliation",
      section: "Section 3: School Requirements",
      text: "Would you like the school to align with a particular religion?",
      type: "checkbox",
      options: [
        "Non Denominational",
        "No preference",
        "Catholic",
        "Roman Catholic",
        "Anglican",
        "Jewish",
        "Islamic",
        "Christian",
        "Bahai",
      ],
      journey: "all",
    },
    {
      id: "gender",
      section: "Section 3: School Requirements",
      text: "What is your preference for the school's gender composition?",
      type: "checkbox",
      options: ["Co-educational", "All girls", "All boys"],
      journey: "all",
    },
    {
      id: "schoolSize",
      section: "Section 3: School Requirements",
      text: "What school size do you think is the best fit for your child?",
      type: "checkbox",
      options: ["Small (under 500 students)", "Medium (500-1000 students)", "Large (1000+ students)", "No preference"],
      journey: "all",
    },
    {
      id: "academicResults",
      section: "Section 3: School Requirements",
      text: "How important is a school's academic ranking to you?",
      type: "radio",
      options: ["Must be a top performer nationally", "Must be a top performer in the state", "No ranking preference"],
      journey: "all",
    },
    {
      id: "specialRequirements",
      section: "Section 3: School Requirements",
      text: "Are there any additional requirements that are essential to you?",
      type: "checkbox",
      options: [
        "International Baccalaureate (IB) Program",
        "Boarding",
        "Steiner",
        "Montessori",
        "Gifted and Talented Programs Available",
        "Inclusive Learning Support Programs Available (Special Needs)",
      ],
      journey: "all",
    },
    {
      id: "tuitionFees",
      section: "Section 3: School Requirements",
      text: "What is your preferred tuition fee range?",
      type: "checkbox",
      options: [
        "No tuition fees (public schooling)",
        "Lower (under $7,000/year)",
        "Moderate ($7,000 - $20,000/year)",
        "High ($20,000+ /year)",
        "Flexible",
      ],
      journey: "all",
    },
    {
      id: "extraCurricularActivities",
      section: "Section 3: School Requirements",
      text: "Which extra-curricular activities are important to you?",
      type: "checkbox",
      options: ["Sports", "Music", "Drama", "Debating", "Art"],
      journey: "all",
    },
    {
      id: "facilities",
      section: "Section 3: School Requirements",
      text: "Which facilities are important to you?",
      type: "checkbox",
      options: ["Library", "Science Labs", "Sporting Facilities", "Performing Arts Center", "Technology Labs"],
      journey: "all",
    },
    {
      id: "specialistSubjects",
      section: "Section 3: School Requirements",
      text: "Which specialist subjects are important to you?",
      type: "checkbox",
      options: ["STEM", "Arts", "Languages", "Music", "Sports"],
      journey: "all",
    },
    {
      id: "languagesTaught",
      section: "Section 3: School Requirements",
      text: "Which languages would you like the school to teach?",
      type: "checkbox",
      options: ["French", "German", "Japanese", "Mandarin", "Spanish"],
      journey: "all",
    },
    {
      id: "distanceToTrainStation",
      section: "Section 3: School Requirements",
      text: "What is your preferred maximum distance to a train station?",
      type: "radio",
      options: ["Within 500m", "Within 1km", "Within 2km", "No preference"],
      journey: "all",
    },
    {
      id: "distanceToBeach",
      section: "Section 3: School Requirements",
      text: "What is your preferred maximum distance to a beach?",
      type: "radio",
      options: ["Within 1km", "Within 2km", "Within 5km", "No preference"],
      journey: "all",
    },
  ]
  
  