import Head from "next/head"
import Link from "next/link"
import { Box } from "@material-ui/system"
import { Button, Stack, Typography } from "@material-ui/core"
import { useContext } from "react"

import { QuestionsContext } from "../contexts/QuestionsContext"
import { renderHTML } from "../utils/renderHTML"

export default function pastResult() {
  const { pastResult } = useContext(QuestionsContext)
  const totalHits = pastResult?.results.reduce((sum, result) => {
    if (result.isCorrect) return sum + 1
    return sum;
  }, 0)

  return (
    <>
      <Head>
        <title>Quiz game - Result</title>
      </Head>
      <Box
        minHeight="100vh"
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
          <Typography variant="h4" color="primary">
            Result
          </Typography>
          <Typography variant="body1" color="secondary">
            You got { totalHits } of { pastResult?.results.length } question{ pastResult?.results.length > 1 && "s" } right
          </Typography>
          { pastResult?.results.map((result, index) => {
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
            <Button color="secondary">Pagina Inicial</Button>
          </Link>
        </Stack>
      </Box>
    </>
  )
}