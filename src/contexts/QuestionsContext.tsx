import { useRouter } from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"

import { api } from "../services/api"

type QuestionsContextProps = {
  children: ReactNode
}

type Question = {
  answers: string[]
  category: string
  correct_answer: string
  question: string
}

type Result = {
  correct_answer?: string
  isCorrect: boolean
  question: string
  selectedAnswer: string
}

type QuestionsConstextData = {
  amount: number
  handleIndexSubmit: ({ amount }) => void
  handleQuizSubmit: ({ correct_answer, isCorrect, question, selectedAnswer }: Result) => void
  question: Question
  questionIndex: number
  results: Result[]
  totalQuestions: number
}

export const QuestionsContext = createContext<QuestionsConstextData>({} as QuestionsConstextData)

export function QuestionsProvider({ children }: QuestionsContextProps) {
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [questions, setQuestions] = useState([])
  const [results, setResults] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const totalQuestions = questions.length

  useEffect(() => {
    api.get(`api.php?amount=${ amount }`).then(response => setQuestions(response.data.results))
  }, [amount])

  function handleIndexSubmit({ amount }) {
    setAmount(0)
    setQuestions([])
    setResults([])
    setQuestionIndex(0)
    setAmount(amount)
    router.push("/confirm")
  }

  function handleQuizSubmit({
    correct_answer,
    isCorrect,
    question,
    selectedAnswer
  }) {
    const nextQuestion = questionIndex + 1
    if(nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion)
      setResults([
        ...results,
        { correct_answer, isCorrect, question, selectedAnswer }
      ])
    } else {
      setResults([
        ...results,
        { correct_answer, isCorrect, question, selectedAnswer }
      ])
      router.push("/result")
    }
  }
  
  const formattedQuestions = questions.map(question => {
    return {
      answers: [question.correct_answer, ...question.incorrect_answers].sort(),
      category: question.category,
      correct_answer: question.correct_answer,
      question: question.question
    }
  })
  
  const question = formattedQuestions[questionIndex]

  return (
    <QuestionsContext.Provider value={ {
      amount,
      handleIndexSubmit,
      handleQuizSubmit,
      question,
      questionIndex,
      results,
      totalQuestions
    } }>
      { children }
    </QuestionsContext.Provider>
  )
}