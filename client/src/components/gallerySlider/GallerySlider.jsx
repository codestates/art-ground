import React, { useEffect, useState } from 'react';
import './GallerySlider.css';

const GallerySlider = ({
  btnSlider,
  gallerySelected,
  sliderUp,
  sliderDown,
  handleModalOpen
}) => {

  const [mouseDownClientX, setMouseDownClientX] = useState(null);
  const [mouseUpClientX, setMouseUpClientX] = useState(null);
  const [swiped, setSwiped] = useState(false);

  const onMouseDown = (e) => {
    setMouseDownClientX(e.targetTouches[0].clientX);
  };

  const onMouseDrag = (e) => {
    setMouseUpClientX(e.targetTouches[0].clientX)
    setSwiped(true);
  }

  const onMouseUp = (e) => {
    if(swiped) {
      if (mouseDownClientX - mouseUpClientX > 50) {
        sliderUp();
      }
      if (mouseDownClientX - mouseUpClientX < -50) {
        sliderDown();
      }
    }
    setSwiped(false);
  };


  return(
    <div 
    onTouchStart={onMouseDown}
    onTouchMove={onMouseDrag}
    onTouchEnd={onMouseUp}
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