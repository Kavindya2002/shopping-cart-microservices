const express = require('express');

const {
  listInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory
} = require('../controllers/inventoryController');

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get all inventory records
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: A list of inventory records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Inventory'
 *   post:
 *     summary: Create a new inventory record
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       201:
 *         description: Inventory created successfully
 */
router.route('/').get(listInventory).post(createInventory);

/**
 * @openapi
 * /{id}:
 *   get:
 *     summary: Get a inventory record by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory found
 *       404:
 *         description: Inventory not found
 *   put:
 *     summary: Update a inventory record by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *       404:
 *         description: Inventory not found
 *   delete:
 *     summary: Delete a inventory record by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory deleted successfully
 *       404:
 *         description: Inventory not found
 */
router.route('/:id').get(getInventoryById).put(updateInventory).delete(deleteInventory);

module.exports = router;
