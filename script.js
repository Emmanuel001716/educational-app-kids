const levels = {
  kindergarten: {
    label: 'Kindergarten',
    icon: '🎨',
    subjects: ['Reading', 'Counting', 'Rhymes', 'Colors', 'Shapes'],
    lessons: [
      {
        title: 'Alphabet Adventure',
        description: 'Trace and sound out letters A to Z with bright, playful examples.',
        tag: 'Literacy',
        icon: '🔤',
      },
      {
        title: 'Number Hop',
        description: 'Learn to count objects, match numbers, and practice simple addition.',
        tag: 'Numeracy',
        icon: '🔢',
      },
      {
        title: 'Color Splash',
        description: 'Identify primary colors and discover items that match each hue.',
        tag: 'Creativity',
        icon: '🌈',
      },
      {
        title: 'Shape Hunt',
        description: 'Spot circles, squares, triangles, and compare shapes in daily life.',
        tag: 'Geometry',
        icon: '🧩',
      },
    ],
    quiz: {
      question: 'Which shape looks like a pizza slice?',
      options: ['Circle', 'Triangle', 'Rectangle', 'Square'],
      answer: 'Triangle',
    },
  },
  primary: {
    label: 'Primary School',
    icon: '📘',
    subjects: ['English', 'Math', 'Science', 'Social Studies', 'ICT'],
    lessons: [
      {
        title: 'Sentence Builder',
        description: 'Create correct sentences using nouns, verbs, and adjectives.',
        tag: 'English',
        icon: '✍️',
      },
      {
        title: 'Fractions Fun',
        description: 'Learn halves and quarters using real-life sharing examples.',
        tag: 'Math',
        icon: '🍕',
      },
      {
        title: 'Plant Kingdom',
        description: 'Discover roots, stems, leaves, and how plants grow from seeds.',
        tag: 'Science',
        icon: '🌱',
      },
      {
        title: 'Our Community',
        description: 'Understand family roles, rules, and social responsibilities.',
        tag: 'Civics',
        icon: '🏠',
      },
    ],
    quiz: {
      question: 'Which part of the plant absorbs water from the soil?',
      options: ['Leaf', 'Flower', 'Root', 'Stem'],
      answer: 'Root',
    },
  },
  jss: {
    label: 'Junior Secondary',
    icon: '🧠',
    subjects: ['Grammar', 'Algebra', 'Biology', 'Geography', 'Coding'],
    lessons: [
      {
        title: 'Word Power',
        description: 'Improve vocabulary, grammar rules, and writing confidence.',
        tag: 'English',
        icon: '📚',
      },
      {
        title: 'Algebra Patterns',
        description: 'Solve expressions, identify variables, and simplify equations.',
        tag: 'Math',
        icon: '📐',
      },
      {
        title: 'Human Body',
        description: 'Study body systems and how they support life and movement.',
        tag: 'Biology',
        icon: '🫀',
      },
      {
        title: 'Mapping the World',
        description: 'Read maps, locate countries, and understand natural features.',
        tag: 'Geography',
        icon: '🌍',
      },
    ],
    quiz: {
      question: 'In algebra, what is the variable in 3x + 5?',
      options: ['3', 'x', '5', '+'],
      answer: 'x',
    },
  },
  ss3: {
    label: 'SS3 / Senior Secondary',
    icon: '🚀',
    subjects: ['Physics', 'Chemistry', 'Economics', 'Literature', 'Exam Prep'],
    lessons: [
      {
        title: 'Motion & Force',
        description: 'Understand speed, force, energy, and how objects move.',
        tag: 'Physics',
        icon: '⚙️',
      },
      {
        title: 'Atomic World',
        description: 'Learn about atoms, molecules, reactions, and part of the periodic table.',
        tag: 'Chemistry',
        icon: '🧪',
      },
      {
        title: 'Money Matters',
        description: 'Explore budgeting, trade, scarcity, and financial decisions.',
        tag: 'Economics',
        icon: '💰',
      },
      {
        title: 'Exam Strategy',
        description: 'Build revision habits, time management, and confidence for final exams.',
        tag: 'Prep',
        icon: '✅',
      },
    ],
    quiz: {
      question: 'What is the force that pulls objects toward Earth?',
      options: ['Magnetism', 'Gravity', 'Friction', 'Pressure'],
      answer: 'Gravity',
    },
  },
};

const overviewSubjects = [
  { icon: '📖', label: 'Literacy' },
  { icon: '➗', label: 'Math' },
  { icon: '🔬', label: 'Science' },
  { icon: '🎶', label: 'Arts' },
  { icon: '💻', label: 'Technology' },
];

const cardsMap = {
  kindergarten: '#kindergartenCards',
  primary: '#primaryCards',
  jss: '#jssCards',
  ss3: '#ss3Cards',
};

const overviewSubjectsEl = document.getElementById('overviewSubjects');
const quizCard = document.getElementById('quizCard');
const quizLevelBadge = document.getElementById('quizLevelBadge');

function renderOverviewSubjects() {
  overviewSubjectsEl.innerHTML = overviewSubjects
    .map(
      (subject) => `
        <div class="subject-pill">
          <span class="icon">${subject.icon}</span>
          <span>${subject.label}</span>
        </div>
      `
    )
    .join('');
}

function renderLessonCards(levelKey) {
  const container = document.querySelector(cardsMap[levelKey]);
  const levelData = levels[levelKey];

  container.innerHTML = levelData.lessons
    .map(
      (lesson) => `
        <article class="lesson-card">
          <div class="lesson-icon">${lesson.icon}</div>
          <h4>${lesson.title}</h4>
          <p>${lesson.description}</p>
          <div class="meta">
            <span class="lesson-chip">${lesson.tag}</span>
            <button class="try-btn" data-level="${levelKey}">Try it</button>
          </div>
        </article>
      `
    )
    .join('');
}

function renderQuiz(levelKey = 'kindergarten') {
  const levelData = levels[levelKey];
  quizLevelBadge.textContent = levelData.label;

  quizCard.innerHTML = `
    <div class="quiz-box">
      <h5>${levelData.quiz.question}</h5>
      <div class="answer-list">
        ${levelData.quiz.options
          .map(
            (option) => `
              <button class="answer-btn" data-answer="${option}">${option}</button>
            `
          )
          .join('')}
      </div>
      <div class="quiz-footer">
        <span class="score-pill">⭐ Score: 0</span>
        <button class="new-quiz-btn" id="newQuestionBtn">Next</button>
      </div>
    </div>
  `;

  const answerButtons = document.querySelectorAll('.answer-btn');
  const scoreDisplay = document.querySelector('.score-pill');

  answerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.answer;
      const correct = levelData.quiz.answer;
      let currentScore = Number(scoreDisplay.textContent.replace(/[^\d]/g, '')) || 0;

      answerButtons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.answer === correct) {
          btn.classList.add('correct');
        }
        if (btn.dataset.answer === selected && selected !== correct) {
          btn.classList.add('wrong');
        }
      });

      if (selected === correct) {
        currentScore += 1;
        scoreDisplay.textContent = `⭐ Score: ${currentScore}`;
      }
    });
  });

  const nextButton = document.getElementById('newQuestionBtn');
  nextButton.addEventListener('click', () => {
    renderQuiz(levelKey);
  });
}

function showPanel(target) {
  document.querySelectorAll('.panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === target);
  });

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.target === target);
  });

  if (target !== 'overview') {
    renderQuiz(target);
  }
}

Object.keys(levels).forEach((levelKey) => renderLessonCards(levelKey));
renderOverviewSubjects();
renderQuiz('kindergarten');

const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    showPanel(target);
  });
});

document.querySelectorAll('.primary-btn, .secondary-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    showPanel(target);
  });
});

document.querySelectorAll('.try-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const levelKey = button.dataset.level;
    showPanel(levelKey);
  });
});

showPanel('overview');
