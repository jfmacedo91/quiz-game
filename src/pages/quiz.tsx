import Head from "next/head"
import { Box } from "@material-ui/system"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

import { QuestionBox } from "../components/QuestionBox"

import { QuestionsContext } from "../contexts/QuestionsContext"

export default function Quiz() {
  const { question, questionIndex, totalQuestions } = useContext(QuestionsContext)
  const router = useRouter()

  useEffect(() => {
    if(question === undefined)
      router.push("/")
  }, [])

  return (
    <>
      <Head>
        <title>Quiz game - questions</title>
      </Head>
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
          answers={ question?.answers }
          category={ question?.category }
          correct_answer={ question?.correct_answer }
          question={ question?.question }
          questionIndex={ questionIndex }
          totalQuestions={ totalQuestions }
        />
      </Box>
    </>
  )
}