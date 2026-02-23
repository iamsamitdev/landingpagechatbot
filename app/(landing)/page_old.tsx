"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState, useSyncExternalStore } from "react"

// Custom hook to detect client-side mounting
const emptySubscribe = () => () => {}
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // client
    () => false  // server
  )
}

export default function Home() {
  const mounted = useIsMounted()
  const [date, setDate] = useState<Date | undefined>(() => 
    typeof window !== 'undefined' ? new Date() : undefined
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Button>Button</Button>
      </div>
      <div>
        {mounted && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        )}
      </div>
    </div>
  )
}