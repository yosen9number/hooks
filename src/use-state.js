import React, { useState} from 'react';

export const HookSwitcher = () => {
  const [ color, setColor ] = useState('black');
  const [ fontSize, setFontSize ] = useState(14);

  return (
      <div style={{ padding: '10px',
          backgroundColor: color,
          fontSize: `${fontSize}px`,
          color: 'red'
      }}>
          <button onClick={() => setColor('black')}>Dark</button>
          <button onClick={() => setColor('white')}>Light</button>
          <button onClick={() => setFontSize((s) => s + 2)}>+</button>
          <button onClick={() => setFontSize((s) => s - 2)}>-</button>
          <div>Hello World</div>
      </div>
  );
};
