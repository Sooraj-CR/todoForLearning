"use client";

import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";

type todos = {
  id: number;
  todo: string;
  completed?: boolean;
};

const Todo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<todos[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) {
      return [];
    }

    return JSON.parse(storedTodos).map(
      (item: { id: number; todo?: string; title?: string; completed?: boolean }) => ({
        id: item.id,
        todo: item.todo ?? item.title ?? "",
        completed: item.completed,
      }),
    );
  });

  useEffect(() => {
    const loadTodos = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const fetchedTodos = await response.json();
      const apiTodos = fetchedTodos.map(
        (item: { id: number; title: string; completed: boolean }) => ({
          id: item.id,
          todo: item.title,
          completed: item.completed,
        }),
      );

      setTodos((currentTodos) => {
        const existingIds = new Set(currentTodos.map((todo) => todo.id));
        return [
          ...currentTodos,
          ...apiTodos.filter((todo: todos) => !existingIds.has(todo.id)),
        ];
      });
    };

    loadTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const getValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: Date.now(), todo: value }]);
    setValue("");
  };

  const handleRemove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo,
      ),
    );
  };

  const handleEdit = (id: number) => {
    const newTodo = prompt("Enter the new todo you wish to update here-->");
    if (newTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, todo: newTodo } : todo,
        ),
      );
    }
  };

  return (
    <>
      <TodoForm value={value} onChange={getValue} onClick={handleAdd} />
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <TodoItems
              todoItems={todo}
              onComplete={handleComplete}
              onRemove={handleRemove}
              onEdit={handleEdit}
            />
            {/* <div key={todo.id}>
            {todo.todo}
            {todo.completed && <span>Completed</span>}
            <button onClick={() => handleRemove(todo.id)}>Done</button>
            <button onClick={() => handleComplete(todo.id)}>Completed</button>
            <button onClick={() => handleEdit(todo.id)}>Edit</button>
          </div> */}
          </div>
        ))}
      </div>
    </>
  );
};
export default Todo;
