import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import { toggleTheme } from "../redux/themeSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";


function ThemeToggle() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="mx-2 flex items-center mt-3 justify-center space-x-2 rounded-lg p-4 py-3">
      <MdLightMode className={`text-xl text-white ${!theme && "text-yellow-600"}`}/>
      <Switch
        checked={theme}
        onChange={handleToggle}
        className={`${
          theme ? "bg-blue" : "bg-gray-300"
        } relative inline-flex h-6 w-11 items-center rounded-full`}>
        <span
          className={`${
            theme ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}></span>
      </Switch>
      <MdDarkMode className={`text-xl text-gray-600 ${theme && "text-gray-100"}`} />
    </div>
  );
}

export default ThemeToggle;
