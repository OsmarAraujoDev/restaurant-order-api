const ProductModel = require('../models/product.model');

class ProductService {

    static async create(productData) {
        try {
            const product = await ProductModel.insert(productData);

            return { insertId: product };
        } catch (err) {
            console.error('Error in ProductService.create(): ', err);
            throw new Error('Error trying to create product');
        }
    }

    static async findAll(params) {
        try {
            const products = await ProductModel.select(params);

            return products;
        } catch (err) {
            console.error('Error in ProductService.read(): ', err);
            throw new Error('Error trying to read products');
        }
    }

    static async update(data) {
        try {
            const existing = await ProductModel.selectById(data.productId);
            if (!existing.length) return { notFound: true };

            const product = await ProductModel.update(data);

            return { isUpdated: product };
        } catch (err) {
            console.error('Error in ProductService.update(): ', err);
            throw new Error('Error trying to update product');
        }
    }

    static async delete(productId) {
        try {
            const existing = await ProductModel.selectById(productId);
            if (!existing.length) return { notFound: true };

            const product = await ProductModel.delete(productId);

            return { isDeleted: product };
        } catch (err) {
            console.error('Error in ProductService.delete(): ', err);
            throw new Error('Error trying to delete product');
        }
    }
}

module.exports = ProductService;