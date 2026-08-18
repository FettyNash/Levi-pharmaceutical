/* =========================================================
   LEVI PHARMACEUTICAL PLC
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BRAND PRELOADER
    ===================================================== */

    const loader = document.querySelector(".loader");
    if (loader && !loader.querySelector(".loader-brand")) {
        const brand = document.createElement("img");
        brand.className = "loader-brand";
        brand.src = "images/LEVI logo.svg";
        brand.alt = "LEVI Pharmaceutical";
        loader.prepend(brand);
    }

    document.body.classList.add("page-ready");


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader =
        document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("loaded");

        }, 500);

    });


    /* =====================================================
       STICKY HEADER
    ===================================================== */

    const header =
        document.getElementById("mainHeader");

    const handleHeader =
        () => {

            if (window.scrollY > 30) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        };

    window.addEventListener(
        "scroll",
        handleHeader
    );

    handleHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mainNav =
        document.getElementById("mainNav");

    if (mobileMenuBtn && mainNav) {

        mobileMenuBtn.addEventListener("click", () => {
            const open = mainNav.classList.toggle("open");
            mobileMenuBtn.classList.toggle("active", open);
            mobileMenuBtn.setAttribute("aria-expanded", String(open));
        });

        document.querySelectorAll(".main-nav .dropdown > a").forEach(toggle => {
            toggle.addEventListener("click", event => {
                if (window.innerWidth <= 900) {
                    event.preventDefault();
                    toggle.parentElement.classList.toggle("mobile-open");
                }
            });
        });

    }


    /* Close mobile menu after clicking a link */

    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 900
                ) {

                    mainNav.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchBtn =
        document.getElementById("searchBtn");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const searchClose =
        document.getElementById("searchClose");

    const searchInput =
        document.getElementById("searchInput");


    if (searchBtn && searchOverlay) {

        searchBtn.addEventListener(
            "click",
            () => {

                searchOverlay.classList.add(
                    "open"
                );

                setTimeout(() => {

                    if (searchInput) searchInput.focus();

                }, 200);

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    if (searchClose) {

        searchClose.addEventListener(
            "click",
            closeSearch
        );

    }


    function closeSearch() {

        if (searchOverlay) searchOverlay.classList.remove("open");

        document.body.style.overflow =
            "";

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape" && searchOverlay) { closeSearch(); }

        }
    );


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );

    const dots =
        document.querySelectorAll(
            ".hero-dots button"
        );

    const nextBtn =
        document.getElementById("heroNext");

    const prevBtn =
        document.getElementById("heroPrev");


    let currentSlide = 0;

    let sliderTimer;


    function showSlide(index) {

        if (!slides.length) return;


        if (index >= slides.length) {

            currentSlide = 0;

        } else if (index < 0) {

            currentSlide =
                slides.length - 1;

        } else {

            currentSlide = index;

        }


        slides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === currentSlide
                );

            }
        );


        dots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );

            }
        );

    }


    function nextSlide() {

        showSlide(
            currentSlide + 1
        );

    }


    function previousSlide() {

        showSlide(
            currentSlide - 1
        );

    }


    function startSlider() {

        sliderTimer =
            setInterval(
                nextSlide,
                6000
            );

    }


    function resetSlider() {

        clearInterval(
            sliderTimer
        );

        startSlider();

    }


    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                nextSlide();

                resetSlider();

            }
        );

    }


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                previousSlide();

                resetSlider();

            }
        );

    }


    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);

                    resetSlider();

                }
            );

        }
    );


    if (slides.length) {

        showSlide(0);

        startSlider();

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );

            let current = 0;

            const increment =
                Math.max(
                    target / 80,
                    1
                );


            function updateCounter() {

                current += increment;


                if (current >= target) {

                    counter.textContent =
                        target;

                    return;

                }


                counter.textContent =
                    Math.floor(current);


                requestAnimationFrame(
                    updateCounter
                );

            }


            updateCounter();

        });

    }


    const statsSection =
        document.querySelector(
            ".stats-section"
        );


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounters();

                                statsObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .25
                }
            );


        statsObserver.observe(
            statsSection
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    function handleBackToTop() {

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    if (backToTop) {

        window.addEventListener(
            "scroll",
            handleBackToTop
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    newsletterForm.querySelector(
                        "input"
                    ).value.trim();


                if (!email) return;


                const subject = encodeURIComponent("LEVI Pharmaceutical newsletter subscription");
                const body = encodeURIComponent(`Please add this email to the LEVI Pharmaceutical newsletter: ${email}`);
                window.location.href = `mailto:info@levipharma.com?subject=${subject}&body=${body}`;
                newsletterForm.reset();

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLLING
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    const headerHeight =
                        header.offsetHeight;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        headerHeight
                        -
                        20;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year = document.getElementById("currentYear");
    if (year) year.textContent = new Date().getFullYear();


    /* =====================================================
       PAGE TRANSITIONS
    ===================================================== */

    document.querySelectorAll('a[href$=".html"], a[href^="./"]').forEach(link => {
        link.addEventListener("click", event => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank") return;
            if (href === window.location.pathname.split("/").pop() || href === "./" + window.location.pathname.split("/").pop()) return;
            event.preventDefault();
            document.body.classList.add("page-leaving");
            window.setTimeout(() => { window.location.href = href; }, 280);
        });
    });


    /* =====================================================
       SMART HEADER STATE
    ===================================================== */

    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        const current = window.scrollY;
        document.body.classList.toggle("scrolling-down", current > lastScrollY && current > 100);
        document.body.classList.toggle("scrolling-up", current < lastScrollY && current > 100);
        lastScrollY = current;
    }, { passive: true });


    /* =====================================================
       SEARCH NAVIGATION
    ===================================================== */
    const searchSubmit = document.querySelector(".search-box button");
    const runSiteSearch = () => {
        if (!searchInput) return;
        const q = searchInput.value.trim().toLowerCase();
        if (!q) return;
        const routes = [
            { keys: ["medicine", "drug", "pharma"], href: "products.html#medicines" },
            { keys: ["equipment", "device", "hospital"], href: "products.html#medical-equipment" },
            { keys: ["lab", "laboratory", "reagent"], href: "products.html#laboratory" },
            { keys: ["consumable", "ppe", "glove", "syringe"], href: "products.html#consumables" },
            { keys: ["diagnostic", "test", "glucose"], href: "products.html#diagnostics" },
            { keys: ["service", "distribution", "logistics"], href: "services.html" },
            { keys: ["about", "company", "partner"], href: "about.html" },
            { keys: ["career", "job", "vacancy"], href: "careers.html" },
            { keys: ["contact", "quote", "email", "phone"], href: "contact.html#quote" },
            { keys: ["news", "event", "update"], href: "news.html" }
        ];
        const match = routes.find(route => route.keys.some(key => q.includes(key)));
        closeSearch();
        window.location.href = match ? match.href : `products.html?search=${encodeURIComponent(q)}`;
    };
    if (searchSubmit) searchSubmit.addEventListener("click", runSiteSearch);
    if (searchInput) searchInput.addEventListener("keydown", event => { if (event.key === "Enter") runSiteSearch(); });

    /* =====================================================
       CONTACT FORM — no silent fake submission
    ===================================================== */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        let status = contactForm.querySelector(".form-status");
        if (!status) {
            status = document.createElement("div");
            status.className = "form-status";
            status.setAttribute("role", "status");
            contactForm.appendChild(status);
        }
        contactForm.addEventListener("submit", event => {
            event.preventDefault();
            const name = contactForm.querySelector("#name")?.value.trim() || "";
            const email = contactForm.querySelector("#email")?.value.trim() || "";
            const phone = contactForm.querySelector("#phone")?.value.trim() || "";
            const subject = contactForm.querySelector("#subject")?.value.trim() || "General Question";
            const message = contactForm.querySelector("#message")?.value.trim() || "";
            if (!name || !email || !message) return;
            const body = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone || "Not provided"}`,
                "",
                message
            ].join("\\n");
            const mailto = `mailto:info@levipharma.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            status.textContent = "Your email application is ready. Your email program will open so you can send the enquiry to LEVI Pharmaceutical.";
            status.classList.add("show");
            window.location.href = mailto;
        });
    }


});
