/* ==========================================================
   DONI FERDIO IQBAL DHARMAWANTO
   PROFESSIONAL PORTOFOLIO WEBSITE V3
   MASTER BLUEPRINT V3
   MAIN.JS
========================================================== */

"use strict";

/* ==========================================================
   EXPERIENCE MOUSE SPOTLIGHT
========================================================== */

function experienceSpotlight() {

    const cards = document.querySelectorAll(".experience-card");
    

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

        });

        card.addEventListener("mouseleave", () => {

            card.style.setProperty("--mouse-x", "50%");
            card.style.setProperty("--mouse-y", "50%");

        });

    });

}
/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});
/* ==========================================================
   LOADING SCREEN
========================================================== */

function loadingScreen(){

    const loadingScreen = document.getElementById("loading-screen");

    if(!loadingScreen) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loadingScreen.style.opacity = "0";

            loadingScreen.style.visibility = "hidden";

            loadingScreen.style.pointerEvents = "none";

        },1200);

    });

}


/* ==========================================================
   STICKY NAVBAR
========================================================== */

function stickyNavbar(){

    const header = document.getElementById("header");

    if(!header) return;

    window.addEventListener("scroll", () => {

        if(window.scrollY > 60){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

    });

}


/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function activeNavigation(){

    const navLinks =
        document.querySelectorAll(".navbar-menu a");

    const sectionIds =
        [...navLinks]
            .map(link => link.getAttribute("href"))
            .filter(href => href && href !== "#")
            .map(href => href.substring(1));

    const sections =
        sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean);

    if(!sections.length || !navLinks.length) return;

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if(window.scrollY >= sectionTop){

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if(href === "#" + currentSection){

                link.classList.add("active");

            }

        });

    });

}


/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function smoothScrolling(){

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click",(event)=>{

            const targetId = link.getAttribute("href");

            if(targetId === "#") return;

            const target = document.querySelector(targetId);

            if(!target) return;

            event.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior:"smooth"

            });

        });

    });

}


/* ==========================================================
   SCROLL PROGRESS (PREPARATION)
========================================================== */

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const progress =

        (scrollTop / documentHeight) * 100;

});


/* ==========================================================
   THEME TOGGLE
========================================================== */

function themeToggle(){

    const body = document.body;

    const toggle = document.getElementById("theme-toggle");

    const heroDarkBackground =
        document.querySelector(".background-dark");

    const heroLightBackground =
        document.querySelector(".background-light");

    const profileDark =
        document.querySelector(".profile-dark");

    const profileLight =
        document.querySelector(".profile-light");

    if(!toggle) return;

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme){

        body.classList.remove("dark-theme","light-theme");

        body.classList.add(savedTheme);

    }

    else{

        body.classList.add("dark-theme");

    }

    updateTheme();

    toggle.addEventListener("click",()=>{

        if(body.classList.contains("dark-theme")){

            body.classList.replace(
                "dark-theme",
                "light-theme"
            );

        }

        else{

            body.classList.replace(
                "light-theme",
                "dark-theme"
            );

        }

        localStorage.setItem(

            "theme",

            body.classList.contains("dark-theme")

            ? "dark-theme"

            : "light-theme"

        );

        updateTheme();

    });


    function updateTheme(){

        if(body.classList.contains("dark-theme")){

            toggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

            if(heroDarkBackground)
                heroDarkBackground.style.opacity="1";

            if(heroLightBackground)
                heroLightBackground.style.opacity="0";

            if(profileDark)
                profileDark.style.opacity="1";

            if(profileLight)
                profileLight.style.opacity="0";

        }

        else{

            toggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

            if(heroDarkBackground)
                heroDarkBackground.style.opacity="0";

            if(heroLightBackground)
                heroLightBackground.style.opacity="1";

            if(profileDark)
                profileDark.style.opacity="0";

            if(profileLight)
                profileLight.style.opacity="1";

        }

    }

}


/* ==========================================================
   THEME BUTTON ANIMATION
========================================================== */

document.addEventListener("click",(event)=>{

    if(event.target.closest("#theme-toggle")){

        const button =
        event.target.closest("#theme-toggle");

        button.animate(

            [

                {

                    transform:"rotate(0deg)"

                },

                {

                    transform:"rotate(180deg)"

                },

                {

                    transform:"rotate(360deg)"

                }

            ],

            {

                duration:600,

                easing:"ease-in-out"

            }

        );

    }

});



/* ==========================================================
   SCROLL REVEAL
========================================================== */

function scrollReveal(){

    const reveals = document.querySelectorAll(
        ".reveal, .experience-card"
    );

    if(!reveals.length) return;

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    if(entry.target.classList.contains("experience-card")){

                        entry.target.classList.add("show");

                    }

                    else{

                        entry.target.classList.add("active");

                    }

                }

            });

        },

        {

            threshold:0.15

        }

    );

    reveals.forEach(item=>{

        observer.observe(item);

    });

}
/* ==========================================================
   COUNTER ANIMATION
========================================================== */

function counterAnimation(){

    const counters = document.querySelectorAll("[data-counter]");

    if(!counters.length) return;

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },

        {

            threshold:.5

        }

    );

    counters.forEach(counter=>{

        observer.observe(counter);

    });

}


function animateCounter(element){

    const target = Number(

        element.dataset.counter

    );

    let current = 0;

    const speed = target / 80;

    const update = ()=>{

        current += speed;

        if(current < target){

            element.textContent =

                Math.floor(current);

            requestAnimationFrame(update);

        }

        else{

            element.textContent = target;

        }

    };

    update();

}


/* ==========================================================
   FLOATING ELEMENT
========================================================== */

const floatingItems =

document.querySelectorAll(".floating");

floatingItems.forEach((item,index)=>{

    item.style.animationDelay =

    `${index * .4}s`;

});


/* ==========================================================
   RIPPLE EFFECT
========================================================== */

function rippleButton(){

    const buttons =

    document.querySelectorAll(".ripple");

    buttons.forEach(button=>{

        button.addEventListener("click",(event)=>{

            const circle =

            document.createElement("span");

            const diameter =

            Math.max(

                button.clientWidth,

                button.clientHeight

            );

            const radius =

            diameter / 2;

            circle.style.width =

            circle.style.height =

            `${diameter}px`;

            circle.style.left =

            `${event.clientX -

            button.offsetLeft -

            radius}px`;

            circle.style.top =

            `${event.clientY -

            button.offsetTop -

            radius}px`;

            circle.classList.add("ripple-circle");

            const ripple =

            button.getElementsByClassName(

                "ripple-circle"

            )[0];

            if(ripple){

                ripple.remove();

            }

            button.appendChild(circle);

        });

    });

}


/* ==========================================================
   SCROLL OPTIMIZATION
========================================================== */

let ticking = false;

window.addEventListener("scroll",()=>{

    if(!ticking){

        window.requestAnimationFrame(()=>{

            ticking = false;

        });

        ticking = true;

    }

});

/* ==========================================================
   MOBILE MENU
========================================================== */

function mobileMenu(){

    const mobileButton =
        document.getElementById("mobile-menu");

    const navbarMenu =
        document.querySelector(".navbar-menu");

    if(!mobileButton || !navbarMenu) return;

    mobileButton.addEventListener("click",()=>{

        navbarMenu.classList.toggle("show-menu");

        mobileButton.classList.toggle("active");

    });

    closeMenuWhenClickLink(navbarMenu,mobileButton);

    closeMenuOutside(navbarMenu,mobileButton);

    closeMenuEscape(navbarMenu,mobileButton);

    resizeHandler(navbarMenu,mobileButton);

}


/* ==========================================================
   CLOSE WHEN LINK CLICKED
========================================================== */

function closeMenuWhenClickLink(menu,button){

    const links =
        menu.querySelectorAll("a");

    links.forEach(link=>{

        link.addEventListener("click",()=>{

            menu.classList.remove("show-menu");

            button.classList.remove("active");

        });

    });

}


/* ==========================================================
   CLOSE WHEN CLICK OUTSIDE
========================================================== */

function closeMenuOutside(menu,button){

    document.addEventListener("click",(event)=>{

        const insideMenu =
            menu.contains(event.target);

        const clickButton =
            button.contains(event.target);

        if(!insideMenu && !clickButton){

            menu.classList.remove("show-menu");

            button.classList.remove("active");

        }

    });

}


/* ==========================================================
   ESC CLOSE
========================================================== */

function closeMenuEscape(menu,button){

    document.addEventListener("keydown",(event)=>{

        if(event.key==="Escape"){

            menu.classList.remove("show-menu");

            button.classList.remove("active");

        }

    });

}


/* ==========================================================
   WINDOW RESIZE
========================================================== */

function resizeHandler(menu,button){

    window.addEventListener("resize",()=>{

        if(window.innerWidth>992){

            menu.classList.remove("show-menu");

            button.classList.remove("active");

        }

    });

}
/* ==========================================================
   UPDATE INITIALIZE WEBSITE
========================================================== */

function initializeWebsite(){

    loadingScreen();

    stickyNavbar();

    activeNavigation();

    smoothScrolling();

    themeToggle();

    scrollReveal();

    counterAnimation();

    rippleButton();

    mobileMenu();

    certificationModal();
    
    experienceSpotlight();

    backToTopButton();

}


/* ==========================================================
   CERTIFICATION MODAL
========================================================== */

function certificationModal(){

    const modal =
        document.getElementById("certification-modal");

    const iframe =
        document.getElementById("certificate-viewer");

    const closeButton =
        document.getElementById("modal-close");

    const cards =
        document.querySelectorAll(".certification-card");
    
    const portofolioCards =
    document.querySelectorAll(".portofolio-card");

    const cvButton =
    document.getElementById("cv-button");

    const title =
    document.getElementById("modal-document-title");

const downloadButton =
    document.getElementById("modal-download");

const openButton =
    document.getElementById("modal-open");


    if(!modal || !iframe) return;

   function openDocument(pdf, documentTitle){

    if(!pdf) return;

    iframe.src = pdf;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

    if(title){

        title.textContent = documentTitle;

    }

    if(downloadButton){

        downloadButton.href = pdf;

    }

    if(openButton){

        openButton.href = pdf;

    }

}
    cards.forEach(card=>{

       card.addEventListener("click",()=>{

   const pdf = card.dataset.pdf;

const documentTitle =
    card.querySelector("h3")?.textContent.trim()
    || "Certificate";

openDocument(pdf, documentTitle);

        });

    });
    portofolioCards.forEach(card=>{
    card.addEventListener("click",()=>{
        const pdf = card.dataset.pdf;

        const documentTitle =
            card.querySelector("h3")?.textContent.trim()
            || "Portofolio";

        openDocument(pdf, documentTitle);
    });
});
    if(cvButton){

    cvButton.addEventListener("click",(event)=>{

        event.preventDefault();

        const pdf = cvButton.dataset.pdf;

openDocument(

    pdf,

    "Curriculum Vitae"

);


    });

}

    if(closeButton){

        closeButton.addEventListener("click",closeModal);

    }

    modal.addEventListener("click",(event)=>{

        if(event.target===modal){

            closeModal();

        }

    });

    document.addEventListener("keydown",(event)=>{

        if(event.key==="Escape"){

            closeModal();

        }

    });

    function closeModal(){

        modal.classList.remove("active");

        document.body.style.overflow="";
if(title){

    title.textContent = "Document Viewer";

}

if(downloadButton){

    downloadButton.removeAttribute("href");

}

if(openButton){

    openButton.removeAttribute("href");

}

        setTimeout(()=>{

            iframe.src="";

        },250);

    }

}
/* ==========================================================
   BACK TO TOP
========================================================== */

function backToTopButton() {

    const button = document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 350) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}