import { Question } from '../types';

export const defaultQuestions: Question[] = [
  {
    id: "1",
    question: "Which sport is played at Wimbledon?",
    options: ["Football", "Tennis", "Cricket", "Basketball"],
    correctAnswer: 1,
    category: "Sports",
    difficulty: "easy",
    hint: "This sport involves a racket and a net."
  },
  {
    id: "2", 
    question: "How many players are on a basketball team during play?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    category: "Sports",
    difficulty: "easy",
    hint: "Think about the starting lineup positions."
  },
  {
    id: "3",
    question: "In which sport would you perform a slam dunk?",
    options: ["Volleyball", "Basketball", "Tennis", "Football"],
    correctAnswer: 1,
    category: "Sports", 
    difficulty: "easy",
    hint: "This involves jumping high to score."
  },
  {
    id: "4",
    question: "What is the maximum score possible in ten-pin bowling?",
    options: ["200", "250", "300", "350"],
    correctAnswer: 2,
    category: "Sports",
    difficulty: "medium",
    hint: "It's a perfect game with all strikes."
  },
  {
    id: "5",
    question: "Which country has won the most FIFA World Cups?",
    options: ["Germany", "Argentina", "Brazil", "Italy"],
    correctAnswer: 2,
    category: "Sports",
    difficulty: "medium",
    hint: "This South American country is famous for its football culture."
  },
  {
    id: "6",
    question: "In golf, what is the term for one stroke under par?",
    options: ["Eagle", "Birdie", "Bogey", "Albatross"],
    correctAnswer: 1,
    category: "Sports",
    difficulty: "medium",
    hint: "It's named after a flying creature."
  },
  {
    id: "7",
    question: "How long is a marathon race?",
    options: ["26.2 miles", "25 miles", "24.2 miles", "27 miles"],
    correctAnswer: 0,
    category: "Sports",
    difficulty: "medium",
    hint: "The distance was standardized for the Olympics."
  },
  {
    id: "8",
    question: "Which sport uses terms like 'love', 'deuce', and 'advantage'?",
    options: ["Badminton", "Tennis", "Squash", "Table Tennis"],
    correctAnswer: 1,
    category: "Sports",
    difficulty: "easy",
    hint: "This sport is played on grass courts at Wimbledon."
  },
  {
    id: "9",
    question: "In which sport do teams compete for the Stanley Cup?",
    options: ["Basketball", "Football", "Ice Hockey", "Baseball"],
    correctAnswer: 2,
    category: "Sports",
    difficulty: "medium",
    hint: "This sport is played on ice with pucks."
  },
  {
    id: "10",
    question: "What is the highest possible break in snooker?",
    options: ["147", "155", "167", "180"],
    correctAnswer: 0,
    category: "Sports",
    difficulty: "hard",
    hint: "It involves potting all balls in perfect sequence."
  }
];
