import { format } from "date-fns"
import { enUS } from "date-fns/locale"
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

type OldResult = {
  title: string
  results: Result[]
}

type QuestionsConstextData = {
  addOldResults: (results: Result[]) => void
  amount: number
  changePastResult: (oldResult: OldResult) => void
  clearStates: () => void
  getOldResults: () => void
  handleIndexSubmit: ({ amount }) => void
  handleQuizSubmit: ({ correct_answer, isCorrect, question, selectedAnswer }: Result) => void
  localStorageSave: () => void
  pastResult: OldResult
  question: Question
  questionIndex: number
  results: Result[]
  oldResults: OldResult[]
  totalQuestions: number
}

export const QuestionsContext = createContext<QuestionsConstextData>({} as QuestionsConstextData)

export function QuestionsProvider({ children }: QuestionsContextProps) {
  const router = useRouter()
  const [amount, setAmount] = useState(0)
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [oldResults, setOldResults] = useState([])
  const [pastResult, setPastResult] = useState<OldResult>()
  const [results, setResults] = useState([])
  const totalQuestions = questions.length

  useEffect(() => {
    api.get(`api.php?amount=${ amount }`).then(response => setQuestions(response.data.results))
  }, [amount])

  function addOldResults(results: Result[]) {
    if(results.length === 0) {
      getOldResults()
      return
    } else {
      setOldResults([
        { title: format(
          new Date(),
          "'Result of ' PP' at 'pp", {
            locale: enUS
          }
          ), results },
          ...oldResults
      ])
    }
  }

  function changePastResult(oldResult: OldResult) {
    setPastResult(oldResult)
  }

  function clearStates() {
    setAmount(0)
    setQuestions([])
    setResults([])
    setQuestionIndex(0)
  }

  function handleIndexSubmit({ amount }) {
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
      setResults([
        ...results,
        { correct_answer, isCorrect, question, selectedAnswer }
      ])
      setQuestionIndex(nextQuestion)
    } else {
      setResults([
        ...results,
        { correct_answer, isCorrect, question, selectedAnswer }
      ])
      router.push("/result")
    }
  }

  function getOldResults() {
    const response = localStorage.old_results
    if(response === undefined) {
      return
    } else {
      const results = JSON.parse(response)
      setOldResults(results)
    }
  }

  function localStorageSave() {
    localStorage.setItem('old_results', JSON.stringify(oldResults))
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
      addOldResults,
      amount,
      changePastResult,
      clearStates,
      getOldResults,
      handleIndexSubmit,
      handleQuizSubmit,
      localStorageSave,
      pastResult,
      question,
      questionIndex,
      results,
      oldResults,
      totalQuestions
    } }>
      { children }
    </QuestionsContext.Provider>
  )
}