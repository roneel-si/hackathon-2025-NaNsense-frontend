import axios from 'axios';
import { Question, APIResponse, APIQuestion } from '../types';

export const convertAPIQuestionToQuestion = (apiQuestion: APIQuestion, index: number): Question => {
  const correctAnswers = apiQuestion.Answer;
  const options = apiQuestion.Options;
  
  // Find the indices of correct answers
  const correctIndices = correctAnswers.map(answer => 
    options.findIndex(option => option === answer)
  ).filter(index => index !== -1);
  
  return {
    id: index,
    question: apiQuestion.Question,
    options: apiQuestion.Options,
    correctAnswer: apiQuestion.multipleChoice ? correctIndices : correctIndices[0],
    multipleChoice: apiQuestion.multipleChoice,
    category: 'sports',
    difficulty: 'medium'
  };
};

export const fetchQuestionsFromAPI = async (apiUrl: string): Promise<Question[]> => {
  try {
    const response = await axios.post<APIResponse>(apiUrl, {}, {
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

