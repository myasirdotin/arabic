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
    verbs: [],
    nouns: [],
    translations: {},
    userData: {
        weakAreas: [],
        masteredConjugations: []
    },
    questionsPerExercise: 10, // Default to 10 questions
    currentQuestionIndex: 0,
    exerciseQuestions: [],
    correctAnswers: 0 // Track correct answers in the session
};

// Constants
const MAX_LEVEL = 10;
const XP_PER_LEVEL = 100;

// Initialize the app
async function init() {
    await loadData();
    setupEventListeners();
    updateUI();
}

// Load JSON data
async function loadData() {
    try {
        const [verbsRes, nounsRes, translationsRes] = await Promise.all([
            fetch('data/verb.json'),
            fetch('data/noun.json'),
            fetch('data/translate.json')
        ]);
        
        if (!verbsRes.ok || !nounsRes.ok || !translationsRes.ok) {
            throw new Error('Failed to load data');
        }
        
        state.verbs = await verbsRes.json();
        state.nouns = await nounsRes.json();
        state.translations = await translationsRes.json();
        
        // Verify data structure
        if (!state.verbs?.verbs || !state.nouns?.nouns || !state.translations?.ui) {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error("Error loading data:", error);
        loadFallbackData();
    }
}

// Fallback data
function loadFallbackData() {
    state.verbs = {
        verbs: [
            {
                arabic: "كتب",
                root: "ك-ت-ب",
                translation: { en: "write", ur: "لکھنا" },
                conjugations: {
                    past: {
                        masculine: { singular: "كتب", dual: "كتبا", plural: "كتبوا" },
                        feminine: { singular: "كتبت", dual: "كتبتا", plural: "كتبن" }
                    },
                    present: {
                        masculine: { singular: "يكتب", dual: "يكتبان", plural: "يكتبون" },
                        feminine: { singular: "تكتب", dual: "تكتبان", plural: "يكتبن" }
                    },
                    future: {
                        masculine: { singular: "سيكتب", dual: "سيكتبان", plural: "سيكتبون" },
                        feminine: { singular: "ستكتب", dual: "ستكتبان", plural: "ستكتبن" }
                    }
                }
            }
        ]
    };
    state.nouns = {
        nouns: [
            {
                arabic: "كتاب",
                translation: { en: "book", ur: "کتاب" },
                gender: "masculine",
                conjugations: {
                    singular: {
                        nominative: "كتابٌ",
                        accusative: "كتابًا",
                        genitive: "كتابٍ"
                    },
                    dual: {
                        nominative: "كتابان",
                        accusative: "كتابين",
                        genitive: "كتابين"
                    },
                    plural: {
                        nominative: "كتبٌ",
                        accusative: "كتبًا",
                        genitive: "كتبٍ"
                    }
                }
            }
        ]
    };
    state.translations = {
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
    };
}

// Exercise Session Management
function startNewExerciseSession() {
    state.questionsPerExercise = parseInt(elements.questionCountSelect.value);
    state.currentLevel = parseInt(elements.levelSelect.value);
    state.currentQuestionIndex = 0;
    state.correctAnswers = 0;
    state.exerciseQuestions = generateExerciseQuestions();
    elements.exerciseSection.style.display = 'block';
    renderNextQuestion();
}

function generateExerciseQuestions() {
    const questions = [];
    for (let i = 0; i < state.questionsPerExercise; i++) {
        const isVerbExercise = Math.random() > 0.5;
        questions.push(isVerbExercise ? generateVerbExercise() : generateNounExercise());
    }
    return questions;
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

// Exercise Generation
function generateVerbExercise() {
    const randomVerb = getRandomItem(state.verbs.verbs);
    const { tense, gender, number } = getVerbParameters();
    const correctAnswer = randomVerb.conjugations[tense][gender][number];
    
    const incorrectOptions = [];
    const allConjugations = randomVerb.conjugations[tense];
    
    for (const g in allConjugations) {
        for (const n in allConjugations[g]) {
            const option = allConjugations[g][n];
            if (option !== correctAnswer && !incorrectOptions.includes(option)) {
                incorrectOptions.push(option);
            }
        }
    }
    
    const selectedIncorrect = shuffleArray(incorrectOptions).slice(0, Math.min(3, incorrectOptions.length));
    
    return {
        type: 'verb',
        word: randomVerb.arabic,
        root: randomVerb.root,
        translation: randomVerb.translation,
        tense,
        gender,
        number,
        correctAnswer,
        options: [
            { text: correctAnswer, correct: true },
            ...selectedIncorrect.map(text => ({ text, correct: false }))
        ],
        question: generateQuestion('verb', randomVerb, tense, gender, number),
        explanation: generateExplanation('verb', randomVerb, tense, gender, number, correctAnswer),
        conjugationTable: generateVerbConjugationTable(randomVerb)
    };
}

function generateNounExercise() {
    const randomNoun = getRandomItem(state.nouns.nouns);
    const { grammaticalCase, number } = getNounParameters();
    const correctAnswer = randomNoun.conjugations[number][grammaticalCase];
    
    const incorrectOptions = [];
    for (const n in randomNoun.conjugations) {
        for (const c in randomNoun.conjugations[n]) {
            const option = randomNoun.conjugations[n][c];
            if (option !== correctAnswer && !incorrectOptions.includes(option)) {
                incorrectOptions.push(option);
            }
        }
    }
    
    const selectedIncorrect = shuffleArray(incorrectOptions).slice(0, Math.min(3, incorrectOptions.length));
    
    return {
        type: 'noun',
        word: randomNoun.arabic,
        translation: randomNoun.translation,
        gender: randomNoun.gender,
        grammaticalCase,
        number,
        correctAnswer,
        options: [
            { text: correctAnswer, correct: true },
            ...selectedIncorrect.map(text => ({ text, correct: false }))
        ],
        question: generateQuestion('noun', randomNoun, grammaticalCase, number),
        explanation: generateExplanation('noun', randomNoun, grammaticalCase, number, correctAnswer),
        conjugationTable: generateNounConjugationTable(randomNoun)
    };
}

// Helper functions
function getVerbParameters() {
    let tense, gender, number;
    
    if (state.currentLevel <= 3) tense = 'past';
    else if (state.currentLevel <= 6) tense = 'present';
    else tense = 'future';
    
    gender = Math.random() > 0.5 ? 'masculine' : 'feminine';
    
    if (state.currentLevel <= 2) number = 'singular';
    else if (state.currentLevel <= 5) number = 'dual';
    else number = 'plural';
    
    return { tense, gender, number };
}

function getNounParameters() {
    let grammaticalCase, number;
    
    if (state.currentLevel <= 3) grammaticalCase = 'nominative';
    else if (state.currentLevel <= 6) grammaticalCase = 'accusative';
    else grammaticalCase = 'genitive';
    
    if (state.currentLevel <= 2) number = 'singular';
    else if (state.currentLevel <= 5) number = 'dual';
    else number = 'plural';
    
    return { grammaticalCase, number };
}

function generateQuestion(type, item, ...params) {
    const translations = {
        verb: {
            ar: (verb, tense, gender, number) => 
                `ما هو تصريف "${escapeHtml(verb.arabic)}" ل${getTerm('gender', gender, 'ar')} ${getTerm('number', number, 'ar')} في الزمن ${getTerm('tense', tense, 'ar')}؟`,
            en: (verb, tense, gender, number) =>
                `What is the ${getTerm('gender', gender, 'en')} ${getTerm('number', number, 'en')} conjugation in ${getTerm('tense', tense, 'en')} for "${escapeHtml(verb.translation.en)}"?`,
            ur: (verb, tense, gender, number) =>
                `"${escapeHtml(verb.translation.ur)}" کا ${getTerm('gender', gender, 'ur')} ${getTerm('number', number, 'ur')} کا تصریف کیا ہے ${getTerm('tense', tense, 'ur')} میں؟`
        },
        noun: {
            ar: (noun, grammaticalCase, number) =>
                `ما هو إعراب "${escapeHtml(noun.arabic)}" في حالة ${getTerm('case', grammaticalCase, 'ar')} لل${getTerm('number', number, 'ar')} ${getTerm('gender', noun.gender, 'ar')}؟`,
            en: (noun, grammaticalCase, number) =>
                `What is the ${getTerm('number', number, 'en')} ${getTerm('gender', noun.gender, 'en')} form in ${getTerm('case', grammaticalCase, 'en')} for "${escapeHtml(noun.translation.en)}"?`,
            ur: (noun, grammaticalCase, number) =>
                `"${escapeHtml(noun.translation.ur)}" کی ${getTerm('number', number, 'ur')} ${getTerm('gender', noun.gender, 'ur')} کی شکل کیا ہے ${getTerm('case', grammaticalCase, 'ur')} میں؟`
        }
    };
    
    return {
        ar: translations[type].ar(item, ...params),
        en: translations[type].en(item, ...params),
        ur: translations[type].ur(item, ...params)
    };
}

function generateExplanation(type, item, ...params) {
    const [param1, param2, param3, correctAnswer] = params;
    const translations = {
        verb: {
            ar: (verb, tense, gender, number, answer) =>
                `التصريف الصحيح هو "${escapeHtml(answer)}" لأنه صيغة ${getTerm('gender', gender, 'ar')} ${getTerm('number', number, 'ar')} في الزمن ${getTerm('tense', tense, 'ar')} للفعل "${escapeHtml(verb.arabic)}"`,
            en: (verb, tense, gender, number, answer) =>
                `The correct conjugation is "${escapeHtml(answer)}" because it's the ${getTerm('gender', gender, 'en')} ${getTerm('number', number, 'en')} form in ${getTerm('tense', tense, 'en')} tense for the verb "${escapeHtml(verb.translation.en)}"`,
            ur: (verb, tense, gender, number, answer) =>
                `صح تصریف "${escapeHtml(answer)}" ہے کیونکہ یہ ${getTerm('gender', gender, 'ur')} ${getTerm('number', number, 'ur')} کی شکل ہے ${getTerm('tense', tense, 'ur')} میں فعل "${escapeHtml(verb.translation.ur)}" کے لیے`
        },
        noun: {
            ar: (noun, grammaticalCase, number, answer) =>
                `الإجابة الصحيحة هي "${escapeHtml(answer)}" لأنها صيغة ${getTerm('case', grammaticalCase, 'ar')} ${getTerm('number', number, 'ar')} للإسم "${escapeHtml(noun.arabic)}"`,
            en: (noun, grammaticalCase, number, answer) =>
                `The correct answer is "${escapeHtml(answer)}" because it's the ${getTerm('case', grammaticalCase, 'en')} ${getTerm('number', number, 'en')} form of the noun "${escapeHtml(noun.translation.en)}"`,
            ur: (noun, grammaticalCase, number, answer) =>
                `صح جواب "${escapeHtml(answer)}" ہے کیونکہ یہ ${getTerm('case', grammaticalCase, 'ur')} ${getTerm('number', number, 'ur')} کی شکل ہے اسم "${escapeHtml(noun.translation.ur)}" کی`
        }
    };
    
    return {
        ar: translations[type].ar(item, ...params),
        en: translations[type].en(item, ...params),
        ur: translations[type].ur(item, ...params)
    };
}

function generateVerbConjugationTable(verb) {
    return {
        masculine: [
            verb.conjugations.past.masculine.singular,
            verb.conjugations.present.masculine.singular,
            verb.conjugations.future.masculine.singular
        ],
        feminine: [
            verb.conjugations.past.feminine.singular,
            verb.conjugations.present.feminine.singular,
            verb.conjugations.future.feminine.singular
        ],
        tenses: ['past', 'present', 'future']
    };
}

function generateNounConjugationTable(noun) {
    return {
        masculine: [
            noun.conjugations.singular.nominative,
            noun.conjugations.singular.accusative,
            noun.conjugations.singular.genitive
        ],
        feminine: [
            noun.conjugations.singular.nominative,
            noun.conjugations.singular.accusative,
            noun.conjugations.singular.genitive
        ],
        cases: ['nominative', 'accusative', 'genitive']
    };
}

// Render Exercise
function renderExercise() {
    const { word, question, options } = state.currentExercise;
    
    elements.arabicWord.textContent = word;
    elements.questionText.textContent = question[state.currentLanguage];
    elements.englishPrompt.textContent = question['en'];
    
    elements.answerOptions.innerHTML = '';
    
    const shuffledOptions = shuffleArray([...options]);
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = option.text;
        button.dataset.correct = option.correct;
        button.addEventListener('click', handleAnswerSelection);
        elements.answerOptions.appendChild(button);
    });
    
    updateLevelDisplay();
}

function updateLevelDisplay() {
    const { type, tense, grammaticalCase, number } = state.currentExercise;
    let levelText = '';
    
    if (type === 'verb') {
        levelText = `${state.translations.ui.level[state.currentLanguage]} ${state.currentLevel}: ${getTerm('tense', tense, state.currentLanguage)} - ${getTerm('number', number, state.currentLanguage)}`;
    } else {
        levelText = `${state.translations.ui.level[state.currentLevel]} ${state.currentLevel}: ${getTerm('case', grammaticalCase, state.currentLanguage)} - ${getTerm('number', number, state.currentLanguage)}`;
    }
    
    elements.levelDisplay.textContent = levelText;
    elements.levelProgress.value = ((state.currentQuestionIndex + 1) / state.questionsPerExercise) * 100;
}

function updateQuestionCounter() {
    const translations = {
        ar: `السؤال ${state.currentQuestionIndex + 1} من ${state.questionsPerExercise}`,
        en: `Question ${state.currentQuestionIndex + 1} of ${state.questionsPerExercise}`,
        ur: `سوال ${state.currentQuestionIndex + 1} میں سے ${state.questionsPerExercise}`
    };
    elements.questionCounter.textContent = translations[state.currentLanguage];
}

// Event Handlers
function handleAnswerSelection(e) {
    const selectedOption = e.target;
    const isCorrect = selectedOption.dataset.correct === 'true';
    
    selectedOption.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    document.querySelectorAll('.answer-btn').forEach(option => {
        option.disabled = true;
    });
    
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
    const { explanation, conjugationTable, type } = state.currentExercise;
    
    const isLastQuestion = state.currentQuestionIndex + 1 >= state.exerciseQuestions.length;
    const buttonText = isLastQuestion 
        ? state.translations.ui.finish[state.currentLanguage] || 'إنهاء'
        : state.translations.ui.nextQuestion[state.currentLanguage] || 'السؤال التالي';
    
    elements.feedbackContent.innerHTML = `
        <h3>${isCorrect ? 'إجابة صحيحة! ✔' : 'إجابة خاطئة ❌'}</h3>
        <p>${escapeHtml(explanation[state.currentLanguage])}</p>
        
        <div class="conjugation-table">
            <table>
                <tr>
                    <th>${type === 'verb' ? getTerm('gender', 'masculine', state.currentLanguage) : getTerm('case', 'nominative', state.currentLanguage)}</th>
                    <th>${type === 'verb' ? getTerm('gender', 'feminine', state.currentLanguage) : getTerm('case', 'nominative', state.currentLanguage)}</th>
                </tr>
                ${conjugationTable.masculine.map((masc, i) => `
                    <tr>
                        <td>${escapeHtml(masc)}</td>
                        <td>${escapeHtml(conjugationTable.feminine[i])}</td>
                    </tr>
                `).join('')}
            </table>
        </div>
        
        <button class="next-exercise" id="next-exercise-btn">${escapeHtml(buttonText)}</button>
    `;
    
    elements.nextExerciseBtn = document.getElementById('next-exercise-btn');
    elements.nextExerciseBtn.addEventListener('click', () => {
        elements.feedbackModal.classList.add('hidden');
        state.currentQuestionIndex++;
        renderNextQuestion();
    });
    
    elements.feedbackModal.classList.remove('hidden');
}

function showSessionSummary() {
    const percentage = (state.correctAnswers / state.questionsPerExercise) * 100;
    elements.exerciseSection.style.display = 'none';
    const translations = {
        ar: `
            <h3>اكتمل التمرين! 🎉</h3>
            <p>لقد أجبت على ${state.correctAnswers} من ${state.questionsPerExercise} أسئلة بشكل صحيح (${percentage.toFixed(1)}%).</p>
            <p>النقاط المكتسبة: ${state.currentXP}</p>
            <button class="next-exercise" id="restart-btn">ابدأ تمرينًا جديدًا</button>
        `,
        en: `
            <h3>Exercise Completed! 🎉</h3>
            <p>You answered ${state.correctAnswers} out of ${state.questionsPerExercise} questions correctly (${percentage.toFixed(1)}%).</p>
            <p>XP Earned: ${state.currentXP}</p>
            <button class="next-exercise" id="restart-btn">Start New Exercise</button>
        `,
        ur: `
            <h3>مشق مکمل ہوگئی! 🎉</h3>
            <p>آپ نے ${state.correctAnswers} میں سے ${state.questionsPerExercise} سوالات کا صحیح جواب دیا (${percentage.toFixed(1)}%)۔</p>
            <p>حاصل کردہ پوائنٹس: ${state.currentXP}</p>
            <button class="next-exercise" id="restart-btn">نیا مشق شروع کریں</button>
        `
    };
    
    elements.feedbackContent.innerHTML = translations[state.currentLanguage];
    
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', () => {
        elements.feedbackModal.classList.add('hidden');
        startNewExerciseSession();
    });
    
    elements.feedbackModal.classList.remove('hidden');
}

function setupEventListeners() {
    elements.languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            state.currentLanguage = button.dataset.lang;
            document.documentElement.lang = state.currentLanguage;
            document.documentElement.dir = state.currentLanguage === 'ar' ? 'rtl' : 'ltr';
            
            elements.languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (state.currentExercise) {
                renderExercise();
            }
            updateUI();
            updateQuestionCounter();
        });
    });
    
    elements.pronounceBtn.addEventListener('click', () => {
        speakWord(state.currentExercise?.word);
    });
    
    elements.hintBtn.addEventListener('click', showHint);
    
    elements.skipBtn.addEventListener('click', () => {
        elements.feedbackModal.classList.add('hidden');
        state.currentQuestionIndex++;
        renderNextQuestion();
    });
    
    elements.closeModal.addEventListener('click', () => {
        elements.feedbackModal.classList.add('hidden');
    });
    
    elements.modalOverlay.addEventListener('click', () => {
        elements.feedbackModal.classList.add('hidden');
    });
    
    elements.startBtn.addEventListener('click', startNewExerciseSession);
}

function showHint() {
    if (!state.currentExercise) return;
    const { type, word, translation } = state.currentExercise;
    const hintText = {
        ar: type === 'verb' 
            ? `تلميح: الفعل "${escapeHtml(word)}" من الجذر "${escapeHtml(state.currentExercise.root)}"`
            : `تلميح: الإسم "${escapeHtml(word)}" ${state.currentExercise.gender === 'masculine' ? 'مذكر' : 'مؤنث'}`,
        en: type === 'verb'
            ? `Hint: The verb "${escapeHtml(translation.en)}" comes from root "${escapeHtml(state.currentExercise.root)}"`
            : `Hint: The noun "${escapeHtml(translation.en)}" is ${state.currentExercise.gender}`,
        ur: type === 'verb'
            ? `اشارہ: فعل "${escapeHtml(translation.ur)}" کی جڑ "${escapeHtml(state.currentExercise.root)}" ہے`
            : `اشارہ: اسم "${escapeHtml(translation.ur)}" ${state.currentExercise.gender === 'masculine' ? 'مذکر' : 'مونث'} ہے`
    };
    
    alert(hintText[state.currentLanguage]);
}

function speakWord(word) {
    if (!word || !('speechSynthesis' in window)) {
        alert('Text-to-speech not supported in your browser');
        return;
    }
    
    try {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } catch (error) {
        console.error('Error with speech synthesis:', error);
        alert('Error pronouncing the word');
    }
}

// Update UI
function updateUI() {
    elements.streakCounter.textContent = state.currentStreak;
    elements.xpCounter.textContent = state.currentXP;
    elements.accuracyCount.textContent = state.currentQuestionIndex > 0 
        ? `${((state.correctAnswers / state.currentQuestionIndex) * 100).toFixed(1)}%`
        : '0%';
    
    elements.navButtons.practice.textContent = state.translations.ui.practice?.[state.currentLanguage] || 'تمارين';
    elements.navButtons.progress.textContent = state.translations.ui.progress?.[state.currentLanguage] || 'تقدمي';
    elements.navButtons.rewards.textContent = state.translations.ui.rewards?.[state.currentLanguage] || 'جوائز';
    elements.hintBtn.textContent = state.translations.ui.hint?.[state.currentLanguage] || 'تلميح';
    elements.startBtn.textContent = state.translations.ui.start?.[state.currentLanguage] || 'ابدأ';
}

// Utility Functions
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getTerm(type, value, lang) {
    const terms = {
        tense: {
            past: { ar: "الماضي", en: "past", ur: "ماضی" },
            present: { ar: "المضارع", en: "present", ur: "حال" },
            future: { ar: "المستقبل", en: "future", ur: "مستقبل" }
        },
        gender: {
            masculine: { ar: "المذكر", en: "masculine", ur: "مذکر" },
            feminine: { ar: "المؤنث", en: "feminine", ur: "مونث" }
        },
        number: {
            singular: { ar: "المفرد", en: "singular", ur: "واحد" },
            dual: { ar: "المثنى", en: "dual", ur: "دو" },
            plural: { ar: "المجموعة", en: "plural", ur: "چند" }
        },
        case: {
            nominative: { ar: "الرفع", en: "nominative", ur: "رفع" },
            accusative: { ar: "النصب", en: "accusative", ur: "نصب" },
            genitive: { ar: "الجر", en: "genitive", ur: "جر" }
        }
    };

    return terms[type][value][lang];
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);