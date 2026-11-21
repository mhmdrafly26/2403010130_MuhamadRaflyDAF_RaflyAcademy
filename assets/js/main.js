/* Rafly Cyber Academy - Shared Navigation & Utility Script */
(function () {
    "use strict";

    function initMobileNav() {
        const hamburgerBtn = document.getElementById("rafly_hamburger");
        const navMenu = document.getElementById("rafly_nav_menu");
        if (!hamburgerBtn || !navMenu) {
            return;
        }

        function setMenuState(isOpen) {
            navMenu.classList.toggle("rafly_nav_open", isOpen);
            hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
        }

        hamburgerBtn.addEventListener("click", function () {
            const currentlyOpen = navMenu.classList.contains("rafly_nav_open");
            setMenuState(!currentlyOpen);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && navMenu.classList.contains("rafly_nav_open")) {
                setMenuState(false);
                hamburgerBtn.focus();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 768 && navMenu.classList.contains("rafly_nav_open")) {
                setMenuState(false);
            }
        });
    }

    function highlightActiveNav() {
        const currentFile = window.location.pathname.split("/").pop() || "index.html";
        const links = document.querySelectorAll(".rafly_nav_link");
        links.forEach(function (link) {
            const href = link.getAttribute("href");
            if (href === currentFile) {
                link.classList.add("rafly_active");
                link.setAttribute("aria-current", "page");
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initMobileNav();
        highlightActiveNav();
    });
})();