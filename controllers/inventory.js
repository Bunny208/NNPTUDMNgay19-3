let inventoryModel = require('../schemas/inventory')
let productModel = require('../schemas/products')

module.exports = {
    // Tạo inventory mới khi tạo product
    CreateInventory: async function (productId) {
        try {
            let newInventory = new inventoryModel({
                product: productId,
                stock: 0,
                reserved: 0,
                soldCount: 0
            });
            await newInventory.save();
            return newInventory;
        } catch (error) {
            throw error;
        }
    },

    // Lấy tất cả inventory
    GetAllInventories: async function () {
        try {
            let data = await inventoryModel.find().populate({
                path: 'product',
                select: 'title price description category'
            });
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy inventory theo ID
    GetInventoryById: async function (inventoryId) {
        try {
            let data = await inventoryModel.findById(inventoryId).populate({
                path: 'product',
                select: 'title price description category'
            });
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Tăng stock
    AddStock: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found');
            }
            inventory.stock += quantity;
            inventory.updatedAt = new Date();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Giảm stock
    RemoveStock: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found');
            }
            if (inventory.stock < quantity) {
                throw new Error('Insufficient stock');
            }
            inventory.stock -= quantity;
            inventory.updatedAt = new Date();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Đặt hàng - giảm stock, tăng reserved
    Reservation: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found');
            }
            if (inventory.stock < quantity) {
                throw new Error('Insufficient stock for reservation');
            }
            inventory.stock -= quantity;
            inventory.reserved += quantity;
            inventory.updatedAt = new Date();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Bán hàng - giảm reserved, tăng soldCount
    Sold: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found');
            }
            if (inventory.reserved < quantity) {
                throw new Error('Insufficient reserved stock');
            }
            inventory.reserved -= quantity;
            inventory.soldCount += quantity;
            inventory.updatedAt = new Date();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    }
}
