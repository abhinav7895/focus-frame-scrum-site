import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEllipsisMenu, changePlace } from "../redux/ellipsisMenuSlice";
import { SiOpenlayers } from "react-icons/si";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import HeaderDropDown from "./HeaderDropDown";
import EllipsisMenu from "./EllipsisMenu";
import AddEditTask from "./tasks/AddEditTask";
import { RiFocus2Fill } from "react-icons/ri";

function Header() {
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { showEllipsisMenu, place } = useSelector(
    (state) => state.ellipsisMenu,
  );

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
  };

  const onShowEllipsisMenu = () => {
    dispatch(toggleEllipsisMenu());
    dispatch(changePlace("Boards"));
  };

  return (
    <div className="fixed left-0 right-0 z-50 w-full border-b border-gray-300 dark:border-gray-700 bg-white p-2 px-4 dark:bg-slate-950">
      <header className="mx-auto gap-1 flex max-w-screen-xl select-none items-center justify-between">
        {/* Left Side  */}
        <div className="flex items-center space-x-2">
          <SiOpenlayers className="text-2xl text-gray-700 dark:text-gray-100" />
          <h3 className="hidden font-sans font-bold text-gray-700 dark:text-gray-100 md:inline-block md:text-xl ">
            FocusFrame
          </h3>
          <div className="flex items-center">
            <h3 onClick={onDropdownClick} className="flex  min-w-[200px] select-none items-center gap-1 truncate rounded border line-clamp-1 border-gray-400 px-1 font-sans font-normal text-gray-700 dark:border-slate-600 dark:text-gray-100 md:ml-20">
              <RiFocus2Fill className="animate-pulse text-green-500 flex-grow" />{" "}
              {board.name}
            </h3>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center space-x-4 md:space-x-6">
          <AddEditTask
            type="add"
            openBtn={
              <span className="group flex items-center rounded border border-gray-800 bg-indigo-700 px-2 py-[3px] sm:py-0  text-white transition-all hover:bg-white hover:text-black cursor-pointer">
                <span className="flex  items-center gap-[2px]">
                  <FiEdit className="text-lg group-hover:text-indigo-700 " /> 
                </span>
                <span className="hidden sm:block">Add</span>
              </span>
            }
          />

          <div className="relative">
            <button
              onClick={() => {
                setOpenDropdown(false);
                onShowEllipsisMenu();
              }}
              className="rounded-full border border-transparent flex items-center transition-all hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <PiDotsThreeOutlineVertical className="text-xl text-black dark:text-white" />
            </button>
            {showEllipsisMenu && place === "Boards" && (
              <EllipsisMenu type="Boards" title={board?.name} />
            )}
          </div>
        </div>

        {openDropdown && <HeaderDropDown setOpenDropdown={setOpenDropdown} />}
      </header>
    </div>
  );
}

export default Header;
