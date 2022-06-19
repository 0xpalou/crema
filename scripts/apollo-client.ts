import fetch from 'cross-fetch'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client/core'

const APIURL = 'https://api.lens.dev/'
const httpLink = new HttpLink({ uri: APIURL, fetch })

export let apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export const authenticateClient = (token: string) => {
  const authLink = new ApolloLink((operation, forward) => {
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        'x-access-token': token ? `Bearer ${token}` : '',
      },
    })

    // Call the next link in the middleware chain.
    return forward(operation)
  })

  apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
