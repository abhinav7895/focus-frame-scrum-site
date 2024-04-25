import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../redux/boardsSlice";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import AddEditBoard from "./boards/AddEditBoard";

function HeaderDropDown({ setOpenDropdown }) {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="dropdown absolute bottom-[-100vh] left-0 right-0  top-16  px-6 py-10 "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className="w-full rounded-xl bg-white   py-4  dark:bg-slate-900">
        <div className="dropdown-board flex w-full flex-col gap-2 px-3">
          {boards.map((board, index) => (
            <button
              className={`flex cursor-pointer
                       items-center gap-1 rounded border border-gray-400 bg-indigo-100  px-5 py-2 duration-500 ease-in-out dark:bg-slate-800 dark:text-gray-100   ${
                         board.isActive && "bg-indigo-300 dark:bg-violet-700"
                       } `}
              key={index}
              onClick={() => {
                dispatch(setBoardActive({ index }));
              }}
            >
              <GiCardboardBoxClosed className="text-2xl" />
              <p className="text-lg line-clamp-1 text-start ">{board.name}</p>
            </button>
          ))}

          <div
            className=" w-full cursor-pointer   
                    rounded-r-full mt-6 duration-500 ease-in-out"
          >
            <AddEditBoard
              type="add"
              openBtn={
                <button
                  className={`flex w-full cursor-pointer items-center gap-1 rounded border border-gray-400 bg-green-100 px-5  py-2 duration-500 ease-in-out dark:border-gray-200 dark:bg-transparent dark:text-gray-100 `}
                >
                  <FiEdit className="text-2xl" />
                  <p className="text-lg">Create new</p>
                </button>
              }
            />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
