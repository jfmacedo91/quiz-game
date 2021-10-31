import Head from 'next/head'
import { Box } from '@material-ui/system'
import { Button, TextField, Tooltip, Typography } from '@material-ui/core'
import { useState } from 'react'

export default function Home() {
  const [amount, setAmount] = useState(0)

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
          borderRadius='20px'
          textAlign='center'
          padding='20px'
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
          <form>
            <Tooltip title='You can answer a maximum of 50 questions' arrow>
              <TextField
                variant='standard'
                type='number'
                color='secondary'
                sx={ {
                  width: '60px',
                  marginRight: '16px',
                  backgroundColor: '#FFF1'
                } }
                onChange={ (e) => { setAmount(Number(e.target.value)) } }
              />
            </Tooltip>
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
