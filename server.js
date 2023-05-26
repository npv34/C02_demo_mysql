const http = require('http');
const url = require('url');
const qs = require('qs');
const mysql = require('mysql');
const homeController = require('./src/controllers/home.controller');
const orderController = require('./src/controllers/order.controller');

const PORT = 8000;


const app = http.createServer((req, res) => {
    const pathUrl = url.parse(req.url).pathname;
    switch (pathUrl) {
        case '/':
            homeController.getHomePage(req, res).catch(err => {
                console.log(err);
            })
            break;
        case '/admin/orders':
            orderController.getListOrder(req, res).catch(err => {
                console.log(err);
            });
            break;
        case '/admin/orders/detail':
            orderController.getOrderDetail(req, res).catch(err => {
                console.log(err);
            });
            break;
    }
})

app.listen(PORT, 'localhost', () => {
    console.log('server listening on port ' + PORT)
})
