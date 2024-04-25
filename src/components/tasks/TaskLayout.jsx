import { useState } from "react";
import { setTaskStatus } from "../../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { changePlace, toggleEllipsisMenu } from "../../redux/ellipsisMenuSlice";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import EllipsisMenu from "../EllipsisMenu";
import Subtask from "../Subtask";
import Button from "../Button";

function TaskLayout({
  task,
  subtasks,
  completed,
  taskIndex,
  colIndex,
  columns,
  onCloseModal,
}) {
  const dispatch = useDispatch();
  const col = columns.find((col, i) => i === colIndex);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [status, setStatus] = useState(task?.status);
  const { showEllipsisMenu, place } = useSelector(
    (state) => state.ellipsisMenu,
  );

  const onChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setStatus(e.target.value);
    setNewColIndex(selectedIndex);
    setStatus(columns[selectedIndex].name);
  };

  const onClose = () => {
    dispatch(
      setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      }),
    );
    onCloseModal();
  };

  const onShowEllipsisMenu = () => {
    dispatch(toggleEllipsisMenu());
    dispatch(changePlace("Tasks"));
  };

  return (
    <div className="w-[300px] pt-8 font-medium text-textColor md:w-[400px] ">
      <div className="relative flex w-full items-center justify-between">
        <h1 className=" text-xl">{task?.title}</h1>
        <button onClick={() => onShowEllipsisMenu()} className="rounded-full border border-transparent p-[2px] transition-all hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
        <PiDotsThreeOutlineVertical className="text-xl text-black dark:text-white" />
        </button>
        {showEllipsisMenu && place === "Tasks" && (
          <EllipsisMenu
            title={task.name}
            type="task"
            taskIndex={taskIndex}
            colIndex={colIndex}
          />
        )}
      </div>
      <p className="pt-6 text-sm font-normal">
        {task?.description}
      </p>

      <p className="pt-6  text-gray-600 dark:text-gray-400">
        Subtasks ({completed} of {subtasks?.length})
      </p>

      {/* subtasks section */}

      <div className=" mt-3 space-y-2">
        {subtasks.map((subtask, index) => {
          return (
            <Subtask
              index={index}
              taskIndex={taskIndex}
              colIndex={colIndex}
              key={index}
            />
          );
        })}
      </div>

      {/* Current Status Section */}

      <div className="mt-8 flex flex-col space-y-3">
        <label className="text-sm">Current Status</label>
        <select
          className="select-status input"
          value={status}
          onChange={onChange}
        >
          {columns?.map((col, index) => (
            <option className="status-options" key={index}>
              {col.name}
            </option>
          ))}
        </select>
      </div>

      <Button onClick={() => onClose()} styles="w-full mt-4">
        Save Changes
      </Button>
    </div>
  );
}

export default TaskLayout;
