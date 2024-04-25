import { useSelector } from "react-redux";
import ShowTask from "./tasks/ShowTask";
import { GoGoal } from "react-icons/go";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex }),
    );
  };

  return (
    <ShowTask
      task={task}
      subtasks={subtasks}
      completed={completed}
      taskIndex={taskIndex}
      colIndex={colIndex}
      columns={columns}
      openBtn={
        <div className="group">
          <div
            draggable
            onDragStart={handleOnDrag}
            className=" w-[280px] cursor-pointer rounded-lg dark:bg-slate-900 bg-violet-100 px-3 py-6 border border-gray-500 first:my-5 "
          >
            <p className="text-lg font-medium tracking-wide dark:group-hover:text-violet-300 transition-all text-gray-900 dark:text-gray-100 group-hover:text-violet-500 group-hover:translate-x-1">{task.title}</p>
            <p className="mt-2 flex w-fit items-center gap-1 rounded border border-gray-500 px-1 text-base font-light dark:text-gray-300 text-gray-600 group-hover:translate-x-1 transition-all">
              <span>
                <GoGoal className="group-hover:text-green-500 transition-all" />
              </span>{" "}
              {completed} of {subtasks.length} tasks completed
            </p>
          </div>
        </div>
      }
    />
  );
}

export default Task;
