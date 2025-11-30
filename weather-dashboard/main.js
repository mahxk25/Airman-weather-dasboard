/* ======================================================
      INTRO → PLANE SEQUENCING  (CORRECTED)
====================================================== */
window.addEventListener("load", () => {
    const introInner = document.getElementById("introInner");
    const intro = document.getElementById("intro-screen");
    const plane = document.getElementById("heroPlane");

    // Remove forced hiding so CSS can control the intro state
    if (plane) {
        plane.classList.remove("animate-plane");
    }

    setTimeout(() => {
        introInner.classList.add("intro-exit");
    }, 1600);

    setTimeout(() => {
        if (intro) intro.style.display = "none";
        if (plane) {
        plane.style.removeProperty("opacity");
        plane.style.removeProperty("visibility");
        plane.style.removeProperty("pointer-events");
        plane.classList.add("animate-plane");
    }
}, 2400);

});


/* ======================================================
      WEATHER CARD REVEAL — FLOAT + STAGGER
====================================================== */
const cards = document.querySelectorAll(".weather-card");

const observer = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const idx = Array.from(cards).indexOf(el);

                // stagger reveal
                setTimeout(() => el.classList.add("show"), idx * 80);

                // MICRO FLOAT ANIMATION ON MOUSE MOVE
                el.addEventListener("mousemove", (e) => {
                    const rect = el.getBoundingClientRect();
                    const relY = (e.clientY - rect.top) / rect.height - 0.5;
                    el.style.transform = `translateY(${ -6 + -relY * 8 }px)`;
                });

                el.addEventListener("mouseleave", () => {
                    el.style.transform = "translateY(0)";
                });

                obs.unobserve(el);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);

cards.forEach((c) => observer.observe(c));

/* ======================================================
      HERO PLANE – ensure stays animated if hero re-enters
====================================================== */
const hero = document.querySelector(".hero");

if (hero) {
    const heroObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const plane = document.getElementById("heroPlane");
                if (!plane) return;

                if (entry.isIntersecting) {
                    if (!plane.classList.contains("animate-plane")) {
                        plane.classList.add("animate-plane");
                    }
                }
            });
        },
        { threshold: 0.3 }
    );

    heroObserver.observe(hero);
}

/* ======================================================
      HERO GLOW PARALLAX (subtle)
====================================================== */
window.addEventListener("scroll", () => {
    const glow = document.querySelector(".hero-plane-glow");
    if (!glow) return;
    const offset = window.scrollY * 0.08;
    glow.style.transform = `translateY(${offset}px)`;
});

/* ======================================================
      CARD ACCENT WIDTH CONTROL (smooth neon effect)
====================================================== */
document.querySelectorAll(".weather-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
        const accent = card.querySelector(".accent");
        if (accent) accent.style.width = "14px";
    });
    card.addEventListener("mouseleave", () => {
        const accent = card.querySelector(".accent");
        if (accent) accent.style.width = "";
    });
});