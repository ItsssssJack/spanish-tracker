import { useState, useEffect } from "react";

// Default daily habits for the Spanish learning journey
const DEFAULT_HABITS = [
    { id: "flashcards", label: "Vocabulary flashcards (new + review)", icon: "📇", category: "core" },
    { id: "grammar", label: "Grammar exercise or lesson", icon: "📝", category: "core" },
    { id: "pronunciation", label: "Pronunciation / shadowing practice", icon: "🎙️", category: "core" },
    { id: "listening", label: "Listening comprehension (podcast/video)", icon: "🎧", category: "immersion" },
    { id: "speaking", label: "Speaking practice (record or partner)", icon: "🗣️", category: "immersion" },
    { id: "reading", label: "Read something in Spanish", icon: "📖", category: "immersion" },
    { id: "writing", label: "Write in Spanish (journal, email, etc.)", icon: "✍️", category: "practice" },
    { id: "review", label: "Review yesterday's material", icon: "🔄", category: "practice" },
];

function getStorageKey(day) {
    return `habits_day_${day}`;
}

export default function HabitTracker({ currentDay, currentPhase, currentWeek }) {
    const [checkedHabits, setCheckedHabits] = useState(() => {
        const saved = localStorage.getItem(getStorageKey(currentDay));
        return saved ? JSON.parse(saved) : {};
    });

    const [customHabits, setCustomHabits] = useState(() => {
        const saved = localStorage.getItem("custom_habits");
        return saved ? JSON.parse(saved) : [];
    });

    const [newHabitText, setNewHabitText] = useState("");
    const [showAddHabit, setShowAddHabit] = useState(false);

    // Persist checked habits
    useEffect(() => {
        localStorage.setItem(getStorageKey(currentDay), JSON.stringify(checkedHabits));
    }, [checkedHabits, currentDay]);

    // Persist custom habits
    useEffect(() => {
        localStorage.setItem("custom_habits", JSON.stringify(customHabits));
    }, [customHabits]);

    const allHabits = [...DEFAULT_HABITS, ...customHabits];
    const completedCount = Object.values(checkedHabits).filter(Boolean).length;
    const totalCount = allHabits.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const toggleHabit = (habitId) => {
        setCheckedHabits((prev) => ({
            ...prev,
            [habitId]: !prev[habitId],
        }));
    };

    const addCustomHabit = () => {
        if (!newHabitText.trim()) return;
        const id = `custom_${Date.now()}`;
        setCustomHabits((prev) => [
            ...prev,
            { id, label: newHabitText.trim(), icon: "⭐", category: "custom" },
        ]);
        setNewHabitText("");
        setShowAddHabit(false);
    };

    const removeCustomHabit = (habitId) => {
        setCustomHabits((prev) => prev.filter((h) => h.id !== habitId));
        setCheckedHabits((prev) => {
            const next = { ...prev };
            delete next[habitId];
            return next;
        });
    };

    const categories = [
        { key: "core", label: "Core Study", color: "var(--accent-warning)" },
        { key: "immersion", label: "Immersion", color: "var(--accent-secondary)" },
        { key: "practice", label: "Practice", color: "var(--accent-success)" },
        { key: "custom", label: "Your Habits", color: "var(--accent-primary)" },
    ];

    return (
        <div className="habit-tracker">
            {/* Header */}
            <div className="habit-tracker-header">
                <div className="habit-header-left">
                    <h2 className="habit-title">
                        ✅ Today's Habits
                        <span className="habit-day-badge">Day {currentDay}</span>
                    </h2>
                    <p className="habit-subtitle">
                        {currentPhase.emoji} {currentPhase.title} · Week {currentWeek}
                    </p>
                </div>
                <div className="habit-header-right">
                    <div className="habit-progress-ring">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path
                                className="circle-bg"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="circle-fg"
                                strokeDasharray={`${progressPercent}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                style={{ stroke: progressPercent === 100 ? "var(--accent-success)" : "var(--accent-secondary)" }}
                            />
                        </svg>
                        <span className="ring-text">{progressPercent}%</span>
                    </div>
                    <div className="habit-score">
                        <span className="score-num">{completedCount}/{totalCount}</span>
                        <span className="score-label">completed</span>
                    </div>
                </div>
            </div>

            {/* Habit Grid */}
            <div className="habit-categories">
                {categories
                    .filter((cat) => allHabits.some((h) => h.category === cat.key))
                    .map((cat) => (
                        <div className="habit-category" key={cat.key}>
                            <div className="category-label" style={{ color: cat.color }}>
                                {cat.label}
                            </div>
                            <div className="habit-list">
                                {allHabits
                                    .filter((h) => h.category === cat.key)
                                    .map((habit) => {
                                        const isChecked = !!checkedHabits[habit.id];
                                        const isCustom = habit.category === "custom";
                                        return (
                                            <div
                                                key={habit.id}
                                                className={`habit-item ${isChecked ? "completed" : ""}`}
                                                onClick={() => toggleHabit(habit.id)}
                                            >
                                                <div className={`habit-checkbox ${isChecked ? "checked" : ""}`}>
                                                    {isChecked && (
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="habit-icon">{habit.icon}</span>
                                                <span className={`habit-label ${isChecked ? "struck" : ""}`}>
                                                    {habit.label}
                                                </span>
                                                {isCustom && (
                                                    <button
                                                        className="habit-remove"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeCustomHabit(habit.id);
                                                        }}
                                                        title="Remove habit"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
            </div>

            {/* Add Custom Habit */}
            <div className="habit-add-section">
                {showAddHabit ? (
                    <div className="habit-add-form">
                        <input
                            type="text"
                            value={newHabitText}
                            onChange={(e) => setNewHabitText(e.target.value)}
                            placeholder="E.g., Practice with Duolingo for 10 min"
                            className="habit-add-input"
                            onKeyDown={(e) => e.key === "Enter" && addCustomHabit()}
                            autoFocus
                        />
                        <button className="habit-add-confirm" onClick={addCustomHabit}>Add</button>
                        <button className="habit-add-cancel" onClick={() => { setShowAddHabit(false); setNewHabitText(""); }}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button className="habit-add-btn" onClick={() => setShowAddHabit(true)}>
                        + Add Custom Habit
                    </button>
                )}
            </div>

            {/* Completion celebration */}
            {progressPercent === 100 && (
                <div className="habit-celebration">
                    🎉 <strong>¡Increíble!</strong> You've completed all habits for Day {currentDay}!
                </div>
            )}
        </div>
    );
}
