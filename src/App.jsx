import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [prompts, setPrompts] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const models = async () => {
    setIsLoading(true);
    const list = await fetch('https://nice-erin-basket-clam-tie.cyclic.app/', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        promps: prompts,
      }),
    });

    return list.json();
  };

  useEffect(() => {
    if (suggestion) {
      setIsLoading(false);
    }
  }, [suggestion]);
  const handleChange = (value) => {
    setPrompts(value);
    setSuggestion('');
  };
  const handleClick = async () => {
    const res = await models();
    setSuggestion(res[0]?.text);
  };

  return (
    <div className="App">
      <h1>
        GPT-3 Completion App that uses the "text-davinci-003" model from OpenAI
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="input-completion">
          Type in the box your prompt and get completion text suggestion
        </label>
        <br />
        <input
          id="input-completion"
          type="text"
          placeholder="type here and get suggestions"
          value={prompts}
          onChange={(e) => handleChange(e.target.value)}
        />
        <br />
        <div>
          {!suggestion && !isLoading && <p>...</p>}
          {isLoading && <p>loading</p>}
          {suggestion}
        </div>
        <button onClick={handleClick}>Get Completion Text</button>
        <br />
        <small>Implemented by Mondred</small>
      </form>
    </div>
  );
}

export default App;
