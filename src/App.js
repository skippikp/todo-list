import React from 'react';
import './App.css';
import Task from './components/Task';
import TaskInput from './components/Taskinput';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 0, title: 'Оформи смачный пук', done: false },
        { id: 1, title: 'Скрафтить туду лист', done: true },
        { id: 2, title: 'Обоссать Вадима', done: false }
      ]
    };
  }
  
  doneTrue = id => {
    const index = this.state.tasks.map(item => item.id).indexOf(id);
    this.setState(state => {
      let {tasks} = state;
      tasks[index].done = true;
      return tasks;
    });
  }

  doneFalse = id => {
    const index = this.state.tasks.map(item => item.id).indexOf(id);
    this.setState(state => {
      let {tasks} = state;
      tasks[index].done = false;
      return tasks;
    });
  }

  removeTask = id => {
    const index = this.state.tasks.map(task => task.id).indexOf(id);
    this.setState(state => {
      let {tasks} = state;
      tasks.splice(index, 1);
      return tasks;
    });
  }

  addTask = task => {
    this.setState(state => {
      let {tasks} = state;
      tasks.push({
        id: tasks.length !== 0 ? tasks[tasks.length - 1].id + 1 : 0,
        title: task,
        done: false
      });
      return tasks;     
    });  
  };

  saveTasks = state => {
    try{
      const serializedState = JSON.stringify(state);
      localStorage.setItem('tasks', serializedState);
    } catch (err){
        return undefined;
    }
  };

  loadTasks = state => {
    try {
      const serializedState = localStorage.getItem(state);
      if(serializedState === null){
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  componentDidMount() {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return;}
      this.setState({tasks: this.loadTasks('tasks')}
      );
  } 
  
  
  render() {
    const {tasks} = this.state;
    const activeTasks = tasks.filter(task => !task.done);
    const doneTasks = tasks.filter(task => task.done);
    const todoItems = [...activeTasks, ...doneTasks].map(task => {
      return (
        <Task
          task={task}
          key={task.id}
          doneFalse={() => this.doneFalse(task.id)}
          doneTrue={() => this.doneTrue(task.id)}
          removeTask={() => this.removeTask(task.id)}
        />
      )
    });

    return(
      <div className="App">
        <h1 className="head">Активных задач: {activeTasks.length}</h1>
        {todoItems}
        <TaskInput addTask={this.addTask} />
        <button className="action-btn" onClick={() => this.saveTasks(this.state.tasks)}>Сохранить</button>
      </div>
    )
  };
}

export default App;