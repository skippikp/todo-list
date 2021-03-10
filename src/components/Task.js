import React from 'react';

const Task = (props) => {
  const className ='task' + (props.task.done ? ' task-done' : '');

  return(
    <div className={className}>
      <p onClick={props.task.done === true ? props.doneFalse : props.doneTrue}>{props.task.title}</p>
      
      <p className="action-btn" onClick={props.removeTask}>❌</p>
    </div>
  )
}

export default Task;