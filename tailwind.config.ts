import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "var(--bg-page)",
        surface: "var(--bg-surface)",
        secondary: "var(--bg-secondary)",
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        tertiary: "var(--text-tertiary)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
        "success-bg": "var(--success-bg)",
        "success-text": "var(--success-text)",
        destructive: "var(--text-destructive)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["13px", "1.4"],
        xs: ["14px", "1.5"],
        sm: ["15px", "1.5"],
        base: ["17px", "1.5"],
        md: ["19px", "1.45"],
        lg: ["24px", "1.3"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      transitionDuration: {
        DEFAULT: "180ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
