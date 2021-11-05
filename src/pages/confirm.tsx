import Head from "next/head"
import Link from "next/link"
import { useContext } from "react"
import { Box } from "@material-ui/system"
import { Button, Typography } from "@material-ui/core"

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
        <Box
          width="100%"
          maxWidth="700px"
          bgcolor="#FFF1"
          textAlign="center"
          paddingX={ 2 }
          paddingY={ 4 }
        >
          <Typography
            variant="h4"
            mb={ 2 }
            fontWeight="500"
          >
            Would you like to answer { amount } questions?
          </Typography>
          <Link href="/quiz">
            <Button variant="contained" color="success">
              Start
            </Button>
          </Link>
          <Link href="/">
            <Button variant="contained" color="error" sx={ { marginLeft: "20px" } }>
              Cancel
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  )
}