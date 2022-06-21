import React, { useState } from 'react'
import './App.css'
import { Item, OrderPopup } from './component/orderPopup'

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const items: Item[] = [
    {
      id: 'prod1',
      name: 'Item 1',
      image: 'https://via.placeholder.com/150',
      color: 'red',
      size: 'M',
      weight: '100g',
      price: 12,
      priceSales: 9,
      priceUnit: '€',
    },
    {
      id: 'prod2',
      name: 'Item 2',
      image: 'https://via.placeholder.com/150',
      color: 'red',
      size: 'M',
      weight: '100g',
      priceSales: 5,
      priceUnit: '€',
    },
  ]

  return (
    <div className="App">
      <button className="button" onClick={() => setIsOpen(true)}>
        Open
      </button>
      <OrderPopup
        isOpen={isOpen}
        onOrder={(orderQuantity) => {
          console.log({ orderQuantity })
          setIsOpen(false)
        }}
        onClose={() => {
          setIsOpen(false)
        }}
        items={items}
      />

      <div>{}</div>
    </div>
  )
}

export default App
