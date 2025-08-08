import React, { useState, useEffect } from 'react';



const motivationalQuotes: string[] = [
    "Every test you take sharpens your skills and builds confidence for the next.",
    "The secret to getting ahead is getting started. Your hard work is paying off.",
    "Persistence is failing 19 times and succeeding the 20th. Keep going!",
    "Challenges are what make life interesting; overcoming them is what makes life meaningful.",
    "The best way to predict the future is to create it. You're creating your success right now."
];

const Loader: React.FC = () => {
   
    const [currentQuote, setCurrentQuote] = useState<string>('');

    
    useEffect(() => {
      
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        setCurrentQuote(motivationalQuotes[randomIndex]);
    }, []); 

    return (
        <div className="loader-container">
            <div className="loader-box">
                
             
                <div className="loader-animation">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                
          
                <h2 className="loading-text">Crafting Your Challenge...</h2>
                
             
                <p className="quote-text">
                    "{currentQuote}"
                </p>

            </div>
        </div>
    );
};

export default Loader;