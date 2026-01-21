/**
 * NCERT-Aligned Questions for Class 10
 * Covers Physics, Chemistry, Biology, and Advanced Mathematics
 * Board Exam focused content
 */

import { Question } from '@/lib/gameEngine';

// ============ CLASS 10 PHYSICS ============
export const class10PhysicsQuestions: Question[] = [
  // Light - Reflection and Refraction
  { id: 1, type: 'mcq', question: 'Angle of incidence equals angle of...?', options: ['Refraction', 'Reflection', 'Deviation', 'Emergence'], correctAnswer: 'Reflection', points: 10, difficulty: 3 },
  { id: 2, type: 'mcq', question: 'Focal length of concave mirror is...?', options: ['Positive', 'Negative', 'Zero', 'Infinite'], correctAnswer: 'Negative', points: 15, difficulty: 4 },
  { id: 3, type: 'mcq', question: 'Mirror formula is...?', options: ['1/f = 1/v + 1/u', '1/f = 1/v - 1/u', 'f = v + u', 'f = v - u'], correctAnswer: '1/f = 1/v + 1/u', points: 15, difficulty: 4 },
  { id: 4, type: 'input', question: 'If v = 20cm and u = -30cm for a mirror, find f (cm)', correctAnswer: '12', points: 20, difficulty: 5 },
  { id: 5, type: 'mcq', question: 'Refractive index of glass is approximately...?', options: ['1.0', '1.33', '1.5', '2.4'], correctAnswer: '1.5', points: 10, difficulty: 3 },
  { id: 6, type: 'mcq', question: 'Lens used to correct myopia is...?', options: ['Convex', 'Concave', 'Cylindrical', 'Bifocal'], correctAnswer: 'Concave', points: 15, difficulty: 4 },
  { id: 7, type: 'mcq', question: 'Power of lens is measured in...?', options: ['Metre', 'Centimetre', 'Dioptre', 'Newton'], correctAnswer: 'Dioptre', points: 10, difficulty: 3 },
  { id: 8, type: 'input', question: 'Power of lens with f = 50cm is...? (D)', correctAnswer: '2', points: 15, difficulty: 4 },
  
  // Electricity
  { id: 9, type: 'mcq', question: 'SI unit of electric charge is...?', options: ['Volt', 'Ampere', 'Coulomb', 'Ohm'], correctAnswer: 'Coulomb', points: 10, difficulty: 3 },
  { id: 10, type: 'mcq', question: 'Ohm\'s law states V = ...?', options: ['IR', 'I/R', 'R/I', 'I²R'], correctAnswer: 'IR', points: 10, difficulty: 3 },
  { id: 11, type: 'input', question: 'If V = 12V and R = 4Ω, find current (A)', correctAnswer: '3', points: 15, difficulty: 3 },
  { id: 12, type: 'mcq', question: 'Resistors in series have...?', options: ['Same current', 'Same voltage', 'Same resistance', 'Same power'], correctAnswer: 'Same current', points: 15, difficulty: 4 },
  { id: 13, type: 'input', question: 'Two resistors 3Ω and 6Ω in parallel. Equivalent resistance? (Ω)', correctAnswer: '2', points: 20, difficulty: 4 },
  { id: 14, type: 'mcq', question: 'Electric power P = V × ...?', options: ['R', 'I', 'V', 'Q'], correctAnswer: 'I', points: 10, difficulty: 3 },
  { id: 15, type: 'input', question: 'Energy consumed = 100W × 2h. Find in Wh', correctAnswer: '200', points: 15, difficulty: 3 },
  { id: 16, type: 'mcq', question: '1 kWh equals...?', options: ['1000 J', '3600 J', '3.6 × 10⁶ J', '36000 J'], correctAnswer: '3.6 × 10⁶ J', points: 20, difficulty: 5 },
  
  // Magnetic Effects
  { id: 17, type: 'mcq', question: 'Right hand thumb rule gives direction of...?', options: ['Current', 'Magnetic field', 'Force', 'Voltage'], correctAnswer: 'Magnetic field', points: 10, difficulty: 3 },
  { id: 18, type: 'mcq', question: 'Electromagnet uses...?', options: ['Hard iron', 'Soft iron', 'Steel', 'Copper'], correctAnswer: 'Soft iron', points: 15, difficulty: 4 },
  { id: 19, type: 'mcq', question: 'Electric motor converts...?', options: ['Electrical to mechanical', 'Mechanical to electrical', 'Heat to electrical', 'Light to electrical'], correctAnswer: 'Electrical to mechanical', points: 10, difficulty: 3 },
  { id: 20, type: 'mcq', question: 'AC generator works on principle of...?', options: ['Heating effect', 'Electromagnetic induction', 'Chemical effect', 'Magnetic effect'], correctAnswer: 'Electromagnetic induction', points: 15, difficulty: 4 },
  { id: 21, type: 'mcq', question: 'Frequency of AC in India is...?', options: ['50 Hz', '60 Hz', '100 Hz', '220 Hz'], correctAnswer: '50 Hz', points: 10, difficulty: 3 },
  
  // Sources of Energy
  { id: 22, type: 'mcq', question: 'Solar energy is...?', options: ['Non-renewable', 'Renewable', 'Exhaustible', 'Polluting'], correctAnswer: 'Renewable', points: 10, difficulty: 3 },
  { id: 23, type: 'mcq', question: 'Biogas mainly contains...?', options: ['Carbon dioxide', 'Methane', 'Hydrogen', 'Nitrogen'], correctAnswer: 'Methane', points: 15, difficulty: 4 },
  { id: 24, type: 'mcq', question: 'Nuclear fission involves...?', options: ['Joining nuclei', 'Splitting nuclei', 'No change', 'Emission of light'], correctAnswer: 'Splitting nuclei', points: 15, difficulty: 4 },
];

// ============ CLASS 10 CHEMISTRY ============
export const class10ChemistryQuestions: Question[] = [
  // Chemical Reactions
  { id: 1, type: 'mcq', question: 'Decomposition of calcium carbonate is...?', options: ['Endothermic', 'Exothermic', 'Neutral', 'No change'], correctAnswer: 'Endothermic', points: 15, difficulty: 4 },
  { id: 2, type: 'mcq', question: 'Oxidation involves...?', options: ['Gain of electrons', 'Loss of electrons', 'Gain of protons', 'Loss of neutrons'], correctAnswer: 'Loss of electrons', points: 15, difficulty: 4 },
  { id: 3, type: 'mcq', question: 'Reduction involves...?', options: ['Loss of electrons', 'Gain of electrons', 'Loss of protons', 'Gain of neutrons'], correctAnswer: 'Gain of electrons', points: 15, difficulty: 4 },
  { id: 4, type: 'mcq', question: 'Respiration is which type of reaction?', options: ['Endothermic', 'Exothermic', 'Decomposition', 'Combination'], correctAnswer: 'Exothermic', points: 10, difficulty: 3 },
  { id: 5, type: 'mcq', question: 'What type is: Zn + CuSO₄ → ZnSO₄ + Cu?', options: ['Combination', 'Decomposition', 'Displacement', 'Double displacement'], correctAnswer: 'Displacement', points: 15, difficulty: 4 },
  
  // Acids, Bases, Salts
  { id: 6, type: 'mcq', question: 'pH less than 7 indicates...?', options: ['Basic', 'Acidic', 'Neutral', 'None'], correctAnswer: 'Acidic', points: 10, difficulty: 3 },
  { id: 7, type: 'mcq', question: 'Sodium hydroxide is a...?', options: ['Strong acid', 'Weak acid', 'Strong base', 'Weak base'], correctAnswer: 'Strong base', points: 10, difficulty: 3 },
  { id: 8, type: 'mcq', question: 'Bleaching powder formula is...?', options: ['CaOCl₂', 'Ca(OH)₂', 'CaCl₂', 'CaCO₃'], correctAnswer: 'CaOCl₂', points: 15, difficulty: 4 },
  { id: 9, type: 'mcq', question: 'Washing soda is...?', options: ['NaHCO₃', 'Na₂CO₃.10H₂O', 'NaCl', 'NaOH'], correctAnswer: 'Na₂CO₃.10H₂O', points: 15, difficulty: 4 },
  
  // Metals and Non-metals
  { id: 10, type: 'mcq', question: 'Most reactive metal is...?', options: ['Gold', 'Sodium', 'Potassium', 'Iron'], correctAnswer: 'Potassium', points: 10, difficulty: 3 },
  { id: 11, type: 'mcq', question: 'Metals are good conductors because they have...?', options: ['Protons', 'Free electrons', 'Neutrons', 'Ions'], correctAnswer: 'Free electrons', points: 15, difficulty: 4 },
  { id: 12, type: 'mcq', question: 'Alloy of copper and zinc is...?', options: ['Bronze', 'Brass', 'Steel', 'Solder'], correctAnswer: 'Brass', points: 10, difficulty: 3 },
  { id: 13, type: 'mcq', question: 'Galvanization uses coating of...?', options: ['Copper', 'Zinc', 'Tin', 'Lead'], correctAnswer: 'Zinc', points: 15, difficulty: 4 },
  { id: 14, type: 'mcq', question: 'Ionic compounds have...?', options: ['Low melting point', 'High melting point', 'No melting point', 'Variable'], correctAnswer: 'High melting point', points: 15, difficulty: 4 },
  
  // Carbon Compounds
  { id: 15, type: 'mcq', question: 'Covalent bond is formed by...?', options: ['Transfer of electrons', 'Sharing of electrons', 'Gain of protons', 'Loss of neutrons'], correctAnswer: 'Sharing of electrons', points: 15, difficulty: 4 },
  { id: 16, type: 'mcq', question: 'Simplest hydrocarbon is...?', options: ['Ethane', 'Methane', 'Propane', 'Butane'], correctAnswer: 'Methane', points: 10, difficulty: 3 },
  { id: 17, type: 'mcq', question: 'Functional group -OH is called...?', options: ['Aldehyde', 'Ketone', 'Alcohol', 'Carboxylic acid'], correctAnswer: 'Alcohol', points: 15, difficulty: 4 },
  { id: 18, type: 'mcq', question: 'Ethanol has formula...?', options: ['CH₃OH', 'C₂H₅OH', 'CH₃COOH', 'HCOOH'], correctAnswer: 'C₂H₅OH', points: 15, difficulty: 4 },
  { id: 19, type: 'mcq', question: 'Soap is salt of...?', options: ['Strong acid', 'Weak acid', 'Strong base', 'Fatty acid'], correctAnswer: 'Fatty acid', points: 15, difficulty: 4 },
  
  // Periodic Classification
  { id: 20, type: 'mcq', question: 'Modern periodic law is based on...?', options: ['Atomic mass', 'Atomic number', 'Valency', 'Electronegativity'], correctAnswer: 'Atomic number', points: 10, difficulty: 3 },
  { id: 21, type: 'input', question: 'How many groups are there in modern periodic table?', correctAnswer: '18', points: 10, difficulty: 3 },
  { id: 22, type: 'mcq', question: 'Noble gases are in group...?', options: ['1', '17', '18', '8'], correctAnswer: '18', points: 10, difficulty: 3 },
  { id: 23, type: 'mcq', question: 'Metallic character increases down the group because...?', options: ['Atomic size increases', 'Atomic size decreases', 'Valency increases', 'Valency decreases'], correctAnswer: 'Atomic size increases', points: 20, difficulty: 5 },
];

// ============ CLASS 10 BIOLOGY ============
export const class10BiologyQuestions: Question[] = [
  // Life Processes
  { id: 1, type: 'mcq', question: 'Site of photosynthesis in plant cell is...?', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Ribosome'], correctAnswer: 'Chloroplast', points: 10, difficulty: 3 },
  { id: 2, type: 'mcq', question: 'Stomata are found mainly on...?', options: ['Upper surface', 'Lower surface', 'Both equally', 'Stem only'], correctAnswer: 'Lower surface', points: 15, difficulty: 4 },
  { id: 3, type: 'mcq', question: 'End product of anaerobic respiration in yeast is...?', options: ['Lactic acid', 'Ethanol', 'Pyruvate', 'Glucose'], correctAnswer: 'Ethanol', points: 15, difficulty: 4 },
  { id: 4, type: 'mcq', question: 'ATP is called...?', options: ['Energy currency', 'Genetic material', 'Building block', 'Catalyst'], correctAnswer: 'Energy currency', points: 10, difficulty: 3 },
  { id: 5, type: 'mcq', question: 'Digestion of starch begins in...?', options: ['Stomach', 'Mouth', 'Small intestine', 'Large intestine'], correctAnswer: 'Mouth', points: 10, difficulty: 3 },
  { id: 6, type: 'mcq', question: 'Bile is produced by...?', options: ['Pancreas', 'Liver', 'Stomach', 'Gall bladder'], correctAnswer: 'Liver', points: 10, difficulty: 3 },
  { id: 7, type: 'mcq', question: 'Exchange of gases occurs in...?', options: ['Bronchi', 'Bronchioles', 'Alveoli', 'Trachea'], correctAnswer: 'Alveoli', points: 10, difficulty: 3 },
  { id: 8, type: 'mcq', question: 'Oxygenated blood is carried by...?', options: ['Veins', 'Arteries', 'Capillaries', 'Lymph'], correctAnswer: 'Arteries', points: 10, difficulty: 3 },
  { id: 9, type: 'mcq', question: 'Excretory unit of kidney is...?', options: ['Ureter', 'Nephron', 'Urethra', 'Bladder'], correctAnswer: 'Nephron', points: 10, difficulty: 3 },
  
  // Control and Coordination
  { id: 10, type: 'mcq', question: 'Master gland of body is...?', options: ['Thyroid', 'Pituitary', 'Adrenal', 'Pancreas'], correctAnswer: 'Pituitary', points: 10, difficulty: 3 },
  { id: 11, type: 'mcq', question: 'Insulin is produced by...?', options: ['Thyroid', 'Pituitary', 'Pancreas', 'Adrenal'], correctAnswer: 'Pancreas', points: 10, difficulty: 3 },
  { id: 12, type: 'mcq', question: 'Adrenaline is called...?', options: ['Growth hormone', 'Fight or flight hormone', 'Sleep hormone', 'Love hormone'], correctAnswer: 'Fight or flight hormone', points: 15, difficulty: 4 },
  { id: 13, type: 'mcq', question: 'Reflex arc involves...?', options: ['Brain only', 'Spinal cord only', 'Both', 'Neither'], correctAnswer: 'Spinal cord only', points: 15, difficulty: 4 },
  { id: 14, type: 'mcq', question: 'Plant hormone for cell division is...?', options: ['Auxin', 'Cytokinin', 'Gibberellin', 'Abscisic acid'], correctAnswer: 'Cytokinin', points: 15, difficulty: 4 },
  
  // Reproduction
  { id: 15, type: 'mcq', question: 'Binary fission occurs in...?', options: ['Humans', 'Amoeba', 'Hydra', 'Plants'], correctAnswer: 'Amoeba', points: 10, difficulty: 3 },
  { id: 16, type: 'mcq', question: 'Budding occurs in...?', options: ['Amoeba', 'Planaria', 'Hydra', 'Bacteria'], correctAnswer: 'Hydra', points: 10, difficulty: 3 },
  { id: 17, type: 'mcq', question: 'Male gamete in flower is...?', options: ['Ovule', 'Pollen', 'Seed', 'Fruit'], correctAnswer: 'Pollen', points: 10, difficulty: 3 },
  { id: 18, type: 'mcq', question: 'Fertilization in humans occurs in...?', options: ['Uterus', 'Ovary', 'Fallopian tube', 'Vagina'], correctAnswer: 'Fallopian tube', points: 15, difficulty: 4 },
  
  // Heredity and Evolution
  { id: 19, type: 'mcq', question: 'Father of genetics is...?', options: ['Darwin', 'Mendel', 'Lamarck', 'De Vries'], correctAnswer: 'Mendel', points: 10, difficulty: 3 },
  { id: 20, type: 'mcq', question: 'DNA is found in...?', options: ['Cytoplasm', 'Nucleus', 'Cell wall', 'Vacuole'], correctAnswer: 'Nucleus', points: 10, difficulty: 3 },
  { id: 21, type: 'mcq', question: 'XX chromosomes indicate...?', options: ['Male', 'Female', 'Both', 'Neither'], correctAnswer: 'Female', points: 10, difficulty: 3 },
  { id: 22, type: 'mcq', question: 'Theory of natural selection was given by...?', options: ['Mendel', 'Darwin', 'Lamarck', 'Watson'], correctAnswer: 'Darwin', points: 10, difficulty: 3 },
  { id: 23, type: 'mcq', question: 'Fossils provide evidence for...?', options: ['Genetics', 'Evolution', 'Reproduction', 'Nutrition'], correctAnswer: 'Evolution', points: 10, difficulty: 3 },
  
  // Environment
  { id: 24, type: 'mcq', question: 'Organisms that make their own food are...?', options: ['Consumers', 'Producers', 'Decomposers', 'Parasites'], correctAnswer: 'Producers', points: 10, difficulty: 3 },
  { id: 25, type: 'mcq', question: '10% energy law was given by...?', options: ['Darwin', 'Lindeman', 'Mendel', 'Odum'], correctAnswer: 'Lindeman', points: 15, difficulty: 4 },
  { id: 26, type: 'mcq', question: 'Biodegradable waste is...?', options: ['Plastic', 'Glass', 'Vegetable peels', 'Metal'], correctAnswer: 'Vegetable peels', points: 10, difficulty: 3 },
  { id: 27, type: 'mcq', question: 'Ozone depletion is caused by...?', options: ['CO₂', 'CFCs', 'N₂', 'O₂'], correctAnswer: 'CFCs', points: 15, difficulty: 4 },
];

// ============ CLASS 10 ADVANCED MATH ============
export const class10MathQuestions: Question[] = [
  // Real Numbers
  { id: 1, type: 'mcq', question: 'HCF of 12 and 18 is...?', options: ['2', '3', '6', '36'], correctAnswer: '6', points: 10, difficulty: 3 },
  { id: 2, type: 'input', question: 'LCM of 4 and 6 is...?', correctAnswer: '12', points: 10, difficulty: 3 },
  { id: 3, type: 'mcq', question: 'HCF × LCM = Product of...?', options: ['Sum', 'Difference', 'Two numbers', 'Square'], correctAnswer: 'Two numbers', points: 15, difficulty: 4 },
  { id: 4, type: 'mcq', question: 'Terminating decimal is a...?', options: ['Irrational number', 'Rational number', 'Natural number', 'Prime number'], correctAnswer: 'Rational number', points: 15, difficulty: 4 },
  
  // Polynomials
  { id: 5, type: 'mcq', question: 'Sum of zeroes of ax² + bx + c is...?', options: ['b/a', '-b/a', 'c/a', '-c/a'], correctAnswer: '-b/a', points: 15, difficulty: 4 },
  { id: 6, type: 'mcq', question: 'Product of zeroes of ax² + bx + c is...?', options: ['b/a', '-b/a', 'c/a', '-c/a'], correctAnswer: 'c/a', points: 15, difficulty: 4 },
  { id: 7, type: 'input', question: 'If one zero of x² - 5x + 6 is 2, other zero is...?', correctAnswer: '3', points: 15, difficulty: 4 },
  { id: 8, type: 'mcq', question: 'Cubic polynomial has at most...?', options: ['1 zero', '2 zeroes', '3 zeroes', '4 zeroes'], correctAnswer: '3 zeroes', points: 10, difficulty: 3 },
  
  // Linear Equations
  { id: 9, type: 'mcq', question: 'For unique solution, lines are...?', options: ['Parallel', 'Intersecting', 'Coincident', 'None'], correctAnswer: 'Intersecting', points: 15, difficulty: 4 },
  { id: 10, type: 'mcq', question: 'No solution means lines are...?', options: ['Parallel', 'Intersecting', 'Coincident', 'Perpendicular'], correctAnswer: 'Parallel', points: 15, difficulty: 4 },
  { id: 11, type: 'input', question: 'Solve: x + y = 5, x - y = 1. Find x.', correctAnswer: '3', points: 15, difficulty: 3 },
  
  // Quadratic Equations
  { id: 12, type: 'mcq', question: 'Discriminant of ax² + bx + c is...?', options: ['b² - 4ac', 'b² + 4ac', '4ac - b²', 'b - 4ac'], correctAnswer: 'b² - 4ac', points: 15, difficulty: 4 },
  { id: 13, type: 'mcq', question: 'If D > 0, roots are...?', options: ['Equal', 'Real and distinct', 'Complex', 'Zero'], correctAnswer: 'Real and distinct', points: 15, difficulty: 4 },
  { id: 14, type: 'input', question: 'Find D for x² - 4x + 4 = 0', correctAnswer: '0', points: 15, difficulty: 3 },
  { id: 15, type: 'input', question: 'Solve x² = 25. Positive root is...?', correctAnswer: '5', points: 10, difficulty: 3 },
  
  // AP
  { id: 16, type: 'mcq', question: 'Common difference of 2, 5, 8, 11 is...?', options: ['2', '3', '5', '6'], correctAnswer: '3', points: 10, difficulty: 3 },
  { id: 17, type: 'input', question: 'Find 10th term of AP: 3, 7, 11, ... (use a + (n-1)d)', correctAnswer: '39', points: 15, difficulty: 3 },
  { id: 18, type: 'mcq', question: 'Sum of first n natural numbers is...?', options: ['n(n+1)/2', 'n²', 'n(n-1)/2', '2n'], correctAnswer: 'n(n+1)/2', points: 15, difficulty: 4 },
  { id: 19, type: 'input', question: 'Sum of first 10 terms if a=2, d=3', correctAnswer: '155', points: 20, difficulty: 4 },
  
  // Triangles
  { id: 20, type: 'mcq', question: 'Triangles are similar if angles are...?', options: ['Equal', 'Different', 'Right angles', 'None'], correctAnswer: 'Equal', points: 10, difficulty: 3 },
  { id: 21, type: 'mcq', question: 'Pythagoras theorem: In right triangle...?', options: ['a² + b² = c²', 'a + b = c', 'a² - b² = c²', 'ab = c'], correctAnswer: 'a² + b² = c²', points: 10, difficulty: 3 },
  { id: 22, type: 'input', question: 'In right triangle, if a=3, b=4, find c', correctAnswer: '5', points: 10, difficulty: 3 },
  
  // Trigonometry
  { id: 23, type: 'mcq', question: 'sin 30° = ...?', options: ['0', '1/2', '1', '√3/2'], correctAnswer: '1/2', points: 10, difficulty: 3 },
  { id: 24, type: 'mcq', question: 'cos 60° = ...?', options: ['0', '1/2', '1', '√3/2'], correctAnswer: '1/2', points: 10, difficulty: 3 },
  { id: 25, type: 'mcq', question: 'tan 45° = ...?', options: ['0', '1/2', '1', '√3'], correctAnswer: '1', points: 10, difficulty: 3 },
  { id: 26, type: 'mcq', question: 'sin²θ + cos²θ = ...?', options: ['0', '1', '2', 'tan²θ'], correctAnswer: '1', points: 15, difficulty: 4 },
  { id: 27, type: 'input', question: 'If sin θ = 3/5, find cos θ (as fraction)', correctAnswer: '4/5', points: 20, difficulty: 4 },
  
  // Circles
  { id: 28, type: 'mcq', question: 'Tangent to circle is perpendicular to...?', options: ['Chord', 'Diameter', 'Radius at point of contact', 'Secant'], correctAnswer: 'Radius at point of contact', points: 15, difficulty: 4 },
  { id: 29, type: 'input', question: 'Length of tangent from point 13cm from center, radius 5cm (cm)', correctAnswer: '12', points: 20, difficulty: 4 },
  
  // Areas
  { id: 30, type: 'mcq', question: 'Area of sector = ...?', options: ['πr²', 'θ/360 × πr²', '2πr', 'πr²/2'], correctAnswer: 'θ/360 × πr²', points: 15, difficulty: 4 },
  { id: 31, type: 'input', question: 'Area of circle with radius 7cm (use π=22/7) in cm²', correctAnswer: '154', points: 15, difficulty: 3 },
  
  // Surface Area and Volume
  { id: 32, type: 'mcq', question: 'Volume of cylinder = ...?', options: ['πr²h', '2πrh', 'πr²', '2πr²h'], correctAnswer: 'πr²h', points: 10, difficulty: 3 },
  { id: 33, type: 'input', question: 'Volume of cone with r=3cm, h=4cm (use π=3.14)', correctAnswer: '37.68', points: 20, difficulty: 4 },
  { id: 34, type: 'mcq', question: 'Surface area of sphere = ...?', options: ['πr²', '2πr²', '4πr²', '4/3πr³'], correctAnswer: '4πr²', points: 15, difficulty: 4 },
  
  // Probability
  { id: 35, type: 'mcq', question: 'Probability of certain event is...?', options: ['0', '0.5', '1', 'Undefined'], correctAnswer: '1', points: 10, difficulty: 3 },
  { id: 36, type: 'input', question: 'Probability of getting 6 on a fair die (as fraction)', correctAnswer: '1/6', points: 10, difficulty: 3 },
  { id: 37, type: 'mcq', question: 'P(A) + P(not A) = ...?', options: ['0', '0.5', '1', '2'], correctAnswer: '1', points: 10, difficulty: 3 },
  { id: 38, type: 'input', question: 'A bag has 3 red, 2 blue balls. P(red) = ? (as fraction)', correctAnswer: '3/5', points: 15, difficulty: 3 },
];

// ============ TYPING WORDS FOR CLASS 10 ============
export const class10TypingWords = {
  physics: ['reflection', 'refraction', 'concave', 'convex', 'resistance', 'potential', 'magnetic', 'electromagnetic', 'induction', 'generator', 'transformer', 'ampere', 'coulomb', 'voltage'],
  chemistry: ['oxidation', 'reduction', 'corrosion', 'galvanization', 'hydrocarbon', 'homologous', 'isomer', 'esterification', 'saponification', 'electrolysis', 'electroplating'],
  biology: ['photosynthesis', 'respiration', 'transpiration', 'excretion', 'reproduction', 'heredity', 'evolution', 'chromosome', 'ecosystem', 'biodiversity', 'decomposer'],
  math: ['polynomial', 'quadratic', 'discriminant', 'arithmetic', 'progression', 'trigonometry', 'coordinate', 'probability', 'statistics', 'tangent'],
};

// ============ TRUE/FALSE FOR CLASS 10 ============
export const class10TrueFalseQuestions = [
  { statement: 'Power of lens is measured in Dioptre', isTrue: true, explanation: 'Power = 1/f, measured in Dioptre (D)' },
  { statement: 'Concave lens is used to correct myopia', isTrue: true, explanation: 'Concave lens diverges light rays to correct near-sightedness' },
  { statement: 'Resistors in series have same voltage', isTrue: false, explanation: 'Resistors in series have same current, voltage is divided' },
  { statement: 'Oxidation is gain of electrons', isTrue: false, explanation: 'Oxidation is loss of electrons, reduction is gain' },
  { statement: 'Ethanol is used as a fuel', isTrue: true, explanation: 'Ethanol is a biofuel used in many countries' },
  { statement: 'Stomata are found on upper surface of leaves', isTrue: false, explanation: 'Stomata are mainly on lower surface to reduce water loss' },
  { statement: 'Insulin controls blood sugar level', isTrue: true, explanation: 'Insulin is hormone that regulates glucose in blood' },
  { statement: 'XX chromosomes indicate male', isTrue: false, explanation: 'XX indicates female, XY indicates male' },
  { statement: 'Sum of zeroes of quadratic = -b/a', isTrue: true, explanation: 'For ax² + bx + c, sum of roots = -b/a' },
  { statement: 'sin²θ + cos²θ = 0', isTrue: false, explanation: 'sin²θ + cos²θ = 1, fundamental identity' },
  { statement: 'Tangent is perpendicular to radius at point of contact', isTrue: true, explanation: 'This is a theorem about tangent to circle' },
  { statement: 'CFCs cause ozone layer depletion', isTrue: true, explanation: 'Chlorofluorocarbons break down ozone molecules' },
];

// ============ WORD BUILDER DATA FOR CLASS 10 ============
export const class10WordBuilderData = [
  { word: 'ELECTROMAGNETIC', hint: 'Type of induction in generators', category: 'Physics' },
  { word: 'SAPONIFICATION', hint: 'Process of making soap', category: 'Chemistry' },
  { word: 'PHOTOSYNTHESIS', hint: 'How plants make food', category: 'Biology' },
  { word: 'TRIGONOMETRY', hint: 'Study of triangles and angles', category: 'Math' },
  { word: 'BIODEGRADABLE', hint: 'Type of waste that decomposes naturally', category: 'Biology' },
  { word: 'HYDROCARBON', hint: 'Compound of hydrogen and carbon', category: 'Chemistry' },
  { word: 'PROBABILITY', hint: 'Measure of likelihood', category: 'Math' },
  { word: 'REFRACTION', hint: 'Bending of light', category: 'Physics' },
  { word: 'HEREDITY', hint: 'Passing traits to offspring', category: 'Biology' },
  { word: 'POLYNOMIAL', hint: 'Expression with multiple terms', category: 'Math' },
];
