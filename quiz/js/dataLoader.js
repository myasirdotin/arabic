// Data loading utility
export async function loadData() {
    try {
        const [verbsRes, nounsRes, translationsRes] = await Promise.all([
            fetch('data/verbs.json'),
            fetch('data/nouns.json'),
            fetch('data/translations.json')
        ]);
        
        if (!verbsRes.ok || !nounsRes.ok || !translationsRes.ok) {
            throw new Error('Failed to load data');
        }
        
        return {
            verbs: await verbsRes.json(),
            nouns: await nounsRes.json(),
            translations: await translationsRes.json()
        };
    } catch (error) {
        console.error("Error loading data:", error);
        return loadFallbackData();
    }
}

function loadFallbackData() {
    return {
        verbs: {
            "verbs": [
                {
                    "arabic": "كَتَبَ",
                    "root": "ك-ت-ب",
                    "translation": {
                        "en": "to write",
                        "ur": "لکھنا",
                        "ar": "يكتب"
                    },
                    "conjugations": {
                        "past": {
                            "masculine": {
                                "singular": "كَتَبَ",
                                "dual": "كَتَبَا",
                                "plural": "كَتَبُوا"
                            },
                            "feminine": {
                                "singular": "كَتَبَتْ",
                                "dual": "كَتَبَتَا",
                                "plural": "كَتَبْنَ"
                            }
                        },
                        "present": {
                            "masculine": {
                                "singular": "يَكْتُبُ",
                                "dual": "يَكْتُبَانِ",
                                "plural": "يَكْتُبُونَ"
                            },
                            "feminine": {
                                "singular": "تَكْتُبُ",
                                "dual": "تَكْتُبَانِ",
                                "plural": "يَكْتُبْنَ"
                            }
                        },
                        "future": {
                            "masculine": {
                                "singular": "سَيَكْتُبُ",
                                "dual": "سَيَكْتُبَانِ",
                                "plural": "سَيَكْتُبُونَ"
                            },
                            "feminine": {
                                "singular": "سَتَكْتُبُ",
                                "dual": "سَتَكْتُبَانِ",
                                "plural": "سَيَكْتُبْنَ"
                            }
                        }
                    }
                }
            ]
        },
        nouns: {
            "nouns": [
                {
                    "arabic": "كِتَاب",
                    "translation": {
                        "en": "book",
                        "ur": "کتاب",
                        "ar": "كتاب"
                    },
                    "gender": "masculine",
                    "conjugations": {
                        "singular": {
                            "nominative": "كِتَابٌ",
                            "accusative": "كِتَابًا",
                            "genitive": "كِتَابٍ"
                        },
                        "dual": {
                            "nominative": "كِتَابَانِ",
                            "accusative": "كِتَابَيْنِ",
                            "genitive": "كِتَابَيْنِ"
                        },
                        "plural": {
                            "nominative": "كُتُبٌ",
                            "accusative": "كُتُبًا",
                            "genitive": "كُتُبٍ"
                        }
                    }
                }
            ]
        },
        translations: {
            "ui": {
                "level": {
                    "ar": "المستوى",
                    "en": "Level",
                    "ur": "لیول"
                },
                "nextExercise": {
                    "ar": "التمرين التالي",
                    "en": "Next Exercise",
                    "ur": "اگلا مشق"
                },
                "practice": {
                    "ar": "تمارين",
                    "en": "Practice",
                    "ur": "مشق"
                },
                "progress": {
                    "ar": "تقدمي",
                    "en": "Progress",
                    "ur": "ترقی"
                },
                "rewards": {
                    "ar": "جوائز",
                    "en": "Rewards",
                    "ur": "انعامات"
                },
                "hint": {
                    "ar": "تلميح",
                    "en": "Hint",
                    "ur": "اشارہ"
                }
            }
        }
    };
}