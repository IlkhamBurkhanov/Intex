import React from "react";
import Edit from "../../Assets/Images/TableImgs/edit.svg";
import Delete from "../../Assets/Images/TableImgs/trash.svg";

export const Modal = ({ isVisible, onClose, children, className, glava }) => {
  if (!isVisible) return null;

  const handleClick = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      onClick={handleClick}
      className={`fixed inset-0 bg-modalBg bg-opacity-40 flex justify-center items-center z-50 ${glava}`}
    >
      <div className={`bg-white p-4 md:p-6 rounded-lg mx-3 md:mx-4 ${className}`}>
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default function CrudModal() {
  return (
    <div
      id="oram"
      className={`absolute grid left-[10%] top-0 bottom-0 grid-cols-1 text-start border bg-white p-1 space-y-1 rounded-[5px] shadow-[0px_12px_23px_rgba(150, 150, 150, 0.1)]`}
    >
      <button className="flex items-center text-xs">
        <img src={Edit} alt="" width={16} height={17} />
        Изменить
      </button>
      <button className="flex items-center text-xs">
        <img src={Delete} alt="" width={16} height={17} />
        Удалить
      </button>
    </div>
  );
}
