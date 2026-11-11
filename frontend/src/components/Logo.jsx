import { useState } from 'react'

// Le logo doit être placé dans frontend/public/logo.png
export default function Logo({ className = 'h-11 w-11' }) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <img
      src="/logo.png"
      alt="Corpo Sport Event"
      className={`${className} object-contain`}
      onError={() => setVisible(false)}
    />
  )
}
