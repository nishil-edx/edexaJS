import { EdexaClient } from '../src/index'
import chai, { expect } from 'chai'

var assert = require('assert')

require('dotenv').config()

describe('ERC20 Tests', function () {
  it('Create/Deploy New Contract', async function () {
    let edexaclient = new EdexaClient()
    let signer = await edexaclient.createWalletSigner(
      //@ts-ignore
      process.env.PRIVATE_KEY,
    )
    let arg = {
      name: 'gautam',
      symbol: 'gau',
    }
    let tx = await edexaclient.createContractERC20(arg, signer)
    expect(tx.address).to.not.equal(undefined)
  })

  it('Mint Token and Check Balance', async function () {
    let edexaclient = new EdexaClient()
    let signer = await edexaclient.createWalletSigner(
      //@ts-ignore
      process.env.PRIVATE_KEY,
    )
    let ERC20 = await edexaclient.getERC20Instance(
      '0x884aed749F7e58eDcA48F1953BFe23C8dbAC4e15',
    )

    let preBalance = await ERC20.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
    )

    await ERC20.mint(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      '100',
      signer,
    )

    //waiting for 2 sec since block is getting processed..
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let postBalance = await ERC20.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
    )

    let expectBalance = Number(preBalance) + 100
    expect(Number(expectBalance)).to.equal(Number(postBalance))
  })

  it('Token Transfer Testing', async function () {
    let edexaclient = new EdexaClient()
    let signer = await edexaclient.createWalletSigner(
      //@ts-ignore
      process.env.PRIVATE_KEY,
    )
    let ERC20 = await edexaclient.getERC20Instance(
      '0x884aed749F7e58eDcA48F1953BFe23C8dbAC4e15',
    )

    let preBalance = await ERC20.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
    )

    await ERC20.mint(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      '100',
      signer,
    )

    //waiting for 2 sec since block is getting processed..
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let postBalance = await ERC20.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
    )

    let expectBalance = Number(preBalance) + 100
    expect(Number(expectBalance)).to.equal(Number(postBalance))
  })

  it('Mint Token Should fail becuse caller is not owner', async function () {
    try {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        //@ts-ignore
        process.env.PRIVATE_KEY2,
      )
      let ERC20 = await edexaclient.getERC20Instance(
        '0x884aed749F7e58eDcA48F1953BFe23C8dbAC4e15',
      )

      await ERC20.mint(
        '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
        '100',
        signer,
      )
      expect.fail('Minting should not be allowed from a non-owner address')
    } catch (error) {
      expect(error.message).to.include('Ownable: caller is not the owner')
    }
  })

  it('pass empty string as address in mint function should fail', async function () {
    try {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        //@ts-ignore
        process.env.PRIVATE_KEY2,
      )

      let ERC20 = await edexaclient.getERC20Instance(
        '0x884aed749F7e58eDcA48F1953BFe23C8dbAC4e15',
      )

      await ERC20.mint(
        // @ts-ignore
        '',
        '100',
        signer,
      )
      expect.fail('token mint which should not be mint')
    } catch (error) {
      expect(error.message).to.include('ENS Not Registered for')
    }
  })

  it('pass undefined in mint function should fail', async function () {
    try {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        //@ts-ignore
        process.env.PRIVATE_KEY2,
      )

      let ERC20 = await edexaclient.getERC20Instance(
        '0x884aed749F7e58eDcA48F1953BFe23C8dbAC4e15',
      )

      await ERC20.mint(
        // @ts-ignore
        undefined,
        '100',
        signer,
      )
      expect.fail('token mint which should not be mint')
    } catch (error) {
      expect(error.message).to.include('Cannot read properties of undefined')
    }
  })
})
