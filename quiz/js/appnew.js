// DOM Elements Cache
const elements = {};
function cacheElements() {
    try {
        elements.arabicWord = document.getElementById('arabic-word');
        elements.questionText = document.getElementById('question-text');
        elements.englishPrompt = document.getElementById('english-prompt');
        elements.answerOptions = document.getElementById('answer-options');
        elements.hintBtn = document.getElementById('hint-btn');
        elements.skipBtn = document.getElementById('skip-btn');
        elements.nextBtn = document.getElementById('next-btn');
        elements.feedbackModal = document.getElementById('feedback-modal');
        elements.feedbackContent = document.getElementById('feedback-content');
        elements.closeModal = document.getElementById('close-modal');
        elements.modalOverlay = document.querySelector('.modal-overlay');
        elements.pronounceBtn = document.getElementById('pronounce-btn');
        elements.languageButtons = document.querySelectorAll('.lang-btn');
        elements.streakCounter = document.getElementById('streak-count');
        elements.xpCounter = document.getElementById('xp-count');
        elements.accuracyCount = document.getElementById('accuracy-count');
        elements.levelDisplay = document.getElementById('level-display');
        elements.levelProgress = document.getElementById('level-progress');
        elements.exerciseSection = document.getElementById('exercise-section');
        elements.questionCountSelect = document.getElementById('question-count');
        elements.levelSelect = document.getElementById('level-select');
        elements.startBtn = document.getElementById('start-btn');
        elements.questionCounter = document.getElementById('question-counter');

        // Verify critical elements
        const missing = Object.keys(elements).filter(key => !elements[key]);
        if (missing.length) {
            console.error('Missing DOM elements:', missing);
        }
    } catch (error) {
        console.error('Error caching DOM elements:', error);
    }
}

// Question Bank
const questionBank = {
    1: [
        {
            type: 'verb',
            word: 'كتب',
            translation: { en: 'write', ar: 'كتب', ur: 'لکھنا' },
            correctAnswer: 'يكتب',
            options: [
                { text: 'يكتب', correct: true },
                { text: 'تكتب', correct: false },
                { text: 'نكتب', correct: false },
                { text: 'يكتبون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'write' (he)?",
                ar: "ما هو المضارع من 'كتب' (هو)؟",
                ur: "'لکھنا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يكتب' (he writes).",
                ar: "الجواب الصحيح هو 'يكتب' (هو يكتب).",
                ur: "صح جواب 'يكتب' ہے (وہ لکھتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'كتاب',
            translation: { en: 'book', ar: 'كتاب', ur: 'کتاب' },
            correctAnswer: 'كتابٌ',
            options: [
                { text: 'كتابٌ', correct: true },
                { text: 'كتابًا', correct: false },
                { text: 'كتابٍ', correct: false },
                { text: 'كتب', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'book'?",
                ar: "ما هو الرفع من 'كتاب'؟",
                ur: "'کتاب' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'كتابٌ' (nominative).",
                ar: "الجواب الصحيح هو 'كتابٌ' (رفع).",
                ur: "صح جواب 'كتابٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'أكل',
            translation: { en: 'eat', ar: 'أكل', ur: 'کھانا' },
            correctAnswer: 'يأكل',
            options: [
                { text: 'يأكل', correct: true },
                { text: 'تأكل', correct: false },
                { text: 'نأكل', correct: false },
                { text: 'يأكلون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'eat' (he)?",
                ar: "ما هو المضارع من 'أكل' (هو)؟",
                ur: "'کھانا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يأكل' (he eats).",
                ar: "الجواب الصحيح هو 'يأكل' (هو يأكل).",
                ur: "صح جواب 'يأكل' ہے (وہ کھاتا ہے)."
            }
        },
        {
            type: 'verb',
            word: 'شرب',
            translation: { en: 'drink', ar: 'شرب', ur: 'پینا' },
            correctAnswer: 'يشرب',
            options: [
                { text: 'يشرب', correct: true },
                { text: 'تشرب', correct: false },
                { text: 'نشرب', correct: false },
                { text: 'يشربون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'drink' (he)?",
                ar: "ما هو المضارع من 'شرب' (هو)؟",
                ur: "'پینا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يشرب' (he drinks).",
                ar: "الجواب الصحيح هو 'يشرب' (هو يشرب).",
                ur: "صح جواب 'يشرب' ہے (وہ پیتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'مدرسة',
            translation: { en: 'school', ar: 'مدرسة', ur: 'اسکول' },
            correctAnswer: 'مدرسةٌ',
            options: [
                { text: 'مدرسةٌ', correct: true },
                { text: 'مدرسةً', correct: false },
                { text: 'مدرسةٍ', correct: false },
                { text: 'مدارس', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'school'?",
                ar: "ما هو الرفع من 'مدرسة'؟",
                ur: "'اسکول' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'مدرسةٌ' (nominative).",
                ar: "الجواب الصحيح هو 'مدرسةٌ' (رفع).",
                ur: "صح جواب 'مدرسةٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'ركض',
            translation: { en: 'run', ar: 'ركض', ur: 'دوڑنا' },
            correctAnswer: 'يركض',
            options: [
                { text: 'يركض', correct: true },
                { text: 'تركض', correct: false },
                { text: 'نركض', correct: false },
                { text: 'يركضون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'run' (he)?",
                ar: "ما هو المضارع من 'ركض' (هو)؟",
                ur: "'دوڑنا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يركض' (he runs).",
                ar: "الجواب الصحيح هو 'يركض' (هو يركض).",
                ur: "صح جواب 'يركض' ہے (وہ دوڑتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'شجرة',
            translation: { en: 'tree', ar: 'شجرة', ur: 'درخت' },
            correctAnswer: 'شجرةٌ',
            options: [
                { text: 'شجرةٌ', correct: true },
                { text: 'شجرةً', correct: false },
                { text: 'شجرةٍ', correct: false },
                { text: 'أشجار', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'tree'?",
                ar: "ما هو الرفع من 'شجرة'؟",
                ur: "'درخت' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'شجرةٌ' (nominative).",
                ar: "الجواب الصحيح هو 'شجرةٌ' (رفع).",
                ur: "صح جواب 'شجرةٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'نام',
            translation: { en: 'sleep', ar: 'نام', ur: 'سونے' },
            correctAnswer: 'ينام',
            options: [
                { text: 'ينام', correct: true },
                { text: 'تنام', correct: false },
                { text: 'ننام', correct: false },
                { text: 'ينامون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'sleep' (he)?",
                ar: "ما هو المضارع من 'نام' (هو)؟",
                ur: "'سونے' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'ينام' (he sleeps).",
                ar: "الجواب الصحيح هو 'ينام' (هو ينام).",
                ur: "صح جواب 'ينام' ہے (وہ سوتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'سيارة',
            translation: { en: 'car', ar: 'سيارة', ur: 'کار' },
            correctAnswer: 'سيارةٌ',
            options: [
                { text: 'سيارةٌ', correct: true },
                { text: 'سيارةً', correct: false },
                { text: 'سيارةٍ', correct: false },
                { text: 'سيارات', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'car'?",
                ar: "ما هو الرفع من 'سيارة'؟",
                ur: "'کار' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'سيارةٌ' (nominative).",
                ar: "الجواب الصحيح هو 'سيارةٌ' (رفع).",
                ur: "صح جواب 'سيارةٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'لعب',
            translation: { en: 'play', ar: 'لعب', ur: 'کھیلنا' },
            correctAnswer: 'يلعب',
            options: [
                { text: 'يلعب', correct: true },
                { text: 'تلعب', correct: false },
                { text: 'نلعب', correct: false },
                { text: 'يلعبون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'play' (he)?",
                ar: "ما هو المضارع من 'لعب' (هو)؟",
                ur: "'کھیلنا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يلعب' (he plays).",
                ar: "الجواب الصحيح هو 'يلعب' (هو يلعب).",
                ur: "صح جواب 'يلعب' ہے (وہ کھیلتا ہے)."
            }
        }
    ],
    2: [
        {
            type: 'verb',
            word: 'ذهب',
            translation: { en: 'go', ar: 'ذهب', ur: 'جانا' },
            correctAnswer: 'يذهب',
            options: [
                { text: 'يذهب', correct: true },
                { text: 'تذهب', correct: false },
                { text: 'نذهب', correct: false },
                { text: 'يذهبون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'go' (he)?",
                ar: "ما هو المضارع من 'ذهب' (هو)؟",
                ur: "'جانا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يذهب' (he goes).",
                ar: "الجواب الصحيح هو 'يذهب' (هو يذهب).",
                ur: "صح جواب 'يذهب' ہے (وہ جاتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'بيت',
            translation: { en: 'house', ar: 'بيت', ur: 'گھر' },
            correctAnswer: 'بيتٌ',
            options: [
                { text: 'بيتٌ', correct: true },
                { text: 'بيتًا', correct: false },
                { text: 'بيتٍ', correct: false },
                { text: 'بيوت', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'house'?",
                ar: "ما هو الرفع من 'بيت'؟",
                ur: "'گھر' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'بيتٌ' (nominative).",
                ar: "الجواب الصحيح هو 'بيتٌ' (رفع).",
                ur: "صح جواب 'بيتٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'قرأ',
            translation: { en: 'read', ar: 'قرأ', ur: 'پڑھنا' },
            correctAnswer: 'يقرأ',
            options: [
                { text: 'يقرأ', correct: true },
                { text: 'تقرأ', correct: false },
                { text: 'نقرأ', correct: false },
                { text: 'يقرأون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'read' (he)?",
                ar: "ما هو المضارع من 'قرأ' (هو)؟",
                ur: "'پڑھنا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يقرأ' (he reads).",
                ar: "الجواب الصحيح هو 'يقرأ' (هو يقرأ).",
                ur: "صح جواب 'يقرأ' ہے (وہ پڑھتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'مدينة',
            translation: { en: 'city', ar: 'مدينة', ur: 'شہر' },
            correctAnswer: 'مدينةٌ',
            options: [
                { text: 'مدينةٌ', correct: true },
                { text: 'مدينةً', correct: false },
                { text: 'مدينةٍ', correct: false },
                { text: 'مدن', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'city'?",
                ar: "ما هو الرفع من 'مدينة'؟",
                ur: "'شہر' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'مدينةٌ' (nominative).",
                ar: "الجواب الصحيح هو 'مدينةٌ' (رفع).",
                ur: "صح جواب 'مدينةٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'كسر',
            translation: { en: 'break', ar: 'كسر', ur: 'توڑنا' },
            correctAnswer: 'يكسر',
            options: [
                { text: 'يكسر', correct: true },
                { text: 'تكسر', correct: false },
                { text: 'نكسر', correct: false },
                { text: 'يكسرون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'break' (he)?",
                ar: "ما هو المضارع من 'كسر' (هو)؟",
                ur: "'توڑنا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يكسر' (he breaks).",
                ar: "الجواب الصحيح هو 'يكسر' (هو يكسر).",
                ur: "صح جواب 'يكسر' ہے (وہ توڑتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'نهر',
            translation: { en: 'river', ar: 'نهر', ur: 'دریا' },
            correctAnswer: 'نهرٌ',
            options: [
                { text: 'نهرٌ', correct: true },
                { text: 'نهرًا', correct: false },
                { text: 'نهرٍ', correct: false },
                { text: 'أنهار', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'river'?",
                ar: "ما هو الرفع من 'نهر'؟",
                ur: "'دریا' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'نهرٌ' (nominative).",
                ar: "الجواب الصحيح هو 'نهرٌ' (رفع).",
                ur: "صح جواب 'نهرٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'فتح',
            translation: { en: 'open', ar: 'فتح', ur: 'کھولنا' },
            correctAnswer: 'يفتح',
            options: [
                { text: 'يفتح', correct: true },
                { text: 'تفتح', correct: false },
                { text: 'نفتح', correct: false },
                { text: 'يفتحون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'open' (he)?",
                ar: "ما هو المضارع من 'فتح' (هو)؟",
                ur: "'کھولنا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يفتح' (he opens).",
                ar: "الجواب الصحيح هو 'يفتح' (هو يفتح).",
                ur: "صح جواب 'يفتح' ہے (وہ کھولتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'جبل',
            translation: { en: 'mountain', ar: 'جبل', ur: 'پہاڑ' },
            correctAnswer: 'جبلٌ',
            options: [
                { text: 'جبلٌ', correct: true },
                { text: 'جبلًا', correct: false },
                { text: 'جبلٍ', correct: false },
                { text: 'جبال', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'mountain'?",
                ar: "ما هو الرفع من 'جبل'؟",
                ur: "'پہاڑ' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'جبلٌ' (nominative).",
                ar: "الجواب الصحيح هو 'جبلٌ' (رفع).",
                ur: "صح جواب 'جبلٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'مشى',
            translation: { en: 'walk', ar: 'مشى', ur: 'چلنا' },
            correctAnswer: 'يمشي',
            options: [
                { text: 'يمشي', correct: true },
                { text: 'تمشي', correct: false },
                { text: 'نمشي', correct: false },
                { text: 'يمشون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'walk' (he)?",
                ar: "ما هو المضارع من 'مشى' (هو)؟",
                ur: "'چلنا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يمشي' (he walks).",
                ar: "الجواب الصحيح هو 'يمشي' (هو يمشي).",
                ur: "صح جواب 'يمشي' ہے (وہ چلتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'بحر',
            translation: { en: 'sea', ar: 'بحر', ur: 'سمندر' },
            correctAnswer: 'بحرٌ',
            options: [
                { text: 'بحرٌ', correct: true },
                { text: 'بحرًا', correct: false },
                { text: 'بحرٍ', correct: false },
                { text: 'بحور', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'sea'?",
                ar: "ما هو الرفع من 'بحر'؟",
                ur: "'سمندر' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'بحرٌ' (nominative).",
                ar: "الجواب الصحيح هو 'بحرٌ' (رفع).",
                ur: "صح جواب 'بحرٌ' ہے (رفع)."
            }
        }
    ],
    3: [
        {
            type: 'verb',
            word: 'سمع',
            translation: { en: 'hear', ar: 'سمع', ur: 'سننا' },
            correctAnswer: 'يسمع',
            options: [
                { text: 'يسمع', correct: true },
                { text: 'تسمع', correct: false },
                { text: 'نسمع', correct: false },
                { text: 'يسمعون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'hear' (he)?",
                ar: "ما هو المضارع من 'سمع' (هو)؟",
                ur: "'سننا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يسمع' (he hears).",
                ar: "الجواب الصحيح هو 'يسمع' (هو يسمع).",
                ur: "صح جواب 'يسمع' ہے (وہ سنتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'قلم',
            translation: { en: 'pen', ar: 'قلم', ur: 'قلم' },
            correctAnswer: 'قلمٌ',
            options: [
                { text: 'قلمٌ', correct: true },
                { text: 'قلمًا', correct: false },
                { text: 'قلمٍ', correct: false },
                { text: 'أقلام', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'pen'?",
                ar: "ما هو الرفع من 'قلم'؟",
                ur: "'قلم' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'قلمٌ' (nominative).",
                ar: "الجواب الصحيح هو 'قلمٌ' (رفع).",
                ur: "صح جواب 'قلمٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'علم',
            translation: { en: 'know', ar: 'علم', ur: 'جاننا' },
            correctAnswer: 'يعلم',
            options: [
                { text: 'يعلم', correct: true },
                { text: 'تعلم', correct: false },
                { text: 'نعلم', correct: false },
                { text: 'يعلمون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'know' (he)?",
                ar: "ما هو المضارع من 'علم' (هو)؟",
                ur: "'جاننا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يعلم' (he knows).",
                ar: "الجواب الصحيح هو 'يعلم' (هو يعلم).",
                ur: "صح جواب 'يعلم' ہے (وہ جانتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'سماء',
            translation: { en: 'sky', ar: 'سماء', ur: 'آسمان' },
            correctAnswer: 'سماءٌ',
            options: [
                { text: 'سماءٌ', correct: true },
                { text: 'سماءً', correct: false },
                { text: 'سماءٍ', correct: false },
                { text: 'سموات', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'sky'?",
                ar: "ما هو الرفع من 'سماء'؟",
                ur: "'آسمان' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'سماءٌ' (nominative).",
                ar: "الجواب الصحيح هو 'سماءٌ' (رفع).",
                ur: "صح جواب 'سماءٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'كتب',
            translation: { en: 'write', ar: 'كتب', ur: 'لکھنا' },
            correctAnswer: 'تكتب',
            options: [
                { text: 'تكتب', correct: true },
                { text: 'يكتب', correct: false },
                { text: 'نكتب', correct: false },
                { text: 'تكتبين', correct: false }
            ],
            question: {
                en: "What is the present tense of 'write' (she)?",
                ar: "ما هو المضارع من 'كتب' (هي)؟",
                ur: "'لکھنا' کا حال کیا ہے (وہ عورت)؟"
            },
            explanation: {
                en: "The correct answer is 'تكتب' (she writes).",
                ar: "الجواب الصحيح هو 'تكتب' (هي تكتب).",
                ur: "صح جواب 'تكتب' ہے (وہ لکھتی ہے)."
            }
        },
        {
            type: 'noun',
            word: 'غرفة',
            translation: { en: 'room', ar: 'غرفة', ur: 'کمرہ' },
            correctAnswer: 'غرفةٌ',
            options: [
                { text: 'غرفةٌ', correct: true },
                { text: 'غرفةً', correct: false },
                { text: 'غرفةٍ', correct: false },
                { text: 'غرف', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'room'?",
                ar: "ما هو الرفع من 'غرفة'؟",
                ur: "'کمرہ' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'غرفةٌ' (nominative).",
                ar: "الجواب الصحيح هو 'غرفةٌ' (رفع).",
                ur: "صح جواب 'غرفةٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'أكل',
            translation: { en: 'eat', ar: 'أكل', ur: 'کھانا' },
            correctAnswer: 'تأكل',
            options: [
                { text: 'تأكل', correct: true },
                { text: 'يأكل', correct: false },
                { text: 'نأكل', correct: false },
                { text: 'تأكلين', correct: false }
            ],
            question: {
                en: "What is the present tense of 'eat' (she)?",
                ar: "ما هو المضارع من 'أكل' (هي)؟",
                ur: "'کھانا' کا حال کیا ہے (وہ عورت)؟"
            },
            explanation: {
                en: "The correct answer is 'تأكل' (she eats).",
                ar: "الجواب الصحيح هو 'تأكل' (هي تأكل).",
                ur: "صح جواب 'تأكل' ہے (وہ کھاتی ہے)."
            }
        },
        {
            type: 'noun',
            word: 'شمس',
            translation: { en: 'sun', ar: 'شمس', ur: 'سورج' },
            correctAnswer: 'شمسٌ',
            options: [
                { text: 'شمسٌ', correct: true },
                { text: 'شمسًا', correct: false },
                { text: 'شمسٍ', correct: false },
                { text: 'شمس', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'sun'?",
                ar: "ما هو الرفع من 'شمس'؟",
                ur: "'سورج' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'شمسٌ' (nominative).",
                ar: "الجواب الصحيح هو 'شمسٌ' (رفع).",
                ur: "صح جواب 'شمسٌ' ہے (رفع)."
            }
        },
        {
            type: 'verb',
            word: 'سافر',
            translation: { en: 'travel', ar: 'سافر', ur: 'سفر کرنا' },
            correctAnswer: 'يسافر',
            options: [
                { text: 'يسافر', correct: true },
                { text: 'تسافر', correct: false },
                { text: 'نسافر', correct: false },
                { text: 'يسافرون', correct: false }
            ],
            question: {
                en: "What is the present tense of 'travel' (he)?",
                ar: "ما هو المضارع من 'سافر' (هو)؟",
                ur: "'سفر کرنا' کا حال کیا ہے (وہ)؟"
            },
            explanation: {
                en: "The correct answer is 'يسافر' (he travels).",
                ar: "الجواب الصحيح هو 'يسافر' (هو يسافر).",
                ur: "صح جواب 'يسافر' ہے (وہ سفر کرتا ہے)."
            }
        },
        {
            type: 'noun',
            word: 'قمر',
            translation: { en: 'moon', ar: 'قمر', ur: 'چاند' },
            correctAnswer: 'قمرٌ',
            options: [
                { text: 'قمرٌ', correct: true },
                { text: 'قمرًا', correct: false },
                { text: 'قمرٍ', correct: false },
                { text: 'أقمار', correct: false }
            ],
            question: {
                en: "What is the nominative form of 'moon'?",
                ar: "ما هو الرفع من 'قمر'؟",
                ur: "'چاند' کی رفع کی شکل کیا ہے؟"
            },
            explanation: {
                en: "The correct answer is 'قمرٌ' (nominative).",
                ar: "الجواب الصحيح هو 'قمرٌ' (رفع).",
                ur: "صح جواب 'قمرٌ' ہے (رفع)."
            }
        }
    ]
};

// App State
const state = {
    currentLanguage: 'ar',
    currentLevel: 1,
    currentXP: 0,
    currentStreak: 0,
    currentExercise: null,
    exerciseQuestions: [],
    questionsPerExercise: 10,
    currentQuestionIndex: 0,
    correctAnswers: 0,
    hintsUsed: 0,
    sessionAnswers: [],
    translations: {
        ui: {
            level: { ar: "المستوى", en: "Level", ur: "لیول" },
            hint: { ar: "تلميح", en: "Hint", ur: "اشارہ" },
            skip: { ar: "تخطي", en: "Skip", ur: "چھوڑیں" },
            nextQuestion: { ar: "السؤال التالي", en: "Next Question", ur: "اگلا سوال" },
            start: { ar: "ابدأ", en: "Start", ur: "شروع کریں" },
            pronounce: { ar: "نطق", en: "Pronounce", ur: "تلفظ کریں" }
        }
    }
};

// Initialize App
function init() {
    try {
        cacheElements();
        setLanguage(state.currentLanguage);
        setupEventListeners();
        updateUI();
    } catch (error) {
        console.error('Initialization error:', error);
        showFeedbackModal('حدث خطأ أثناء تحميل التطبيق. يرجى إعادة تحميل الصفحة.');
    }
}

// Language Management
function setLanguage(lang) {
    try {
        state.currentLanguage = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        if (elements.languageButtons) {
            elements.languageButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
                btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
            });
        }

        updateUI();
    } catch (error) {
        console.error('Error setting language:', error);
    }
}

// Event Listeners
function setupEventListeners() {
    try {
        if (elements.languageButtons) {
            elements.languageButtons.forEach(button => {
                button.addEventListener('click', () => {
                    try {
                        setLanguage(button.dataset.lang);
                    } catch (error) {
                        console.error('Language button error:', error);
                    }
                });
            });
        }

        if (elements.startBtn) {
            elements.startBtn.addEventListener('click', () => {
                try {
                    startNewExerciseSession();
                } catch (error) {
                    console.error('Start button error:', error);
                    showFeedbackModal('حدث خطأ أثناء بدء التمرين.');
                }
            });
        }

        if (elements.pronounceBtn) {
            elements.pronounceBtn.addEventListener('click', speakWord);
        }

        if (elements.hintBtn) {
            elements.hintBtn.addEventListener('click', showHint);
        }

        if (elements.skipBtn) {
            elements.skipBtn.addEventListener('click', skipQuestion);
        }

        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', handleNextQuestion);
        }

        if (elements.closeModal) {
            elements.closeModal.addEventListener('click', closeModal);
        }

        if (elements.modalOverlay) {
            elements.modalOverlay.addEventListener('click', closeModal);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

// Start New Exercise
function startNewExerciseSession() {
    try {
        state.questionsPerExercise = elements.questionCountSelect ? parseInt(elements.questionCountSelect.value) || 10 : 10;
        state.currentLevel = elements.levelSelect ? parseInt(elements.levelSelect.value) || 1 : 1;
        state.currentQuestionIndex = 0;
        state.correctAnswers = 0;
        state.hintsUsed = 0;
        state.currentXP = 0;
        state.currentStreak = 0;
        state.sessionAnswers = [];

        state.exerciseQuestions = generateRandomQuestions();
        if (!state.exerciseQuestions.length) {
            showFeedbackModal('خطأ: لا توجد أسئلة متاحة');
            return;
        }

        if (elements.exerciseSection) {
            elements.exerciseSection.style.display = 'block';
            elements.exerciseSection.setAttribute('aria-hidden', 'false');
        }

        renderNextQuestion();
        updateUI();
    } catch (error) {
        console.error('Error starting exercise:', error);
        showFeedbackModal('حدث خطأ أثناء بدء التمرين.');
    }
}

// Generate Random Questions
function generateRandomQuestions() {
    try {
        const questions = questionBank[state.currentLevel] || [];
        if (!questions.length) return [];

        const result = [];
        for (let i = 0; i < state.questionsPerExercise; i++) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            result.push({ ...questions[randomIndex] });
        }
        return result;
    } catch (error) {
        console.error('Error generating questions:', error);
        return [];
    }
}

// Render Next Question
function renderNextQuestion() {
    try {
        if (state.currentQuestionIndex >= state.exerciseQuestions.length) {
            showSessionSummary();
            return;
        }

        state.currentExercise = state.exerciseQuestions[state.currentQuestionIndex];
        renderExercise();
        updateQuestionCounter();
        if (elements.nextBtn) elements.nextBtn.disabled = true;
    } catch (error) {
        console.error('Error rendering next question:', error);
    }
}

// Render Exercise
function renderExercise() {
    try {
        if (!state.currentExercise) return;

        const { word, question, options } = state.currentExercise;
        if (elements.arabicWord) elements.arabicWord.textContent = word;
        if (elements.questionText) elements.questionText.textContent = question[state.currentLanguage];
        if (elements.englishPrompt) elements.englishPrompt.textContent = question.en;

        if (elements.answerOptions) {
            elements.answerOptions.innerHTML = '';
            options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'answer-btn';
                button.textContent = option.text;
                button.dataset.correct = option.correct;
                button.setAttribute('aria-label', `Option ${index + 1}: ${option.text}`);
                button.addEventListener('click', handleAnswerSelection);
                elements.answerOptions.appendChild(button);
            });
            elements.answerOptions.setAttribute('aria-live', 'polite');
        }
    } catch (error) {
        console.error('Error rendering exercise:', error);
    }
}

// Handle Answer Selection
function handleAnswerSelection(e) {
    try {
        const selectedOption = e.target;
        const isCorrect = selectedOption.dataset.correct === 'true';

        if (elements.answerOptions) {
            Array.from(elements.answerOptions.children).forEach(btn => {
                btn.disabled = true;
                if (btn.dataset.correct === 'true') btn.classList.add('correct');
                if (btn === selectedOption) btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            });
        }

        if (isCorrect) {
            state.currentStreak++;
            state.correctAnswers++;
            state.currentXP += 10;
            if (state.currentStreak % 5 === 0) state.currentXP += 10;
        } else {
            state.currentStreak = 0;
        }

        state.sessionAnswers.push({
            question: state.currentExercise.question[state.currentLanguage],
            userAnswer: selectedOption.textContent,
            isCorrect: isCorrect,
            correctAnswer: state.currentExercise.correctAnswer,
            explanation: state.currentExercise.explanation[state.currentLanguage]
        });

        showFeedback(isCorrect);
        if (elements.nextBtn) elements.nextBtn.disabled = false;
        updateUI();
    } catch (error) {
        console.error('Error handling answer:', error);
    }
}

// Handle Next Question
function handleNextQuestion() {
    try {
        closeModal();
        state.currentQuestionIndex++;
        renderNextQuestion();
    } catch (error) {
        console.error('Error handling next question:', error);
    }
}

// Show Feedback
function showFeedback(isCorrect) {
    try {
        if (!state.currentExercise) return;

        const { explanation, correctAnswer } = state.currentExercise;
        const message = isCorrect
            ? '✓ صحيح'
            : `✗ غير صحيح. الإجابة الصحيحة: ${correctAnswer}`;

        if (elements.feedbackContent) {
            elements.feedbackContent.innerHTML = `
                <h3>${message}</h3>
                <p>${explanation[state.currentLanguage]}</p>
            `;
        }

        if (elements.feedbackModal) {
            elements.feedbackModal.classList.remove('hidden');
            elements.feedbackModal.setAttribute('aria-hidden', 'false');
        }
    } catch (error) {
        console.error('Error showing feedback:', error);
    }
}

// Show Session Summary
function showSessionSummary() {
    try {
        const accuracy = Math.round((state.correctAnswers / state.questionsPerExercise) * 100) || 0;
        const xpEarned = state.currentXP;

        let summaryHtml = `
            <h3>انتهى التمرين!</h3>
            <p>الدقة: ${accuracy}%</p>
            <p>النقاط المكتسبة: ${xpEarned}</p>
            <p>المتابعة: ${state.currentStreak}</p>
            <h4>تفاصيل الأسئلة:</h4>
            <ul style="list-style: none; padding: 0; text-align: ${state.currentLanguage === 'ar' ? 'right' : 'left'};">
        `;

        state.sessionAnswers.forEach((answer, index) => {
            const status = answer.isCorrect ? '✓ صحيح' : answer.userAnswer === 'Skipped' ? 'تخطي' : '✗ غير صحيح';
            const color = answer.isCorrect ? 'green' : answer.userAnswer === 'Skipped' ? 'gray' : 'red';
            summaryHtml += `
                <li style="margin-bottom: 1rem;">
                    <strong>السؤال ${index + 1}: ${answer.question}</strong><br>
                    <span style="color: ${color};">${status}</span><br>
                    إجابتك: ${answer.userAnswer}<br>
                    الإجابة الصحيحة: ${answer.correctAnswer}<br>
                    الشرح: ${answer.explanation}
                </li>
            `;
        });

        summaryHtml += `
            </ul>
            <button class="btn btn-primary" id="restart-btn">إعادة البدء</button>
        `;

        if (elements.feedbackContent) {
            elements.feedbackContent.innerHTML = summaryHtml;
        }

        if (elements.feedbackModal) {
            elements.feedbackModal.classList.remove('hidden');
            elements.feedbackModal.setAttribute('aria-hidden', 'false');
        }

        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                closeModal();
                startNewExerciseSession();
            });
        }

        if (elements.exerciseSection) {
            elements.exerciseSection.style.display = 'none';
            elements.exerciseSection.setAttribute('aria-hidden', 'true');
        }
    } catch (error) {
        console.error('Error showing session summary:', error);
    }
}

// Close Modal
function closeModal() {
    try {
        if (elements.feedbackModal) {
            elements.feedbackModal.classList.add('hidden');
            elements.feedbackModal.setAttribute('aria-hidden', 'true');
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

// Skip Question
function skipQuestion() {
    try {
        state.currentStreak = 0;
        state.sessionAnswers.push({
            question: state.currentExercise.question[state.currentLanguage],
            userAnswer: 'Skipped',
            isCorrect: false,
            correctAnswer: state.currentExercise.correctAnswer,
            explanation: state.currentExercise.explanation[state.currentLanguage]
        });
        closeModal();
        state.currentQuestionIndex++;
        renderNextQuestion();
        updateUI();
    } catch (error) {
        console.error('Error skipping question:', error);
    }
}

// Show Hint
function showHint() {
    try {
        if (!state.currentExercise) return;

        if (state.hintsUsed >= 3) {
            showFeedbackModal('لقد استخدمت الحد الأقصى من التلميحات لهذا التمرين');
            return;
        }

        state.hintsUsed++;
        state.currentXP = Math.max(0, state.currentXP - 5);
        showFeedbackModal(`تلميح: الكلمة هي ${state.currentExercise.word}`);
        updateUI();
    } catch (error) {
        console.error('Error showing hint:', error);
    }
}

// Update UI
function updateUI() {
    try {
        if (elements.streakCounter) elements.streakCounter.textContent = state.currentStreak;
        if (elements.xpCounter) elements.xpCounter.textContent = state.currentXP;

        const accuracy = state.currentQuestionIndex > 0
            ? Math.round((state.correctAnswers / state.currentQuestionIndex) * 100)
            : 0;
        if (elements.accuracyCount) elements.accuracyCount.textContent = `${accuracy}%`;

        const progress = Math.round((state.currentQuestionIndex / state.questionsPerExercise) * 100);
        if (elements.levelProgress) {
            elements.levelProgress.value = progress;
            if (elements.levelProgress.nextElementSibling) {
                elements.levelProgress.nextElementSibling.textContent = `${progress}%`;
            }
        }

        if (elements.hintBtn && state.translations.ui.hint) {
            elements.hintBtn.textContent = state.translations.ui.hint[state.currentLanguage];
        }
        if (elements.skipBtn && state.translations.ui.skip) {
            elements.skipBtn.textContent = state.translations.ui.skip[state.currentLanguage];
        }
        if (elements.startBtn && state.translations.ui.start) {
            elements.startBtn.textContent = state.translations.ui.start[state.currentLanguage];
        }
        if (elements.nextBtn && state.translations.ui.nextQuestion) {
            elements.nextBtn.textContent = state.translations.ui.nextQuestion[state.currentLanguage];
        }
        if (elements.pronounceBtn && state.translations.ui.pronounce) {
            elements.pronounceBtn.textContent = state.translations.ui.pronounce[state.currentLanguage];
        }
        if (elements.levelDisplay && state.translations.ui.level) {
            elements.levelDisplay.textContent = `${state.translations.ui.level[state.currentLanguage]} ${state.currentLevel}`;
        }
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

// Update Question Counter
function updateQuestionCounter() {
    try {
        const translations = {
            ar: `السؤال ${state.currentQuestionIndex + 1} من ${state.questionsPerExercise}`,
            en: `Question ${state.currentQuestionIndex + 1} of ${state.questionsPerExercise}`,
            ur: `سوال ${state.currentQuestionIndex + 1} میں سے ${state.questionsPerExercise}`
        };
        if (elements.questionCounter) {
            elements.questionCounter.textContent = translations[state.currentLanguage];
        }
    } catch (error) {
        console.error('Error updating question counter:', error);
    }
}

// Show Feedback Modal
function showFeedbackModal(message) {
    try {
        if (elements.feedbackContent) {
            elements.feedbackContent.innerHTML = `<p>${message}</p>`;
        }
        if (elements.feedbackModal) {
            elements.feedbackModal.classList.remove('hidden');
            elements.feedbackModal.setAttribute('aria-hidden', 'false');
        }
    } catch (error) {
        console.error('Error showing feedback modal:', error);
    }
}

// Speak Word
function speakWord() {
    try {
        if (!state.currentExercise?.word) return;

        if (!('speechSynthesis' in window)) {
            showFeedbackModal('النطق غير مدعوم في متصفحك');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(state.currentExercise.word);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.8;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error('Error speaking word:', error);
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', init);