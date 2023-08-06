import React from "react";

const IconButton = ({ onClick, icon, className }) => {
  const defaultClass = 'rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition';
  const combinedClass = className ? `${defaultClass} ${className}` : defaultClass;

  return (
    <button
      onClick={onClick}
      className={combinedClass}
    >
      {icon}
    </button>
   );
}

export default IconButton;