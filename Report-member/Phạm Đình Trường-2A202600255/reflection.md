# Individual reflection — Phạm Đình Trường (Mã SV: 2A202600255)

## 1. Role
Research Intern / Data & Knowledge Engineer. Trong nhóm C2-C401 (Dự án VinFast AI Assistant), tôi phụ trách chính công tác thu thập, làm sạch, tổng hợp dữ liệu (Data Pipeline) cho hệ thống RAG và thiết lập kiến trúc xử lý của AI Agent (sử dụng LangGraph).

## 2. Đóng góp cụ thể
- **Thu thập và tổng hợp dữ liệu (Data Gathering & Synthesis):** Trích xuất thông tin từ 7 văn bản chính sách bán hàng VinFast phức tạp (cộng dồn voucher, thu cũ đổi mới, giá thanh lý pin, chính sách sạc).
- **Cấu trúc hóa dữ liệu (Data Structuring):** Chuyển đổi dữ liệu thô (từ các file PDF lộn xộn) thành định dạng bảng Markdown chuẩn mực và file CSV. Đây là bước sống còn giúp LLM (thông qua RAG) có thể hiểu và trích xuất (Entity Extraction) chính xác tuyệt đối mà không bị "ảo giác" (hallucination).
- **Xây dựng Database đa phương thức:** Ánh xạ và gán nhãn chính xác hàng loạt đường link hình ảnh màu xe, khớp với từng dòng xe trong chính sách để cung cấp nguồn dữ liệu trực quan cho Agent.
- **Thiết lập Agent Architecture:** Xây dựng file kiến trúc code Python sử dụng LangGraph (AgentState, ToolNode) để Agent biết cách truy xuất vào nguồn dữ liệu vừa được tổng hợp.
- Phân mảnh tệp khách hàng theo hành vi tương tác dữ liệu (Voucher Hunter, Night Owl Researcher, Financially Sensitive) để làm cơ sở thiết kế prompt.

## 3. SPEC mạnh/yếu
- **Mạnh nhất:** Phần Data Flow và Mitigation. Nhóm đã xác định rõ hướng **Augmentation (Tăng cường)** thay vì Automation 100%. Nhờ cơ sở dữ liệu được phân chia rành mạch (có nguồn trích dẫn mã văn bản rõ ràng), AI có thể tự tin báo "giá dự toán" và chuyển giao cho Sales (Handoff) nếu dữ liệu đầu vào của khách quá phức tạp.
- **Yếu nhất:** Bảng tính ROI. Ở kịch bản Realistic, ROI vẫn mang tính lý thuyết. Do lượng dữ liệu văn bản chính sách VinFast nạp vào quá lớn, đáng lẽ cần bóc tách chi tiết hơn về chi phí API (Token/Embedding cost) cho các truy vấn RAG context window dài so với chi phí lương thực tế của CSKH.

## 4. Đóng góp khác
- Hỗ trợ team UX/UI (Ngọc & Linh) bằng cách cung cấp cấu trúc dữ liệu chuẩn (như file CSV về màu xe) để các bạn dễ dàng thiết kế tính năng Interactive Price Cards (Thẻ giá tương tác) và Visual Citation (Trích dẫn hình ảnh).
- Tư vấn cách lưu trữ Context Memory trong luồng chat LangGraph để AI nhớ được dữ liệu khách hàng đã cung cấp ở các câu trước (VD: đang chọn VF 3 đổi sang VF 5 thì AI tự động cập nhật lại bảng màu tương ứng).

## 5. Điều học được
Trước đây tôi nghĩ làm RAG đơn giản là "ném" file PDF thô vào cho LLM đọc. Sáng nay, khi trực tiếp làm việc với ma trận dữ liệu VinFast, tôi mới thấm thía nguyên lý **"Garbage in, Garbage out"**. 
Hệ thống Agent có viết code LangGraph xịn đến đâu, nhưng nếu dữ liệu thô không được dọn dẹp, tổng hợp và phân bảng Markdown rành mạch thì LLM cũng sẽ tính toán sai bét. Kỹ năng thiết kế và quy hoạch Dữ liệu (Knowledge Engineering) mang tính quyết định đến 80% độ thông minh của Bot.

## 6. Nếu làm lại
Thay vì xử lý và tổng hợp dữ liệu từ file PDF một cách thủ công, nếu có thời gian tôi sẽ viết một hệ thống **Automated Data Pipeline** (Dùng Python + BeautifulSoup/Selenium) để tự động crawl và format dữ liệu từ website VinFast định kỳ. Điều này giúp cơ sở dữ liệu của Agent luôn được cập nhật Real-time.

## 7. AI giúp gì / AI sai gì
- **Giúp:** Dùng Gemini để bóc tách, chuẩn hóa hàng loạt bảng giá phức tạp thành Markdown và xử lý map link ảnh vào file CSV cực kỳ nhanh. Gemini cũng giúp giải thích cặn kẽ tư duy thiết kế luồng (StateGraph, ToolNode) của LangGraph.
- **Sai/mislead:** Ban đầu khi nhờ AI cấu trúc lại bảng màu xe, AI có xu hướng gộp chung các màu "Tiêu chuẩn" và "Nâng cao" vào một ô, làm mất đi dữ liệu về phụ phí (VD: +8.000.000 VNĐ). Tôi phải prompt lại rất kỹ, ép AI phải phân loại rạch ròi từng dòng dữ liệu thì mới ra được file CSV chuẩn để nạp cho Agent. Bài học: Không được tin tưởng AI 100% trong việc xử lý Data thô, luôn phải có bước Human-verify (Con người kiểm chứng).
