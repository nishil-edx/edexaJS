import { ethers } from 'ethers'
import abi from '../abi/ERC721-Abi.json'
import { resolveENSOrReturnAddress } from '../utils/resolve'

export interface ERC721Interface {
  rpc: string
  provider: ethers.providers.JsonRpcProvider
  address: string
}

export class ERC721 implements ERC721Interface {
  address: string
  rpc: string
  provider: any

  constructor(address: string, rpc: string) {
    this.address = address
    this.rpc = rpc
    this.provider = new ethers.providers.JsonRpcProvider(rpc)
  }

  //helper functions

  // Create a read-only contract instance
  getContractInstance() {
    try {
      let contract = new ethers.Contract(this.address, abi, this.provider)
      return contract
    } catch (error) {
      throw error
    }
  }

  // Create a contract instance for actions (requires a signer)
  getActionContractInstance(signer: any) {
    try {
      let contract = new ethers.Contract(this.address, abi, signer)
      return contract
    } catch (error) {
      throw error
    }
  }

  //read function

  /**
   * Fetch the balance of an address.
   * @param {string} userAddress - The address of the user.
   * @returns {string} The balance of the user as a string.
   **/
  async getBalance(userAddress: string) {
    try {
      userAddress = await resolveENSOrReturnAddress(userAddress)
      let contract = this.getContractInstance()
      let res = await contract.balanceOf(userAddress)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Fetch the approved address for a token ID.
   * @param {string} id - The token ID.
   * @returns {string} The approved address as a string.
   **/
  async getApproved(id: string) {
    try {
      let contract = this.getContractInstance()
      let res = await contract.getApproved(id)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Fetch the owner of a token ID.
   * @param {string} id - The token ID.
   * @returns {string} The owner's address as a string.
   **/
  async ownerOf(id: string) {
    try {
      let contract = this.getContractInstance()
      let res = await contract.ownerOf(id)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Fetch the URI of a token ID.
   * @param {string} id - The token ID.
   * @returns {string} The token's URI as a string.
   **/
  async tokenURI(id: string) {
    try {
      let contract = this.getContractInstance()
      let res = await contract.tokenURI(id)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  //action function

  /**
   * Burn tokens with a specific ID.
   * @param {string} id - The ID of the tokens to burn.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   */
  async burn(id: string, signer: ethers.Wallet) {
    try {
      let contract = this.getActionContractInstance(signer)
      let res = await contract.burn(id)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Pause the contract.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   */
  async pause(signer: ethers.Wallet) {
    try {
      let contract = this.getActionContractInstance(signer)
      let res = await contract.pause()
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Renounce ownership of the contract.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   */
  async renounceOwnership(signer: ethers.Wallet) {
    try {
      let contract = this.getActionContractInstance(signer)
      let res = await contract.renounceOwnership()
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Transfer ownership of the contract to a new address.
   * @param {string} to - The address to which ownership will be transferred.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   */
  async transferOwnership(to: string, signer: ethers.Wallet) {
    try {
      to = await resolveENSOrReturnAddress(to)

      let contract = this.getActionContractInstance(signer)
      let res = await contract.transferOwnership(to)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Unpause the contract.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   */
  async unpause(signer: ethers.Wallet) {
    try {
      let contract = this.getActionContractInstance(signer)
      let res = await contract.unpause()
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Mint a new token to a user's address with a specified URI.
   * @param {string} userAddress - The user's address.
   * @param {string} uri - The URI for the token.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   **/
  async safeMint(userAddress: string, uri: string, signer: ethers.Wallet) {
    try {
      userAddress = await resolveENSOrReturnAddress(userAddress)

      let contract = this.getActionContractInstance(signer)
      let res = await contract.safeMint(userAddress, uri)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Approve an address to spend a specific token.
   * @param {string} userAddress - Your address.
   * @param {string} id - The token ID to approve.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   **/
  async approve(userAddress: string, id: string, signer: ethers.Wallet) {
    try {
      userAddress = await resolveENSOrReturnAddress(userAddress)

      let contract = this.getActionContractInstance(signer)
      let res = await contract.approve(userAddress, id)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Safely transfer a token from one address to another.
   * @param {string} from - The address to transfer from.
   * @param {string} to - The address to transfer to.
   * @param {string} id - The token ID to transfer.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   **/
  async safeTransferFrom(
    from: string,
    to: string,
    id: string,
    signer: ethers.Wallet,
  ) {
    try {
      from = await resolveENSOrReturnAddress(from)
      to = await resolveENSOrReturnAddress(to)

      let contract = this.getActionContractInstance(signer)
      let res = await contract.transferFrom(from, to, id)
      return res.toString()
    } catch (error) {
      throw error
    }
  }
}
