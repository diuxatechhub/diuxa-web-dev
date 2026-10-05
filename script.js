/* =========================================================
   DIUXA TECH HUB
   WEB DEVELOPMENT COHORT
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION
    ====================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active");

        });


        // Close menu when a navigation link is clicked

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.classList.remove("active");

            });

        });


        // Close menu when clicking outside

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                menuToggle.classList.remove("active");

            }

        });

    }



    /* =====================================================
       2. FAQ ACCORDION
    ====================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        if (!question || !answer) return;


        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            // Close all FAQ items

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    if (otherAnswer) {

                        otherAnswer.style.maxHeight = null;

                    }

                }

            });


            // Open clicked item

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                item.classList.remove("active");

                answer.style.maxHeight = null;

            }

        });

    });



    /* =====================================================
       3. SMOOTH SCROLLING
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            const header =
                document.querySelector(".header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       4. HEADER SCROLL EFFECT
    ====================================================== */

    const header =
        document.querySelector(".header");


    function updateHeader() {

        if (!header) return;


        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();



    /* =====================================================
       5. APPLICATION FORM
    ====================================================== */

    const applicationForm =
        document.getElementById("applicationForm");

    const formMessage =
        document.getElementById("formMessage");


    if (applicationForm) {

        applicationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* -----------------------------------------
                   GET FORM VALUES
                ------------------------------------------ */

                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("phone")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();


                const experience =
                    document
                        .getElementById("experience")
                        .value
                        .trim();



                /* -----------------------------------------
                   CLEAR PREVIOUS MESSAGE
                ------------------------------------------ */

                if (formMessage) {

                    formMessage.textContent = "";

                    formMessage.style.color = "";

                }



                /* -----------------------------------------
                   BASIC VALIDATION
                ------------------------------------------ */

                if (
                    !name ||
                    !phone ||
                    !email ||
                    !experience
                ) {

                    showFormMessage(
                        "Please fill in all the required fields.",
                        "error"
                    );

                    return;

                }



                /* -----------------------------------------
                   EMAIL VALIDATION
                ------------------------------------------ */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }



                /* -----------------------------------------
                   PHONE VALIDATION
                ------------------------------------------ */

                const phoneDigits =
                    phone.replace(/\D/g, "");


                if (phoneDigits.length < 10) {

                    showFormMessage(
                        "Please enter a valid WhatsApp number.",
                        "error"
                    );

                    return;

                }



                /* -----------------------------------------
                   SUBMIT BUTTON
                ------------------------------------------ */

                const submitButton =
                    applicationForm.querySelector(
                        ".submit-button"
                    );


                const originalButtonHTML =
                    submitButton
                        ? submitButton.innerHTML
                        : "";


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML = `
                        <i class="fa-solid fa-spinner fa-spin"></i>
                        Preparing Application...
                    `;

                }



                /* -----------------------------------------
                   WHATSAPP NUMBER
                ------------------------------------------ */

                /*
                    DIUXA Tech Hub WhatsApp number.

                    Nigeria country code:
                    +234

                    Local number:
                    09069957433

                    WhatsApp format:
                    2349069957433
                */

                const diuxaWhatsApp =
                    "2348131990071";



                /* -----------------------------------------
                   WHATSAPP MESSAGE
                ------------------------------------------ */

                const message = `Hello DIUXA Tech Hub,

I would like to apply for the Web Development Cohort.

Here are my details:

Name: ${name}

WhatsApp Number: ${phone}

Email: ${email}

Experience Level: ${experience}

I am interested in joining the next cohort.

Thank you.`;


                const encodedMessage =
                    encodeURIComponent(message);


                const whatsappURL =
                    `https://wa.me/${diuxaWhatsApp}?text=${encodedMessage}`;



                /* -----------------------------------------
                   SUCCESS MESSAGE
                ------------------------------------------ */

                showFormMessage(
                    "Application ready! Redirecting you to WhatsApp...",
                    "success"
                );


                /*
                    Small delay gives the user time
                    to see the success message.
                */

                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );


                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalButtonHTML;

                    }

                }, 1000);

            }
        );

    }



    /* =====================================================
       6. FORM MESSAGE FUNCTION
    ====================================================== */

    function showFormMessage(message, type) {

        if (!formMessage) return;


        formMessage.textContent = message;


        if (type === "success") {

            formMessage.style.color =
                "#159447";

        } else {

            formMessage.style.color =
                "#e53935";

        }

    }



    /* =====================================================
       7. PHONE NUMBER FORMATTING
    ====================================================== */

    const phoneInput =
        document.getElementById("phone");


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                /*
                    Remove characters that are not
                    numbers, spaces, +, -, or brackets.
                */

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    }



    /* =====================================================
       8. REVEAL ANIMATION
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".learning-card, .why-card, .journey-step"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }



    /* =====================================================
       9. PREVENT DOUBLE FORM SUBMISSION
    ====================================================== */

    let formSubmitting = false;


    if (applicationForm) {

        applicationForm.addEventListener(
            "submit",
            () => {

                if (formSubmitting) {

                    return;

                }

                formSubmitting = true;

                setTimeout(() => {

                    formSubmitting = false;

                }, 2000);

            }
        );

    }



    /* =====================================================
       10. CURRENT YEAR
    ====================================================== */

    const currentYear =
        new Date().getFullYear();


    const copyright =
        document.querySelector(
            ".footer-bottom span"
        );


    if (copyright) {

        copyright.textContent =
            `DIUXA TECH HUB © ${currentYear}. All rights reserved.`;

    }



    /* =====================================================
       11. ESC KEY
       CLOSE MOBILE MENU / FAQ
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {

                return;

            }


            // Close mobile menu

            if (navMenu) {

                navMenu.classList.remove(
                    "active"
                );

            }


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

            }


            // Close FAQ

            faqItems.forEach(item => {

                item.classList.remove(
                    "active"
                );


                const answer =
                    item.querySelector(
                        ".faq-answer"
                    );


                if (answer) {

                    answer.style.maxHeight = null;

                }

            });

        }
    );



    /* =====================================================
       12. BUTTON RIPPLE EFFECT
    ====================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-button, .nav-button, .submit-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                this.classList.add("button-clicked");


                setTimeout(() => {

                    this.classList.remove(
                        "button-clicked"
                    );

                }, 250);

            }
        );

    });



    /* =====================================================
       13. CONSOLE MESSAGE
    ====================================================== */

    console.log(
        "%cDIUXA Tech Hub",
        "font-size: 20px; font-weight: bold; color: #087cff;"
    );

    console.log(
        "Learn. Build. Create."
    );

});