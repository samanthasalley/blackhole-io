import React from 'react';

const AddToDo = ({ addTask }) => {
  let input;
  return (
    <div>
      <input ref={(node) => { input = node; }}/>
      <button onClick={() => {
        addTask(input.value);
        input.value = '';
      }}
      >
      +
      </button>
    </div>
  );
};

export default AddToDo;
