// Importing necessary dependencies and styles
import './style.css';
import { useState, useEffect, useRef, useCallback } from 'react';

// Functional component Todo
export default function Todo() {
    // Initializing state variables using the localStorage or an empty array if no data is stored
    const initialTodo = JSON.parse(window.localStorage.getItem('todo') || '[]');
    const [text, setText] = useState('');
    const [todo, setTodo] = useState(initialTodo);

    // Function to handle adding a new todo
    const handleTodo = () => {
        setText('');
        setTodo([...todo, text]);
    }

    // useEffect to update localStorage and focus on the input field when todo state changes
    useEffect(() => {
        window.localStorage.setItem('todo', JSON.stringify(todo))
        inputRef.current.focus()
    }, [todo])

    // useCallback for handling todo item removal
    const handleRemove = useCallback((id) => {
        const updateItems = todo.filter((elem, ind) => ind !== id);
        setTodo(updateItems);
    }, [todo])

    // useRef for accessing and focusing on the input field
    const inputRef = useRef(null);

    // useCallback to handle deleting all todos
    const handleDelete = useCallback(() => {
        setTodo([]);
    }, [])

    // Function to handle editing a todo item
    const handleEdit = (id) => {
        var data = prompt();
        if (data !== '') {
            todo.splice(id, 1, data);
            window.localStorage.setItem('todo', JSON.stringify(todo))
            window.location.reload(false);
        } else {
            window.localStorage.setItem('todo', JSON.stringify(todo))
            window.location.reload(false);
        }
    }

    // Function to mark a todo item as done
    const handleDone = (id) => {
        todo.splice(id, 1, "Task Completed : " + todo[id]);
        window.localStorage.setItem('todo', JSON.stringify(todo))
        window.location.reload(false);
    }

    // JSX structure for rendering the Todo component
    return (
        <div className='page'>
            <div className='todo'>
                <div>
                    <h1 className='heading'>TODO</h1>
                </div>
                <div className='head'>
                    {/* Input field for adding new todo */}
                    <input ref={inputRef} className='todo_input' value={text} onChange={(e) => setText(e.target.value)} placeholder='Create a new todo' />
                    {/* Button to add a new todo */}
                    <button className='add_button' onClick={(text !== '') ? () => { handleTodo() } : () => { }}>ADD</button>
                    {/* Button to delete all todos */}
                    <button className='del_button' onClick={handleDelete}>DELETE ALL</button>
                </div>
                {/* Rendering the list of todo items */}
                <div className='todo_items'>
                    {todo.map((elm, ind) => {
                        return (
                            <div className='todos' key={ind}>
                                {/* Displaying the todo text */}
                                <div className='todo_task'>
                                    <div className='todo_text'>{elm}</div>
                                </div>
                                {/* Buttons for marking as done, editing, and removing a todo */}
                                <div><button className='alter' onClick={() => handleDone(ind)}>Done</button></div>
                                <div><button className='alter' onClick={() => handleEdit(ind)}>Edit</button></div>
                                <div><button className='alter' onClick={() => handleRemove(ind)}>Remove</button></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
