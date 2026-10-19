// =========================================================
// SCRIPT.JS - ĐIỀU KHIỂN HIỆU ỨNG & TƯƠNG TÁC 20/10
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. KHỞI TẠO BIẾN & DỮ LIỆU ---
    let appConfig = getActiveConfig();
    let currentStep = 1; // 1: Bó hoa nguyên bản -> 2: Nở ảnh trên hoa -> 3: Không gian Neon & Kỷ niệm
    let lyricIndex = 0;
    let lyricInterval = null;
    let isMusicPlaying = false;

    function getActiveConfig() {
        let saved = loadSavedConfig();
        // Nếu đã có ảnh thật của người dùng trong CONFIG (images/anh1.jpg), ưu tiên dùng CONFIG
        if (!saved || !saved.photos || saved.photos[0].includes('unsplash.com')) {
            return { ...CONFIG };
        }
        return saved;
    }

    // DOM Elements
    const audio = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicOffIcon = document.getElementById('music-off-icon');
    const sceneBouquet = document.getElementById('scene-bouquet');
    const bouquetClickable = document.getElementById('bouquet-clickable');
    const actionHint = document.getElementById('action-hint');
    const lyricsText = document.getElementById('lyrics-text');
    const sceneWishes = document.getElementById('scene-wishes');
    const photoBloomsContainer = document.getElementById('photo-blooms-container');
    const neonCloud = document.getElementById('neon-wishes-cloud');
    const floatingGallery = document.getElementById('floating-gallery');
    
    // Modal Elements
    const letterModal = document.getElementById('letter-modal');
    const openLetterBtn = document.getElementById('open-letter-btn');
    const closeLetterBtn = document.getElementById('close-letter-btn');
    const letterBody = document.getElementById('letter-body-content');
    const letterTitle = document.getElementById('letter-recipient-title');
    const replayBtn = document.getElementById('replay-btn');
    
    const settingsModal = document.getElementById('settings-modal');
    const customBtn = document.getElementById('custom-btn');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const resetSettingsBtn = document.getElementById('reset-settings-btn');

    // --- 2. CẤU HÌNH BAN ĐẦU ---
    initApp();

    function initApp() {
        // Cài đặt nguồn nhạc
        audio.src = appConfig.musicSrc || "nhac-nen.mp3";
        audio.load();

        // Cập nhật nội dung thiệp
        letterTitle.textContent = appConfig.recipientName 
            ? `Gửi ${appConfig.recipientName} Ngày 20/10 ✨` 
            : (appConfig.letterTitle || "Gửi Bạn Ngày 20/10 ✨");
        letterBody.textContent = appConfig.letterMessage || CONFIG.letterMessage;

        // Sinh các bức ảnh hoa nở (Giai đoạn 2)
        renderBloomPhotos();

        // Hiển thị lyric mở đầu chuẩn theo video: " TRỜI LÀM MÁ EM THÊM HỒNG "
        updateLyrics(0);

        // Khởi động canvas hiệu ứng hạt sao & cánh hoa
        initCanvas();
    }

    // --- 3. QUẢN LÝ NHẠC ---
    function tryPlayMusic() {
        if (!isMusicPlaying) {
            audio.play().then(() => {
                isMusicPlaying = true;
                musicToggle.classList.remove('paused');
                musicOffIcon.classList.add('hidden');
            }).catch(err => {
                console.log("Trình duyệt chờ tương tác để phát nhạc:", err);
            });
        }
    }

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            audio.play();
            isMusicPlaying = true;
            musicToggle.classList.remove('paused');
            musicOffIcon.classList.add('hidden');
        } else {
            audio.pause();
            isMusicPlaying = false;
            musicToggle.classList.add('paused');
            musicOffIcon.classList.remove('hidden');
        }
    });

    // --- 4. TƯƠNG TÁC BÓ HOA (GIAI ĐOẠN 1 -> 2 -> 3) ---
    // Tọa độ lồng ảnh vào từng đóa hoa hồng trong bó hoa thực tế (Ảnh 3)
    const bloomPositions = [
        { top: '35%', left: '49%', cls: 'bp-center' },  // Bông hồng trung tâm lớn nhất
        { top: '22%', left: '30%', cls: '' },           // Bông hồng góc trên trái
        { top: '24%', left: '72%', cls: '' },           // Bông hồng góc trên phải
        { top: '17%', left: '46%', cls: '' },           // Bông đỉnh giữa
        { top: '44%', left: '37%', cls: '' },           // Bông dưới bên trái
        { top: '42%', left: '64%', cls: '' }            // Bông dưới bên phải
    ];

    function renderBloomPhotos() {
        photoBloomsContainer.innerHTML = '';
        const photos = appConfig.photos && appConfig.photos.length > 0 
            ? appConfig.photos 
            : CONFIG.photos;

        bloomPositions.forEach((pos, idx) => {
            const photoUrl = photos[idx % photos.length];
            const card = document.createElement('div');
            card.className = `bloom-photo-card ${pos.cls}`;
            card.style.top = pos.top;
            card.style.left = pos.left;
            card.style.transitionDelay = `${idx * 0.08}s`;

            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = `Ảnh ${idx + 1}`;
            card.appendChild(img);
            photoBloomsContainer.appendChild(card);
        });
    }

    // GẮN SỰ KIỆN CLICK TRỰC TIẾP CHO CẢ NÚT GỢI Ý, BÓ HOA VÀ SCENE
    actionHint.addEventListener('click', handleBouquetStep);
    bouquetClickable.addEventListener('click', handleBouquetStep);
    sceneBouquet.addEventListener('click', handleBouquetStep);

    function handleBouquetStep(e) {
        if (e && e.target && e.target.closest('.icon-btn')) return;

        tryPlayMusic();

        if (currentStep === 1) {
            // Bước 1 -> Bước 2: Bung nở các đóa hoa ảnh Thu Hiền (Ảnh 3)
            currentStep = 2;
            bouquetClickable.classList.add('bloomed');
            actionHint.innerHTML = '<span class="hint-icon">✨</span> Chạm tiếp để bung tỏa <span class="hint-icon">🌸</span>';
            
            // Cập nhật lyric sang câu 2 chuẩn TikTok: " CHỜ ANH CHÚT THÔI "
            updateLyrics(1);

            // Bắn hạt pháo hoa lấp lánh xung quanh bó hoa
            const rect = bouquetClickable.getBoundingClientRect();
            triggerBurst(rect.left + rect.width / 2, rect.top + rect.height * 0.4, 40);

        } else if (currentStep === 2) {
            // Bước 2 -> Bước 3: Chuyển sang không gian Neon & Kỷ niệm (Ảnh 4)
            currentStep = 3;
            const rect = bouquetClickable.getBoundingClientRect();
            triggerBurst(rect.left + rect.width / 2, rect.top + rect.height * 0.4, 80);

            sceneBouquet.classList.remove('active');
            setTimeout(() => {
                sceneWishes.classList.add('active');
                renderNeonCloud();
                renderFloatingGallery();
                
                // Cập nhật lyric sang câu 3 chuẩn TikTok: " CHỜ ANH CHÚT THÔI / KHI MÙA ĐÔNG VỪA SANG "
                updateLyrics(2);

                // Sau khi kết thúc giai điệu chính, bắt đầu lặp các lời chúc ngọt ngào cho Thu Hiền
                setTimeout(() => {
                    startLyricsLoop();
                }, 5000);
            }, 500);
        }
    }

    // --- 5. RENDER CẢNH 3: KHÔNG GIAN NEON & KỶ NIỆM (ẢNH 4) ---
    function renderNeonCloud() {
        neonCloud.innerHTML = '';
        const wishes = appConfig.neonWishes || CONFIG.neonWishes;

        wishes.forEach((item, index) => {
            const span = document.createElement('span');
            span.className = `neon-word size-${item.size}`;
            span.textContent = item.text;
            span.style.color = item.color;
            span.style.textShadow = `0 0 6px ${item.color}, 0 0 16px ${item.color}, 0 0 30px ${item.color}`;

            const row = Math.floor(index / 2);
            const col = index % 2;
            const topPos = 8 + (row * 16) + (Math.random() * 5);
            const leftPos = col === 0 
                ? 6 + Math.random() * 32 
                : 50 + Math.random() * 30;

            span.style.top = `${topPos}%`;
            span.style.left = `${leftPos}%`;
            span.style.animationDelay = `${(index * 0.4).toFixed(1)}s`;
            span.style.animationDuration = `${4 + (index % 3)}s`;

            neonCloud.appendChild(span);
        });
    }

    function renderFloatingGallery() {
        floatingGallery.innerHTML = '';
        const photos = appConfig.photos || CONFIG.photos;
        const videoSrc = appConfig.videoSrc || "";

        const layouts = [
            { top: '8%', left: '8%', w: '130px', h: '165px', rot: '-6deg', delay: '0s' },
            { top: '15%', right: '8%', w: '110px', h: '140px', rot: '8deg', delay: '0.8s' },
            { top: '42%', left: '5%', w: '125px', h: '155px', rot: '4deg', delay: '1.4s' },
            { top: '38%', right: '6%', w: '135px', h: '170px', rot: '-7deg', delay: '0.5s' },
            { top: '65%', left: '14%', w: '120px', h: '150px', rot: '-5deg', delay: '1.2s' },
            { top: '64%', right: '12%', w: '120px', h: '150px', rot: '6deg', delay: '1.8s' }
        ];

        layouts.forEach((lay, idx) => {
            if (idx >= photos.length) return;
            const card = document.createElement('div');
            card.className = 'memory-card';
            if (lay.top) card.style.top = lay.top;
            if (lay.left) card.style.left = lay.left;
            if (lay.right) card.style.right = lay.right;
            card.style.width = lay.w;
            card.style.height = lay.h;
            card.style.setProperty('--rot', lay.rot);
            card.style.animationDelay = lay.delay;

            if (idx === 0 && videoSrc) {
                const vid = document.createElement('video');
                vid.src = videoSrc;
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.setAttribute('playsinline', '');
                vid.style.width = '100%';
                vid.style.height = '100%';
                vid.style.objectFit = 'cover';
                card.appendChild(vid);
            } else {
                const img = document.createElement('img');
                img.src = photos[idx];
                img.alt = `Kỷ niệm Thu Hiền ${idx + 1}`;
                card.appendChild(img);
            }

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                openLetterModal();
                triggerBurst(e.clientX, e.clientY, 25);
            });

            floatingGallery.appendChild(card);
        });
    }

    // --- 6. LYRICS VÀ LỜI CHÚC XUYÊN SUỐT ---
    function updateLyrics(index) {
        const lyrics = appConfig.lyrics || CONFIG.lyrics;
        lyricIndex = index % lyrics.length;
        lyricsText.style.opacity = '0';
        lyricsText.style.transform = 'translateY(8px)';

        setTimeout(() => {
            lyricsText.textContent = lyrics[lyricIndex];
            lyricsText.style.opacity = '1';
            lyricsText.style.transform = 'translateY(0)';
        }, 300);
    }

    function startLyricsLoop() {
        if (lyricInterval) clearInterval(lyricInterval);
        lyricInterval = setInterval(() => {
            const lyrics = appConfig.lyrics || CONFIG.lyrics;
            lyricIndex = (lyricIndex + 1) % lyrics.length;
            updateLyrics(lyricIndex);
        }, 4500);
    }

    // --- 7. BỨC THIỆP VÀ REPLAY ---
    openLetterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLetterModal();
    });
    closeLetterBtn.addEventListener('click', closeLetterModal);
    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) closeLetterModal();
    });

    function openLetterModal() {
        letterModal.classList.add('active');
        triggerBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
    }

    function closeLetterModal() {
        letterModal.classList.remove('active');
    }

    replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLetterModal();
        currentStep = 1;
        if (lyricInterval) clearInterval(lyricInterval);
        bouquetClickable.classList.remove('bloomed');
        actionHint.innerHTML = '<span class="hint-icon">🌸</span> Chạm vào đóa hoa <span class="hint-icon">✨</span>';
        sceneWishes.classList.remove('active');
        sceneBouquet.classList.add('active');
        updateLyrics(0);
    });

    // --- 8. TÙY CHỈNH ẢNH & NHẠC (SETTINGS MODAL) ---
    customBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('input-recipient-name').value = appConfig.recipientName || '';
        document.getElementById('input-music-url').value = appConfig.musicSrc || '';
        settingsModal.classList.add('active');
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    // Tải ảnh từ máy
    const inputPhotosFile = document.getElementById('input-photos-file');
    const uploadedPreview = document.getElementById('uploaded-preview');
    let customUploadedPhotos = [];

    inputPhotosFile.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        customUploadedPhotos = [];
        uploadedPreview.innerHTML = '';

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                customUploadedPhotos.push(event.target.result);
                const img = document.createElement('img');
                img.src = event.target.result;
                uploadedPreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });

    // Tải file nhạc từ máy
    const inputMusicFile = document.getElementById('input-music-file');
    let customUploadedMusic = null;

    inputMusicFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            customUploadedMusic = URL.createObjectURL(file);
        }
    });

    saveSettingsBtn.addEventListener('click', () => {
        const nameVal = document.getElementById('input-recipient-name').value.trim();
        const musicUrlVal = document.getElementById('input-music-url').value.trim();

        if (nameVal) appConfig.recipientName = nameVal;
        if (customUploadedMusic) {
            appConfig.musicSrc = customUploadedMusic;
        } else if (musicUrlVal) {
            appConfig.musicSrc = musicUrlVal;
        }

        if (customUploadedPhotos.length > 0) {
            appConfig.photos = customUploadedPhotos;
        }

        saveConfig(appConfig);
        settingsModal.classList.remove('active');
        initApp();
        alert("Đã cập nhật ảnh & nhạc thành công! Bạn hãy chạm vào bó hoa để trải nghiệm nhé.");
    });

    resetSettingsBtn.addEventListener('click', () => {
        localStorage.removeItem('user_2010_config');
        appConfig = { ...CONFIG };
        settingsModal.classList.remove('active');
        initApp();
        alert("Đã khôi phục cài đặt gốc.");
    });

    function saveConfig(cfg) {
        try {
            const clone = { ...cfg };
            if (clone.musicSrc && clone.musicSrc.startsWith('blob:')) {
                clone.musicSrc = CONFIG.musicSrc;
            }
            if (clone.photos && clone.photos[0] && clone.photos[0].startsWith('data:')) {
                clone.photos = clone.photos.slice(0, 4);
            }
            localStorage.setItem('user_2010_config', JSON.stringify(clone));
        } catch (e) {
            console.warn("Storage full:", e);
        }
    }

    function loadSavedConfig() {
        try {
            const raw = localStorage.getItem('user_2010_config');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    // --- 9. CANVAS PARTICLES (ĐOM ĐÓM, CÁNH HOA & PHÁO HOA CHẠM MÀN HÌNH) ---
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let petals = [];
    let bursts = [];

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 1.8 + 0.6;
            this.alpha = Math.random() * 0.7 + 0.2;
            this.speedAlpha = (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = -Math.random() * 0.5 - 0.1;
            this.color = Math.random() > 0.4 ? '255, 180, 205' : '255, 255, 255';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha += this.speedAlpha;

            if (this.alpha <= 0.1 || this.alpha >= 0.9) {
                this.speedAlpha = -this.speedAlpha;
            }
            if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.reset();
                this.y = height + 10;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${this.color}, 0.8)`;
            ctx.fill();
        }
    }

    class Petal {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = -20 - Math.random() * 50;
            this.size = Math.random() * 9 + 6;
            this.vx = Math.sin(Math.random() * Math.PI) * 0.8 + 0.2;
            this.vy = Math.random() * 1.2 + 0.8;
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 2;
            this.opacity = Math.random() * 0.5 + 0.4;
        }
        update() {
            this.x += Math.sin(this.y * 0.02) + this.vx;
            this.y += this.vy;
            this.rotation += this.rotSpeed;

            if (this.y > height + 20) {
                this.reset();
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
            ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
            ctx.fillStyle = `rgba(255, 120, 155, ${this.opacity})`;
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(255, 80, 130, 0.4)';
            ctx.fill();
            ctx.restore();
        }
    }

    class BurstParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4.5 + 1.5;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.radius = Math.random() * 2.5 + 1;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            this.color = Math.random() > 0.5 ? '255, 94, 137' : '255, 230, 140';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.96;
            this.vy *= 0.96;
            this.alpha -= this.decay;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${this.color}, 0.8)`;
            ctx.fill();
        }
    }

    function triggerBurst(x, y, count = 25) {
        for (let i = 0; i < count; i++) {
            bursts.push(new BurstParticle(x, y));
        }
    }

    // Chạm màn hình tạo pháo hoa cánh hoa & kích hoạt nhạc
    window.addEventListener('pointerdown', (e) => {
        if (!e.target.closest('button') && !e.target.closest('input')) {
            triggerBurst(e.clientX, e.clientY, 16);
            tryPlayMusic();
        }
    });

    function initCanvas() {
        particles = Array.from({ length: 45 }, () => new Particle());
        petals = Array.from({ length: 18 }, () => new Petal());

        function loop() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            petals.forEach(p => {
                p.update();
                p.draw();
            });

            for (let i = bursts.length - 1; i >= 0; i--) {
                const b = bursts[i];
                b.update();
                b.draw();
                if (b.alpha <= 0) {
                    bursts.splice(i, 1);
                }
            }

            requestAnimationFrame(loop);
        }
        loop();
    }
});