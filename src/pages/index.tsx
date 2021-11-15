import * as yup from 'yup'
import Head from 'next/head'
import { Box } from '@material-ui/system'
import { Button, Stack, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { QuestionsContext } from '../contexts/QuestionsContext'

const validationSchema = yup.object().shape({
  amount: yup.number()
    .typeError('You must specify a number')
    .required('Inform the number of questions')
    .min(1, 'You need to answer at least 1 question')
    .max(50, 'You can answer a maximum of 50')
})

export default function Home() {
  const { submit } = useContext(QuestionsContext)

  const formik = useFormik({
    onSubmit: submit,
    validationSchema,
    initialValues: {
      amount: ''
    }
  })

  return (
    <>
      <Head>
        <title>Quiz game</title>
      </Head>
      <Box
        height='100vh'
        padding={ 2 }
        sx={ {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
            Quiz game
          </Typography>
          <Typography variant='body1'>
            How many questions would you like to answer?
          </Typography>
          <form onSubmit={ formik.handleSubmit }>
            <Stack direction='row' spacing={ 2 } justifyContent='center'>
              <TextField
                id='amount'
                variant='standard'
                color='secondary'
                onChange={ formik.handleChange }
                value={ formik.values.amount }
                helperText={ formik.errors.amount }
                error={ !!formik.errors.amount }
              />
              <Button type='submit' variant='contained' color='secondary'>
                send
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </>
  )
}
