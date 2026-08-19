// src/middlewares/logger.js
// Middlewares isteği Konsola yazdırır. 
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${timestamp}] ---> ${method} isteği atıldı: ${url}`);
    
    // next() komutu, isteğin durdurulmayıp bir sonraki adıma (controller'a) gitmesini sağlar.
    next(); 
};

module.exports = logger;