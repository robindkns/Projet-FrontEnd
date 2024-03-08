const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api', createProxyMiddleware({
    target: 'https://www.freetogame.com/api/games',
    changeOrigin: true,
    pathRewrite: { '^/api/games': '' },
}));

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});