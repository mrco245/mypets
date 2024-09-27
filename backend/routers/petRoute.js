import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import petModel from '../models/petModel.js';

const router = Router()

/**
 * @swagger
 * /api/addPet:
 *   post:
 *     summary: Add a pet.
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
 *               species:
 *                 type: string
 *                 description: The pets's species.
 *                 example: Dog
 *               name:
 *                 type: string
 *                 description: The pet's name.
 *                 example: Diego
 *               breed:
 *                 type: string
 *                 description: The pet's breed.
 *                 example: Mix
 *               age:
 *                 type: number
 *                 description: The pet's age.
 *                 example: 1
 *               weight:
 *                 type: number
 *                 description: The pet's weight.
 *                 example: 105
 *               birthdate:
 *                 type: date
 *                 description: The pet's birthday.
 *                 example: 10/11/2020
 *               adoptiondate:
 *                 type: date
 *                 description: The pet's adoption date.
 *                 example: 10/11/2020
 *               altered:
 *                 type: string
 *                 description: If the pet is spayed/neutered.
 *                 example: yes
 *     responses:
 *       '201':
 *         description: A successful pet added
 *       '400':
 *         description: pet already exists
 *       '500':
 *         description: Internal Server Error
 */
// Route to add a new pet
router.post('/addPet', verifyToken, async (req, res) => {
    try {
        // Check if the email already exists
        const existingPet = await petModel.findOne({ ownerEmail: req.user.email, name: req.body.name });
        if (existingPet) {
            return res.status(400).json({ error: 'Pet already exists' });
        }
        // Create a new pet
        const newPet = new petModel({
            ownerEmail: req.user.email,
            species: req.body.species,
            name: req.body.name,
            breed: req.body.breed,
            age: req.body.age,
            weight: req.body.weight,
            altered: req.body.altered,
            birthdate: req.body.birthdate,
            adoptiondate: req.body.adoptiondate,
        });
        await newPet.save();
        res.status(201).json({ message: 'Pet added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


/**
 * @swagger
 * /api/deletePet:
 *   delete:
 *     summary: Delete a pet.
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
 *               name:
 *                 type: string
 *                 description: The pet's name.
 *                 example: Diego
 *     responses:
 *       '201':
 *         description: A successful pet added
 *       '400':
 *         description: pet already exists
 *       '500':
 *         description: Internal Server Error
 */
// Route to add a new pet
router.delete('/deletePet', verifyToken, async (req, res) => {
    try {
        // Check if the email already exists
        const existingPet = await petModel.findOneAndDelete({ ownerEmail: req.user.email, name: req.body.name });
        if (!existingPet) {
            return res.status(400).json({ error: 'Pet not found' });
        } else {
            res.status(201).json({ message: 'Pet deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Get  all pet details.
 *     security: [{
        bearerAuth: []
        }]
 *     responses:
 *       '200':
 *         description: Users Pets Details
 *       '404':
 *         description: User pets not found
 *       '500':
 *         description: Internal Server Error
 */
// Protected route to get user details
router.get('/pets', verifyToken, async (req, res) => {
    try {
        // Fetch user details using decoded token
        const pet = await petModel.find({ ownerEmail: req.user.email }).lean();
        if (!pet) {
            return res.status(404).json({ error: 'pet not found' });
        }
        res.status(200).json({
            pets: pet
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
