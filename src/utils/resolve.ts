import { ethers } from 'ethers'
import ensAbi from '../abi/ENS.json'
import { RPC_URL } from '../constants'

export async function resolveENSOrReturnAddress(
  input: string,
): Promise<string> {
  try {
    // Check if the input is a valid Ethereum address
    if (ethers.utils.isAddress(input)) {
      return input
    } else {
      // If it's not a valid address, try to resolve it through ENS
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
      const ens = new ethers.Contract(
        '0x0cc23341aacFc90B1582d965943d1f10D94638Cf',
        ensAbi,
        provider,
      )

      // Resolve the ENS domain to an Ethereum address
      const detailsObject = await ens.getDomainInfo(input)

      if (detailsObject) {
        if (
          detailsObject.resolver == '0x0000000000000000000000000000000000000000'
        )
          throw new Error(`ENS Not Registered for ${input}`)
        else return detailsObject.resolver
      } else {
        throw new Error(`ENS resolution failed for ${input}`)
      }
    }
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`)
  }
}
