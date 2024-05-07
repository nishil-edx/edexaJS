import { ethers, ContractFactory } from 'ethers'
import { ERC20 } from './ERC20Class'
import { ERC721 } from './ERC721Class'
import { ERC1155 } from './ERC1155Class'
import { StableCoin } from './StableCoinClass'
import {
  erc20ArgType,
  erc721ArgType,
  erc1155ArgType,
  stableCoinArgType,
} from '../types/types'
import {
  erc1155Bytecode,
  erc721Bytecode,
  erc20Bytecode1,
  erc20Bytecode2,
  stableCoinByteCode,
} from '../bytecode/byteCode'
import erc20Abi from '../abi/ERC20-Abi.json'
import erc721Abi from '../abi/ERC721-Abi.json'
import erc1155Abi from '../abi/ERC1155-Abi.json'
import stableCoinAbi from '../abi/StableCoin.json'
import publicResolver from '../abi/publicResolver.json'
import { RPC_URL,resolverAddress,TLD } from '../constants'


export class EdexaClient {
  //signers

  /**
   * Create an ERC20 contract using the provided arguments and signer.
   * @param {erc20ArgType} arg - Arguments for creating the ERC20 contract.
   * @param {ethers.Wallet} signer - The signer to authorize the deployment.
   * @returns {ethers.Contract} The deployed ERC20 contract.
   **/
  async createContractERC20(arg: erc20ArgType, signer: ethers.Wallet) {
    let factory
    let contract
    if (arg.supply == undefined) {
      factory = new ContractFactory(erc20Abi, erc20Bytecode1, signer)
      contract = await factory.deploy(arg.name, arg.symbol, 0)
    } else {
      factory = new ContractFactory(erc20Abi, erc20Bytecode2, signer)
      contract = await factory.deploy(arg.name, arg.symbol, arg.supply)
    }
    return contract
  }

  /**
   * Create an ERC721 contract using the provided arguments and signer.
   * @param {erc721ArgType} arg - Arguments for creating the ERC721 contract.
   * @param {ethers.Wallet} signer - The signer to authorize the deployment.
   * @returns {ethers.Contract} The deployed ERC721 contract.
   **/
  async createContractERC721(arg: erc721ArgType, signer: ethers.Wallet) {
    const factory = new ContractFactory(erc721Abi, erc721Bytecode, signer)
    const contract = await factory.deploy(arg.name, arg.symbol)
    return contract
  }

  /**
   * Create an ERC1155 contract using the provided arguments and signer.
   * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
   * @param {ethers.Wallet} signer - The signer to authorize the deployment.
   * @returns {ethers.Contract} The deployed ERC1155 contract.
   **/
  async createContractERC1155(arg: erc1155ArgType, signer: ethers.Wallet) {
    const factory = new ContractFactory(erc1155Abi, erc1155Bytecode, signer)
    const contract = await factory.deploy(arg.uri)
    return contract
  }

  /**
   * Create an ERC1155 contract using the provided arguments and signer.
   * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
   * @param {ethers.Wallet} signer - The signer to authorize the deployment.
   * @returns {ethers.Contract} The deployed ERC1155 contract.
   **/
  async createContractStableCoin(
    arg: stableCoinArgType,
    signer: ethers.Wallet,
  ) {
    const factory = new ContractFactory(
      stableCoinAbi,
      stableCoinByteCode,
      signer,
    )

    const contract = await factory.deploy(arg.name, arg.symbol, arg.supply)
    return contract
  }

  /**
   * Create an ERC1155 contract using the provided arguments and signer.
   * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
   * @param {ethers.Wallet} signer - The signer to authorize the deployment.
   * @returns {ethers.Contract} The deployed ERC1155 contract.
   **/

  /**
   * Create a signer using a private key and provider URL.
   * @param {string} pvtKey - The private key to create the signer.
   * @returns {ethers.Wallet} The signer object.
   **/
  createWalletSigner(pvtKey: string): ethers.Wallet {
    const wallet = new ethers.Wallet(pvtKey)
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
    let signer = wallet.connect(provider)
    return signer
  }

  // ERC contracts

  /**
   * Get an instance of the ERC20 contract.
   * @param {string} address - The address of the ERC20 contract.
   * @param {string} rpc - The RPC URL (default is "RPC_URL ").
   * @returns {ERC20} An instance of the ERC20 contract.
   **/
  getERC20Instance(address: string, rpc: string = RPC_URL) {
    return new ERC20(address, rpc)
  }

  /**
   * Get an instance of the ERC721 contract.
   * @param {string} address - The address of the ERC721 contract.
   * @param {string} rpc - The RPC URL (default is "RPC_URL ").
   * @returns {ERC721} An instance of the ERC721 contract.
   **/
  getERC721Instance(address: string, rpc: string = RPC_URL) {
    return new ERC721(address, rpc)
  }

  /**
   * Get an instance of the ERC1155 contract.
   * @param {string} address - The address of the ERC1155 contract.
   * @param {string} rpc - The RPC URL (default is "RPC_URL ").
   * @returns {ERC1155} An instance of the ERC1155 contract.
   **/
  getERC1155Instance(address: string, rpc: string = RPC_URL) {
    return new ERC1155(address, rpc)
  }

  getStableCoinInstance(address: string, rpc: string = RPC_URL) {
    return new StableCoin(address, rpc)
  }

  async resolveAddr(input: string) {                //0x.. adress string input
    try {
      // Check if the input is a valid Ethereum address
      if (ethers.utils.isAddress(input)) {
       
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
        const reverseName = `${input.slice(2)}.addr.reverse`;
        const node = ethers.utils.namehash(reverseName);
        const resolverContract_ = new ethers.Contract(resolverAddress, publicResolver.abi, provider);
        const ensName_ = await resolverContract_.name(node);
        if (ensName_) {
          return ensName_;
        } else {
          return "address is not associated with any ENS name";
        }
        
      } else {
        return "input is not an address";
        
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`)
    }
  }
  async resolveName(input: string) {                  //name string input
    try {
     
      if (input.endsWith(TLD) && input.split(".")[0].length >= 4) {
        // If it's a valid ens name format trying to resolve it
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
        const node = ethers.utils.namehash(input);
        const resolverContract_ = new ethers.Contract(resolverAddress, publicResolver.abi, provider);
        let owner = await resolverContract_['addr(bytes32)'](node);
   
        if (owner !== ethers.constants.AddressZero) {
          return owner;
        } else {
          return "This ENS name is not registered";
        }
        
      } else {
        return(`Wrong ens name format. Min 4 char & Name must end with '.edx' example: myname.edx`)
      
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`)
    }
  }
}
