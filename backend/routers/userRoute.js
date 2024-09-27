import { Router } from 'express';
import userModel from '../models/userModel.js'
import { verifyToken } from '../middleware/verifyToken.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const router = Router()

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: JohnDoe@email.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: JohnDoe1234
 *     responses:
 *       '201':
 *         description: A successful user registration
 *       '400':
 *         description: Email already exists
 *       '500':
 *         description: Internal Server Error
 */
// Route to register a new user
router.post('/register', async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: JohnDoe@email.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password
 *     responses:
 *       '200':
 *         description: A successful login
 *       '401':
 *         description: Invalid credientails
 *       '500':
 *         description: Internal Server Error
 */
// Route to authenticate and log in a user
router.post('/login', async (req, res) => {
    try {
        // Check if the email exists
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const passwordMatch = bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, config.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user details.
 *     security: [{
        bearerAuth: []
        }]
 *     responses:
 *       '200':
 *         description: Users Details
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
// Protected route to get user details
router.get('/user', verifyToken, async (req, res) => {
    try {
        // Fetch user details using decoded token
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


/**
 * @swagger
 * /api/resetPassword:
 *   delete:
 *     summary: reset use's password.
 *     security: [{
 *          bearerAuth: []
 *       }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user's email.
 *                 example: JohnDoe@email.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password
 * 
 *     responses:
 *       '201':
 *         description: A successful pet added
 *       '400':
 *         description: pet already exists
 *       '500':
 *         description: Internal Server Error
 */
// Route to reset password
router.put('/resetPassword', verifyToken, async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await userModel.findOne({ email: req.user.email });
        if (!existingUser) {
            return res.status(400).json({ error: 'User not found' });
        } else {
            // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        existingUser.password = hashedPassword;
        await existingUser.save();
        res.status(201).json({ message: 'User password updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
  
export default router;
