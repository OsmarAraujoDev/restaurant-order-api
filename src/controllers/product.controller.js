const ProductService = require('../services/product.service');
const productSchema = require('../validations/product.validations');

class ProductController {
    
    static async create(req, res) {
        const { error, value } = productSchema.create.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const result = await ProductService.create(value);

            if (!result.insertId) {
                return res.status(500).json({ 
                    success: false,
                    message: 'falha na operação de criar produto'
                });
            }

            return res.status(201).json({
                success: true,
                message: `produto.id: ${result.insertId}`,
                data: { productId: result.insertId }
            });
        } catch (err) {
            console.error('Error in ProductController.create(): ', err);
            return res.status(500).json({ success: false, message: 'erro interno' });
        }
    }

    static async findAll(req, res) {
        const { error, value } = productSchema.findAll.validate(req.query);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const products = await ProductService.findAll(value);

            if (!products.length) {
                return res.status(404).json({
                    success: false,
                    message: 'nenhum produto encontrado'
                });
            }

            return res.status(200).json({
                success: false,
                message: `${products.length} produtos encontrados`,
                data: products
            });
        } catch (err) {
            console.error('Error in ProductController.findAll(): ', err);
            return res.status(500).json({ success: false, message: 'erro interno' });
        }
    }

    static async update(req, res) {
        const { error, value } = productSchema.update.validate(req.body);
        const { id } = req.params;
        
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        if (value.field === 'name' && value.field.length > 100) {
            return res.status(400).json({
                success: false,
                message: ''
            });
        } 

        if (value.field === 'description' && value.field.length > 255) {
            return res.status(400).json({
                success: false,
                message: ''
            });
        }

        try {
            const product = await ProductService.update({
                field: value.field,
                value: value.value,
                productId: id
            });

            if (product?.notFound) {
                return res.status(404).json({
                    success: false,
                    message: 'nenhum produto encontrado com esse id'
                });
            }

            if (!product.isUpdated) {
                return res.status(404).json({
                    success: false,
                    message: 'falha na operação de atualizar produto'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'produto atualizado com sucesso'
            });
        } catch (err) {
            console.error('Error in ProductController.update(): ', err);
            return res.status(500).json({ success: false, message: 'erro interno' });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (typeof Number(id) != 'number') {
            return res.statu(400).json({
                success: false,
                message: ''
            });
        }

        try {
            const product = await ProductService.delete(id);

            if (product?.notFound) {
                return res.status(404).json({
                    success: false,
                    message: 'nenhum produto encontrado com esse id'
                });
            }

             if (!product.isDeleted) {
                return res.status(404).json({
                    success: false,
                    message: 'falha na operação de deletar produto'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'produto deletado com sucesso'
            });
        } catch (err) {
            console.error('Error in ProductController.delete(): ', err);
            return res.status(500).json({ success: false, message: 'erro interno' });
        }
    }
}

module.exports = ProductController;