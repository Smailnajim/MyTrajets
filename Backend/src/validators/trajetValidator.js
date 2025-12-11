import { query, param, body, validationResult } from 'express-validator';
import createError from "../utils/createError.js";
import trajetStatus from "../enums/trajetStatus.js";




export const createTrajetValidation = [
    body('chauffeurId')
        .notEmpty().withMessage('Chauffeur ID is required')
        .isMongoId().withMessage('Invalid chauffeur ID format'),
    body('camionId')
        .notEmpty().withMessage('Camion ID is required')
        .isMongoId().withMessage('Invalid camion ID format'),
    body('remorqueId')
        .optional()
        .isMongoId().withMessage('Invalid remorque ID format'),
    body('suiviDate.depart')
        .notEmpty().withMessage('Departure date is required')
        .isISO8601().withMessage('Invalid departure date format'),
    body('suiviGasoilL.depart')
        .optional()
        .isNumeric().withMessage('Departure gasoil must be a number'),
    body('statuts')
        .optional()
        .isIn(trajetStatus).withMessage(`Status must be one of: ${trajetStatus.join(', ')}`),
    body('emplacement.depart.lat')
        .notEmpty().withMessage('depart lat is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('emplacement.depart.lng')
        .notEmpty().withMessage('depart lng is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
    body('emplacement.depart.address')
        .notEmpty().withMessage('address is required')
        .isString().withMessage('Address must be a string'),
];

export const updateTrajetValidation = [
    param('id')
        .notEmpty().withMessage('ID is required')
        .isMongoId().withMessage('Invalid trajet ID format'),
    body('chauffeurId')
        .optional()
        .isMongoId().withMessage('Invalid chauffeur ID format'),
    body('camionId')
        .optional()
        .isMongoId().withMessage('Invalid camion ID format'),
    body('remorqueId')
        .optional()
        .isMongoId().withMessage('Invalid remorque ID format'),
    body('statuts')
        .optional()
        .isIn(trajetStatus).withMessage(`Status must be one of: ${trajetStatus.join(', ')}`),
    body('suiviGasoilL.arrive')
        .optional()
        .isNumeric().withMessage('Arrival gasoil must be a number'),
    body('suiviDate.arrive')
        .optional()
        .isISO8601().withMessage('Invalid arrival date format'),
    body('emplacement.arrive.lat')
        .optional()
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('emplacement.arrive.lng')
        .optional()
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
    body('emplacement.arrive.address')
        .optional()
        .isString().withMessage('Address must be a string'),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError("Validation failed", 400, errors.array()));
    }
    next();
};