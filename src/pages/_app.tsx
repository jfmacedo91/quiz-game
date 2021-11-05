import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import { QuestionsProvider } from '../contexts/QuestionsContext'

import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ theme }>
      <QuestionsProvider>
        <Component {...pageProps} />
        <CssBaseline />
      </QuestionsProvider>
    </ThemeProvider>
  )
}

export default MyApp