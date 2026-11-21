/* Rafly Cyber Academy - Contact Form Validation & Local Simulation */
(function () {
    "use strict";

    function isValidEmail(emailValue) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return pattern.test(emailValue);
    }

    function setFieldError(errorId, message) {
        const el = document.getElementById(errorId);
        if (el) {
            el.textContent = message;
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("rafly_contact_form");
        if (!form) {
            return;
        }

        const nameInput = document.getElementById("rafly_contact_name");
        const emailInput = document.getElementById("rafly_contact_email");
        const subjectInput = document.getElementById("rafly_contact_subject");
        const messageInput = document.getElementById("rafly_contact_message");
        const confirmationBox = document.getElementById("rafly_contact_confirmation");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;
            if (confirmationBox) {
                confirmationBox.hidden = true;
                confirmationBox.textContent = "";
            }

            const nameVal = nameInput ? nameInput.value.trim() : "";
            const emailVal = emailInput ? emailInput.value.trim() : "";
            const subjectVal = subjectInput ? subjectInput.value.trim() : "";
            const messageVal = messageInput ? messageInput.value.trim() : "";

            if (nameVal.length < 2) {
                setFieldError("rafly_err_name", "Nama lengkap wajib diisi (minimal 2 karakter).");
                isValid = false;
            } else {
                setFieldError("rafly_err_name", "");
            }

            if (!emailVal || !isValidEmail(emailVal)) {
                setFieldError("rafly_err_email", "Masukkan alamat email yang valid (contoh: nama@domain.com).");
                isValid = false;
            } else {
                setFieldError("rafly_err_email", "");
            }

            if (subjectVal.length < 3) {
                setFieldError("rafly_err_subject", "Subjek pesan wajib diisi (minimal 3 karakter).");
                isValid = false;
            } else {
                setFieldError("rafly_err_subject", "");
            }

            if (messageVal.length < 10) {
                setFieldError("rafly_err_message", "Isi pesan wajib diisi (minimal 10 karakter).");
                isValid = false;
            } else {
                setFieldError("rafly_err_message", "");
            }

            if (!isValid) {
                return;
            }

            if (confirmationBox) {
                confirmationBox.hidden = false;

                const heading = document.createElement("strong");
                heading.textContent = "Simulasi Pengiriman Berhasil (Mode Frontend Statis)";

                const detail = document.createElement("p");
                detail.className = "rafly_card_text";
                detail.style.marginTop = "8px";
                detail.style.marginBottom = "0";
                detail.textContent =
                    "Terima kasih, " +
                    nameVal +
                    ". Formulir untuk subjek '" +
                    subjectVal +
                    "' telah tervalidasi di browser. Karena website ini berjalan tanpa server backend, pesan tidak dikirim ke server eksternal.";

                confirmationBox.appendChild(heading);
                confirmationBox.appendChild(detail);
            }

            form.reset();
        });
    });
})();