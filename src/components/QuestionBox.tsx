import { createElement } from "react"
import { Button, Chip, Stack, Typography } from "@material-ui/core"

type QuestionProps = {
  answers: string[]
  category: string
  correct_answer: string
  question: string
  totalQuestions: number
  questionIndex: number
  onSubmit: () => void
}

export function QuestionBox({
  answers,
  category,
  correct_answer,
  question,
  questionIndex,
  totalQuestions,
  onSubmit
}: QuestionProps) {
  function renderQuestion(HTML: string) {
    return createElement("span", { dangerouslySetInnerHTML: { __html: HTML } })
  }

  function renderAnswer(HTML: string) {
    return createElement("span", { dangerouslySetInnerHTML: { __html: HTML } })
  }

  return (
    <Stack
      width="100%"
      maxWidth="500px"
      bgcolor="#FFFFFF03"
      textAlign="center"
      padding={ 4 }
      border="1px solid #FFFFFF09"
      borderRadius="4px"
      spacing={ 4 }
    >
      <Stack
        spacing={ 2 }
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" color="primary">
          { `Question ${ questionIndex + 1 } of ${ totalQuestions }` }
        </Typography>
        <Chip label={ category } color="warning" size="small"/>
      </Stack>
      <Typography variant="h5">
        { renderQuestion(question) }
      </Typography>
      <Stack spacing={ 1 }>
        { answers.map((answer, index) => (
          <Button key={ `answer__${ index }` } variant="outlined" color="secondary">
            { renderAnswer(answer) }
          </Button>
        )) }
      </Stack>
      <Button variant="contained" onClick={ onSubmit }>Confirm</Button>
    </Stack>
  )
}