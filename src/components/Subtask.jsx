import { useDispatch, useSelector } from "react-redux";
import { setSubtaskCompleted } from "../redux/boardsSlice";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(setSubtaskCompleted({ index, taskIndex, colIndex }));
  };

  return (
    <div
      className=" relative flex  w-full
     items-center justify-start gap-4 rounded-md p-3 border bg-green-100 dark:bg-transparent select-none" 
    >
      <input
        className=" h-4 w-4  cursor-pointer accent-blue"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={subtask.title}
      />
      <label htmlFor={subtask.title} className={` transition-all ${checked && "line-through opacity-80 "}`}>
        {subtask.title}
      </label>
    </div>
  );
}

export default Subtask;
