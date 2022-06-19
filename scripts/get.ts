import { apolloClient } from './apollo-client'
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { PROFILE_ID } from './lens-config'
import { gql } from '@apollo/client'

const GET_PUBLICATION = `
  query($request: PublicationQueryRequest!) {
    publication(request: $request) {
        __typename
        ... on Post {
          ...PostFields
        }
    }
  }

  fragment MediaFields on Media {
    url
    mimeType
  }

  fragment PublicationStatsFields on PublicationStats {
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    image
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }


  fragment PostFields on Post {
    id
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    appId
  }
`

export default async (publicationId: string) => {
  return apolloClient.query({
    query: gql(GET_PUBLICATION),
    variables: {
      request: {
        publicationId,
      },
    },
  })
}
