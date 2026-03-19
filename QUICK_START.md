# 🚀 QUICK START - BẮT ĐẦU NHANH

## ⏱️ 5 PHÚT ĐẨY ĐỦ

### 1. START SERVER
```bash
npm start
```
Chạy trên: `http://localhost:3000`

---

### 2. IMPORT POSTMAN COLLECTION
- Mở Postman
- Click **Import** → **Upload Files**
- Chọn: `Inventory_API.postman_collection.json`
- ✅ Done!

---

### 3. CÁC BƯỚC CHẠY

#### Step 1: Tạo Category (nếu chưa)
```
POST /api/v1/categories
Body: { "name": "Electronics" }
↓ Copy ID → CATEGORY_ID
```

#### Step 2: Tạo Product (Inventory tự tạo)
```
POST /api/v1/products
Body:
{
  "title": "Laptop Dell",
  "price": 1200,
  "description": "High performance",
  "category": "{{CATEGORY_ID}}",
  "images": ["https://placeimg.com/640/480/tech"]
}
↓ Copy _id → PRODUCT_ID
```

#### Step 3: Thêm Stock
```
POST /api/v1/inventory/add-stock
Body: { "product": "{{PRODUCT_ID}}", "quantity": 100 }
Result: stock = 100
```

#### Step 4: Reservation (Đặt hàng)
```
POST /api/v1/inventory/reservation
Body: { "product": "{{PRODUCT_ID}}", "quantity": 30 }
Result: stock = 70, reserved = 30
```

#### Step 5: Sold (Bán hàng)
```
POST /api/v1/inventory/sold
Body: { "product": "{{PRODUCT_ID}}", "quantity": 20 }
Result: stock = 70, reserved = 10, soldCount = 20
```

#### Step 6: Kiểm tra
```
GET /api/v1/inventory/{{PRODUCT_ID}}
↓ Xem kết quả cuối cùng
```

---

## 📊 BẢNG TÓMLƯỢC

| # | Hành động | Endpoint | Stock | Reserved | SoldCount |
|---|-----------|----------|-------|----------|-----------|
| 0 | Tạo Product | POST /products | 0 | 0 | 0 |
| 1 | Add 100 | POST /add-stock {qty:100} | **100** | 0 | 0 |
| 2 | Reserve 30 | POST /reservation {qty:30} | **70** | **30** | 0 |
| 3 | Sold 20 | POST /sold {qty:20} | 70 | **10** | **20** |

---

## 🔗 TẤT CẢ ENDPOINTS

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/v1/inventory | Xem tất cả |
| GET | /api/v1/inventory/:id | Xem chi tiết |
| POST | /api/v1/inventory/add-stock | Thêm stock |
| POST | /api/v1/inventory/remove-stock | Giảm stock |
| POST | /api/v1/inventory/reservation | Đặt hàng |
| POST | /api/v1/inventory/sold | Bán hàng |

---

## ⚠️ LỖI THƯỜNG GẶP

```
❌ "Insufficient stock" 
→ Stock không đủ, thêm stock trước

❌ "Insufficient reserved stock"
→ Reserved không đủ, phải reservation trước sold

❌ "Inventory not found"
→ Product ID sai hoặc không tồn tại

❌ "Cannot GET /api/v1/inventory"
→ Server chưa start, chạy npm start
```

---

## 📖 TÀI LIỆU ĐẦY ĐỦ

- **INVENTORY_README.md** - Tổng quan hệ thống
- **INVENTORY_GUIDE.md** - Hướng dẫn chi tiết
- **POSTMAN_COLLECTION_GUIDE.md** - Hướng dẫn Postman

---

**✅ Sẵn sàng? Chạy `npm start` và bắt đầu!**
