const BaseModel = require("./base.model");
class OrderModel extends BaseModel {
    async getAllOrders(limit = 10) {
        let sql = `SELECT * FROM orders LIMIT ${limit}`;
        return await this.querySql(sql)
    }

    async getOrderDetail(id) {
        let sql = `CALL get_order_detail_customer(${id})`;
        return await this.querySql(sql)
    }
}

module.exports = new OrderModel();
