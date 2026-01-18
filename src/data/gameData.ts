/**
 * Game Data for Magic Learning Playground
 * Contains questions, levels, and content for all activities
 */

import { Question } from '@/lib/gameEngine';

// ============ CLASS 1-3 DATA ============

export const alphabetMatchingQuestions: Question[] = [
  { id: 1, type: 'match', question: 'Match the letter with the picture', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A', hint: 'Apple starts with...', imageUrl: '🍎' },
  { id: 2, type: 'match', question: 'Match the letter with the picture', options: ['B', 'C', 'D', 'E'], correctAnswer: 'B', hint: 'Ball starts with...', imageUrl: '⚽' },
  { id: 3, type: 'match', question: 'Match the letter with the picture', options: ['C', 'D', 'E', 'F'], correctAnswer: 'C', hint: 'Cat starts with...', imageUrl: '🐱' },
  { id: 4, type: 'match', question: 'Match the letter with the picture', options: ['D', 'E', 'F', 'G'], correctAnswer: 'D', hint: 'Dog starts with...', imageUrl: '🐕' },
  { id: 5, type: 'match', question: 'Match the letter with the picture', options: ['E', 'F', 'G', 'H'], correctAnswer: 'E', hint: 'Elephant starts with...', imageUrl: '🐘' },
  { id: 6, type: 'match', question: 'Match the letter with the picture', options: ['F', 'G', 'H', 'I'], correctAnswer: 'F', hint: 'Fish starts with...', imageUrl: '🐟' },
  { id: 7, type: 'match', question: 'Match the letter with the picture', options: ['G', 'H', 'I', 'J'], correctAnswer: 'G', hint: 'Grapes start with...', imageUrl: '🍇' },
  { id: 8, type: 'match', question: 'Match the letter with the picture', options: ['H', 'I', 'J', 'K'], correctAnswer: 'H', hint: 'House starts with...', imageUrl: '🏠' },
  { id: 9, type: 'match', question: 'Match the letter with the picture', options: ['I', 'J', 'K', 'L'], correctAnswer: 'I', hint: 'Ice cream starts with...', imageUrl: '🍨' },
  { id: 10, type: 'match', question: 'Match the letter with the picture', options: ['J', 'K', 'L', 'M'], correctAnswer: 'J', hint: 'Jelly starts with...', imageUrl: '🍬' },
];

export const numberCountingQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Count the stars: ⭐⭐⭐', options: ['2', '3', '4', '5'], correctAnswer: '3', points: 10 },
  { id: 2, type: 'mcq', question: 'Count the apples: 🍎🍎🍎🍎🍎', options: ['3', '4', '5', '6'], correctAnswer: '5', points: 10 },
  { id: 3, type: 'mcq', question: 'Count the hearts: ❤️❤️', options: ['1', '2', '3', '4'], correctAnswer: '2', points: 10 },
  { id: 4, type: 'mcq', question: 'Count the flowers: 🌸🌸🌸🌸', options: ['2', '3', '4', '5'], correctAnswer: '4', points: 10 },
  { id: 5, type: 'mcq', question: 'Count the birds: 🐦🐦🐦🐦🐦🐦', options: ['4', '5', '6', '7'], correctAnswer: '6', points: 10 },
  { id: 6, type: 'mcq', question: 'What comes after 5?', options: ['4', '5', '6', '7'], correctAnswer: '6', points: 10 },
  { id: 7, type: 'mcq', question: 'What comes before 8?', options: ['6', '7', '8', '9'], correctAnswer: '7', points: 10 },
  { id: 8, type: 'mcq', question: 'Count the butterflies: 🦋🦋🦋🦋🦋🦋🦋', options: ['5', '6', '7', '8'], correctAnswer: '7', points: 10 },
  { id: 9, type: 'input', question: 'How many fingers do you have on one hand?', correctAnswer: '5', points: 15 },
  { id: 10, type: 'mcq', question: 'Which is the biggest? 3, 7, 2, 9', options: ['3', '7', '2', '9'], correctAnswer: '9', points: 15 },
];

export const colorShapeQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'What color is the sun? ☀️', options: ['Red', 'Yellow', 'Blue', 'Green'], correctAnswer: 'Yellow', points: 10 },
  { id: 2, type: 'mcq', question: 'What shape has 3 sides?', options: ['Circle', 'Square', 'Triangle', 'Rectangle'], correctAnswer: 'Triangle', points: 10 },
  { id: 3, type: 'mcq', question: 'What color is grass? 🌿', options: ['Yellow', 'Red', 'Green', 'Blue'], correctAnswer: 'Green', points: 10 },
  { id: 4, type: 'mcq', question: 'A ball is which shape?', options: ['Square', 'Triangle', 'Circle', 'Rectangle'], correctAnswer: 'Circle', points: 10 },
  { id: 5, type: 'mcq', question: 'What color is the sky? 🌤️', options: ['Red', 'Green', 'Yellow', 'Blue'], correctAnswer: 'Blue', points: 10 },
  { id: 6, type: 'mcq', question: 'A box has which shape?', options: ['Circle', 'Square', 'Triangle', 'Star'], correctAnswer: 'Square', points: 10 },
  { id: 7, type: 'mcq', question: 'What color is a ripe tomato? 🍅', options: ['Green', 'Yellow', 'Red', 'Orange'], correctAnswer: 'Red', points: 10 },
  { id: 8, type: 'mcq', question: 'How many sides does a rectangle have?', options: ['3', '4', '5', '6'], correctAnswer: '4', points: 15 },
  { id: 9, type: 'mcq', question: 'Mix red + yellow = ?', options: ['Green', 'Purple', 'Orange', 'Pink'], correctAnswer: 'Orange', points: 15 },
  { id: 10, type: 'mcq', question: 'A star shape has how many points?', options: ['3', '4', '5', '6'], correctAnswer: '5', points: 15 },
];

// ============ CLASS 4-6 DATA ============

export const mathQuizQuestions: Question[] = [
  { id: 1, type: 'mcq', question: '24 + 18 = ?', options: ['42', '40', '44', '38'], correctAnswer: '42', points: 10 },
  { id: 2, type: 'mcq', question: '56 - 29 = ?', options: ['25', '27', '29', '31'], correctAnswer: '27', points: 10 },
  { id: 3, type: 'mcq', question: '7 × 8 = ?', options: ['54', '56', '48', '64'], correctAnswer: '56', points: 15 },
  { id: 4, type: 'mcq', question: '72 ÷ 9 = ?', options: ['7', '8', '9', '6'], correctAnswer: '8', points: 15 },
  { id: 5, type: 'input', question: 'What is 15% of 200?', correctAnswer: '30', points: 20 },
  { id: 6, type: 'mcq', question: 'Simplify: 3/6', options: ['1/2', '1/3', '2/3', '1/4'], correctAnswer: '1/2', points: 15 },
  { id: 7, type: 'mcq', question: '(8 + 4) × 3 = ?', options: ['36', '24', '32', '28'], correctAnswer: '36', points: 15 },
  { id: 8, type: 'input', question: 'Area of square with side 9cm? (just number)', correctAnswer: '81', points: 20 },
  { id: 9, type: 'mcq', question: 'Which is greater: 0.5 or 1/3?', options: ['0.5', '1/3', 'Equal', 'Cannot compare'], correctAnswer: '0.5', points: 15 },
  { id: 10, type: 'mcq', question: 'Next prime after 7?', options: ['8', '9', '10', '11'], correctAnswer: '11', points: 20 },
];

export const tableRaceQuestions: Question[] = [
  { id: 1, type: 'input', question: '6 × 7 = ?', correctAnswer: '42', points: 10 },
  { id: 2, type: 'input', question: '8 × 9 = ?', correctAnswer: '72', points: 10 },
  { id: 3, type: 'input', question: '7 × 7 = ?', correctAnswer: '49', points: 10 },
  { id: 4, type: 'input', question: '9 × 6 = ?', correctAnswer: '54', points: 10 },
  { id: 5, type: 'input', question: '8 × 8 = ?', correctAnswer: '64', points: 10 },
  { id: 6, type: 'input', question: '12 × 5 = ?', correctAnswer: '60', points: 15 },
  { id: 7, type: 'input', question: '11 × 7 = ?', correctAnswer: '77', points: 15 },
  { id: 8, type: 'input', question: '9 × 9 = ?', correctAnswer: '81', points: 10 },
  { id: 9, type: 'input', question: '12 × 12 = ?', correctAnswer: '144', points: 20 },
  { id: 10, type: 'input', question: '15 × 4 = ?', correctAnswer: '60', points: 15 },
];

export const fractionQuestions: Question[] = [
  { id: 1, type: 'mcq', question: '1/2 + 1/2 = ?', options: ['1', '1/4', '2/4', '1/2'], correctAnswer: '1', points: 10 },
  { id: 2, type: 'mcq', question: '3/4 - 1/4 = ?', options: ['2/4', '1/2', '4/4', '1/4'], correctAnswer: '1/2', points: 10 },
  { id: 3, type: 'mcq', question: 'Which is bigger: 2/3 or 3/4?', options: ['2/3', '3/4', 'Equal', 'Cannot tell'], correctAnswer: '3/4', points: 15 },
  { id: 4, type: 'mcq', question: '1/4 of 20 = ?', options: ['4', '5', '6', '8'], correctAnswer: '5', points: 15 },
  { id: 5, type: 'input', question: '2/5 + 2/5 = ? (e.g., 4/5)', correctAnswer: '4/5', points: 15 },
  { id: 6, type: 'mcq', question: 'Simplify 6/8', options: ['3/4', '2/4', '3/8', '6/4'], correctAnswer: '3/4', points: 15 },
  { id: 7, type: 'mcq', question: '1/3 × 3 = ?', options: ['3', '1', '1/9', '9'], correctAnswer: '1', points: 15 },
  { id: 8, type: 'mcq', question: 'Convert 0.25 to fraction', options: ['1/2', '1/4', '1/5', '2/5'], correctAnswer: '1/4', points: 20 },
  { id: 9, type: 'mcq', question: '5/6 - 1/6 = ?', options: ['4/6', '6/6', '4/12', '1/6'], correctAnswer: '4/6', points: 15 },
  { id: 10, type: 'input', question: '1/2 × 1/2 = ? (e.g., 1/4)', correctAnswer: '1/4', points: 20 },
];

export const scienceLabelingQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Which organ pumps blood?', options: ['Brain', 'Heart', 'Lungs', 'Liver'], correctAnswer: 'Heart', points: 10 },
  { id: 2, type: 'mcq', question: 'Plants make food using...?', options: ['Roots', 'Flowers', 'Leaves', 'Stem'], correctAnswer: 'Leaves', points: 10 },
  { id: 3, type: 'mcq', question: 'Water cycle: After evaporation comes...?', options: ['Rain', 'Condensation', 'Collection', 'Freezing'], correctAnswer: 'Condensation', points: 15 },
  { id: 4, type: 'mcq', question: 'The Sun is a...?', options: ['Planet', 'Moon', 'Star', 'Asteroid'], correctAnswer: 'Star', points: 10 },
  { id: 5, type: 'mcq', question: 'Bones are connected by...?', options: ['Muscles', 'Joints', 'Blood', 'Nerves'], correctAnswer: 'Joints', points: 15 },
  { id: 6, type: 'mcq', question: 'Which gas do we breathe in?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], correctAnswer: 'Oxygen', points: 10 },
  { id: 7, type: 'mcq', question: 'Photosynthesis needs sunlight and...?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'], correctAnswer: 'Carbon dioxide', points: 15 },
  { id: 8, type: 'mcq', question: 'How many planets in our solar system?', options: ['7', '8', '9', '10'], correctAnswer: '8', points: 15 },
  { id: 9, type: 'mcq', question: 'Which planet is the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Mars', points: 15 },
  { id: 10, type: 'mcq', question: 'Caterpillar transforms into a...?', options: ['Bird', 'Butterfly', 'Bee', 'Ant'], correctAnswer: 'Butterfly', points: 10 },
];

// ============ CLASS 7-8 DATA ============

export const memoryGridItems = [
  { id: 1, symbol: '🔴', name: 'Red' },
  { id: 2, symbol: '🔵', name: 'Blue' },
  { id: 3, symbol: '🟢', name: 'Green' },
  { id: 4, symbol: '🟡', name: 'Yellow' },
  { id: 5, symbol: '🟣', name: 'Purple' },
  { id: 6, symbol: '🟠', name: 'Orange' },
  { id: 7, symbol: '⭐', name: 'Star' },
  { id: 8, symbol: '❤️', name: 'Heart' },
];

export const logicPuzzleQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Complete: 2, 4, 8, 16, ?', options: ['20', '24', '32', '18'], correctAnswer: '32', points: 15 },
  { id: 2, type: 'mcq', question: 'If A=1, B=2, C=3... What is CAT?', options: ['24', '27', '6', '48'], correctAnswer: '24', hint: 'C(3) + A(1) + T(20) = ?', points: 20 },
  { id: 3, type: 'mcq', question: 'Find odd one: 2, 5, 7, 11, 12, 13', options: ['2', '5', '12', '13'], correctAnswer: '12', hint: 'Look for primes', points: 15 },
  { id: 4, type: 'input', question: 'Next: 1, 1, 2, 3, 5, 8, ?', correctAnswer: '13', hint: 'Fibonacci sequence', points: 20 },
  { id: 5, type: 'mcq', question: 'If NORTH = 5, SOUTH = 5, EAST = ?', options: ['3', '4', '5', '6'], correctAnswer: '4', hint: 'Count the letters', points: 15 },
  { id: 6, type: 'mcq', question: 'Mirror image of ☐ is...?', options: ['☐', '◇', '△', '○'], correctAnswer: '☐', points: 10 },
  { id: 7, type: 'input', question: 'Pattern: 3, 6, 11, 18, ? (add increasing odd)', correctAnswer: '27', points: 20 },
  { id: 8, type: 'mcq', question: '6 people shake hands with each other. How many handshakes?', options: ['15', '12', '18', '30'], correctAnswer: '15', hint: 'n(n-1)/2', points: 25 },
  { id: 9, type: 'mcq', question: 'A is B\'s sister. B is C\'s mother. What is A to C?', options: ['Aunt', 'Mother', 'Sister', 'Grandmother'], correctAnswer: 'Aunt', points: 20 },
  { id: 10, type: 'input', question: 'Complete: 1, 4, 9, 16, 25, ?', correctAnswer: '36', hint: 'Perfect squares', points: 15 },
];

export const algebraQuestions: Question[] = [
  { id: 1, type: 'input', question: 'Solve: x + 5 = 12', correctAnswer: '7', points: 10 },
  { id: 2, type: 'input', question: 'Solve: 2x = 18', correctAnswer: '9', points: 10 },
  { id: 3, type: 'input', question: 'Solve: 3x + 4 = 19', correctAnswer: '5', points: 15 },
  { id: 4, type: 'mcq', question: 'Simplify: 2(x + 3)', options: ['2x + 3', '2x + 6', 'x + 6', '2x + 5'], correctAnswer: '2x + 6', points: 15 },
  { id: 5, type: 'input', question: 'If x = 3, find 2x² + 1', correctAnswer: '19', points: 20 },
  { id: 6, type: 'mcq', question: 'What is the value of x in x/4 = 8?', options: ['2', '12', '32', '4'], correctAnswer: '32', points: 15 },
  { id: 7, type: 'input', question: 'Solve: 5x - 3 = 2x + 9', correctAnswer: '4', points: 20 },
  { id: 8, type: 'mcq', question: 'Expand (x + 2)(x + 3)', options: ['x² + 5x + 6', 'x² + 6x + 5', '2x + 5', 'x² + 5'], correctAnswer: 'x² + 5x + 6', points: 20 },
  { id: 9, type: 'input', question: 'Find x: x² = 49, x > 0', correctAnswer: '7', points: 15 },
  { id: 10, type: 'mcq', question: 'Factor: x² - 9', options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)²', 'x(x-9)'], correctAnswer: '(x-3)(x+3)', points: 25 },
];

// ============ CLASS 9-10 DATA ============

export const advancedMathQuestions: Question[] = [
  { id: 1, type: 'input', question: 'Solve: √144 + √81', correctAnswer: '21', points: 15 },
  { id: 2, type: 'mcq', question: 'Find discriminant of x² - 5x + 6 = 0', options: ['1', '-1', '25', '49'], correctAnswer: '1', points: 20 },
  { id: 3, type: 'input', question: 'sin 30° × cos 60° = ? (decimal)', correctAnswer: '0.25', points: 20 },
  { id: 4, type: 'mcq', question: 'log₁₀(1000) = ?', options: ['2', '3', '4', '10'], correctAnswer: '3', points: 20 },
  { id: 5, type: 'input', question: 'Find the 10th term of AP: 3, 7, 11, 15...', correctAnswer: '39', hint: 'a + (n-1)d', points: 20 },
  { id: 6, type: 'mcq', question: 'Probability of getting head in one toss?', options: ['0', '0.5', '1', '0.25'], correctAnswer: '0.5', points: 15 },
  { id: 7, type: 'input', question: 'Sum of interior angles of hexagon? (degrees)', correctAnswer: '720', points: 20 },
  { id: 8, type: 'mcq', question: 'If tan θ = 1, then θ = ?', options: ['30°', '45°', '60°', '90°'], correctAnswer: '45°', points: 20 },
  { id: 9, type: 'input', question: 'Volume of cube with edge 5cm? (cm³)', correctAnswer: '125', points: 15 },
  { id: 10, type: 'mcq', question: '2^10 = ?', options: ['512', '1024', '2048', '256'], correctAnswer: '1024', points: 20 },
];

export const physicsQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'SI unit of Force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correctAnswer: 'Newton', points: 10 },
  { id: 2, type: 'mcq', question: 'Speed = Distance / ?', options: ['Mass', 'Time', 'Force', 'Area'], correctAnswer: 'Time', points: 10 },
  { id: 3, type: 'input', question: 'An object travels 100m in 20s. Speed? (m/s)', correctAnswer: '5', points: 15 },
  { id: 4, type: 'mcq', question: 'Which law: F = ma?', options: ['First', 'Second', 'Third', 'Gravity'], correctAnswer: 'Second', points: 15 },
  { id: 5, type: 'mcq', question: 'Energy stored in stretched spring?', options: ['Kinetic', 'Potential', 'Heat', 'Light'], correctAnswer: 'Potential', points: 15 },
  { id: 6, type: 'input', question: 'Work done = 50J, Force = 10N. Displacement? (m)', correctAnswer: '5', points: 20 },
  { id: 7, type: 'mcq', question: 'Sound travels fastest in?', options: ['Air', 'Water', 'Steel', 'Vacuum'], correctAnswer: 'Steel', points: 15 },
  { id: 8, type: 'mcq', question: 'Mirror that magnifies?', options: ['Plane', 'Convex', 'Concave', 'Prism'], correctAnswer: 'Concave', points: 15 },
  { id: 9, type: 'input', question: 'Power = 1000W, Time = 2s. Energy? (J)', correctAnswer: '2000', points: 20 },
  { id: 10, type: 'mcq', question: 'Ohm\'s law: V = ?', options: ['IR', 'I/R', 'R/I', 'I²R'], correctAnswer: 'IR', points: 15 },
];

export const chemistryQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Symbol for Gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correctAnswer: 'Au', points: 10 },
  { id: 2, type: 'mcq', question: 'Atomic number of Carbon?', options: ['4', '6', '8', '12'], correctAnswer: '6', points: 10 },
  { id: 3, type: 'input', question: 'Number of elements in H₂O?', correctAnswer: '2', points: 10 },
  { id: 4, type: 'mcq', question: 'Which is a noble gas?', options: ['Oxygen', 'Nitrogen', 'Helium', 'Hydrogen'], correctAnswer: 'Helium', points: 15 },
  { id: 5, type: 'mcq', question: 'pH of pure water?', options: ['0', '7', '14', '1'], correctAnswer: '7', points: 15 },
  { id: 6, type: 'mcq', question: 'Acid + Base = ?', options: ['Salt + Water', 'Gas', 'More acid', 'Metal'], correctAnswer: 'Salt + Water', points: 15 },
  { id: 7, type: 'input', question: 'How many atoms in CO₂?', correctAnswer: '3', points: 15 },
  { id: 8, type: 'mcq', question: 'Hardest natural substance?', options: ['Iron', 'Steel', 'Diamond', 'Granite'], correctAnswer: 'Diamond', points: 15 },
  { id: 9, type: 'mcq', question: 'Rusting is what type of change?', options: ['Physical', 'Chemical', 'Nuclear', 'Temporary'], correctAnswer: 'Chemical', points: 15 },
  { id: 10, type: 'input', question: 'Mass number = protons + ?', correctAnswer: 'neutrons', points: 20 },
];

// ============ ACTIVITY CONFIGURATIONS ============

export interface ActivityConfig {
  id: number;
  title: string;
  description: string;
  type: 'learn' | 'play' | 'practice' | 'quiz';
  gameType: string;
  timeLimit?: number; // seconds
  questions?: Question[];
  xpReward: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  unlockAfter?: number; // activity id
}

export const getActivitiesForClass = (classNumber: number, subject: string): ActivityConfig[] => {
  if (classNumber <= 3) {
    return [
      { id: 1, title: 'Learn Letters', description: 'Interactive alphabet lesson', type: 'learn', gameType: 'flashcard', xpReward: 50, difficulty: 1 },
      { id: 2, title: 'Alphabet Match', description: 'Match letters to pictures', type: 'play', gameType: 'matching', questions: alphabetMatchingQuestions, timeLimit: 120, xpReward: 75, difficulty: 1 },
      { id: 3, title: 'Count & Learn', description: 'Practice counting objects', type: 'practice', gameType: 'counting', questions: numberCountingQuestions, xpReward: 60, difficulty: 1 },
      { id: 4, title: 'Colors & Shapes', description: 'Test your color knowledge', type: 'quiz', gameType: 'quiz', questions: colorShapeQuestions, timeLimit: 180, xpReward: 100, difficulty: 2, unlockAfter: 2 },
      { id: 5, title: 'Animal Alphabet Puzzle', description: 'Drag animals to their letters!', type: 'play', gameType: 'dragdrop', xpReward: 80, difficulty: 1 },
      { id: 6, title: 'Count & Match Puzzle', description: 'Match objects to numbers!', type: 'play', gameType: 'dragdrop', xpReward: 80, difficulty: 1 },
      { id: 7, title: 'Shape Names Puzzle', description: 'Learn shape names by matching!', type: 'practice', gameType: 'dragdrop', xpReward: 70, difficulty: 1 },
      { id: 8, title: 'Color Match Puzzle', description: 'Match objects to their colors!', type: 'practice', gameType: 'dragdrop', xpReward: 70, difficulty: 1 },
      { id: 9, title: 'Daily Routine Story', description: 'Put daily activities in order!', type: 'play', gameType: 'dragdrop', xpReward: 90, difficulty: 2, unlockAfter: 5 },
    ];
  } else if (classNumber <= 6) {
    if (subject === 'math') {
      return [
        { id: 1, title: 'Math Basics', description: 'Learn operations', type: 'learn', gameType: 'flashcard', xpReward: 60, difficulty: 2 },
        { id: 2, title: 'Quick Math Quiz', description: 'Test your calculation speed', type: 'quiz', gameType: 'quiz', questions: mathQuizQuestions, timeLimit: 180, xpReward: 100, difficulty: 2 },
        { id: 3, title: 'Table Race', description: 'Master multiplication tables', type: 'play', gameType: 'input', questions: tableRaceQuestions, timeLimit: 90, xpReward: 120, difficulty: 3 },
        { id: 4, title: 'Fraction Fun', description: 'Learn fractions step by step', type: 'practice', gameType: 'quiz', questions: fractionQuestions, xpReward: 100, difficulty: 3, unlockAfter: 2 },
        { id: 5, title: 'Math Challenge', description: 'Advanced problem solving', type: 'quiz', gameType: 'quiz', questions: mathQuizQuestions, timeLimit: 120, xpReward: 150, difficulty: 4, unlockAfter: 3 },
      ];
    }
    return [
      { id: 1, title: 'Science Basics', description: 'Learn about nature', type: 'learn', gameType: 'flashcard', xpReward: 60, difficulty: 2 },
      { id: 2, title: 'Body & Nature', description: 'Label body parts and plants', type: 'play', gameType: 'quiz', questions: scienceLabelingQuestions, timeLimit: 180, xpReward: 100, difficulty: 2 },
      { id: 3, title: 'Science Explorer', description: 'Interactive experiments', type: 'practice', gameType: 'quiz', questions: scienceLabelingQuestions, xpReward: 90, difficulty: 3 },
      { id: 4, title: 'Science Quiz', description: 'Test your knowledge', type: 'quiz', gameType: 'quiz', questions: scienceLabelingQuestions, timeLimit: 150, xpReward: 120, difficulty: 3, unlockAfter: 2 },
    ];
  } else if (classNumber <= 8) {
    if (subject === 'math') {
      return [
        { id: 1, title: 'Algebra Intro', description: 'Learn variables and equations', type: 'learn', gameType: 'flashcard', xpReward: 80, difficulty: 3 },
        { id: 2, title: 'Solve Equations', description: 'Practice algebra step by step', type: 'practice', gameType: 'input', questions: algebraQuestions, xpReward: 120, difficulty: 3 },
        { id: 3, title: 'Logic Puzzles', description: 'Train your brain with patterns', type: 'play', gameType: 'quiz', questions: logicPuzzleQuestions, timeLimit: 300, xpReward: 150, difficulty: 4 },
        { id: 4, title: 'Memory Grid', description: 'Test your memory skills', type: 'play', gameType: 'memory', xpReward: 100, difficulty: 3 },
        { id: 5, title: 'Algebra Master', description: 'Advanced equation solving', type: 'quiz', gameType: 'quiz', questions: algebraQuestions, timeLimit: 180, xpReward: 180, difficulty: 4, unlockAfter: 2 },
      ];
    }
    return [
      { id: 1, title: 'Science Theory', description: 'Learn scientific concepts', type: 'learn', gameType: 'flashcard', xpReward: 80, difficulty: 3 },
      { id: 2, title: 'Virtual Lab', description: 'Interactive experiments', type: 'practice', gameType: 'simulation', xpReward: 120, difficulty: 3 },
      { id: 3, title: 'Memory Challenge', description: 'Scientific term memory game', type: 'play', gameType: 'memory', xpReward: 100, difficulty: 3 },
      { id: 4, title: 'Science Test', description: 'Comprehensive quiz', type: 'quiz', gameType: 'quiz', questions: scienceLabelingQuestions, timeLimit: 200, xpReward: 150, difficulty: 4, unlockAfter: 2 },
    ];
  } else {
    // Class 9-10
    if (subject === 'math') {
      return [
        { id: 1, title: 'Advanced Math', description: 'Trigonometry & algebra', type: 'learn', gameType: 'flashcard', xpReward: 100, difficulty: 4 },
        { id: 2, title: 'Problem Solving', description: 'Step-by-step solutions', type: 'practice', gameType: 'input', questions: advancedMathQuestions, xpReward: 150, difficulty: 4 },
        { id: 3, title: 'Math Olympiad', description: 'Challenge level problems', type: 'quiz', gameType: 'quiz', questions: advancedMathQuestions, timeLimit: 300, xpReward: 200, difficulty: 5, unlockAfter: 2 },
        { id: 4, title: 'Exam Mode', description: 'Timed exam simulation', type: 'quiz', gameType: 'exam', questions: advancedMathQuestions, timeLimit: 600, xpReward: 250, difficulty: 5, unlockAfter: 3 },
      ];
    }
    if (subject === 'science') {
      return [
        { id: 1, title: 'Physics Fundamentals', description: 'Laws of motion & energy', type: 'learn', gameType: 'flashcard', xpReward: 100, difficulty: 4 },
        { id: 2, title: 'Physics Problems', description: 'Numerical problem solving', type: 'practice', gameType: 'input', questions: physicsQuestions, xpReward: 150, difficulty: 4 },
        { id: 3, title: 'Chemistry Basics', description: 'Elements & compounds', type: 'learn', gameType: 'flashcard', xpReward: 100, difficulty: 4 },
        { id: 4, title: 'Chemistry Quiz', description: 'Test your chemistry', type: 'quiz', gameType: 'quiz', questions: chemistryQuestions, timeLimit: 240, xpReward: 180, difficulty: 4, unlockAfter: 3 },
        { id: 5, title: 'Science Exam', description: 'Full exam simulation', type: 'quiz', gameType: 'exam', questions: [...physicsQuestions, ...chemistryQuestions], timeLimit: 900, xpReward: 300, difficulty: 5, unlockAfter: 4 },
      ];
    }
    return [
      { id: 1, title: 'Concept Learning', description: 'Master the fundamentals', type: 'learn', gameType: 'flashcard', xpReward: 100, difficulty: 4 },
      { id: 2, title: 'Practice Set', description: 'Apply your knowledge', type: 'practice', gameType: 'quiz', questions: advancedMathQuestions, xpReward: 150, difficulty: 4 },
      { id: 3, title: 'Quick Quiz', description: 'Test yourself', type: 'quiz', gameType: 'quiz', questions: advancedMathQuestions, timeLimit: 180, xpReward: 180, difficulty: 4 },
      { id: 4, title: 'Final Exam', description: 'Comprehensive assessment', type: 'quiz', gameType: 'exam', questions: advancedMathQuestions, timeLimit: 600, xpReward: 250, difficulty: 5, unlockAfter: 3 },
    ];
  }
};
