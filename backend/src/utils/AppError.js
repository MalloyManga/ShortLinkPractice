// AppError.js
export class AppError extends Error {
    constructor(message, statusCode, name) {
        super(message)
        this.statusCode = statusCode
        this.name = name
    }
}