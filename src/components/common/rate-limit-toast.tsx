import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function RateLimitToast({ retryAfter, toastId }: { retryAfter: number, toastId: string }) {
    const [timeLeft, setTimeLeft] = useState(retryAfter);
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    toast.dismiss(toastId)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [toastId])
    return (
        <div className="flex flex-col gap-1">
            <p className="font-semibold">Too many requests</p>
            <p className="text-sm text-muted-foreground">
                Try again in {timeLeft}s
            </p>
        </div>
    )
}

export default RateLimitToast
