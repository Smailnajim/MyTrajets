import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mocks
jest.unstable_mockModule('../../repositories/Users.js', () => ({
    default: {
        findOneByEmail: jest.fn(),
        findOneById: jest.fn()
    }
}));
jest.unstable_mockModule('../../utils/token.js', () => ({
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn(),
    verifyToken: jest.fn()
}));

// Imports
const AuthService = (await import('../../services/AuthService.js')).default;
const Users = (await import('../../repositories/Users.js')).default;
const TokenUtils = await import('../../utils/token.js');

describe('AuthService Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('loginService', () => {
        it('should login successfully if credentials refer to active user', async () => {
            const mockUser = {
                _id: 'u1',
                email: 'test@example.com',
                password: 'hashedpassword',
                etat: 'authorise',
                comparePassword: jest.fn().mockResolvedValue(true)
            };

            Users.findOneByEmail.mockResolvedValue(mockUser);
            TokenUtils.generateAccessToken.mockReturnValue('access_token');
            TokenUtils.generateRefreshToken.mockReturnValue('refresh_token');

            const result = await AuthService.loginService({ email: 'test@example.com', password: 'password' });

            expect(result).toHaveProperty('accessToken', 'access_token');
            expect(result).toHaveProperty('refreshToken', 'refresh_token');
            expect(result.userResponse.email).toBe('test@example.com');
        });

        it('should throw 401 if user not found', async () => {
            Users.findOneByEmail.mockResolvedValue(null);

            await expect(AuthService.loginService({ email: 'wrong@example.com', password: 'password' }))
                .rejects
                .toThrow('Invalid email or password');
        });

        it('should throw 403 if user is not active', async () => {
            const mockUser = {
                _id: 'u1',
                email: 'test@example.com',
                etat: 'pending', // Not authorised
                comparePassword: jest.fn().mockResolvedValue(true)
            };
            Users.findOneByEmail.mockResolvedValue(mockUser);

            await expect(AuthService.loginService({ email: 'test@example.com', password: 'password' }))
                .rejects
                .toThrow('Account is not active');
        });
    });
});
