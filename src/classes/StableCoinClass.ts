// Import necessary modules and dependencies
import { ethers } from 'ethers'
import abi from '../abi/StableCoin.json'
import { resolveENSOrReturnAddress } from '../utils/resolve'

// Define the interface for the StableCoin
export interface StableCoinInterface {
  rpc: string
  address: string
  provider: ethers.providers.JsonRpcProvider
}

// Implement the StableCoin class based on the defined interface
export class StableCoin implements StableCoinInterface {
  address: string
  rpc: string
  provider: ethers.providers.JsonRpcProvider

  // Constructor for the StableCoin class
  constructor(address: string, rpc: string) {
    this.address = address
    this.rpc = rpc
    this.provider = new ethers.providers.JsonRpcProvider(rpc)
  }

  // Helper functions

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
  getActionContractInstance(signer: ethers.Wallet) {
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
   * Fetch the allowance for a spender on behalf of an owner.
   * @param {string} owner - The owner's address.
   * @param {string} spender - The spender's address.
   * @returns {string} The allowance amount as a string.
   **/
  async getAllowance(owner: string, spender: string) {
    try {
      owner = await resolveENSOrReturnAddress(owner)
      spender = await resolveENSOrReturnAddress(spender)

      let contract = this.getContractInstance()
      let res = await contract.allowance(owner, spender)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  //action function
  /**
   * Burn a specific amount of tokens.
   * @param {string} amount - The amount of tokens to burn.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   */
  async burn(amount: string, signer: ethers.Wallet) {
    try {
      let contract = this.getActionContractInstance(signer)
      let res = await contract.burn(amount)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Burn a specific amount of tokens from a specific address.
   * @param {string} from - The address from which to burn tokens.
   * @param {string} amount - The amount of tokens to burn.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   */
  async burnFrom(from: string, amount: string, signer: ethers.Wallet) {
    try {
      from = await resolveENSOrReturnAddress(from)

      let contract = this.getActionContractInstance(signer)
      let res = await contract.burnFrom(from, amount)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Mint a specific amount of tokens and send them to a recipient.
   * @param {string} to - The address to which tokens will be minted.
   * @param {string} amount - The amount of tokens to mint.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   */
  async mint(to: string, amount: string, signer: any) {
    try {
      to = await resolveENSOrReturnAddress(to)
      let contract = this.getActionContractInstance(signer)
      let res = await contract.mint(to, amount)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Pause the contract.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
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
   * Unpause the contract.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
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
   * Renounce ownership of the contract.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
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
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
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
   * Approve a spender to spend a specific amount on your behalf.
   * @param {string} userAddress - Your address.
   * @param {string} amount - The amount to approve.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   **/
  async approve(userAddress: string, amount: string, signer: ethers.Wallet) {
    try {
      userAddress = await resolveENSOrReturnAddress(userAddress)

      let contract = this.getActionContractInstance(signer)
      let res = await contract.approve(userAddress, amount)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Transfer a specific amount to a recipient.
   * @param {string} userAddress - Your address.
   * @param {string} amount - The amount to transfer.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   **/
  async transfer(userAddress: string, amount: string, signer: ethers.Wallet) {
    try {
      userAddress = await resolveENSOrReturnAddress(userAddress)

      let contract = this.getActionContractInstance(signer)
      let res = await contract.transfer(userAddress, amount)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  /**
   * Transfer a specific amount from one address to another.
   * @param {string} from - The address to transfer from.
   * @param {string} to - The address to transfer to.
   * @param {string} amount - The amount to transfer.
   * @param { ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result as a string.
   **/
  async transferFrom(
    from: string,
    to: string,
    amount: string,
    signer: ethers.Wallet,
  ) {
    try {
      from = await resolveENSOrReturnAddress(from)
      to = await resolveENSOrReturnAddress(to)
      let contract = this.getActionContractInstance(signer)
      let res = await contract.transferFrom(from, to, amount)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  // Blacklist functions

  /**
   * Add an account to the blacklist.
   * @param {string} _account - The address to add to the blacklist.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result.
   */
  async addToBlacklist(_account: string, signer: ethers.Wallet) {
    _account = await resolveENSOrReturnAddress(_account)
    let contract = this.getActionContractInstance(signer)
    let res = await contract.addToBlacklist(_account)
    return res.toString()
  }

  /**
   * Remove an account from the blacklist.
   * @param {string} _account - The address to remove from the blacklist.
   * @param {ethers.Wallet} signer - The signer to authorize the transaction.
   * @returns {string} The transaction result.
   */
  async removeFromBlacklist(_account: string, signer: ethers.Wallet) {
    _account = await resolveENSOrReturnAddress(_account)
    let contract = this.getActionContractInstance(signer)
    let res = await contract.removeFromBlacklist(_account)
    return res.toString()
  }
}
