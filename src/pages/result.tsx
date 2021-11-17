import Head from "next/head"
import { Box } from "@material-ui/system"
import { Stack, Typography } from "@material-ui/core"
import { useContext } from "react"

import { QuestionsContext } from "../contexts/QuestionsContext"
import { Render } from "../utils/renderHTML"

export default function Result() {
  const { results } = useContext(QuestionsContext)

  return (
    <>
      <Head>
        <title>Quiz game - Result</title>
      </Head>
      <Box
        height="100vh"
        padding={ 2 }
        sx={ {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        } }
      >
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
          <Typography variant='h4' color='primary'>
            Result
          </Typography>
          { results.map((result, index) => {
            if(result.isCorrect) {
              return (
                <Stack width="100%" textAlign="left" spacing={ 1 }>
                  <Typography>{ index + 1 }: { Render.question(result.question) }</Typography>
                  <Typography color="primary">{ Render.answer(result.selectedAnswer) }</Typography>
                </Stack>
              )
            } else {
              return (
                <Stack width="100%" textAlign="left" spacing={ 1 }>
                <Typography>{ index + 1 }: { Render.question(result.question) }</Typography>
                  <Typography color="error">{ Render.answer(result.selectedAnswer) }</Typography>
                  <Typography color="primary">{ Render.answer(result.correct_answer) }</Typography>
                </Stack>
              )
            }
          }) }
        </Stack>
      </Box>
    </>
  )
}