import { apolloClient } from './apollo-client'
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { PROFILE_ID } from './lens-config'
import { gql } from '@apollo/client'

const GET_PUBLICATIONS = `
  query($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        __typename
        ... on Post {
          ...PostFields
        }
      }
    }
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    image
  }

  fragment PostFields on Post {
    id
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    appId
  }

`

export default async () => {
  return apolloClient.query({
    query: gql(GET_PUBLICATIONS),
    variables: {
      request: {
        profileId: PROFILE_ID,
        publicationTypes: ['POST'],
        sources: ['crema'],
      },
    },
  })
}
