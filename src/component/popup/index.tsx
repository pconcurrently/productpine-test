import React from 'react'

import styles from './index.module.scss'

type PopupProps = {
  isOpen: boolean
  children: React.ReactNode
  onClose?: () => void
}

const Popup = ({ isOpen, children, onClose }: PopupProps) => {
  return (
    <div
      className={`${styles.orderPopupContainer} ${
        isOpen ? 'popup-open' : 'popup-hidden'
      }`}
    >
      <div
        onClick={onClose}
        className={styles.backdrop}
        data-open={isOpen}
      ></div>
      <div className={styles.popupContent} data-open={isOpen}>
        {children}
      </div>
    </div>
  )
}

export { Popup }
