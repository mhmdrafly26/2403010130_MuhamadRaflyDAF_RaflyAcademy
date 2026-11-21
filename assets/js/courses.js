/* Rafly Cyber Academy - Courses Catalog Search & Filter */
(function () {
    "use strict";

    const COURSES_DATA = [
        {
            id: "crs-fund-01",
            title: "Fondasi Keamanan Siber & CIA Triad",
            category: "Cyber Security Fundamentals",
            level: "Pemula",
            duration: "3 Jam 30 Menit",
            description: "Memahami ancaman siber umum, prinsip Confidentiality, Integrity, Availability, serta manajemen risiko dasar.",
            targetUrl: "materials.html#mat-cia-triad"
        },
        {
            id: "crs-net-01",
            title: "Dasar Keamanan Jaringan & Protokol TCP/IP",
            category: "Network Security",
            level: "Pemula",
            duration: "4 Jam 15 Menit",
            description: "Membaca alur paket jaringan, segmentasi VLAN, fungsi firewall, dan deteksi anomali lalu lintas dasar.",
            targetUrl: "materials.html#mat-networking"
        },
        {
            id: "crs-web-01",
            title: "Keamanan Aplikasi Web & OWASP Top 10",
            category: "Web Application Security",
            level: "Menengah",
            duration: "5 Jam",
            description: "Mengenali pola kerentanan web modern seperti broken access control, injeksi, dan validasi input sisi server.",
            targetUrl: "materials.html#mat-owasp"
        },
        {
            id: "crs-web-02",
            title: "Mitigasi SQL Injection & XSS di Aplikasi Web",
            category: "Web Application Security",
            level: "Menengah",
            duration: "4 Jam",
            description: "Mempelajari mekanisme SQL Injection dan Cross-Site Scripting pada studi kasus aman serta teknik parameterized query dan encoding.",
            targetUrl: "materials.html#mat-sqli"
        },
        {
            id: "crs-eth-01",
            title: "Pengantar Ethical Hacking & Metodologi Pengujian",
            category: "Ethical Hacking",
            level: "Menengah",
            duration: "4 Jam 45 Menit",
            description: "Alur kerja pengujian keamanan yang etis dan berizin, mulai dari reconnaissance hingga pelaporan temuan.",
            targetUrl: "materials.html#mat-linux"
        },
        {
            id: "crs-for-01",
            title: "Dasar Digital Forensics & Analisis Log",
            category: "Digital Forensics",
            level: "Menengah",
            duration: "3 Jam 45 Menit",
            description: "Prinsip menjaga integritas bukti digital, urutan waktu kejadian (timeline), dan pembacaan log sistem.",
            targetUrl: "materials.html#mat-intro"
        },
        {
            id: "crs-cry-01",
            title: "Kriptografi Terapan, Hashing & Manajemen Sandi",
            category: "Cryptography",
            level: "Pemula",
            duration: "3 Jam 15 Menit",
            description: "Perbedaan enkripsi simetris, asimetris, dan fungsi hash kriptografis serta praktik penyimpanan password yang aman.",
            targetUrl: "materials.html#mat-cryptography"
        }
    ];

    function renderCourses(items) {
        const container = document.getElementById("rafly_courses_list");
        const countEl = document.getElementById("rafly_courses_count");
        if (!container) {
            return;
        }

        if (countEl) {
            countEl.textContent = "Menampilkan " + items.length + " kursus";
        }

        container.textContent = "";

        if (items.length === 0) {
            const emptyCard = document.createElement("div");
            emptyCard.className = "rafly_card";
            const emptyTitle = document.createElement("h3");
            emptyTitle.className = "rafly_card_title";
            emptyTitle.textContent = "Kursus tidak ditemukan";
            const emptyDesc = document.createElement("p");
            emptyDesc.className = "rafly_card_text";
            emptyDesc.textContent = "Coba ubah kata kunci pencarian atau reset filter kategori dan tingkat kesulitan.";
            emptyCard.appendChild(emptyTitle);
            emptyCard.appendChild(emptyDesc);
            container.appendChild(emptyCard);
            return;
        }

        items.forEach(function (course) {
            const card = document.createElement("article");
            card.className = "rafly_card";

            const bodyDiv = document.createElement("div");

            const metaDiv = document.createElement("div");
            metaDiv.className = "rafly_card_meta";

            const catBadge = document.createElement("span");
            catBadge.className = "rafly_badge";
            catBadge.textContent = course.category;

            const lvlBadge = document.createElement("span");
            lvlBadge.className = "rafly_badge rafly_badge_level";
            lvlBadge.textContent = course.level;

            metaDiv.appendChild(catBadge);
            metaDiv.appendChild(lvlBadge);

            const titleEl = document.createElement("h2");
            titleEl.className = "rafly_card_title";
            titleEl.textContent = course.title;

            const descEl = document.createElement("p");
            descEl.className = "rafly_card_text";
            descEl.textContent = course.description;

            bodyDiv.appendChild(metaDiv);
            bodyDiv.appendChild(titleEl);
            bodyDiv.appendChild(descEl);

            const footerDiv = document.createElement("div");
            footerDiv.className = "rafly_card_meta";

            const durationSpan = document.createElement("span");
            durationSpan.className = "rafly_meta_duration";
            durationSpan.textContent = "Durasi: " + course.duration;

            const actionLink = document.createElement("a");
            actionLink.className = "rafly_btn_primary rafly_btn_sm";
            actionLink.href = course.targetUrl;
            actionLink.textContent = "Mulai Belajar";

            footerDiv.appendChild(durationSpan);
            footerDiv.appendChild(actionLink);

            card.appendChild(bodyDiv);
            card.appendChild(footerDiv);
            container.appendChild(card);
        });
    }

    function applyFilters() {
        const searchInput = document.getElementById("rafly_search_course");
        const categorySelect = document.getElementById("rafly_filter_category");
        const levelSelect = document.getElementById("rafly_filter_level");

        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
        const selectedCategory = categorySelect ? categorySelect.value : "all";
        const selectedLevel = levelSelect ? levelSelect.value : "all";

        const filtered = COURSES_DATA.filter(function (course) {
            const matchesQuery =
                query === "" ||
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.category.toLowerCase().includes(query);

            const matchesCategory =
                selectedCategory === "all" || course.category === selectedCategory;

            const matchesLevel =
                selectedLevel === "all" || course.level === selectedLevel;

            return matchesQuery && matchesCategory && matchesLevel;
        });

        renderCourses(filtered);
    }

    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById("rafly_search_course");
        const categorySelect = document.getElementById("rafly_filter_category");
        const levelSelect = document.getElementById("rafly_filter_level");

        if (searchInput) {
            searchInput.addEventListener("input", applyFilters);
        }
        if (categorySelect) {
            categorySelect.addEventListener("change", applyFilters);
        }
        if (levelSelect) {
            levelSelect.addEventListener("change", applyFilters);
        }

        renderCourses(COURSES_DATA);
    });
})();