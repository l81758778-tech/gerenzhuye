const params = new URLSearchParams(window.location.search);
const articles = window.blogArticles;
const requestedId = params.get("id");
const activeIndex = Math.max(0, articles.findIndex((item) => item.id === requestedId));
const article = articles[activeIndex];
const previous = articles[(activeIndex - 1 + articles.length) % articles.length];
const next = articles[(activeIndex + 1) % articles.length];

document.title = `${article.title} | 创作笔记`;
document.querySelector('meta[name="description"]').setAttribute("content", article.excerpt);
document.querySelector("#article-eyebrow").textContent = `${String(article.index).padStart(2, "0")} / ${article.category} / ${article.date} / ${article.readTime}`;
document.querySelector("#article-title").textContent = article.title;
document.querySelector("#article-deck").textContent = article.excerpt;
document.querySelector("#article-tags").innerHTML = article.tags.map((tag) => `<li>${tag}</li>`).join("");

document.querySelector("#article-body").innerHTML = article.sections.map((section, sectionIndex) => `
  <section id="section-${sectionIndex + 1}" aria-labelledby="section-title-${sectionIndex + 1}">
    <p class="article-section-number">${String(sectionIndex + 1).padStart(2, "0")}</p>
    <h2 id="section-title-${sectionIndex + 1}">${section.title}</h2>
    ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    ${section.list ? `<ul>${section.list.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
    ${section.quote ? `<blockquote>${section.quote}</blockquote>` : ""}
  </section>
`).join("");

document.querySelector("#article-toc-links").innerHTML = article.sections.map((section, index) => `
  <a href="#section-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span>${section.title}</a>
`).join("");

const previousLink = document.querySelector("#previous-article");
const nextLink = document.querySelector("#next-article");
previousLink.href = `article.html?id=${previous.id}`;
previousLink.innerHTML = `<span>上一篇</span><strong>${previous.title}</strong>`;
nextLink.href = `article.html?id=${next.id}`;
nextLink.innerHTML = `<span>下一篇</span><strong>${next.title}</strong>`;

const tocLinks = [...document.querySelectorAll("#article-toc-links a")];
const observedSections = [...document.querySelectorAll(".article-body section")];
const observer = new IntersectionObserver((entries) => {
  const visible = entries.find((entry) => entry.isIntersecting);
  if (!visible) return;
  tocLinks.forEach((link) => link.setAttribute("aria-current", String(link.hash === `#${visible.target.id}`)));
}, { rootMargin: "-18% 0px -65% 0px" });
observedSections.forEach((section) => observer.observe(section));

window.initJournalLightField("#article-light-canvas");
