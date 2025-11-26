import { useState, useEffect } from 'react';

export const useCountdown = (targetDate: string | undefined) => {
    const [countdown, setCountdown] = useState<{ d: number; h: number; m: number } | null>(null);

    useEffect(() => {
        const calculate = () => {
            if (!targetDate) return null;
            const targetTime = new Date(targetDate).getTime();
            
            // CRITICAL FIX: Handle invalid date strings
            if (isNaN(targetTime)) return null;

            const diff = targetTime - new Date().getTime();
            if (diff < 0) { return null; }
            
            return {
                d: Math.floor(diff / 864e5),
                h: Math.floor((diff % 864e5) / 36e5),
                m: Math.floor((diff % 36e5) / 60000)
            };
        };

        setCountdown(calculate()); // Initial calculation

        const interval = setInterval(() => {
            setCountdown(calculate());
        }, 1000);
        
        return () => clearInterval(interval);
    }, [targetDate]);

    return countdown;
};