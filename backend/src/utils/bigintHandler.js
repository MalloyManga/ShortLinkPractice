// bigintHandler.js
export default function bigintHandler(key, value) {
    if (typeof value === 'bigint') {
        return value.toString()
    }
    return value
}