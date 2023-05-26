const BaseController = require('./base.controller');
const orderModel = require('./../models/order.model');
const qs = require('qs');
const url = require('url');

class OrderController extends BaseController{
    async getListOrder(req, res){
        // goi model
        let orders = await orderModel.getAllOrders();
        let newHtml = '';
        orders.forEach((order,index) => {
            let date = new Date(order.orderDate);
            newHtml += "<tr>";
            newHtml += `<td>${index + 1}</td>`;
            newHtml += `<td><a href="/admin/orders/detail?id=${order.orderNumber}">${order.orderNumber}</a></td>`;
            newHtml += `<td>${date.toLocaleDateString()}</td>`;
            newHtml += `<td>${order.status}</td>`;
            newHtml += "<tr>";
        })

        let html = await this.getTemplate('./src/views/admin/orders.html');
        html = html.replace('{list-order}', newHtml)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }

    async getOrderDetail(req, res) {
        let id = qs.parse(url.parse(req.url).query).id;
        let order = await orderModel.getOrderDetail(id);
        let customerName = order[0][0].customerName;
        let customerNumber = order[0][0].customerNumber;
        let customerPhone = order[0][0].phone;
        let orderStatus = order[0][0].status;

        let selectStatusHTML = `
        <form action="">
         <div class="form-group row">
          <select class="col-12 col-md-4 custom-select">
               <option value="Shipping" ${ orderStatus === "Shipping" ? "selected" : ""}>Shipping</option>
               <option value="Shipped" ${ orderStatus === "Shipped" ? "selected" : ""}>Shipped</option>
               <option value="Cancelled" ${ orderStatus === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
        <button class="btn btn-primary" type="submit">Save</button>
         </div>

        </form>
       `
        let html = await this.getTemplate('./src/views/admin/orderDetail.html');

        html = html.replace('{name-customer}', customerName)
        html = html.replace('{customer-number}', customerNumber)
        html = html.replace('{customer-phone}', customerPhone)
        html = html.replace('{order-number}', id);
        html = html.replace('{order-status}', selectStatusHTML);

        let htmlListProduct = "";

        order[0].forEach((item, index) => {
            htmlListProduct += "<tr>";
            htmlListProduct += `<td>${index + 1}</td>`;
            htmlListProduct += `<td>${item.productName}</td>`;
            htmlListProduct += `<td>${item.buyPrice}</td>`;
            htmlListProduct += `<td>${item.quantityInStock}</td>`;
            htmlListProduct += "</tr>";
        })

        html = html.replace('{list-product}', htmlListProduct);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = new OrderController();
