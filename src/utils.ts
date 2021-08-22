export const isObject: <T>(value: unknown) => value is T = (value): value is any => {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}