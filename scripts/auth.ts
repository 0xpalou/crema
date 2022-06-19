import { gql } from '@apollo/client/core'
import { apolloClient, authenticateClient } from './apollo-client'
import { getAddress, signText } from './ethers'

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`
const generateChallenge = (address: string) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  })
}

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

const authenticate = (address: string, signature: string) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  })
}

export default () => {
  return new Promise((resolve, reject) => {
    getAddress().then((address) => {
      generateChallenge(address).then((challengeResponse) => {
        signText(challengeResponse.data.challenge.text)
          .then((signature) => {
            authenticate(address, signature).then((accessTokens) => {
              console.log(accessTokens)
              authenticateClient(accessTokens.data.authenticate.accessToken)
              resolve({
                address: address,
                accessToken: accessTokens.data.authenticate.accessToken,
                refreshToken: accessTokens.data.authenticate.refreshToken,
              })
            })
          })
          .catch((error) => {
            reject()
          })
      })
    })
    return
  })
}
