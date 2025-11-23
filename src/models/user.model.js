const pool = require('../config/database');

class UserModel {
    static async insert(userData) {
        const { nickname, email, phone, passwordHash } = userData;

        try {
            const [result] = await pool.query(
                `INSERT INTO users (nickname, email, phone, password_hash)
                VALUES (?, ?, ?, ?)`,
                [nickname, email, phone, passwordHash]
            );

            return result.insertId;
        } catch (err) {
            console.error('Error in UserModel.insert(): ', err);
            throw new Error('Error trying to insert user in the database');
        }
    }

    static async selectByEmail(email) {
        try {
            const [rows] = await pool.query(
                `SELECT id, nickname, password_hash, is_active
                FROM users
                WHERE email = ?
                ORDER BY is_active DESC`,
                [email]
            );

            return rows[0];
        } catch (err) {
            console.error('Error in UserModel.selectByEmail(): ', err);
            throw new Error('Error trying to fetch user by email in the database');
        }
    }

    static async selectById(id) {
        try {
            const [rows] = await pool.query(
                `SELECT id, nickname, email, phone, created_at, update_at, is_active
                FROM users
                WHERE id = ?`,
                [id]
            );

            return rows[0];
        } catch (err) {
            console.error('Error in UserModel.selectByEmail(): ', err);
            throw new Error('Error trying to fetch user by email in the database');
        }
    }

    static async update(params) {
        const { field, value, id } = params;

        try {
            const [result] = await pool.query(
                'UPDATE users SET ?? = ?, update_at = NOW() WHERE id = ?',
                [field, value, id]
            );

            return result.affectedRows == 1;
        } catch (err) {
            console.error('Error in UserModel.update(): ', err);
            throw new Error('Error trying to update user in the database');
        }
    }

    static async delete(userId) {
        try {
            const [result] = await pool.query(
                'DELETE FROM users WHERE id = ?',
                [userId]
            );

            return result.affectedRows == 1;
        } catch (err) {
            console.error('Error in UserModel.delete(): ', err);
            throw new Error('Error trying to delete user in the database');
        }
    }
}

module.exports = UserModel;