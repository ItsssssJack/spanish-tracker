import { useState, useMemo } from "react";
import {
    AreaChart, Area, BarChart, Bar, RadarChart, Radar,
    PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
    PHASES, getCurrentPhase, getWeekNumber, MOTIVATIONAL_QUOTES,
} from "../data/learningPlan";
import DailyLogModal from "./DailyLogModal";
import HabitTracker from "./HabitTracker";

export default function Dashboard({ dailyData, onLogDay, onRemoveDay, onLogout }) {
    const [showLogModal, setShowLogModal] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState(null);

    const currentDay = dailyData.length;
    const currentPhase = getCurrentPhase(currentDay);
    const currentWeek = getWeekNumber(currentDay);

    const stats = useMemo(() => {
        const completedDays = dailyData.filter((d) => d.completed).length;
        const totalMinutes = dailyData.reduce((s, d) => s + d.minutesStudied, 0);
        const totalVocab = dailyData.reduce((s, d) => s + d.vocabLearned, 0);
        const currentStreak = dailyData.length > 0
            ? dailyData[dailyData.length - 1].streak
            : 0;
        const longestStreak = Math.max(...dailyData.map((d) => d.streak), 0);
        return { completedDays, totalMinutes, totalVocab, currentStreak, longestStreak };
    }, [dailyData]);

    const chartData = useMemo(() => {
        return dailyData.map((d) => ({
            name: `Day ${d.day}`,
            day: d.day,
            minutes: d.minutesStudied,
            vocab: d.vocabLearned,
        }));
    }, [dailyData]);

    const skillsData = useMemo(() => {
        const phaseData = selectedPhase || currentPhase;
        return phaseData.skills.map((skill) => {
            const relevantDays = dailyData.filter(
                (d) => d.phase === phaseData.id && d.skills && d.skills[skill]
            );
            const avg = relevantDays.length
                ? Math.round(
                    relevantDays.reduce((s, d) => s + (d.skills[skill] || 0), 0) /
                    relevantDays.length
                )
                : 0;
            return { skill, value: avg, fullMark: 100 };
        });
    }, [dailyData, currentPhase, selectedPhase]);

    const phaseProgress = (phase) => {
        const phaseDays = dailyData.filter((d) => d.phase === phase.id);
        const completed = phaseDays.filter((d) => d.completed).length;
        const total = phase.dayRange[1] - phase.dayRange[0] + 1;
        return { completed, total, percent: Math.round((completed / total) * 100) };
    };

    const quote = MOTIVATIONAL_QUOTES[currentDay % MOTIVATIONAL_QUOTES.length];

    const getCalendarLevel = (day) => {
        const d = dailyData.find((x) => x.day === day.day);
        if (!d) return "empty";
        if (!d.completed) return "level-0";
        if (d.minutesStudied < 15) return "level-1";
        if (d.minutesStudied < 30) return "level-2";
        if (d.minutesStudied < 45) return "level-3";
        return "level-4";
    };

    const calendarDays = Array.from({ length: 90 }, (_, i) => ({
        day: i + 1,
        filled: i < currentDay,
    }));

    const activePhaseForTopics = selectedPhase || currentPhase;
    const activeWeekData = activePhaseForTopics.weeks.find(
        (w) => w.week === (selectedPhase ? selectedPhase.weeks[0].week : currentWeek)
    ) || activePhaseForTopics.weeks[0];

    return (
        <div className="dashboard">
            <div className="dashboard-bg-pattern" />

            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-left">
                    <span className="nav-logo">🎯 SpanishTracker</span>
                    <span className="nav-divider" />
                    <span
                        className="nav-phase-badge"
                        style={{
                            background: `${currentPhase.color}15`,
                            color: currentPhase.color,
                        }}
                    >
                        {currentPhase.emoji} {currentPhase.title}
                    </span>
                </div>
                <div className="nav-right">
                    <span className="nav-streak">🔥 {stats.currentStreak} day streak</span>
                    <div className="nav-user">
                        <div className="nav-avatar">SM</div>
                        <span className="nav-username">Sam Mitchell</span>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>
                        Sign Out
                    </button>
                </div>
            </nav>

            <div className="dashboard-content">
                {/* ========== HABIT TRACKER — AT THE TOP ========== */}
                <HabitTracker
                    currentDay={currentDay}
                    currentPhase={currentPhase}
                    currentWeek={currentWeek}
                />

                {/* Quote Banner */}
                <div className="quote-banner">
                    <p className="quote-text">"{quote.text}"</p>
                    <p className="quote-translation">{quote.translation}</p>
                </div>

                {/* Hero Stats */}
                <div className="hero-stats">
                    <div className="hero-stat-card">
                        <div className="hero-stat-label">Current Day</div>
                        <div className="hero-stat-value" style={{ color: "var(--accent-warning)" }}>
                            {currentDay}
                            <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>/90</span>
                        </div>
                        <div className="hero-stat-sub">
                            {90 - currentDay} days remaining
                        </div>
                    </div>
                    <div className="hero-stat-card">
                        <div className="hero-stat-label">Completion Rate</div>
                        <div className="hero-stat-value" style={{ color: "var(--accent-secondary)" }}>
                            {currentDay > 0
                                ? Math.round((stats.completedDays / currentDay) * 100)
                                : 0}
                            <span style={{ fontSize: "1rem" }}>%</span>
                        </div>
                        <div className="hero-stat-sub">
                            {stats.completedDays} of {currentDay} days completed
                        </div>
                    </div>
                    <div className="hero-stat-card">
                        <div className="hero-stat-label">Total Study Time</div>
                        <div className="hero-stat-value" style={{ color: "var(--accent-success)" }}>
                            {Math.floor(stats.totalMinutes / 60)}
                            <span style={{ fontSize: "1rem" }}>h</span>{" "}
                            {stats.totalMinutes % 60}
                            <span style={{ fontSize: "1rem" }}>m</span>
                        </div>
                        <div className="hero-stat-sub">
                            Avg {currentDay > 0 ? Math.round(stats.totalMinutes / currentDay) : 0} min/day
                        </div>
                    </div>
                    <div className="hero-stat-card">
                        <div className="hero-stat-label">Vocab Learned</div>
                        <div className="hero-stat-value" style={{ color: "var(--accent-primary)" }}>
                            {stats.totalVocab}
                        </div>
                        <div className="hero-stat-sub">
                            ~{currentDay > 0 ? Math.round(stats.totalVocab / currentDay) : 0} words/day
                        </div>
                    </div>
                </div>
                <div className="section-header">
                    <h2>Learning Phases</h2>
                    <p>Click a phase to explore its curriculum and track progress</p>
                </div>
                <div className="dashboard-grid-3">
                    {PHASES.map((phase) => {
                        const prog = phaseProgress(phase);
                        const isActive = currentDay >= phase.dayRange[0] && currentDay <= phase.dayRange[1];
                        const isSelected = selectedPhase?.id === phase.id;
                        return (
                            <div
                                key={phase.id}
                                className={`phase-card ${isActive ? "active" : ""}`}
                                style={{ "--phase-color": phase.color }}
                                onClick={() =>
                                    setSelectedPhase(isSelected ? null : phase)
                                }
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "3px",
                                        background: phase.gradient,
                                        borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
                                    }}
                                />
                                <div className="phase-card-header">
                                    <span className="phase-emoji">{phase.emoji}</span>
                                    <div className="phase-card-info">
                                        <h3>{phase.title}</h3>
                                        <span className="days-label">{phase.days}</span>
                                    </div>
                                </div>
                                <div className="phase-progress-bar">
                                    <div
                                        className="phase-progress-fill"
                                        style={{
                                            width: `${prog.percent}%`,
                                            background: phase.gradient,
                                        }}
                                    />
                                </div>
                                <div className="phase-progress-label">
                                    <span>{prog.percent}% complete</span>
                                    <span>
                                        {prog.completed}/{prog.total} days
                                    </span>
                                </div>
                                <a
                                    href={phase.notebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="phase-notebook-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    📓 Open in NotebookLM →
                                </a>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Grid */}
                <div className="dashboard-grid">
                    {/* Study Time Chart */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">📊 Daily Study Time</h3>
                                <span className="card-subtitle">Minutes studied per day</span>
                            </div>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="gradStudy" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#55556a" }} />
                                    <YAxis tick={{ fontSize: 11, fill: "#55556a" }} />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#111118",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "12px",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                                        }}
                                        labelStyle={{ color: "#f0f0f5", fontWeight: 600 }}
                                        itemStyle={{ color: "#8a8a9a" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="minutes"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        fill="url(#gradStudy)"
                                        name="Minutes"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Skills Radar */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">🎯 Skills Breakdown</h3>
                                <span className="card-subtitle">
                                    {activePhaseForTopics.emoji} {activePhaseForTopics.title}
                                </span>
                            </div>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={skillsData} outerRadius="70%">
                                    <PolarGrid stroke="rgba(255,255,255,0.06)" />
                                    <PolarAngleAxis
                                        dataKey="skill"
                                        tick={{ fontSize: 11, fill: "#8a8a9a" }}
                                    />
                                    <PolarRadiusAxis
                                        tick={{ fontSize: 9, fill: "#55556a" }}
                                        domain={[0, 100]}
                                    />
                                    <Radar
                                        name="Proficiency"
                                        dataKey="value"
                                        stroke={activePhaseForTopics.color}
                                        fill={activePhaseForTopics.color}
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Vocab Chart + Activity Calendar */}
                <div className="dashboard-grid">
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">📚 Vocabulary Progress</h3>
                                <span className="card-subtitle">Words learned per day</span>
                            </div>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#55556a" }} />
                                    <YAxis tick={{ fontSize: 11, fill: "#55556a" }} />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#111118",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "12px",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                                        }}
                                        labelStyle={{ color: "#f0f0f5", fontWeight: 600 }}
                                        itemStyle={{ color: "#8a8a9a" }}
                                    />
                                    <Bar dataKey="vocab" name="Words" radius={[4, 4, 0, 0]} fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Activity Heatmap */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">🗓️ 90-Day Activity</h3>
                                <span className="card-subtitle">Your consistency heatmap</span>
                            </div>
                        </div>
                        <div className="activity-calendar">
                            {calendarDays.map((cd) => (
                                <div
                                    key={cd.day}
                                    className={`calendar-cell ${getCalendarLevel(cd)}`}
                                    title={`Day ${cd.day}${cd.filled ? "" : " (upcoming)"}`}
                                    onClick={() => {
                                        if (cd.filled) {
                                            if (window.confirm(`Are you sure you want to remove the log for Day ${cd.day}?`)) {
                                                onRemoveDay(cd.day);
                                            }
                                        } else if (cd.day === currentDay + 1) {
                                            setShowLogModal(true);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <div className="calendar-legend">
                            <span>Less</span>
                            <div className="legend-cell" style={{ background: "rgba(255,255,255,0.03)" }} />
                            <div className="legend-cell" style={{ background: "rgba(99,102,241,0.2)" }} />
                            <div className="legend-cell" style={{ background: "rgba(99,102,241,0.4)" }} />
                            <div className="legend-cell" style={{ background: "rgba(99,102,241,0.6)" }} />
                            <div className="legend-cell" style={{ background: "rgba(99,102,241,0.85)" }} />
                            <span>More</span>
                        </div>
                    </div>
                </div>

                {/* Current Week & Routine */}
                <div className="dashboard-grid">
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">
                                    📖 Week {activeWeekData.week}: {activeWeekData.title}
                                </h3>
                                <span className="card-subtitle">
                                    {activePhaseForTopics.emoji} {activePhaseForTopics.title} — This week's topics
                                </span>
                            </div>
                        </div>
                        <div className="weekly-topics">
                            {activeWeekData.topics.map((topic, i) => (
                                <div className="topic-item" key={i}>
                                    <div className={`topic-check ${i < 3 && !selectedPhase ? "checked" : ""}`} />
                                    <span>{topic}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">⏰ Daily Routine</h3>
                                <span className="card-subtitle">
                                    {activePhaseForTopics.dailyMinutes} min/day recommended
                                </span>
                            </div>
                        </div>
                        <div className="routine-items">
                            {activePhaseForTopics.dailyRoutine.map((item, i) => (
                                <div className="routine-item" key={i}>
                                    <div className="routine-icon">{item.icon}</div>
                                    <div className="routine-info">
                                        <h4>{item.activity}</h4>
                                        <span>{item.minutes} minutes</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Log Button */}
            <button className="log-today-btn" onClick={() => setShowLogModal(true)}>
                ✏️ Log Today's Progress
            </button>

            {/* Log Modal */}
            {showLogModal && (
                <DailyLogModal
                    currentDay={currentDay + 1}
                    currentPhase={currentPhase}
                    onSave={(entry) => {
                        onLogDay(entry);
                        setShowLogModal(false);
                    }}
                    onClose={() => setShowLogModal(false)}
                />
            )}
        </div>
    );
}
