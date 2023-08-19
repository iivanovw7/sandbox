if (String(localStorage['color-theme']) === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else if (String(localStorage['color-theme']) === 'light') {
    document.documentElement.classList.add('light')
}
