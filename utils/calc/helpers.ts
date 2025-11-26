export const getPercent = (status: number) => (status >= 0 && status <= 5) ? status * 20 : 0;
export const normalize = (raw: number) => Math.max(0, Math.min(100, raw));
