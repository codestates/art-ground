import React from 'react';
import './GallerySlider.css';

const GallerySlider = ({
  btnSlider,
  gallerySelected,
  sliderUp,
  sliderDown,
  handleModalOpen
}) => {
  return(
    <div className='outer'>
        <div className={`sliderOuter${btnSlider}`}>

          {gallerySelected.images.map(el =>
              <div className='sliderWrap'>
                <img className='slider' src="../../../images/sliderBackground.png" alt='slider' />
                <img className='sliderPic' src={el.image_urls} alt='sliderIn' onClick={() => handleModalOpen(el)} />
              </div>
          )}
        </div>
        <span className='leftArrow' onClick={sliderDown}><i class="fas fa-chevron-left"></i></span>
        <span className='rightArrow' onClick={sliderUp}><i class="fas fa-chevron-right"></i></span>
      </div>
  )

}

export default GallerySlider;