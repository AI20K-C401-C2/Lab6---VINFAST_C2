# Individual Reflection — Bùi Minh Ngọc (2A202600354)

## 1. Role

**Product Owner + Developer.** Phụ trách định hình bài toán từ góc nhìn người dùng, khởi tạo cấu trúc kỹ thuật của project, và đồng thời trực tiếp viết code cho phần lõi của agent.

---

## 2. Đóng góp cụ thể

- **Khởi tạo cấu trúc project và viết khung code lõi:** Tạo skeleton cho `tools.py` (3 tools: `search_car`, `check_promotions`, `calculate_rolling_price`) và vòng lặp `agent.py` với LangGraph StateGraph — đây là nền tảng để cả nhóm build tiếp.
- **Viết SPEC phần 2 — User Stories 4 paths:** Thiết kế đầy đủ 4 kịch bản hội thoại (Happy path, Low-confidence, Failure/Recovery, Correction) với flow chi tiết và UX note cụ thể cho từng bước; là phần SPEC được dùng trực tiếp làm tài liệu test sau này.
- **Thiết kế và iterate system prompt:** Cùng Việt Anh và Hoàng viết system prompt cho ViVi — bao gồm persona, rules cứng chống hallucination, default location và failure routing — qua nhiều vòng chỉnh sửa dựa trên kết quả test thực tế.

---

## 3. SPEC phần nào mạnh nhất / yếu nhất?

**Mạnh nhất — User Stories 4 paths (Phần 2):**  
Đây là phần được thiết kế kỹ nhất. Mỗi path không chỉ liệt kê luồng mà còn ghi rõ "UX điểm quan trọng" — ví dụ: không hiện loading trắng, suggestion chips biến mất sau tin nhắn đầu, AI không bao giờ gửi câu hứa hẹn kiểu "Em sẽ tra cứu...". Những chi tiết này xuất phát từ việc mô phỏng hành vi người dùng thực, không chỉ nghĩ ra flow lý thuyết.

**Yếu nhất — ROI / Phần 5:**  
Ba kịch bản Conservative / Realistic / Optimistic về cơ bản chỉ khác nhau ở số lượng showroom và tỷ lệ người dùng chấp nhận bot. Assumption nền (chi phí API, cấu trúc đội ngũ, hành vi khách hàng) vẫn còn na ná nhau. Để thuyết phục hơn, mỗi kịch bản cần một assumption khác biệt thực sự — ví dụ: conservative nên giả định thị trường VN chưa quen chatbot + chỉ pilot 1 showroom, còn optimistic cần thêm assumption về tích hợp đặt lịch lái thử trực tiếp từ chat.

---

## 4. Đóng góp khác

- **Tạo test cases và fix bug:** Sau khi có khung agent, trực tiếp chạy 10+ câu hỏi test để bắt các trường hợp AI tự tính tiền (thay vì gọi tool), AI hỏi lại location dù system prompt đã set default Hà Nội — và sửa lại prompt tương ứng.
- **Hỗ trợ debug luồng tool-calling:** Phát hiện lỗi agent gọi `calculate_rolling_price` với sai định dạng tham số `discounts` (dạng chuỗi thay vì `"MÃ:SỐ_TIỀN"`) — truy ngược ra system prompt thiếu ví dụ cụ thể về format input và bổ sung vào.

---

## 5. Điều học được trong hackathon mà trước đó chưa biết

Trước hackathon tôi nghĩ LLM với `temperature=0` là "chính xác hơn" nên nên dùng mặc định. Sau khi làm mới hiểu: `temperature=0` chỉ nên áp dụng cho **tool extraction** (extract ưu đãi từ văn bản) để tối thiểu hallucination khi làm việc với số tiền cụ thể — còn agent chính cần giữ temperature mặc định để linh hoạt trong hội thoại tự nhiên. Đây là quyết định **product**, không phải chỉ engineering: đặt sai temperature ở sai chỗ có thể khiến AI hoặc cứng nhắc khi chat, hoặc "sáng tạo" khi tính tiền — cả hai đều tệ theo cách khác nhau.

---

## 6. Nếu làm lại, đổi gì?

Sẽ viết test cases **trước khi viết system prompt** — tức là ngay khi có SPEC phần 2 (User Stories), chuyển luôn 4 path đó thành file test cases với Expected Output cụ thể. Thực tế nhóm viết prompt trước, rồi mới test, nên mỗi lần test fail lại không rõ lỗi do prompt sai hay do flow logic sai. Nếu có acceptance test từ đầu, việc debug sẽ nhanh hơn ít nhất 2–3 lần vì biết chính xác muốn AI output gì trước khi bắt đầu viết prompt.

---

## 7. AI giúp gì? AI sai / mislead ở đâu?

**AI giúp:**  
Dùng Claude để brainstorm Failure Modes — nó gợi ý thêm case "khách hỏi leading" (*"VinFast đang giảm 500 triệu đúng không?"*) mà nhóm chưa nghĩ tới (FM-03). Đây trở thành một trong những failure mode quan trọng nhất vì nó test trực tiếp khả năng chống hallucination của hệ thống.  
Ngoài ra, dùng AI để dự thảo nhanh format bảng ưu đãi trong `Sale.md` từ dữ liệu thô — tiết kiệm khoảng 1–2 giờ format thủ công.

**AI sai / mislead:**  
Khi hỏi AI về kiến trúc, nó gợi ý dùng **vector database (FAISS)** để lưu và tìm kiếm ưu đãi trong `Sale.md`. Nghe có vẻ "đúng theo lý thuyết RAG", nhưng thực tế file Sale.md chỉ có ~200 dòng — embedding + vector search hoàn toàn overkill, chậm hơn và phức tạp hơn so với đọc file trực tiếp rồi dùng LLM extract. Nếu không nhận ra điều này sớm, nhóm đã mất nửa ngày setup FAISS cho một bài toán không cần đến nó. Bài học: AI có xu hướng gợi ý giải pháp "theo sách giáo khoa" thay vì giải pháp đơn giản nhất phù hợp với scale thực tế.
