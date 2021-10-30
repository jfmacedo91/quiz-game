import Head from 'next/head'
import { Box } from '@material-ui/system'
import { Typography } from '@material-ui/core'

export default function Home() {
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
          <Typography variant='h2' fontWeight='500'>Quiz game</Typography>
        </Box>
      </Box>
    </>
  )
}
