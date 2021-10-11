import React, { useState } from 'react';
import './GallerySlider.css';

const GallerySlider = ({
  btnSlider,
  gallerySelected,
  sliderUp,
  sliderDown,
  handleModalOpen
}) => {

  const [touchDownX, setTouchDownX] = useState(null);
  const [touchUpX, setTouchUpX] = useState(null);
  const [swiped, setSwiped] = useState(false);

  const onTouchDown = (e) => {
    setTouchDownX(e.targetTouches[0].clientX);
  };

  const onTouchDrag = (e) => {
    setTouchUpX(e.targetTouches[0].clientX)
    setSwiped(true);
  }

  const onTouchUp = () => {
    if(swiped) {
      if (touchDownX - touchUpX > 50) {
        sliderUp();
      }
      if (touchDownX - touchUpX < -50) {
        sliderDown();
      }
    }
    setSwiped(false);
  };


  return(
    <div 
    onTouchStart={onTouchDown}
    onTouchMove={onTouchDrag}
    onTouchEnd={onTouchUp}
    className='outer'>
      <div className={`sliderOuter${btnSlider}`}>
        {gallerySelected.images.map(el =>
          <div key={el.id} 
          className='sliderWrap'>
            <img className='sliderBackground' src="../../../images/sliderBackground.png" alt='slider' />
            <img className='sliderPic' src={el.image_urls} alt='sliderIn' onClick={() => handleModalOpen(el)} />
          </div>
        )}
      </div>
      <span className='leftArrow' onClick={sliderDown}><i className="fas fa-chevron-left"></i></span>
      <span className='rightArrow' onClick={sliderUp}><i className="fas fa-chevron-right"></i></span>
    </div>
  )

}

export default GallerySlider;