// ─── Design tokens ───────────────────────────────────────────────────────────
export const theme = {
  emerald: "#059669",
  emeraldLight: "#d1fae5",
  emeraldDark: "#047857",
  emeraldFaint: "rgba(5,150,105,0.08)",
  red: "#dc2626",
  redLight: "#fee2e2",
  amber: "#d97706",
  amberLight: "#fef3c7",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",
  white: "#ffffff",
};

// ─── Global CSS (injected via <style> tag in root component) ─────────────────
export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${theme.gray50}; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .panel-enter { animation: fadeIn 0.25s ease both; }
`;

// ─── Component styles ─────────────────────────────────────────────────────────
export const styles = {
  // Layout
  page: {
    minHeight: "100vh",
    background: theme.gray50,
    fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
    color: theme.gray900,
  },
  main: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "2.5rem 1.5rem",
  },
  card: {
    background: theme.white,
    borderRadius: 20,
    border: `1px solid ${theme.gray200}`,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },

  // Header
  header: {
    background: theme.white,
    borderBottom: `1px solid ${theme.gray200}`,
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  headerInner: {
    maxWidth: 1152,
    margin: "0 auto",
    padding: "0 1.5rem",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: theme.emeraldFaint,
    border: `1px solid ${theme.emeraldLight}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontWeight: 600,
    fontSize: 15,
    color: theme.gray900,
    letterSpacing: "-0.01em",
  },
  badge: {
    fontSize: 13,
    color: theme.gray500,
  },

  // Hero section
  heroSection: {
    padding: "3rem 2.5rem",
    textAlign: "center",
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: theme.emerald,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(5,150,105,0.3)",
  },
  h1: {
    marginTop: 24,
    fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    color: theme.gray900,
  },
  subtitle: {
    color: theme.gray500,
    fontSize: 15,
    maxWidth: 480,
    margin: "10px auto 0",
    lineHeight: 1.6,
  },
  suggestions: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: 520,
    margin: "28px auto 0",
  },
  suggestionBtn: {
    width: "100%",
    border: `1px solid ${theme.gray200}`,
    background: theme.white,
    borderRadius: 14,
    padding: "12px 16px",
    textAlign: "left",
    color: theme.gray800,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.15s, border-color 0.15s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },

  // Composer
  composerBar: {
    borderTop: `1px solid ${theme.gray200}`,
    background: "rgba(249,250,251,0.8)",
    padding: "1rem 1.5rem",
  },
  composerInner: {
    maxWidth: 800,
    margin: "0 auto",
    position: "relative",
  },
  textarea: {
    width: "100%",
    resize: "none",
    borderRadius: 18,
    border: `1px solid ${theme.gray200}`,
    background: theme.white,
    padding: "14px 56px 14px 16px",
    fontSize: 14,
    color: theme.gray900,
    outline: "none",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  textareaFocus: {
    borderColor: theme.emerald,
    boxShadow: `0 0 0 3px rgba(5,150,105,0.12)`,
  },
  textareaError: {
    borderColor: theme.red,
    boxShadow: `0 0 0 3px rgba(220,38,38,0.12)`,
  },
  sendBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    border: `1px solid ${theme.gray200}`,
    background: theme.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.15s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  disclaimer: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 11,
    color: theme.gray400,
  },

  // Panel
  panel: {
    borderTop: `1px solid ${theme.gray200}`,
    padding: "2rem 2.5rem",
    background: theme.white,
  },
  panelInner: {
    maxWidth: 640,
    margin: "0 auto",
  },
  statusLine: {
    textAlign: "center",
    fontSize: 13,
    color: theme.emerald,
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  spinner: {
    width: 14,
    height: 14,
    border: `2px solid ${theme.emeraldLight}`,
    borderTopColor: theme.emerald,
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },

  // Follow-up block
  sectionTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: theme.gray900,
    marginBottom: 4,
  },
  reasoningText: {
    fontSize: 13,
    color: theme.gray500,
    marginBottom: 16,
    lineHeight: 1.5,
  },
  questionList: {
    paddingLeft: 20,
    margin: "0 0 20px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  questionItem: {
    fontSize: 14,
    color: theme.gray800,
    lineHeight: 1.5,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: theme.gray700,
    marginBottom: 8,
  },
  answersTextarea: {
    width: "100%",
    resize: "none",
    borderRadius: 16,
    border: `1px solid ${theme.gray200}`,
    background: theme.white,
    padding: "12px 14px",
    fontSize: 14,
    color: theme.gray900,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  submitBtn: {
    marginTop: 14,
    width: "100%",
    borderRadius: 14,
    background: theme.emerald,
    border: "none",
    color: theme.white,
    padding: "13px 16px",
    fontWeight: 500,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.15s",
    fontFamily: "inherit",
  },

  // Result block
  resultBox: {
    borderRadius: 16,
    border: `1px solid ${theme.emeraldLight}`,
    background: "rgba(209,250,229,0.3)",
    padding: "18px 20px",
    fontSize: 14,
    color: theme.gray900,
    whiteSpace: "pre-wrap",
    lineHeight: 1.65,
    marginBottom: 12,
  },
  urgency: {
    fontSize: 13,
    color: theme.gray600,
    marginBottom: 6,
  },
  disclaimerResult: {
    fontSize: 12,
    color: theme.gray400,
    marginBottom: 16,
  },
  doctorReport: {
    borderRadius: 14,
    border: `1px solid ${theme.gray200}`,
    background: theme.gray50,
    padding: "16px 18px",
    fontSize: 13,
    color: theme.gray800,
    whiteSpace: "pre-wrap",
    lineHeight: 1.65,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 13,
    color: theme.red,
    marginBottom: 10,
  },

  // Buttons
  outlineBtn: {
    width: "100%",
    borderRadius: 14,
    border: `1px solid ${theme.gray200}`,
    background: theme.white,
    padding: "12px 16px",
    fontWeight: 500,
    fontSize: 14,
    color: theme.gray800,
    cursor: "pointer",
    transition: "background 0.15s",
    fontFamily: "inherit",
    marginBottom: 10,
  },
  ghostBtn: {
    width: "100%",
    borderRadius: 14,
    border: `1px solid ${theme.gray200}`,
    background: theme.white,
    padding: "12px 16px",
    fontSize: 14,
    color: theme.gray700,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.15s",
  },

  // Alerts
  alertDanger: {
    borderRadius: 14,
    border: "1px solid #fca5a5",
    background: "#fee2e2",
    padding: "16px 18px",
    color: "#7f1d1d",
  },
  alertWarn: {
    borderRadius: 14,
    border: "1px solid #fcd34d",
    background: "#fef3c7",
    padding: "16px 18px",
    color: "#78350f",
  },
  alertTitle: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 6,
  },
  alertBody: {
    fontSize: 13,
    opacity: 0.9,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
};
