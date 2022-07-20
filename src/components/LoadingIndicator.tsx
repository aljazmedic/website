import React from 'react'
import styles from './LoadingIndicator.module.css'

interface LoadingIndicatorProps {
  active?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function LoadingIndicator({ active, className, style }: LoadingIndicatorProps) {
  return (
    <div
      className={`
        ${styles.LoadingIndicator}
        ${active ? styles.active : ''}
        ${className}
      `}
      style={style}
    />
  )
}

