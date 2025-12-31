import { quizBank } from "./quiz-bank.js";

const quizSelect = document.getElementById("quizSelect");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const stage = document.getElementById("stage");

/** @typedef {{prompt: string, choices: string[], answerIndex: number, explanation: string}} Question */
/** @typedef {{id: string, title: string, questions: Question[]}} Quiz */

let currentQuiz = /** @type {Quiz | null} */ (null);
let currentIndex = 0;
let score = 0;
let locked = false;
let selectedIndex = /** @type {number | null} */ (null);

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderIntro() {
  stage.innerHTML = `
    <p class="meta">Pick a quiz above, then press <strong>Start</strong>.</p>
    <p class="small">Answers are locked after you click. You can’t change them.</p>
  `;
}

function renderQuestion() {
  if (!currentQuiz) return;

  const q = currentQuiz.questions[currentIndex];
  const total = currentQuiz.questions.length;

  const choicesHtml = q.choices
    .map((text, idx) => {
      const disabled = locked ? "disabled" : "";
      return `<button class="choice" data-choice="${idx}" ${disabled}>${escapeHtml(text)}</button>`;
    })
    .join("");

  stage.innerHTML = `
    <div>
      <div class="meta">Question ${currentIndex + 1} of ${total} · Score ${score}/${total}</div>
      <h2 class="quiz-title">${escapeHtml(currentQuiz.title)}</h2>
      <div class="q">${escapeHtml(q.prompt)}</div>
      <div class="choices">${choicesHtml}</div>
      <div id="feedback"></div>
      <div class="footer-row">
        <button id="prevBtn" ${currentIndex === 0 ? "disabled" : ""}>Previous</button>
        <button id="nextBtn" class="primary" disabled>Next</button>
      </div>
      <p class="small" style="margin-top: 10px;">Once you answer a question, it’s locked.</p>
    </div>
  `;

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
      selectedIndex = idx;
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
          <strong>${isCorrect ? "Correct" : "Incorrect"}.</strong>
          <div class="explain">${escapeHtml(q.explanation)}</div>
        </div>
      `;

      const nextBtn = stage.querySelector("#nextBtn");
      nextBtn.disabled = false;
    });
  }
}

function wireNavHandlers() {
  const prevBtn = stage.querySelector("#prevBtn");
  const nextBtn = stage.querySelector("#nextBtn");

  prevBtn.addEventListener("click", () => {
    if (!currentQuiz) return;
    if (currentIndex === 0) return;

    // Navigation backward is allowed, but answers are locked per question.
    // For simplicity, we prevent revisiting past questions to change score.
    // So: backward navigation is disabled after answering.
  });

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
    selectedIndex = null;
    renderQuestion();
  });

  // Disable Previous entirely to enforce “no fixing answers”.
  prevBtn.disabled = true;
  prevBtn.title = "Disabled to prevent changing answers.";
}

function renderResults() {
  if (!currentQuiz) return;
  const total = currentQuiz.questions.length;
  const pct = Math.round((score / total) * 100);

  stage.innerHTML = `
    <h2 class="quiz-title">${escapeHtml(currentQuiz.title)} — Results</h2>
    <div class="results">
      <p class="score">Grade: ${score}/${total} (${pct}%)</p>
      <p class="meta">Your answers were locked after each selection.</p>
      <div class="footer-row">
        <button id="restartBtn" class="primary">Retake this quiz</button>
        <button id="pickBtn">Pick a different quiz</button>
      </div>
    </div>
  `;

  stage.querySelector("#restartBtn").addEventListener("click", () => {
    startQuiz(currentQuiz.id);
  });

  stage.querySelector("#pickBtn").addEventListener("click", () => {
    currentQuiz = null;
    currentIndex = 0;
    score = 0;
    locked = false;
    selectedIndex = null;
    renderIntro();
  });
}

function startQuiz(id) {
  const quiz = quizBank.find((q) => q.id === id);
  if (!quiz) return;

  currentQuiz = quiz;
  currentIndex = 0;
  score = 0;
  locked = false;
  selectedIndex = null;

  renderQuestion();
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
  currentQuiz = null;
  currentIndex = 0;
  score = 0;
  locked = false;
  selectedIndex = null;
  renderIntro();
});

populateSelect();
renderIntro();
