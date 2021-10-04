import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import ThreeDDetail from '../../components/3dDetail/ThreeDDetail';
import ThreeDModal from '../../components/modals/ThreeDModal';


const ThreeDGallery = ({threeDSelected, location}) => {

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
    console.log(Number(location.pathname.substring(11)))
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <> 
      <ThreeDDetail 
      threeDSelected={Number(location.pathname.substring(11))} 
      modal={modalOpen}
      />
      {modalOpen?
      <ThreeDModal closeModal={closeModal}/>
      : null}
    </>
  );

}

export default withRouter(ThreeDGallery);