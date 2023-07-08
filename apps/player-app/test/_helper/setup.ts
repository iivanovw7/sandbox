vi.mock('virtual:svg-icons-names', () => ({
    'default': vi.fn()
}));

Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query) => ({
        addEventListener: vi.fn(),
        addListener: vi.fn(),
        dispatchEvent: vi.fn(),
        matches: false,
        media: query,
        onchange: null,
        removeEventListener: vi.fn(),
        removeListener: vi.fn(),
    })),
    writable: true,
});
