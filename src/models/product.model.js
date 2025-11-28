const pool = require('../config/database');
const logger = require('../utils/logger');

class ProductModel {

    static async insert(productData) {
        const { name, description, price } = productData;

        try {
            const [result] = await pool.query(
                `INSERT INTO products (name, description, price)
                VALUES (?, ?, ?)`,
                [name, description, price]
            );

            return result.insertId;
        } catch (err) {
            logger.error('Error in ProductModel.insert(): ', err);
            throw new Error('Error trying to insert product in the database');
        }
    }

    static async select(params) {
        let whereClauses = [];
        let sqlParams = [];

        if (params?.id) {
            whereClauses.push('id = ?');
            sqlParams.push(params.id);
        }

        if (params?.name) {
            whereClauses.push('name LIKE ?');
            sqlParams.push(`${params.name}`);
        }

        if (params?.description) {
            whereClauses.push('description LIKE ?');
            sqlParams.push(`${params.description}`);
        }

        if (params?.price_start) {
            whereClauses.push('price >= ?');
            sqlParams.push(params.price_start);
        }

        if (params?.price_end) {
            whereClauses.push('price <= ?');
            sqlParams.push(params.price_end);
        }

        const whereText = whereClauses.length > 0 ? `WHERE is_active = 1 AND ${whereClauses.join(' AND ')}` : 'WHERE is_active = 1';

        try {
            const [rows] = await pool.query(
                `SELECT id, name, description, price, discount, created_at
                FROM products
                ${whereText}
                ORDER BY ${params.sortBy} ${params.sortOrder}
                LIMIT ${params.limit}
                OFFSET ${params.offset}`,
                [sqlParams]
            );

            return rows;
        } catch (err) {
            logger.error('Error in ProductModel.select(): ', err);
            throw new Error('Error trying to select products in the database');
        }
    }

    static async selectById(productId) {
        try {
            const [rows] = await pool.query(
                'SELECT is_active FROM products WHERE id = ?',
                [productId]
            );

            return rows;
        } catch (err) {
            logger.error('Error in ProductModel.selectById(): ', err);
            throw new Error('Error trying to select product in the database');
        }
    }

    static async update(data) {
        const { productId, field, value } = data;

        try {
            const [result] = await pool.query(
                'UPDATE products SET ?? = ?, update_at = NOW() WHERE id = ?',
                [field, value, productId]
            );

            return result.affectedRows == 1;
        } catch (err) {
            logger.error('Error in ProductModel.update(): ', err);
            throw new Error('Error trying to update product in the database');
        }
    }

    static async delete(productId) {
        try {
            const [result] = await pool.query(
                'DELETE FROM products WHERE id = ?',
                [productId]
            );

            return result.affectedRows == 1;
        } catch (err) {
            logger.error('Error in ProductModel.delete(): ', err);
            throw new Error('Error trying to delete product in the database');
        }
    }
}

module.exports = ProductModel;