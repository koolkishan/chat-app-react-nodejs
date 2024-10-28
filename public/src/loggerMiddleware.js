// loggerMiddleware.js
function loggerMiddleware(req, res, next) {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Pass control to the next middleware function
}

module.exports = loggerMiddleware;
