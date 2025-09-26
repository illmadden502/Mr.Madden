import React from 'react';

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ onClick, isActive, children, icon }) => {
  const baseClasses = "flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200";
  const activeClasses = "bg-emerald-500 text-white shadow-md";
  const inactiveClasses = "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="hidden md:inline">{children}</span>
    </button>
  );
};

export default TabButton;
