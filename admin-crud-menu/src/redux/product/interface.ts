export interface ISelectOption {
  key?: number
  label: string
  value: string | number
}

export interface Product {
  key: string
  name: string
  category: string
  description: string
  stocksLeft: number
  cost: number
  price: number
  smallStocks?: number
  mediumStocks?: number
  largeStocks?: number
  files: string
}
