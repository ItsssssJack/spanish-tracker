// 90-Day Spanish Learning Plan — Data from NotebookLM Notebooks
// Notebook 1: 🇪🇸 Spanish Foundations (Days 1-30)
// Notebook 2: 💼 Spanish for Business (Days 31-60)
// Notebook 3: 🗣️ Conversational Fluency (Days 61-90)

export const PHASES = [
    {
        id: 1,
        title: "Spanish Foundations",
        emoji: "🇪🇸",
        subtitle: "Grammar, Vocabulary & Pronunciation",
        days: "Days 1–30",
        dayRange: [1, 30],
        color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
        dailyMinutes: 30,
        notebookUrl: "https://notebooklm.google.com/notebook/53cbf94d-74ea-45c7-80b8-8c14676c524f",
        weeks: [
            {
                week: 1,
                title: "The Basics",
                topics: [
                    "Spanish alphabet & pronunciation rules",
                    "Greetings & introductions (Hola, ¿Cómo estás?, Me llamo...)",
                    "Numbers 1–100",
                    "Days of the week, months, seasons",
                    "Basic gender rules (el/la, un/una)",
                ],
            },
            {
                week: 2,
                title: "Essential Grammar",
                topics: [
                    "Present tense regular verbs (-ar, -er, -ir)",
                    "Ser vs. Estar (the two 'to be' verbs)",
                    "Common adjectives & agreement rules",
                    "Question words (¿Qué? ¿Dónde? ¿Cuándo? ¿Cómo? ¿Por qué?)",
                    "Negation (no + verb)",
                ],
            },
            {
                week: 3,
                title: "Building Vocabulary",
                topics: [
                    "Food & drink vocabulary",
                    "Family members",
                    "Colors, clothing, body parts",
                    "Common prepositions (en, de, con, para, por)",
                    "Possessive adjectives (mi, tu, su, nuestro)",
                ],
            },
            {
                week: 4,
                title: "Putting It Together",
                topics: [
                    "Telling time & talking about schedules",
                    "Ir + a + infinitive (future plans)",
                    "Gustar and similar verbs (likes/dislikes)",
                    "Basic conversation patterns",
                    "Review & self-assessment",
                ],
            },
        ],
        dailyRoutine: [
            { activity: "Vocabulary flashcards (new + review)", minutes: 10, icon: "📇" },
            { activity: "Grammar exercise or lesson", minutes: 10, icon: "📝" },
            { activity: "Pronunciation practice (shadowing)", minutes: 10, icon: "🎙️" },
        ],
        skills: ["Grammar", "Vocabulary", "Pronunciation", "Reading", "Listening"],
    },
    {
        id: 2,
        title: "Business & Clients",
        emoji: "💼",
        subtitle: "Professional Communication",
        days: "Days 31–60",
        dayRange: [31, 60],
        color: "#6366f1",
        gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        dailyMinutes: 30,
        notebookUrl: "https://notebooklm.google.com/notebook/6db3c478-e079-47a9-9b19-4c14f6c9819a",
        weeks: [
            {
                week: 5,
                title: "Professional Introductions",
                topics: [
                    "Formal vs. informal Spanish (tú vs. usted)",
                    "Introducing yourself and your business",
                    "Phone etiquette & email greetings",
                    "Scheduling meetings (citas, reuniones)",
                    "Key: 'Diseño páginas web para negocios locales'",
                ],
            },
            {
                week: 6,
                title: "Web Design Vocabulary",
                topics: [
                    "Website terminology (sitio web, página de inicio, dominio)",
                    "Design concepts (diseño responsivo, tipografía, logo)",
                    "Describing services (paquetes, precios, plazos)",
                    "Common client questions & answers",
                    "Key: 'Su sitio web estará listo en 10-14 días hábiles'",
                ],
            },
            {
                week: 7,
                title: "Sales Conversations",
                topics: [
                    "Pricing & packages (presupuesto, cotización, descuento)",
                    "Presenting proposals and options",
                    "The sales call in Spanish",
                    "Handling objections politely",
                    "Key: '¿Cuántos clientes nuevos quiere conseguir cada mes?'",
                ],
            },
            {
                week: 8,
                title: "Client Communication",
                topics: [
                    "Writing professional emails in Spanish",
                    "Project update vocabulary",
                    "Invoice & payment terms (factura, pago, depósito)",
                    "Monthly care plan pitch in Spanish",
                    "Key: 'Ofrecemos un plan mensual por $97 al mes'",
                ],
            },
        ],
        dailyRoutine: [
            { activity: "Business vocabulary & key phrases", minutes: 10, icon: "💼" },
            { activity: "Role-play client conversations", minutes: 10, icon: "🎭" },
            { activity: "Read/write professional emails", minutes: 10, icon: "✉️" },
        ],
        skills: ["Business Vocab", "Writing", "Speaking", "Listening", "Cultural Awareness"],
    },
    {
        id: 3,
        title: "Conversational Fluency",
        emoji: "🗣️",
        subtitle: "Real-World Immersion",
        days: "Days 61–90",
        dayRange: [61, 90],
        color: "#10b981",
        gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
        dailyMinutes: 45,
        notebookUrl: "https://notebooklm.google.com/notebook/ae6c8624-40b0-4803-b980-d2a3ad36b1be",
        weeks: [
            {
                week: 9,
                title: "Past Tense Mastery",
                topics: [
                    "Preterite tense (completed past actions)",
                    "Imperfect tense (ongoing past & descriptions)",
                    "Preterite vs. Imperfect usage",
                    "Storytelling in Spanish",
                    "Practice: Describe your career journey",
                ],
            },
            {
                week: 10,
                title: "Everyday Conversations",
                topics: [
                    "Ordering at restaurants & cafés",
                    "Giving and asking for directions",
                    "Shopping and negotiating",
                    "Small talk (weather, hobbies, sports)",
                    "Cultural norms & etiquette",
                ],
            },
            {
                week: 11,
                title: "Advanced Expression",
                topics: [
                    "Subjunctive mood basics",
                    "Conditional tense (would/could)",
                    "Connecting ideas with conjunctions",
                    "Idiomatic expressions & slang",
                    "Common proverbs (refranes)",
                ],
            },
            {
                week: 12,
                title: "Immersion & Confidence",
                topics: [
                    "Watch Spanish TV/movies without subtitles",
                    "Listen to Spanish business podcasts",
                    "Write a blog post about your services",
                    "15-min full Spanish conversation",
                    "Final 90-day progress review",
                ],
            },
        ],
        dailyRoutine: [
            { activity: "Listening comprehension", minutes: 15, icon: "🎧" },
            { activity: "Speaking practice & shadowing", minutes: 15, icon: "🗣️" },
            { activity: "Reading & writing practice", minutes: 15, icon: "📖" },
        ],
        skills: ["Speaking", "Listening", "Reading", "Writing", "Cultural Fluency"],
    },
];

// Generate mock daily progress data
export function generateMockData(currentDay = 18) {
    const days = [];
    for (let i = 1; i <= currentDay; i++) {
        const phase = i <= 30 ? 1 : i <= 60 ? 2 : 3;
        const baseMinutes = phase === 3 ? 45 : 30;
        const completed = Math.random() > 0.12; // ~88% completion rate
        const minutesStudied = completed
            ? Math.floor(baseMinutes + (Math.random() * 20 - 10))
            : Math.floor(Math.random() * 10);
        const vocabLearned = completed ? Math.floor(Math.random() * 12 + 5) : 0;

        const skills = {};
        const phaseData = PHASES[phase - 1];
        phaseData.skills.forEach((skill) => {
            skills[skill] = completed ? Math.floor(Math.random() * 30 + 50) : 0;
        });

        days.push({
            day: i,
            date: getDateForDay(i),
            phase,
            completed,
            minutesStudied,
            vocabLearned,
            skills,
            streak: 0, // calculated below
        });
    }

    // Calculate streaks
    let currentStreak = 0;
    for (let i = 0; i < days.length; i++) {
        if (days[i].completed) {
            currentStreak++;
        } else {
            currentStreak = 0;
        }
        days[i].streak = currentStreak;
    }

    return days;
}

export function getDateForDay(dayNumber) {
    const startDate = new Date("2026-02-25");
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayNumber - 1);
    return date.toISOString().split("T")[0];
}

export function getCurrentPhase(day) {
    if (day <= 30) return PHASES[0];
    if (day <= 60) return PHASES[1];
    return PHASES[2];
}

export function getWeekNumber(day) {
    return Math.ceil(day / 7);
}

export const DUMMY_CREDENTIALS = {
    email: "sam@sammitchelldesign.com",
    password: "hola2026",
};

export const MOTIVATIONAL_QUOTES = [
    { text: "El que no arriesga, no gana.", translation: "Nothing ventured, nothing gained." },
    { text: "Poco a poco se va lejos.", translation: "Little by little, one goes far." },
    { text: "La práctica hace al maestro.", translation: "Practice makes perfect." },
    { text: "Más vale tarde que nunca.", translation: "Better late than never." },
    { text: "Querer es poder.", translation: "Where there's a will, there's a way." },
    { text: "Cada día se aprende algo nuevo.", translation: "Every day you learn something new." },
    { text: "No hay mal que por bien no venga.", translation: "Every cloud has a silver lining." },
    { text: "El saber no ocupa lugar.", translation: "Knowledge takes up no space." },
];
