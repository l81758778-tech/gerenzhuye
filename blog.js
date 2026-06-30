const blogFilters = document.querySelector("#blog-filters");
const blogGrid = document.querySelector("#blog-notes-grid");
const blogResult = document.querySelector("#blog-result");
const categoryCounts = document.querySelector("#category-counts");
const articles = window.blogArticles;

function renderArticles(category = "全部") {
  const visibleArticles = articles.filter((article) => category === "全部" || article.category === category);

  blogGrid.innerHTML = visibleArticles.map((article) => `
    <article class="journal-card">
      <a href="article.html?id=${article.id}" aria-label="阅读文章：${article.title}">
        <div class="journal-card-topline">
          <span>${String(article.index).padStart(2, "0")}</span>
          <span>${article.category} · ${article.date}</span>
        </div>
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <div class="journal-card-footer">
          <ul aria-label="文章标签">${article.tags.map((tag) => `<li>${tag}</li>`).join("")}</ul>
          <span>阅读全文</span>
        </div>
      </a>
    </article>
  `).join("");

  blogResult.textContent = `${String(visibleArticles.length).padStart(2, "0")} 篇笔记`;
}

function renderStats() {
  const categories = [...new Set(articles.map((article) => article.category))];
  const tags = [...new Set(articles.flatMap((article) => article.tags))];
  document.querySelector("#stat-articles").textContent = String(articles.length).padStart(2, "0");
  document.querySelector("#stat-categories").textContent = String(categories.length).padStart(2, "0");
  document.querySelector("#stat-tags").textContent = String(tags.length).padStart(2, "0");

  categoryCounts.innerHTML = categories.map((category) => {
    const count = articles.filter((article) => article.category === category).length;
    return `<button type="button" data-blog-filter="${category}"><span>${category}</span><span>${String(count).padStart(2, "0")}</span></button>`;
  }).join("");
}

function updateBlogFilter(category) {
  blogFilters.querySelectorAll("[data-blog-filter]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.blogFilter === category));
  });
  renderArticles(category);
}

blogFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-blog-filter]");
  if (button) updateBlogFilter(button.dataset.blogFilter);
});

categoryCounts.addEventListener("click", (event) => {
  const button = event.target.closest("[data-blog-filter]");
  if (!button) return;
  updateBlogFilter(button.dataset.blogFilter);
  document.querySelector(".journal-toolbar").scrollIntoView({ behavior: "smooth", block: "start" });
});

renderStats();
renderArticles();
window.initJournalLightField("#blog-light-canvas");
