import { useState, useEffect } from 'react';

export interface CountdownResult {
    d: number;
    h: number;
    m: number;
    isPast: boolean;
}

export const useCountdown = (targetDate: string | undefined): CountdownResult | null => {
    const [countdown, setCountdown] = useState<CountdownResult | null>(null);

    useEffect(() => {
        const calculate = (): CountdownResult | null => {
            if (!targetDate) return null;
            const targetTime = new Date(targetDate).getTime();
            
            // Handle invalid date strings
            if (isNaN(targetTime)) return null;

            const now = new Date().getTime();
            const diff = targetTime - now;
            
            // Calculate absolute difference to support both countdown and count-up
            const absDiff = Math.abs(diff);
            
            return {
                d: Math.floor(absDiff / 864e5),
                h: Math.floor((absDiff % 864e5) / 36e5),
                m: Math.floor((absDiff % 36e5) / 60000),
                isPast: diff < 0
            };
        };

        setCountdown(calculate());

        const interval = setInterval(() => {
            setCountdown(calculate());
        }, 1000);
        
        return () => clearInterval(interval);
    }, [targetDate]);

    return countdown;
};