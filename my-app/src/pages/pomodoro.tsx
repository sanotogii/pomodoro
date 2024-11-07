'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function Pomodoro() {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isWork, setIsWork] = useState(true)
  const [sessions, setSessions] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    } else if (time === 0) {
      if (isWork) {
        toast({
          title: "Work session completed!",
          description: "Time for a break.",
        })
        setTime(5 * 60) // 5 minutes break
        setIsWork(false)
        setSessions((sessions) => sessions + 1)
      } else {
        toast({
          title: "Break time over!",
          description: "Ready for another work session?",
        })
        setTime(25 * 60) // Back to 25 minutes work
        setIsWork(true)
      }
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, isWork, toast])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(25 * 60)
    setIsWork(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const radius = 90
  const circumference = radius * 2 * Math.PI
  const progress = (1 - time / (isWork ? 1500 : 300)) * 100
  const offset = circumference - (progress / 100) * circumference

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-[200px] h-[200px] mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="100"
              cy="100"
              r={radius}
              className="fill-none stroke-muted stroke-[8px]"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              className="fill-none stroke-primary stroke-[8px]"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                transition: 'stroke-dashoffset 0.1s ease-in-out'
              }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-4xl font-bold text-center">{formatTime(time)}</div>
            <div className="text-center text-sm text-muted-foreground">
              {isWork ? "Work Session" : "Break Time"}
            </div>
          </div>
        </div>
        <div className="text-center text-sm font-medium">
          Sessions completed: {sessions}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
        <Button onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outline" onClick={resetTimer}>Reset</Button>
      </CardFooter>
    </Card>
  )
}