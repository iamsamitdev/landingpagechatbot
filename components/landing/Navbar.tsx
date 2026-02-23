"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback, useSyncExternalStore } from "react"

// Theme store for managing dark mode
const themeStore = {
  getSnapshot: (): boolean => {
    if (typeof window === 'undefined') return false
    return document.documentElement.classList.contains('dark')
  },
  getServerSnapshot: (): boolean => false,
  subscribe: (callback: () => void): (() => void) => {
    // Listen for class changes on documentElement
    const observer = new MutationObserver(callback)
    if (typeof window !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
    }
    return () => observer.disconnect()
  },
  setTheme: (isDark: boolean): void => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  },
  initTheme: (): void => {
    if (typeof window === 'undefined') return
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Use useSyncExternalStore for dark mode state
  const isDarkMode = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  )

  // Initialize theme on mount
  useEffect(() => {
    themeStore.initTheme()
  }, [])

  const toggleDarkMode = useCallback(() => {
    themeStore.setTheme(!isDarkMode)
  }, [isDarkMode])

  const navLinks = [
    { href: "/#home", label: "หน้าแรก" },
    { href: "/#features", label: "บริการ" },
    { href: "/#about", label: "เกี่ยวกับเรา" },
    { href: "/#team", label: "ทีมงาน" },
    { href: "/#testimonial", label: "รีวิว" },
    { href: "/blog", label: "บทความ" },
  ]

  const pagesLinks = [
    { href: "/#how-to-order", label: "คู่มือการสั่งซื้อ" },
    { href: "/#return-policy", label: "นโยบายคืนสินค้า" },
    { href: "/#contact", label: "ติดต่อเรา" },
  ]

  return (
    <header className="fixed left-0 top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto flex w-full flex-wrap lg:flex-nowrap lg:items-center lg:justify-between py-4">
        {/* Logo */}
        <div className="relative shrink-0 pr-4 lg:w-45">
          <Link 
            href="/#home" 
            className="inline-flex items-center gap-2"
          >
            <Image
              alt="logo"
              width={180}
              height={40}
              className="hidden dark:block"
              src="/images/logo/logo-dark.svg"
            />
            <Image
              alt="logo"
              width={180}
              height={40}
              className="dark:hidden"
              src="/images/logo/logo-light.svg"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={`menu-wrapper fixed left-0 top-0 z-50 h-screen w-full justify-center bg-white p-5 lg:visible lg:static lg:flex lg:h-auto lg:flex-1 lg:justify-center lg:bg-transparent lg:p-0 lg:opacity-100 dark:bg-slate-900 dark:lg:bg-transparent ${isMobileMenuOpen ? 'flex' : 'hidden lg:flex'}`}>
          <div className="self-center">
            <nav>
              <ul className="flex flex-col items-center justify-center space-y-5 text-center lg:flex-row lg:justify-center lg:space-x-6 lg:space-y-0 xl:space-x-10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-medium text-slate-600 hover:text-blue-500 inline-flex items-center justify-center text-center text-lg dark:text-slate-300 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                
                {/* Pages Dropdown */}
                <li className="group relative">
                  <button 
                    className="font-medium text-slate-600 hover:text-blue-500 inline-flex items-center justify-center text-start text-lg dark:text-slate-300 dark:hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                  เพิ่มเติม
                    <span className="pl-2">
                      <svg 
                        width="14" 
                        height="8" 
                        viewBox="0 0 14 8" 
                        className={`fill-current transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="M6.54564 5.09128L11.6369 0L13.0913 1.45436L6.54564 8L0 1.45436L1.45436 0L6.54564 5.09128Z" />
                      </svg>
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <ul 
                    className={`lg:absolute lg:top-[200%] lg:left-0 lg:w-52 lg:rounded-lg lg:border lg:border-slate-200 lg:bg-white lg:shadow-lg lg:py-5 lg:px-0 dark:lg:border-slate-700 dark:lg:bg-slate-800 transition-all duration-200 ${isDropdownOpen ? 'block lg:visible lg:opacity-100' : 'hidden lg:invisible lg:opacity-0'} space-y-1 pt-6 lg:pt-5 text-left`}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {pagesLinks.map((link, index) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block px-8 py-2.5 font-medium text-lg transition-colors text-left ${
                            index === 0 
                              ? 'text-blue-500 dark:text-blue-400' 
                              : 'text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-white'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-5 top-1/2 z-50 flex -translate-y-1/2 items-center lg:static lg:translate-y-0 lg:w-45 lg:justify-end shrink-0">

          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="text-slate-600 dark:text-slate-300 flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {/* Moon icon (show in light mode) */}
              <svg 
                viewBox="0 0 24 24" 
                className={`h-5 w-5 transition-all ${isDarkMode ? 'hidden' : 'block'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              {/* Sun icon (show in dark mode) */}
              <svg 
                viewBox="0 0 24 24" 
                className={`h-5 w-5 transition-all ${isDarkMode ? 'block' : 'hidden'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>

            {/* Sign In Button */}
            <Link 
              href="/admin" 
              className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap rounded-md px-4 py-2 lg:px-6 lg:py-2.5 text-center text-white text-sm lg:text-base font-medium transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="text-slate-600 dark:text-slate-300 relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" className="fill-current">
                <path d="M16.5 5.5L5.5 16.5M5.5 5.5L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" className="fill-current">
                <path d="M2.75 3.66666H19.25V5.49999H2.75V3.66666ZM2.75 10.0833H19.25V11.9167H2.75V10.0833ZM2.75 16.5H19.25V18.3333H2.75V16.5Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar