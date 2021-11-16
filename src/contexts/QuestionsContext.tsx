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

type QuestionsConstextData = {
  amount: number
  handleIndexSubmit: ({ amount }) => void
  handleQuizSubmit: () => void
  question: Question
  questionIndex: number
  totalQuestions: number
}

export const QuestionsContext = createContext<QuestionsConstextData>({} as QuestionsConstextData)

export function QuestionsProvider({ children }: QuestionsContextProps) {
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [questions, setQuestions] = useState([])
  const [result, setResult] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const totalQuestions = questions.length

  useEffect(() => {
    api.get(`api.php?amount=${ amount }`).then(response => setQuestions(response.data.results))
  }, [amount])

  function handleIndexSubmit({ amount }) {
    setAmount(amount)
    router.push("/confirm")
  }

  function handleQuizSubmit() {
    const nextQuestion = questionIndex + 1
    if(nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion)
    } else {
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
      totalQuestions
    } }>
      { children }
    </QuestionsContext.Provider>
  )
}