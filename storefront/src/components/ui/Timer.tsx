import { useEffect, useState } from "react"

interface TimerProps {
  endTime: Date
  onEnd?: () => void
}

export function Timer({ endTime, onEnd }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        if (onEnd) onEnd()
        return
      }

      setTimeLeft({
        hours: Math.floor(distance / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onEnd])

  return (
    <div className="flex items-center gap-1 text-sm font-bold">
      <div className="bg-red-500 text-white rounded px-2 py-1">
        {timeLeft.hours.toString().padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-red-500 text-white rounded px-2 py-1">
        {timeLeft.minutes.toString().padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-red-500 text-white rounded px-2 py-1">
        {timeLeft.seconds.toString().padStart(2, '0')}
      </div>
    </div>
  )
}
