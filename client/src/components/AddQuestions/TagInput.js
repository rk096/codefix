import React, { useState } from 'react';
import './TagInput.css'; // Import the CSS file

const TagInput = ({setTags, tags}) => {
  
  const maxTags = 5;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      if (tags.length < maxTags) {
        setTags([...tags, e.target.value.trim()]);
        e.target.value = '';
      }
    }
  };

  const handleDelete = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div>
      <div className='title'>
        <input
          type="text"
          placeholder="Press Enter to add a tag"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        {tags.map((tag, index) => (
          <span
            key={index}
            className="tag"
            onClick={() => handleDelete(index)}
          >
            {tag}
            <span className="delete-icon">x</span>
          </span>
        ))}
      </div>
      {tags.length === maxTags && (
        <p style={{ color: 'red' }}>Maximum limit of 5 tags reached.</p>
      )}
    </div>
  );
};

export default TagInput;
