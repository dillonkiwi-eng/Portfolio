export function ThemeScript() {
  const script = `
    (function () {
      try {
        var theme = localStorage.getItem("portfolio-theme");
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.style.colorScheme = "dark";
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
