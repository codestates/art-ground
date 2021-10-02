import React, { useEffect, useRef, useState } from 'react';
import './GallerySlider.css';

const GallerySlider = ({
  btnSlider,
  gallerySelected,
  sliderUp,
  sliderDown,
  handleModalOpen
}) => {

  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  //const [cursorOn, setCursorOn] = useState(false);

  const onMouseDown = (e) => {
    e.preventDefault();
    setMouseDownClientX(e.pageX); 
    //setCursorOn(true);
  };
  const onMouseUp = (e) => {
    setMouseUpClientX(e.pageX);
    //setCursorOn(false);
  };

  useEffect(() => {
    const dragSpace = Math.abs(mouseDownClientX - mouseUpClientX); //두 좌표의 차이의 절대값
    if (mouseDownClientX !== 0) {
      if (mouseUpClientX < mouseDownClientX && dragSpace > 100) {
        sliderUp();
      } else if (mouseUpClientX > mouseDownClientX && dragSpace > 100) {
        sliderDown();
      }
    }
  }, [mouseUpClientX]);

  return(
    <div className='outer'>
      <div 
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      //cursorOn={cursorOn}
      className={`sliderOuter${btnSlider}`}
      >
        {gallerySelected.images.map(el =>
          <div key={el.id} className='sliderWrap'>
            <img className='slider' src="../../../images/sliderBackground.png" alt='slider' />
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