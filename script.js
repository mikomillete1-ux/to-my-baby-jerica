/* =====================================================================
   CONFIG  –  DITO LANG ANG KAILANGAN MONG I-EDIT
   Lahat ng text at pangalan ng photo ay nandito. Huwag galawin ang
   code sa ilalim maliban kung alam mo ang ginagawa mo.
   ===================================================================== */
const CONFIG = {
  // ---- Mga pangalan ----
  recipientName: "Jerica",
  senderName: "Mhyco",

  // ---- Hero ----
  heroImage: "photo1.jpg",
  heroHeading: "Baby, I'm sorry.",
  heroSubtext: "Kahit short lang 'to, galing 'to sa puso ko. Pinapangako ko na hindi na 'yon mauulit.",
  heroButton: "Basahin mo muna ❤️",

  // ---- Letter ----
  letterTitle: "Short message for Jerica, my only love",
  signature: "— Mhyco",

  // Isulat dito KUNG ANO MISMO ang nagawa mo (1-2 sentences, walang palusot).
  // Halimbawa: "Nagsinungaling ako sa'yo at nasira ko ang tiwala mo."
  // Kapag iniwan na blangko, general na sorry lang ang lalabas.
  whatIDid: "",

  letterParts: [
    {
      // Walang heading/label; mga paragraph lang.
      paragraphs: [
        "Baby, I'm really sorry sa nagawa ko, alam kong nasaktan kita, Hayaan mo muna ako manligaw sayo hanggang sa mag balik ulit ang loob mo sakin, ako naman mag tatanong, do still like me pa po ba?",
        "Yung password ko po pala nakalimutan ko kung ano pinalit ko pero tinatry kong alalahanin, update mo po kita sa password ng account ko, kahit hakawan mo account ko habang nililigawan kita, sana po mag balik ulit loob mo sakin, ikaw lang mahal ko baby, tapos pala ngayon lang ako gumawa ng ganito tapos mag public ng ganitong website, nahihirapan ako gumawa pero kering keri ko, nalaman ko nalang paano mag public ng website sa pag self study ko, galingan mo po palagi sa pag aaral ah🫶 proud na proud po ako sayo sa pag pupuyat mo sa mga activities/ project mo, ginagalingan ko din po sa pag aaral ko and magiging mayaman din tayo soon🥰 Ikaw lang ang pinaka-maganda sa mata ko, baby, at hindi kita ipagpapalit sa iba.",
        "Liligawan po ulit kita hanggang sa magustohan mo po ulit ako, salamat din sa pag sasabi ng kung paano kita mamahalin, mag tulungan po tayo sa pag build. Aalagaan ko ang tiwala mo at ipaparamdam kong ikaw lang ang pinipili ko. Sana mabalance natin ang tinitimpla nating kape hehe",
        "I like you so much and i love you baby🫶"
      ]
    }
  ],

  // ---- Memories (gallery) ----
  // Ilagay ang mga photo sa /images. Lowercase na pangalan, walang space.
  // width/height = laki ng photo (para hindi lumipat ang layout habang naglo-load).
  memoriesTitle: "Ikaw lang ang baby ko ❤️",
  memoriesSubtitle: "Pindutin ang larawan para palakihin.",
  photos: [
    { src: "photo1.jpg", alt: "Larawan ni Jerica na naka-salamin at may cute na dog filter", width: 418, height: 786 }
    // { src: "images/photo2.jpg", alt: "Ilarawan ang photo", width: 800, height: 1000 },
  ],

  // ---- Closing ----
  closingLine: "Hindi mapapako ang naging pangako ko sa'yo. I love you, sa super duper ganda babae ng buhay ko.",
  closingNote: "Sana maging okay ulit tayo, alam kong pagsubok lang 'to, ikaw pa rin ang love ko.",

  // ---- Music (optional, laging OFF sa simula) ----
  // Ilagay ang audio file sa /images o /audio, e.g. "audio/song.mp3". Blangko = walang music button.
  musicSrc: "",

  // ---- Typing effect ----
  typingEffect: true,
  typingSpeedMs: 18
};

/* =====================================================================
   CODE  –  hindi mo na kailangang galawin ito
   ===================================================================== */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  applyStaticText();
  const letter = buildLetter();
  buildGallery();
  setupReveal();
  setupLetterTyping(letter);
  setupLightbox();
  setupMusic();
});

/* ---------- Static text ---------- */
function applyStaticText() {
  document.title = "Short message for " + CONFIG.recipientName + " ❤️";
  $("hero").style.backgroundImage = "url('" + CONFIG.heroImage + "')";
  $("hero-heading").textContent = CONFIG.heroHeading;
  $("hero-sub").textContent = CONFIG.heroSubtext;
  $("hero-btn").textContent = CONFIG.heroButton;
  $("letter-title").textContent = CONFIG.letterTitle;
  $("letter-sign").textContent = CONFIG.signature;
  $("memories-title").textContent = CONFIG.memoriesTitle;
  $("memories-sub").textContent = CONFIG.memoriesSubtitle;
  $("closing-line").textContent = CONFIG.closingLine;
  $("closing-note").textContent = CONFIG.closingNote;
}

/* ---------- Letter ---------- */
const animateLetter = CONFIG.typingEffect && !prefersReducedMotion;

function buildLetter() {
  const body = $("letter-body");
  const typeables = []; // { el, text } sa tamang pagkakasunod-sunod

  CONFIG.letterParts.forEach((part, index) => {
    const wrap = document.createElement("div");

    if (part.heading) {
      const h3 = document.createElement("h3");
      h3.className = "mb-3 text-sm font-semibold uppercase tracking-widest text-heart";
      h3.textContent = part.heading;
      wrap.appendChild(h3);
    }

    (part.paragraphs || []).forEach((text, i) => {
      // Ilagay ang "whatIDid" sa dulo ng unang paragraph ng unang part
      const full = index === 0 && i === 0 && CONFIG.whatIDid ? text + " " + CONFIG.whatIDid : text;
      const p = document.createElement("p");
      p.className = "mb-3";
      wrap.appendChild(p);
      typeables.push({ el: p, text: full });
    });

    if (part.list && part.list.length) {
      const ul = document.createElement("ul");
      ul.className = "list-disc space-y-2 pl-6 marker:text-heart";
      part.list.forEach((text) => {
        const li = document.createElement("li");
        ul.appendChild(li);
        typeables.push({ el: li, text });
      });
      wrap.appendChild(ul);
    }
    body.appendChild(wrap);
  });

  // Kung walang animation, ipakita agad lahat ng text
  if (!animateLetter) {
    typeables.forEach((t) => (t.el.textContent = t.text));
    $("skip-btn").hidden = true;
  }
  return typeables;
}

function setupLetterTyping(typeables) {
  if (!animateLetter) return;

  const body = $("letter-body");
  const skipBtn = $("skip-btn");
  let skipped = false;
  let started = false;

  const finishAll = () => {
    typeables.forEach((t) => { t.el.textContent = t.text; t.el.classList.remove("caret"); });
    body.setAttribute("aria-busy", "false");
    skipBtn.hidden = true;
  };

  skipBtn.addEventListener("click", () => { skipped = true; finishAll(); });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function run() {
    body.setAttribute("aria-busy", "true");
    for (const t of typeables) {
      if (skipped) return;
      t.el.classList.add("caret");
      for (let i = 1; i <= t.text.length; i++) {
        if (skipped) return;
        t.el.textContent = t.text.slice(0, i);
        await sleep(CONFIG.typingSpeedMs);
      }
      t.el.classList.remove("caret");
      await sleep(250);
    }
    if (!skipped) finishAll();
  }

  // Magsisimula lang mag-type kapag nakita na ang letter sa screen
  const observer = new IntersectionObserver((entries) => {
    if (!started && entries.some((e) => e.isIntersecting)) {
      started = true;
      observer.disconnect();
      run();
    }
  }, { threshold: 0.2 });
  observer.observe($("letter"));
}

/* ---------- Gallery + Lightbox ---------- */
function buildGallery() {
  const list = $("gallery");
  if (!CONFIG.photos.length) { $("memories").hidden = true; return; }

  CONFIG.photos.forEach((photo, index) => {
    const li = document.createElement("li");
    li.className = "reveal";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "block w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-heart/10 transition hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-heart/50";
    btn.setAttribute("aria-label", "Palakihin: " + photo.alt);
    btn.dataset.index = index;

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = photo.width;
    img.height = photo.height;
    img.className = "aspect-[3/4] h-full w-full object-cover transition duration-500 hover:scale-105";

    btn.appendChild(img);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function setupLightbox() {
  const box = $("lightbox");
  const img = $("lb-img");
  const photos = CONFIG.photos;
  let current = 0;
  let lastFocus = null;

  const show = (i) => {
    current = (i + photos.length) % photos.length;
    img.src = photos[current].src;
    img.alt = photos[current].alt;
  };
  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    box.classList.remove("hidden");
    box.classList.add("flex");
    document.body.style.overflow = "hidden";
    $("lb-close").focus();
    const single = photos.length < 2;
    $("lb-prev").hidden = single;
    $("lb-next").hidden = single;
  };
  const close = () => {
    box.classList.add("hidden");
    box.classList.remove("flex");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };

  $("gallery").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-index]");
    if (btn) open(Number(btn.dataset.index));
  });
  $("lb-close").addEventListener("click", close);
  $("lb-prev").addEventListener("click", () => show(current - 1));
  $("lb-next").addEventListener("click", () => show(current + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.classList.contains("hidden")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft" && photos.length > 1) show(current - 1);
    if (e.key === "ArrowRight" && photos.length > 1) show(current + 1);
  });
}

/* ---------- Scroll reveal ---------- */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
}

/* ---------- Music (OFF by default, walang autoplay) ---------- */
function setupMusic() {
  if (!CONFIG.musicSrc) return;
  const btn = $("music-btn");
  const audio = new Audio(CONFIG.musicSrc);
  audio.loop = true;
  btn.hidden = false;

  btn.addEventListener("click", () => {
    const playing = btn.getAttribute("aria-pressed") === "true";
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    btn.setAttribute("aria-pressed", String(!playing));
    btn.setAttribute("aria-label", playing ? "I-play ang music" : "I-pause ang music");
    btn.textContent = playing ? "♪" : "❚❚";
  });
}
