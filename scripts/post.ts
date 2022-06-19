import { apolloClient } from './apollo-client'
import { gql } from '@apollo/client/core'
import { signedTypeData, getAddressFromSigner, splitSignature } from './ethers'
import { lensHub } from './lens'
import { PROFILE_ID } from './lens-config'

export default async (contentURI: string, accessToken: string) => {
  // hard coded to make the code example clear
  const createPostRequest = {
    profileId: PROFILE_ID,
    contentURI: contentURI,
    collectModule: {
      revertCollectModule: true,
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  }

  const result = await createPostTypedData(createPostRequest, accessToken)
  console.log(result)
  const typedData = result.data.createPostTypedData.typedData

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  )
  const { v, r, s } = splitSignature(signature)

  console.log(lensHub)
  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  })
  console.log(tx.hash)
  return tx
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here:
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
}

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) {
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
   }
 }
`

export const createPostTypedData = (
  createPostTypedDataRequest: any,
  accessToken: string
) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    context: {
      headers: {
        'x-access-token': `Bearer ${accessToken}`,
      },
    },
    variables: {
      request: createPostTypedDataRequest,
    },
  })
}
