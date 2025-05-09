// DOM Elements
const elements = {
    arabicWord: document.getElementById('arabic-word'),
    questionText: document.getElementById('question-text'),
    englishPrompt: document.getElementById('english-prompt'),
    answerOptions: document.getElementById('answer-options'),
    hintBtn: document.getElementById('hint-btn'),
    skipBtn: document.getElementById('skip-btn'),
    feedbackModal: document.getElementById('feedback-modal'),
    feedbackContent: document.getElementById('feedback-content'),
    closeModal: document.getElementById('close-modal'),
    modalOverlay: document.querySelector('.modal-overlay'),
    nextExerciseBtn: null,
    pronounceBtn: document.getElementById('pronounce-btn'),
    languageButtons: document.querySelectorAll('.lang-btn'),
    streakCounter: document.getElementById('streak-count'),
    xpCounter: document.getElementById('xp-count'),
    accuracyCount: document.getElementById('accuracy-count'),
    levelDisplay: document.getElementById('level-display'),
    levelProgress: document.getElementById('level-progress'),
    exerciseSection: document.getElementById('exercise-section'),
    navButtons: {
        practice: document.getElementById('practice-btn'),
        progress: document.getElementById('progress-btn'),
        rewards: document.getElementById('rewards-btn')
    },
    questionCountSelect: document.getElementById('question-count'),
    levelSelect: document.getElementById('level-select'),
    startBtn: document.getElementById('start-btn'),
    questionCounter: document.getElementById('question-counter')
};

// Verify all required elements exist
for (const [key, element] of Object.entries(elements)) {
    if (!element && key !== 'nextExerciseBtn') {
        console.error(`Missing required element: ${key}`);
    }
}

// App State
const state = {
    currentLanguage: 'ar',
    currentLevel: 1,
    currentXP: 0,
    currentStreak: 0,
    currentExercise: null,
    verbs: { verbs: [] },
    nouns: { nouns: [] },
    translations: {
        ui: {
            level: { ar: "المستوى", en: "Level", ur: "لیول" },
            practice: { ar: "تمارين", en: "Practice", ur: "پریکٹس" },
            progress: { ar: "تقدمي", en: "Progress", ur: "پروگریس" },
            rewards: { ar: "جوائز", en: "Rewards", ur: "انعامات" },
            hint: { ar: "تلميح", en: "Hint", ur: "اشارہ" },
            start: { ar: "ابدأ", en: "Start", ur: "شروع کریں" },
            nextQuestion: { ar: "السؤال التالي", en: "Next Question", ur: "اگلا سوال" },
            finish: { ar: "إنهاء", en: "Finish", ur: "ختم کریں" }
        }
    },
    userData: {
        weakAreas: [],
        masteredConjugations: []
    },
    questionsPerExercise: 10,
    currentQuestionIndex: 0,
    exerciseQuestions: [],
    correctAnswers: 0,
    hintsUsed: 0,
    sessionStartXP: 0
};

// Initialize the app
function init() {
    // Set default language
    setLanguage('ar');
    
    // Setup event listeners
    setupEventListeners();
    
    // Update UI
    updateUI();
}

function setLanguage(lang) {
    state.currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update active language button
    elements.languageButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update UI elements
    updateUI();
}

function setupEventListeners() {
    // Language switcher
    elements.languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });
    
    // Start button
    elements.startBtn.addEventListener('click', startNewExerciseSession);
    
    // Other event listeners
    elements.pronounceBtn.addEventListener('click', () => {
        if (state.currentExercise?.word) {
            speakWord(state.currentExercise.word);
        }
    });
    
    elements.hintBtn.addEventListener('click', showHint);
    elements.skipBtn.addEventListener('click', skipQuestion);
    elements.closeModal.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', closeModal);
}

function startNewExerciseSession() {
    console.log("Start button clicked");
    
    state.questionsPerExercise = parseInt(elements.questionCountSelect.value) || 10;
    state.currentLevel = parseInt(elements.levelSelect.value) || 1;
    state.currentQuestionIndex = 0;
    state.correctAnswers = 0;
    state.hintsUsed = 0;
    state.sessionStartXP = state.currentXP;
    
    // Generate simple test questions since we don't have data loaded
    state.exerciseQuestions = generateTestQuestions();
    
    elements.exerciseSection.style.display = 'block';
    renderNextQuestion();
}

function generateTestQuestions() {
    // Simple test questions since we don't have data loaded
    return [
        {
            type: 'verb',
            word: 'كتب',
            translation: { en: "write", ar: "كتب", ur: "لکھنا" },
            correctAnswer: 'يكتب',
            options: [
                { text: 'يكتب', correct: true },
                { text: 'تكتب', correct: false },
                { text: 'نكتب', correct: false }
            ],
            question: {
                en: "What is the present tense of 'write'?",
                ar: "ما هو المضارع من 'كتب'؟",
                ur: "'لکھنا' کا حال کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'يكتب' because it's the present tense form",
                ar: "الجواب الصحيح هو 'يكتب' لأنه صيغة المضارع",
                ur: "صح جواب 'يكتب' ہے کیونکہ یہ حال کی شکل ہے"
            }
        },
        {
            type: 'noun',
            word: 'كتاب',
            translation: { en: "book", ar: "كتاب", ur: "کتاب" },
            correctAnswer: 'كتابٌ',
            options: [
                { text: 'كتابٌ', correct: true },
                { text: 'كتابًا', correct: false },
                { text: 'كتابٍ', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'book'?",
                ar: "ما هو الرفع من 'كتاب'؟",
                ur: "'کتاب' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'كتابٌ' because it's the nominative form",
                ar: "الجواب الصحيح هو 'كتابٌ' لأنه صيغة الرفع",
                ur: "صح جواب 'كتابٌ' ہے کیونکہ یہ رفع کی شکل ہے"
            }
        }
    ];
}

function renderNextQuestion() {
    if (state.currentQuestionIndex >= state.exerciseQuestions.length) {
        showSessionSummary();
        return;
    }
    
    state.currentExercise = state.exerciseQuestions[state.currentQuestionIndex];
    renderExercise();
    updateQuestionCounter();
}

function renderExercise() {
    const { word, question, options } = state.currentExercise;
    
    elements.arabicWord.textContent = word;
    elements.questionText.textContent = question[state.currentLanguage];
    elements.englishPrompt.textContent = question.en;
    
    // Clear previous options
    elements.answerOptions.innerHTML = '';
    
    // Add new options
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = option.text;
        button.dataset.correct = option.correct;
        button.addEventListener('click', handleAnswerSelection);
        elements.answerOptions.appendChild(button);
    });
}

function handleAnswerSelection(e) {
    const selectedOption = e.target;
    const isCorrect = selectedOption.dataset.correct === 'true';
    
    // Visual feedback
    selectedOption.classList.add(isCorrect ? 'correct' : 'incorrect');
    Array.from(elements.answerOptions.children).forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') btn.classList.add('correct');
    });
    
    // Update state
    if (isCorrect) {
        state.currentStreak++;
        state.correctAnswers++;
        state.currentXP += 10;
        if (state.currentStreak % 5 === 0) state.currentXP += 10;
    } else {
        state.currentStreak = 0;
    }
    
    showFeedback(isCorrect);
    updateUI();
}

function showFeedback(isCorrect) {
    const { explanation } = state.currentExercise;
    const isLastQuestion = state.currentQuestionIndex + 1 >= state.exerciseQuestions.length;
    
    elements.feedbackContent.innerHTML = `
        <h3>${isCorrect ? '✓ Correct' : '✗ Incorrect'}</h3>
        <p>${explanation[state.currentLanguage]}</p>
        <button class="next-exercise" id="next-exercise-btn">
            ${isLastQuestion 
                ? state.translations.ui.finish[state.currentLanguage]
                : state.translations.ui.nextQuestion[state.currentLanguage]}
        </button>
    `;
    
    elements.nextExerciseBtn = document.getElementById('next-exercise-btn');
    elements.nextExerciseBtn.addEventListener('click', () => {
        closeModal();
        state.currentQuestionIndex++;
        renderNextQuestion();
    });
    
    elements.feedbackModal.classList.remove('hidden');
}

function closeModal() {
    elements.feedbackModal.classList.add('hidden');
}

function skipQuestion() {
    closeModal();
    state.currentQuestionIndex++;
    renderNextQuestion();
}

function showHint() {
    if (!state.currentExercise) return;

    if (state.hintsUsed >= 3) {
        alert("You've used the maximum hints for this exercise");
        return;
    }

    state.hintsUsed++;
    state.currentXP = Math.max(0, state.currentXP - 5);
    
    alert(`Hint: The word is ${state.currentExercise.word}`);
    updateUI();
}

function updateUI() {
    elements.streakCounter.textContent = state.currentStreak;
    elements.xpCounter.textContent = state.currentXP;
    
    if (state.currentQuestionIndex > 0) {
        elements.accuracyCount.textContent = 
            `${Math.round((state.correctAnswers / state.currentQuestionIndex) * 100)}%`;
    } else {
        elements.accuracyCount.textContent = '0%';
    }
    
    // Update button texts
    elements.hintBtn.textContent = state.translations.ui.hint[state.currentLanguage];
    elements.startBtn.textContent = state.translations.ui.start[state.currentLanguage];
}

function updateQuestionCounter() {
    const translations = {
        ar: `السؤال ${state.currentQuestionIndex + 1} من ${state.questionsPerExercise}`,
        en: `Question ${state.currentQuestionIndex + 1} of ${state.questionsPerExercise}`,
        ur: `سوال ${state.currentQuestionIndex + 1} میں سے ${state.questionsPerExercise}`
    };
    elements.questionCounter.textContent = translations[state.currentLanguage];
}

function speakWord(word) {
    if (!('speechSynthesis' in window)) {
        alert('Text-to-speech not supported in your browser');
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);