import Head from "next/head"
import Link from "next/link"
import { Box } from "@material-ui/system"
import { Button, Stack, Typography } from "@material-ui/core"
import { useContext, useEffect } from "react"

import { QuestionsContext } from "../contexts/QuestionsContext"
import { renderHTML } from "../utils/renderHTML"

export default function Result() {
  const { addOldResults, localStorageSave, results } = useContext(QuestionsContext)
  const totalHits = results.reduce((sum, result) => {
    if (result.isCorrect) return sum + 1
    return sum;
  }, 0)

  useEffect(() => {
    addOldResults(results)
  }, [])

  useEffect(() => {
    localStorageSave()
  })

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
          alignItems: "flex-start",
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
          <Typography variant="h4" color="primary">
            Result
          </Typography>
          <Typography variant="body1" color="secondary">
            You got { totalHits } of { results.length } question{ results.length > 1 && "s" } right
          </Typography>
          { results.map((result, index) => {
            if(result.isCorrect) {
              return (
                <Stack key={ `result_${index}` } width="100%" textAlign="left" spacing={ 1 }>
                  <Typography variant="body1">{ index + 1 }: { renderHTML(result.question) }</Typography>
                  <Typography variant="body2" color="primary">{ renderHTML(result.selectedAnswer) }</Typography>
                </Stack>
              )
            } else {
              return (
                <Stack key={ `result_${index}` } width="100%" textAlign="left" spacing={ 1 }>
                  <Typography variant="body1">{ index + 1 }: { renderHTML(result.question) }</Typography>
                  <Typography variant="body2" color="error">{ renderHTML(result.selectedAnswer) }</Typography>
                  <Typography variant="body2" color="primary">{ renderHTML(result.correct_answer) }</Typography>
                </Stack>
              )
            }
          }) }
          <Link href="/">
            <Button>Pagina Inicial</Button>
          </Link>
        </Stack>
      </Box>
    </>
  )
}