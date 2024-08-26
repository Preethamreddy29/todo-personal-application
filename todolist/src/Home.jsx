import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handelEdit = (id) => {
        axios.put('http://localhost:3001/update/'+id)
            .then(result => 
                location.reload()
            )
            .catch(err => console.log(err));


    }

    const handelDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/'+id)
            .then(result => 
                location.reload()
            )
            .catch(err => console.log(err));

    }

    return (
        <div className="home">
            <h2>To-Do List</h2>
            <Create />
            {
                todos.length === 0
                ?
                <div><h2>No Record Found</h2></div>
                :
                todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handelEdit(todo._id)}>
                            {todo.done ? <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                            :
                            <BsCircleFill className="icon" />
                            }
                            <p className={todo.done ? "task_test_completed" : ""}>{todo.task}</p>
                            {todo.done && <span className="completed_label">Task Completed</span>}
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon" 
                            onClick={() => handelDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
