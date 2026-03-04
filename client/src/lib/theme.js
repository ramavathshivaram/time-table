export const applyDarkMode = (darkMode) => {
  const html = document.documentElement;

  if (darkMode) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};