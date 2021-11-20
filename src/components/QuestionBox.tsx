import { ChangeEvent, createElement, FormEvent, useContext, useState } from "react"
import { Button, Chip, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack, Typography } from "@material-ui/core"

import { QuestionsContext } from "../contexts/QuestionsContext"
import { renderHTML } from "../utils/renderHTML"

import { theme } from "../styles/theme"

type QuestionProps = {
  answers: string[]
  category: string
  correct_answer: string
  question: string
  totalQuestions: number
  questionIndex: number
}

export function QuestionBox({
  answers,
  category,
  correct_answer,
  question,
  questionIndex,
  totalQuestions
}: QuestionProps) {
  const { handleQuizSubmit } = useContext(QuestionsContext)
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState(" ")
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const hasAnswerSelected = selectedAnswer !== ""

  function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedAnswer((event.target as HTMLInputElement).value);
    setHelperText(" ");
  }

  function handleAnswerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if(selectedAnswer === correct_answer) {
      setHelperText("You got it!")
      setError(false)
      setTimeout(() => {
        handleQuizSubmit({
          question,
          selectedAnswer,
          isCorrect: true
        })
        setError(false)
        setHelperText(" ")
        setSelectedAnswer("")
      }, 2000)
    } else {
      setHelperText("Sorry, wrong answer!")
      setError(true)
      setTimeout(() => {
        handleQuizSubmit({
          correct_answer,
          question,
          selectedAnswer,
          isCorrect: false
        })
        setError(false)
        setHelperText(" ")
        setSelectedAnswer("")
      }, 2000)
    }
  }

  return (
    <Stack
      width="100%"
      maxWidth="700px"
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
        { renderHTML(question) }
      </Typography>
      <form onSubmit={ handleAnswerSubmit }>
        <FormControl
          component="fieldset"
          error={ error }
          sx={ {
            alignItems: "center"
          } }
        >
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value={ selectedAnswer }
            onChange={ handleRadioChange }
          >
            { answers?.map((answer, index) => (
              <FormControlLabel
                key={ `answer${ index }` }
                value={ answer }
                control={ <Radio color="secondary" sx={ { color: theme.palette.secondary.main } } /> }
                label={ renderHTML(answer) }
              />
            )) }
          </RadioGroup>
          <FormHelperText sx={ {
            fontSize: '1rem',
            color: theme.palette.success.main
          } }>
            { helperText }
          </FormHelperText>
          <Button
            variant="contained"
            type="submit"
            disabled={ !hasAnswerSelected }
            sx={ {
              mt:2,
            } }
          >
            Confirm
          </Button>
        </FormControl>
      </form>
    </Stack>
  )
}