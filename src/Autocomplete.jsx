import React, {useState} from 'react';
import axios from 'axios';

export const Autocomplete = () => {
  const [results, setResults] = useState(null);

  const search = async q => {
    const res = await axios(`http://localhost:9999/search?q=${q}`);
    setResults(res.data);
  }

  return <div>
    <input
      type="text"
      onChange={e => search(e.target.value)}
    />
    {results && <ul className="results">
      {results.map(r => <li>
        {r.name.first} {r.name.last}
      </li>)}
    </ul>}
  </div>;
}
