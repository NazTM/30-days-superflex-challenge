import React, { useState } from 'react';
import './ToDoList.css';

const ToDoList = () => {
  const [todos, setTodos] = useState([
    { text: '', completed: false },
    { text: '', completed: false },
    { text: '', completed: false },
  ]);

  const handleInputChange = (index, value) => {
    const newTodos = [...todos];
    newTodos[index].text = value;
    setTodos(newTodos);
  };

  const handleCheckboxChange = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="desktop-frame">
      <div className="wooden-background" />
      <div className="notebook-page" />
      
      {[0, 1, 2].map((index) => (
        <div 
          key={`checkbox-${index}`} 
          className={`checkbox checkbox-${index + 1}`}
          onClick={() => handleCheckboxChange(index)}
        >
          <div className="checkbox-frame">
            {todos[index].completed && <div className="checkbox-checked" />}
          </div>
        </div>
      ))}
      
      {[0, 1, 2].map((index) => (
        <div 
          key={`input-${index}`} 
          className={`input-field input-field-${index + 1}`}
        >
          <div className="input">
            <input
              type="text"
              placeholder="Value"
              value={todos[index].text}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className={todos[index].completed ? 'completed' : ''}
            />
          </div>
        </div>
      ))}
      
      <h1 className="title">Three To-Dos</h1>
      <div className="floral-border" />
      <div className="doodle-1" />
      <div className="doodle-2" />
    </div>
  );
};

export default ToDoList;
