var express = require('express');
var router = express.Router();
let inventoryController = require('../controllers/inventory')

// GET all inventories
router.get('/', async function (req, res) {
    try {
        let data = await inventoryController.GetAllInventories();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

// GET inventory by ID
router.get('/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let data = await inventoryController.GetInventoryById(id);
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "Inventory not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

// POST - Thêm stock
router.post('/add-stock', async function (req, res) {
    try {
        let productId = req.body.product;
        let quantity = req.body.quantity;

        if (!productId || !quantity) {
            return res.status(400).send({
                message: "Missing product or quantity"
            })
        }

        if (quantity <= 0) {
            return res.status(400).send({
                message: "Quantity must be greater than 0"
            })
        }

        let result = await inventoryController.AddStock(productId, quantity);
        res.send({
            message: "Stock added successfully",
            data: result
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

// POST - Giảm stock
router.post('/remove-stock', async function (req, res) {
    try {
        let productId = req.body.product;
        let quantity = req.body.quantity;

        if (!productId || !quantity) {
            return res.status(400).send({
                message: "Missing product or quantity"
            })
        }

        if (quantity <= 0) {
            return res.status(400).send({
                message: "Quantity must be greater than 0"
            })
        }

        let result = await inventoryController.RemoveStock(productId, quantity);
        res.send({
            message: "Stock removed successfully",
            data: result
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

// POST - Đặt hàng (reservation)
router.post('/reservation', async function (req, res) {
    try {
        let productId = req.body.product;
        let quantity = req.body.quantity;

        if (!productId || !quantity) {
            return res.status(400).send({
                message: "Missing product or quantity"
            })
        }

        if (quantity <= 0) {
            return res.status(400).send({
                message: "Quantity must be greater than 0"
            })
        }

        let result = await inventoryController.Reservation(productId, quantity);
        res.send({
            message: "Reservation successful",
            data: result
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

// POST - Bán hàng (sold)
router.post('/sold', async function (req, res) {
    try {
        let productId = req.body.product;
        let quantity = req.body.quantity;

        if (!productId || !quantity) {
            return res.status(400).send({
                message: "Missing product or quantity"
            })
        }

        if (quantity <= 0) {
            return res.status(400).send({
                message: "Quantity must be greater than 0"
            })
        }

        let result = await inventoryController.Sold(productId, quantity);
        res.send({
            message: "Sale recorded successfully",
            data: result
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
});

module.exports = router;
