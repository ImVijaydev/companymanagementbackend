const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { route } = require('./companyRoutes');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.put('/:id/toggleActiveStatus', userController.toggleActiveStatus);
router.put('/:id/migrateUser', userController.migrateUser);
router.delete('/:id', userController.deleteUser);
router.get('/company/:companyId', userController.getUsersByCompanyId);
router.put('/:companyId/deleteCompany', userController.deleteCompanyFromUser);
router.get('/getUsersBasedOnCompanyId/:id', userController.getUsersBasedOnCompanyId);

module.exports = router;
