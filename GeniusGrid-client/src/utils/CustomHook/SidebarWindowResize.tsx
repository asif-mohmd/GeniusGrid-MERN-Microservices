import { useState, useEffect } from "react";

const useWindowResize = (defaultOpenState:any) => {
  const [open, setOpen] = useState(defaultOpenState);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    // Initialize the state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [open, setOpen];
};

export default useWindowResize;
