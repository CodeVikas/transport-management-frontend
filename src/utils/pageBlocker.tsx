import React, { useEffect, useState } from "react";
import PageBlockerImage from "../Assets/Frame 1 (2).svg";

const SmallScreenBlocker = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <div
        style={{
          height: "100vh",
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // padding: "2rem",
          textAlign: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center text-center px-4 py-8">
          <img
            src={PageBlockerImage}
            alt="Page Blocker image"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain"
          />
          <h2 className="text-xl font-semibold mt-6 pt-6">
            Mobile access is not supported.
          </h2>
          <p className="mt-2 text-gray-600">
            Please switch to a desktop or tablet device.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default SmallScreenBlocker;
