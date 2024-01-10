import React from 'react';

function Avatar({ children, backgroundColor, px, py, color, borderRadius, fontSize, cursor }) {
  const style = {
    backgroundColor,
    padding: `${px} ${py}`,
    color: color || 'black',
    borderRadius,
    fontSize,
    textAlign: 'center',
    cursor: cursor || null,
    marginRight: '10px',
    display: 'inline-block',
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
}

export default Avatar;
