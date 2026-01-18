/**
 * Puzzle and Memory Game Data
 */
import { PuzzlePiece, PuzzleSlot } from '@/components/games/DragDropPuzzle';
import { MemoryCard } from '@/components/games/MemoryGridGame';

// ============ DRAG & DROP PUZZLES (Class 1-3) ============

export interface PuzzleConfig {
  id: string;
  title: string;
  instruction: string;
  pieces: PuzzlePiece[];
  slots: PuzzleSlot[];
  difficulty: 1 | 2 | 3;
}

// Alphabet Puzzles
export const alphabetPuzzles: PuzzleConfig[] = [
  {
    id: 'alphabet-animals',
    title: 'Animal Alphabet',
    instruction: 'Drag each animal to its starting letter!',
    pieces: [
      { id: 'apple', content: '🍎', type: 'emoji' },
      { id: 'banana', content: '🍌', type: 'emoji' },
      { id: 'cat', content: '🐱', type: 'emoji' },
      { id: 'dog', content: '🐕', type: 'emoji' },
      { id: 'elephant', content: '🐘', type: 'emoji' },
      { id: 'fish', content: '🐟', type: 'emoji' },
    ],
    slots: [
      { id: 'slot-a', label: 'A', correctPieceId: 'apple' },
      { id: 'slot-b', label: 'B', correctPieceId: 'banana' },
      { id: 'slot-c', label: 'C', correctPieceId: 'cat' },
      { id: 'slot-d', label: 'D', correctPieceId: 'dog' },
      { id: 'slot-e', label: 'E', correctPieceId: 'elephant' },
      { id: 'slot-f', label: 'F', correctPieceId: 'fish' },
    ],
    difficulty: 1,
  },
  {
    id: 'alphabet-objects',
    title: 'Objects ABC',
    instruction: 'Match objects to their first letter!',
    pieces: [
      { id: 'guitar', content: '🎸', type: 'emoji' },
      { id: 'house', content: '🏠', type: 'emoji' },
      { id: 'icecream', content: '🍨', type: 'emoji' },
      { id: 'juice', content: '🧃', type: 'emoji' },
      { id: 'kite', content: '🪁', type: 'emoji' },
      { id: 'lamp', content: '💡', type: 'emoji' },
    ],
    slots: [
      { id: 'slot-g', label: 'G', correctPieceId: 'guitar' },
      { id: 'slot-h', label: 'H', correctPieceId: 'house' },
      { id: 'slot-i', label: 'I', correctPieceId: 'icecream' },
      { id: 'slot-j', label: 'J', correctPieceId: 'juice' },
      { id: 'slot-k', label: 'K', correctPieceId: 'kite' },
      { id: 'slot-l', label: 'L', correctPieceId: 'lamp' },
    ],
    difficulty: 1,
  },
];

// Number Puzzles
export const numberPuzzles: PuzzleConfig[] = [
  {
    id: 'count-objects',
    title: 'Count & Match',
    instruction: 'Count the objects and drag to the right number!',
    pieces: [
      { id: 'one-star', content: '⭐', type: 'emoji' },
      { id: 'two-hearts', content: '❤️❤️', type: 'emoji' },
      { id: 'three-apples', content: '🍎🍎🍎', type: 'emoji' },
      { id: 'four-flowers', content: '🌸🌸🌸🌸', type: 'emoji' },
      { id: 'five-balls', content: '⚽⚽⚽⚽⚽', type: 'emoji' },
    ],
    slots: [
      { id: 'slot-1', label: '1', correctPieceId: 'one-star' },
      { id: 'slot-2', label: '2', correctPieceId: 'two-hearts' },
      { id: 'slot-3', label: '3', correctPieceId: 'three-apples' },
      { id: 'slot-4', label: '4', correctPieceId: 'four-flowers' },
      { id: 'slot-5', label: '5', correctPieceId: 'five-balls' },
    ],
    difficulty: 1,
  },
  {
    id: 'number-words',
    title: 'Number Words',
    instruction: 'Match the number to its word!',
    pieces: [
      { id: 'num-1', content: '1', type: 'text' },
      { id: 'num-2', content: '2', type: 'text' },
      { id: 'num-3', content: '3', type: 'text' },
      { id: 'num-4', content: '4', type: 'text' },
      { id: 'num-5', content: '5', type: 'text' },
      { id: 'num-6', content: '6', type: 'text' },
    ],
    slots: [
      { id: 'word-one', label: 'ONE', correctPieceId: 'num-1' },
      { id: 'word-two', label: 'TWO', correctPieceId: 'num-2' },
      { id: 'word-three', label: 'THREE', correctPieceId: 'num-3' },
      { id: 'word-four', label: 'FOUR', correctPieceId: 'num-4' },
      { id: 'word-five', label: 'FIVE', correctPieceId: 'num-5' },
      { id: 'word-six', label: 'SIX', correctPieceId: 'num-6' },
    ],
    difficulty: 1,
  },
];

// Shape Puzzles
export const shapePuzzles: PuzzleConfig[] = [
  {
    id: 'shape-names',
    title: 'Shape Names',
    instruction: 'Match each shape to its name!',
    pieces: [
      { id: 'circle', content: '⚫', type: 'emoji' },
      { id: 'square', content: '🟦', type: 'emoji' },
      { id: 'triangle', content: '🔺', type: 'emoji' },
      { id: 'star', content: '⭐', type: 'emoji' },
      { id: 'heart', content: '❤️', type: 'emoji' },
      { id: 'diamond', content: '💎', type: 'emoji' },
    ],
    slots: [
      { id: 'name-circle', label: 'Circle', correctPieceId: 'circle' },
      { id: 'name-square', label: 'Square', correctPieceId: 'square' },
      { id: 'name-triangle', label: 'Triangle', correctPieceId: 'triangle' },
      { id: 'name-star', label: 'Star', correctPieceId: 'star' },
      { id: 'name-heart', label: 'Heart', correctPieceId: 'heart' },
      { id: 'name-diamond', label: 'Diamond', correctPieceId: 'diamond' },
    ],
    difficulty: 1,
  },
];

// Color Puzzles
export const colorPuzzles: PuzzleConfig[] = [
  {
    id: 'color-match',
    title: 'Color Match',
    instruction: 'Match objects to their colors!',
    pieces: [
      { id: 'sun', content: '☀️', type: 'emoji' },
      { id: 'grass', content: '🌿', type: 'emoji' },
      { id: 'sky', content: '🌤️', type: 'emoji' },
      { id: 'apple', content: '🍎', type: 'emoji' },
      { id: 'orange', content: '🍊', type: 'emoji' },
      { id: 'grape', content: '🍇', type: 'emoji' },
    ],
    slots: [
      { id: 'color-yellow', label: 'Yellow', correctPieceId: 'sun' },
      { id: 'color-green', label: 'Green', correctPieceId: 'grass' },
      { id: 'color-blue', label: 'Blue', correctPieceId: 'sky' },
      { id: 'color-red', label: 'Red', correctPieceId: 'apple' },
      { id: 'color-orange', label: 'Orange', correctPieceId: 'orange' },
      { id: 'color-purple', label: 'Purple', correctPieceId: 'grape' },
    ],
    difficulty: 1,
  },
];

// Story Sequence Puzzles
export const storyPuzzles: PuzzleConfig[] = [
  {
    id: 'daily-routine',
    title: 'Daily Routine',
    instruction: 'Put the daily activities in order!',
    pieces: [
      { id: 'wake', content: '🌅', type: 'emoji' },
      { id: 'brush', content: '🪥', type: 'emoji' },
      { id: 'breakfast', content: '🥣', type: 'emoji' },
      { id: 'school', content: '🏫', type: 'emoji' },
      { id: 'play', content: '⚽', type: 'emoji' },
      { id: 'sleep', content: '😴', type: 'emoji' },
    ],
    slots: [
      { id: 'step-1', label: '1st', correctPieceId: 'wake' },
      { id: 'step-2', label: '2nd', correctPieceId: 'brush' },
      { id: 'step-3', label: '3rd', correctPieceId: 'breakfast' },
      { id: 'step-4', label: '4th', correctPieceId: 'school' },
      { id: 'step-5', label: '5th', correctPieceId: 'play' },
      { id: 'step-6', label: '6th', correctPieceId: 'sleep' },
    ],
    difficulty: 2,
  },
];

// ============ MEMORY GRID GAMES (Class 7-8) ============

export interface MemoryGameConfig {
  id: string;
  title: string;
  cards: MemoryCard[];
  timeLimit: number;
  difficulty: 1 | 2 | 3;
}

// Math Memory Games
export const mathMemoryGames: MemoryGameConfig[] = [
  {
    id: 'multiplication-pairs',
    title: 'Multiplication Match',
    cards: [
      { id: 'q1', pairId: '12', content: '3 × 4', type: 'formula' },
      { id: 'a1', pairId: '12', content: '12', type: 'text' },
      { id: 'q2', pairId: '24', content: '6 × 4', type: 'formula' },
      { id: 'a2', pairId: '24', content: '24', type: 'text' },
      { id: 'q3', pairId: '36', content: '6 × 6', type: 'formula' },
      { id: 'a3', pairId: '36', content: '36', type: 'text' },
      { id: 'q4', pairId: '49', content: '7 × 7', type: 'formula' },
      { id: 'a4', pairId: '49', content: '49', type: 'text' },
      { id: 'q5', pairId: '64', content: '8 × 8', type: 'formula' },
      { id: 'a5', pairId: '64', content: '64', type: 'text' },
      { id: 'q6', pairId: '81', content: '9 × 9', type: 'formula' },
      { id: 'a6', pairId: '81', content: '81', type: 'text' },
    ],
    timeLimit: 90,
    difficulty: 2,
  },
  {
    id: 'square-roots',
    title: 'Square Root Match',
    cards: [
      { id: 'sq1', pairId: 'r4', content: '√16', type: 'formula' },
      { id: 'sq1a', pairId: 'r4', content: '4', type: 'text' },
      { id: 'sq2', pairId: 'r5', content: '√25', type: 'formula' },
      { id: 'sq2a', pairId: 'r5', content: '5', type: 'text' },
      { id: 'sq3', pairId: 'r6', content: '√36', type: 'formula' },
      { id: 'sq3a', pairId: 'r6', content: '6', type: 'text' },
      { id: 'sq4', pairId: 'r7', content: '√49', type: 'formula' },
      { id: 'sq4a', pairId: 'r7', content: '7', type: 'text' },
      { id: 'sq5', pairId: 'r8', content: '√64', type: 'formula' },
      { id: 'sq5a', pairId: 'r8', content: '8', type: 'text' },
      { id: 'sq6', pairId: 'r9', content: '√81', type: 'formula' },
      { id: 'sq6a', pairId: 'r9', content: '9', type: 'text' },
    ],
    timeLimit: 90,
    difficulty: 2,
  },
];

// Science Memory Games
export const scienceMemoryGames: MemoryGameConfig[] = [
  {
    id: 'element-symbols',
    title: 'Element Symbols',
    cards: [
      { id: 'h', pairId: 'hydrogen', content: 'H', type: 'text' },
      { id: 'hydrogen', pairId: 'hydrogen', content: 'Hydrogen', type: 'text' },
      { id: 'o', pairId: 'oxygen', content: 'O', type: 'text' },
      { id: 'oxygen', pairId: 'oxygen', content: 'Oxygen', type: 'text' },
      { id: 'c', pairId: 'carbon', content: 'C', type: 'text' },
      { id: 'carbon', pairId: 'carbon', content: 'Carbon', type: 'text' },
      { id: 'n', pairId: 'nitrogen', content: 'N', type: 'text' },
      { id: 'nitrogen', pairId: 'nitrogen', content: 'Nitrogen', type: 'text' },
      { id: 'fe', pairId: 'iron', content: 'Fe', type: 'text' },
      { id: 'iron', pairId: 'iron', content: 'Iron', type: 'text' },
      { id: 'au', pairId: 'gold', content: 'Au', type: 'text' },
      { id: 'gold', pairId: 'gold', content: 'Gold', type: 'text' },
    ],
    timeLimit: 120,
    difficulty: 2,
  },
  {
    id: 'physics-units',
    title: 'Physics Units Match',
    cards: [
      { id: 'force', pairId: 'newton', content: 'Force', type: 'text' },
      { id: 'newton', pairId: 'newton', content: 'Newton (N)', type: 'text' },
      { id: 'energy', pairId: 'joule', content: 'Energy', type: 'text' },
      { id: 'joule', pairId: 'joule', content: 'Joule (J)', type: 'text' },
      { id: 'power', pairId: 'watt', content: 'Power', type: 'text' },
      { id: 'watt', pairId: 'watt', content: 'Watt (W)', type: 'text' },
      { id: 'pressure', pairId: 'pascal', content: 'Pressure', type: 'text' },
      { id: 'pascal', pairId: 'pascal', content: 'Pascal (Pa)', type: 'text' },
      { id: 'current', pairId: 'ampere', content: 'Current', type: 'text' },
      { id: 'ampere', pairId: 'ampere', content: 'Ampere (A)', type: 'text' },
      { id: 'voltage', pairId: 'volt', content: 'Voltage', type: 'text' },
      { id: 'volt', pairId: 'volt', content: 'Volt (V)', type: 'text' },
    ],
    timeLimit: 120,
    difficulty: 2,
  },
];

// Emoji Memory Games (simpler)
export const emojiMemoryGames: MemoryGameConfig[] = [
  {
    id: 'emoji-basic',
    title: 'Emoji Match',
    cards: [
      { id: 'e1a', pairId: 'star', content: '⭐', type: 'emoji' },
      { id: 'e1b', pairId: 'star', content: '⭐', type: 'emoji' },
      { id: 'e2a', pairId: 'heart', content: '❤️', type: 'emoji' },
      { id: 'e2b', pairId: 'heart', content: '❤️', type: 'emoji' },
      { id: 'e3a', pairId: 'sun', content: '☀️', type: 'emoji' },
      { id: 'e3b', pairId: 'sun', content: '☀️', type: 'emoji' },
      { id: 'e4a', pairId: 'moon', content: '🌙', type: 'emoji' },
      { id: 'e4b', pairId: 'moon', content: '🌙', type: 'emoji' },
      { id: 'e5a', pairId: 'fire', content: '🔥', type: 'emoji' },
      { id: 'e5b', pairId: 'fire', content: '🔥', type: 'emoji' },
      { id: 'e6a', pairId: 'wave', content: '🌊', type: 'emoji' },
      { id: 'e6b', pairId: 'wave', content: '🌊', type: 'emoji' },
      { id: 'e7a', pairId: 'tree', content: '🌳', type: 'emoji' },
      { id: 'e7b', pairId: 'tree', content: '🌳', type: 'emoji' },
      { id: 'e8a', pairId: 'flower', content: '🌸', type: 'emoji' },
      { id: 'e8b', pairId: 'flower', content: '🌸', type: 'emoji' },
    ],
    timeLimit: 60,
    difficulty: 1,
  },
];

// Get puzzles by class and subject
export const getPuzzlesForClass = (classNumber: number, subject: string): PuzzleConfig[] => {
  if (classNumber > 3) return [];
  
  switch (subject) {
    case 'english':
      return alphabetPuzzles;
    case 'math':
      return [...numberPuzzles];
    case 'art':
      return [...colorPuzzles, ...shapePuzzles];
    default:
      return [...alphabetPuzzles, ...numberPuzzles, ...shapePuzzles];
  }
};

// Get memory games by class and subject
export const getMemoryGamesForClass = (classNumber: number, subject: string): MemoryGameConfig[] => {
  if (classNumber < 7 || classNumber > 8) return [];
  
  switch (subject) {
    case 'math':
      return mathMemoryGames;
    case 'science':
      return scienceMemoryGames;
    default:
      return [...emojiMemoryGames, ...mathMemoryGames, ...scienceMemoryGames];
  }
};
