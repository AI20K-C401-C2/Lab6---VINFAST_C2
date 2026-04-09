# Prototype: VinFast Sales & Promotion AI Agent

## 1. Mô tả prototype
Chatbot AI tư vấn bán hàng dành riêng cho xe ô tô VinFast, ứng dụng công nghệ Deep RAG để tra cứu chính xác các chính sách khuyến mãi và hỗ trợ tính toán giá lăn bánh tùy thuộc vào từng dòng xe và đối tượng cụ thể. Trợ lý ảo này giúp tự động hóa khâu giải đáp thắc mắc khách hàng, giảm thiểu hoàn toàn thông tin sai lệch (hallucination) nhờ luôn bám sát vào kho dữ liệu chính sách (`Sale.md`) của VinFast.

## 2. Level
**Working** (Đã chạy được code bằng Python với luồng LangGraph, tích hợp tools và gọi được API để chat trực tiếp).

## 3. Link prototype
- **GitHub Repo / Source Code:** (https://github.com/AI20K-C401-C2/Lab6---VINFAST_C2.git)


## 4. Tools và API đã dùng
- **Khung tư duy Agent:**LangGraph, LangChain 
- **LLM API:** OpenAI
- **Kỹ thuật lưu trữ / Tìm kiếm:** RAG (Retrieval-Augmented Generation) đọc và trích xuất dữ liệu từ file Markdown cục bộ.
- **Ngôn ngữ lập trình:** Python

## 5. Phân công công việc
*(Nhóm tự bổ sung tên các thành viên còn lại cho đầy đủ)*

- **Phạm Việt Anh + Phạm Việt Hoàng + Bùi Minh Ngọc (Product Owner + Developer):** Lên ý tưởng đề tài, phân tích bài toán (Canvas & Problem). Khởi tạo cấu trúc project, viết khung sườn code cho `tools.py`, vòng lặp `agent.py`, trực tiếp tham gia thiết kế `system prompt`. Tạo test case và fix lỗi phát sinh.
- **Lê Đức Thanh + Phan Tuấn Minh:** Tạo file metadata, tham gia chuẩn bị dữ liệu, lập bộ câu hỏi đánh giá (eval metrics) và test độ phản hồi của chatbot.
- **Nguyễn Thùy Linh + Phạm ĐÌnh Trường:** Xử lý hồ sơ tài liệu (đọc, chắt lọc 17 file PDF hợp đồng & chính sách VinFast để tổng hợp thành file `Sale.md`), chuẩn bị kịch bản quay demo.

