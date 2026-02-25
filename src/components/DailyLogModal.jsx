import { useState } from "react";
import { getDateForDay } from "../data/learningPlan";

export default function DailyLogModal({ currentDay, currentPhase, onSave, onClose }) {
    const [minutes, setMinutes] = useState(currentPhase.dailyMinutes);
    const [vocabCount, setVocabCount] = useState(8);
    const [activeSkills, setActiveSkills] = useState(
        currentPhase.skills.reduce((acc, skill) => ({ ...acc, [skill]: false }), {})
    );
    const [notes, setNotes] = useState("");

    const toggleSkill = (skill) => {
        setActiveSkills((prev) => ({ ...prev, [skill]: !prev[skill] }));
    };

    const handleSave = () => {
        const skills = {};
        currentPhase.skills.forEach((skill) => {
            skills[skill] = activeSkills[skill]
                ? Math.floor(Math.random() * 25 + 55)
                : Math.floor(Math.random() * 15 + 10);
        });

        const entry = {
            day: currentDay,
            date: getDateForDay(currentDay),
            phase: currentPhase.id,
            completed: minutes >= 10,
            minutesStudied: minutes,
            vocabLearned: vocabCount,
            skills,
            notes,
            streak: 0,
        };
        onSave(entry);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>📝 Log Day {currentDay}</h2>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="log-form">
                    {/* Minutes Studied */}
                    <div className="log-slider-group">
                        <label>Minutes Studied</label>
                        <div className="slider-value">{minutes} min</div>
                        <input
                            type="range"
                            min="0"
                            max="90"
                            value={minutes}
                            onChange={(e) => setMinutes(Number(e.target.value))}
                        />
                    </div>

                    {/* Vocab Learned */}
                    <div className="log-slider-group">
                        <label>New Words Learned</label>
                        <div className="slider-value">{vocabCount} words</div>
                        <input
                            type="range"
                            min="0"
                            max="30"
                            value={vocabCount}
                            onChange={(e) => setVocabCount(Number(e.target.value))}
                        />
                    </div>

                    {/* Skills Practiced */}
                    <div>
                        <label style={{
                            fontSize: "0.82rem",
                            fontWeight: 500,
                            color: "var(--text-secondary)",
                            display: "block",
                            marginBottom: "8px",
                        }}>
                            Skills Practiced
                        </label>
                        <div className="log-skills">
                            {currentPhase.skills.map((skill) => (
                                <div
                                    key={skill}
                                    className={`skill-toggle ${activeSkills[skill] ? "active" : ""}`}
                                    onClick={() => toggleSkill(skill)}
                                >
                                    <span>{activeSkills[skill] ? "✓" : "○"}</span>
                                    <span>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="form-group">
                        <label>Session Notes (optional)</label>
                        <input
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="What did you focus on today?"
                        />
                    </div>

                    <button className="submit-log-btn" onClick={handleSave}>
                        Save Progress ✓
                    </button>
                </div>
            </div>
        </div>
    );
}
