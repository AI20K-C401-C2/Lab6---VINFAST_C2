# Báo cáo Thống kê Lỗi Tiềm ẩn về Giao diện và UX

Dựa trên quá trình kiểm tra thực tế giao diện của ứng dụng tại `localhost:5173`, dưới đây là danh sách chi tiết các lỗi và vấn đề tiềm ẩn liên quan đến UI/UX sau khi vượt qua màn hình chào mừng.

> [!NOTE]
> Cập nhật: 2026-04-09 — Tất cả lỗi đã được sửa thành công ✅

---

## 1. Lỗi Nghiêm trọng (Giao diện & Chức năng)

| # | Lỗi | Trạng thái | File sửa |
|---|------|------------|----------|
| 1.1 | **Vỡ Layout trên Mobile** — Icon lấp lánh ở trung tâm đè lên bong bóng chat | ✅ Đã sửa | `ViviMascot.tsx`, `App.tsx` |
| 1.2 | **Hiển thị thông tin xe bị lỗi trên Mobile** — Thẻ thông tin xe bị cắt xén trên di động | ✅ Đã sửa | `App.tsx`, `CarDisplay.tsx` |
| 1.3 | **Lỗi Render hình ảnh trùng lặp** — 3 hình ảnh giống hệt nhau trên 1 hàng | ✅ Đã sửa | `CarDisplay.tsx` |
| 1.4 | **Vỡ Layout khi tràn tin nhắn (Message Overflow)** — Giao diện bị méo khi có quá nhiều tin nhắn | ✅ Đã sửa | `ChatPanel.tsx`, `App.tsx` |

### Chi tiết cách sửa:
- **1.1**: Loại bỏ hoàn toàn ViviMascot ở chat stage (icon `fixed` giữa màn hình). Typing indicator chuyển sang xử lý trực tiếp trong ChatPanel.
- **1.2**: Đổi layout từ `flex-col md:grid` sang `grid grid-cols-1 md:grid-cols-2`. Ẩn VisualPanel trên mobile (`hidden md:block`). Chat chiếm full screen trên mobile.
- **1.3**: Thay grid 3 hình trùng lặp bằng 1 hình đại diện duy nhất, kèm ColorSwatches + SmartCard specs + nút "Đăng ký lái thử".
- **1.4**: Thêm `min-h-0` + `overflow-hidden` cho grid children, `flex-shrink-0` cho header & input, `flex-1 min-h-0 overflow-y-auto` cho vùng tin nhắn.

---

## 2. Vấn đề về Trải nghiệm Người dùng (UX & Tương tác)

| # | Lỗi | Trạng thái | File sửa |
|---|------|------------|----------|
| 2.1 | **Chức năng các nút chưa phân tách** — Tất cả nút dẫn đến cùng 1 giao diện chat | ✅ Đã sửa | `ViviMascot.tsx`, `App.tsx` |
| 2.2 | **Thiếu tùy chọn Quay lại (Back/Home)** — Không có nút quay về màn hình chào mừng | ✅ Đã sửa | `ChatPanel.tsx`, `App.tsx` |
| 2.3 | **Trạng thái hệ thống không rõ ràng (Loading state)** — Không có typing indicator | ✅ Đã sửa | `ChatPanel.tsx`, `App.tsx` |
| 2.4 | **Ô nhập liệu chung chung** — Placeholder luôn là "Nhập tin nhắn..." | ✅ Đã sửa | `ChatPanel.tsx` |

### Chi tiết cách sửa:
- **2.1**: Mỗi nút trên onboarding ("Tìm xe phù hợp", "So sánh các dòng xe", "Xem bảng giá") gửi intent khác nhau (`find`, `compare`, `price`) → bot phản hồi tin nhắn mở đầu tương ứng.
- **2.2**: Thêm nút ArrowLeft ← ở góc trái header ChatPanel. Click sẽ reset toàn bộ state và quay về onboarding.
- **2.3**: Typing indicator hiện 3 chấm xanh nhảy + text "Vivi đang soạn..." khi bot đang xử lý. `addViviMessage()` set `isViviTyping=true` trước khi gửi.
- **2.4**: Placeholder động: `"Hỏi thêm về VF 8..."` (khi có xe), `"Bạn quan tâm dòng xe nào? VF 5, VF 8, VF 9..."` (lúc đầu), `"Nhập tin nhắn..."` (default).

---

## 3. Vấn đề về Thẩm mỹ và Tầm nhìn (Visual & Accessibility)

| # | Lỗi | Trạng thái | File sửa |
|---|------|------------|----------|
| 3.1 | **Độ tương phản thấp** — Bong bóng chat nhạt trên nền trắng | ✅ Đã sửa | `MessageBubble.tsx`, `ChatPanel.tsx` |
| 3.2 | **Chi tiết nền chiếm quá nhiều sự chú ý** — Logo "JANJORA" / "VinFast" quá to ở background | ✅ Đã sửa | `VisualPanel.tsx` |
| 3.3 | **Các Box/Badge thông tin bị rời rạc** — SmartCard specs trôi nổi | ✅ Đã sửa | `CarDisplay.tsx` |

### Chi tiết cách sửa:
- **3.1**: Bot bubble đổi từ `bg-white/80` → `bg-white/95 border border-gray-100`. ChatPanel background từ `bg-white/40` → `bg-white/70`. User bubble thêm gradient + shadow.
- **3.2**: Loại bỏ background image Unsplash (gây noise). Thay bằng gradient sạch `from-gray-50 via-blue-50/30 to-gray-100`. VinFast logo thu nhỏ từ `8xl` → `7xl`.
- **3.3**: Tổ chức lại CarDisplay: Header badge → Car image → ColorSwatches → 2×2 SmartCard grid → CTA button. Tất cả theo flow dọc, bố cục gọn gàng.

---

## Tổng kết

| Phân loại | Tổng lỗi | Đã sửa | Còn lại |
|-----------|----------|--------|---------|
| Lỗi Nghiêm trọng | 4 | 4 | 0 |
| Vấn đề UX | 4 | 4 | 0 |
| Vấn đề Visual | 3 | 3 | 0 |
| **Tổng cộng** | **11** | **11** | **0** |
