import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { LuListTodo } from "react-icons/lu";

import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-sky-500",
];

function Column({ colIndex }) {
  const dispatch = useDispatch();
  const [color, setColor] = useState(null);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide  mx-auto sm:mx-5 sm:pt-[40px] min-w-[280px] ">
      <p className=" flex text-lg   items-center  gap-2 ">
       <span>
       <LuListTodo className={`text-2xl text-white p-[2px] rounded  ${color}`} />
       </span>
        {col.name} 
      </p>

      {col.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
