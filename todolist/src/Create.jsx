import React, { useState } from 'react';
import axios from 'axios';

function Create({ addTodo }) {
    const [task, setTask] = useState("");

    const addTask = () => {
        axios.post('http://localhost:3001/add', { task: task })
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter the Task"
                onChange={(e) => setTask(e.target.value)}
                value={task}
            />
            <button type="button" onClick={addTask}>Add Task</button>
        </div>
    );
}

export default Create;
