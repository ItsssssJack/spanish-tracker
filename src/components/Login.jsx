import { useState, useEffect } from "react";
import { PHASES } from "../data/learningPlan";

export default function Login({ onLogin, transitioning }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 100);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        setTimeout(() => {
            const success = onLogin(email, password);
            if (!success) {
                setError("Invalid credentials. Check the hint below! 👇");
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className={`login-page ${transitioning ? "transitioning" : ""} ${mounted ? "mounted" : ""}`}>
            {/* Animated background */}
            <div className="login-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="grid-overlay" />
            </div>

            {/* Center Container */}
            <div className="login-center" style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "100vh" }}>
                {/* Top Section — Branding */}
                <div className="login-brand" style={{ animationDelay: "0.1s" }}>
                    <h1 className="brand-title" style={{ fontSize: "2.5rem", letterSpacing: "-0.04em", color: "#fff", background: "none", WebkitTextFillColor: "#fff" }}>Welcome Back.</h1>
                    <p className="brand-tagline" style={{ fontSize: "1.1rem", opacity: 0.7 }}>Sign in to continue your language journey</p>
                </div>

                {/* Right — Login Card (Now Centered) */}
                <div className="login-card" style={{ animationDelay: "0.2s" }}>
                    <div className="login-card-glow" />
                    <div className="login-card-inner">

                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">✉️</span>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="sam@sammitchelldesign.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🔒</span>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>

                            {error && <div className="login-error">{error}</div>}

                            <button
                                type="submit"
                                className={`login-btn ${loading ? "loading" : ""}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="btn-loading">
                                        <span className="spinner" />
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In →"
                                )}
                            </button>
                        </form>

                        <div className="login-divider">
                            <span>Demo Access</span>
                        </div>

                        <div className="login-hint">
                            <div className="hint-row">
                                <span className="hint-label">Email</span>
                                <code>sam@sammitchelldesign.com</code>
                            </div>
                            <div className="hint-row">
                                <span className="hint-label">Password</span>
                                <code>hola2026</code>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom — Powered by */}
                <div className="login-footer" style={{ animationDelay: "0.4s", marginTop: "var(--space-2xl)", textAlign: "center" }}>
                    <span>Powered by</span>
                    <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer">
                        📓 NotebookLM
                    </a>
                    <span>·</span>
                    <span>Built with ❤️ for language learners</span>
                </div>
            </div>
        </div>
    );
}
