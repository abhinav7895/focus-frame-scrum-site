import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../redux/boardsSlice";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

import AddEditBoard from "./boards/AddEditBoard";
function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={`${
          isSideBarOpen
            ? `fixed left-0 top-[42px] z-20 h-screen w-[261px] items-center border-r border-gray-300 bg-white dark:border-gray-700 dark:bg-slate-950`
            : `fixed top-16 h-[48px] w-[36px] 
            transform cursor-pointer border items-center justify-center rounded-r-full 
           bg-violet-300 dark:bg-violet-500 p-0 transition
            duration-300 hover:opacity-80`
        }`}
      >
        <div>
          {/* reWrite modal  */}
          {isSideBarOpen ? (
            <button
              onClick={() => toggleSidebar()}
              className="bg-violet-300 dark:bg-violet-500 hover:opacity-80 absolute right-2 top-4 border  p-1 rounded-full text-lg"
            >
              <SlArrowLeft />
            </button>
          ) : (
            <div className="absolute p-[15px] pl-2 flex  justify-center items-center m-auto" onClick={() => toggleSidebar()}>
              <SlArrowRight className="text-lg" />
            </div> 
          )}
          {isSideBarOpen && (
            <div className="w-full rounded-xl  py-4 pt-16">
              <div className=" dropdown-board  flex h-[70vh] w-full flex-col">
                
                <div className="flex w-full flex-col gap-3 px-3">
                  {boards.map((board, index) => (
                    <button
                      className={`flex cursor-pointer
                       items-center rounded border border-gray-400 bg-indigo-100  px-2 gap-1 py-2 duration-500 ease-in-out dark:bg-slate-800 dark:text-gray-100   ${
                         board.isActive && "bg-indigo-300 dark:bg-violet-700"
                       } `}
                      key={index}
                      onClick={() => {
                        dispatch(setBoardActive({ index }));
                      }}
                    >
                      <GiCardboardBoxClosed className="text-2xl" />
                      <p className="text-lg text-start line-clamp-1">{board.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className=" w-full cursor-pointer   
                    rounded-r-full px-3 duration-500 ease-in-out"
                >
                  <AddEditBoard
                    type="add"
                    openBtn={
                      <button
                        className={`flex w-full cursor-pointer items-center gap-1 rounded border border-gray-400 dark:border-gray-200 bg-green-100  px-5 py-2 duration-500 ease-in-out dark:bg-transparent dark:text-gray-100 `}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
