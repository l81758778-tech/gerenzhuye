const categories = ["全部", "图片制作", "视频制作", "动态图形", "后期合成"];

const works = [
  {
    id: "still-life-01",
    title: "静物光影研究",
    type: "image",
    category: "图片制作",
    year: "2026",
    tags: ["静物", "调色", "光影"],
    cover: "assets/still-life-study.png",
    mediaSrc: "assets/still-life-study.png",
    videoSrc: "",
    duration: "",
    description: "以低饱和材质和斜向自然光为核心，练习画面层次、局部细节和静物氛围。"
  },
  {
    id: "poster-02",
    title: "城市海报实验",
    type: "image",
    category: "图片制作",
    year: "2026",
    tags: ["海报", "城市", "合成"],
    cover: "assets/city-poster-experiment.png",
    mediaSrc: "assets/city-poster-experiment.png",
    videoSrc: "",
    duration: "",
    description: "从街景、光斑和排版节奏出发，探索城市主题视觉的清爽表达。"
  },
  {
    id: "motion-03",
    title: "品牌开场动效",
    type: "video",
    category: "动态图形",
    year: "2026",
    tags: ["Motion", "Logo", "节奏"],
    cover: "assets/brand-motion-opener.png",
    mediaSrc: "assets/brand-motion-opener.png",
    videoSrc: "",
    duration: "00:18",
    description: "用于品牌开场的动态图形方向，强调干净切换、留白和短节奏冲击。"
  },
  {
    id: "edit-04",
    title: "短片节奏剪辑",
    type: "video",
    category: "视频制作",
    year: "2025",
    tags: ["剪辑", "短片", "声音"],
    cover: "assets/short-film-edit.png",
    mediaSrc: "assets/short-film-edit.png",
    videoSrc: "",
    duration: "01:12",
    description: "围绕环境声和镜头呼吸感完成的短片剪辑练习，保留简洁叙事结构。"
  },
  {
    id: "composite-05",
    title: "产品氛围合成",
    type: "image",
    category: "后期合成",
    year: "2025",
    tags: ["产品", "材质", "后期"],
    cover: "assets/product-atmosphere.png",
    mediaSrc: "assets/product-atmosphere.png",
    videoSrc: "",
    duration: "",
    description: "使用金属、玻璃和柔和反射组合，练习产品主体与场景氛围的融合。"
  },
  {
    id: "motion-06",
    title: "字体运动测试",
    type: "video",
    category: "动态图形",
    year: "2025",
    tags: ["字体", "动效", "节拍"],
    cover: "assets/type-motion-test.png",
    mediaSrc: "assets/type-motion-test.png",
    videoSrc: "",
    duration: "00:26",
    description: "以字重变化、遮罩和位移为主的字体运动测试，用于社交媒体短片片头。"
  },
  {
    id: "retouch-07",
    title: "人像色彩修饰",
    type: "image",
    category: "图片制作",
    year: "2025",
    tags: ["人像", "肤色", "色彩"],
    cover: "assets/portrait-color-retouch.png",
    mediaSrc: "assets/portrait-color-retouch.png",
    videoSrc: "",
    duration: "",
    description: "偏自然的人像后期方向，保留皮肤质感，并统一背景、服装与光线色温。"
  },
  {
    id: "grade-08",
    title: "夜景调色片段",
    type: "video",
    category: "视频制作",
    year: "2025",
    tags: ["调色", "夜景", "质感"],
    cover: "assets/night-grade-sequence.png",
    mediaSrc: "assets/night-grade-sequence.png",
    videoSrc: "",
    duration: "00:42",
    description: "夜景素材的色彩统一练习，重点控制高光溢出、肤色稳定和暗部层次。"
  }
];

const filtersNode = document.querySelector("#filters");
const worksNode = document.querySelector("#works");
const resultCountNode = document.querySelector("#result-count");
const lightbox = document.querySelector("#lightbox");
const lightboxMedia = document.querySelector("#lightbox-media");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxMeta = document.querySelector("#lightbox-meta");
const lightboxDescription = document.querySelector("#lightbox-description");
const lightboxTags = document.querySelector("#lightbox-tags");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeCategory = "全部";
let visibleWorks = [...works];
let activeIndex = 0;
let lastFocusedElement = null;

function renderFilters() {
  filtersNode.innerHTML = categories
    .map(
      (category) => `
        <button
          class="filter-button"
          type="button"
          aria-pressed="${category === activeCategory}"
          data-category="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");
}

function renderWorks() {
  visibleWorks = works.filter((work) => activeCategory === "全部" || work.category === activeCategory);
  resultCountNode.textContent = `${visibleWorks.length} 件作品`;

  worksNode.innerHTML = visibleWorks
    .map((work, index) => {
      const typeLabel = work.type === "video" ? work.duration || "Video" : "Image";
      const tagItems = work.tags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("");

      return `
        <button
          class="work-card"
          type="button"
          data-index="${index}"
          style="--order: ${index}"
          aria-label="打开作品：${work.title}"
        >
          <img src="${work.cover}" alt="${work.title}" loading="lazy">
          <span class="media-badge">${typeLabel}</span>
          <span class="card-content">
            <span class="card-row">
              <span>${work.category}</span>
              <span>${work.year}</span>
            </span>
            <span class="card-title">${work.title}</span>
            <span class="card-tags" aria-hidden="true">${tagItems}</span>
          </span>
        </button>
      `;
    })
    .join("");

  hydrateWorkCards();
}

function updateCategory(category) {
  activeCategory = category;
  worksNode.classList.add("is-filtering");
  renderFilters();
  renderWorks();
  window.setTimeout(() => worksNode.classList.remove("is-filtering"), 280);
}

function openLightbox(index) {
  activeIndex = index;
  lastFocusedElement = document.activeElement;
  renderLightbox();
  lightbox.hidden = false;
  document.body.classList.add("is-locked");
  closeButton.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("is-locked");
  lightboxMedia.innerHTML = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function renderLightbox() {
  const work = visibleWorks[activeIndex];
  if (!work) return;

  lightboxTitle.textContent = work.title;
  lightboxMeta.textContent = `${work.category} / ${work.year}${work.duration ? ` / ${work.duration}` : ""}`;
  lightboxDescription.textContent = work.description;
  lightboxTags.innerHTML = work.tags.map((tag) => `<li>${tag}</li>`).join("");

  if (work.type === "video" && work.videoSrc) {
    lightboxMedia.innerHTML = `
      <video src="${work.videoSrc}" poster="${work.cover}" controls autoplay playsinline></video>
    `;
    return;
  }

  if (work.type === "video") {
    lightboxMedia.innerHTML = `
      <div class="video-placeholder">
        <img src="${work.mediaSrc || work.cover}" alt="${work.title}">
        <span>视频文件待替换</span>
      </div>
    `;
    return;
  }

  lightboxMedia.innerHTML = `<img src="${work.mediaSrc}" alt="${work.title}">`;
}

function showPreviousWork() {
  activeIndex = (activeIndex - 1 + visibleWorks.length) % visibleWorks.length;
  renderLightbox();
}

function showNextWork() {
  activeIndex = (activeIndex + 1) % visibleWorks.length;
  renderLightbox();
}

function setupReveals() {
  const revealNodes = document.querySelectorAll(".reveal");

  if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function hydrateWorkCards() {
  const cards = worksNode.querySelectorAll(".work-card");

  cards.forEach((card) => {
    card.classList.add("is-visible");

    if (reducedMotionQuery.matches) return;

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      const rotateX = ((0.5 - y / rect.height) * 5);

      card.style.setProperty("--mx", `${xPercent}%`);
      card.style.setProperty("--my", `${yPercent}%`);
      card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
  });
}

filtersNode.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  updateCategory(button.dataset.category);
});

worksNode.addEventListener("click", (event) => {
  const card = event.target.closest("[data-index]");
  if (!card) return;
  openLightbox(Number(card.dataset.index));
});

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", showPreviousWork);
nextButton.addEventListener("click", showNextWork);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showPreviousWork();
  }

  if (event.key === "ArrowRight") {
    showNextWork();
  }
});

document.body.classList.add("animations-ready");
setupReveals();
renderFilters();
renderWorks();
