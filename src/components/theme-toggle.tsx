"use client"
import React, { useEffect, useState } from 'react'
import {useTheme} from "next-themes"
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle() {
    const { theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <div className="flex gap-2">
    <Button variant={"outline"} onClick={() => {
      setTheme(prev=> prev === 'light'? 'dark': 'light')
    }}>
      {theme === 'dark' ? <Moon/>: <Sun/>}
    </Button>
  </div>
  )
}

export default ThemeToggle