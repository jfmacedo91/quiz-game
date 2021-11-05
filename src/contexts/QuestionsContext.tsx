import { useRouter } from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/api"

type QuestionsContextProps = {
  children: ReactNode
}

type QuestionsConstextData = {
  amount: number
  questions: string[]
  submit: ({ amount }) => void
}

export const QuestionsContext = createContext<QuestionsConstextData>({} as QuestionsConstextData)

export function QuestionsProvider({ children }: QuestionsContextProps) {
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    api.get("amount=10").then(response => setQuestions(response.data.results))
  }, [])

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