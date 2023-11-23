/**
 * @swagger
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: "usuario_ejemplo"
 *         password: "contraseña123"
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - roleId
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         roleId:
 *           type: string
 *       example:
 *         email: "paul@paul.paul"
 *         password: "paul123"
 *         roleId: "0000-0000-1111-1111"
 *     UserResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         lastLogin:
 *           type: string
 *         roleId:
 *           type: string
 *         token:
 *           type: string
 *       example:
 *         id: "0000-0000-1111-1111"
 *         username: "paul"
 *         email: "paul@paul.paul"
 *         lastLogin: "12/12/12"
 *         roleId: "0000-0000-1111-1111"
 *         token: "json-web-token"
 */
