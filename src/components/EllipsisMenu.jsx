import AddEditBoard from "./boards/AddEditBoard";
import ConfirmDelete from "./confirmDelete/ConfirmDelete";
import AddEditTask from "./tasks/AddEditTask";

function EllipsisMenu({ type, title, taskIndex, colIndex }) {
  return (
    <div
      className={`absolute
      ${type === "Boards" ? "right-0 top-12" : "right-0 top-10"}`}
    >
      <div className="flex items-center justify-end">
        <div
          className=" z-50 h-auto w-40 rounded-lg bg-white border border-gray-500 dark:bg-black
         px-4 py-3 font-medium  shadow shadow-[#364e7e1a]"
        >
          {type === "Boards" && (
            <AddEditBoard
              type={"edit"}
              openBtn={<p className="cursor-pointer border-b dark:border-b-gray-500 pb-2 text-gray-800 dark:text-white">Edit {type}</p>}
            />
          )}

          {type === "task" && (
            <AddEditTask
              type="edit"
              title={title}
              taskIndex={taskIndex}
              colIndex={colIndex}
              openBtn={<p className="cursor-pointer text-gray-800 dark:text-white ">Edit {type}</p>}
            />
          )}

          {/* Confirm On Delete  */}
          <ConfirmDelete
            title={title}
            taskIndex={taskIndex}
            colIndex={colIndex}
            type={type}
            openBtn={
              <p className="cursor-pointer text-red-500 pt-2">Delete {type}</p>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default EllipsisMenu;
