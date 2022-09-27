import React from "react";

export const useOutsideClick = (callback : any) => {
    const ref = React.useRef<HTMLDivElement>(null);
  
    React.useEffect(() => {
      const handleClick = (event : any) => {
        if (ref.current && !ref.current.contains(event.target) ) { //*event target returns the jsx element that was clicked and checks if the div contains that element, if the div exists
         
          callback();
        }
      };
  
      document.addEventListener('click', handleClick); 
      //*the function is executed when is clicked 
    
      return () => {
        document.removeEventListener('click', handleClick);
        //* this function executes after the div was clicked, meaning that is executed after the event listener for click was called, not everytime when clicked outside
      };

      //* and useEffect to execute all everytime something changed
    }, []);
  
    return ref;
};