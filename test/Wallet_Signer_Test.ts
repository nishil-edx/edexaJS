import { EdexaClient } from '../src/index'
import chai, { expect } from 'chai'

var assert = require('assert')

require('dotenv').config()

describe('Wallet Signer Test', function () {

  it('Create New Signer by passing empty string as private key', async function () {
    try {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        ""
      )
      expect.fail('This line should not be reached as signer should not created')
    } catch (error) {
      expect(error.message).to.include('invalid hexlify value')
    }
  })

  it('Create New Signer with incorrect private key', async function () {
    try {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        "4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427"
        )
    } catch (error) {
        expect(error.message).to.include('invalid hexlify value')
    }
  })

  it('Create New Signer with Right Private Key', async function () {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        //@ts-ignore
        process.env.PRIVATE_KEY,
      )
      expect(signer).to.have.property("_isSigner");
      expect(signer).to.have.property("_isSigner").equal(true);
  })

  it('Create New Signer with undefined key', async function () {
    try {
      let edexaclient = new EdexaClient()
      let signer = await edexaclient.createWalletSigner(
        //@ts-ignore
        undefined
        )
    } catch (error) {
        expect(error.message).to.include("Cannot read properties of undefined")
    }
  })

})
