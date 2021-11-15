import Head from "next/head"
import { Box } from "@material-ui/system"
import { Button, Stack, Typography } from "@material-ui/core"

export default function Result() {
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
            Resultado
          </Typography>
        </Stack>
      </Box>
    </>
  )
}