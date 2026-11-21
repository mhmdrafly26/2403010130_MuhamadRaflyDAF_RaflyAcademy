/* Rafly Cyber Academy - Interactive Practice Quiz (Local Browser Simulation) */
(function () {
    "use strict";

    const QUESTION_BANK = [
        {
            level: "Pemula",
            question: "Dalam CIA Triad, aspek manakah yang memastikan data tidak diubah secara tidak sah selama penyimpanan maupun transmisi?",
            options: [
                "Confidentiality",
                "Integrity",
                "Availability",
                "Non-repudiation"
            ],
            correctIndex: 1,
            explanation: "Integrity (Integritas) menjaga keakuratan dan keaslian data agar tidak dimodifikasi tanpa otorisasi."
        },
        {
            level: "Pemula",
            question: "Mengapa penyimpanan kata sandi (password) sebaiknya menggunakan fungsi hash kriptografis dengan salt dibandingkan teks polos?",
            options: [
                "Agar ukuran database menjadi lebih kecil secara otomatis",
                "Agar kata sandi dapat didekripsi kembali oleh admin kapan saja",
                "Agar pencurian tabel database tidak langsung membocorkan kata sandi asli dan menyulitkan rainbow table",
                "Agar pengguna tidak perlu menggunakan autentikasi multi-faktor"
            ],
            correctIndex: 2,
            explanation: "Hash kriptografis bersifat satu arah dan penambahan salt unik per pengguna mempersulit serangan precomputed hash / rainbow table."
        },
        {
            level: "Pemula",
            question: "Apa fungsi utama firewall jaringan pada batas segmen jaringan?",
            options: [
                "Menggantikan kebutuhan antivirus pada seluruh perangkat endpoint",
                "Menyaring lalu lintas jaringan berdasarkan aturan (port, protokol, alamat IP) yang diizinkan atau diblokir",
                "Mempercepat koneksi internet tanpa batas kuota",
                "Menghapus log sistem secara berkala"
            ],
            correctIndex: 1,
            explanation: "Firewall mengontrol arus paket jaringan masuk dan keluar berdasarkan kebijakan keamanan yang telah ditentukan."
        },
        {
            level: "Menengah",
            question: "Bagaimana cara paling efektif mencegah celah SQL Injection pada kueri database aplikasi web?",
            options: [
                "Menyembunyikan pesan error di halaman HTML saja",
                "Menggunakan parameterized query / prepared statement sehingga input pengguna diperlakukan sebagai data, bukan perintah SQL",
                "Mengubah metode HTTP request dari POST menjadi GET",
                "Mengenkripsi nama tabel dengan Base64 di sisi klien"
            ],
            correctIndex: 1,
            explanation: "Parameterized query memisahkan struktur perintah SQL dari parameter input sehingga input tidak dapat mengubah logika kueri."
        },
        {
            level: "Menengah",
            question: "Pada kerentanan Cross-Site Scripting (XSS), apa risiko utama yang terjadi ketika input pengguna dirender tanpa sanitasi/encoding yang tepat?",
            options: [
                "Skrip berbahaya dapat tereksekusi di konteks browser korban pada sesi aplikasi tersebut",
                "Hard disk server langsung terformat secara otomatis",
                "Kabel jaringan terputus secara fisik",
                "Sertifikat TLS kadaluarsa seketika"
            ],
            correctIndex: 0,
            explanation: "XSS memungkinkan skrip berjalan di browser pengguna yang mengunjungi halaman rentan, berpotensi mengakses data yang dapat dijangkau skrip di konteks origin tersebut."
        },
        {
            level: "Menengah",
            question: "Dalam investigasi digital forensics awal, langkah apa yang penting untuk menjaga keabsahan bukti digital?",
            options: [
                "Langsung mengedit file log di lokasi aslinya untuk merapikan format",
                "Mendokumentasikan rantai penjagaan (chain of custody) dan bekerja pada salinan forensik (image/copy) dengan verifikasi hash",
                "Mematikan sistem pencatatan waktu (NTP) pada server",
                "Menghapus file temporer sebelum analisis dimulai"
            ],
            correctIndex: 1,
            explanation: "Menjaga integritas bukti melalui chain of custody dan analisis pada salinan terverifikasi mencegah perubahan data asli."
        }
    ];

    let activeQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let answeredCurrent = false;

    function getQuestionsByLevel(levelFilter) {
        if (!levelFilter || levelFilter === "all") {
            return QUESTION_BANK.slice();
        }
        return QUESTION_BANK.filter(function (q) {
            return q.level === levelFilter;
        });
    }

    function updateProgress() {
        const progressLabel = document.getElementById("rafly_quiz_progress_text");
        const progressFill = document.getElementById("rafly_quiz_progress_fill");
        const scoreEl = document.getElementById("rafly_quiz_score");

        const total = activeQuestions.length;
        const currentStep = Math.min(currentIndex + 1, total);
        const pct = total > 0 ? Math.round((currentIndex / total) * 100) : 0;

        if (progressLabel) {
            progressLabel.textContent = "Soal " + currentStep + " dari " + total;
        }
        if (progressFill) {
            progressFill.style.width = pct + "%";
        }
        if (scoreEl) {
            scoreEl.textContent = "Skor: " + score + " / " + total;
        }
    }

    function renderQuestion() {
        const qArea = document.getElementById("rafly_quiz_question_area");
        const feedbackArea = document.getElementById("rafly_quiz_feedback");
        const nextBtn = document.getElementById("rafly_quiz_next_btn");

        if (!qArea || !feedbackArea || !nextBtn) {
            return;
        }

        answeredCurrent = false;
        feedbackArea.hidden = true;
        feedbackArea.textContent = "";
        nextBtn.hidden = true;
        qArea.textContent = "";

        updateProgress();

        if (currentIndex >= activeQuestions.length) {
            const progressFill = document.getElementById("rafly_quiz_progress_fill");
            if (progressFill) {
                progressFill.style.width = "100%";
            }

            const doneTitle = document.createElement("h2");
            doneTitle.className = "rafly_card_title";
            doneTitle.textContent = "Latihan Selesai";

            const doneSummary = document.createElement("p");
            doneSummary.className = "rafly_card_text";
            doneSummary.textContent =
                "Skor akhir Anda: " +
                score +
                " dari " +
                activeQuestions.length +
                " soal. Klik 'Ulangi Latihan' untuk mencoba kembali atau mengganti tingkat kesulitan.";

            qArea.appendChild(doneTitle);
            qArea.appendChild(doneSummary);
            return;
        }

        const item = activeQuestions[currentIndex];

        const lvlBadge = document.createElement("span");
        lvlBadge.className = "rafly_badge rafly_badge_level";
        lvlBadge.textContent = "Level: " + item.level;

        const qTitle = document.createElement("h2");
        qTitle.className = "rafly_card_title";
        qTitle.style.marginTop = "12px";
        qTitle.textContent = item.question;

        const optionsWrap = document.createElement("div");
        optionsWrap.className = "rafly_option_list";

        item.options.forEach(function (optText, idx) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "rafly_option_btn";
            btn.textContent = optText;

            btn.addEventListener("click", function () {
                if (answeredCurrent) {
                    return;
                }
                answeredCurrent = true;

                const allOptionBtns = optionsWrap.querySelectorAll(".rafly_option_btn");
                allOptionBtns.forEach(function (b) {
                    b.disabled = true;
                });

                const isCorrect = idx === item.correctIndex;
                if (isCorrect) {
                    score += 1;
                    btn.classList.add("rafly_option_correct");
                } else {
                    btn.classList.add("rafly_option_wrong");
                    if (allOptionBtns[item.correctIndex]) {
                        allOptionBtns[item.correctIndex].classList.add("rafly_option_correct");
                    }
                }

                updateProgress();

                feedbackArea.hidden = false;
                const statusHeading = document.createElement("strong");
                statusHeading.textContent = isCorrect ? "Jawaban Benar" : "Jawaban Kurang Tepat";

                const expPara = document.createElement("p");
                expPara.className = "rafly_card_text";
                expPara.style.marginTop = "6px";
                expPara.style.marginBottom = "0";
                expPara.textContent = item.explanation;

                feedbackArea.appendChild(statusHeading);
                feedbackArea.appendChild(expPara);

                nextBtn.hidden = false;
                nextBtn.textContent =
                    currentIndex + 1 < activeQuestions.length ? "Soal Berikutnya" : "Lihat Hasil Akhir";
            });

            optionsWrap.appendChild(btn);
        });

        qArea.appendChild(lvlBadge);
        qArea.appendChild(qTitle);
        qArea.appendChild(optionsWrap);
    }

    function startQuiz(levelValue) {
        activeQuestions = getQuestionsByLevel(levelValue);
        currentIndex = 0;
        score = 0;
        renderQuestion();
    }

    document.addEventListener("DOMContentLoaded", function () {
        const levelSelect = document.getElementById("rafly_quiz_level");
        const nextBtn = document.getElementById("rafly_quiz_next_btn");
        const retryBtn = document.getElementById("rafly_quiz_retry_btn");

        if (!levelSelect) {
            return;
        }

        levelSelect.addEventListener("change", function () {
            startQuiz(levelSelect.value);
        });

        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                currentIndex += 1;
                renderQuestion();
            });
        }

        if (retryBtn) {
            retryBtn.addEventListener("click", function () {
                startQuiz(levelSelect.value);
            });
        }

        startQuiz(levelSelect.value);
    });
})();