var themeRawValue = localStorage.getItem('color-theme');

try {
    const theme = JSON.parse(themeRawValue);

    if (
            theme === 'dark' ||
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
} catch {
    document.documentElement.classList.remove('light');
}




