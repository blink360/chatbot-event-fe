export const sanitizeInputs = (value: string) =>
    value.trim().replace(/\s+/g, " ").replace(/[<>]/g, "");