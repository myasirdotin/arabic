
// Quiz Application for Arabic Verb Conjugation
        // --- DATA MODULE ---
        const pronouns = [
            { key: "huwa", en: "He", ar: "هو", ur: "وہ (مذکر)", person: 3, number: "singular", gender: "masculine" },
            { key: "huma_m", en: "They (2 m.)", ar: "هما", ur: "وہ دو (مذکر)", person: 3, number: "dual", gender: "masculine" },
            { key: "hum", en: "They (pl. m.)", ar: "هم", ur: "وہ سب (مذکر)", person: 3, number: "plural", gender: "masculine" },
            { key: "hiya", en: "She", ar: "هي", ur: "وہ (مونث)", person: 3, number: "singular", gender: "feminine" },
            { key: "huma_f", en: "They (2 f.)", ar: "هما", ur: "وہ دو (مونث)", person: 3, number: "dual", gender: "feminine" },
            { key: "hunna", en: "They (pl. f.)", ar: "هن", ur: "وہ سب (مونث)", person: 3, number: "plural", gender: "feminine" },
            { key: "anta", en: "You (m.)", ar: "أنتَ", ur: "تم (مذکر)", person: 2, number: "singular", gender: "masculine" },
            { key: "antuma", en: "You (2 m/f)", ar: "أنتما", ur: "تم دو", person: 2, number: "dual", gender: "any" },
            { key: "antum", en: "You (pl. m.)", ar: "أنتم", ur: "تم سب (مذکر)", person: 2, number: "plural", gender: "masculine" },
            { key: "anti", en: "You (f.)", ar: "أنتِ", ur: "تم (مونث)", person: 2, number: "singular", gender: "feminine" },
            { key: "antunna", en: "You (pl. f.)", ar: "أنتنّ", ur: "تم سب (مونث)", person: 2, number: "plural", gender: "feminine" },
            { key: "ana", en: "I", ar: "أنا", ur: "میں", person: 1, number: "singular", gender: "any" },
            { key: "nahnu", en: "We", ar: "نحن", ur: "ہم", person: 1, number: "plural", gender: "any" }
        ];

        const tensesData = [
            { key: "past", en: "Past (الماضي)", ar: "الماضي", ur: "ماضی" },
            { key: "present", en: "Present (المضارع)", ar: "المضارع", ur: "مضارع" },
            { key: "imperative", en: "Imperative (الأمر)", ar: "الأمر", ur: "امر", secondPersonOnly: true }
        ];

        const conjugationsData = {
            // ... (Existing verbs: كتب, ذهب, أكل, شرب, درس, عمل, قرأ, بحث, فهم, فتح)
            // Keep existing data here, I'm adding one irregular example below
             "كتب": {
                "meaning_en": "to write", "meaning_ar": "الكتابة", "meaning_ur": "لکھنا", "type": "sound",
                "past": ["كتب", "كتبا", "كتبوا", "كتبت", "كتبتا", "كتبن", "كتبتَ", "كتبتما", "كتبتم", "كتبتِ", "كتبتنّ", "كتبتُ", "كتبنا"],
                "present": ["يكتبُ", "يكتبانِ", "يكتبونَ", "تكتبُ", "تكتبانِ", "يكتبْنَ", "تكتبُ", "تكتبانِ", "تكتبونَ", "تكتبينَ", "تكتبْنَ", "أكتبُ", "نكتبُ"],
                "imperative": [null, null, null, null, null, null, "اكتبْ", "اكتبا", "اكتبوا", "اكتبي", "اكتبنّ", null, null],
                "rule_key": "sound_verb_general",
                "example_sentences": {
                    "past_huwa": { "ar": "هو كتب الدرس.", "en": "He wrote the lesson." },
                    "present_ana": { "ar": "أنا أكتب رسالة.", "en": "I am writing a letter." }
                }
            },
            "ذهب": {
                "meaning_en": "to go", "meaning_ar": "الذهاب", "meaning_ur": "جانا", "type": "sound",
                "past": ["ذهب", "ذهبا", "ذهبوا", "ذهبت", "ذهبتا", "ذهبن", "ذهبتَ", "ذهبتما", "ذهبتم", "ذهبتِ", "ذهبتنّ", "ذهبتُ", "ذهبنا"],
                "present": ["يذهبُ", "يذهبانِ", "يذهبونَ", "تذهبُ", "تذهبانِ", "يذهبنَ", "تذهبُ", "تذهبانِ", "تذهبونَ", "تذهبينَ", "تذهبنَ", "أذهبُ", "نذهبُ"],
                "imperative": [null, null, null, null, null, null, "اذهبْ", "اذهبا", "اذهبوا", "اذهبي", "اذهبنَ", null, null]
            },
             "أكل": {
                "meaning_en": "to eat", "meaning_ar": "الأكل", "meaning_ur": "کھانا", "type": "hamzated_first",
                "past": ["أكل", "أكلا", "أكلوا", "أكلت", "أكلتا", "أكلن", "أكلتَ", "أكلتما", "أكلتم", "أكلتِ", "أكلتنّ", "أكلتُ", "أكلنا"],
                "present": ["يأكلُ", "يأكلانِ", "يأكلونَ", "تأكلُ", "تأكلانِ", "يأكلْنَ", "تأكلُ", "تأكلانِ", "تأكلونَ", "تأكلينَ", "تأكلْنَ", "آكلُ", "نأكلُ"], // Note: آكلُ for ana
                "imperative": [null, null, null, null, null, null, "كُلْ", "كُلا", "كُلُوا", "كُلِي", "كُلْنَ", null, null]
            },
             "شرب": {
                "meaning_en": "to drink", "meaning_ar": "الشرب", "meaning_ur": "پینا", "type": "sound",
                "past": ["شرب", "شربا", "شربوا", "شربت", "شربتا", "شربن", "شربتَ", "شربتما", "شربتم", "شربتِ", "شربتنّ", "شربتُ", "شربنا"],
                "present": ["يشربُ", "يشربانِ", "يشربون", "تشربُ", "تشربانِ", "يشربنَ", "تشربُ", "تشربانِ", "تشربون", "تشربينَ", "تشربنَ", "أشربُ", "نشربُ"],
                "imperative": [null, null, null, null, null, null, "اشربْ", "اشربا", "اشربوا", "اشربي", "اشربنَ", null, null]
            },
            "درس": {
                "meaning_en": "to study", "meaning_ar": "الدراسة", "meaning_ur": "پڑھنا", "type": "sound",
                "past": ["درس", "درسا", "درسوا", "درست", "درستا", "درسن", "درستَ", "درستما", "درستم", "درستِ", "درستنّ", "درستُ", "درسنا"],
                "present": ["يدرسُ", "يدرسانِ", "يدرسونَ", "تدرسُ", "تدرسانِ", "يدرسْنَ", "تدرسُ", "تدرسانِ", "تدرسونَ", "تدرسينَ", "تدرسْنَ", "أدرسُ", "ندرسُ"],
                "imperative": [null, null, null, null, null, null, "ادرسْ", "ادرسا", "ادرسوا", "ادرسي", "ادرسنَ", null, null]
            },
            "عمل": {
                "meaning_en": "to work", "meaning_ar": "العمل", "meaning_ur": "کام کرنا", "type": "sound",
                "past": ["عمل", "عملا", "عملوا", "عملت", "عملتا", "عملن", "عملتَ", "عملتما", "عملتم", "عملتِ", "عملتنّ", "عملتُ", "عملنا"],
                "present": ["يعملُ", "يعملانِ", "يعملونَ", "تعملُ", "تعملانِ", "يعملْنَ", "تعملُ", "تعملانِ", "تعملونَ", "تعملينَ", "تعملْنَ", "أعملُ", "نعملُ"],
                "imperative": [null, null, null, null, null, null, "اعملْ", "اعملا", "اعملوا", "اعملي", "اعملنَ", null, null]
            },
            "قرأ": {
                "meaning_en": "to read", "meaning_ar": "القراءة", "meaning_ur": "پڑھنا", "type": "hamzated_last",
                "past": ["قرأ", "قرآ", "قرؤوا", "قرأت", "قرأتا", "قرأن", "قرأتَ", "قرأتما", "قرأتم", "قرأتِ", "قرأتنّ", "قرأتُ", "قرأنا"],
                "present": ["يقرأُ", "يقرآنِ", "يقرؤونَ", "تقرأُ", "تقرآنِ", "يقرأنَ", "تقرأُ", "تقرآنِ", "تقرؤونَ", "تقرئينَ", "تقرأنَ", "أقرأُ", "نقرأُ"],
                "imperative": [null, null, null, null, null, null, "اقرأْ", "اقرأا", "اقرؤوا", "اقرأي", "اقرأنَ", null, null]
            },
            "بحث": {
                "meaning_en": "to search", "meaning_ar": "البحث", "meaning_ur": "تلاش کرنا", "type": "sound",
                "past": ["بحث", "بحثا", "بحثوا", "بحثَت", "بحثتا", "بحثن", "بحثْتَ", "بحثتما", "بحثتم", "بحثْتِ", "بحثتنّ", "بحثْتُ", "بحثنا"],
                "present": ["يبحثُ", "يبحثانِ", "يبحثونَ", "تبحثُ", "تبحثانِ", "يبحثْنَ", "تبحثُ", "تبحثانِ", "تبحثونَ", "تبحثينَ", "تبحثْنَ", "أبحثُ", "نبحثُ"],
                "imperative": [null, null, null, null, null, null, "ابحثْ", "ابحثا", "ابحثوا", "ابحثي", "ابحثنَ", null, null]
            },
            "فهم": {
                "meaning_en": "to understand", "meaning_ar": "الفهم", "meaning_ur": "سمجھنا", "type": "sound",
                "past": ["فهم", "فهما", "فهموا", "فهمت", "فهمتا", "فهمن", "فهمتَ", "فهمتما", "فهمتم", "فهمتِ", "فهمتنّ", "فهمتُ", "فهمنا"],
                "present": ["يفهمُ", "يفهمانِ", "يفهمونَ", "تفهمُ", "تفهمانِ", "يفهمْنَ", "تفهمُ", "تفهمانِ", "تفهمونَ", "تفهمينَ", "تفهمْنَ", "أفهمُ", "نفهمُ"],
                "imperative": [null, null, null, null, null, null, "افهمْ", "افهما", "افهموا", "افهمي", "افهمنَ", null, null]
            },
            "فتح": {
                "meaning_en": "to open", "meaning_ar": "الفتح", "meaning_ur": "کھولنا", "type": "sound",
                "past": ["فتح", "فتحا", "فتحوا", "فتحت", "فتحتا", "فتحن", "فتحتَ", "فتحتما", "فتحتم", "فتحتِ", "فتحتنّ", "فتحتُ", "فتحنا"],
                "present": ["يفتحُ", "يفتحانِ", "يفتحونَ", "تفتحُ", "تفتحانِ", "يفتحنَ", "تفتحُ", "تفتحانِ", "تفتحونَ", "تفتحينَ", "تفتحنَ", "أفتحُ", "نفتحُ"],
                "imperative": [null, null, null, null, null, null, "افتحْ", "افتحا", "افتحوا", "افتحي", "افتحنَ", null, null]
            },
            "قال": { // Example Hollow Verb (أجوف)
                "meaning_en": "to say", "meaning_ar": "القول", "meaning_ur": "کہنا", "type": "hollow_waw",
                "past": ["قال", "قالا", "قالوا", "قالت", "قالتا", "قُلْنَ", "قلتَ", "قلتما", "قلتم", "قلتِ", "قلتنّ", "قلتُ", "قلنا"],
                "present": ["يقولُ", "يقولانِ", "يقولونَ", "تقولُ", "تقولانِ", "يَقُلْنَ", "تقولُ", "تقولانِ", "تقولونَ", "تقولينَ", "تَقُلْنَ", "أقولُ", "نقولُ"],
                "imperative": [null, null, null, null, null, null, "قُلْ", "قولا", "قولوا", "قولي", "قُلْنَ", null, null],
                "rule_key": "hollow_verb_past_present",
                "example_sentences": {
                    "past_hiya": { "ar": "هي قالت الحقيقة.", "en": "She said the truth." },
                    "present_hum": { "ar": "هم يقولون الشعر.", "en": "They (m. pl.) recite poetry." }
                }
            }
        };

        const conjugationRules = {
            "sound_verb_general": {
                "en": "Sound verbs (like كتب - kataba) follow standard conjugation patterns without weak letters or hamza affecting the root significantly.",
                "ar": "الأفعال الصحيحة (مثل كتب) تتبع أنماط تصريف قياسية دون حروف علة أو همزة تؤثر على الجذر بشكل كبير.",
                "ur": "صحیح افعال (جیسے كتب) بغیر کسی کمزور حرف یا ہمزہ کے جو جڑ کو نمایاں طور پر متاثر کرے، معیاری گردان کے نمونوں کی پیروی کرتے ہیں۔"
            },
            "hollow_verb_past_present": {
                "en": "Hollow verbs (like قال - qāla) have a weak middle root letter that often disappears or changes in conjugation, especially with vowelled suffixes in the past tense (e.g., قلتُ - qultu) and in the jussive/imperative forms of the present tense (e.g. لم يَقُلْ - lam yaqul, قُلْ - qul).",
                "ar": "الأفعال الجوفاء (مثل قال) لها حرف علة في الوسط غالباً ما يختفي أو يتغير في التصريف، خاصة مع الضمائر المتصلة المتحركة في الماضي (مثل قلتُ) وفي صيغ الجزم والأمر في المضارع (مثل لم يَقُلْ، قُلْ).",
                "ur": "اجوف افعال (جیسے قال) میں ایک کمزور درمیانی حرف ہوتا ہے جو گردان میں اکثر غائب یا تبدیل ہو جاتا ہے، خاص طور پر ماضی میں متحرک لاحقوں کے ساتھ (جیسے قلتُ) اور مضارع کے مجزوم/امر صیغوں میں (جیسے لم يَقُلْ، قُلْ)۔"
            },
            // Add more rules for different verb types (hamzated, weak, doubled, etc.)
        };


        const translations = {
            // ... (Keep existing en, ar, ur translations)
            // Add new translations for new UI elements and features
            en: {
                // ... (existing ones)
                appTitle: "Arabic Verb Conjugation Quiz",
                appSubtitle: "Test your knowledge of Arabic verb forms",
                startBtn: "Start Quiz",
                nextBtn: "Next Exercise",
                prevBtn: "Previous",
                submitAnswerBtn: "Submit Answer",
                finishBtn: "Finish",
                resetBtn: "Reset Quiz",
                resultsTitle: "Results",
                settingsTitle: "Quiz Settings",
                progressTitle: "Your Progress",
                overallProgressSummary: "Quizzes Completed: {completed}. Best Score: {bestScore}/{totalQuestions}.",
                currentQuizProgress: "Question {current} of {total}",
                hintText: "Click here for tips",
                tooltipContent: "Select quiz modes and click Start. Answer questions by choosing the correct conjugation.",
                questionPrompt: "Conjugate <span class='arabic'>{verbRoot}</span> ({meaning}) in the {tense} tense for <span class='arabic'>{pronounArabic}</span> ({pronounEnglish}):",
                yourAnswer: "Your answer:",
                correctAnswer: "Correct answer:",
                notAnswered: "Not answered",
                feedback: {
                    correct: "Correct!",
                    incorrect: "Incorrect.",
                    excellent: "Excellent! You're a verb conjugation master!",
                    good: "Good job! Keep practicing!",
                    average: "Not bad! Try again!",
                    poor: "Keep studying! You'll improve!"
                },
                stats: {
                    currentScore: "Current Score",
                    bestScore: "Best Score",
                    quizzesCompleted: "Quizzes Completed"
                },
                tenseOptions: { /* ... */ },
                pronounLabels: pronouns.reduce((acc, p) => { acc[p.key] = `${p.en} (${p.ar})`; return acc; }, {}),
                selectOptionPrompt: "Select the correct conjugation:",
                answerQuestionFirst: "Please select an answer first.",
                showResultsBtn: "Show Results", // Kept for reference, now submitAnswerBtn
                questionText: "Question",
                ofText: "of",
                audioOn: "Sound on",
                audioOff: "Sound off",
                darkModeOn: "Dark mode active",
                darkModeOff: "Dark mode inactive",
                resetConfirm: "Are you sure you want to reset the quiz? Your current progress will be lost.",
                clearHistoryConfirm: "Are you sure you want to clear all score history? This cannot be undone.",
                modalCancel: "Cancel",
                modalConfirm: "Confirm",
                modalTitle: "Confirmation",
                practiceModeLabel: "Practice Mode",
                timerModeLabel: "Timer Mode",
                timerDurationLabel: "{duration}s/question",
                timerExpires: "Time's up!",
                ruleExplanationTitle: "Conjugation Rule:",
                exampleSentenceTitle: "Example Sentence:",
                scoreHistoryTitle: "Score History",
                clearHistoryBtn: "Clear History",
                noHistory: "No scores recorded yet.",
                scoreEntry: "Score: {score}/{total} ({mode})",
                shareApiBtn: "Share",
                copyResultsBtn: "Copy Summary",
                shareMessage: "I scored {score}/{total} on the Arabic Verb Quiz!",
                copiedToClipboard: "Results summary copied to clipboard!",
                quizEndedEarly: "Quiz ended early.",
            },
            ar: {
                appTitle: "اختبار تصريف الأفعال العربية",
                appSubtitle: "اختبر معرفتك بصيغ الأفعال العربية",
                startBtn: "ابدأ الاختبار",
                nextBtn: "التمرين التالي",
                prevBtn: "السابق",
                submitAnswerBtn: "إرسال الإجابة",
                finishBtn: "إنهاء",
                resetBtn: "إعادة الاختبار",
                resultsTitle: "النتائج",
                settingsTitle: "إعدادات الاختبار",
                progressTitle: "تقدمك",
                overallProgressSummary: "الاختبارات المكتملة: {completed}. أفضل نتيجة: {bestScore}/{totalQuestions}.",
                currentQuizProgress: "السؤال {current} من {total}",
                hintText: "اضغط هنا للنصائح",
                tooltipContent: "اختر أوضاع الاختبار وانقر فوق ابدأ. أجب عن الأسئلة باختيار التصريف الصحيح.",
                questionPrompt: "صرف الفعل <span class='arabic'>{verbRoot}</span> ({meaning}) في زمن {tense} للضمير <span class='arabic'>{pronounArabic}</span> ({pronounEnglish}):",
                yourAnswer: "إجابتك:",
                correctAnswer: "الإجابة الصحيحة:",
                notAnswered: "لم تتم الإجابة",
                feedback: {
                    correct: "صحيح!",
                    incorrect: "غير صحيح.",
                    excellent: "ممتاز! أنت محترف في تصريف الأفعال!",
                    good: "عمل جيد! استمر في التدرب!",
                    average: "ليس سيئًا! حاول مرة أخرى!",
                    poor: "استمر في الدراسة! سوف تتحسن!"
                },
                stats: {
                    currentScore: "النتيجة الحالية",
                    bestScore: "أفضل نتيجة",
                    quizzesCompleted: "الاختبارات المكتملة"
                },
                tenseOptions: {
                    past: "الماضي",
                    present: "المضارع",
                    imperative: "الأمر"
                },
                pronounLabels: pronouns.reduce((acc, p) => { acc[p.key] = `${p.ar} (${p.en})`; return acc; }, {}),
                selectOptionPrompt: "اختر التصريف الصحيح:",
                answerQuestionFirst: "الرجاء تحديد إجابة أولاً.",
                showResultsBtn: "عرض النتائج", // Kept for reference if used elsewhere
                questionText: "السؤال",
                ofText: "من",
                audioOn: "الصوت مفعل",
                audioOff: "الصوت معطل",
                darkModeOn: "الوضع الداكن مفعل",
                darkModeOff: "الوضع الداكن معطل",
                resetConfirm: "هل أنت متأكد أنك تريد إعادة الاختبار؟ سيتم فقدان تقدمك الحالي.",
                clearHistoryConfirm: "هل أنت متأكد أنك تريد مسح كل سجل النتائج؟ لا يمكن التراجع عن هذا الإجراء.",
                modalCancel: "إلغاء",
                modalConfirm: "تأكيد",
                modalTitle: "تأكيد",
                practiceModeLabel: "وضع التدريب",
                timerModeLabel: "وضع المؤقت",
                timerDurationLabel: "{duration} ثانية/سؤال",
                timerExpires: "انتهى الوقت!",
                ruleExplanationTitle: "قاعدة التصريف:",
                exampleSentenceTitle: "جملة مثال:",
                scoreHistoryTitle: "سجل النتائج",
                clearHistoryBtn: "مسح السجل",
                noHistory: "لا توجد نتائج مسجلة بعد.",
                scoreEntry: "النتيجة: {score}/{total} ({mode})",
                shareApiBtn: "مشاركة",
                copyResultsBtn: "نسخ الملخص",
                shareMessage: "لقد حصلت على {score}/{total} في اختبار الأفعال العربية!",
                copiedToClipboard: "تم نسخ ملخص النتائج إلى الحافظة!",
                quizEndedEarly: "انتهى الاختبار مبكرًا."


             },
            ur: { 
                 appTitle: "عربی فعل گردان کوئز",
                appSubtitle: "عربی افعال کی صورتوں میں اپنی معلومات جانچیں",
                startBtn: "کوئز شروع کریں",
                nextBtn: "اگلی مشق",
                prevBtn: "پچھلا",
                submitAnswerBtn: "جواب جمع کروائیں",
                finishBtn: "ختم کریں",
                resetBtn: "کوئز دوبارہ ترتیب دیں",
                resultsTitle: "نتائج",
                settingsTitle: "کوئز سیٹنگز",
                progressTitle: "آپ کی پیشرفت",
                overallProgressSummary: "مکمل شدہ کوئز: {completed}. بہترین سکور: {bestScore}/{totalQuestions}.",
                currentQuizProgress: "سوال {current} از {total}",
                hintText: "تجاویز کے لیے یہاں کلک کریں",
                tooltipContent: "کوئز موڈز منتخب کریں اور شروع پر کلک کریں۔ صحیح گردان کا انتخاب کرکے سوالات کے جواب دیں۔",
                questionPrompt: "فعل <span class='arabic'>{verbRoot}</span> ({meaning}) کو {tense} زمانے میں ضمیر <span class='arabic'>{pronounArabic}</span> ({pronounEnglish}) کے لیے گردان کریں:",
                yourAnswer: "آپ کا جواب:",
                correctAnswer: "صحیح جواب:",
                notAnswered: "جواب نہیں دیا گیا",
                feedback: {
                    correct: "درست!",
                    incorrect: "غلط۔",
                    excellent: "بہترین! آپ فعل گردان کے ماہر ہیں!",
                    good: "اچھا کام! مشق جاری رکھیں!",
                    average: "برا نہیں! دوبارہ کوشش کریں!",
                    poor: "پڑھائی جاری رکھیں! آپ بہتر ہو جائیں گے!"
                },
                stats: {
                    currentScore: "موجودہ سکور",
                    bestScore: "بہترین سکور",
                    quizzesCompleted: "مکمل شدہ کوئز"
                },
                tenseOptions: {
                    past: "ماضی",
                    present: "مضارع",
                    imperative: "امر"
                },
                pronounLabels: pronouns.reduce((acc, p) => { acc[p.key] = `${p.ur} (${p.en})`; return acc; }, {}),
                selectOptionPrompt: "صحیح گردان منتخب کریں:",
                answerQuestionFirst: "پہلے ایک جواب منتخب کریں۔",
                showResultsBtn: "نتائج دکھائیں", // Kept for reference if used elsewhere
                questionText: "سوال",
                ofText: "کا",
                audioOn: "آواز آن",
                audioOff: "آواز آف",
                darkModeOn: "ڈارک موڈ فعال",
                darkModeOff: "ڈارک موڈ غیر فعال",
                resetConfirm: "کیا آپ واقعی کوئز دوبارہ ترتیب دینا چاہتے ہیں؟ آپ کی موجودہ پیشرفت ضائع ہو جائے گی۔",
                clearHistoryConfirm: "کیا آپ واقعی تمام سکور ہسٹری صاف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں کیا جا سکتا۔",
                modalCancel: "منسوخ کریں",
                modalConfirm: "تصدیق کریں",
                modalTitle: "تصدیق",
                practiceModeLabel: "پریکٹس موڈ",
                timerModeLabel: "ٹائمر موڈ",
                timerDurationLabel: "{duration} سیکنڈ/سوال",
                timerExpires: "وقت ختم!",
                ruleExplanationTitle: "گردان کا اصول:",
                exampleSentenceTitle: "مثالی جملہ:",
                scoreHistoryTitle: "سکور ہسٹری",
                clearHistoryBtn: "ہسٹری صاف کریں",
                noHistory: "ابھی تک کوئی سکور ریکارڈ نہیں ہوا۔",
                scoreEntry: "سکور: {score}/{total} ({mode})",
                shareApiBtn: "شیئر کریں",
                copyResultsBtn: "خلاصہ کاپی کریں",
                shareMessage: "میں نے عربی فعل کوئز میں {score}/{total} سکور کیا!",
                copiedToClipboard: "نتائج کا خلاصہ کلپ بورڈ پر کاپی ہو گیا!",
                quizEndedEarly: "کوئز جلد ختم ہو گیا۔"


             }
        };
         // Helper to get deep translation (e.g., feedback.correct)
        function getTranslation(key, lang = currentLanguage) {
            const keys = key.split('.');
            let result = translations[lang];
            for (const k of keys) {
                result = result[k];
                if (result === undefined) return key; // Fallback to key if not found
            }
            return result;
        }


        // --- STATE MODULE ---
        let currentLanguage = 'en';
        let currentQuestionIndex = 0;
        let currentScore = 0;
        let quizData = []; // Holds questions for the current quiz
        let userAnswers = []; // To store user's answers for previous button & results [{ questionIndex, userAnswer, isCorrect }]
        let questionsAnsweredStates = []; // To track if a question has been attempted/revealed

        let quizStarted = false;
        let quizCompleted = false;
        let audioEnabled = true;
        let isDarkMode = false;
        let isPracticeMode = false;
        let isTimerMode = false;
        let timerId = null;
        let timeLeft = 0;
        const TIMER_DURATION_PER_QUESTION = 60; // seconds

        const DEFAULT_TOTAL_QUESTIONS = 14;
        let totalQuestionsInCurrentQuiz = DEFAULT_TOTAL_QUESTIONS;

        // localStorage keys
        const LS_BEST_SCORE = 'arabicQuiz_bestScore';
        const LS_TOTAL_QUIZZES = 'arabicQuiz_totalQuizzes';
        const LS_DARK_MODE = 'arabicQuiz_darkMode';
        const LS_LANGUAGE = 'arabicQuiz_language';
        const LS_SCORE_HISTORY = 'arabicQuiz_scoreHistory';


        // --- DOM ELEMENTS CACHE ---
        let dom = {}; // Object to hold all cached DOM elements

        function cacheDomElements() {
            dom.skipLink = document.querySelector('.skip-link');
            dom.appTitle = document.getElementById('app-title');
            dom.appSubtitle = document.getElementById('app-subtitle');
            dom.langButtons = document.querySelectorAll('.language-switcher .lang-btn');
            dom.darkModeBtn = document.getElementById('dark-mode-btn');
            dom.darkModeStatusText = document.getElementById('dark-mode-status-text');
            dom.body = document.body;

            dom.settingsTitle = document.getElementById('settings-title');
            dom.practiceModeToggle = document.getElementById('practice-mode-toggle');
            dom.practiceModeLabel = document.getElementById('practice-mode-label');
            dom.timerModeToggle = document.getElementById('timer-mode-toggle');
            dom.timerModeLabel = document.getElementById('timer-mode-label');
            dom.timerDurationLabel = document.getElementById('timer-duration-label');
            dom.overallProgressContainer = document.getElementById('overall-progress-container');
            dom.progressTitle = document.getElementById('progress-title');
            dom.progressSummary = document.getElementById('progress-summary');
            dom.scoreHistoryContainer = document.getElementById('scoreHistoryContainer');
            dom.scoreHistoryTitle = document.getElementById('score-history-title');
            dom.scoreHistoryList = document.getElementById('score-history-list');
            dom.clearHistoryBtn = document.getElementById('clear-history-btn');

            dom.hintText = document.getElementById('hint-text');
            dom.tooltipContent = document.getElementById('tooltip-content');
            dom.audioControls = document.querySelector('.audio-controls');
            dom.muteBtn = document.getElementById('mute-btn');
            dom.audioStatus = document.getElementById('audio-status');

            dom.startBtn = document.getElementById('start-btn');
            dom.startBtnText = document.getElementById('start-btn-text');
            dom.resetBtn = document.getElementById('reset-btn');
            dom.resetBtnText = document.getElementById('reset-btn-text');

            dom.quizSetupCard = document.getElementById('quiz-setup-card');
            dom.quizArea = document.getElementById('quiz-area');
            dom.quizTimerDisplay = document.getElementById('quiz-timer-display');
            dom.quizProgressIndicator = document.getElementById('quiz-progress-indicator');
            dom.quizContentWrapper = document.getElementById('quiz-content-wrapper'); // For question HTML
            dom.quizNavigationBtns = document.getElementById('quiz-navigation-btns');
            dom.prevBtn = document.getElementById('prev-btn');
            dom.prevBtnText = document.getElementById('prev-btn-text');
            dom.nextBtn = document.getElementById('next-btn');
            dom.nextBtnText = document.getElementById('next-btn-text');
            dom.submitAnswerBtn = document.getElementById('submit-answer-btn');
            dom.submitAnswerBtnText = document.getElementById('submit-answer-btn-text');
            dom.finishBtn = document.getElementById('finish-btn');
            dom.finishBtnText = document.getElementById('finish-btn-text');


            dom.resultArea = document.getElementById('result-area');
            dom.resultTitleText = document.getElementById('result-title-text');
            dom.resultSummary = document.getElementById('result-summary');
            dom.resultDetails = document.getElementById('result-details');
            dom.shareApiBtn = document.getElementById('share-api-btn');
            dom.shareApiBtnText = document.getElementById('share-api-btn-text');
            dom.copyResultsBtn = document.getElementById('copy-results-btn');
            dom.copyResultsBtnText = document.getElementById('copy-results-btn-text');


            dom.confirmationModal = document.getElementById('confirmation-modal');
            dom.modalTitleText = document.getElementById('modal-title-text'); // For modal title
            dom.modalMessage = document.getElementById('modal-message');
            dom.modalCancelBtn = document.getElementById('modal-cancel-btn');
            dom.modalConfirmBtn = document.getElementById('modal-confirm-btn');

            dom.audioCorrect = document.getElementById('correct-sound');
            dom.audioIncorrect = document.getElementById('incorrect-sound');
            dom.audioComplete = document.getElementById('complete-sound');
            dom.audioTimerTick = document.getElementById('timer-tick-sound'); // Added
        }

        // --- UTILITY FUNCTIONS ---
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function playSound(soundElement) {
            if (audioEnabled && soundElement) {
                if (soundElement.readyState < 2) { // HAVE_NOTHING or HAVE_METADATA
                    soundElement.load();
                }
                soundElement.currentTime = 0;
                soundElement.play().catch(e => {
                    console.error("Error playing sound:", e);
                    // Could show a small non-intrusive message to the user here
                    if (dom.audioStatus) dom.audioStatus.textContent = "Audio Error. Sound disabled.";
                    audioEnabled = false; // Disable further attempts if one fails badly
                    updateMuteButtonUI();
                });
            }
        }

        function loadDataFromLocalStorage() {
            const savedLang = localStorage.getItem(LS_LANGUAGE);
            if (savedLang) currentLanguage = savedLang;

            const savedDarkMode = localStorage.getItem(LS_DARK_MODE);
            isDarkMode = savedDarkMode === 'true';
            if (isDarkMode) dom.body.classList.add('dark-mode');

            updateOverallProgress(); // Will use localStorage implicitly
        }

        function updateOverallProgress() {
            let bestScore = parseInt(localStorage.getItem(LS_BEST_SCORE)) || 0;
            let totalQuizzes = parseInt(localStorage.getItem(LS_TOTAL_QUIZZES)) || 0;
             if(dom.progressSummary) {
                dom.progressSummary.innerHTML = getTranslation('overallProgressSummary')
                    .replace('{completed}', totalQuizzes)
                    .replace('{bestScore}', bestScore)
                    .replace('{totalQuestions}', DEFAULT_TOTAL_QUESTIONS); // Assuming default for summary
            }
            displayScoreHistory();
        }

        // --- LANGUAGE & THEME ---
        function setLanguage(lang) {
            currentLanguage = lang;
            localStorage.setItem(LS_LANGUAGE, lang);
            const isRtl = ['ar', 'ur'].includes(lang);
            document.documentElement.lang = lang;
            dom.body.dir = isRtl ? 'rtl' : 'ltr';

            dom.langButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.lang === lang);
                button.setAttribute('aria-pressed', button.dataset.lang === lang);
            });
            translateUI();
        }

        function translateUI() {
            // App header
            dom.appTitle.textContent = getTranslation('appTitle');
            dom.appSubtitle.textContent = getTranslation('appSubtitle');
            dom.darkModeBtn.setAttribute('aria-label', getTranslation(isDarkMode ? 'darkModeOn' : 'darkModeOff'));
            dom.darkModeStatusText.textContent = getTranslation(isDarkMode ? 'darkModeOn' : 'darkModeOff');

            // Settings
            dom.settingsTitle.textContent = getTranslation('settingsTitle');
            dom.practiceModeLabel.textContent = getTranslation('practiceModeLabel');
            dom.timerModeLabel.textContent = getTranslation('timerModeLabel');
            dom.timerDurationLabel.textContent = getTranslation('timerDurationLabel').replace('{duration}', TIMER_DURATION_PER_QUESTION);
            dom.progressTitle.textContent = getTranslation('progressTitle');
            updateOverallProgress(); // Re-translate summary
            dom.scoreHistoryTitle.textContent = getTranslation('scoreHistoryTitle');
            dom.clearHistoryBtn.textContent = getTranslation('clearHistoryBtn');


            dom.hintText.textContent = getTranslation('hintText');
            dom.tooltipContent.textContent = getTranslation('tooltipContent');
            updateMuteButtonUI(); // For "Sound on/off" text

            // Main buttons
            dom.startBtnText.textContent = getTranslation('startBtn');
            dom.resetBtnText.textContent = getTranslation('resetBtn');

            // Quiz area (if visible, though usually updated via displayQuestion)
            dom.prevBtnText.textContent = getTranslation('prevBtn');
            dom.nextBtnText.textContent = getTranslation('nextBtn');
            dom.submitAnswerBtnText.textContent = getTranslation('submitAnswerBtn');
            dom.finishBtnText.textContent = getTranslation('finishBtn');

            // Results area
            dom.resultTitleText.textContent = getTranslation('resultsTitle');
            dom.shareApiBtnText.textContent = getTranslation('shareApiBtn');
            dom.copyResultsBtnText.textContent = getTranslation('copyResultsBtn');


            // Modal
            dom.modalTitleText.textContent = getTranslation('modalTitle'); // For the confirmation modal title
            // Modal message set dynamically

            // If quiz is active, re-render current question and results if visible
            if (quizStarted && !quizCompleted) displayQuestionUI(currentQuestionIndex, 'none');
            if (quizCompleted) showResultUI();
        }

        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            dom.body.classList.toggle('dark-mode', isDarkMode);
            localStorage.setItem(LS_DARK_MODE, isDarkMode);
            dom.darkModeBtn.setAttribute('aria-label', getTranslation(isDarkMode ? 'darkModeOn' : 'darkModeOff'));
            dom.darkModeStatusText.textContent = getTranslation(isDarkMode ? 'darkModeOn' : 'darkModeOff');
            // Update icon
            const icon = dom.darkModeBtn.querySelector('i');
            icon.classList.toggle('fa-moon', !isDarkMode);
            icon.classList.toggle('fa-sun', isDarkMode);
        }

        function updateMuteButtonUI() {
            const icon = dom.muteBtn.querySelector('i');
            icon.classList.toggle('fa-volume-up', audioEnabled);
            icon.classList.toggle('fa-volume-mute', !audioEnabled);
            dom.audioStatus.textContent = getTranslation(audioEnabled ? 'audioOn' : 'audioOff');
            dom.muteBtn.setAttribute('aria-pressed', audioEnabled);
            dom.muteBtn.setAttribute('aria-label', getTranslation(audioEnabled ? 'audioOff' : 'audioOn')); // "Toggle sound off/on"
        }

        function toggleMute() {
            audioEnabled = !audioEnabled;
            updateMuteButtonUI();
        }

        // --- QUIZ LOGIC ---
        function generateQuizQuestions() {
            quizData = [];
            userAnswers = [];
            questionsAnsweredStates = [];
            const verbs = Object.keys(conjugationsData);
            let allCombinations = [];

            verbs.forEach(verbRoot => {
                tensesData.forEach(tenseData => {
                    const availablePronouns = tenseData.secondPersonOnly
                        ? pronouns.filter(p => p.person === 2)
                        : pronouns;

                    availablePronouns.forEach(pronoun => {
                        const conjugationIndex = pronouns.findIndex(p => p.key === pronoun.key);
                        const correctAnswer = conjugationsData[verbRoot][tenseData.key]?.[conjugationIndex];

                        if (correctAnswer !== null && correctAnswer !== undefined) {
                            allCombinations.push({
                                verbRoot,
                                tenseKey: tenseData.key,
                                pronounKey: pronoun.key,
                                correctAnswer: correctAnswer,
                                userAnswer: null, // For storing user's selection
                                isCorrect: null  // For storing if the answer was correct
                            });
                        }
                    });
                });
            });

            shuffleArray(allCombinations);

            if (isPracticeMode) {
                totalQuestionsInCurrentQuiz = allCombinations.length > 0 ? allCombinations.length : DEFAULT_TOTAL_QUESTIONS; // Or some large number
                quizData = allCombinations; // Use all available questions for practice
                 if(quizData.length === 0) { // Fallback if no combinations generated
                    console.warn("No questions generated for practice mode. Using default number.");
                    quizData = allCombinations.slice(0, DEFAULT_TOTAL_QUESTIONS); // Should not happen if data is good
                    totalQuestionsInCurrentQuiz = quizData.length;
                }
            } else {
                totalQuestionsInCurrentQuiz = Math.min(DEFAULT_TOTAL_QUESTIONS, allCombinations.length);
                quizData = allCombinations.slice(0, totalQuestionsInCurrentQuiz);
            }


            if (quizData.length === 0) {
                 console.error("Could not generate quiz questions. Check conjugationsData.");
                 alert("Error: Could not generate quiz questions. Please check the data.");
                 return false; // Indicate failure
            }

            quizData.forEach((question, index) => {
                const allConjugationsForTense = conjugationsData[question.verbRoot][question.tenseKey].filter(c => c !== null && c !== undefined);
                const options = new Set();
                options.add(question.correctAnswer);
                while (options.size < 4 && options.size < allConjugationsForTense.length) {
                    const randomIndex = Math.floor(Math.random() * allConjugationsForTense.length);
                    options.add(allConjugationsForTense[randomIndex]);
                }
                question.options = shuffleArray(Array.from(options));
                questionsAnsweredStates[index] = false; // Mark as not yet answered/revealed
            });
            return true; // Indicate success
        }

        function startQuiz() {
            isPracticeMode = dom.practiceModeToggle.checked;
            isTimerMode = dom.timerModeToggle.checked;

            if (!generateQuizQuestions()) return; // Stop if no questions

            currentQuestionIndex = 0;
            currentScore = 0;
            userAnswers = new Array(quizData.length).fill(null); // Reset user answers array
            quizStarted = true;
            quizCompleted = false;

            dom.quizSetupCard.classList.add('hidden');
            dom.resultArea.classList.add('hidden');
            dom.quizArea.classList.remove('hidden');

            updateQuizNavigationButtons();
            displayQuestionUI(currentQuestionIndex, 'none'); // Initial display, no animation direction
        }

        function resetQuizState(fullReset = true) {
            quizStarted = false;
            quizCompleted = false;
            currentQuestionIndex = 0;
            currentScore = 0;
            quizData = [];
            userAnswers = [];
            questionsAnsweredStates = [];

            stopTimer();
            dom.quizTimerDisplay.classList.add('hidden');
            dom.quizArea.classList.add('hidden');
            dom.resultArea.classList.add('hidden');
            dom.quizSetupCard.classList.remove('hidden');

            // Reset button states on setup card
            dom.startBtn.disabled = false;

            if (fullReset) {
                // Could reset practice/timer toggles if desired, or leave them as user set
                // dom.practiceModeToggle.checked = false;
                // dom.timerModeToggle.checked = false;
            }
            updateOverallProgress();
        }

        function checkAnswer() {
            if (questionsAnsweredStates[currentQuestionIndex]) return; // Already answered and revealed

            const selectedOptionInput = dom.quizContentWrapper.querySelector('input[name="answer"]:checked');
            if (!selectedOptionInput && !isTimerMode) { // Allow timer to submit without selection
                alert(getTranslation('answerQuestionFirst'));
                return;
            }

            stopTimer(); // Stop timer for this question once answered

            const questionData = quizData[currentQuestionIndex];
            const userAnswer = selectedOptionInput ? selectedOptionInput.value : null;
            questionData.userAnswer = userAnswer;
            questionData.isCorrect = userAnswer === questionData.correctAnswer;

            if (questionData.isCorrect) {
                if (!isPracticeMode) currentScore++;
                playSound(dom.audioCorrect);
            } else {
                playSound(dom.audioIncorrect);
            }

            questionsAnsweredStates[currentQuestionIndex] = true; // Mark as answered and revealed
            displayQuestionUI(currentQuestionIndex, 'none', true); // Re-render to show feedback
            updateQuizNavigationButtons();
        }

        function recordAnswer(userSelectionValue) {
            // This function is primarily for the "Previous" button to update an answer
            // or if we want to store the answer before revealing correctness (not current flow)
            const questionData = quizData[currentQuestionIndex];
            questionData.userAnswer = userSelectionValue;
            // Do not mark as correct/incorrect here, that's for checkAnswer/reveal
            updateQuizNavigationButtons(); // Enable submit if an option is chosen
        }


        function showNextQuestion() {
            if (currentQuestionIndex < quizData.length - 1) {
                currentQuestionIndex++;
                displayQuestionUI(currentQuestionIndex, 'right');
                updateQuizNavigationButtons();
            } else {
                endQuiz();
            }
        }

        function showPreviousQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestionUI(currentQuestionIndex, 'left');
                updateQuizNavigationButtons();
            }
        }

        function endQuiz(endedEarly = false) {
            quizStarted = false;
            quizCompleted = true;
            stopTimer();

            if (!isPracticeMode) {
                let totalQuizzes = parseInt(localStorage.getItem(LS_TOTAL_QUIZZES)) || 0;
                totalQuizzes++;
                localStorage.setItem(LS_TOTAL_QUIZZES, totalQuizzes.toString());

                let bestScore = parseInt(localStorage.getItem(LS_BEST_SCORE)) || 0;
                if (currentScore > bestScore) {
                    localStorage.setItem(LS_BEST_SCORE, currentScore.toString());
                }
                saveScoreToHistory(currentScore, totalQuestionsInCurrentQuiz, endedEarly ? "Timer Expired" : (isTimerMode ? "Timer" : "Standard"));
            }

            playSound(dom.audioComplete);
            showResultUI();
            updateOverallProgress();

            dom.quizArea.classList.add('hidden');
            dom.resultArea.classList.remove('hidden');
            dom.quizSetupCard.classList.remove('hidden'); // Show setup for new quiz
        }

        // --- TIMER LOGIC ---
        function startTimer() {
            if (!isTimerMode) return;
            timeLeft = TIMER_DURATION_PER_QUESTION;
            dom.quizTimerDisplay.classList.remove('hidden');
            updateTimerDisplay();

            timerId = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                if (timeLeft <= 5 && timeLeft > 0) playSound(dom.audioTimerTick);
                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    timerId = null;
                    dom.quizTimerDisplay.textContent = getTranslation('timerExpires');
                    checkAnswer(); // Auto-submit or mark as incorrect
                    // Potentially auto-advance or show message
                    if (currentQuestionIndex < quizData.length - 1 && quizStarted) {
                         setTimeout(showNextQuestion, 1500); // Give a moment to see feedback
                    } else if (quizStarted) {
                        setTimeout(endQuiz, 1500, true); // End quiz if last question
                    }
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerId);
            timerId = null;
        }

        function updateTimerDisplay() {
            if (dom.quizTimerDisplay) dom.quizTimerDisplay.textContent = `${timeLeft}s`;
        }

        // --- UI UPDATE FUNCTIONS ---
        function displayQuestionUI(index, animationDirection = 'none', showFeedback = false) {
            if (index >= quizData.length || index < 0) return;

            const question = quizData[index];
            const verbData = conjugationsData[question.verbRoot];
            const tenseInfo = tensesData.find(t => t.key === question.tenseKey);
            const pronounInfo = pronouns.find(p => p.key === question.pronounKey);

            const verbMeaning = verbData[`meaning_${currentLanguage}`] || verbData.meaning_en;
            const tenseLabel = tenseInfo[`${currentLanguage}`] || tenseInfo.en;
            const pronounLabelArabic = pronounInfo.ar;
            const pronounLabelEnglish = pronounInfo.en;

            // Update progress indicator
            dom.quizProgressIndicator.textContent = getTranslation('currentQuizProgress')
                .replace('{current}', index + 1)
                .replace('{total}', totalQuestionsInCurrentQuiz);


            // Animation handling
            if (animationDirection === 'left') {
                dom.quizContentWrapper.classList.add('fade-out-left');
            } else if (animationDirection === 'right') {
                dom.quizContentWrapper.classList.add('fade-out-right');
            }

            // Use a short timeout to allow the fade-out animation to play before updating content
            setTimeout(() => {
                let questionHtml = `
                    <div class="quiz-question" role="group" aria-labelledby="question-prompt-${index}">
                        <p class="question-prompt" id="question-prompt-${index}">
                            ${getTranslation('questionPrompt')
                                .replace('{verbRoot}', question.verbRoot)
                                .replace('{meaning}', verbMeaning)
                                .replace('{tense}', tenseLabel)
                                .replace('{pronounArabic}', pronounLabelArabic)
                                .replace('{pronounEnglish}', pronounLabelEnglish)}
                        </p>
                        <div class="options-container">
                `;

                question.options.forEach((option, optIndex) => {
                    const radioId = `q${index}-option${optIndex}`;
                    const isChecked = question.userAnswer === option;
                    const isDisabled = questionsAnsweredStates[index]; // Disable if feedback is shown

                    questionHtml += `
                        <div class="option-item">
                            <input type="radio" id="${radioId}" name="answer" value="${option}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''} aria-labelledby="label-${radioId}">
                            <label for="${radioId}" id="label-${radioId}" class="arabic">${option}</label>
                        </div>
                    `;
                });

                questionHtml += `</div>`; // End options-container

                // Feedback and Educational Content
                if (questionsAnsweredStates[index] || showFeedback) { // If answered or explicitly told to show feedback
                    const feedbackClass = question.isCorrect ? 'correct' : 'incorrect';
                    const feedbackTextKey = question.isCorrect ? 'feedback.correct' : 'feedback.incorrect';
                    let feedbackMessage = getTranslation(feedbackTextKey);
                    if (!question.isCorrect) {
                         feedbackMessage += ` ${getTranslation('correctAnswer')} <span class="arabic">${question.correctAnswer}</span>`;
                    }

                    questionHtml += `<div id="question-feedback-${index}" class="question-feedback ${feedbackClass}" aria-live="polite">${feedbackMessage}</div>`;

                    // Educational content
                    questionHtml += `<div class="educational-content">`;
                    const ruleKey = verbData.rule_key;
                    if (ruleKey && conjugationRules[ruleKey]) {
                        const rule = conjugationRules[ruleKey][currentLanguage] || conjugationRules[ruleKey]['en'];
                        questionHtml += `<h4>${getTranslation('ruleExplanationTitle')}</h4><p>${rule}</p>`;
                    }

                    const exampleKey = `${question.tenseKey}_${question.pronounKey}`; // e.g., past_huwa
                    const exampleSentenceData = verbData.example_sentences?.[exampleKey] || verbData.example_sentences?.[question.tenseKey]?.[question.pronounKey]; // Allow for nested structure
                    if (exampleSentenceData) {
                        const exampleSentence = exampleSentenceData[currentLanguage] || exampleSentenceData['en'];
                        const exampleSentenceArabic = exampleSentenceData['ar'];
                        questionHtml += `<h4>${getTranslation('exampleSentenceTitle')}</h4>
                                         <p class="arabic">${exampleSentenceArabic}</p>
                                         <p><em>(${exampleSentence})</em></p>`;
                    }
                    questionHtml += `</div>`; // End educational-content
                }
                 questionHtml += `</div>`; // End quiz-question
                dom.quizContentWrapper.innerHTML = questionHtml;

                // Apply fade-in animation
                dom.quizContentWrapper.classList.remove('fade-out-left', 'fade-out-right');
                dom.quizContentWrapper.classList.add('fade-in');
                setTimeout(() => dom.quizContentWrapper.classList.remove('fade-in'), 300); // Remove class after animation

                // Add event listeners for radio buttons using event delegation on quizContentWrapper
                // This is handled by the main event listener on quizArea now.

            }, animationDirection !== 'none' ? 250 : 0); // Duration of fade-out

            if (!questionsAnsweredStates[index]) { // If not yet answered
                startTimer(); // Start timer for new question
            }
        }


        function updateQuizNavigationButtons() {
            const questionAnswered = questionsAnsweredStates[currentQuestionIndex];
            const isFirstQuestion = currentQuestionIndex === 0;
            const isLastQuestion = currentQuestionIndex === quizData.length - 1;

            dom.submitAnswerBtn.classList.toggle('hidden', questionAnswered);
            dom.prevBtn.classList.toggle('hidden', isFirstQuestion);
            dom.nextBtn.classList.toggle('hidden', !questionAnswered || isLastQuestion && !isPracticeMode); // Hide next on last Q unless practice
            dom.finishBtn.classList.toggle('hidden', !questionAnswered || (!isLastQuestion && !isPracticeMode) || (isPracticeMode && !isLastQuestion));

            // Enable submit button if an option is selected and question not yet answered
            const selectedOption = dom.quizContentWrapper.querySelector('input[name="answer"]:checked');
            dom.submitAnswerBtn.disabled = !selectedOption && !questionAnswered;

            if (isPracticeMode && isLastQuestion && questionAnswered) {
                dom.nextBtn.classList.remove('hidden'); // Allow "next" to loop or end practice
                dom.finishBtn.classList.remove('hidden'); // Also allow finishing practice
            }
        }


        function showResultUI() {
            dom.quizArea.classList.add('hidden');
            dom.resultArea.classList.remove('hidden');
            dom.resultTitleText.textContent = getTranslation('resultsTitle');

            const scorePercentage = totalQuestionsInCurrentQuiz > 0 ? (currentScore / totalQuestionsInCurrentQuiz) * 100 : 0;
            let feedbackKey = 'feedback.poor';
            if (scorePercentage >= 80) feedbackKey = 'feedback.excellent';
            else if (scorePercentage >= 60) feedbackKey = 'feedback.good';
            else if (scorePercentage >= 40) feedbackKey = 'feedback.average';

            dom.resultSummary.innerHTML = `
                <p class="feedback">${getTranslation('stats.currentScore')}: ${currentScore}/${totalQuestionsInCurrentQuiz}. ${getTranslation(feedbackKey)}</p>
            `;

            let detailsHtml = '';
            quizData.forEach((question, index) => {
                if (!questionsAnsweredStates[index] && !isPracticeMode) return; // Skip unanswered unless practice

                const verbData = conjugationsData[question.verbRoot];
                const tenseInfo = tensesData.find(t => t.key === question.tenseKey);
                const pronounInfo = pronouns.find(p => p.key === question.pronounKey);

                const verbMeaning = verbData[`meaning_${currentLanguage}`] || verbData.meaning_en;
                const tenseLabel = tenseInfo[currentLanguage] || tenseInfo.en;

                detailsHtml += `
                    <div class="result-item ${question.isCorrect ? 'correct' : 'incorrect'}">
                        <p><strong>${getTranslation('questionText')} ${index + 1}:</strong>
                           ${getTranslation('questionPrompt')
                                .replace('{verbRoot}', question.verbRoot)
                                .replace('{meaning}', verbMeaning)
                                .replace('{tense}', tenseLabel)
                                .replace('{pronounArabic}', pronounInfo.ar)
                                .replace('{pronounEnglish}', pronounInfo.en)}
                        </p>
                        <p>${getTranslation('yourAnswer')} <span class="arabic">${question.userAnswer || getTranslation('notAnswered')}</span></p>
                        ${!question.isCorrect ?
                           `<p>${getTranslation('correctAnswer')} <span class="arabic">${question.correctAnswer}</span></p>` : ''
                        }
                    </div>
                `;
            });
            dom.resultDetails.innerHTML = detailsHtml;

            // Share buttons visibility
            dom.shareApiBtn.classList.toggle('hidden', typeof navigator.share === 'undefined');
        }

        // --- SCORE HISTORY ---
        function saveScoreToHistory(score, total, mode) {
            let history = JSON.parse(localStorage.getItem(LS_SCORE_HISTORY)) || [];
            history.unshift({ // Add to the beginning
                score,
                total,
                mode,
                date: new Date().toISOString()
            });
            if (history.length > 20) history = history.slice(0, 20); // Keep last 20 scores
            localStorage.setItem(LS_SCORE_HISTORY, JSON.stringify(history));
        }

        function displayScoreHistory() {
            const history = JSON.parse(localStorage.getItem(LS_SCORE_HISTORY)) || [];
            if (history.length === 0) {
                dom.scoreHistoryList.innerHTML = `<p>${getTranslation('noHistory')}</p>`;
                dom.scoreHistoryContainer.classList.add('hidden');
                return;
            }
            dom.scoreHistoryContainer.classList.remove('hidden');
            let listHtml = '';
            history.forEach(entry => {
                const date = new Date(entry.date);
                listHtml += `
                    <div class="score-entry">
                        ${getTranslation('scoreEntry').replace('{score}', entry.score).replace('{total}', entry.total).replace('{mode}', entry.mode)}
                        <small>${date.toLocaleString(currentLanguage, { dateStyle: 'medium', timeStyle: 'short' })}</small>
                    </div>
                `;
            });
            dom.scoreHistoryList.innerHTML = listHtml;
        }

        function clearScoreHistory() {
            openConfirmationModal(
                getTranslation('clearHistoryConfirm'),
                () => {
                    localStorage.removeItem(LS_SCORE_HISTORY);
                    displayScoreHistory();
                    closeModal();
                }
            );
        }

        // --- MODAL ---
        let confirmActionCallback = null;
        function openConfirmationModal(message, onConfirm) {
            dom.modalMessage.textContent = message;
            confirmActionCallback = onConfirm;
            dom.confirmationModal.style.display = 'block';
            dom.modalCancelBtn.focus();
        }

        function closeModal() {
            dom.confirmationModal.style.display = 'none';
            confirmActionCallback = null;
        }

        function confirmModalAction() {
            if (typeof confirmActionCallback === 'function') {
                confirmActionCallback();
            }
            // closeModal() will be called by the specific action if needed
        }

        // --- SHARE FUNCTIONALITY ---
        async function shareResultsViaApi() {
            const shareData = {
                title: getTranslation('appTitle'),
                text: getTranslation('shareMessage').replace('{score}', currentScore).replace('{total}', totalQuestionsInCurrentQuiz),
                url: window.location.href
            };
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Share failed:', err);
                // Fallback or message if needed
            }
        }

        function copyResultsToClipboard() {
            const resultsText = getTranslation('shareMessage').replace('{score}', currentScore).replace('{total}', totalQuestionsInCurrentQuiz);
            navigator.clipboard.writeText(resultsText).then(() => {
                alert(getTranslation('copiedToClipboard'));
            }).catch(err => {
                console.error('Copy failed:', err);
            });
        }


        // --- EVENT LISTENERS ---
        function setupEventListeners() {
            dom.langButtons.forEach(button => {
                button.addEventListener('click', () => setLanguage(button.dataset.lang));
            });
            dom.darkModeBtn.addEventListener('click', toggleDarkMode);
            dom.muteBtn.addEventListener('click', toggleMute);

            dom.startBtn.addEventListener('click', startQuiz);
            dom.resetBtn.addEventListener('click', () => {
                openConfirmationModal(
                    getTranslation('resetConfirm'),
                    () => { resetQuizState(); closeModal(); }
                );
            });

            dom.quizArea.addEventListener('change', (event) => { // Event delegation for radio buttons
                if (event.target.type === 'radio' && event.target.name === 'answer') {
                    if (!questionsAnsweredStates[currentQuestionIndex]) { // Only record if not yet revealed
                         recordAnswer(event.target.value);
                         updateQuizNavigationButtons(); // Enable submit button
                    }
                }
            });

            dom.submitAnswerBtn.addEventListener('click', checkAnswer);
            dom.nextBtn.addEventListener('click', showNextQuestion);
            dom.prevBtn.addEventListener('click', showPreviousQuestion);
            dom.finishBtn.addEventListener('click', () => endQuiz(false)); // Not ended early by finish button

            dom.modalCancelBtn.addEventListener('click', closeModal);
            dom.modalConfirmBtn.addEventListener('click', confirmModalAction);
            window.addEventListener('click', (event) => {
                if (event.target === dom.confirmationModal) closeModal();
            });
            window.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && dom.confirmationModal.style.display === 'block') {
                    closeModal();
                }
            });

            dom.clearHistoryBtn.addEventListener('click', clearScoreHistory);
            dom.shareApiBtn.addEventListener('click', shareResultsViaApi);
            dom.copyResultsBtn.addEventListener('click', copyResultsToClipboard);

            // Prevent form submission if any part is wrapped in a form (not current, but good practice)
            // document.addEventListener('submit', event => event.preventDefault());
        }


        // --- INITIALIZATION ---
        document.addEventListener('DOMContentLoaded', () => {
            cacheDomElements();
            loadDataFromLocalStorage(); // Load language and dark mode preferences
            updateMuteButtonUI(); // Set initial icon for mute button
            toggleDarkMode(); toggleDarkMode(); // Apply dark mode correctly on load
            setLanguage(currentLanguage); // This will also call translateUI
            setupEventListeners();
            resetQuizState(); // Initial setup of the view
        });

