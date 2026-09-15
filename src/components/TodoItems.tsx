type Todo = {
  id: number;
  todo: string;
  completed?: boolean;
};

type TodoItems = {
  todoItems: Todo;
  onEdit: (id: number) => void;
  onComplete: (id: number) => void;
  onRemove: (id: number) => void;
};

const TodoItems = ({ todoItems, onEdit, onComplete, onRemove }: TodoItems) => {
  return (
    <div>
      {todoItems.todo}
      {todoItems.completed && <span>Completed</span>}
      <button onClick={() => onEdit(todoItems.id)}>Edit</button>
      <button onClick={() => onComplete(todoItems.id)}>Completed</button>
      <button onClick={() => onRemove(todoItems.id)}>Remove</button>
    </div>
  );
};

export default TodoItems;
