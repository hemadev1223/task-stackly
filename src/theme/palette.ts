export const brandColors = {
  primary: {
    main: '#4f46e5', // Modern Indigo
    light: '#818cf8',
    dark: '#3730a3',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#06b6d4', // Cyan accent
    light: '#67e8f9',
    dark: '#0e7490',
    contrastText: '#ffffff',
  },
  success: {
    main: '#10b981', // Emerald
    light: '#34d399',
    dark: '#059669',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#f59e0b', // Amber
    light: '#fbbf24',
    dark: '#d97706',
    contrastText: '#1f2937',
  },
  error: {
    main: '#ef4444', // Red
    light: '#f87171',
    dark: '#b91c1c',
    contrastText: '#ffffff',
  },
  info: {
    main: '#3b82f6', // Blue
    light: '#60a5fa',
    dark: '#1d4ed8',
    contrastText: '#ffffff',
  },
};

export const darkPalette = {
  mode: 'dark' as const,
  primary: brandColors.primary,
  secondary: brandColors.secondary,
  success: brandColors.success,
  warning: brandColors.warning,
  error: brandColors.error,
  info: brandColors.info,
  background: {
    default: '#0b0f19', // Deep space slate
    paper: '#111827',   // Card background
  },
  text: {
    primary: '#f3f4f6',
    secondary: '#9ca3af',
    disabled: '#6b7280',
  },
  divider: 'rgba(255, 255, 255, 0.08)',
};

export const lightPalette = {
  mode: 'light' as const,
  primary: brandColors.primary,
  secondary: brandColors.secondary,
  success: brandColors.success,
  warning: brandColors.warning,
  error: brandColors.error,
  info: brandColors.info,
  background: {
    default: '#f8fafc', // Crisp clean slate-50
    paper: '#ffffff',
  },
  text: {
    primary: '#0f172a',
    secondary: '#64748b',
    disabled: '#94a3b8',
  },
  divider: '#e2e8f0',
};
