import React, { useEffect, useState } from 'react'
import { Popup } from '../popup'
import styles from './index.module.scss'
import info from './assets/info.svg'
import close from './assets/close.svg'

export type Item = {
  id: string
  name: string
  image: string
  color?: string
  size?: string
  weight?: string
  price?: number
  priceSales: number
  priceUnit: string
}

type OrderQuantity = {
  [id: string]: number
}

type OrderPopupProps = {
  onOrder: (orderQuantity: OrderQuantity) => void
  isOpen: boolean
  onClose?: () => void
  items: Item[]
}

const Product = ({
  name,
  image,
  color,
  size,
  weight,
  price,
  priceSales,
  priceUnit,
  quantity,
  onChangeQuantity,
}: Item & {
  quantity: number
  onChangeQuantity: (quantity: number) => void
}) => {
  return (
    <div className={styles.product}>
      <div
        className={styles.productImage}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className={styles.productInfo}>
        <div className={styles.productName}>{name}</div>

        <ul className={styles.productAttrs}>
          <li>{`Color: ${color}`}</li>
          <li>{`Size: ${size}`}</li>
          <li>{`Weight: ${weight}`}</li>
        </ul>

        <div className={styles.productQuantityPrice}>
          <div className={styles.quantity}>
            <div onClick={() => onChangeQuantity(quantity - 1)}>-</div>
            <input
              type="number"
              value={quantity}
              min="0"
              onChange={(e) => onChangeQuantity(Number(e.target.value))}
            />
            <div onClick={() => onChangeQuantity(quantity + 1)}>+</div>
          </div>

          <div className={styles.productPrice}>
            {price && (
              <s className={styles.productPriceList}>{`${priceUnit}${(
                price * quantity
              ).toFixed(2)}`}</s>
            )}
            <div className={styles.productPriceSales} data-onsale={!!price}>
              {`${priceUnit}${(priceSales * quantity).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const OrderPopup = ({ isOpen, onClose, onOrder, items }: OrderPopupProps) => {
  const [quantity, setQuantity] = useState<OrderQuantity>(
    items.reduce((acc, cur) => ({ ...acc, [cur.id]: 1 }), {})
  )

  useEffect(() => {
    setQuantity(items.reduce((acc, cur) => ({ ...acc, [cur.id]: 1 }), {}))
  }, [isOpen])

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={styles.orderPopup}>
        <img className={styles.closePopupIcon} src={close} onClick={onClose} />

        <div className={styles.top}>
          <div className={styles.question}>Too good to pass up, right?</div>
          <div className={styles.receive}>
            Order now and receive <span>€5,00</span> in your Wallet.
            <img src={info} />
          </div>
        </div>

        <div className={styles.popupTitle}>
          <div>Your shopping card</div>
          <div>Order now and your order will be shipped for free.</div>
        </div>
        <div className={styles.productList}>
          {items
            .filter(({ id }) => !!quantity[id])
            .map((item) => (
              <Product
                key={item.id}
                {...item}
                quantity={quantity[item.id]}
                onChangeQuantity={(quantity) =>
                  setQuantity((q) => ({ ...q, [item.id]: quantity }))
                }
              />
            ))}
        </div>
        <div className={styles.popupNote}>
          <img src={info} />
          <div>The items in the shopping card are not reserved for you.</div>
        </div>
        <button
          className={styles.orderButton}
          onClick={() => onOrder(quantity)}
        >
          Order
        </button>
      </div>
    </Popup>
  )
}

export { OrderPopup }
