// requestLogger.js
/**
 * @typedef {import ('express').Request} Request
 * @typedef {import ('express').Response} Response
 * @typedef {import ('express').NextFunction} NextFunction
 */

/**
 * Request logging middleware
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const requestLogger = (req, res, next) => {
    const start = Date.now()

    // Log request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)

    // Log response when finished
    res.on('finish', () => {
        const duration = Date.now() - start
        const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m'
        const reset = '\x1b[0m'
        console.log(
            `[${new Date().toISOString()}] ${req.method} ${req.path} ` +
            `${statusColor}${res.statusCode}${reset} - ${duration}ms`
        )
    })

    next()
}
