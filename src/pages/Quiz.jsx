import React from 'react'
import { useEffect, useState } from 'react';

const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);

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

    console.log(score);
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

    const handleOptionClick = (e, option) => {
        const correct_answer = question[index].correct_answer;
        if (lock == false) {
            if (correct_answer === option) {
                e.target.classList.remove("from-fuchsia-400", "to-fuchsia-800", "hover:from-fuchsia-700", "hover:to-fuchsia-400");
                e.target.classList.add("from-green-400", "to-green-800", "hover:from-green-700", "hover:to-green-400");
                setScore(prevScore => prevScore + 1);
                setLock(true);
            } else {
                e.target.classList.remove("from-fuchsia-400", "to-fuchsia-800", "hover:from-fuchsia-700", "hover:to-fuchsia-400");
                e.target.classList.add("from-red-400", "to-red-800", "hover:from-red-700", "hover:to-red-400");
                const correctAnswerElement = document.querySelector(`[data-answer="${correct_answer}"]`);
                if (correctAnswerElement) {
                    correctAnswerElement.classList.remove("from-fuchsia-400", "to-fuchsia-800", "hover:from-fuchsia-700", "hover:to-fuchsia-400");
                    correctAnswerElement.classList.add("from-green-400", "to-green-800", "hover:from-green-700", "hover:to-green-400");
                }
                setLock(true);
            }
        }
    };


    const handleNextQuestion = () => {
        if (lock == true ) { 
            // should not modify the state variable directly. Instead, use the functional update form with the callback function provided to setIndex
            setIndex(prevIndex => prevIndex + 1);
            setLock(false);
            options.map((option) => {
                const option_list = document.querySelector(`[data-answer="${option}"]`);
                option_list.classList.remove("from-green-400", "to-green-800", "hover:from-green-700", "hover:to-green-400",
                                            "from-red-400", "to-red-800", "hover:from-red-700", "hover:to-red-400");
                option_list.classList.add("from-fuchsia-400", "to-fuchsia-800", "hover:from-fuchsia-700", "hover:to-fuchsia-400");
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setScore(0);
        setLock(false);
    }
  
  return (
      <div className="grid place-items-center h-screen  " style={{ background: 'linear-gradient(to right, #3d1223, #302b63, #3d1223)'}}>
          
          {question ? (
                <div className="w-300 py-12 ring-1 
                            ring-purple-400 rounded-md
                            bg-pink-300 bg-opacity-25 shadow-2xl
                        ">
                  {index + 1 < question.length ? (
                    <div className="flex flex-col items-center">
                            <div className="text-2xl font-semi-bold
                                                text-white text-center 
                                                mb-16 bg-purple-500 bg-opacity-50
                                                p-4 ring-1 ring-purple-400
                                                rounded-xl shadow-lg m-4"
                                style={{ width: '500px', fontFamily: 'caveat', background: 'linear-gradient(to right,   #76448a ,  #d2b4de,  purple , #d2b4de, purple)' }}>
                                {question[index].question}
                            </div>
                              
                            <div className="grid grid-cols-2 gap-4 mx-4">
                                {options.map((option, index) => (
                                    <button
                                        className='bg-gradient-to-r 
                                                    from-fuchsia-400 to-fuchsia-800 
                                                    hover:from-fuchsia-700 
                                                    hover:to-fuchsia-400 
                                                    text-white font-semi-bold 
                                                    py-2 px-4 rounded-md 
                                                    transition duration-300 ease-in-out 
                                                    focus:outline-none 
                                                    focus:shadow-outline-fuchsia 
                                                    active:bg-fuchsia-800
                                                    ring-1 ring-purple-400
                                                    flex
                                                    justify-start'
                                        style={{ fontFamily: 'cormorant-garamond' }}
                                        key={index}
                                        data-answer={option}
                                        onClick={(e) => handleOptionClick(e, option)}
                                    >
                                        <div className='mr-2'>{String.fromCharCode(97 + index)}.</div> {option}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="mt-12 px-8 p-1 bg-gradient-to-r 
                                                    from-purple-700 to-purple-800 
                                                    hover:from-purple-700 
                                                    hover:to-purple-700 
                                                    ring-1 ring-purple-600
                                                    shadow-lg
                                            text-white rounded-md"
                                onClick={handleNextQuestion}
                            >
                                Next
                              </button>
                              <div className='mt-4 text-xs text-white'>
                                  {index + 1} of {question.length}
                              </div>
                    </div>

                    ) : (
                    <div className='m-4 text-white text-center'>
                        <h1 class="text-4xl font-extrabold mb-6">Quiz Completed!</h1>
                        <p class="text-lg mb-8">Your Score: <span class="text-fuchsia-400 font-semibold">{score}</span>/<span class="font-semibold">{question.length}</span></p>

                        <div class="flex justify-center space-x-4">
                            <button class="p-2 bg-gradient-to-r 
                                                    from-purple-700 to-purple-800 
                                                    hover:from-purple-700 
                                                    hover:to-purple-700 
                                                    ring-1 ring-purple-600
                                                    shadow-lg
                                            text-white rounded-md"
                                        onClick={reset}
                                      >
                                Try Again
                            </button>
                        </div>
                    </div>

                    )}
                </div>
          ): (
               <div className='text-white'>
                    <div className='animate-spin text-center'>
                        Loading, please wait
                    </div>
                </div>
                  
   
          )}
    
    </div>
      
  );
}

export default Quiz