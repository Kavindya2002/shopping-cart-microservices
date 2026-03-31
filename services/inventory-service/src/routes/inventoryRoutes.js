const express = require('express');
const {
  createInventory,
  getInventoryRecords,
  getInventoryById,
  updateInventory,
  deleteInventory
} = require('../controllers/inventoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management endpoints
 */

/**
 * @swagger
 * /api/inventory:
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
 *         description: Inventory record created successfully
 *   get:
 *     summary: Get all inventory records
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of inventory records
 */
router.route('/').post(createInventory).get(getInventoryRecords);

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get an inventory record by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory record found
 *       404:
 *         description: Inventory record not found
 *   put:
 *     summary: Update an inventory record by ID
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
 *         description: Inventory record updated successfully
 *       404:
 *         description: Inventory record not found
 *   delete:
 *     summary: Delete an inventory record by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory record deleted successfully
 *       404:
 *         description: Inventory record not found
 */
router.route('/:id').get(getInventoryById).put(updateInventory).delete(deleteInventory);

module.exports = router;
