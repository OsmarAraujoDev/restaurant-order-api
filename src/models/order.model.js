const pool = require('../config/database');
const logger = require('../utils/logger');

class OrderModel {
    static async insert(orderData) {
        const {
            totalPrice,
            observation,
            address,
            paymentMethod,
            userId
        } = orderData;

        try {
            const [result] = await pool.query(
                `INSERT INTO orders (total_price, observation, address, payment_method_id, user_id)
                VALUES (?, ?, ?, ?, ?)`,
                [totalPrice, observation, JSON.stringify(address), paymentMethod, userId]
            );

            return result.insertId;
        } catch (err) {
            logger.error('Error in OrderModel.insert(): ', err);
            throw new Error('Error trying to insert order in the database');
        }
    }

    static async insertOrderProducts(orderId, products) {
        try {
            products.forEach(async (product) => {
                const [result] = await pool.query(
                    `INSERT INTO products_orders (product_id, order_id, price, quantity, observation)
                    VALUES (?, ?, ?, ?, ?)`,
                    [product.id, orderId, product.price, product.quantity, product.observation]
                );

                if (!result?.insertId) return false;
            });

            return true;
        } catch (err) {
            logger.error('Error in OrderModel.insertOrderProducts(): ', err);
            throw new Error('Error trying to insert order products in the database');
        }
    }

    static async select(params) {
        let whereClauses = [];
        let sqlParams = [];

        if (params?.id) {
            whereClauses.push('id = ?');
            sqlParams.push(params.id);
        }

        if (params?.user_nickname) {
            whereClauses.push('user_nickname LIKE ?');
            sqlParams.push(`%${params?.user_nickname}%`);
        }

        if (params?.created_at_start) {
            whereClauses.push('created_at >= ?');
            sqlParams.push(params?.created_at_start);
        }

        if (params?.created_at_end) {
            whereClauses.push('created_at <= ?');
            sqlParams.push(params?.created_at_end);
        }

        if (params?.status) {
            whereClauses.push('status = ?');
            sqlParams.push(params?.status);
        }

        const whereText = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

        try {
            const [orders] = await pool.query(
                `SELECT *
                FROM vw_orders
                ${whereText}
                ORDER BY ${params.sortBy} ${params.sortOrder}
                LIMIT ${params.limit}
                OFFSET ${params.offset}`,
                [sqlParams]
            );

            const [products] = await pool.query(
                `SELECT 
	                o.id AS order_id,
	                p.name AS product_name,
                    po.price,
                    po.quantity
                FROM products_orders po
                INNER JOIN products p ON p.id = po.product_id
                INNER JOIN orders o ON o.id = po.order_id 
                WHERE o.id IN (${orders.map(o => o.id).join(', ')})`
            );

            const productsByOrder = {};
            products.forEach(prod => {
                if (!productsByOrder[prod.order_id]) productsByOrder[prod.order_id] = [];
                productsByOrder[prod.order_id].push({
                    product_name: prod.product_name,
                    price: prod.price,
                    quantity: prod.quantity
                });
            });

            const ordersWithProducts = orders.map(order => ({
                ...order,
                products: productsByOrder[order.id] || []
            }));

            return ordersWithProducts;
        } catch (err) {
            logger.error('Error in OrderModel.select(): ', err);
            throw new Error('Error trying to select orders in the database');
        }
    }

    static async selectById(orderId) {
        try {
            const [rows] = await pool.query(
                'SELECT 1 AS is_existing FROM products WHERE id = ?',
                [orderId]
            );

            return rows;
        } catch (err) {
            logger.error('Error in ProductModel.selectById(): ', err);
            throw new Error('Error trying to select product in the database');
        }
    }


    static async update(params) {
        const { field, value, orderId } = params;

        try {
            const [result] = await pool.query(
                'UPDATE orders SET ?? = ? WHERE id = ?',
                [field, value, orderId]
            );

            return result.affectedRows == 1;
        } catch (err) {
            logger.error('Error in OrderModel.update(): ', err);
            throw new Error('Error trying to update order in the database');
        }
    }

    static async delete(orderId) {
        try {
            const [result] = await pool.query(
                'DELETE FROM orders WHERE id = ?',
                [orderId]
            );

            return result.affectedRows == 1;
        } catch (err) {
            logger.error('Error in OrderModel.delete(): ', err);
            throw new Error('Error trying to delete order in the database');
        }
    }
}

module.exports = OrderModel;