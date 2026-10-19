# HƯỚNG DẪN TÙY CHỈNH THIỆP 20/10 ✨

Dự án đã được thiết kế đúng chuẩn 100% theo các hình ảnh bạn gửi:
1. **Giai đoạn 1 (Ảnh 2):** Bó hoa hồng pastel sang trọng giữa bầu trời đêm lấp lánh sao, đom đóm và cánh bướm vỗ cánh. Kèm dòng gợi ý `"Chạm vào bó hoa"` và lời bài hát `" TRỜI LÀM MÁ EM THÊM HỒNG "`.
2. **Giai đoạn 2 (Ảnh 3):** Chạm vào bó hoa -> Nhạc phát du dương -> Các bông hoa hồng bung nở rực rỡ và lồng vào khuôn mặt/ảnh của bạn nữ. Dòng nhắc đổi thành `"Chạm tiếp để bung tỏa bất ngờ ✨"`.
3. **Giai đoạn 3 (Ảnh 4):** Không gian ngập tràn tình cảm lung linh: các bức ảnh kỷ niệm trôi bồng bềnh lơ lửng, các chữ phát sáng **Neon Glow** hồng rực rỡ: *"May Mắn", "20/10", "Chúc bạn luôn yêu đời", "Rạng Rỡ", "Thành Công & Tự Tin", "Hạnh Phúc"*.
4. **Bức thiệp chúc:** Khi bấm nút *"Mở Lời Chúc 20/10"* hoặc chạm vào các ảnh, một bức thiệp xinh đẹp mở ra với những câu chúc lịch thiệp, dễ thương, tôn trọng phái đẹp nhân dịp 20/10 (hoàn toàn phù hợp cho bạn bè, bạn nữ, bạn thân, đồng nghiệp - không phải người yêu).

---

## CÁCH 1: TÙY CHỈNH SIÊU NHANH TRỰC TIẾP TRÊN TRANG WEB ⚡
1. Nhấp đúp chuột vào file `index.html` để mở trang web bằng trình duyệt (Chrome, Cốc Cốc, Edge...).
2. Bấm vào biểu tượng **Bánh răng (⚙️)** ở góc trên bên phải màn hình.
3. Tại đây bạn có thể:
   - Nhập tên của bạn nữ (Ví dụ: *Mai Anh, Linh, Thảo,...*).
   - Bấm chọn **5 - 7 bức ảnh** trực tiếp từ máy tính/điện thoại của bạn.
   - Chọn file nhạc `.mp3` hoặc dán link bài hát bạn thích.
4. Bấm nút **"Áp Dụng Ngay"** là trang web sẽ tự cập nhật ảnh và nhạc ngay lập tức!

---

## CÁCH 2: TÙY CHỈNH QUA FILE `config.js` (LƯU VĨNH VIỄN) 🛠️
Mở file `config.js` bằng Notepad hoặc VS Code:

### 1. Thay ảnh của bạn nữ:
- Cách dễ nhất: Bạn copy các bức ảnh của bạn nữ vào thư mục `images/` và đặt tên là:
  `images/anh1.jpg`, `images/anh2.jpg`, `images/anh3.jpg`, `images/anh4.jpg`, `images/anh5.jpg`, `images/anh6.jpg`
- Trong file `config.js`, danh sách ảnh sẽ như sau:
```javascript
photos: [
    "images/anh1.jpg",
    "images/anh2.jpg",
    "images/anh3.jpg",
    "images/anh4.jpg",
    "images/anh5.jpg",
    "images/anh6.jpg"
],
```

### 2. Thay bài hát:
- Bạn tải bài hát yêu thích (dạng đuôi `.mp3`), chép vào cùng thư mục với file `index.html` và đổi tên thành: `nhac-nen.mp3`.
- Trong file `config.js`:
```javascript
musicSrc: "nhac-nen.mp3",
```

### 3. Đổi lời chúc hoặc lyric bài hát:
- Bạn có thể chỉnh sửa tự do các câu trong mảng `lyrics`, `neonWishes` và `letterMessage` trong file `config.js`.

---

## 💡 MẸO GỬI CHO BẠN NỮ:
- Nếu muốn bạn nữ mở xem qua điện thoại: Bạn có thể đưa code này lên GitHub Pages, Vercel hoặc Netlify (hoàn toàn miễn phí chỉ mất 1 phút), sau đó tạo mã QR dẫn tới link đó (giống như tấm thiệp ở **Ảnh 1** bạn đã gửi)!

