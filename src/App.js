import React, { useState } from 'react';
import './App.css'; // Styling ke liye CSS file import ki

// ------------------------------------------------------------------
// LOCAL TESTING URL
const API_URL = "https://sentiment-api-backend.onrender.com/predict";
// ------------------------------------------------------------------

function App() {
  const [text, setText] = useState(''); 
  const [sentiment, setSentiment] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!text) return; 

    setLoading(true); 
    setSentiment(null); 

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ text: text }),
    })
      .then((res) => res.json()) 
      .then((data) => {
        setSentiment(data.sentiment);
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setSentiment('Error');
        setLoading(false); 
      });
  };

  const getSentimentColor = () => {
    if (sentiment === 'Positive') return 'positive';
    if (sentiment === 'Negative') return 'negative';
    if (sentiment === 'Error') return 'negative';
    return 'default';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Review Sentiment Analysis</h1>
        <p>Enter a review to see if it's positive or negative.</p>
        
        <form onSubmit={handleSubmit}>
          <textarea
            rows="8" 
            cols="60" 
            placeholder="e.g., 'This movie was fantastic!'"
            value={text} 
            // 
            // --- YEH HAI SAHI LINE ---
            //
            onChange={(e) => setText(e.target.value)} // Jab bhi user type karega, 'text' state update hoga
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </form>

        {sentiment && (
          <div className="result-box">
            <h2>Result: 
              <span className={getSentimentColor()}>
                {sentiment}
              </span>
            </h2>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

