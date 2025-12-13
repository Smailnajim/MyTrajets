import { body, param } from 'express-validator';
import maintenanceType from '../enums/maintenanceType.js';
import vehicleType from '../enums/vehicleType.js';

const createRuleValidation = [
    body('type')
        .notEmpty().withMessage('Maintenance type is required')
        .isIn(maintenanceType).withMessage(`Type must be one of: ${maintenanceType.join(', ')}`),
    body('vehicleType')
        .notEmpty().withMessage('Vehicle type is required')
        .isIn(vehicleType).withMessage(`Vehicle type must be one of: ${vehicleType.join(', ')}`),
    body('intervalKm')
        .notEmpty().withMessage('Interval (Km) is required')
        .isNumeric().withMessage('Interval must be a number')
        .isInt({ min: 1 }).withMessage('Interval must be a positive integer'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
];

const updateRuleValidation = [
    param('id')
        .isMongoId().withMessage('Invalid Rule ID'),
    body('type')
        .optional()
        .isIn(maintenanceType).withMessage(`Type must be one of: ${maintenanceType.join(', ')}`),
    body('vehicleType')
        .optional()
        .isIn(vehicleType).withMessage(`Vehicle type must be one of: ${vehicleType.join(', ')}`),
    body('intervalKm')
        .optional()
        .isNumeric().withMessage('Interval must be a number')
        .isInt({ min: 1 }).withMessage('Interval must be a positive integer'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
];

export default {
    createRuleValidation,
    updateRuleValidation
};