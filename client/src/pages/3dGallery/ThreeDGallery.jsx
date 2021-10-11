import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import ThreeDDetail from '../../components/3dDetail/ThreeDDetail';
import ThreeDModal from '../../components/modals/ThreeDModal';


const ThreeDGallery = ({ threeDSelected, location }) => {

  const [modalOpen, setModalOpen] = useState(true);
  //const [exhibitionId, setexhibitionId] = useState(Number(location.pathname.substring(11)));
  
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

export default withRouter(ThreeDGallery);