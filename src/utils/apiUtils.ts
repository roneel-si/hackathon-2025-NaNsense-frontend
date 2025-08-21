import axios from 'axios';
import { Question, APIResponse } from '../types';

export const convertAPIQuestion = (apiQuestion: any, index: number): Question => {
  // Handle the actual API structure: Question, Options, Answer
  const questionText = apiQuestion.Question || apiQuestion.question || 'Unknown Question';
  const options = apiQuestion.Options || apiQuestion.options || [];
  const answerArray = apiQuestion.Answer || apiQuestion.answer || [];
  
  // Extract the correct answer (it's in an array)
  const correctAnswerText = Array.isArray(answerArray) ? answerArray[0] : answerArray;
  
  // Find the index of the correct answer in the options array
  const correctIndex = options.findIndex((option: string) => option === correctAnswerText);
  
  if (correctIndex === -1) {
    console.warn(`Correct answer "${correctAnswerText}" not found in options for question ${index}`);
  }
  
  const convertedQuestion = {
    id: `api-${index}`,
    question: questionText,
    options: options,
    correctAnswer: correctIndex,
    category: apiQuestion.category || 'Sports',
    difficulty: (apiQuestion.difficulty as 'easy' | 'medium' | 'hard') || 'medium'
  };
  
  return convertedQuestion;
};

export const fetchQuestionsFromAPI = async (apiUrl: string): Promise<Question[]> => {
  try {
    const pageTitle = document.title || 'No title found';
    
    const response = await axios.post<APIResponse>(apiUrl, {
      prompt: pageTitle
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    // Check for the actual API structure: { success: true, data: [...] }
    if (response.data.success && response.data.data && Array.isArray(response.data.data)) {
      if (response.data.data.length === 0) {
        throw new Error('No questions received from API');
      }
      
      const convertedQuestions = response.data.data.map((apiQuestion: any, index: number) => 
        convertAPIQuestion(apiQuestion, index)
      );
      return convertedQuestions;
    }
    
    // Check if response.data is directly an array (not wrapped in .data property)
    if (Array.isArray(response.data)) {
      if (response.data.length === 0) {
        throw new Error('No questions received from API');
      }
      
      const convertedQuestions = response.data.map((apiQuestion: any, index: number) => 
        convertAPIQuestion(apiQuestion, index)
      );
      return convertedQuestions;
    }
    
    // Legacy check for nested data property (keeping for compatibility)
    if (response.data.data && Array.isArray(response.data.data)) {
      if (response.data.data.length === 0) {
        throw new Error('No questions received from API');
      }
      
      const convertedQuestions = response.data.data.map((apiQuestion: any, index: number) => 
        convertAPIQuestion(apiQuestion, index)
      );
      return convertedQuestions;
    }
    
    // If no format matches
    console.error('Invalid response structure:', response.data);
    throw new Error('Invalid API response format - expected array of questions');
  } catch (error) {
    console.error('Error fetching questions from API:', error);
    
    // More detailed error logging
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      
      // Provide more specific error messages based on status codes
      if (status === 404) {
        throw new Error(`API endpoint not found (404). Please check if '${apiUrl}' is the correct URL.`);
      } else if (status === 500) {
        throw new Error(`Server error (500). The API server is experiencing issues.`);
      } else if (status === 403) {
        throw new Error(`Access forbidden (403). Check API authentication or permissions.`);
      } else if (error.code === 'ECONNABORTED') {
        throw new Error(`Request timeout. The API took too long to respond.`);
      } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw new Error(`Cannot connect to API server. Please check your internet connection.`);
      } else {
        throw new Error(`API request failed: ${statusText || error.message}`);
      }
    }
    
    throw error;
  }
};

