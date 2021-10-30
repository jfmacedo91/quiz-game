import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'

import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ theme }>
      <Component {...pageProps} />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default MyApp