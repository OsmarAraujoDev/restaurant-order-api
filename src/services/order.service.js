const OrderModel = require('../models/order.model');

class OrderService {
    static async create(orderData, products) {

        orderData.totalPrice = products.reduce((acc, p) => p.price * p.quantity + acc, 0); 

        try {
            const orderId = await OrderModel.insert(orderData);

            if (!orderId) return { OrderNotCreated: true };

            const orderProducts = await OrderModel.insertOrderProducts(orderId, products);

            if (!orderProducts) {
                await OrderModel.delete(orderId);
                return { productNotCreated: orderProducts };
            }

            return orderId;
        } catch (err) {
            console.error('Error in OrderService.create(): ', err);
            throw new Error('Error trying to create order');
        }
    }

    static async findAll(params) {
        try {
            const orders = await OrderModel.select(params);

            return orders;
        } catch (err) {
            console.error('Error in OrderService.findAll(): ', err);
            throw new Error('Error trying to find orders');
        }
    }

    static async update(data) {
        try {
            const existing = await OrderModel.selectById(data.orderId);
            if (!existing.length) return { notFound: true };

            const order = await OrderModel.update(data);

            return { isUpdated: order };
        } catch (err) {
            console.error('Error in OrderService.update(): ', err);
            throw new Error('Error trying to update order');
        }
    }

    static async delete(orderId) {
        try {
            const existing = await OrderModel.selectById(orderId);
            if (!existing.length) return { notFound: true };

            const order = await OrderModel.delete(orderId);

            return { isDeleted: order };
        } catch (err) {
            console.error('Error in OrderService.delete(): ', err);
            throw new Error('Error trying to delete order');
        }
    }
}

module.exports = OrderService;