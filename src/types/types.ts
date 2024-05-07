export type erc20ArgType = {
  name: string
  symbol: string
  supply?: Number | undefined
}
export type stableCoinArgType = {
  name: string
  symbol: string
  supply: Number
}

export type erc721ArgType = {
  name: string
  symbol: string
}

export type erc1155ArgType = {
  uri: string
}
