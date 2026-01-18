/**
 * Game Data for Magic Learning Playground
 * Contains questions, levels, and content for all activities
 * Organized by class level (1-10) with comprehensive game coverage
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

export const animalQuizQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Which animal says "Moo"? 🐄', options: ['Dog', 'Cat', 'Cow', 'Bird'], correctAnswer: 'Cow', points: 10 },
  { id: 2, type: 'mcq', question: 'Which animal has a long trunk? 🐘', options: ['Lion', 'Elephant', 'Tiger', 'Bear'], correctAnswer: 'Elephant', points: 10 },
  { id: 3, type: 'mcq', question: 'Which animal is the King of the Jungle?', options: ['Tiger', 'Elephant', 'Lion', 'Bear'], correctAnswer: 'Lion', points: 10 },
  { id: 4, type: 'mcq', question: 'Which animal can fly? 🕊️', options: ['Fish', 'Dog', 'Bird', 'Cat'], correctAnswer: 'Bird', points: 10 },
  { id: 5, type: 'mcq', question: 'Which animal lives in water? 🐟', options: ['Dog', 'Fish', 'Cat', 'Rabbit'], correctAnswer: 'Fish', points: 10 },
  { id: 6, type: 'mcq', question: 'What does a caterpillar become?', options: ['Bird', 'Butterfly', 'Bee', 'Ant'], correctAnswer: 'Butterfly', points: 15 },
  { id: 7, type: 'mcq', question: 'Which animal has spots?', options: ['Zebra', 'Leopard', 'Horse', 'Elephant'], correctAnswer: 'Leopard', points: 10 },
  { id: 8, type: 'mcq', question: 'Which animal gives us wool?', options: ['Cow', 'Goat', 'Sheep', 'Hen'], correctAnswer: 'Sheep', points: 15 },
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

export const grammarQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Which is a noun? "The cat sat on the mat."', options: ['sat', 'on', 'cat', 'the'], correctAnswer: 'cat', points: 10 },
  { id: 2, type: 'mcq', question: 'Which is a verb? "She runs every morning."', options: ['She', 'runs', 'every', 'morning'], correctAnswer: 'runs', points: 10 },
  { id: 3, type: 'mcq', question: 'Correct sentence?', options: ['He go to school.', 'He goes to school.', 'He going to school.', 'He gone to school.'], correctAnswer: 'He goes to school.', points: 15 },
  { id: 4, type: 'mcq', question: 'Plural of "child"?', options: ['childs', 'childrens', 'children', 'childies'], correctAnswer: 'children', points: 10 },
  { id: 5, type: 'mcq', question: 'Past tense of "eat"?', options: ['eated', 'ate', 'eaten', 'eating'], correctAnswer: 'ate', points: 10 },
  { id: 6, type: 'mcq', question: 'Which is an adjective? "The big dog barked."', options: ['The', 'big', 'dog', 'barked'], correctAnswer: 'big', points: 15 },
  { id: 7, type: 'mcq', question: 'Opposite of "fast"?', options: ['quick', 'slow', 'rapid', 'swift'], correctAnswer: 'slow', points: 10 },
  { id: 8, type: 'mcq', question: 'Synonym of "happy"?', options: ['sad', 'angry', 'joyful', 'tired'], correctAnswer: 'joyful', points: 10 },
];

export const geographyQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Which is the largest continent?', options: ['Africa', 'Asia', 'Europe', 'Australia'], correctAnswer: 'Asia', points: 10 },
  { id: 2, type: 'mcq', question: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correctAnswer: 'Pacific', points: 10 },
  { id: 3, type: 'mcq', question: 'Capital of India?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], correctAnswer: 'New Delhi', points: 10 },
  { id: 4, type: 'mcq', question: 'Which country has the Great Wall?', options: ['Japan', 'India', 'China', 'Korea'], correctAnswer: 'China', points: 15 },
  { id: 5, type: 'mcq', question: 'Mount Everest is in which mountain range?', options: ['Alps', 'Andes', 'Himalayas', 'Rockies'], correctAnswer: 'Himalayas', points: 15 },
  { id: 6, type: 'mcq', question: 'The Nile river is in which continent?', options: ['Asia', 'Europe', 'Africa', 'America'], correctAnswer: 'Africa', points: 15 },
  { id: 7, type: 'mcq', question: 'How many continents are there?', options: ['5', '6', '7', '8'], correctAnswer: '7', points: 10 },
  { id: 8, type: 'mcq', question: 'Which is the smallest continent?', options: ['Europe', 'Africa', 'Australia', 'Antarctica'], correctAnswer: 'Australia', points: 10 },
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

export const geometryQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', points: 10 },
  { id: 2, type: 'mcq', question: 'Area formula for rectangle?', options: ['l + b', 'l × b', '2(l + b)', 'l × l'], correctAnswer: 'l × b', points: 10 },
  { id: 3, type: 'input', question: 'Perimeter of square with side 5cm?', correctAnswer: '20', points: 10 },
  { id: 4, type: 'mcq', question: 'A right angle equals?', options: ['45°', '60°', '90°', '180°'], correctAnswer: '90°', points: 10 },
  { id: 5, type: 'mcq', question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: '6', points: 10 },
  { id: 6, type: 'input', question: 'Area of circle with radius 7? (use π=22/7)', correctAnswer: '154', points: 20 },
  { id: 7, type: 'mcq', question: 'Pythagoras theorem: a² + b² = ?', options: ['c', 'c²', '2c', 'c/2'], correctAnswer: 'c²', points: 15 },
  { id: 8, type: 'mcq', question: 'Complementary angles sum to?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '90°', points: 15 },
];

export const biologyQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'Basic unit of life?', options: ['Atom', 'Cell', 'Tissue', 'Organ'], correctAnswer: 'Cell', points: 10 },
  { id: 2, type: 'mcq', question: 'Powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], correctAnswer: 'Mitochondria', points: 15 },
  { id: 3, type: 'mcq', question: 'DNA stands for?', options: ['Deoxyribonucleic acid', 'Dinucleic acid', 'Dual nucleic acid', 'Direct nucleic acid'], correctAnswer: 'Deoxyribonucleic acid', points: 15 },
  { id: 4, type: 'mcq', question: 'Which blood cells fight infection?', options: ['RBC', 'WBC', 'Platelets', 'Plasma'], correctAnswer: 'WBC', points: 10 },
  { id: 5, type: 'mcq', question: 'Photosynthesis occurs in which organelle?', options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Vacuole'], correctAnswer: 'Chloroplast', points: 15 },
  { id: 6, type: 'mcq', question: 'Largest organ in human body?', options: ['Liver', 'Brain', 'Skin', 'Heart'], correctAnswer: 'Skin', points: 10 },
  { id: 7, type: 'mcq', question: 'How many chromosomes do humans have?', options: ['23', '44', '46', '48'], correctAnswer: '46', points: 15 },
  { id: 8, type: 'mcq', question: 'Which vitamin helps in blood clotting?', options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'], correctAnswer: 'Vitamin K', points: 15 },
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

export const historyQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'When did India gain independence?', options: ['1945', '1947', '1950', '1942'], correctAnswer: '1947', points: 10 },
  { id: 2, type: 'mcq', question: 'Who was the first Prime Minister of India?', options: ['Mahatma Gandhi', 'Sardar Patel', 'Jawaharlal Nehru', 'Dr. Rajendra Prasad'], correctAnswer: 'Jawaharlal Nehru', points: 10 },
  { id: 3, type: 'mcq', question: 'The French Revolution began in?', options: ['1776', '1789', '1799', '1815'], correctAnswer: '1789', points: 15 },
  { id: 4, type: 'mcq', question: 'Who built the Taj Mahal?', options: ['Akbar', 'Shah Jahan', 'Jahangir', 'Aurangzeb'], correctAnswer: 'Shah Jahan', points: 10 },
  { id: 5, type: 'mcq', question: 'World War II ended in?', options: ['1942', '1944', '1945', '1946'], correctAnswer: '1945', points: 15 },
  { id: 6, type: 'mcq', question: 'The Renaissance began in which country?', options: ['France', 'Germany', 'Italy', 'England'], correctAnswer: 'Italy', points: 15 },
  { id: 7, type: 'mcq', question: 'Who discovered America?', options: ['Vasco da Gama', 'Columbus', 'Magellan', 'Captain Cook'], correctAnswer: 'Columbus', points: 10 },
  { id: 8, type: 'mcq', question: 'The Industrial Revolution started in?', options: ['France', 'USA', 'Britain', 'Germany'], correctAnswer: 'Britain', points: 15 },
];

export const economicsQuestions: Question[] = [
  { id: 1, type: 'mcq', question: 'What is GDP?', options: ['Gross Domestic Product', 'General Domestic Price', 'Grand Development Plan', 'Growth Development Process'], correctAnswer: 'Gross Domestic Product', points: 10 },
  { id: 2, type: 'mcq', question: 'Inflation means?', options: ['Decrease in prices', 'Increase in prices', 'Stable prices', 'No change'], correctAnswer: 'Increase in prices', points: 10 },
  { id: 3, type: 'mcq', question: 'Reserve Bank of India established in?', options: ['1935', '1947', '1950', '1969'], correctAnswer: '1935', points: 15 },
  { id: 4, type: 'mcq', question: 'Primary sector includes?', options: ['Manufacturing', 'Services', 'Agriculture', 'Banking'], correctAnswer: 'Agriculture', points: 10 },
  { id: 5, type: 'mcq', question: 'Which is NOT a direct tax?', options: ['Income Tax', 'GST', 'Wealth Tax', 'Corporate Tax'], correctAnswer: 'GST', points: 15 },
  { id: 6, type: 'mcq', question: 'Demand and supply determine?', options: ['Price', 'Quantity', 'Quality', 'All of these'], correctAnswer: 'Price', points: 10 },
  { id: 7, type: 'mcq', question: 'HDI stands for?', options: ['Human Development Index', 'Health Development Index', 'High Demand Index', 'Household Data Index'], correctAnswer: 'Human Development Index', points: 15 },
  { id: 8, type: 'mcq', question: 'Green Revolution increased production of?', options: ['Cash crops', 'Food grains', 'Flowers', 'Spices'], correctAnswer: 'Food grains', points: 10 },
];

// ============ ACTIVITY CONFIGURATIONS ============

export interface ActivityConfig {
  id: number;
  title: string;
  description: string;
  type: 'play' | 'practice' | 'quiz';
  gameType: string;
  timeLimit?: number; // seconds
  questions?: Question[];
  xpReward: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  unlockAfter?: number; // activity id
}

export const getActivitiesForClass = (classNumber: number, subject: string): ActivityConfig[] => {
  // CLASS 1-3: Basic games with simple interactions
  if (classNumber <= 3) {
    if (subject === 'english') {
      return [
        { id: 1, title: 'Alphabet Match', description: 'Match letters to pictures', type: 'play', gameType: 'matching', questions: alphabetMatchingQuestions, timeLimit: 120, xpReward: 75, difficulty: 1 },
        { id: 2, title: 'Animal Alphabet Puzzle', description: 'Drag animals to their letters!', type: 'play', gameType: 'dragdrop', xpReward: 80, difficulty: 1 },
        { id: 3, title: 'Word Building', description: 'Build simple words', type: 'practice', gameType: 'dragdrop', xpReward: 70, difficulty: 1 },
        { id: 4, title: 'Alphabet Quiz', description: 'Test your alphabet knowledge', type: 'quiz', gameType: 'quiz', questions: alphabetMatchingQuestions, timeLimit: 90, xpReward: 90, difficulty: 2, unlockAfter: 1 },
      ];
    }
    if (subject === 'math') {
      return [
        { id: 1, title: 'Count & Learn', description: 'Practice counting objects', type: 'practice', gameType: 'counting', questions: numberCountingQuestions, xpReward: 60, difficulty: 1 },
        { id: 2, title: 'Number Puzzle', description: 'Match objects to numbers!', type: 'play', gameType: 'dragdrop', xpReward: 80, difficulty: 1 },
        { id: 3, title: 'Colors & Shapes', description: 'Learn shapes and colors', type: 'quiz', gameType: 'quiz', questions: colorShapeQuestions, timeLimit: 180, xpReward: 100, difficulty: 2, unlockAfter: 1 },
        { id: 4, title: 'Shape Match Puzzle', description: 'Match shapes correctly!', type: 'play', gameType: 'dragdrop', xpReward: 80, difficulty: 1 },
        { id: 5, title: 'Number Memory', description: 'Remember the numbers!', type: 'play', gameType: 'memory', xpReward: 90, difficulty: 2, unlockAfter: 2 },
      ];
    }
    if (subject === 'science') {
      return [
        { id: 1, title: 'Animal Quiz', description: 'Learn about animals', type: 'quiz', gameType: 'quiz', questions: animalQuizQuestions, timeLimit: 120, xpReward: 80, difficulty: 1 },
        { id: 2, title: 'Animal Sounds', description: 'Match animals to sounds', type: 'play', gameType: 'dragdrop', xpReward: 70, difficulty: 1 },
        { id: 3, title: 'Nature Colors', description: 'Colors in nature', type: 'practice', gameType: 'quiz', questions: colorShapeQuestions, xpReward: 60, difficulty: 1 },
        { id: 4, title: 'Animal Memory', description: 'Remember the animals!', type: 'play', gameType: 'memory', xpReward: 85, difficulty: 2, unlockAfter: 1 },
      ];
    }
    // Default for other subjects (art, etc.)
    return [
      { id: 1, title: 'Color Match Puzzle', description: 'Match objects to colors!', type: 'play', gameType: 'dragdrop', xpReward: 70, difficulty: 1 },
      { id: 2, title: 'Shape Fun', description: 'Play with shapes', type: 'practice', gameType: 'quiz', questions: colorShapeQuestions, xpReward: 60, difficulty: 1 },
      { id: 3, title: 'Creative Quiz', description: 'Test your creativity', type: 'quiz', gameType: 'quiz', questions: colorShapeQuestions, timeLimit: 120, xpReward: 80, difficulty: 1 },
    ];
  }

  // CLASS 4-6: Intermediate games with more complexity
  if (classNumber <= 6) {
    if (subject === 'math') {
      return [
        { id: 1, title: 'Quick Math Quiz', description: 'Test your calculation speed', type: 'quiz', gameType: 'quiz', questions: mathQuizQuestions, timeLimit: 180, xpReward: 100, difficulty: 2 },
        { id: 2, title: 'Table Race', description: 'Master multiplication tables', type: 'play', gameType: 'input', questions: tableRaceQuestions, timeLimit: 90, xpReward: 120, difficulty: 3 },
        { id: 3, title: 'Fraction Fun', description: 'Learn fractions step by step', type: 'practice', gameType: 'quiz', questions: fractionQuestions, xpReward: 100, difficulty: 3, unlockAfter: 1 },
        { id: 4, title: 'Math Challenge', description: 'Advanced problem solving', type: 'quiz', gameType: 'quiz', questions: mathQuizQuestions, timeLimit: 120, xpReward: 150, difficulty: 4, unlockAfter: 2 },
        { id: 5, title: 'Number Memory Grid', description: 'Train your memory with math', type: 'play', gameType: 'memory', xpReward: 110, difficulty: 3, unlockAfter: 1 },
      ];
    }
    if (subject === 'english') {
      return [
        { id: 1, title: 'Grammar Master', description: 'Learn grammar rules', type: 'practice', gameType: 'quiz', questions: grammarQuestions, xpReward: 80, difficulty: 2 },
        { id: 2, title: 'Vocabulary Builder', description: 'Expand your vocabulary', type: 'play', gameType: 'quiz', questions: grammarQuestions, timeLimit: 150, xpReward: 100, difficulty: 2 },
        { id: 3, title: 'Grammar Quiz', description: 'Test your grammar skills', type: 'quiz', gameType: 'quiz', questions: grammarQuestions, timeLimit: 180, xpReward: 120, difficulty: 3, unlockAfter: 1 },
        { id: 4, title: 'Word Memory', description: 'Remember vocabulary words', type: 'play', gameType: 'memory', xpReward: 90, difficulty: 2 },
      ];
    }
    if (subject === 'science') {
      return [
        { id: 1, title: 'Body & Nature', description: 'Label body parts and plants', type: 'play', gameType: 'quiz', questions: scienceLabelingQuestions, timeLimit: 180, xpReward: 100, difficulty: 2 },
        { id: 2, title: 'Science Explorer', description: 'Interactive experiments', type: 'practice', gameType: 'quiz', questions: scienceLabelingQuestions, xpReward: 90, difficulty: 3 },
        { id: 3, title: 'Science Quiz', description: 'Test your knowledge', type: 'quiz', gameType: 'quiz', questions: scienceLabelingQuestions, timeLimit: 150, xpReward: 120, difficulty: 3, unlockAfter: 1 },
        { id: 4, title: 'Science Memory', description: 'Match science concepts', type: 'play', gameType: 'memory', xpReward: 100, difficulty: 2 },
      ];
    }
    if (subject === 'social') {
      return [
        { id: 1, title: 'Geography Explorer', description: 'Explore the world', type: 'play', gameType: 'quiz', questions: geographyQuestions, timeLimit: 180, xpReward: 100, difficulty: 2 },
        { id: 2, title: 'Map Skills', description: 'Learn to read maps', type: 'practice', gameType: 'quiz', questions: geographyQuestions, xpReward: 90, difficulty: 2 },
        { id: 3, title: 'Geography Quiz', description: 'Test world knowledge', type: 'quiz', gameType: 'quiz', questions: geographyQuestions, timeLimit: 150, xpReward: 120, difficulty: 3, unlockAfter: 1 },
        { id: 4, title: 'Country Memory', description: 'Match countries and capitals', type: 'play', gameType: 'memory', xpReward: 100, difficulty: 2 },
      ];
    }
    // Default
    return [
      { id: 1, title: 'Quick Quiz', description: 'Test your knowledge', type: 'quiz', gameType: 'quiz', questions: mathQuizQuestions, timeLimit: 150, xpReward: 100, difficulty: 2 },
      { id: 2, title: 'Practice Mode', description: 'Practice concepts', type: 'practice', gameType: 'quiz', questions: scienceLabelingQuestions, xpReward: 80, difficulty: 2 },
      { id: 3, title: 'Memory Challenge', description: 'Train your memory', type: 'play', gameType: 'memory', xpReward: 90, difficulty: 2 },
    ];
  }

  // CLASS 7-8: Advanced games with logic and analysis
  if (classNumber <= 8) {
    if (subject === 'math') {
      return [
        { id: 1, title: 'Algebra Practice', description: 'Master algebra basics', type: 'practice', gameType: 'input', questions: algebraQuestions, xpReward: 120, difficulty: 3 },
        { id: 2, title: 'Logic Puzzles', description: 'Train your brain with patterns', type: 'play', gameType: 'quiz', questions: logicPuzzleQuestions, timeLimit: 300, xpReward: 150, difficulty: 4 },
        { id: 3, title: 'Geometry Master', description: 'Shapes and measurements', type: 'practice', gameType: 'quiz', questions: geometryQuestions, xpReward: 110, difficulty: 3 },
        { id: 4, title: 'Memory Grid', description: 'Test your memory skills', type: 'play', gameType: 'memory', xpReward: 100, difficulty: 3 },
        { id: 5, title: 'Algebra Quiz', description: 'Advanced equation solving', type: 'quiz', gameType: 'quiz', questions: algebraQuestions, timeLimit: 180, xpReward: 180, difficulty: 4, unlockAfter: 1 },
        { id: 6, title: 'Math Olympiad Prep', description: 'Challenge problems', type: 'quiz', gameType: 'quiz', questions: logicPuzzleQuestions, timeLimit: 240, xpReward: 200, difficulty: 5, unlockAfter: 4 },
      ];
    }
    if (subject === 'science') {
      return [
        { id: 1, title: 'Biology Basics', description: 'Cell structure and life', type: 'practice', gameType: 'quiz', questions: biologyQuestions, xpReward: 100, difficulty: 3 },
        { id: 2, title: 'Virtual Lab', description: 'Interactive experiments', type: 'play', gameType: 'quiz', questions: scienceLabelingQuestions, timeLimit: 200, xpReward: 120, difficulty: 3 },
        { id: 3, title: 'Science Memory', description: 'Scientific term memory game', type: 'play', gameType: 'memory', xpReward: 100, difficulty: 3 },
        { id: 4, title: 'Biology Quiz', description: 'Test biology knowledge', type: 'quiz', gameType: 'quiz', questions: biologyQuestions, timeLimit: 180, xpReward: 150, difficulty: 4, unlockAfter: 1 },
        { id: 5, title: 'Science Challenge', description: 'Comprehensive test', type: 'quiz', gameType: 'quiz', questions: [...scienceLabelingQuestions, ...biologyQuestions].slice(0, 10), timeLimit: 200, xpReward: 180, difficulty: 4, unlockAfter: 3 },
      ];
    }
    if (subject === 'english') {
      return [
        { id: 1, title: 'Advanced Grammar', description: 'Complex grammar rules', type: 'practice', gameType: 'quiz', questions: grammarQuestions, xpReward: 100, difficulty: 3 },
        { id: 2, title: 'Literature Quiz', description: 'Test literature knowledge', type: 'quiz', gameType: 'quiz', questions: grammarQuestions, timeLimit: 180, xpReward: 120, difficulty: 3 },
        { id: 3, title: 'Word Memory', description: 'Advanced vocabulary', type: 'play', gameType: 'memory', xpReward: 90, difficulty: 3 },
        { id: 4, title: 'Grammar Master', description: 'Master level grammar', type: 'quiz', gameType: 'quiz', questions: grammarQuestions, timeLimit: 150, xpReward: 150, difficulty: 4, unlockAfter: 1 },
      ];
    }
    // Default for other subjects
    return [
      { id: 1, title: 'Concept Practice', description: 'Practice key concepts', type: 'practice', gameType: 'quiz', questions: logicPuzzleQuestions, xpReward: 100, difficulty: 3 },
      { id: 2, title: 'Logic Challenge', description: 'Solve logic puzzles', type: 'play', gameType: 'quiz', questions: logicPuzzleQuestions, timeLimit: 240, xpReward: 130, difficulty: 4 },
      { id: 3, title: 'Memory Grid', description: 'Test memory skills', type: 'play', gameType: 'memory', xpReward: 90, difficulty: 3 },
      { id: 4, title: 'Subject Quiz', description: 'Comprehensive quiz', type: 'quiz', gameType: 'quiz', questions: logicPuzzleQuestions, timeLimit: 180, xpReward: 150, difficulty: 4, unlockAfter: 1 },
    ];
  }

  // CLASS 9-10: Advanced academics and exam preparation
  if (subject === 'math') {
    return [
      { id: 1, title: 'Advanced Algebra', description: 'Complex equations', type: 'practice', gameType: 'input', questions: advancedMathQuestions, xpReward: 150, difficulty: 4 },
      { id: 2, title: 'Trigonometry', description: 'Sin, cos, tan problems', type: 'practice', gameType: 'quiz', questions: advancedMathQuestions, xpReward: 140, difficulty: 4 },
      { id: 3, title: 'Logic & Reasoning', description: 'Aptitude problems', type: 'play', gameType: 'quiz', questions: logicPuzzleQuestions, timeLimit: 300, xpReward: 160, difficulty: 4 },
      { id: 4, title: 'Math Olympiad', description: 'Challenge level problems', type: 'quiz', gameType: 'quiz', questions: advancedMathQuestions, timeLimit: 300, xpReward: 200, difficulty: 5, unlockAfter: 2 },
      { id: 5, title: 'Exam Simulator', description: 'Timed exam practice', type: 'quiz', gameType: 'exam', questions: advancedMathQuestions, timeLimit: 600, xpReward: 250, difficulty: 5, unlockAfter: 3 },
    ];
  }
  if (subject === 'science') {
    return [
      { id: 1, title: 'Physics Numericals', description: 'Solve physics problems', type: 'practice', gameType: 'input', questions: physicsQuestions, xpReward: 150, difficulty: 4 },
      { id: 2, title: 'Chemistry Concepts', description: 'Elements & compounds', type: 'practice', gameType: 'quiz', questions: chemistryQuestions, xpReward: 140, difficulty: 4 },
      { id: 3, title: 'Physics Quiz', description: 'Laws and formulas', type: 'quiz', gameType: 'quiz', questions: physicsQuestions, timeLimit: 240, xpReward: 180, difficulty: 4, unlockAfter: 1 },
      { id: 4, title: 'Chemistry Quiz', description: 'Test chemistry knowledge', type: 'quiz', gameType: 'quiz', questions: chemistryQuestions, timeLimit: 240, xpReward: 180, difficulty: 4, unlockAfter: 2 },
      { id: 5, title: 'Science Memory', description: 'Scientific terms & symbols', type: 'play', gameType: 'memory', xpReward: 120, difficulty: 4 },
      { id: 6, title: 'Science Exam', description: 'Full exam simulation', type: 'quiz', gameType: 'exam', questions: [...physicsQuestions, ...chemistryQuestions], timeLimit: 900, xpReward: 300, difficulty: 5, unlockAfter: 4 },
    ];
  }
  if (subject === 'social') {
    return [
      { id: 1, title: 'History Timeline', description: 'Important events', type: 'practice', gameType: 'quiz', questions: historyQuestions, xpReward: 130, difficulty: 4 },
      { id: 2, title: 'Economics Basics', description: 'Economic concepts', type: 'practice', gameType: 'quiz', questions: economicsQuestions, xpReward: 130, difficulty: 4 },
      { id: 3, title: 'History Quiz', description: 'Test history knowledge', type: 'quiz', gameType: 'quiz', questions: historyQuestions, timeLimit: 200, xpReward: 160, difficulty: 4, unlockAfter: 1 },
      { id: 4, title: 'Economics Quiz', description: 'Test economics knowledge', type: 'quiz', gameType: 'quiz', questions: economicsQuestions, timeLimit: 200, xpReward: 160, difficulty: 4, unlockAfter: 2 },
      { id: 5, title: 'Social Studies Exam', description: 'Comprehensive exam', type: 'quiz', gameType: 'exam', questions: [...historyQuestions, ...economicsQuestions], timeLimit: 600, xpReward: 250, difficulty: 5, unlockAfter: 4 },
    ];
  }
  if (subject === 'english') {
    return [
      { id: 1, title: 'Advanced Grammar', description: 'Complex grammar rules', type: 'practice', gameType: 'quiz', questions: grammarQuestions, xpReward: 130, difficulty: 4 },
      { id: 2, title: 'Literature Analysis', description: 'Literary devices', type: 'practice', gameType: 'quiz', questions: grammarQuestions, xpReward: 120, difficulty: 4 },
      { id: 3, title: 'Grammar Quiz', description: 'Test grammar mastery', type: 'quiz', gameType: 'quiz', questions: grammarQuestions, timeLimit: 180, xpReward: 160, difficulty: 4, unlockAfter: 1 },
      { id: 4, title: 'Vocabulary Memory', description: 'Advanced vocabulary', type: 'play', gameType: 'memory', xpReward: 110, difficulty: 4 },
      { id: 5, title: 'English Exam', description: 'Full exam simulation', type: 'quiz', gameType: 'exam', questions: grammarQuestions, timeLimit: 600, xpReward: 250, difficulty: 5, unlockAfter: 3 },
    ];
  }

  // Default for any other subject
  return [
    { id: 1, title: 'Concept Practice', description: 'Master fundamentals', type: 'practice', gameType: 'quiz', questions: advancedMathQuestions, xpReward: 140, difficulty: 4 },
    { id: 2, title: 'Quick Quiz', description: 'Test yourself', type: 'quiz', gameType: 'quiz', questions: advancedMathQuestions, timeLimit: 180, xpReward: 170, difficulty: 4 },
    { id: 3, title: 'Memory Challenge', description: 'Train your memory', type: 'play', gameType: 'memory', xpReward: 100, difficulty: 4 },
    { id: 4, title: 'Final Exam', description: 'Comprehensive assessment', type: 'quiz', gameType: 'exam', questions: advancedMathQuestions, timeLimit: 600, xpReward: 250, difficulty: 5, unlockAfter: 2 },
  ];
};