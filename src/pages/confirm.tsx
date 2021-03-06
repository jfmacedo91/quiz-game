import Head from "next/head"
import Link from "next/link"
import { useContext } from "react"
import { Box } from "@material-ui/system"
import { Button, Stack, Typography } from "@material-ui/core"

import { QuestionsContext } from "../contexts/QuestionsContext"

export default function Confirm() {
  const { amount } = useContext(QuestionsContext)
  return (
    <>
      <Head>
        <title>Quiz game - Comfirm</title>
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
          <Typography variant="h4">
            Would you like to answer { amount } questions?
          </Typography>
          <Stack direction='row' spacing={ 2 } justifyContent='center'>
            <Link href="/quiz">
              <Button variant="contained" color="success">
                Start
              </Button>
            </Link>
            <Link href="/">
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}