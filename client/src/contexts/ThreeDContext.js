import React, { createContext, useState } from 'react';


export const ThreeDContextContextStore = createContext();

const ThreeDContext = (props) => {
  const [threeDSelected, setThreeDSelected] = useState(null);

  const threeDInfo = {
    threeDSelected,
    setThreeDSelected
  };

  return (
    <ThreeDContextContextStore.Provider value={threeDInfo}> 
      {props.children}
    </ThreeDContextContextStore.Provider>
  )
}

export default ThreeDContext;