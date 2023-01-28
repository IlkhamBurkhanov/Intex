import React from "react";

function DropDown({
  children,
  dropName,
  imgAlt,
  wDrop,
  hdrop,
  downClick,
  imgURL,
  rotateDelete,
}) {
  return (
    <div>
      <div
        className="flex  cursor-pointer items-center justify-between py-6"
        onClick={downClick}
      >
        <h2 className="font-bold text-ruUzUsColors text-lg">{dropName}</h2>
        <img
          className={rotateDelete}
          src={imgURL}
          alt={imgAlt}
          width={wDrop}
          height={hdrop}
        />
      </div>
      {children}
    </div>
  );
}

export default DropDown;
