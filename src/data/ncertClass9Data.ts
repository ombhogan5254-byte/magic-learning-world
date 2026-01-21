/**
 * NCERT-Aligned Questions for Class 9
 * Covers Physics, Chemistry, Biology, and Advanced Mathematics
 */

import { Question } from '@/lib/gameEngine';

// ============ CLASS 9 PHYSICS ============
export const class9PhysicsQuestions: Question[] = [
  // Motion
  { id: 1, type: 'mcq', question: 'What is the SI unit of velocity?', options: ['m/s', 'km/h', 'm/s²', 'N'], correctAnswer: 'm/s', points: 10, difficulty: 3 },
  { id: 2, type: 'mcq', question: 'Acceleration is defined as change in velocity per unit...?', options: ['Distance', 'Time', 'Mass', 'Force'], correctAnswer: 'Time', points: 10, difficulty: 3 },
  { id: 3, type: 'input', question: 'A car travels 150 km in 3 hours. What is its average speed in km/h?', correctAnswer: '50', points: 15, difficulty: 3 },
  { id: 4, type: 'mcq', question: 'In uniform circular motion, the velocity is...?', options: ['Constant', 'Zero', 'Changing', 'Infinite'], correctAnswer: 'Changing', points: 15, difficulty: 4 },
  { id: 5, type: 'mcq', question: 'The area under velocity-time graph gives...?', options: ['Acceleration', 'Displacement', 'Force', 'Speed'], correctAnswer: 'Displacement', points: 20, difficulty: 4 },
  
  // Force and Laws of Motion
  { id: 6, type: 'mcq', question: 'Inertia is the property of...?', options: ['Motion', 'Mass', 'Force', 'Energy'], correctAnswer: 'Mass', points: 10, difficulty: 3 },
  { id: 7, type: 'mcq', question: 'Newton\'s first law is also called law of...?', options: ['Motion', 'Inertia', 'Action', 'Gravity'], correctAnswer: 'Inertia', points: 10, difficulty: 3 },
  { id: 8, type: 'input', question: 'If F = 20N and m = 4kg, find acceleration (m/s²)', correctAnswer: '5', points: 15, difficulty: 3 },
  { id: 9, type: 'mcq', question: 'Momentum = mass × ...?', options: ['Velocity', 'Acceleration', 'Force', 'Distance'], correctAnswer: 'Velocity', points: 10, difficulty: 3 },
  { id: 10, type: 'input', question: 'A body of mass 5kg moving at 10m/s. What is its momentum? (kg⋅m/s)', correctAnswer: '50', points: 15, difficulty: 3 },
  
  // Gravitation
  { id: 11, type: 'mcq', question: 'Value of g on Earth is approximately...?', options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '6.67 m/s²'], correctAnswer: '9.8 m/s²', points: 10, difficulty: 3 },
  { id: 12, type: 'mcq', question: 'Weight of an object on moon is...?', options: ['Same as Earth', '1/6 of Earth', '6 times Earth', 'Zero'], correctAnswer: '1/6 of Earth', points: 15, difficulty: 4 },
  { id: 13, type: 'input', question: 'Mass of a body is 60kg. What is its weight on Earth? (N, use g=10)', correctAnswer: '600', points: 15, difficulty: 3 },
  { id: 14, type: 'mcq', question: 'Universal gravitational constant G has unit...?', options: ['N⋅m²/kg²', 'N/kg', 'm/s²', 'J/kg'], correctAnswer: 'N⋅m²/kg²', points: 20, difficulty: 5 },
  
  // Work and Energy
  { id: 15, type: 'mcq', question: 'SI unit of work is...?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], correctAnswer: 'Joule', points: 10, difficulty: 3 },
  { id: 16, type: 'input', question: 'Work = Force × Displacement. If F=50N, d=4m, find work (J)', correctAnswer: '200', points: 15, difficulty: 3 },
  { id: 17, type: 'mcq', question: 'Power is defined as work done per unit...?', options: ['Mass', 'Distance', 'Time', 'Force'], correctAnswer: 'Time', points: 10, difficulty: 3 },
  { id: 18, type: 'mcq', question: 'Kinetic energy formula is...?', options: ['mgh', '½mv²', 'mv', 'ma'], correctAnswer: '½mv²', points: 15, difficulty: 4 },
  { id: 19, type: 'input', question: 'A 2kg ball moves at 5m/s. Find its kinetic energy (J)', correctAnswer: '25', points: 20, difficulty: 4 },
  
  // Sound
  { id: 20, type: 'mcq', question: 'Sound cannot travel through...?', options: ['Air', 'Water', 'Vacuum', 'Steel'], correctAnswer: 'Vacuum', points: 10, difficulty: 3 },
  { id: 21, type: 'mcq', question: 'Speed of sound is maximum in...?', options: ['Solids', 'Liquids', 'Gases', 'Vacuum'], correctAnswer: 'Solids', points: 10, difficulty: 3 },
  { id: 22, type: 'mcq', question: 'Echo is caused by...?', options: ['Refraction', 'Reflection', 'Diffraction', 'Absorption'], correctAnswer: 'Reflection', points: 10, difficulty: 3 },
  { id: 23, type: 'input', question: 'If frequency = 256 Hz and wavelength = 1.3m, find velocity (m/s, round to nearest)', correctAnswer: '333', points: 20, difficulty: 4 },
  { id: 24, type: 'mcq', question: 'Human hearing range is...?', options: ['0-20 Hz', '20-20000 Hz', '20000+ Hz', '100-10000 Hz'], correctAnswer: '20-20000 Hz', points: 15, difficulty: 4 },
];

// ============ CLASS 9 CHEMISTRY ============
export const class9ChemistryQuestions: Question[] = [
  // Matter
  { id: 1, type: 'mcq', question: 'Which state of matter has definite shape and volume?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correctAnswer: 'Solid', points: 10, difficulty: 3 },
  { id: 2, type: 'mcq', question: 'Sublimation is conversion from...?', options: ['Solid to Liquid', 'Solid to Gas', 'Gas to Solid', 'Liquid to Gas'], correctAnswer: 'Solid to Gas', points: 15, difficulty: 3 },
  { id: 3, type: 'mcq', question: 'Example of sublimation is...?', options: ['Ice melting', 'Camphor disappearing', 'Water boiling', 'Rain falling'], correctAnswer: 'Camphor disappearing', points: 10, difficulty: 3 },
  { id: 4, type: 'mcq', question: 'Latent heat of fusion is absorbed during...?', options: ['Melting', 'Boiling', 'Condensation', 'Freezing'], correctAnswer: 'Melting', points: 15, difficulty: 4 },
  
  // Atoms and Molecules
  { id: 5, type: 'mcq', question: 'Atom was named by...?', options: ['Dalton', 'Democritus', 'Rutherford', 'Bohr'], correctAnswer: 'Democritus', points: 15, difficulty: 4 },
  { id: 6, type: 'mcq', question: 'Valency of Carbon is...?', options: ['1', '2', '3', '4'], correctAnswer: '4', points: 10, difficulty: 3 },
  { id: 7, type: 'input', question: 'Molecular mass of H₂O (H=1, O=16)', correctAnswer: '18', points: 15, difficulty: 3 },
  { id: 8, type: 'input', question: 'Molecular mass of CO₂ (C=12, O=16)', correctAnswer: '44', points: 15, difficulty: 3 },
  { id: 9, type: 'mcq', question: 'Avogadro number is...?', options: ['6.022 × 10²³', '6.022 × 10²²', '6.022 × 10²⁴', '6.022 × 10²⁰'], correctAnswer: '6.022 × 10²³', points: 20, difficulty: 4 },
  
  // Structure of Atom
  { id: 10, type: 'mcq', question: 'Electron was discovered by...?', options: ['Dalton', 'Thomson', 'Rutherford', 'Bohr'], correctAnswer: 'Thomson', points: 15, difficulty: 4 },
  { id: 11, type: 'mcq', question: 'Nucleus was discovered by...?', options: ['Thomson', 'Rutherford', 'Bohr', 'Dalton'], correctAnswer: 'Rutherford', points: 15, difficulty: 4 },
  { id: 12, type: 'mcq', question: 'Proton has charge...?', options: ['+1', '-1', '0', '+2'], correctAnswer: '+1', points: 10, difficulty: 3 },
  { id: 13, type: 'input', question: 'If atomic number is 11 and mass number is 23, how many neutrons?', correctAnswer: '12', points: 15, difficulty: 3 },
  { id: 14, type: 'mcq', question: 'Maximum electrons in L shell is...?', options: ['2', '8', '18', '32'], correctAnswer: '8', points: 15, difficulty: 3 },
  { id: 15, type: 'input', question: 'Electronic configuration of Sodium (Z=11) has how many shells?', correctAnswer: '3', points: 15, difficulty: 3 },
  
  // Chemical Reactions
  { id: 16, type: 'mcq', question: 'Burning of magnesium is which type of reaction?', options: ['Decomposition', 'Combination', 'Displacement', 'Double displacement'], correctAnswer: 'Combination', points: 10, difficulty: 3 },
  { id: 17, type: 'mcq', question: 'Photosynthesis is which type of reaction?', options: ['Exothermic', 'Endothermic', 'Combustion', 'Displacement'], correctAnswer: 'Endothermic', points: 15, difficulty: 4 },
  { id: 18, type: 'mcq', question: 'Rusting of iron requires...?', options: ['Only oxygen', 'Only water', 'Oxygen and water', 'Only air'], correctAnswer: 'Oxygen and water', points: 15, difficulty: 3 },
  
  // Acids, Bases, Salts
  { id: 19, type: 'mcq', question: 'pH of pure water is...?', options: ['0', '7', '14', '1'], correctAnswer: '7', points: 10, difficulty: 3 },
  { id: 20, type: 'mcq', question: 'Common salt chemical formula is...?', options: ['NaOH', 'NaCl', 'HCl', 'Na₂CO₃'], correctAnswer: 'NaCl', points: 10, difficulty: 3 },
  { id: 21, type: 'mcq', question: 'Which indicator turns pink in acid?', options: ['Litmus', 'Phenolphthalein', 'Methyl orange', 'None'], correctAnswer: 'Methyl orange', points: 15, difficulty: 4 },
  { id: 22, type: 'mcq', question: 'Baking soda is...?', options: ['NaHCO₃', 'Na₂CO₃', 'NaOH', 'NaCl'], correctAnswer: 'NaHCO₃', points: 15, difficulty: 3 },
  { id: 23, type: 'mcq', question: 'Plaster of Paris formula is...?', options: ['CaSO₄·½H₂O', 'CaSO₄·2H₂O', 'CaCO₃', 'Ca(OH)₂'], correctAnswer: 'CaSO₄·½H₂O', points: 20, difficulty: 5 },
];

// ============ CLASS 9 BIOLOGY ============  
export const class9BiologyQuestions: Question[] = [
  // Cell
  { id: 1, type: 'mcq', question: 'Cell was discovered by...?', options: ['Leeuwenhoek', 'Robert Hooke', 'Schleiden', 'Virchow'], correctAnswer: 'Robert Hooke', points: 10, difficulty: 3 },
  { id: 2, type: 'mcq', question: 'Powerhouse of cell is...?', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Ribosome'], correctAnswer: 'Mitochondria', points: 10, difficulty: 3 },
  { id: 3, type: 'mcq', question: 'Which organelle is found only in plant cells?', options: ['Mitochondria', 'Ribosome', 'Chloroplast', 'Nucleus'], correctAnswer: 'Chloroplast', points: 10, difficulty: 3 },
  { id: 4, type: 'mcq', question: 'Cell membrane is...?', options: ['Fully permeable', 'Selectively permeable', 'Impermeable', 'None'], correctAnswer: 'Selectively permeable', points: 15, difficulty: 4 },
  { id: 5, type: 'mcq', question: 'Prokaryotic cells lack...?', options: ['Cell wall', 'Nucleus', 'Ribosome', 'Cell membrane'], correctAnswer: 'Nucleus', points: 15, difficulty: 4 },
  
  // Tissues
  { id: 6, type: 'mcq', question: 'Meristematic tissue is responsible for...?', options: ['Protection', 'Growth', 'Transport', 'Storage'], correctAnswer: 'Growth', points: 10, difficulty: 3 },
  { id: 7, type: 'mcq', question: 'Xylem transports...?', options: ['Food', 'Water', 'Hormones', 'Oxygen'], correctAnswer: 'Water', points: 10, difficulty: 3 },
  { id: 8, type: 'mcq', question: 'Phloem transports...?', options: ['Water', 'Minerals', 'Food', 'Gases'], correctAnswer: 'Food', points: 10, difficulty: 3 },
  { id: 9, type: 'mcq', question: 'Connective tissue includes...?', options: ['Blood', 'Muscle', 'Nerve', 'Epithelium'], correctAnswer: 'Blood', points: 15, difficulty: 4 },
  { id: 10, type: 'mcq', question: 'Which tissue covers body surface?', options: ['Connective', 'Muscular', 'Epithelial', 'Nervous'], correctAnswer: 'Epithelial', points: 10, difficulty: 3 },
  
  // Diversity
  { id: 11, type: 'mcq', question: 'Five kingdom classification was given by...?', options: ['Linnaeus', 'Whittaker', 'Aristotle', 'Haeckel'], correctAnswer: 'Whittaker', points: 15, difficulty: 4 },
  { id: 12, type: 'mcq', question: 'Bacteria belong to kingdom...?', options: ['Protista', 'Fungi', 'Monera', 'Plantae'], correctAnswer: 'Monera', points: 10, difficulty: 3 },
  { id: 13, type: 'mcq', question: 'Mushrooms belong to kingdom...?', options: ['Plantae', 'Fungi', 'Protista', 'Monera'], correctAnswer: 'Fungi', points: 10, difficulty: 3 },
  { id: 14, type: 'mcq', question: 'Binomial nomenclature was given by...?', options: ['Aristotle', 'Linnaeus', 'Darwin', 'Mendel'], correctAnswer: 'Linnaeus', points: 15, difficulty: 4 },
  
  // Health
  { id: 15, type: 'mcq', question: 'AIDS is caused by...?', options: ['Bacteria', 'Virus', 'Fungi', 'Protozoa'], correctAnswer: 'Virus', points: 10, difficulty: 3 },
  { id: 16, type: 'mcq', question: 'Malaria is caused by...?', options: ['Bacteria', 'Virus', 'Protozoa', 'Fungi'], correctAnswer: 'Protozoa', points: 15, difficulty: 4 },
  { id: 17, type: 'mcq', question: 'Dengue is spread by...?', options: ['Housefly', 'Mosquito', 'Rat', 'Dog'], correctAnswer: 'Mosquito', points: 10, difficulty: 3 },
  { id: 18, type: 'mcq', question: 'First line of defense in body is...?', options: ['WBC', 'Antibodies', 'Skin', 'Lymph'], correctAnswer: 'Skin', points: 15, difficulty: 4 },
  { id: 19, type: 'mcq', question: 'Vaccination provides...?', options: ['Natural immunity', 'Acquired immunity', 'No immunity', 'Temporary immunity'], correctAnswer: 'Acquired immunity', points: 15, difficulty: 4 },
  
  // Natural Resources
  { id: 20, type: 'mcq', question: 'Ozone layer is found in...?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], correctAnswer: 'Stratosphere', points: 15, difficulty: 4 },
  { id: 21, type: 'mcq', question: 'Nitrogen fixation is done by...?', options: ['Rhizobium', 'E.coli', 'Yeast', 'Amoeba'], correctAnswer: 'Rhizobium', points: 15, difficulty: 4 },
  { id: 22, type: 'mcq', question: 'Carbon cycle involves...?', options: ['Photosynthesis only', 'Respiration only', 'Both', 'Neither'], correctAnswer: 'Both', points: 10, difficulty: 3 },
];

// ============ CLASS 9 ADVANCED MATH ============
export const class9MathQuestions: Question[] = [
  // Number Systems
  { id: 1, type: 'mcq', question: '√2 is a/an...?', options: ['Rational number', 'Irrational number', 'Natural number', 'Whole number'], correctAnswer: 'Irrational number', points: 10, difficulty: 3 },
  { id: 2, type: 'mcq', question: 'Rationalizing factor of √3 is...?', options: ['√2', '√3', '3', '1/√3'], correctAnswer: '√3', points: 15, difficulty: 4 },
  { id: 3, type: 'input', question: 'Simplify: √50 = k√2. Find k.', correctAnswer: '5', points: 15, difficulty: 3 },
  { id: 4, type: 'mcq', question: 'Between two rational numbers there are...?', options: ['No numbers', 'Finite numbers', 'Infinite numbers', 'One number'], correctAnswer: 'Infinite numbers', points: 15, difficulty: 4 },
  
  // Polynomials
  { id: 5, type: 'mcq', question: 'Degree of 2x³ + 3x² - 5 is...?', options: ['2', '3', '5', '0'], correctAnswer: '3', points: 10, difficulty: 3 },
  { id: 6, type: 'input', question: 'Find p(2) if p(x) = x² - 3x + 2', correctAnswer: '0', points: 15, difficulty: 3 },
  { id: 7, type: 'mcq', question: 'x² - 1 = (x+1)(x-1) is...?', options: ['Identity', 'Equation', 'Factor', 'Polynomial'], correctAnswer: 'Identity', points: 15, difficulty: 4 },
  { id: 8, type: 'mcq', question: 'Zero of polynomial x - 5 is...?', options: ['0', '5', '-5', '1'], correctAnswer: '5', points: 10, difficulty: 3 },
  { id: 9, type: 'input', question: 'If (x-2) is factor of x² - kx + 2, find k', correctAnswer: '3', points: 20, difficulty: 5 },
  
  // Coordinate Geometry
  { id: 10, type: 'mcq', question: 'Origin has coordinates...?', options: ['(1,1)', '(0,0)', '(1,0)', '(0,1)'], correctAnswer: '(0,0)', points: 10, difficulty: 3 },
  { id: 11, type: 'mcq', question: 'Point (-3, 4) lies in which quadrant?', options: ['I', 'II', 'III', 'IV'], correctAnswer: 'II', points: 10, difficulty: 3 },
  { id: 12, type: 'mcq', question: 'Points on X-axis have y-coordinate as...?', options: ['1', '0', 'x', 'Any'], correctAnswer: '0', points: 10, difficulty: 3 },
  { id: 13, type: 'input', question: 'Distance from origin to point (3, 4) is...?', correctAnswer: '5', points: 15, difficulty: 3 },
  
  // Linear Equations
  { id: 14, type: 'mcq', question: '2x + 3y = 6 is a linear equation in...?', options: ['One variable', 'Two variables', 'Three variables', 'No variable'], correctAnswer: 'Two variables', points: 10, difficulty: 3 },
  { id: 15, type: 'input', question: 'If x + y = 5 and x = 3, find y', correctAnswer: '2', points: 10, difficulty: 2 },
  { id: 16, type: 'mcq', question: 'Graph of y = 2x passes through...?', options: ['(0,0)', '(1,0)', '(0,1)', '(1,1)'], correctAnswer: '(0,0)', points: 15, difficulty: 4 },
  
  // Geometry - Triangles
  { id: 17, type: 'mcq', question: 'Sum of angles of triangle is...?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', points: 10, difficulty: 3 },
  { id: 18, type: 'mcq', question: 'In an isosceles triangle, how many sides are equal?', options: ['0', '2', '3', '1'], correctAnswer: '2', points: 10, difficulty: 3 },
  { id: 19, type: 'input', question: 'If two angles of triangle are 50° and 60°, third angle is...? (degrees)', correctAnswer: '70', points: 10, difficulty: 3 },
  { id: 20, type: 'mcq', question: 'Exterior angle equals sum of...?', options: ['All angles', 'Two interior opposite angles', 'One angle', 'Adjacent angles'], correctAnswer: 'Two interior opposite angles', points: 15, difficulty: 4 },
  
  // Area
  { id: 21, type: 'input', question: 'Area of triangle with base 10cm and height 8cm? (cm²)', correctAnswer: '40', points: 10, difficulty: 3 },
  { id: 22, type: 'mcq', question: 'Heron\'s formula uses...?', options: ['Base and height', 'Three sides', 'Angles', 'Diagonal'], correctAnswer: 'Three sides', points: 15, difficulty: 4 },
  { id: 23, type: 'input', question: 'Semi-perimeter of triangle with sides 3, 4, 5 is...?', correctAnswer: '6', points: 10, difficulty: 3 },
  
  // Statistics
  { id: 24, type: 'mcq', question: 'Mean of 2, 4, 6, 8 is...?', options: ['4', '5', '6', '20'], correctAnswer: '5', points: 10, difficulty: 3 },
  { id: 25, type: 'mcq', question: 'Mode is the value that occurs...?', options: ['Least', 'Most', 'In middle', 'Last'], correctAnswer: 'Most', points: 10, difficulty: 3 },
  { id: 26, type: 'input', question: 'Median of 1, 3, 5, 7, 9 is...?', correctAnswer: '5', points: 10, difficulty: 3 },
];

// ============ TYPING WORDS FOR CLASS 9 ============
export const class9TypingWords = {
  physics: ['velocity', 'acceleration', 'momentum', 'inertia', 'gravitation', 'kinetic', 'potential', 'joule', 'newton', 'force', 'displacement', 'frequency', 'wavelength', 'amplitude', 'echo'],
  chemistry: ['atom', 'molecule', 'electron', 'proton', 'neutron', 'valency', 'compound', 'element', 'nucleus', 'orbital', 'sublimation', 'condensation', 'evaporation', 'neutralization'],
  biology: ['mitochondria', 'chloroplast', 'ribosome', 'nucleus', 'cytoplasm', 'membrane', 'tissue', 'organ', 'prokaryote', 'eukaryote', 'meristem', 'phloem', 'xylem'],
  math: ['polynomial', 'quadrant', 'coordinate', 'irrational', 'rational', 'integer', 'variable', 'coefficient', 'identity', 'factorization'],
};

// ============ TRUE/FALSE FOR CLASS 9 ============
export const class9TrueFalseQuestions = [
  { statement: 'Velocity is a scalar quantity', isTrue: false, explanation: 'Velocity is a vector quantity as it has both magnitude and direction' },
  { statement: 'Inertia depends on mass of the body', isTrue: true, explanation: 'Greater the mass, greater is the inertia' },
  { statement: 'Sound can travel through vacuum', isTrue: false, explanation: 'Sound needs a medium to travel' },
  { statement: 'Protons are negatively charged', isTrue: false, explanation: 'Protons have positive charge, electrons are negative' },
  { statement: 'Mitochondria are called powerhouse of the cell', isTrue: true, explanation: 'They produce ATP, the energy currency of cells' },
  { statement: 'All cells have a nucleus', isTrue: false, explanation: 'Prokaryotic cells like bacteria lack a true nucleus' },
  { statement: '√2 is a rational number', isTrue: false, explanation: '√2 cannot be expressed as p/q where p and q are integers' },
  { statement: 'Sum of angles of a triangle is 360°', isTrue: false, explanation: 'Sum of angles of a triangle is 180°' },
  { statement: 'Rusting is a chemical change', isTrue: true, explanation: 'Rusting involves formation of new substance (iron oxide)' },
  { statement: 'pH of pure water is 7', isTrue: true, explanation: 'Pure water is neutral with pH = 7' },
  { statement: 'Photosynthesis occurs in mitochondria', isTrue: false, explanation: 'Photosynthesis occurs in chloroplasts' },
  { statement: 'Work done is a scalar quantity', isTrue: true, explanation: 'Work has only magnitude, not direction' },
];

// ============ WORD BUILDER DATA FOR CLASS 9 ============
export const class9WordBuilderData = [
  { word: 'PHOTOSYNTHESIS', hint: 'Process by which plants make food using sunlight', category: 'Biology' },
  { word: 'ACCELERATION', hint: 'Rate of change of velocity', category: 'Physics' },
  { word: 'NEUTRALIZATION', hint: 'Acid + Base reaction', category: 'Chemistry' },
  { word: 'POLYNOMIAL', hint: 'Expression with multiple terms', category: 'Math' },
  { word: 'CHROMOSOME', hint: 'Carries genetic information', category: 'Biology' },
  { word: 'GRAVITATION', hint: 'Force of attraction between masses', category: 'Physics' },
  { word: 'ELECTROLYSIS', hint: 'Decomposition using electricity', category: 'Chemistry' },
  { word: 'DISPLACEMENT', hint: 'Shortest distance between two points', category: 'Physics' },
];
