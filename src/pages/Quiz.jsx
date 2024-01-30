import React from 'react'
import { useEffect, useState } from 'react';

const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(BASE_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch question');
                }
                const questionData = await response.json();
                setQuestion(questionData.results);
            } catch (error) {
                console.error('Error fetching question:', error.message);
            }
        };
        const delay = 1000; // 1 second delay between API calls
        const timeoutId = setTimeout(() => {
            fetchQuestion();
        }, delay);

        return () => clearTimeout(timeoutId); 

    }, []);

    useEffect(() => {
    if (question !== null) {
        const shuffleOptions = () => {
        const allOptions = [...question[index].incorrect_answers, question[index].correct_answer];
        // Fisher-Yates Shuffle Algorithm
        for (let i = allOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
        }
        setOptions(allOptions);
        };

        shuffleOptions();
    }
    }, [question, index]);

    const handleNextQuestion = () => {
    }
  
  return (
      <div className="grid place-items-center h-screen  ">
        <div className="container mx-{160px} p-4 bg-gray-100">
          {question ? (
              <div>
                  {index < question.length ? (
                        <div>
                        <div className="text-2xl font-semi text-center mb-4">{question[index].question}</div>
                        <div className="grid gap-4">
                            {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </button>
                            ))}
                        </div>
                        <button
                            className="mt-4 p-2 bg-blue-500 text-white rounded-md"
                            onClick={handleNextQuestion}
                        >
                            Next Question
                        </button>
                        </div>
                    ) : (
                        <div>
                        <h1 className="text-3xl font-semibold mb-4">Quiz Completed!</h1>
                        <p>Your Score: {score}/{questions.length}</p>
                        </div>
                    )}
                    </div>
          ): (
                <div>
                      no
                </div>    
          )}
    
        </div>
    </div>
      
  );
}

export default Quiz