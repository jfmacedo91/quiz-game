import { Button } from "@material-ui/core"
import { Box } from "@material-ui/system"
import { createElement, useContext } from "react"

import { QuestionsContext } from "../contexts/QuestionsContext"

export default function Quiz() {
  const { questions } = useContext(QuestionsContext)

  function renderQuestion(HTML: string) {
    return createElement("h2", { dangerouslySetInnerHTML: { __html: HTML } })
  }

  function renderAnswer(HTML: string) {
    return createElement("p", { dangerouslySetInnerHTML: { __html: HTML } })
  }

  const formattedQuestion = questions.map(question => {
    return {
      category: question.category,
      question: question.question,
      correct_answer: question.correct_answer,
      answers: [question.correct_answer, ...question.incorrect_answers].sort()
    }
  })

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
      { formattedQuestion.map(question => (
        <Box
          key={ question.question }
          width="100%"
          maxWidth="700px"
          bgcolor="#FFF1"
          textAlign="center"
          paddingX={ 2 }
          paddingY={ 4 }
        >
          { renderQuestion(question.question) }
          <Box
            sx={ {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px"
            } }
          >
            { question.answers.map(answer => (
              <Button key={ answer }>{ renderAnswer(answer) }</Button>
            )) }
          </Box>
        </Box>
    )) }
    </Box>
  )
}