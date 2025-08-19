import axios from 'axios';
import { Question, APIResponse, APIQuestion } from '../types';

export const convertAPIQuestionToQuestion = (apiQuestion: APIQuestion, index: number): Question => {
  const correctAnswers = apiQuestion.Answer;
  const options = apiQuestion.Options;
  
  // Find the indices of correct answers (now always single choice)
  const correctIndex = options.findIndex(option => option === correctAnswers[0]);
  
  return {
    id: index,
    question: apiQuestion.Question,
    options: apiQuestion.Options,
    correctAnswer: correctIndex !== -1 ? correctIndex : 0,
    multipleChoice: false, // No longer supporting multiple choice
    category: 'sports',
    difficulty: 'medium'
  };
};

export const fetchQuestionsFromAPI = async (apiUrl: string): Promise<Question[]> => {
  try {
    // Get the page title for the API request
    const pageTitle = document.title || 'No title found';
    
    const response = await axios.post<APIResponse>(apiUrl, {
      prompt: pageTitle
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.data.map((apiQuestion, index) => 
      convertAPIQuestionToQuestion(apiQuestion, index)
    );
  } catch (error) {
    console.error('Failed to fetch questions from API:', error);
    throw error;
  }
};

