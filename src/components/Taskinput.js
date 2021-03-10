import React from 'react';

class TaskInput extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            input: ''
        };
    }

    addTask = () => {
        const {input} = this.state;
        if (input) {
            this.props.addTask(input);
            this.setState({input: ''});
        }
    };

    hadleEnter = event => {
        if(event.key === 'Enter') this.addTask();
    }

    inputChange = (event) => {
        this.setState({input: event.target.value})
    };

    render() {
        const {input} = this.state;
        return(
            <div className="task-input">
                <input
                    onKeyPress={this.hadleEnter}
                    onChange={this.inputChange}
                    value={input}>
                </input>
                <button className={"action-btn"} onClick={this.addTask}>Добавить</button>
            </div>
        );
    }
}

export default TaskInput;