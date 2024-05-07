import { EdexaClient } from '../src/index'
import chai, { expect } from 'chai'

var assert = require('assert')

require('dotenv').config()

describe('StableCoin Tests', function () {
    it('Create/Deploy New Contract', async function () {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        //@ts-ignore
        process.env.PRIVATE_KEY,
      )
      let arg = {
        name: 'gautam',
        symbol: 'gau',
        supply: 100,
      }
      let tx = await edexaclient.createContractStableCoin(arg, signer)
      expect(tx.address).to.not.equal(undefined)
    })

    it('Mint Token and Check Balance', async function () {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        //@ts-ignore
        process.env.PRIVATE_KEY,
      )
      let StableCoin = await edexaclient.getStableCoinInstance(
        '0x6Ea0EBef4a827C3699044eD5A6B19a95004C9Dfe',
      )

      let preBalance = await StableCoin.getBalance(
        '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      )

      await StableCoin.mint(
        '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
        '100',
        signer,
      )

        //waiting for 2 sec since block is getting processed..
        await new Promise(resolve => setTimeout(resolve, 2000));

      let postBalance = await StableCoin.getBalance(
        '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      )

      let expectBalance = Number(preBalance) + 100
      expect(Number(expectBalance)).to.equal(Number(postBalance))
    })
    it('Mint Token in Stablecoin should fail because caller is not owner', async function () {
      try {
        let edexaclient = new EdexaClient()
        let signer = await edexaclient.createWalletSigner(
          //@ts-ignore
          process.env.PRIVATE_KEY2,
        )
        let StableCoin = await edexaclient.getStableCoinInstance(
          '0x6Ea0EBef4a827C3699044eD5A6B19a95004C9Dfe',
        )

        await StableCoin.mint(
          '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
          '100',
          signer,
        )

        expect.fail('Minting should not be allowed from a non-owner address')
      } catch (error) {
        expect(error.message).to.include('Execution reverted')
      }
    })

  it('pass empty string as address in mint function should fail', async function () {
    try {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        //@ts-ignore
        process.env.PRIVATE_KEY2,
      )

      let StableCoin = await edexaclient.getStableCoinInstance(
        '0x6Ea0EBef4a827C3699044eD5A6B19a95004C9Dfe',
      )

      await StableCoin.mint('', '100', signer)
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

      let StableCoin = await edexaclient.getStableCoinInstance(
        '0x6Ea0EBef4a827C3699044eD5A6B19a95004C9Dfe',
      )

      await StableCoin.mint(
        //@ts-ignore
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
