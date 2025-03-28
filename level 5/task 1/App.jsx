import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (values, { resetForm }) => {
    const newTask = { id: uuidv4(), title: values.title, description: values.description, completed: false };
    setTasks([...tasks, newTask]);
    resetForm();
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-manager-container">
      <h1 className="title">Task Manager</h1>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={addTask}
      >
        {() => (
          <Form className="task-form">
            <Field className="input" name="title" placeholder="Task Title" required />
            <Field className="input" name="description" placeholder="Task Description" required />
            <button className="add-button" type="submit">Add Task</button>
          </Form>
        )}
      </Formik>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
            </div>
            <div className="task-actions">
              <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} className="checkbox" />
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
