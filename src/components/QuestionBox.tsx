import { ChangeEvent, createElement, useState } from "react"
import { Button, Chip, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack, Typography } from "@material-ui/core"

import { theme } from "../styles/theme"

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
  const [value, setValue] = useState('');
  const [helperText, setHelperText] = useState('Choose wisely');

  function renderQuestion(HTML: string) {
    return createElement("span", { dangerouslySetInnerHTML: { __html: HTML } })
  }

  function renderAnswer(HTML: string) {
    return createElement("span", { dangerouslySetInnerHTML: { __html: HTML } })
  }

  function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
    setValue((event.target as HTMLInputElement).value);
    setHelperText('');
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
        { renderQuestion(question) }
      </Typography>
      <RadioGroup
        aria-label="quiz"
        name="quiz"
        value={ value }
        onChange={ handleRadioChange }
      >
        { answers?.map((answer, index) => (
          <FormControlLabel
            key={ `answer${ index }` }
            value={ answer }
            control={ <Radio color="secondary" sx={ { color: theme.palette.secondary.main } } /> }
            label={ renderAnswer(answer) }
          />
        )) }
      </RadioGroup>
      <FormHelperText>{ helperText }</FormHelperText>
      <Button variant="contained" onClick={ onSubmit }>Confirm</Button>
    </Stack>
  )
}