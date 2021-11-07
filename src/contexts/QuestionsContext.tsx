import { useRouter } from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"

import { api } from "../services/api"

type QuestionsContextProps = {
  children: ReactNode
}

type Question = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

type QuestionsConstextData = {
  amount: number
  questions: Question[]
  submit: ({ amount }) => void
}

export const QuestionsContext = createContext<QuestionsConstextData>({} as QuestionsConstextData)

export function QuestionsProvider({ children }: QuestionsContextProps) {
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    api.get(`api.php?amount=${ amount }`).then(response => setQuestions(response.data.results))
  }, [amount])

  function submit({ amount }) {
    setAmount(amount)
    router.push("/confirm")
  }

  return (
    <QuestionsContext.Provider value={ { amount, questions, submit } }>
      { children }
    </QuestionsContext.Provider>
  )
}