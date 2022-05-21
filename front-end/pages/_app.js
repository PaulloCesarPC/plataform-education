import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'
import { AuthProvider } from '../Contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>


      <ChakraProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>

    </QueryClientProvider>
  )
}

export default MyApp
