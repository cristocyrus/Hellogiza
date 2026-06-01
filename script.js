/* HelloGiza Media — interactions */
(function () {
    "use strict";

    /* Nav background on scroll */
    var nav = document.getElementById("nav");
    function onScroll() {
        if (window.scrollY > 24) { nav.classList.add("scrolled"); }
        else { nav.classList.remove("scrolled"); }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Reveal on scroll */
    var reveals = document.querySelectorAll(".reveal");

    function revealInView() {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        reveals.forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.top < vh * 0.92 && r.bottom > 0) { el.classList.add("in"); }
        });
    }

    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add("in");
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
        reveals.forEach(function (el) { io.observe(el); });
        /* Safety net: anything already on-screen at load reveals immediately. */
        revealInView();
        window.addEventListener("load", revealInView);
    } else {
        reveals.forEach(function (el) { el.classList.add("in"); });
    }
})();
