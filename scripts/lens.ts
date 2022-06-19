import { ethers } from 'ethers'
import {
  LENS_HUB_ABI,
  LENS_HUB_CONTRACT,
  LENS_PERIPHERY_ABI,
  LENS_PERIPHERY_CONTRACT,
} from './lens-config'
import { getSigner } from './ethers'

// lens contract info can all be found on the deployed
// contract address on polygon.
export let lensHub = null as any

export let lensPeriphery = null as any

export const initLens = () => {
  lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, getSigner())
  lensPeriphery = new ethers.Contract(
    LENS_PERIPHERY_CONTRACT,
    LENS_PERIPHERY_ABI,
    getSigner()
  )
}
