import AddEditBoard from "./boards/AddEditBoard";
import { FiEdit } from "react-icons/fi";

function EmptyBoard({ type }) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-white dark:bg-black">
      <h3 className="sm:xl mx-3 text-center   dark:text-white md:text-2xl">
        {type === "edit" ? (
          <span className="flex flex-col text-base sm:text-2xl">
            <span className="text-lg font-semibold  sm:text-xl">
              Board is empty
            </span>{" "}
            Create a new column to get started
          </span>
        ) : (
          <span className="flex flex-col text-base sm:text-2xl">
            <span className="text-lg font-semibold  sm:text-xl">
              No boards available.
            </span>{" "}
            Create a new board to get started
          </span>
        )}
      </h3>

      <AddEditBoard
        type={type}
        openBtn={
          <button className="group mt-5 flex items-center gap-1 rounded border border-gray-800 bg-indigo-700 px-2 py-1 text-lg text-white transition-all hover:bg-white hover:text-black sm:px-4 sm:py-3 sm:text-xl">
            <FiEdit /> Create New
          </button>
        }
      />
    </div>
  );
}

export default EmptyBoard;
