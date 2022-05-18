import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>

        <Component {...pageProps} />

      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
