import Head from 'next/head'
import { Box } from '@material-ui/system'
import { Typography } from '@material-ui/core'

export default function Home() {
  return (
    <Box
      height="100vh"
      bgcolor="#202024"
      sx={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      } }
    >
      <Head>
        <title>Quiz game</title>
      </Head>
      <Typography variant='h2' color='primary'>Quiz game</Typography>
    </Box>
  )
}
