// Quiz Data - Expanded with more questions
const quizData = {
    basic: [
      {
        question: "How do you say 'I write' in Arabic?",
        options: ["أَكْتُبُ", "يَكْتُبُ", "تَكْتُبُ", "نَكْتُبُ"],
        answer: "أَكْتُبُ",
        hint: "First person singular present tense of 'to write' (kataba)"
      },
      {
        question: "What is the Arabic for 'he reads'?",
        options: ["أَقْرَأُ", "يَقْرَأُ", "تَقْرَأُ", "نَقْرَأُ"],
        answer: "يَقْرَأُ",
        hint: "Third person masculine singular present tense of 'to read' (qara'a)"
      },
      {
        question: "How do you say 'you (f) drink' in Arabic?",
        options: ["أَشْرَبُ", "يَشْرَبُ", "تَشْرَبِينَ", "نَشْرَبُ"],
        answer: "تَشْرَبِينَ",
        hint: "Second person feminine singular present tense of 'to drink' (shariba)"
      },
      {
        question: "How do you say 'she sleeps' in Arabic?",
        options: ["أَنَامُ", "يَنَامُ", "تَنَامُ", "نَنَامُ"],
        answer: "تَنَامُ",
        hint: "Third person feminine singular present tense of 'to sleep' (nāma)"
      },
      {
        question: "What is the Arabic for 'we eat'?",
        options: ["نَأْكُلُ", "يَأْكُلُ", "تَأْكُلُ", "أَأْكُلُ"],
        answer: "نَأْكُلُ",
        hint: "First person plural present tense of 'to eat' (akala)"
      }
    ],
    intermediate: [
      {
        question: "What is the Arabic for 'we went'?",
        options: ["ذَهَبْتُ", "ذَهَبَ", "ذَهَبْتُمْ", "ذَهَبْنَا"],
        answer: "ذَهَبْنَا",
        hint: "First person plural past tense of 'to go' (dhahaba)"
      },
      {
        question: "How do you say 'they (f) understood' in Arabic?",
        options: ["فَهِمْنَ", "فَهِمُوا", "فَهِمْتِ", "فَهِمْتُ"],
        answer: "فَهِمْنَ",
        hint: "Third person feminine plural past tense of 'to understand' (fahima)"
      },
      {
        question: "What is the Arabic for 'you (m) will write'?",
        options: ["سَتَكْتُبُ", "سَأَكْتُبُ", "سَيَكْتُبُ", "سَنَكْتُبُ"],
        answer: "سَتَكْتُبُ",
        hint: "Second person masculine singular future tense of 'to write' (kataba)"
      },
      {
        question: "How do you say 'I spoke' in Arabic?",
        options: ["تَكَلَّمْتُ", "تَكَلَّمَ", "تَكَلَّمْتُمْ", "تَكَلَّمْنَا"],
        answer: "تَكَلَّمْتُ",
        hint: "First person singular past tense of 'to speak' (takallama)"
      },
      {
        question: "What is the Arabic for 'she studied'?",
        options: ["دَرَسَتْ", "دَرَسْتُ", "دَرَسُوا", "دَرَسْنَا"],
        answer: "دَرَسَتْ",
        hint: "Third person feminine singular past tense of 'to study' (darasa)"
      }
    ],
    advanced: [
      {
        question: "How do you say 'I was writing' in Arabic?",
        options: ["كُنْتُ أَكْتُبُ", "كَتَبْتُ", "سَأَكْتُبُ", "أَكْتُبُ"],
        answer: "كُنْتُ أَكْتُبُ",
        hint: "First person singular past continuous of 'to write'"
      },
      {
        question: "What is the Arabic for 'they have eaten'?",
        options: ["يَأْكُلُونَ", "أَكَلُوا", "قَدْ أَكَلُوا", "سَيَأْكُلُونَ"],
        answer: "قَدْ أَكَلُوا",
        hint: "Third person plural present perfect of 'to eat' (akala)"
      },
      {
        question: "How do you say 'you (pl) had gone' in Arabic?",
        options: ["ذَهَبْتُمْ", "كُنْتُمْ ذَهَبْتُمْ", "سَتَذْهَبُونَ", "تَذْهَبُونَ"],
        answer: "كُنْتُمْ ذَهَبْتُمْ",
        hint: "Second person plural past perfect of 'to go' (dhahaba)"
      },
      {
        question: "How do you say 'we will have studied' in Arabic?",
        options: ["سَنَكُونُ دَرَسْنَا", "قَدْ دَرَسْنَا", "كُنَّا دَرَسْنَا", "سَنَدْرُسُ"],
        answer: "سَنَكُونُ دَرَسْنَا",
        hint: "First person plural future perfect of 'to study' (darasa)"
      },
      {
        question: "What is the Arabic for 'they (m) were being taught'?",
        options: ["يُعَلَّمُونَ", "كَانُوا يُعَلَّمُونَ", "عَلَّمُوا", "سَيُعَلَّمُونَ"],
        answer: "كَانُوا يُعَلَّمُونَ",
        hint: "Third person masculine plural past continuous passive of 'to teach' (ʿallama)"
      }
    ]
  };
  
  // DOM Elements
  const elements = {
    quizIntro: document.getElementById('quiz-intro'),
    quizForm: document.getElementById('quiz-form'),
    quizResult: document.getElementById('quiz-result'),
    questionContainer: document.getElementById('question-container'),
    feedback: document.getElementById('feedback'),
    progressBar: document.getElementById('progress-bar'),
    questionCounter: document.getElementById('question-counter'),
    timer: document.getElementById('timer'),
    buttons: {
      next: document.getElementById('next-btn'),
      prev: document.getElementById('prev-btn'),
      hint: document.getElementById('hint-btn'),
      reset: document.getElementById('reset-btn'),
      tryAgain: document.getElementById('try-again-btn'),
      reviewAnswers: document.getElementById('review-answers-btn'),
      openModal: document.getElementById('open-difficulty-modal'),
      closeModal: document.querySelector('.modal-close-btn')
    },
    modal: document.getElementById('difficulty-modal'),
    difficultyButtons: document.querySelectorAll('.difficulty-btn'),
    score: document.getElementById('score'),
    timeDisplay: document.getElementById('time-display'),
    correctAnswers: document.getElementById('correct-answers'),
    performanceFeedback: document.getElementById('performance-feedback')
  };
  
  // Quiz State
  const state = {
    currentQuestionIndex: 0,
    score: 0,
    timer: 0,
    timerInterval: null,
    selectedAnswers: [],
    hintsUsed: [],
    currentQuestions: [],
    quizDifficulty: ''
  };
  
  // Utility Functions
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Timer Management
  function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      state.timer++;
      elements.timer.textContent = `Time: ${formatTime(state.timer)}`;
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(state.timerInterval);
  }
  
  // UI Rendering
  function renderQuestion() {
    const question = state.currentQuestions[state.currentQuestionIndex];
    const progress = ((state.currentQuestionIndex + 1) / state.currentQuestions.length) * 100;
  
    // Update progress
    elements.progressBar.style.width = `${progress}%`;
    elements.progressBar.setAttribute('aria-valuenow', progress);
    elements.questionCounter.textContent = `Question ${state.currentQuestionIndex + 1} of ${state.currentQuestions.length}`;
  
    // Render question and options
    elements.questionContainer.innerHTML = `
      <div class="question">${question.question}</div>
      <div class="answer-options">
        ${question.options.map((option, index) => `
          <button class="answer-btn ${state.selectedAnswers[state.currentQuestionIndex] === index ? 'selected' : ''}" 
                  data-index="${index}" aria-label="Option ${index + 1}: ${option}">
            <span class="arabic-text">${option}</span>
          </button>
        `).join('')}
      </div>
    `;
  
    // Add answer button listeners
    document.querySelectorAll('.answer-btn').forEach(btn => btn.addEventListener('click', handleAnswerSelection));
  
    // Update navigation
    elements.buttons.prev.disabled = state.currentQuestionIndex === 0;
    elements.buttons.next.textContent = state.currentQuestionIndex === state.currentQuestions.length - 1 ? 'Submit' : 'Next →';
    elements.feedback.classList.remove('show', 'correct', 'incorrect');
  }
  
  // Event Handlers
  function handleAnswerSelection(e) {
    const button = e.currentTarget;
    const answerIndex = parseInt(button.dataset.index);
    const question = state.currentQuestions[state.currentQuestionIndex];
  
    state.selectedAnswers[state.currentQuestionIndex] = answerIndex;
    document.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  
    const isCorrect = question.options[answerIndex] === question.answer;
    elements.feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect. Try again!';
    elements.feedback.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
  }
  
  function showHint() {
    const question = state.currentQuestions[state.currentQuestionIndex];
    state.hintsUsed[state.currentQuestionIndex] = true;
    elements.feedback.textContent = `Hint: ${question.hint}`;
    elements.feedback.className = 'feedback show';
  }
  
  function nextQuestion() {
    if (state.selectedAnswers[state.currentQuestionIndex] === null) {
      elements.feedback.textContent = 'Please select an answer before continuing.';
      elements.feedback.className = 'feedback show';
      return;
    }
  
    if (state.currentQuestionIndex < state.currentQuestions.length - 1) {
      state.currentQuestionIndex++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }
  
  function prevQuestion() {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderQuestion();
    }
  }
  
  function resetQuiz() {
    if (confirm('Are you sure you want to reset the quiz? Your progress will be lost.')) {
      initializeQuiz(state.quizDifficulty);
    }
  }
  
  function finishQuiz() {
    if (state.selectedAnswers.includes(null)) {
      elements.feedback.textContent = 'Please answer all questions before submitting.';
      elements.feedback.className = 'feedback show';
      return;
    }
  
    stopTimer();
    state.score = state.currentQuestions.reduce((total, question, index) => {
      return total + (question.options[state.selectedAnswers[index]] === question.answer ? 1 : 0);
    }, 0);
  
    const percentage = Math.round((state.score / state.currentQuestions.length) * 100);
  
    // Update results
    elements.score.textContent = `${percentage}%`;
    elements.correctAnswers.textContent = `${state.score}/${state.currentQuestions.length}`;
    elements.timeDisplay.textContent = formatTime(state.timer);
  
    // Performance feedback
    let feedback = '<h3>Your Performance</h3><ul>';
    if (percentage >= 80) {
      feedback += '<li>Excellent work! You have a strong understanding of Arabic verb conjugations.</li>';
    } else if (percentage >= 60) {
      feedback += '<li>Good job! You have a decent grasp of Arabic verbs but could use more practice.</li>';
    } else {
      feedback += '<li>Keep practicing! Review the verbs you missed and try again.</li>';
    }
  
    feedback += `<li>Hints used: ${state.hintsUsed.filter(h => h).length}</li>`;
    feedback += '<li>Focus on these areas for improvement:</li><ul>';
  
    state.currentQuestions.forEach((question, index) => {
      if (question.options[state.selectedAnswers[index]] !== question.answer) {
        feedback += `
          <li>
            ${question.question}<br>
            Your answer: <span class="arabic-text">${state.selectedAnswers[index] !== null ? question.options[state.selectedAnswers[index]] : 'None'}</span><br>
            Correct answer: <span class="arabic-text">${question.answer}</span>
          </li>`;
      }
    });
  
    feedback += '</ul></ul>';
    elements.performanceFeedback.innerHTML = feedback;
  
    elements.quizForm.hidden = true;
    elements.quizResult.hidden = false;
  }
  
  function reviewAnswers() {
    elements.quizResult.hidden = true;
    elements.quizForm.hidden = false;
    elements.questionContainer.innerHTML = `
      <h2>Review Your Answers</h2>
      <ul class="review-list">
        ${state.currentQuestions.map((question, index) => `
          <li>
            <strong>${question.question}</strong><br>
            Your answer: <span class="arabic-text">${state.selectedAnswers[index] !== null ? question.options[state.selectedAnswers[index]] : 'None'}</span><br>
            Correct answer: <span class="arabic-text">${question.answer}</span><br>
            Hint: ${question.hint}
          </li>
        `).join('')}
      </ul>
      <button class="nav-btn primary-btn" id="back-to-results">Back to Results</button>
    `;
    document.getElementById('back-to-results').addEventListener('click', () => {
      elements.quizForm.hidden = true;
      elements.quizResult.hidden = false;
    });
  }
  
  // Quiz Initialization
  function initializeQuiz(difficulty) {
    if (!quizData[difficulty] && difficulty !== 'all') {
      console.error('Invalid difficulty level:', difficulty);
      elements.feedback.textContent = 'Error: Invalid difficulty level.';
      elements.feedback.className = 'feedback show';
      return;
    }
  
    state.quizDifficulty = difficulty;
    state.currentQuestions = difficulty === 'all' ?
      [...quizData.basic, ...quizData.intermediate, ...quizData.advanced] :
      [...quizData[difficulty]];
  
    if (state.currentQuestions.length === 0) {
      console.error('No questions available for difficulty:', difficulty);
      elements.feedback.textContent = 'Error: No questions available.';
      elements.feedback.className = 'feedback show';
      return;
    }
  
    state.currentQuestions = shuffleArray(state.currentQuestions);
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.timer = 0;
    state.selectedAnswers = Array(state.currentQuestions.length).fill(null);
    state.hintsUsed = Array(state.currentQuestions.length).fill(false);
  
    elements.quizIntro.hidden = true;
    elements.quizForm.hidden = false;
    startTimer();
    renderQuestion();
  }
  
  // Modal and Event Setup
  document.addEventListener('DOMContentLoaded', () => {
    // Modal event listeners
    elements.buttons.openModal.addEventListener('click', () => {
      elements.modal.showModal();
      elements.difficultyButtons[0].focus();
    });
  
    elements.buttons.closeModal.addEventListener('click', () => {
      elements.modal.close();
      elements.buttons.openModal.focus();
    });
  
    elements.modal.addEventListener('click', (e) => {
      const rect = elements.modal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        elements.modal.close();
        elements.buttons.openModal.focus();
      }
    });
  
    elements.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        elements.modal.close();
        elements.buttons.openModal.focus();
      }
    });
  
    elements.difficultyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const difficulty = button.dataset.difficulty;
        elements.modal.close();
        initializeQuiz(difficulty);
      });
    });
  
    // Quiz button listeners
    elements.buttons.next.addEventListener('click', nextQuestion);
    elements.buttons.prev.addEventListener('click', prevQuestion);
    elements.buttons.hint.addEventListener('click', showHint);
    elements.buttons.reset.addEventListener('click', resetQuiz);
    elements.buttons.tryAgain.addEventListener('click', () => {
      elements.quizResult.hidden = true;
      initializeQuiz(state.quizDifficulty);
    });
    elements.buttons.reviewAnswers.addEventListener('click', reviewAnswers);
  });