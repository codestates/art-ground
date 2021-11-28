import React, { useCallback, useContext, useEffect, useState } from 'react';
import ThreeDDetail from '../../components/3dDetail/ThreeDDetail';
import ThreeDModal from '../../components/modals/ThreeDModal';
import { ThreeDContextContextStore } from '../../contexts/ThreeDContext';


const ThreeDGallery = () => {

  const [modalOpen, setModalOpen] = useState(true);
  const threeDInfo = useContext(ThreeDContextContextStore);
  const threeDSelected = threeDInfo.threeDSelected;
  
  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
    //console.log(threeDSelected);
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  }

  return ( 
    <> 
      <ThreeDDetail 
      threeDSelected={threeDSelected} 
      modal={modalOpen}
      />
      {modalOpen?
      <ThreeDModal 
      threeDSelected={threeDSelected}
      closeModal={closeModal}/>
      : null}
    </>
  );

}

export default ThreeDGallery;