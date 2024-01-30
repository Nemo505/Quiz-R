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
      <div className="grid place-items-center h-screen bg-purple-100 ">
        <div className="container mx-{160px} py-16 ring-2 ring-purple-500 rounded-md bg-purple-300">
          {question ? (
              <div>
                  {index < question.length ? (
                        <div className="flex flex-col items-center">
                              <div className="text-2xl font-semi 
                                                text-white text-center 
                                                mb-4 bg-purple-500 bg-opacity-50
                                                p-4 ring-2 ring-purple-200
                                                rounded-md shadow-lg
                                            ">
                                  {question[index].question}
                              </div>
                            <div className="grid grid-cols-2 gap-4">
                                {options.map((option, index) => (
                                    <button
                                        className='bg-gradient-to-r 
                                                    from-purple-300 to-purple-700 
                                                    hover:from-purple-700 
                                                    hover:to-purple-300 
                                                    text-white font-bold 
                                                    py-2 px-4 rounded-md 
                                                    transition duration-300 ease-in-out 
                                                    focus:outline-none 
                                                    focus:shadow-outline-purple 
                                                    active:bg-purple-800
                                                    ring-1 ring-purple-600
                                                    flex
                                                    justify-start'
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        <div className='mr-2'>{String.fromCharCode(97 + index)}.</div> {option}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="mt-4 p-2 bg-purple-800 
                                            text-white rounded-md"
                                onClick={handleNextQuestion}
                            >
                                Next
                            </button>
                    </div>

                    ) : (
                        <div>
                        <h1 className="text-3xl font-semibold mb-4">Quiz Completed!</h1>
                        <p>Your Score: {score}/{question.length}</p>
                        </div>
                    )}
                </div>
          ): (
                <div>
                      loading please wait
                </div>    
          )}
    
        </div>
    </div>
      
  );
}

export default Quiz