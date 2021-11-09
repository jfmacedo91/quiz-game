import { Box } from "@material-ui/system"
import { useContext } from "react"

import { QuestionBox } from "../components/QuestionBox"

import { QuestionsContext } from "../contexts/QuestionsContext"

export default function Quiz() {
  const { questions } = useContext(QuestionsContext)

  const formattedQuestions = questions.map(question => {
    return {
      category: question.category,
      question: question.question,
      correct_answer: question.correct_answer,
      answers: [question.correct_answer, ...question.incorrect_answers].sort()
    }
  })

  console.log(formattedQuestions)

  return (
    <Box
      height="100vh"
      padding={ 2 }
      sx={ {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px"
      } }
    >
      { formattedQuestions.map((question, index) => (
        <QuestionBox key={`question__${ index }`} question={ question }/>
      )) }
    </Box>
  )
}