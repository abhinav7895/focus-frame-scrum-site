// // Reusable Modal  Component Using Compound Component Pattern
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { IoClose } from "react-icons/io5";

const ModalContext = createContext();

function Modal({ children, onClose }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (windowName) => setOpenName(windowName);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const closeRef = useOutsideClick(() => {
    if (name === openName) {
      close();
    }
  }, true);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-[#00000080] backdrop-blur-sm">
      <div
        className=" border border-gray-600 fixed left-[50%] top-[50%] z-50 max-h-[80vh] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-lg bg-white dark:bg-slate-900 p-[20px] "
        ref={closeRef} // Use the ref here
      >
        <button onClick={close} className="absolute right-[10px] transition-all hover:bg-gray-200 rounded-full border dark:border-gray-500 border-gray-700 top-[10px] dark:hover:bg-slate-800 focus:scale-90">
        <IoClose className="text-3xl text-gray-700 dark:text-gray-100" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

