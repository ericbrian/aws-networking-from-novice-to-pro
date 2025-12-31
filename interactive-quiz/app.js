import { quizBank } from "./quiz-bank.js";

const quizSelect = document.getElementById("quizSelect");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const stage = document.getElementById("stage");
const progressBarContainer = document.getElementById("progressBar");
const progressBar = progressBarContainer.querySelector(".progress-bar");

/** @typedef {{prompt: string, choices: string[], answerIndex: number, explanation: string}} Question */
/** @typedef {{id: string, title: string, questions: Question[]}} Quiz */

let currentQuiz = /** @type {Quiz | null} */ (null);
let currentIndex = 0;
let score = 0;
let locked = false;

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateProgress() {
  if (!currentQuiz) {
    progressBarContainer.style.display = 'none';
    return;
  }
  progressBarContainer.style.display = 'block';
  const total = currentQuiz.questions.length;
  // If we are at results, show 100%
  const progress = locked && currentIndex === total - 1 
    ? 100 
    : Math.round((currentIndex / total) * 100);
    
  progressBar.style.width = `${progress}%`;
}

function renderIntro() {
  // Reset UI state
  stage.innerHTML = `
    <div style="text-align: center; padding: 40px 0;">
      <h3 style="margin-top: 0; font-size: 20px;">Ready to test your knowledge?</h3>
      <p style="color: var(--text-muted); line-height: 1.6;">
        Select a topic from the menu above and click <strong>Start Quiz</strong>.<br>
        Questions are locked immediately after answering.
      </p>
    </div>
  `;
  
  // Hide in-quiz controls
  resetBtn.style.display = "none";
  startBtn.disabled = false;
  startBtn.innerText = "Start Quiz";
  quizSelect.disabled = false;
  progressBarContainer.style.display = "none";
}

function renderQuestion() {
  if (!currentQuiz) return;

  const q = currentQuiz.questions[currentIndex];
  const total = currentQuiz.questions.length;

  const choicesHtml = q.choices
    .map((text, idx) => {
      const disabled = locked ? "disabled" : "";
      return `<button class="choice-btn" data-choice="${idx}" ${disabled}>${escapeHtml(text)}</button>`;
    })
    .join("");

  stage.innerHTML = `
    <div class="fade-in">
      <div class="quiz-header">
        <div class="quiz-meta">
          <span>Question ${currentIndex + 1} of ${total}</span>
          <span>Score: ${score}</span>
        </div>
        <div class="question-text">${escapeHtml(q.prompt)}</div>
      </div>
      
      <div class="choices">${choicesHtml}</div>
      
      <div id="feedback"></div>
      
      <div class="nav-row">
        <button id="prevBtn" class="secondary" disabled style="opacity: 0">Previous</button> <!-- Hidden but keeps layout -->
        <button id="nextBtn" class="primary" disabled>Next Question</button>
      </div>
    </div>
  `;

  updateProgress();
  wireChoiceHandlers();
  wireNavHandlers();
}

function wireChoiceHandlers() {
  const buttons = [...stage.querySelectorAll("button[data-choice]")];
  for (const btn of buttons) {
    btn.addEventListener("click", () => {
      if (!currentQuiz) return;
      if (locked) return;

      const idx = Number(btn.getAttribute("data-choice"));
      locked = true;

      const q = currentQuiz.questions[currentIndex];
      const isCorrect = idx === q.answerIndex;
      if (isCorrect) score += 1;

      // Style choices
      for (const b of buttons) {
        const bi = Number(b.getAttribute("data-choice"));
        b.disabled = true;
        if (bi === q.answerIndex) b.classList.add("correct");
        if (bi === idx && !isCorrect) b.classList.add("wrong");
      }

      const feedback = stage.querySelector("#feedback");
      feedback.innerHTML = `
        <div class="feedback ${isCorrect ? "ok" : "bad"}">
          <strong>${isCorrect ? "Correct!" : "Incorrect."}</strong>
          <div class="explain">${escapeHtml(q.explanation)}</div>
        </div>
      `;

      const nextBtn = stage.querySelector("#nextBtn");
      nextBtn.disabled = false;
      
      // If it's the last question, change button text
      if (currentIndex === currentQuiz.questions.length - 1) {
        nextBtn.innerText = "View Results";
      }
      
      updateProgress(); // Ensure bar fills a bit if we want strictly "completed questions" logic, but standard is fine
    });
  }
}

function wireNavHandlers() {
  const nextBtn = stage.querySelector("#nextBtn");

  nextBtn.addEventListener("click", () => {
    if (!currentQuiz) return;

    const total = currentQuiz.questions.length;
    if (!locked) return;

    if (currentIndex + 1 >= total) {
      renderResults();
      return;
    }

    currentIndex += 1;
    locked = false;
    renderQuestion();
  });
}

function renderResults() {
  if (!currentQuiz) return;
  const total = currentQuiz.questions.length;
  const pct = Math.round((score / total) * 100);
  
  progressBar.style.width = '100%';

  stage.innerHTML = `
    <div class="results-card fade-in">
      <h2 style="margin-top: 0">Quiz Complete!</h2>
      <div class="score-display">${pct}%</div>
      <div class="score-label">You scored ${score} out of ${total}</div>
      
      <div class="nav-row" style="justify-content: center; gap: 16px;">
        <button id="restartResultsBtn" class="primary">Retake Quiz</button>
        <button id="newQuizBtn" class="secondary">Choose Another</button>
      </div>
    </div>
  `;

  stage.querySelector("#restartResultsBtn").addEventListener("click", () => {
    startQuiz(currentQuiz.id);
  });

  stage.querySelector("#newQuizBtn").addEventListener("click", () => {
    resetToMenu();
  });
}

function startQuiz(id) {
  const quiz = quizBank.find((q) => q.id === id);
  if (!quiz) return;

  currentQuiz = quiz;
  currentIndex = 0;
  score = 0;
  locked = false;
  
  // UI State for active quiz
  resetBtn.style.display = "inline-flex";
  startBtn.disabled = true;
  startBtn.innerText = "In Progress...";
  quizSelect.disabled = true;

  renderQuestion();
}

function resetToMenu() {
  currentQuiz = null;
  currentIndex = 0;
  score = 0;
  locked = false;
  renderIntro();
}

function populateSelect() {
  quizSelect.innerHTML = quizBank
    .map((q) => `<option value="${q.id}">${escapeHtml(q.title)}</option>`)
    .join("");
}

startBtn.addEventListener("click", () => {
  startQuiz(quizSelect.value);
});

resetBtn.addEventListener("click", () => {
  if(confirm("Are you sure you want to exit the current quiz?")) {
    resetToMenu();
  }
});

// Initialization
populateSelect();
renderIntro();
