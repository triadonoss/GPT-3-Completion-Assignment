import { useState } from 'react';
import './App.css';

function App() {
  const [prompts, setPrompts] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const models = async () => {
    const list = await fetch('http://localhost:3500/', {
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
  const handleChange = (value) => {
    setPrompts(value);
  };
  const handleClick = async () => {
    //const res = await models();
    //console.log(res);
    //setSuggestion(res[0]?.text);
    //setTimeout(async () => {
    alert();
    const res = await models();
    setSuggestion(res[0]?.text);
    //}, 3000);
  };

  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="input-completion">
          Type in the box your prompt and get suggestions
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
          {!suggestion && <p>...</p>}
          {suggestion}
        </div>
        <button onClick={handleClick}>Get Completion Text</button>
      </form>
    </div>
  );
}

export default App;
