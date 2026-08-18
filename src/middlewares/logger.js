// Middlewares Her isteği Konsola yazar.

function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next(); // Bir sonraki adıma geç
}

module.exports = logger;