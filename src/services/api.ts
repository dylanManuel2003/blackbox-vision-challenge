import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php';

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        amount: 10,
        type: 'multiple',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
