import { useState, useRef } from "react";
import { theme, styles, globalCSS } from "./styles";

// ─── Utility ──────────────────────────────────────────────────────────────────
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

async function postJSON(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok && !data.error && !data.emergency) {
    return { error: true, message: data.message || `Request failed (${res.status}).` };
  }
  return data;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={theme.emerald} strokeWidth={2}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="white" strokeWidth={2}>
      <path d="M12 16v-5" />
      <path d="M12 8h.01" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={theme.gray600} strokeWidth={2}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────
function SpinnerInline() {
  return <div style={styles.spinner} />;
}

function Alert({ kind, title, body }) {
  const alertStyle = kind === "danger" ? styles.alertDanger : styles.alertWarn;
  return (
    <div style={alertStyle}>
      <div style={styles.alertTitle}>{title}</div>
      <div style={styles.alertBody}>{body}</div>
    </div>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "I have a headache and fever for 2 days",
  "I've been feeling tired and short of breath",
  "I have stomach pain and nausea since this morning",
];

function SuggestionButton({ text, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      style={{ ...styles.suggestionBtn, background: hover ? theme.gray50 : theme.white }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
}

function HeroSection({ onSuggestion }) {
  return (
    <div style={styles.heroSection}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={styles.iconBox}>
          <InfoIcon />
        </div>
      </div>
      <h1 style={styles.h1}>How can I help you today?</h1>
      <p style={styles.subtitle}>
        Describe your symptoms and I'll help identify what might be going on.
        I'll ask follow-up questions to better understand your situation.
      </p>
      <div style={styles.suggestions}>
        {SUGGESTIONS.map((s) => (
          <SuggestionButton key={s} text={s} onClick={onSuggestion} />
        ))}
      </div>
    </div>
  );
}

// ─── Composer ────────────────────────────────────────────────────────────────
function Composer({ value, onChange, onSubmit, disabled }) {
  const [focused, setFocused] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);

  const textareaStyle = {
    ...styles.textarea,
    ...(focused ? styles.textareaFocus : {}),
  };

  const sendBtnStyle = {
    ...styles.sendBtn,
    background: hoverBtn ? theme.gray100 : theme.white,
    opacity: !value.trim() || disabled ? 0.45 : 1,
    cursor: !value.trim() || disabled ? "not-allowed" : "pointer",
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div style={styles.composerBar}>
      <div style={styles.composerInner}>
        <textarea
          style={textareaStyle}
          placeholder="Describe your symptoms..."
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
        />
        <button
          style={sendBtnStyle}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
          onClick={onSubmit}
          disabled={!value.trim() || disabled}
          aria-label="Send"
        >
          <SendIcon />
        </button>
      </div>
      <p style={styles.disclaimer}>SeekFirst is not a substitute for professional medical advice.</p>
    </div>
  );
}

// ─── FollowUpBlock ────────────────────────────────────────────────────────────
function FollowUpBlock({ reasoning, questions, onSubmitAnswers, busy }) {
  const [answers, setAnswers] = useState("");
  const [focused, setFocused] = useState(false);
  const [flash, setFlash] = useState(false);

  const answersStyle = {
    ...styles.answersTextarea,
    marginTop: 8,
    ...(focused ? styles.textareaFocus : {}),
    ...(flash ? styles.textareaError : {}),
  };

  const submitBtnStyle = {
    ...styles.submitBtn,
    background: busy ? theme.gray400 : theme.emerald,
    cursor: busy ? "not-allowed" : "pointer",
  };

  const handleSubmit = () => {
    if (!answers.trim()) {
      setFlash(true);
      setTimeout(() => setFlash(false), 700);
      return;
    }
    onSubmitAnswers(answers);
  };

  return (
    <div>
      <div style={styles.sectionTitle}>A few follow-up questions</div>
      {reasoning && <div style={styles.reasoningText}>{reasoning}</div>}
      <ol style={styles.questionList}>
        {questions.map((q, i) => (
          <li key={i} style={styles.questionItem}>{q.text || q}</li>
        ))}
      </ol>
      <label style={styles.label}>
        Your answers
        <textarea
          style={answersStyle}
          rows={4}
          placeholder="Answer all questions above (one paragraph is fine)"
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={busy}
        />
      </label>
      <button style={submitBtnStyle} onClick={handleSubmit} disabled={busy}>
        {busy ? "Submitting…" : "Submit answers"}
      </button>
    </div>
  );
}

// ─── ResultBlock ──────────────────────────────────────────────────────────────
function ResultBlock({ result, onReset }) {
  const [reportBusy, setReportBusy] = useState(false);
  const [report, setReport] = useState(null);
  const [reportError, setReportError] = useState(null);
  const [hoverReport, setHoverReport] = useState(false);
  const [hoverReset, setHoverReset] = useState(false);

  const handleDoctorReport = async () => {
    setReportBusy(true);
    setReportError(null);
    const data = await postJSON("/api/doctors-report/", { result });  // uses API_BASE
    setReportBusy(false);
    if (data.error) {
      setReportError(data.message || "Could not generate report.");
      return;
    }
    setReport(data.doctors_report || "");
  };

  const reportBtnStyle = {
    ...styles.outlineBtn,
    background: hoverReport ? theme.gray50 : theme.white,
    opacity: reportBusy ? 0.5 : 1,
    cursor: reportBusy ? "not-allowed" : "pointer",
  };

  const resetBtnStyle = {
    ...styles.ghostBtn,
    background: hoverReset ? theme.gray50 : theme.white,
  };

  return (
    <div>
      <div style={styles.resultBox}>{result.simplified_message}</div>
      {result.seek_care_urgency && (
        <p style={styles.urgency}>Seek care: {result.seek_care_urgency}</p>
      )}
      {result.disclaimer && (
        <p style={styles.disclaimerResult}>{result.disclaimer}</p>
      )}
      {reportError && <p style={styles.errorText}>{reportError}</p>}
      {report && <div style={styles.doctorReport}>{report}</div>}
      <button
        style={reportBtnStyle}
        onMouseEnter={() => setHoverReport(true)}
        onMouseLeave={() => setHoverReport(false)}
        onClick={handleDoctorReport}
        disabled={reportBusy}
      >
        {reportBusy ? "Generating report…" : "Generate doctor's report"}
      </button>
      <button
        style={resetBtnStyle}
        onMouseEnter={() => setHoverReset(true)}
        onMouseLeave={() => setHoverReset(false)}
        onClick={onReset}
      >
        Start over
      </button>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────
// stage: null | "busy" | "followup" | "result" | "alert"
export default function SeekFirstAI() {
  const [symptoms, setSymptoms] = useState("");
  const [stage, setStage] = useState(null);
  const [alert, setAlert] = useState(null);   // { kind, title, body }
  const [pendingSession, setPendingSession] = useState(null);
  const [result, setResult] = useState(null);
  const [busyMsg, setBusyMsg] = useState("Working…");

  const isBusy = stage === "busy";
  const showPanel = stage !== null;

  const triggerAlert = (kind, title, body) => {
    setAlert({ kind, title, body });
    setStage("alert");
  };

  const handleSubmitSymptoms = async () => {
    const value = symptoms.trim();
    if (!value) return;

    setStage("busy");
    setBusyMsg("Analysing symptoms…");
    setPendingSession(null);
    setResult(null);
    setAlert(null);

    const data = await postJSON("/api/start/", { symptoms: value });

    if (data.emergency) { triggerAlert("danger", "Possible emergency", data.message || ""); return; }
    if (data.error) { triggerAlert("warn", "Something went wrong", data.message || "Try again."); return; }

    if (data.stage === "awaiting_answers") {
      setPendingSession({
        structured_symptoms: data.structured_symptoms || null,
        questions: data.questions || [],
        reasoning: data.reasoning || "",
      });
      setStage("followup");
      return;
    }

    triggerAlert("warn", "Unexpected response", "Please try again.");
  };

  const handleSubmitAnswers = async (answers) => {
    if (!pendingSession) return;

    setStage("busy");
    setBusyMsg("Reviewing your answers…");

    const data = await postJSON("/api/complete/", {
      structured_symptoms: pendingSession.structured_symptoms,
      questions: pendingSession.questions,
      answers: answers,
    });

    if (data.emergency) { triggerAlert("danger", "Possible emergency", data.message || ""); return; }
    if (data.error) { triggerAlert("warn", "Something went wrong", data.message || "Try again."); return; }

    if (data.stage === "complete") {
      setResult(data);
      setStage("result");
      return;
    }

    triggerAlert("warn", "Unexpected response", "Please try again.");
  };

  const handleReset = () => {
    setSymptoms("");
    setStage(null);
    setPendingSession(null);
    setResult(null);
    setAlert(null);
  };

  return (
    <div style={styles.page}>
      <style>{globalCSS}</style>

      {/* ── Header ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}><PersonIcon /></div>
            <span style={styles.logoText}>SeekFirst AI</span>
          </div>
          <span style={styles.badge}>Symptom checker</span>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={styles.main}>
        <div style={styles.card}>

          {/* Hero — visible only before any interaction */}
          {!showPanel && (
            <HeroSection onSuggestion={(text) => setSymptoms(text)} />
          )}

          {/* Composer — always visible */}
          <Composer
            value={symptoms}
            onChange={setSymptoms}
            onSubmit={handleSubmitSymptoms}
            disabled={isBusy}
          />

          {/* Dynamic panel */}
          {showPanel && (
            <div style={styles.panel} className="panel-enter">
              <div style={styles.panelInner}>

                {stage === "busy" && (
                  <div style={styles.statusLine}>
                    <SpinnerInline />
                    <span>{busyMsg}</span>
                  </div>
                )}

                {stage === "alert" && alert && (
                  <>
                    <Alert kind={alert.kind} title={alert.title} body={alert.body} />
                    <button
                      style={{ ...styles.ghostBtn, marginTop: 14 }}
                      onClick={handleReset}
                    >
                      Start over
                    </button>
                  </>
                )}

                {stage === "followup" && pendingSession && (
                  <FollowUpBlock
                    reasoning={pendingSession.reasoning}
                    questions={pendingSession.questions}
                    onSubmitAnswers={handleSubmitAnswers}
                    busy={isBusy}
                  />
                )}

                {stage === "result" && result && (
                  <ResultBlock result={result} onReset={handleReset} />
                )}

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
