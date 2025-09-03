
// QuizzyPop - Interactive Educational Quiz Platform
class QuizzyPop {
    constructor() {
        this.categories = [
            {
                name: "General Knowledge",
                icon: "⭐",
                color: "warning",
                apiId: 9,
                description: "Test your knowledge across various topics"
            },
            {
                name: "Science",
                icon: "🐕",
                color: "info",
                apiId: 17,
                description: "Explore the wonders of science and nature"
            },
            {
                name: "History",
                icon: "💬",
                color: "secondary",
                apiId: 23,
                description: "Journey through historical events and figures"
            },
            {
                name: "Sports",
                icon: "🚀",
                color: "primary",
                apiId: 21,
                description: "Test your sports knowledge and trivia"
            }
        ];

        this.currentQuiz = {
            category: null,
            questions: [],
            currentQuestionIndex: 0,
            score: 0,
            timeLeft: 30,
            timerInterval: null,
            isAnswered: false
        };

        this.init();
    }

    init() {
        this.renderCategories();
        this.setupEventListeners();
        this.showScreen('homeScreen');
    }

    renderCategories() {
        const categoryGrid = document.getElementById('categoryGrid');
        categoryGrid.innerHTML = '';

        this.categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'col-md-6 col-lg-3';

            categoryCard.innerHTML = `
                <div class="category-card" data-category="${category.name}" data-api-id="${category.apiId}">
                    <div class="category-icon">${category.icon}</div>
                    <h3 class="category-name">${category.name}</h3>
                    <p class="category-description">${category.description}</p>
                </div>
            `;

            categoryGrid.appendChild(categoryCard);
        });
    }

    setupEventListeners() {
        // Category selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.category-card')) {
                const card = e.target.closest('.category-card');
                const categoryName = card.getAttribute('data-category');
                const apiId = card.getAttribute('data-api-id');
                this.startQuiz(categoryName, parseInt(apiId));
            }
        });

        // Quiz navigation buttons
        document.getElementById('backToHomeBtn').addEventListener('click', () => {
            this.endQuiz();
            this.showScreen('homeScreen');
        });

        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.startQuiz(this.currentQuiz.category.name, this.currentQuiz.category.apiId);
        });

        document.getElementById('newCategoryBtn').addEventListener('click', () => {
            this.showScreen('homeScreen');
        });

        // Answer button clicks will be handled dynamically
        document.getElementById('answersSection').addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-btn') && !this.currentQuiz.isAnswered) {
                this.selectAnswer(e.target);
            }
        });
    }

    async startQuiz(categoryName, apiId) {
        this.currentQuiz.category = { name: categoryName, apiId: apiId };
        this.currentQuiz.currentQuestionIndex = 0;
        this.currentQuiz.score = 0;

        document.getElementById('currentCategory').textContent = categoryName;

        this.showLoading(true);

        try {
            const questions = await this.fetchQuestions(apiId);
            this.currentQuiz.questions = this.shuffleArray(questions);

            this.showLoading(false);
            this.showScreen('quizScreen');
            this.displayQuestion();
        } catch (error) {
            console.error('Error fetching questions:', error);
            this.showLoading(false);
            alert('Failed to load questions. Please try again.');
        }
    }

    async fetchQuestions(categoryId) {
        const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=medium&type=multiple`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.response_code === 0 && data.results) {
                return data.results.map(question => ({
                    question: this.decodeHtml(question.question),
                    correct_answer: this.decodeHtml(question.correct_answer),
                    incorrect_answers: question.incorrect_answers.map(answer => this.decodeHtml(answer)),
                    category: question.category
                }));
            } else {
                throw new Error('API returned no results');
            }
        } catch (error) {
            // Fallback to sample questions if API fails
            return this.getFallbackQuestions();
        }
    }

    getFallbackQuestions() {
        const fallbackQuestions = [
            {
                question: "How many notes are there on a standard grand piano?",
                correct_answer: "88",
                incorrect_answers: ["78", "108", "98"]
            },
            {
                question: "What is the largest planet in our solar system?",
                correct_answer: "Jupiter",
                incorrect_answers: ["Saturn", "Neptune", "Earth"]
            },
            {
                question: "Who wrote the novel '1984'?",
                correct_answer: "George Orwell",
                incorrect_answers: ["Aldous Huxley", "Ray Bradbury", "H.G. Wells"]
            },
            {
                question: "What year did World War II end?",
                correct_answer: "1945",
                incorrect_answers: ["1944", "1946", "1943"]
            },
            {
                question: "Which sport is known as 'The Beautiful Game'?",
                correct_answer: "Football/Soccer",
                incorrect_answers: ["Basketball", "Tennis", "Baseball"]
            }
        ];

        // Duplicate and modify to create 10 questions
        const extendedQuestions = [...fallbackQuestions];
        while (extendedQuestions.length < 10) {
            extendedQuestions.push(...fallbackQuestions.slice(0, 10 - extendedQuestions.length));
        }

        return extendedQuestions.slice(0, 10);
    }

    displayQuestion() {
        const currentQuestion = this.currentQuiz.questions[this.currentQuiz.currentQuestionIndex];
        const questionNumber = this.currentQuiz.currentQuestionIndex + 1;

        // Update UI elements
        document.getElementById('questionCounter').textContent = `Question ${questionNumber}/10`;
        document.getElementById('questionText').textContent = currentQuestion.question;

        // Update progress bar
        const progressPercent = (questionNumber / 10) * 100;
        document.getElementById('progressBar').style.width = `${progressPercent}%`;

        // Prepare answers
        const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const shuffledAnswers = this.shuffleArray(allAnswers);

        // Render answer buttons
        this.renderAnswerButtons(shuffledAnswers, currentQuestion.correct_answer);

        // Reset and start timer
        this.startTimer();

        // Reset answered state
        this.currentQuiz.isAnswered = false;
    }

    renderAnswerButtons(answers, correctAnswer) {
        const answersSection = document.getElementById('answersSection');
        answersSection.innerHTML = '';

        answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.setAttribute('data-answer', answer);
            button.setAttribute('data-correct', answer === correctAnswer);

            answersSection.appendChild(button);
        });
    }

    selectAnswer(selectedButton) {
        if (this.currentQuiz.isAnswered) return;

        this.currentQuiz.isAnswered = true;
        this.stopTimer();

        const isCorrect = selectedButton.getAttribute('data-correct') === 'true';

        // Update score
        if (isCorrect) {
            this.currentQuiz.score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            // Highlight correct answer
            const correctButton = document.querySelector('[data-correct="true"]');
            if (correctButton) {
                correctButton.classList.add('correct');
            }
        }

        // Disable all buttons
        const allButtons = document.querySelectorAll('.answer-btn');
        allButtons.forEach(btn => btn.classList.add('disabled'));

        // Show next question after delay
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    nextQuestion() {
        this.currentQuiz.currentQuestionIndex++;

        if (this.currentQuiz.currentQuestionIndex < this.currentQuiz.questions.length) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    startTimer() {
        this.currentQuiz.timeLeft = 30;
        this.updateTimerDisplay();

        this.currentQuiz.timerInterval = setInterval(() => {
            this.currentQuiz.timeLeft--;
            this.updateTimerDisplay();

            if (this.currentQuiz.timeLeft <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.currentQuiz.timerInterval) {
            clearInterval(this.currentQuiz.timerInterval);
            this.currentQuiz.timerInterval = null;
        }
    }

    updateTimerDisplay() {
        const timerElement = document.getElementById('timerValue');
        timerElement.textContent = this.currentQuiz.timeLeft;

        // Change color when time is running low
        if (this.currentQuiz.timeLeft <= 10) {
            timerElement.style.color = 'var(--color-error)';
        } else {
            timerElement.style.color = 'var(--color-primary)';
        }
    }

    handleTimeUp() {
        if (this.currentQuiz.isAnswered) return;

        this.currentQuiz.isAnswered = true;
        this.stopTimer();

        // Highlight correct answer
        const correctButton = document.querySelector('[data-correct="true"]');
        if (correctButton) {
            correctButton.classList.add('correct');
        }

        // Disable all buttons
        const allButtons = document.querySelectorAll('.answer-btn');
        allButtons.forEach(btn => btn.classList.add('disabled'));

        // Show next question after delay
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    showResults() {
        this.stopTimer();

        const finalScore = this.currentQuiz.score;
        const scorePercentage = (finalScore / 10) * 100;

        // Update results display
        document.getElementById('finalScore').textContent = finalScore;

        // Set score message based on performance
        let message = '';
        if (scorePercentage >= 90) {
            message = 'Excellent! You\'re a quiz master!';
        } else if (scorePercentage >= 70) {
            message = 'Great job! Well done!';
        } else if (scorePercentage >= 50) {
            message = 'Good effort! Keep learning!';
        } else {
            message = 'Don\'t give up! Try again!';
        }

        document.getElementById('scoreMessage').textContent = message;

        // Save score to local storage
        this.saveScore(finalScore, this.currentQuiz.category.name);

        this.showScreen('resultsScreen');
    }

    saveScore(score, category) {
        try {
            const scores = JSON.parse(localStorage.getItem('quizzyPopScores') || '[]');
            scores.push({
                score: score,
                category: category,
                date: new Date().toISOString(),
                total: 10
            });

            // Keep only last 50 scores
            if (scores.length > 50) {
                scores.splice(0, scores.length - 50);
            }

            localStorage.setItem('quizzyPopScores', JSON.stringify(scores));
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }

    endQuiz() {
        this.stopTimer();
        this.currentQuiz = {
            category: null,
            questions: [],
            currentQuestionIndex: 0,
            score: 0,
            timeLeft: 30,
            timerInterval: null,
            isAnswered: false
        };
    }

    showScreen(screenId) {
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            targetScreen.classList.add('fade-in');

            // Remove animation class after animation completes
            setTimeout(() => {
                targetScreen.classList.remove('fade-in');
            }, 500);
        }
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (show) {
            loadingOverlay.classList.remove('hidden');
        } else {
            loadingOverlay.classList.add('hidden');
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
}
// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizzyPop();
});
// Add some utility functions for enhanced user experience
function addRippleEffect() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn') || e.target.classList.contains('answer-btn')) {
            const button = e.target;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
}
// Initialize ripple effect
addRippleEffect();
