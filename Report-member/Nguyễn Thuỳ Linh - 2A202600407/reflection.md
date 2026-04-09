# Individual Reflection — Nguyễn Thùy Linh (2A202600407)

## 1. Vai trò trong dự án

Trong dự án ViVi (VinFast AI Price Advisor), mình đảm nhiệm vai trò Prompt Engineer + QA, đồng thời tham gia thiết kế UI cho trải nghiệm chat tư vấn giá lăn bánh. Trọng tâm công việc của mình là: xây dựng prompt an toàn và nhất quán, kiểm thử end-to-end theo các path trong SPEC, và tối ưu giao diện để người dùng nhận phản hồi nhanh, rõ, dễ theo dõi.

---

## 2. Đóng góp cụ thể

- **Thiết kế và tối ưu system prompt:** Xây dựng prompt theo đúng định hướng SPEC với persona tư vấn VinFast, quy tắc chống hallucination, mặc định location Hà Nội khi thiếu thông tin, và failure routing sang hotline khi cần escalation. Prompt được tinh chỉnh qua nhiều vòng dựa trên hành vi thực tế của agent.
- **Thiết kế UI cho luồng tư vấn:** Tham gia hoàn thiện flow giao diện 2 cột (ChatPanel + VisualPanel), đảm bảo các điểm UX quan trọng: streaming từng token, bong bóng AI hiển thị ngay từ token đầu, suggestion chips ẩn sau tin nhắn đầu tiên, và panel hình ảnh xe cập nhật theo ngữ cảnh hội thoại.
- **Test các trường hợp trong testcase:** Thực hiện kiểm thử đầy đủ các nhóm case đã định nghĩa trong SPEC và test results, gồm: chào hỏi/thiếu thông tin, hỏi giá theo model, happy path nhiều tool, câu hỏi ngoài phạm vi, và các tình huống correction/recovery. Kết quả được đối chiếu Expected vs Actual để xác nhận độ ổn định trước demo.
- **Phát hiện lỗi và hỗ trợ fix:** Từ các ca fail, xác định nguyên nhân ở format tham số discounts khi gọi tool tính giá, sau đó bổ sung hướng dẫn rõ trong prompt và phối hợp backend để chuẩn hóa luồng tool-calling.

---

## 3. SPEC phần nào mạnh nhất / yếu nhất?

**Mạnh nhất — User Stories 4 paths (Phần 2):**  
Đây là phần được làm chắc tay nhất vì vừa có logic hội thoại vừa có yêu cầu UX cụ thể. Mỗi path đều chỉ rõ cách xử lý và tiêu chí trải nghiệm (streaming tức thì, hỏi lại đúng thông tin còn thiếu, giữ context để so sánh các phương án), nên chuyển thành testcase rất thuận lợi và dễ đo chất lượng.

**Yếu nhất — ROI / Phần 5:**  
Phần ROI đã có khung 3 kịch bản nhưng giả định giữa các kịch bản còn gần nhau ở một số biến nền. Nếu làm sâu hơn, cần tách mạnh hơn về giả định hành vi người dùng, phạm vi rollout và mức độ tích hợp vận hành để tăng tính thuyết phục khi đánh giá hiệu quả tài chính.

---

## 4. Đóng góp khác

- **Đóng góp vào User Stories và UX flow:** Cùng nhóm hoàn thiện 4 path hội thoại (Happy, Low-confidence, Failure/Recovery, Correction), đặc biệt là phần UX note để đảm bảo trải nghiệm thực tế không bị đứt mạch khi user trao đổi nhiều lượt.
- **Bổ sung ràng buộc chống hallucination:** Sau khi ghi nhận nguy cơ agent xác nhận thông tin dẫn dắt từ người dùng, mình cập nhật rule cứng trong prompt để agent chỉ trả lời theo dữ liệu đã duyệt và hướng dẫn escalation khi cần.
- **Liên kết chặt giữa UI và kiểm thử:** Dùng chính các path trong SPEC để kiểm tra cả đúng-sai nghiệp vụ lẫn hành vi hiển thị giao diện trong từng tình huống.

---

## 5. Điều học được trong hackathon mà trước đó chưa biết

Trước hackathon mình từng nghĩ chỉ cần tối ưu model là đủ. Sau khi làm dự án, mình nhận ra chất lượng thực tế phụ thuộc vào bộ ba: prompt đúng, UI đúng và testcase đúng. Đặc biệt với bài toán báo giá, phải tách rõ phần hội thoại và phần tính toán: AI dùng để hiểu ý định và điều kiện, còn phép tính cuối cần đi qua rule-based engine để giảm tối đa rủi ro sai số.

---

## 6. Nếu làm lại, đổi gì?

Nếu làm lại, mình sẽ khóa bộ acceptance test ngay từ khi chốt User Stories, sau đó mới iterate prompt và UI. Cách này giúp debug nhanh hơn vì biết rõ lỗi nằm ở logic hội thoại, cách gọi tool hay hành vi giao diện, thay vì phải suy đoán nguyên nhân sau khi đã triển khai nhiều phần cùng lúc.

---

## 7. AI giúp gì? AI sai / mislead ở đâu?

**AI giúp:**  
Dùng AI để brainstorm failure modes và rà soát các lỗ hổng trong luồng hỏi đáp, nhờ đó nhóm bổ sung được các case khó như câu hỏi dẫn dắt về ưu đãi không có thật. AI cũng hỗ trợ rút gọn thời gian chuẩn hóa tài liệu đầu vào để nhóm tập trung hơn vào kiểm thử và tối ưu trải nghiệm.

**AI sai / mislead:**  
AI từng gợi ý một số hướng kiến trúc khá nặng so với quy mô dữ liệu thực tế, dễ làm tăng độ phức tạp mà không tăng hiệu quả tương ứng. Bài học mình rút ra là luôn đối chiếu đề xuất của AI với ràng buộc thật của sản phẩm: quy mô dữ liệu, thời gian triển khai, chi phí vận hành và yêu cầu độ chính xác trong production.
