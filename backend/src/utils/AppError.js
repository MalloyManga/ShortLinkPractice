// AppError.js
export class AppError extends Error {
    constructor(message, statusCode, name) {
        super(message)
        statusCode = this.statusCode
        name = this.name
    }
}