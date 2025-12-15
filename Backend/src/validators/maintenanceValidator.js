import { body, param } from 'express-validator';
import maintenanceType from '../enums/maintenanceType.js';

const createMaintenanceValidation = [
    body('vehicleId')
        .notEmpty().withMessage('Vehicle ID is required')
        .isMongoId().withMessage('Invalid Vehicle ID format'),
    body('type')
        .notEmpty().withMessage('Maintenance type is required')
        .isIn(maintenanceType).withMessage(`Type must be one of: ${maintenanceType.join(', ')}`),
    body('kmAtMaintenance')
        .notEmpty().withMessage('Kilometrage at maintenance is required')
        .isNumeric().withMessage('Kilometrage must be a number')
        .isFloat({ min: 0 }).withMessage('Kilometrage must be positive'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),
    body('suiviDate.dateDebut')
        .optional()
        .isISO8601().withMessage('Invalid start date format'),
    body('suiviDate.dateFin')
        .optional()
        .isISO8601().withMessage('Invalid end date format'),
    body('coutDH')
        .optional()
        .isNumeric().withMessage('Cost must be a number')
];

const updateMaintenanceValidation = [
    param('id')
        .isMongoId().withMessage('Invalid Maintenance ID'),
    body('vehicleId')
        .optional()
        .isMongoId().withMessage('Invalid Vehicle ID format'),
    body('type')
        .optional()
        .isIn(maintenanceType).withMessage(`Type must be one of: ${maintenanceType.join(', ')}`),
    body('kmAtMaintenance')
        .optional()
        .isNumeric().withMessage('Kilometrage must be a number')
        .isFloat({ min: 0 }).withMessage('Kilometrage must be positive'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),
    body('suiviDate.dateDebut')
        .optional()
        .isISO8601().withMessage('Invalid start date format'),
    body('suiviDate.dateFin')
        .optional()
        .isISO8601().withMessage('Invalid end date format'),
    body('coutDH')
        .optional()
        .isNumeric().withMessage('Cost must be a number')
];

export default {
    createMaintenanceValidation,
    updateMaintenanceValidation
};
