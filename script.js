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

const galleryLayouts = [
  { x: 1, y: 7, w: 23, h: 43, r: -2.5, tiltX: 2, tiltY: 8, cut: 7, depth: 3 },
  { x: 76, y: 6, w: 21, h: 35, r: 1.8, tiltX: -1, tiltY: -8, cut: 10, depth: 2 },
  { x: 57, y: 52, w: 26, h: 42, r: -1.2, tiltX: 4, tiltY: 5, cut: 6, depth: 3 },
  { x: 5, y: 59, w: 19, h: 30, r: 1.6, tiltX: -2, tiltY: 7, cut: 12, depth: 1 },
  { x: 29, y: 3, w: 17, h: 29, r: 0.8, tiltX: 3, tiltY: -5, cut: 8, depth: 1 },
  { x: 84, y: 58, w: 14, h: 26, r: 2.1, tiltX: 2, tiltY: -8, cut: 11, depth: 1 },
  { x: 27, y: 63, w: 20, h: 33, r: -1.7, tiltX: -3, tiltY: 5, cut: 6, depth: 2 },
  { x: 62, y: 9, w: 12, h: 23, r: -0.9, tiltX: 4, tiltY: -4, cut: 10, depth: 1 }
];

const body = document.body;
const galleryNode = document.querySelector("#works");
const archiveNode = document.querySelector("#archive-grid");
const filtersNode = document.querySelector("#filters");
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
const introOverlay = document.querySelector("#cinematic-intro");
const skipIntroButton = document.querySelector("#intro-skip");
const replayIntroButton = document.querySelector("#replay-intro");
const lightCanvas = document.querySelector("#light-canvas");
const introCountCurrent = document.querySelector("#intro-count-current");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let activeCategory = "全部";
let visibleWorks = [...works];
let activeIndex = 0;
let lastFocusedElement = null;
let introStart = 0;
let introActive = false;
let introTimer = 0;
let introCleanupTimer = 0;
let lightRenderer = null;

function renderGallery() {
  galleryNode.innerHTML = works
    .map((work, index) => {
      const layout = galleryLayouts[index];
      return `
        <button
          class="gallery-frame"
          type="button"
          data-work-id="${work.id}"
          aria-label="打开作品：${work.title}"
          style="--x:${layout.x};--y:${layout.y};--w:${layout.w};--h:${layout.h};--r:${layout.r}deg;--r-hover:${layout.r * 0.72}deg;--tilt-x:${layout.tiltX}deg;--tilt-y:${layout.tiltY}deg;--tilt-x-hover:${layout.tiltX * 0.72}deg;--tilt-y-hover:${layout.tiltY * 0.72}deg;--cut:${layout.cut}%;--depth:${layout.depth};--order:${index}"
        >
          <span class="frame-body">
            <span class="frame-mat">
              <img src="${work.cover}" alt="" loading="eager">
              <span class="frame-reflection" aria-hidden="true"></span>
            </span>
            <span class="frame-plaque">
              <span class="frame-index">${String(index + 1).padStart(2, "0")}</span>
              <span class="frame-title">${work.title}</span>
              <span class="frame-meta">${work.category} · ${work.year}</span>
            </span>
          </span>
        </button>
      `;
    })
    .join("");
}

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

function renderArchive() {
  visibleWorks = works.filter((work) => activeCategory === "全部" || work.category === activeCategory);
  resultCountNode.textContent = `${String(visibleWorks.length).padStart(2, "0")} works`;

  archiveNode.innerHTML = visibleWorks
    .map(
      (work) => `
        <button class="archive-card" type="button" data-work-id="${work.id}" aria-label="打开作品：${work.title}">
          <img src="${work.cover}" alt="" loading="lazy">
          <span class="archive-card-content">
            <small>${work.category} / ${work.year}</small>
            <strong>${work.title}</strong>
          </span>
        </button>
      `
    )
    .join("");
}

function updateCategory(category) {
  activeCategory = category;
  renderFilters();
  renderArchive();
}

function findWorkIndex(id) {
  return works.findIndex((work) => work.id === id);
}

function openLightboxById(id) {
  const index = findWorkIndex(id);
  if (index < 0) return;
  activeIndex = index;
  lastFocusedElement = document.activeElement;
  renderLightbox();
  lightbox.hidden = false;
  body.classList.add("is-locked");
  closeButton.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  body.classList.remove("is-locked");
  lightboxMedia.innerHTML = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}

function renderLightbox() {
  const work = works[activeIndex];
  if (!work) return;

  lightboxTitle.textContent = work.title;
  lightboxMeta.textContent = `${work.category} / ${work.year}${work.duration ? ` / ${work.duration}` : ""}`;
  lightboxDescription.textContent = work.description;
  lightboxTags.innerHTML = work.tags.map((tag) => `<li>${tag}</li>`).join("");

  if (work.type === "video" && work.videoSrc) {
    lightboxMedia.innerHTML = `<video src="${work.videoSrc}" poster="${work.cover}" controls autoplay playsinline></video>`;
  } else if (work.type === "video") {
    lightboxMedia.innerHTML = `
      <div class="video-placeholder">
        <img src="${work.mediaSrc || work.cover}" alt="${work.title}">
        <span>视频文件待替换</span>
      </div>
    `;
  } else {
    lightboxMedia.innerHTML = `<img src="${work.mediaSrc}" alt="${work.title}">`;
  }
}

function showPreviousWork() {
  activeIndex = (activeIndex - 1 + works.length) % works.length;
  renderLightbox();
}

function showNextWork() {
  activeIndex = (activeIndex + 1) % works.length;
  renderLightbox();
}

function setIntroPhase(phase) {
  body.classList.remove("intro-light", "intro-detail", "intro-title", "intro-gallery");
  if (phase) body.classList.add(phase);
  if (introCountCurrent) {
    introCountCurrent.textContent = phase === "intro-detail" ? "02" : phase === "intro-title" || phase === "intro-gallery" ? "03" : "01";
  }
}

function completeIntro() {
  introActive = false;
  window.clearTimeout(introCleanupTimer);
  body.classList.remove("intro-running", "intro-light", "intro-detail", "intro-title");
  body.classList.add("intro-gallery", "intro-complete");
  introOverlay.setAttribute("aria-hidden", "true");
  skipIntroButton.tabIndex = -1;
  introCleanupTimer = window.setTimeout(() => {
    body.classList.remove("intro-gallery");
  }, 1150);
}

function updateIntro(timestamp) {
  if (!introActive) return;
  if (!introStart) introStart = timestamp;
  const elapsed = timestamp - introStart;

  if (elapsed < 250) setIntroPhase("");
  else if (elapsed < 2200) setIntroPhase("intro-light");
  else if (elapsed < 3800) setIntroPhase("intro-detail");
  else if (elapsed < 5800) setIntroPhase("intro-title");
  else if (elapsed < 8200) setIntroPhase("intro-gallery");
  else {
    completeIntro();
    return;
  }

  introTimer = window.requestAnimationFrame(updateIntro);
}

function playIntro() {
  window.cancelAnimationFrame(introTimer);
  window.clearTimeout(introCleanupTimer);
  introStart = 0;
  introActive = true;
  introOverlay.removeAttribute("aria-hidden");
  skipIntroButton.tabIndex = 0;
  body.classList.remove("intro-complete", "reduced-motion");
  body.classList.add("intro-running");
  setIntroPhase("");
  window.scrollTo({ top: 0, behavior: "auto" });
  introTimer = window.requestAnimationFrame(updateIntro);
}

function setupGalleryParallax() {
  if (reducedMotionQuery.matches || !window.matchMedia("(pointer: fine)").matches) return;

  galleryNode.addEventListener("pointermove", (event) => {
    const rect = galleryNode.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    galleryNode.style.setProperty("--px", x.toFixed(3));
    galleryNode.style.setProperty("--py", y.toFixed(3));
  });

  galleryNode.addEventListener("pointerleave", () => {
    galleryNode.style.setProperty("--px", "0");
    galleryNode.style.setProperty("--py", "0");
  });
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initLightField() {
  const gl = lightCanvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    powerPreference: "high-performance"
  });

  if (!gl) {
    body.classList.add("no-webgl");
    return null;
  }

  const vertexSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform vec2 u_pointer;
    uniform float u_time;
    uniform float u_strength;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }

    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 p = (frag - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      p.x += u_pointer.x * 0.035;
      p.y -= u_pointer.y * 0.025;

      float t = u_time * 0.16;
      float angle = atan(p.y, p.x);
      float radius = length(p * vec2(0.92, 1.06));
      float contour = 0.285
        + sin(angle * 3.0 + t) * 0.045
        + sin(angle * 5.0 - t * 1.7) * 0.018
        + (noise(p * 3.2 + t) - 0.5) * 0.06;

      float bodyShape = 1.0 - smoothstep(contour - 0.08, contour + 0.018, radius);
      float rim = exp(-abs(radius - contour) * 38.0);
      float inner = 1.0 - smoothstep(0.02, contour, radius);

      vec2 lightPosition = vec2(-0.32 + sin(t * 0.7) * 0.08, 0.29 + cos(t * 0.5) * 0.04);
      float keyLight = pow(max(0.0, 1.0 - length(p - lightPosition)), 3.4);
      float edgeLight = pow(max(0.0, dot(normalize(p + 0.0001), normalize(vec2(-0.78, 0.64)))), 9.0) * rim;
      float specular = pow(max(0.0, 1.0 - length(p - vec2(-0.12, 0.1))), 13.0) * bodyShape;

      float diagonalBeam = exp(-abs(p.x * 0.46 + p.y * 0.88 + 0.12) * 7.0);
      diagonalBeam *= smoothstep(0.86, 0.05, length(p - vec2(-0.12, 0.08)));
      float distantGlow = exp(-length(p - vec2(-0.42, 0.28)) * 3.8);

      float sculpture = bodyShape * (0.025 + keyLight * 0.28 + inner * 0.035)
        + rim * 0.2
        + edgeLight * 1.05
        + specular * 0.72;
      float atmosphere = diagonalBeam * 0.08 + distantGlow * 0.045;
      float vignette = smoothstep(0.88, 0.15, length(p));
      float grain = (hash(frag + floor(u_time * 12.0)) - 0.5) * 0.018;
      float value = (sculpture + atmosphere) * vignette * u_strength + grain;

      vec3 tone = vec3(value * 0.92, value * 0.94, value);
      gl_FragColor = vec4(tone, 1.0);
    }
  `;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) {
    body.classList.add("no-webgl");
    return null;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    body.classList.add("no-webgl");
    return null;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, "a_position");
  const resolution = gl.getUniformLocation(program, "u_resolution");
  const pointer = gl.getUniformLocation(program, "u_pointer");
  const time = gl.getUniformLocation(program, "u_time");
  const strength = gl.getUniformLocation(program, "u_strength");
  let pointerX = 0;
  let pointerY = 0;
  let animationFrame = 0;
  let previousFrame = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.floor(window.innerWidth * dpr));
    const height = Math.max(1, Math.floor(window.innerHeight * dpr));
    if (lightCanvas.width !== width || lightCanvas.height !== height) {
      lightCanvas.width = width;
      lightCanvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  function draw(timestamp) {
    animationFrame = window.requestAnimationFrame(draw);
    if (document.hidden) return;

    const minimumGap = introActive ? 16 : 32;
    if (timestamp - previousFrame < minimumGap) return;
    previousFrame = timestamp;
    resize();

    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolution, lightCanvas.width, lightCanvas.height);
    gl.uniform2f(pointer, pointerX, pointerY);
    gl.uniform1f(time, timestamp * 0.001);

    let fieldStrength = 0.58;
    if (introActive && introStart) {
      const elapsed = timestamp - introStart;
      if (elapsed < 250) fieldStrength = Math.max(0, elapsed / 250) * 0.3;
      else if (elapsed < 2200) fieldStrength = 0.3 + ((elapsed - 250) / 1950) * 0.62;
      else if (elapsed < 3800) fieldStrength = 0.92 + Math.sin((elapsed - 2200) / 1600 * Math.PI) * 0.08;
      else if (elapsed < 5800) fieldStrength = 0.86;
      else fieldStrength = Math.max(0.58, 0.86 - ((elapsed - 5800) / 2400) * 0.28);
    }
    gl.uniform1f(strength, fieldStrength);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  if (!reducedMotionQuery.matches && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  animationFrame = window.requestAnimationFrame(draw);
  return () => window.cancelAnimationFrame(animationFrame);
}

filtersNode.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) updateCategory(button.dataset.category);
});

galleryNode.addEventListener("click", (event) => {
  const card = event.target.closest("[data-work-id]");
  if (card) openLightboxById(card.dataset.workId);
});

archiveNode.addEventListener("click", (event) => {
  const card = event.target.closest("[data-work-id]");
  if (card) openLightboxById(card.dataset.workId);
});

skipIntroButton.addEventListener("click", completeIntro);
replayIntroButton.addEventListener("click", playIntro);
closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", showPreviousWork);
nextButton.addEventListener("click", showNextWork);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (introActive && event.key === "Escape") {
    completeIntro();
    return;
  }
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPreviousWork();
  if (event.key === "ArrowRight") showNextWork();
});

renderGallery();
renderFilters();
renderArchive();
setupGalleryParallax();
lightRenderer = initLightField();

if (reducedMotionQuery.matches) {
  body.classList.remove("intro-running");
  body.classList.add("intro-complete", "reduced-motion");
  introOverlay.setAttribute("aria-hidden", "true");
  skipIntroButton.tabIndex = -1;
} else {
  playIntro();
}
