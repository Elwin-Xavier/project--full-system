export const toggleDarkMode = () => {
    const rootElement = document.documentElement;
    const isDarkMode = rootElement.classList.contains('dark');
  
    if (isDarkMode) {
      rootElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      rootElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };
  
  export const loadTheme = () => {
    const rootElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
  
    if (savedTheme === 'dark') {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  };
  