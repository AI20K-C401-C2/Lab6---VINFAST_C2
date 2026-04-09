# SPEC FINAL — NhomC2-C401
## Track: Vinfast · AI Tư vấn Giá Lăn Bánh (ViVi)

---

## 1. AI Product Canvas

### Problem statement

Khách hàng mua xe VinFast không chỉ quan tâm đến giá bán lẻ mà còn hàng loạt ưu đãi đi kèm phức tạp: voucher Vinhomes, chính sách thu cũ đổi mới, gói thuê pin vs mua pin, ưu đãi trạm sạc, gói vay lãi suất ngân hàng liên kết. Việc tổng hợp thủ công mất 15–30 phút chờ Sales trong đợt cao điểm, khiến drop-off rate tăng cao.

### Canvas

| | Value | Trust | Feasibility |
|---|---|---|---|
| **Câu hỏi guide** | User nào? Pain gì? AI giải quyết gì mà cách hiện tại không giải được? | Khi AI sai thì user bị ảnh hưởng thế nào? User biết AI sai bằng cách nào? User sửa bằng cách nào? | Cost bao nhiêu/request? Latency bao lâu? Risk chính là gì? |
| **Trả lời** | **User:** Khách hàng đang cân nhắc mua xe VinFast (VF 3 → VF 9).<br>**Pain:** Ưu đãi phân tán nhiều kênh, rule cộng dồn phức tạp, Sales trả lời chậm giờ cao điểm.<br>**AI giải quyết:** Tự động tra giá niêm yết từ web thực, tra cứu ưu đãi trong tài liệu Sales đã duyệt, tính toán bằng rule-based engine → báo giá lăn bánh cá nhân hóa ngay lập tức qua chat. | **Hậu quả khi sai:** Báo sai giá hoặc khuyến mãi không có thật → khiếu nại, ảnh hưởng uy tín thương hiệu.<br>**Nhận biết:** Khách so với bảng giá niêm yết, Sales kiểm tra lại.<br>**Cách sửa:** (1) Disclaimer bắt buộc cuối mỗi báo giá. (2) AI dẫn nguồn từng ưu đãi. (3) Khi khách phàn nàn, AI xin lỗi và chủ động đưa hotline 1900232389. | **Cost:** ~$0.005–0.01/request (GPT-4o-mini).<br>**Latency:** < 3–5s (streaming SSE, user thấy text ngay từ token đầu tiên).<br>**Risk:** Dữ liệu ưu đãi thay đổi thường xuyên → file Sale.md bị stale. Rule tính % phức tạp (cộng dồn nhiều ưu đãi) dễ dẫn tới hallucination nếu không kiểm soát chặt. |

### Automation vs Augmentation

**☑ Augmentation** — AI tư vấn + tính toán tham khảo, khách hàng và Sales quyết định cuối.

> **Lý do:** AI = probabilistic. Nếu tự động chốt deal (Automation) mà AI tính sai ưu đãi → thiệt hại tài chính và pháp lý. Sales luôn cần duyệt bước cuối. Nhãn "Thông tin mang tính tham khảo" được in bắt buộc sau mỗi bảng dự toán.

### Learning signal

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | User correction đi vào đâu? | Các ca AI sai → khách gõ phàn nàn hoặc hỏi lại → toàn bộ conversation log lưu làm **Hard-Negative Test Cases** để update prompt và dữ liệu ưu đãi. |
| 2 | Product thu signal gì để biết tốt lên/tệ đi? | **Explicit:** Thumbs up/down, feedback text. **Implicit:** Tỷ lệ khách nhắn "lái thử" / "đăng ký" (Lead Conversion Rate), tỷ lệ drop-off giữa chừng. |
| 3 | Data thuộc loại nào? | ☑ User-specific · ☑ Domain-specific · ☐ Real-time · ☐ Human-judgment |

**Marginal value:** Insight từ lượng hội thoại tích lũy → biết khách quan tâm kịch bản nào nhiều nhất (VD: 80% hỏi thuê pin) → tối ưu lại bộ chính sách bán hàng.

---

## 2. User Stories — 4 Paths

### Path 1 — Happy (AI đúng, flow mượt)

**Kịch bản:** Khách ở Hà Nội, mua VF 5 Plus thuê pin, có voucher Vinhomes.

**Flow:**
1. Khách nhập: *"Tôi ở Hà Nội, định mua VF 5 Plus thuê pin, có voucher Vinhomes."*
2. Agent node trả về 3 tool calls trong 1 message; ToolNode chạy lần lượt:
   - `search_car("VF 5 Plus")` → lấy giá niêm yết từ vinfastgiare.vn
   - `check_promotions("vinhomes")` → tra Sale.md + vinhomes_promotion.md
   - `calculate_rolling_price(468000000, "VINHOMES:30000000", "Hà Nội")` → bảng dự toán
3. AI stream từng token về ChatPanel (bong bóng chat xuất hiện ngay từ token đầu tiên).
4. VisualPanel bên phải tự động cập nhật hình xe VF 5 + bảng màu khi AI đề cập dòng xe.
5. Khách nhắn "Tôi muốn đăng ký lái thử" → AI tiếp nhận trong chat.

**UX điểm quan trọng:** Không hiển thị loading trắng — bong bóng chat AI hiện ngay khi token đầu tiên về. Suggestion chips (6 câu gợi ý sẵn) biến mất sau khi user gửi tin nhắn đầu tiên.

---

### Path 2 — Low-confidence (AI không chắc, hỏi thêm)

**Kịch bản:** Khách chưa cho biết dòng xe.

**Flow:**
1. Khách nhập: *"Tôi muốn tính giá lăn bánh, có đổi cũ lấy mới."*
2. AI nhận ra thiếu thông tin bắt buộc (model xe), **không gọi tool**, hỏi lại: (1) dòng xe, (2) thuê pin hay mua pin.
3. Location không cần hỏi — system prompt quy định mặc định "Hà Nội" nếu khách không cung cấp.
4. Khách bổ sung model → AI gọi đủ tools → trả kết quả.

**UX điểm quan trọng:** Câu hỏi lại gọn, không hỏi lại location (đã có default). Không bao giờ gửi tin nhắn hứa hẹn kiểu "Em sẽ tra cứu..." — chỉ hỏi thêm thông tin còn thiếu.

---

### Path 3 — Failure (AI sai, Recovery)

**Kịch bản:** AI báo nhầm ưu đãi hoặc tính sai phí cho tỉnh lẻ.

**Flow:**
1. Khách nhận bảng giá và phát hiện số khác với thông tin tự tìm hiểu trước.
2. Khách gõ phàn nàn trong chat: *"Con số này sai rồi, sao lại cao vậy?"*
3. AI nhận diện sự không hài lòng → xin lỗi chân thành → chủ động đề xuất: *"Xin phép kết nối anh/chị với chuyên viên tư vấn, hotline 1900232389 (nhánh 1)."*
4. Toàn bộ conversation log được giữ nguyên — Sales tiếp nhận đủ context khi khách gọi.

**UX điểm quan trọng:** Session in-memory giữ toàn bộ lịch sử hội thoại — khách không cần giải thích lại từ đầu khi chuyển sang Sales.

---

### Path 4 — Correction (User chủ động điều chỉnh)

**Kịch bản:** Khách muốn so sánh có/không voucher.

**Flow:**
1. AI trả bảng dự toán với Voucher Vinhomes đã áp dụng.
2. Khách gõ: *"Tính lại không có voucher Vinhomes nhé."*
3. AI dùng lại giá xe đã biết từ context → gọi lại `calculate_rolling_price` với `discounts="none"` → trả bảng mới.
4. Toàn bộ 2 kịch bản (có/không voucher) nằm trong cùng 1 cửa sổ chat để khách dễ so sánh.

**UX điểm quan trọng:** Stateful session memory cho phép AI nhớ model xe và giá đã tra — không cần tra lại `search_car` lần nữa khi khách chỉ thay đổi điều kiện ưu đãi.

---

## 3. Eval Metrics + Threshold

### Metric ưu tiên: Precision

> Báo nhầm một ưu đãi không tồn tại (False Positive) nguy hiểm hơn nhiều việc bỏ sót một ưu đãi nhỏ (False Negative). Thà AI trả lời "Xin kết nối Sales" (giảm Recall) còn hơn đưa ra giá sai (giảm Precision).

### 3 Metrics chính

| Metric | Loại | Mục tiêu | Red Flag (dừng dự án) |
|--------|------|----------|----------------------|
| **Promotion Precision** | Kỹ thuật | ≥ 95% — ưu đãi AI báo phải tồn tại trong tài liệu Sale.md | < 90% → có nguy cơ khiếu nại hàng loạt |
| **Zero Hallucination Rate** | Kỹ thuật | 0 trường hợp AI tự tạo ưu đãi không có nguồn trong tài liệu | Bất kỳ 1 ca hallucinated promotion nào xuất hiện trong production |
| **Lead Conversion Rate** | Kinh doanh | Tăng ≥ 15% so với flow tư vấn thủ công (khách để lại SĐT / đặt lịch lái thử) | Không thay đổi sau 2 tháng = AI không tạo giá trị rõ ràng |

### Metric phụ (theo dõi)

- Average Handle Time của bộ phận Sales (target: giảm 40% câu hỏi FAQ giá)
- Drop-off rate giữa chừng (target: giảm 15%)
- Tỷ lệ session có ít nhất 1 tool call thành công (đo độ phủ intent)

### Bộ test cases (đã chạy thực — xem `backend/test_results.md`)

| Test | Loại | Expected | Kết quả |
|------|------|----------|---------|
| Chào hỏi, chưa hỏi giá | Direct answer | AI hỏi thêm, không gọi tool | ✅ Pass |
| Hỏi giá VF 5 | Single tool | `search_car` → trả giá 2 hình thức pin | ✅ Pass |
| Hỏi giá VF 5 + Vinhomes + HN | Multi-step happy path | 3 tools → bảng dự toán đúng | ✅ Pass |
| Hỏi giá nhưng thiếu dòng xe | Missing info | AI hỏi lại (không bịa, không gọi tool) | ✅ Pass |
| Hỏi code Python crawl giá xe | Out of scope | AI từ chối lịch sự | ✅ Pass |

---

## 4. Top 3 Failure Modes

### FM-01: Logic Error — Khuyến mãi chồng chéo

| | |
|---|---|
| **Trigger** | Khách áp dụng nhiều lớp ưu đãi cùng lúc: Mãnh liệt vì Tương lai Xanh (6% MSRP) + thu xăng đổi điện (3% MSRP) + voucher Giờ Trái Đất. AI dùng LLM để tự tính tổng thay vì engine. |
| **Hậu quả** | Báo giá cực thấp không thực tế → khách khiếu nại lừa đảo, ảnh hưởng uy tín thương hiệu |
| **Mitigation (Tech)** | **Kiến trúc tách biệt:** AI chỉ làm Extract entities (dòng xe, ưu đãi, vị trí) và convert % → VNĐ → `calculate_rolling_price` là **Rule-based engine Python thuần** (không LLM) thực hiện phép cộng trừ cuối cùng. System prompt cấm LLM tự tính số tiền. |
| **Mitigation (UX)** | Disclaimer bắt buộc cuối mỗi bảng: *"Thông tin mang tính tham khảo, kết nối với chuyên viên tư vấn để chốt giá cuối."* |

---

### FM-02: Knowledge Gap — Dữ liệu Outdated

| | |
|---|---|
| **Trigger** | Chương trình "Mãnh liệt vì Tương lai Xanh" hoặc "Giờ Trái Đất" hết hạn nhưng file Sale.md chưa được cập nhật. AI vẫn báo ưu đãi đã hết. |
| **Hậu quả** | Khách đến showroom được thông báo không còn ưu đãi → cảm giác bị lừa, hủy ý định mua |
| **Mitigation (Tech)** | (1) Sale.md có ghi rõ thời hạn từng chương trình (VD: "đến 30/06/2026") — AI được nhắc kèm thời hạn khi trả lời. (2) Giá niêm yết scrape qua Jina với **cache 5 phút** — tự động lấy mới nhất từ vinfastgiare.vn mỗi 5 phút. |
| **Mitigation (UX)** | AI nên nhắc thêm thời hạn áp dụng trong câu trả lời (VD: *"Chương trình này áp dụng đến 30/06/2026"*) để khách tự đối chiếu. |

---

### FM-03: Hallucination — AI tự tạo ưu đãi

| | |
|---|---|
| **Trigger** | Khách hỏi leading: *"VinFast đang giảm 500 triệu cho mọi dòng xe đúng không?"* AI confirm theo thay vì từ chối. |
| **Hậu quả** | Bóp méo chính sách công ty, lan truyền thông tin sai trên mạng xã hội |
| **Mitigation (Tech)** | (1) Tools LLM dùng `temperature=0` — giảm sáng tạo khi extract ưu đãi. (2) System prompt constraint cứng: *"Tuyệt đối không tự suy diễn ưu đãi ngoài cơ sở dữ liệu đã cung cấp."* (3) `check_promotions` chỉ đọc từ file Sale.md + vinhomes_promotion.md đã được duyệt — không gọi web search tự do. |
| **Mitigation (UX)** | AI từ chối rõ ràng và hướng dẫn khách kiểm tra trực tiếp tại vinfast.vn hoặc hotline 1900232389 |

---

## 5. ROI — 3 Kịch bản

| | Conservative (Dè dặt) | Realistic (Thực tế) | Optimistic (Lạc quan) |
|---|---|---|---|
| **Assumption** | Người dùng VN chưa quen chatbot, 80% vẫn gọi hotline ngay. Bot chỉ triển khai tại 1 showroom pilot. | 40% khách tự research với AI trước khi quyết định gọi Sales. Rollout 5–10 showroom. | 70% khách chốt sơ bộ ý định qua AI trước khi đặt lịch lái thử. Rollout toàn hệ thống. |
| **Cost** | Setup: ~$1–2k.<br>API: ~$50/tháng.<br>Maintenance: 1 người part-time cập nhật Sale.md định kỳ. | API/hệ thống ~$200–300/tháng + 1 NV review dữ liệu ưu đãi. | Scale lớn: API ~$1,000/tháng + đội ops RAG chuyên biệt (2–3 người). |
| **Benefit** | Lọc FAQ vô nghĩa, tiết kiệm ~5% thời gian CSKH. | Tiết kiệm 40% thời gian Sales cho FAQ báo giá cơ bản. Giảm drop-off 15%. Lead Conversion +10%. | Chốt sale tăng 25%. WOW experience. Không cần tăng headcount CSKH khi ra xe mới. |
| **Net** | Hòa vốn trong giai đoạn test thị trường. | Lợi nhuận dương từ tháng 3 nhờ tăng hiệu suất Sales và Lead Conversion. | Key growth driver của digital sales channel. |

**Kill criteria:** Dừng dự án nếu sau 2 tháng:
- Tỷ lệ AI tính sai ưu đãi > 10%, HOẶC
- Khách hàng bỏ qua bot hoàn toàn (tỷ lệ tương tác < 5% traffic), HOẶC
- Xuất hiện khiếu nại pháp lý liên quan tới báo giá sai

---

## 6. Mini AI Spec — Tóm tắt kỹ thuật (1 trang)

### Tên sản phẩm
**ViVi** — VinFast AI Price Advisor

### Kiến trúc tổng thể

```
[Khách hàng — React UI]
    │  POST /chat/stream  (SSE — stream token by token)
    │  POST /detect-car   (auto-detect xe + màu từ text)
    │  GET  /images/{filename} (ảnh xe served từ backend)
    ▼
[FastAPI Backend — api.py]
    │
    ▼
[LangGraph StateGraph]
    ├─ agent_node (GPT-4o-mini)
    │       └─ trả tool_calls → ToolNode
    └─ tool_node
            ├─ search_car        → Jina scrape vinfastgiare.vn (cache 5 min)
            ├─ check_promotions  → extract từ Sale.md + vinhomes_promotion.md
            └─ calculate_rolling_price → Rule-based Python engine (không LLM)
```

### Stack

| Layer | Công nghệ | Lý do chọn |
|---|---|---|
| Agent LLM | OpenAI GPT-4o-mini (default temp) | Cost thấp, đủ mạnh cho reasoning + tool calling |
| Tools LLM | OpenAI GPT-4o-mini (**temperature=0**) | temperature=0 khi extract ưu đãi để tối thiểu hallucination |
| Agent framework | LangGraph StateGraph | Native tool-calling loop; stateful conversation memory |
| Tool tính giá | Rule-based Python thuần (không LLM) | Loại bỏ hoàn toàn rủi ro LLM tính sai số tiền |
| Tool lấy giá | Jina AI reader + requests + in-memory cache | Lấy giá niêm yết thật từ web, không hardcode; cache 5 phút |
| Tool ưu đãi | Pre-load Markdown files + LLM extract | Tài liệu Sales duyệt sẵn, cập nhật không cần redeploy |
| Backend | FastAPI + Uvicorn | Async SSE streaming, CORS cho frontend dev |
| Frontend | **React + TypeScript + Tailwind + Framer Motion** | Component-based, animation mượt, shadcn/ui |

### 3 Tools và vai trò

| Tool | Input | Output | Ghi chú |
|---|---|---|---|
| `search_car(model)` | Tên dòng xe (VD: `"VF 5"`) | Giá thuê pin + giá mua pin (VNĐ) | Scrape real-time từ vinfastgiare.vn; LLM chỉ extract/format kết quả |
| `check_promotions(condition)` | Từ khóa ưu đãi (VD: `"vinhomes"`) | Mô tả ưu đãi + số tiền/% giảm | Extract từ Sale.md đã duyệt; **temperature=0** |
| `calculate_rolling_price(base_price, discounts, location)` | Giá gốc (int VNĐ), list `"MÃ:SỐ_TIỀN"`, tỉnh/thành | Bảng dự toán đầy đủ | **Không dùng LLM** — Python thuần: biển HN/HCM=20M, tỉnh=2M, phí khác=2.5M, trước bạ 0% |

### Dữ liệu ưu đãi thực tế (Sale.md — cập nhật 2026)

| Chương trình | Mức ưu đãi | Thời hạn |
|---|---|---|
| Giờ Trái Đất | Voucher 5–20M theo dòng xe | Đến 30/06/2026 |
| Thu xăng đổi điện | 3% MSRP | Đến 30/04/2026 |
| Mãnh liệt vì Tương lai Xanh | 6% MSRP (VF 3–7) / 10% MSRP (VF 8–9) | Đến 31/12/2026 |
| Mua xe 0 Đồng | Vay 100% giá trị xe | Đến 31/12/2026 |
| VF 7 / VF 8 Eco | Giảm thẳng 50M / 20–50M | Đến khi có thông báo mới |
| Công an / Quân đội | 5% MSRP | Đến khi có thông báo mới |

### UI — Frontend React

- **Layout 2 cột:** Trái = ChatPanel (chat), Phải = VisualPanel (hình xe + bảng màu)
- **Auto car detection:** Sau mỗi lượt chat, frontend gọi `/detect-car` → VisualPanel tự cập nhật đúng xe + màu đang được đề cập
- **Suggestion chips:** 6 câu gợi ý sẵn hiện trước khi user gửi tin đầu tiên
- **Voice input:** Tích hợp Web Speech API (SpeechRecognition) — khách nói thay vì gõ
- **Streaming realtime:** Bong bóng chat AI xuất hiện ngay từ token đầu tiên, text fill dần
- **Mascot ViVi:** Trạng thái `excited` khi khách hỏi về VF 9 hoặc xe sang

### System prompt design

- **Persona:** Chuyên viên tư vấn cao cấp VinFast, xưng "em", xưng hô "Anh/Chị"
- **Rules cứng:** Không bao giờ tự đoán số; bắt buộc gọi `calculate_rolling_price` cho mọi báo giá; disclaimer bắt buộc cuối bảng giá
- **Default location:** Tự động dùng "Hà Nội" nếu khách không cung cấp — không hỏi lại
- **Constraint chống hallucination:** Không tự suy diễn ưu đãi ngoài tài liệu; tools LLM temperature=0
- **Failure routing:** Tổ hợp quá phức tạp → escalate với câu chuẩn + hotline 1900232389

### Dữ liệu xe hỗ trợ (car_data.py)

VF 3 · VF 5 · VF 6 · VF 7 · VF 8 · VF 9 · VF e34 · EC Van · Nerio Green · Limo Green

### Session & Memory

- In-memory session dict (per `session_id` ngẫu nhiên theo timestamp) — giữ toàn bộ LangGraph message history qua nhiều lượt
- Streaming qua SSE (`/chat/stream`) — `on_chat_model_stream` event của LangGraph, chỉ stream từ `agent` node (không stream tool calls)

### Phân công

| Thành viên | Phần | Output |
|-----------|------|--------|
| Việt Anh - Linh | AI Canvas + Failure Mode Library | SPEC phần 1, 4 |
| Minh - Ngọc | User Stories 4 paths + UI flow sketch | SPEC phần 2 |
| Trường | Eval metrics + Test cases + ROI | SPEC phần 3, 5 · `backend/test_results.md` |
| Thanh - Hoàng | Backend agent · Tools · System prompt · Frontend React UI | `agent-vivi-lab6/` toàn bộ |
