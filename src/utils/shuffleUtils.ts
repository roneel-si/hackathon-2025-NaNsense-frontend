import { Question } from '../types';

export interface ShuffledQuestion extends Omit<Question, 'correctAnswer'> {
  correctAnswer: number;
  originalCorrectAnswer: number;
}

/**
 * Shuffles the options of a question and updates the correct answer index accordingly
 * @param question - The original question with options and correct answer
 * @returns A new question object with shuffled options and updated correct answer index
 */
export function shuffleQuestionOptions(question: Question): ShuffledQuestion {
  // Create a copy of the options array
  const options = [...question.options];
  
  // Get the original correct answer (handle both single and multiple choice)
  const originalCorrectAnswer = Array.isArray(question.correctAnswer) 
    ? question.correctAnswer[0] 
    : question.correctAnswer;
  
  // Create an array of indices to shuffle
  const indices = options.map((_, index) => index);
  
  // Fisher-Yates shuffle algorithm
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Shuffle the options using the shuffled indices
  const shuffledOptions = indices.map(index => options[index]);
  
  // Find the new index of the correct answer
  const newCorrectAnswerIndex = indices.indexOf(originalCorrectAnswer);
  
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswerIndex,
    originalCorrectAnswer: originalCorrectAnswer
  };
}

/**
 * Shuffles all questions in an array
 * @param questions - Array of questions to shuffle
 * @returns Array of questions with shuffled options
 */
export function shuffleAllQuestions(questions: Question[]): ShuffledQuestion[] {
  return questions.map(shuffleQuestionOptions);
}
