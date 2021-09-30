import React, { useCallback, useEffect, useState } from 'react';
import ThreeDDetail from '../../components/3dDetail/ThreeDDetail';
import ThreeDModal from '../../components/modals/ThreeDModal';


const ThreeDGallery = (props) => {

  const [modalOpen, setModalOpen] = useState(true);
  
  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
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
      <ThreeDDetail modal={modalOpen}/>
      {modalOpen?
      <ThreeDModal closeModal={closeModal}/>
      : null}
    </>
  );

}

export default ThreeDGallery;