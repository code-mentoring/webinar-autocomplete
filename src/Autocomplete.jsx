import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Input = styled.input`
  height: 40px;
  border-radius: 20px;
  border: 2px solid #eee;
  box-sizing: border-box;
  outline: none;
  padding: 0 20px;
  font-size: 18px;
  transition: all 0.1s;

  &:hover {
    border-color: #ddd;
  }
  &:focus {
    border-color: #0055ff;
    background: #f0f0f0;
  }
`;


const ResultItem = styled.li`
  /* Adapt the colors based on primary prop */
  display: block;
  background: ${props => props.focus ? "#dce7ff" : "white"};
  list-style: none;
  height: 30px;
  line-height: 30px;
`;


export const Autocomplete = () => {
  // State hook to manage the list of users that we've queried
  const [results, setResults] = useState(null);
  // Which result item is currently focused on
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const search = async q => {
    const res = await axios(`http://localhost:9999/search?q=${q}`);
    setResults(res.data);
  }

  const handleKey = e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.stopPropagation();
    e.preventDefault();

    let newIndex = hoveredIndex + (e.key === 'ArrowDown' ? 1 : -1);
    if (newIndex < 0) newIndex = results.length - 1;
    if (newIndex >= results.length) newIndex = 0;
    setHoveredIndex(newIndex);
  }

  return <div>
    <Input
      type="text"
      onChange={e => search(e.target.value)}
      onKeyDown={handleKey}
    />

    {results && <ul className="results">
      {results.map((r, i) => <ResultItem
        key={i}
        focus={i === hoveredIndex}
        onMouseEnter={() => setHoveredIndex(i)}
      >
        {r.name.first} {r.name.last}
      </ResultItem>)}
    </ul>}

  </div>;
}
