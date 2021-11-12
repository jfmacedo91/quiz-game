import { Box } from "@material-ui/system"
import { useContext, useState } from "react"

import { QuestionBox } from "../components/QuestionBox"

import { QuestionsContext } from "../contexts/QuestionsContext"

export default function Quiz() {
  const { questions } = useContext(QuestionsContext)
  const totalQuestion = questions.length
  const [questionIndex, setQuestionIndex] = useState(0)
  const [screenStates, setScreenStates] = useState("QUIZ")
  const [result, setResult] = useState([])
  
  const formattedQuestions = questions.map(question => {
    return {
      category: question.category,
      question: question.question,
      correct_answer: question.correct_answer,
      answers: [question.correct_answer, ...question.incorrect_answers].sort()
    }
  })
  
  const question = formattedQuestions[questionIndex]

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
        key={`question__${ questionIndex }`}
        answers={ question.answers }
        category={ question.category }
        correct_answer={ question.correct_answer }
        question={ question.question }
      />
    </Box>
  )
}