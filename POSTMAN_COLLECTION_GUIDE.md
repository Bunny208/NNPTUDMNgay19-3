# POSTMAN COLLECTION - HƯỚNG DẪN SỬ DỤNG CHI TIẾT

## BƯỚC 1: IMPORT COLLECTION VÀO POSTMAN

1. Mở Postman
2. Click **Import** → **Upload Files**
3. Chọn file: `Inventory_API.postman_collection.json`
4. Collection sẽ được import với tất cả endpoints đã cấu hình

---

## BƯỚC 2: THIẾT LẬP ENVIRONMENT VARIABLES

Collection có 3 biến cần thiết:
- `CATEGORY_ID` - ID của category
- `PRODUCT_ID` - ID của product
- `INVENTORY_ID` - ID của inventory

**Cách thiết lập:**
1. Click vào **Environment** tab (nếu chưa có, tạo mới)
2. Thêm các variable:
   ```
   CATEGORY_ID = (sẽ được lấy sau)
   PRODUCT_ID = (sẽ được lấy sau)
   INVENTORY_ID = (sẽ được lấy sau)
   ```
3. Save environment

---

## BƯỚC 3: CHẠY KỊCH BẢN HOÀN CHỈNH

### **BƯỚC 3.1: Tạo Category** (nếu chưa có)

1. Mở tab **Collections** → **Create Product**
2. Thay đổi request type thành **POST**
3. URL: `http://localhost:3000/api/v1/categories`
4. Body (raw JSON):
   ```json
   {
     "name": "Electronics"
   }
   ```
5. Click **Send**
6. Copy `_id` từ response → lưu vào `CATEGORY_ID` environment variable

---

### **BƯỚC 3.2: Tạo Product** (Inventory tự động được tạo)

1. Collection → **Create Product**
2. Click **Send** (body đã có sẵn)
3. Response trả về product với `_id`
4. Copy `_id` → lưu vào `PRODUCT_ID` environment variable
5. Copy `_id` → lưu vào `INVENTORY_ID` environment variable (cùng giá trị)

---

### **BƯỚC 3.3: Xem tất cả Inventory**

1. Collection → **Get All Inventories**
2. Click **Send**
3. Xem response - sẽ có thông tin product kèm theo

---

### **BƯỚC 3.4: Xem chi tiết Inventory**

1. Collection → **Get Inventory by ID**
2. Click **Send** (tự động dùng `{{INVENTORY_ID}}`)
3. Xem thông tin chi tiết kèm product

---

### **BƯỚC 3.5: Thêm 100 chiếc hàng vào kho**

1. Collection → **Add Stock**
2. Body (có sẵn): `{"product": "{{PRODUCT_ID}}", "quantity": 100}`
3. Click **Send**
4. Result: `stock = 100, reserved = 0, soldCount = 0`

---

### **BƯỚC 3.6: Hủy đơn (Giảm 10 chiếc)**

1. Collection → **Remove Stock**
2. Thay số lượng sang 10: `{"product": "{{PRODUCT_ID}}", "quantity": 10}`
3. Click **Send**
4. Result: `stock = 90`

---

### **BƯỚC 3.7: Đặt hàng 30 chiếc**

1. Collection → **Reservation (Order)**
2. Thay số lượng sang 30: `{"product": "{{PRODUCT_ID}}", "quantity": 30}`
3. Click **Send**
4. Result: `stock = 60, reserved = 30`

---

### **BƯỚC 3.8: Xác nhận bán 20 chiếc**

1. Collection → **Sold (Complete Order)**
2. Thay số lượng sang 20: `{"product": "{{PRODUCT_ID}}", "quantity": 20}`
3. Click **Send**
4. Result: `reserved = 10, soldCount = 20`

---

### **BƯỚC 3.9: Kiểm tra trạng thái cuối cùng**

1. Collection → **Get Inventory by ID**
2. Click **Send**
3. Kết quả:
   ```json
   {
     "stock": 60,
     "reserved": 10,
     "soldCount": 20
   }
   ```

---

## BẢNG TÓMLƯỢC LUỒNG DỮ LIỆU

| Bước | Hành động | Endpoint | Stock | Reserved | SoldCount |
|------|----------|----------|-------|----------|-----------|
| 1 | Tạo Product | POST /products | 0 | 0 | 0 |
| 2 | Thêm 100 | POST /add-stock (100) | **100** | 0 | 0 |
| 3 | Giảm 10 | POST /remove-stock (10) | **90** | 0 | 0 |
| 4 | Đặt hàng 30 | POST /reservation (30) | **60** | **30** | 0 |
| 5 | Bán 20 | POST /sold (20) | 60 | **10** | **20** |

---

## TIPS POSTMAN

### Sử dụng biến
- Khi chạy request, Postman tự động thay thế `{{VARIABLE_NAME}}` bằng giá trị từ environment

### Copy ID nhanh
1. Sau request, response hiển thị JSON
2. Tìm `"_id": "xxxxx"`
3. Hover vào value → Click icon Copy  
4. Paste vào environment variable

### Test Multiple Products
Có thể tạo nhiều products:
1. Tạo Product 2 → Copy ID vào biến mới (PRODUCT_ID_2)
2. Chạy các operations với PRODUCT_ID_2
3. So sánh inventory của 2 products

---

## THỨ TỰ NGUYÊN ĐẶC BIỆT

⚠️ **Lưu ý quan trọng:**

1. **Phải thêm stock trước khi remove:**
   - ❌ Sai: Remove trước khi Add
   - ✅ Đúng: Add stock 100 → Remove 10

2. **Phải reservation trước khi sold:**
   - ❌ Sai: Sold trực tiếp mà không reservation
   - ✅ Đúng: Reservation 30 → Sold 20

3. **Reserved không vượt quá stock:**
   - ❌ Sai: Stock = 50, Reservation 60
   - ✅ Đúng: Stock = 50, Reservation ≤ 50

4. **SoldCount không vượt quá reserved:**
   - ❌ Sai: Reserved = 10, Sold 20
   - ✅ Đúng: Reserved = 10, Sold ≤ 10

---

## DEBUGGING

Nếu gặp lỗi:

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-----------|---------|
| "Insufficient stock" | Stock không đủ | Thêm stock trước |
| "Insufficient reserved stock" | Reserved không đủ | Reservation trước |
| "Inventory not found" | PRODUCT_ID sai | Kiểm tra lại ID |
| Cannot GET /api/v1/inventory/... | Chưa start server | Chạy `npm start` |

---

## TỔNG HỢP ENDPOINT

```
GET    /api/v1/inventory                  - Lấy tất cả
GET    /api/v1/inventory/:id              - Lấy theo ID
POST   /api/v1/inventory/add-stock        - Thêm stock
POST   /api/v1/inventory/remove-stock     - Giảm stock
POST   /api/v1/inventory/reservation      - Đặt hàng
POST   /api/v1/inventory/sold             - Bán hàng
```

---
