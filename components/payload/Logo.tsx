import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="logo-wrapper">
      {/* Logo สำหรับ Light mode */}
      <Image
        src="/images/logo/logo-light.svg"
        alt="MyBizApp Logo"
        width={180}
        height={40}
        priority
        className="logo-light"
      />
      {/* Logo สำหรับ Dark mode */}
      <Image
        src="/images/logo/logo-dark.svg"
        alt="MyBizApp Logo"
        width={180}
        height={40}
        priority
        className="logo-dark"
      />
    </div>
  )
}

export default Logo
