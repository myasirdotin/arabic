// Quiz Data
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
      }
    ]
  };
  
  // DOM Elements
  const quizForm = document.getElementById('quiz-form');
  const questionContainer = document.getElementById('question-container');
  const feedbackElement = document.getElementById('feedback');
  const progressBar = document.getElementById('progress-bar');
  const questionCounter = document.getElementById('question-counter');
  const timerElement = document.getElementById('timer');
  const nextButton = document.getElementById('next-btn');
  const prevButton = document.getElementById('prev-btn');
  const hintButton = document.getElementById('hint-btn');
  const resetButton = document.getElementById('reset-btn');
  const quizResult = document.getElementById('quiz-result');
  const scoreElement = document.getElementById('score');
  const timeDisplay = document.getElementById('time-display');
  const performanceFeedback = document.getElementById('performance-feedback');
  const tryAgainButton = document.getElementById('try-again-btn');
  const reviewAnswersButton = document.getElementById('review-answers-btn');
  
  // Quiz State
  let currentQuestionIndex = 0;
  let score = 0;
  let timer = 0;
  let timerInterval;
  let selectedAnswers = [];
  let currentQuestions = [];
  let quizDifficulty = '';
  
  // Initialize Quiz
  function initializeQuiz(difficulty) {
    quizDifficulty = difficulty;
    
    // Combine questions based on difficulty
    if (difficulty === 'all') {
      currentQuestions = [...quizData.basic, ...quizData.intermediate, ...quizData.advanced];
    } else {
      currentQuestions = [...quizData[difficulty]];
    }
    
    // Shuffle questions
    currentQuestions = shuffleArray(currentQuestions);
    
    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    timer = 0;
    selectedAnswers = Array(currentQuestions.length).fill(null);
    
    // Start timer
    startTimer();
    
    // Show first question
    showQuestion();
  }
  
  // Shuffle array
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Start timer
  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timer++;
      updateTimerDisplay();
    }, 1000);
  }
  
  // Update timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerElement.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Display question
  function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const answers = question.options;
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
    
    // Update question counter
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    
    // Create question HTML
    questionContainer.innerHTML = `
      <div class="question">${question.question}</div>
      <div class="answer-options">
        ${answers.map((answer, index) => `
          <button class="answer-btn ${selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''}" 
                  data-index="${index}">
            <span class="arabic-text">${answer}</span>
          </button>
        `).join('')}
      </div>
    `;
    
    // Add event listeners to answer buttons
    document.querySelectorAll('.answer-btn').forEach(button => {
      button.addEventListener('click', selectAnswer);
    });
    
    // Update navigation buttons
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.textContent = currentQuestionIndex === currentQuestions.length - 1 ? 'Submit' : 'Next';
    
    // Hide feedback
    feedbackElement.classList.remove('show', 'correct', 'incorrect');
  }
  
  // Select answer
  function selectAnswer(e) {
    const selectedButton = e.currentTarget;
    const answerIndex = parseInt(selectedButton.dataset.index);
    const question = currentQuestions[currentQuestionIndex];
    
    // Store selected answer
    selectedAnswers[currentQuestionIndex] = answerIndex;
    
    // Remove selected class from all buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    selectedButton.classList.add('selected');
    
    // Check if answer is correct
    const isCorrect = question.options[answerIndex] === question.answer;
    
    // Show feedback
    feedbackElement.textContent = isCorrect ? 'Correct!' : 'Incorrect. Try again!';
    feedbackElement.className = 'feedback show ' + (isCorrect ? 'correct' : 'incorrect');
  }
  
  // Show hint
  function showHint() {
    const question = currentQuestions[currentQuestionIndex];
    feedbackElement.textContent = `Hint: ${question.hint}`;
    feedbackElement.className = 'feedback show';
  }
  
  // Next question
  function nextQuestion() {
    // Check if answer was selected
    if (selectedAnswers[currentQuestionIndex] === null) {
      feedbackElement.textContent = 'Please select an answer before continuing.';
      feedbackElement.className = 'feedback show';
      return;
    }
    
    // Move to next question or finish quiz
    if (currentQuestionIndex < currentQuestions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      finishQuiz();
    }
  }
  
  // Previous question
  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  }
  
  // Finish quiz
  function finishQuiz() {
    clearInterval(timerInterval);
    
    // Calculate score
    score = currentQuestions.reduce((total, question, index) => {
      return total + (question.options[selectedAnswers[index]] === question.answer ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    // Update result display
    scoreElement.textContent = `${percentage}%`;
    document.getElementById('correct-answers').textContent = `${score}/${currentQuestions.length}`;
    
    // Format time
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Generate performance feedback
    let feedback = '<h3>Your Performance</h3><ul>';
    
    if (percentage >= 80) {
      feedback += '<li>Excellent work! You have a strong understanding of Arabic verb conjugations.</li>';
    } else if (percentage >= 60) {
      feedback += '<li>Good job! You have a decent grasp of Arabic verbs but could use more practice.</li>';
    } else {
      feedback += '<li>Keep practicing! Review the verbs you missed and try again.</li>';
    }
    
    feedback += '<li>Focus on these areas for improvement:</li><ul>';
    
    // Add specific feedback for missed questions
    currentQuestions.forEach((question, index) => {
      if (question.options[selectedAnswers[index]] !== question.answer) {
        feedback += `<li>${question.question} - Correct answer: <span class="arabic-text">${question.answer}</span></li>`;
      }
    });
    
    feedback += '</ul></ul>';
    performanceFeedback.innerHTML = feedback;
    
    // Show result section
    quizForm.hidden = true;
    quizResult.hidden = false;
  }
  
  // Reset quiz
  function resetQuiz() {
    if (confirm('Are you sure you want to reset the quiz? Your progress will be lost.')) {
      initializeQuiz(quizDifficulty);
    }
  }
  
  // Event Listeners
  nextButton.addEventListener('click', nextQuestion);
  prevButton.addEventListener('click', prevQuestion);
  hintButton.addEventListener('click', showHint);
  resetButton.addEventListener('click', resetQuiz);
  tryAgainButton.addEventListener('click', () => {
    quizResult.hidden = true;
    initializeQuiz(quizDifficulty);
  });
  reviewAnswersButton.addEventListener('click', () => {
    // Implementation for reviewing answers would go here
    alert('Review functionality would show each question with your answer and the correct answer.');
  });
  
  // Initialize the quiz when difficulty is selected
  window.startQuiz = initializeQuiz;