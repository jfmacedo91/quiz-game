import { Box } from "@material-ui/system"
import { useRouter } from "next/router"
import { useContext, useState } from "react"

import { QuestionBox } from "../components/QuestionBox"

import { QuestionsContext } from "../contexts/QuestionsContext"

export default function Quiz() {
  const { questions } = useContext(QuestionsContext)
  const totalQuestions = questions.length
  const [questionIndex, setQuestionIndex] = useState(0)
  const [result, setResult] = useState([])
  const router = useRouter()
  
  const formattedQuestions = questions.map(question => {
    return {
      category: question.category,
      question: question.question,
      correct_answer: question.correct_answer,
      answers: [question.correct_answer, ...question.incorrect_answers].sort()
    }
  })
  
  const question = formattedQuestions[questionIndex]

  function handleQuizSubmit() {
    const nextQuestion = questionIndex + 1
    if(nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion)
    } else {
      router.push("/result")
    }
  }

  return (
    <Box
      height="100vh"
      padding={ 2 }
      sx={ {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px"
      } }
    >
      <QuestionBox
        answers={ question.answers }
        category={ question.category }
        correct_answer={ question.correct_answer }
        question={ question.question }
        questionIndex={ questionIndex }
        totalQuestions={ totalQuestions }
        onSubmit={ handleQuizSubmit }
      />
    </Box>
  )
}