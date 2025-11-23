const UserService = require('../services/user.service');
const userSchemas = require('../validations/user.validations');

class UserController {
    static async register(req, res) {
        const { error, value } = userSchemas.register.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const result = await UserService.create(value);

            if (result.conflict) {
                return res.status(409).json({
                    success: false,
                    message: 'este email já está sendo usado'
                });
            }

            return res.status(201).json({
                success: true,
                message: 'usuário criado com sucesso',
                data: { userId: result.insertId }
            });
        } catch (err) {
            console.error('Error in UserController.register(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }

    static async login(req, res) {
        const { error, value } = userSchemas.login.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const result = await UserService.login(value);

            if (result.notFound) {
                return res.status(404).json({
                    success: false,
                    message: 'email não cadastrado'
                });
            }

            if (!result.isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'senha incorreta'
                });
            }

            return res.status(202).json({
                success: true,
                message: 'login efetuado com sucesso'
            });
        } catch (err) {
            console.error('Error in UserController.login(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }

    static async getById(req, res) {
        const { error, value } = userSchemas.getById.validate(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const result = await UserService.findById(value.id);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'nenhum usuário encontrado'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'usuário encontrado com sucesso',
                data: result
            });
        } catch (err) {
            console.error('Error in UserController.getById(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }

    static async update(req, res) {
        const { error, value } = userSchemas.update.validate(req.body);
        const { id } = req.params;

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const result = await UserService.update({
                field: value.field,
                value: value.value,
                id: Number(id)
            });

            if (result.notFound) {
                return res.status(404).json({
                    success: false,
                    message: 'usuário não encontrado'
                });
            }

            if (!result.isUpdated) {
                return res.status(500).json({
                    success: false,
                    message: 'falha na operação de atualizar usuário'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'usuário atualizado com sucesso'
            });
        } catch (err) {
            console.error('Error in UserController.update(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }

    static async delete(req, res) {
        const { error, value } = userSchemas.delete.validate(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        try {
            const result = await UserService.delete(value.id);

            if (result.notFound) {
                return res.status(404).json({
                    success: false,
                    message: 'usuário não encontrado'
                });
            }

            if (!result.isDeleted) {
                return res.status(500).json({
                    success: false,
                    message: 'falha na operação de deletar usuário'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'usuário deletado com sucesso'
            });
        } catch (err) {
            console.error('Error in UserController.update(): ', err);
            return res.status(500).json({
                success: false,
                message: 'erro interno'
            });
        }
    }
}

module.exports = UserController;