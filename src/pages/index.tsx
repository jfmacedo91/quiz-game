import * as yup from "yup"
import Head from "next/head"
import NextLink from "next/link"
import { Button, Link, Stack, TextField, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import { useContext, useEffect } from "react"

import { QuestionsContext } from "../contexts/QuestionsContext"

import { theme } from "../styles/theme"

const validationSchema = yup.object().shape({
  amount: yup.number()
    .typeError("You must specify a number")
    .required("Inform the number of questions")
    .min(1, "You need to answer at least 1 question")
    .max(50, "You can answer a maximum of 50")
})

export default function Home() {
  const { changePastResult, clearStates , handleIndexSubmit, getOldResults, oldResults } = useContext(QuestionsContext)

  const formik = useFormik({
    onSubmit: handleIndexSubmit,
    validationSchema,
    initialValues: {
      amount: ""
    }
  })

  useEffect(() => {
    getOldResults()
    clearStates()
  }, [])

  return (
    <>
      <Head>
        <title>Quiz game</title>
      </Head>
      <Stack
        minHeight="100vh"
        padding={ 2 }
        alignItems="center"
        justifyContent="center"
        spacing={ 2 }
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
            Quiz game
          </Typography>
          <Typography variant="body1">
            How many questions would you like to answer?
          </Typography>
          <form onSubmit={ formik.handleSubmit }>
            <Stack direction="row" spacing={ 2 } alignItems="flex-start" justifyContent="center">
              <TextField
                id="amount"
                variant="standard"
                color="secondary"
                onChange={ formik.handleChange }
                value={ formik.values.amount }
                helperText={ formik.errors.amount }
                error={ !!formik.errors.amount }
              />
              <Button type="submit" variant="contained" color="secondary">
                send
              </Button>
            </Stack>
          </form>
        </Stack>
        { oldResults.length > 0 && (
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
              Past results
            </Typography>
            { oldResults.map((oldResult, index) => (
              <NextLink key={ `old_result_${ index }`} href="/past-result">
                <Link
                  href="#"
                  color={ theme.palette.text.primary }
                  onClick={ () => { changePastResult(oldResult) } }
                >
                  { oldResult.title }
                </Link>
              </NextLink>
            )) }
          </Stack>
        )}
      </Stack>
    </>
  )
}
