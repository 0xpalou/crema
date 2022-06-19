import fs from 'fs'
import path from 'path'

import fileLensHub from './abis/lens-hub-contract-abi'
import fileLensPeriphery from './abis/lens-periphery-data-provider'
import fileFollowNFT from './abis/lens-follow-nft-contract-abi'

const getParamOrExit = (name: string) => {
  console.log(process.env)
  const param = process.env[name]
  if (!param) {
    console.error(`Required config param '${name}' missing`)
    process.exit(1)
  }
  return param
}

const getParam = (name: string) => {
  console.log(process.env)
  const param = process.env[name]
  if (!param) {
    return null
  }
  return param
}

export const argsBespokeInit = () => {
  return process.argv.find((c) => c === '--init') !== undefined
}

//export const PK = getParamOrExit('PK')

export const MUMBAI_RPC_URL = 'https://polygon-rpc.com/'

export const LENS_HUB_CONTRACT = '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d'

export const LENS_PERIPHERY_CONTRACT =
  '0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f'

export const LENS_PERIPHERY_NAME = 'LensPeriphery'

export const PROFILE_ID = '0x2C8B'

export const LENS_FOLLOW_NFT_ABI = fileFollowNFT

export const LENS_HUB_ABI = fileLensHub

export const LENS_PERIPHERY_ABI = fileLensPeriphery
