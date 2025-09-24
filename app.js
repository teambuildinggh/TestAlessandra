const questions = [
  {
    text: 'A) Mayor apertura a conocer mejor a la gente y a entablar nuevas relaciones.',
    alt: 'B) Ejerce más control sobre la persona con quien se relaciona, incluyendo cuánto llega a conocerlos.',
    typeA: 'S',
    typeB: 'C',
  },
  {
    text: 'A) Centra las conversaciones en las tareas, temas a resolver, trabajo o situación del momento.',
    alt: 'B) Permite que las conversaciones viren hacia el tema de interés de los demás, aun si esto se aparta del trabajo o de la situación del momento.',
    typeA: 'C',
    typeB: 'S',
  },
  {
    text: 'A) Aporta con menos frecuencia a las conversaciones grupales.',
    alt: 'B) Aporta con mayor frecuencia a las conversaciones grupales.',
    typeA: 'I',
    typeB: 'D',
  },
  {
    text: 'A) Tiende a reservar su parecer o sentimientos, solamente compartiendo cuando se le pregunta y es necesario.',
    alt: 'B) Tiende a expresar su parecer o sentimientos sobre las cosas, se le pregunte o no.',
    typeA: 'I',
    typeB: 'D',
  },
  {
    text: 'A) Tiende a tomar decisiones en base a objetivos, hechos o evidencia.',
    alt: 'B) Tiende a tomar decisiones en base a sentimientos, experiencias o relaciones.',
    typeA: 'C',
    typeB: 'S',
  },
  {
    text: 'A) Con frecuencia hace gestos, expresiones faciales, y recurre a la entonación para enfatizar ciertos puntos.',
    alt: 'B) Menor propensión a hacer gestos, expresiones faciales, y entonación para enfatizar ciertos puntos.',
    typeA: 'D',
    typeB: 'I',
  },
  {
    text: 'A) Mayor propensión a hacer comentarios tales como: “¡Eso es!” o “Siento…”.',
    alt: 'B) Mayor propensión a formular preguntas o a hablar con menos seguridad: “¿Cómo te queda?” o “A mi entender…”.',
    typeA: 'D',
    typeB: 'I',
  },
  {
    text: 'A) Mayor propensión a esperar y a responder a conflictos.',
    alt: 'B) Menor propensión a esperar el conflicto y mayor motivación a ocuparse personalmente cuando surge un conflicto.',
    typeA: 'C',
    typeB: 'S',
  },
  {
    text: 'A) Mayor propensión a aceptar los puntos de vista de los otros (ideas, sentimientos e inquietudes).',
    alt: 'B) Menor propensión a aceptar los puntos de vista de los otros (ideas, sentimientos e inquietudes).',
    typeA: 'S',
    typeB: 'C',
  },
  {
    text: 'A) Tiende a centrarse principalmente en la idea, el concepto o el resultado.',
    alt: 'B) Tiende a centrarse principalmente en el grado de interés, la persona en cuestión y el proceso.',
    typeA: 'C',
    typeB: 'S',
  },
  {
    text: 'A) Mayor propensión a esperar que los otros lo/la presenten en una reunión social.',
    alt: 'B) Mayor propensión a presentarse en una reunión social.',
    typeA: 'I',
    typeB: 'D',
  },
  {
    text: 'A) Mayor apertura respecto del tiempo que le dedica a los demás.',
    alt: 'B) Menor apertura respecto del tiempo que le dedica a los demás.',
    typeA: 'S',
    typeB: 'C',
  },
  {
    text: 'A) Propensión a regirse por su propia agenda y temas de interés al tiempo que se sintoniza con las motivaciones de los demás.',
    alt: 'B) Propensión a adaptarse a la agenda y temas de interés del otro al tiempo que le resta importancia a todo conflicto o desacuerdo.',
    typeA: 'C',
    typeB: 'S',
  },
  {
    text: 'A) Tiende a permanecer involucrado en situaciones, condiciones y relaciones conocidas.',
    alt: 'B) Tiende a buscar nuevas experiencias, situaciones y oportunidades.',
    typeA: 'I',
    typeB: 'D',
  },
  {
    text: 'A) Propensión a expresar su propio punto de vista gustosamente.',
    alt: 'B) Propensión a reservar toda expresión que refleje su punto de vista.',
    typeA: 'D',
    typeB: 'I',
  },
  {
    text: 'A) Tiende a reaccionar más lenta y deliberadamente.',
    alt: 'B) Tiende a reaccionar más rápida y espontáneamente.',
    typeA: 'I',
    typeB: 'D',
  },
  {
    text: 'A) Prefiere trabajar independientemente o establecer las condiciones cuando hace participar a otros.',
    alt: 'B) Prefiere trabajar con otros y a través de otros, brindando apoyo siempre que sea posible.',
    typeA: 'C',
    typeB: 'S',
  },
  {
    text: 'A) Propensión a responder frente al riesgo y al cambio de modo más cauteloso o predecible.',
    alt: 'B) Propensión a responder al riesgo y al cambio de manera más dinámica e impredecible.',
    typeA: 'I',
    typeB: 'D',
  },
];

const MAX_AXIS = 9;

const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const restartBtn = document.getElementById('restart-btn');

const questionCounter = document.getElementById('question-counter');
const questionText = document.getElementById('question-text');
const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');

const resultSummary = document.getElementById('result-summary');
const resultDot = document.getElementById('result-dot');

const scoreS = document.getElementById('score-s');
const scoreC = document.getElementById('score-c');
const scoreD = document.getElementById('score-d');
const scoreI = document.getElementById('score-i');

const quadrants = document.querySelectorAll('.quadrant');
const detailBtn = document.getElementById('detail-btn');
const detailModal = document.getElementById('detail-modal');
const detailModalBody = document.getElementById('detail-modal-body');
const detailCloseBtn = document.getElementById('detail-close-btn');
const detailBackdrop = document.getElementById('detail-modal-backdrop');

let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

const closeDetailModal = () => {
  detailModal.classList.remove('active');
  detailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

const openDetailModal = () => {
  if (!detailModalBody.innerHTML.trim()) return;
  detailModal.classList.add('active');
  detailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (detailCloseBtn) {
    detailCloseBtn.focus();
  }
};

const toggleVisibility = (sectionToShow) => {
  closeDetailModal();
  [welcomeScreen, quizScreen, resultScreen].forEach((section) => {
    section.classList.toggle('active', section === sectionToShow);
  });
};

const renderQuestion = () => {
  const data = questions[currentQuestion];
  questionCounter.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  questionText.textContent = `¿Cuál opción te describe mejor?`;

  optionA.innerHTML = `<span>Opción A</span>${data.text}`;
  optionB.innerHTML = `<span>Opción B</span>${data.alt}`;

  optionA.classList.toggle('active', answers[currentQuestion] === 'A');
  optionB.classList.toggle('active', answers[currentQuestion] === 'B');

  backBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Ver resultado' : 'Siguiente';
  nextBtn.disabled = answers[currentQuestion] === null;
};

const updateAnswer = (choice) => {
  answers[currentQuestion] = choice;
  nextBtn.disabled = false;
  optionA.classList.toggle('active', choice === 'A');
  optionB.classList.toggle('active', choice === 'B');
};

const calculateScores = () => {
  return answers.reduce(
    (acc, choice, index) => {
      const question = questions[index];
      const type = choice === 'A' ? question.typeA : question.typeB;
      acc[type] += 1;
      return acc;
    },
    { S: 0, C: 0, D: 0, I: 0 }
  );
};

const determineQuadrant = (horizontal, vertical) => {
  if (horizontal >= 0 && vertical >= 0) return 'top-right';
  if (horizontal >= 0 && vertical < 0) return 'bottom-right';
  if (horizontal < 0 && vertical >= 0) return 'top-left';
  return 'bottom-left';
};

const summarizeStyle = (quadrant) => {
  switch (quadrant) {
    case 'top-right':
      return {
        title: 'Pavo Real',
        description:
          'Eres expresivo/a, entusiasta y disfrutas conectar con la gente mientras avanzas en tus objetivos.',
      };
    case 'bottom-right':
      return {
        title: 'Águila',
        description:
          'Tiendes a ser directo/a, orientado/a a resultados y tomas el control de las situaciones con determinación.',
      };
    case 'top-left':
      return {
        title: 'Paloma',
        description:
          'Priorizas la armonía, la colaboración y te enfocas en construir relaciones de confianza.',
      };
    case 'bottom-left':
    default:
      return {
        title: 'Búho',
        description:
          'Analizas con cuidado, valoras la precisión y te apoyas en los hechos antes de avanzar.',
      };
  }
};

const quadrantDescriptions = {
  'top-right': 'Cuadrante superior derecho (Pavo Real)',
  'bottom-right': 'Cuadrante inferior derecho (Águila)',
  'top-left': 'Cuadrante superior izquierdo (Paloma)',
  'bottom-left': 'Cuadrante inferior izquierdo (Búho)',
};

const renderResults = () => {
  const scores = calculateScores();
  const vertical = scores.S - scores.C;
  const horizontal = scores.D - scores.I;
  const quadrant = determineQuadrant(horizontal, vertical);
  const style = summarizeStyle(quadrant);
  const quadrantDescription = quadrantDescriptions[quadrant];

  quadrants.forEach((quad) => {
    quad.classList.toggle('active', quad.dataset.quadrant === quadrant);
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const horizontalPercent = clamp(horizontal / MAX_AXIS, -1, 1);
  const verticalPercent = clamp(vertical / MAX_AXIS, -1, 1);

  const left = 50 + horizontalPercent * 42;
  const top = 50 - verticalPercent * 42;

  resultDot.style.left = `${left}%`;
  resultDot.style.top = `${top}%`;

  resultSummary.textContent = style.title;

  scoreS.textContent = scores.S;
  scoreC.textContent = scores.C;
  scoreD.textContent = scores.D;
  scoreI.textContent = scores.I;

  const detailRows = questions
    .map((question, index) => {
      const choice = answers[index];
      const styleType = choice === 'A' ? question.typeA : question.typeB;
      const responseText = choice === 'A' ? question.text : question.alt;
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${choice}</td>
          <td>${styleType}</td>
          <td>${responseText}</td>
        </tr>
      `;
    })
    .join('');

  const detailSummary = `
    <div class="detail-summary">
      <p><strong>Animal resultante:</strong> ${style.title}</p>
      <p><strong>Descripción:</strong> ${style.description}</p>
      <p><strong>Totales por estilo:</strong> S = ${scores.S} | C = ${scores.C} | D = ${scores.D} | I = ${scores.I}</p>
      <p><strong>Cálculo vertical (S - C):</strong> ${scores.S} - ${scores.C} = ${vertical}</p>
      <p><strong>Cálculo horizontal (D - I):</strong> ${scores.D} - ${scores.I} = ${horizontal}</p>
      <p><strong>Coordenadas (horizontal, vertical):</strong> (${horizontal}, ${vertical})</p>
      <p><strong>Ubicación del punto:</strong> ${quadrantDescription}</p>
    </div>
  `;

  const detailTable = `
    <table class="detail-grid">
      <thead>
        <tr>
          <th>Pregunta</th>
          <th>Letra</th>
          <th>Estilo</th>
          <th>Respuesta seleccionada</th>
        </tr>
      </thead>
      <tbody>${detailRows}</tbody>
    </table>
  `;

  detailModalBody.innerHTML = `${detailSummary}${detailTable}`;
};

const goToQuestion = (index) => {
  currentQuestion = index;
  renderQuestion();
};

const resetQuiz = () => {
  answers = new Array(questions.length).fill(null);
  currentQuestion = 0;
  toggleVisibility(quizScreen);
  renderQuestion();
};

startBtn.addEventListener('click', () => {
  toggleVisibility(quizScreen);
  renderQuestion();
});

backBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    goToQuestion(currentQuestion - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (answers[currentQuestion] === null) return;
  if (currentQuestion < questions.length - 1) {
    goToQuestion(currentQuestion + 1);
  } else {
    renderResults();
    toggleVisibility(resultScreen);
  }
});

resetBtn.addEventListener('click', () => {
  answers = new Array(questions.length).fill(null);
  currentQuestion = 0;
  renderQuestion();
});

restartBtn.addEventListener('click', () => {
  answers = new Array(questions.length).fill(null);
  currentQuestion = 0;
  toggleVisibility(welcomeScreen);
});

[optionA, optionB].forEach((btn) => {
  btn.addEventListener('click', () => {
    updateAnswer(btn.dataset.choice);
  });
});

detailBtn.addEventListener('click', openDetailModal);
detailCloseBtn.addEventListener('click', closeDetailModal);
detailBackdrop.addEventListener('click', closeDetailModal);
detailModal.addEventListener('click', (event) => {
  if (event.target === detailModal) {
    closeDetailModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (!quizScreen.classList.contains('active')) return;
  if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
    nextBtn.click();
  }
  if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
    backBtn.click();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && detailModal.classList.contains('active')) {
    closeDetailModal();
  }
});
