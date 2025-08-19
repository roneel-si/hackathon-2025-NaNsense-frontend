import { Question } from '../types';

export const defaultQuestions: Question[] = [
  {
    id: 1,
    question: "🏏 Which team won the IPL 2023?",
    options: ["Mumbai Indians", "Chennai Super Kings", "Rajasthan Royals", "Gujarat Titans"],
    correctAnswer: 1,
    category: "Cricket",
    difficulty: "medium"
  },
  {
    id: 2,
    question: "⚽ Who won the FIFA World Cup 2022?",
    options: ["Brazil", "France", "Argentina", "Portugal"],
    correctAnswer: 2,
    category: "Football",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "🏀 Which NBA player has won the most championships?",
    options: ["Michael Jordan", "LeBron James", "Bill Russell", "Kareem Abdul-Jabbar"],
    correctAnswer: 2,
    category: "Basketball",
    difficulty: "hard"
  },
  {
    id: 4,
    question: "🏈 What is the name of the NFL championship game?",
    options: ["World Series", "Super Bowl", "Stanley Cup", "NBA Finals"],
    correctAnswer: 1,
    category: "American Football",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "🎾 Who holds the record for most Grand Slam titles?",
    options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
    correctAnswer: 2,
    category: "Tennis",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "🏓 Which country has won the most Olympic medals?",
    options: ["Soviet Union", "United States", "China", "Germany"],
    correctAnswer: 1,
    category: "Olympics",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "🏊‍♂️ Who is known as 'The Flying Fish' in swimming?",
    options: ["Michael Phelps", "Usain Bolt", "Cristiano Ronaldo", "Lionel Messi"],
    correctAnswer: 0,
    category: "Swimming",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "🏃‍♂️ What is the world record for 100m sprint?",
    options: ["9.58 seconds", "9.69 seconds", "9.72 seconds", "9.74 seconds"],
    correctAnswer: 0,
    category: "Athletics",
    difficulty: "hard"
  },
  {
    id: 9,
    question: "🏸 Which country dominates badminton?",
    options: ["China", "Indonesia", "Malaysia", "Japan"],
    correctAnswer: 0,
    category: "Badminton",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "🏓 What is the national sport of Japan?",
    options: ["Sumo Wrestling", "Baseball", "Soccer", "Tennis"],
    correctAnswer: 0,
    category: "General Sports",
    difficulty: "medium"
  }
];
