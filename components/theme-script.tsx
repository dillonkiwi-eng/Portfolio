export function ThemeScript() {
  const script = `
    (function () {
      try {
        var stored = localStorage.getItem("portfolio-theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.style.colorScheme = "dark";
        }
        var icon =
          theme === "dark"
            ? "/assets/favicon/icon-dark.png"
            : "/assets/favicon/icon-light.png";
        var link = document.querySelector('link[rel="icon"][data-app-favicon]');
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          link.setAttribute("data-app-favicon", "");
          document.head.appendChild(link);
        }
        link.href = icon;
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
