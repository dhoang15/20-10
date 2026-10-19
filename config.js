// ==========================================
// CẤU HÌNH DÀNH RIÊNG CHO BẠN (DỄ DÀNG CHỈNH SỬA)
// ==========================================

const CONFIG = {
    // Tên của bạn nữ (ví dụ: "Linh", "Trang", "Mai",...)
    recipientName: "Thu Hiền",

    // File nhạc nền (có thể dùng file mp3 để cùng thư mục hoặc link nhạc trực tuyến)
    musicSrc: "nhac-nen.mp3", // File nhạc nền có sẵn trong thư mục, bạn có thể thay bài khác bất cứ lúc nào

    // Danh sách 6 bức ảnh xinh đẹp của Thu Hiền
    photos: [
        "images/anh1.jpg",
        "images/anh2.jpg",
        "images/anh3.jpg",
        "images/anh4.jpg",
        "images/anh5.jpg",
        "images/anh6.jpg"
    ],
    // Video (nếu bạn có file video.mp4, bạn có thể copy vào thư mục này)
    videoSrc: "",

    // Các câu lyric bài hát chuẩn video TikTok & lời chúc Thu Hiền
    lyrics: [
        "\" TRỜI LÀM MÁ EM THÊM HỒNG \"",
        "\" CHỜ ANH CHÚT THÔI \"",
        "\" CHỜ ANH CHÚT THÔI\nKHI MÙA ĐÔNG VỪA SANG \"",
        "\" CHÚC THU HIỀN 20/10 LUÔN RẠNG RỠ \"",
        "\" NỤ CƯỜI TỎA NẮNG MỖI NGÀY \"",
        "\" MAY MẮN VÀ BÌNH AN LUÔN BÊN CẬU \"",
        "\" LUÔN LÀ BÔNG HOA XINH ĐẸP VÀ ĐỘC NHẤT ✨ \""
    ],

    // Các từ khóa phát sáng Neon bay lượn ở màn hình cuối (Ảnh 4)
    // Tinh tế, lịch thiệp, chúc bạn bè/bạn nữ, không sến sẩm người yêu
    neonWishes: [
        { text: "Thu Hiền ✨", size: "huge", color: "#ff4d88" },
        { text: "20/10", size: "huge", color: "#ff7597" },
        { text: "May Mắn", size: "large", color: "#ff85a2" },
        { text: "Chúc Thu Hiền luôn yêu đời", size: "normal", color: "#ffb3c6" },
        { text: "Rạng Rỡ", size: "large", color: "#ff7597" },
        { text: "Luôn Xinh Đẹp", size: "normal", color: "#ff99bb" },
        { text: "Hạnh Phúc", size: "huge", color: "#ff6699" },
        { text: "Thành Công & Tự Tin", size: "normal", color: "#ffaec9" },
        { text: "Vui Vẻ Mỗi Ngày", size: "large", color: "#ff8da9" },
        { text: "Bình An", size: "large", color: "#ff6b8b" },
        { text: "Mọi Điều Như Ý ✨", size: "normal", color: "#ff94b8" },
        { text: "Always Shine!", size: "normal", color: "#ffc2d1" }
    ],

    // Nội dung bức thiệp chúc mừng lịch thiệp, ấm áp
    letterTitle: "Gửi Thu Hiền Ngày 20/10 ✨",
    letterMessage: `Chúc Thu Hiền có một ngày Phụ nữ Việt Nam 20/10 thật nhiều niềm vui, luôn xinh đẹp, rạng rỡ và tràn đầy năng lượng tích cực!

Mong Thu Hiền luôn giữ nụ cười thật tươi trên môi, gặt hái thật nhiều thành công trong học tập và cuộc sống, và luôn được yêu thương, trân trọng mỗi ngày.

Chúc bạn luôn là đóa hoa xinh đẹp, ngát hương và độc nhất! 💐🌸`
};

