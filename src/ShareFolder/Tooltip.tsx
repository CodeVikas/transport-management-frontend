import React, { useState } from "react";

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
    className="relative inline-flex items-center z-20"
    onMouseEnter={showTooltip}
    onMouseLeave={hideTooltip}
  >
    {children}
    {isVisible && (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 flex items-center whitespace-nowrap">
        <div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
          {content}
        </div>
      </div>
    )}
  </div>
  );
};

export default Tooltip;
