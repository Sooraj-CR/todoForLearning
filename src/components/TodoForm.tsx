import type { ChangeEvent } from 'react';

type TodoFormProps = {
    value : string;
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
    onClick : ()=> void;
}

const TodoForm = ({
    value,onChange,onClick
}:TodoFormProps) => {
  return (
    <>
      <input type="text" value={value} onChange={onChange}/>
      <button onClick={onClick}>Add</button>
    </>
  );
};

export default TodoForm;
