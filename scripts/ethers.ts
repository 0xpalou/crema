import { ethers, utils } from 'ethers'
// @ts-ignore
import omitDeep from 'omit-deep'

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together
// ts ingnore
export let provider = null as any
export const initProvider = () => {
  provider = (window as any).ethereum
    ? new ethers.providers.Web3Provider((window as any).ethereum)
    : null
}

export const getAddress = async () => {
  if ((window as any).ethereum) {
    const accounts = await (provider as any).send('eth_requestAccounts', [])
    return accounts[0]
  } else {
    return null
  }
}

export const getSigner = () => {
  return (provider as any).getSigner()
}

export const getAddressFromSigner = () => {
  return getSigner().address
}

export const signedTypeData = (domain: any, types: any, value: any) => {
  const signer = getSigner()
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(value, '__typename')
  )
}

export const splitSignature = (signature: any) => {
  return utils.splitSignature(signature)
}

export const signText = async (text: string) => {
  if (provider)
    return await (await (provider as any).getSigner()).signMessage(text)
  else return null
}
