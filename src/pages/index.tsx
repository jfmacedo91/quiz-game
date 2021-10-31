import Head from 'next/head'
import { Box } from '@material-ui/system'
import { Button, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  amount: yup.number()
    .typeError('You must specify a number')
    .required('Inform the number of questions')
    .min(1, 'You need to answer at least 1 question')
    .max(50, 'You can answer a maximum of 50')
})

function submit(values: any) {
  console.log(values)
}

export default function Home() {
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
        <Box
          width='100%'
          maxWidth='700px'
          bgcolor='#FFF1'
          textAlign='center'
          paddingX={ 2 }
          paddingY={ 4 }
        >
          <Typography
            variant='h3'
            mb={ 2 }
            fontWeight='500'
            color='primary'
          >
            Quiz game
          </Typography>
          <Typography
            variant='body1'
            mb={ 2 }
            fontWeight='400'
          >
            How many questions would you like to answer?
          </Typography>
          <form onSubmit={ formik.handleSubmit }>
            <TextField
              id='amount'
              variant='standard'
              color='secondary'
              onChange={ formik.handleChange }
              value={ formik.values.amount }
              helperText={ formik.errors.amount }
              error={ !!formik.errors.amount }
              sx={ {
                marginRight: '16px'
              } }
            />
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              size='small'
            >
              Ok
            </Button>
          </form>
        </Box>
      </Box>
    </>
  )
}
