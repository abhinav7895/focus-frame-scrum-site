import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import AddEditBoard from "./boards/AddEditBoard";
import { MdAddTask } from "react-icons/md";


function Home() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div
      className={`
         gap-6 overflow-auto pt-16 sm:mt-0 pb-4 dark:bg-black bg-white
        ${
          windowSize[0] >= 768 && isSideBarOpen
            ? `ml-[261px] flex flex-col sm:flex-row h-screen`
            : `flex h-screen flex-col sm:flex-row  gap-2 sm:gap-6`
        }`}
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns Section */}

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}

          <AddEditBoard
            type="edit"
            openBtn={
              <div
                className="mx-5 mb-2 sm:mt-[135px] 
              min-w-[280px] cursor-pointer 
              justify-center rounded-lg py-10 text-2xl
                font-semibold transition duration-300
                scrollbar-hide flex items-center gap-1 border bg-green-200 dark:bg-teal-600 dark:hover:text-teal-600 dark:hover:bg-white hover:text-teal-600 hover:bg-white"
              >
                Add Column <MdAddTask className="text-3xl" />
              </div>
            }
          />
        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
    </div>
  );
}

export default Home;
