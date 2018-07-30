import React from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';

const RatingModal = ({
  displayModal, 
  closeModal, 
  ratingChanged
}) => (
  <div className="modal" style={(displayModal) ? { display: 'block' } : { display: 'none' }}>
    { displayModal 
      ? (
        <div className="rating-modal-content">
         <div className="rating-modal-wrapper">
         <div className="rating-modal-header">
         <div className="rating header-title">Rate Order</div>
         <div className="close-rating-modal">X Close</div>
       </div>
       <div className="selected-food-wrapper">
         <div className="selected-foods">
           <div className="food-item right-spacer">
             <div className="food-img">
               <img src="" alt="default" />
             </div>
             <div className="food-rating-star">
               <div className="text">Beans</div>
               <ReactStars
                 count={5}
                 onChange={ratingChanged}
                 size={14}
                 color2="#54a61e"
               />
             </div>
             <div className="food-rating-spacer" />
           </div> 
           <div className="food-item">
             <div className="food-img">
               <img src="" alt="default" />
             </div>
             <div className="food-rating-star">
               <div className="text">Cake</div>
               <ReactStars
                 count={5}
                 onChange={ratingChanged}
                 size={14}
                 color2="#54a61e"
               />
             </div>
             <div className="food-rating-spacer" />
           </div>            
         </div>
         <div className="selected-foods">
           <div className="food-item right-spacer">
             <div className="food-img">
               <img src="" alt="default" />
             </div>
             <div className="food-rating-star">
               <div className="text">Beans</div>
               <ReactStars
                 count={5}
                 onChange={ratingChanged}
                 size={14}
                 color2="#54a61e"
               />
             </div>
             <div className="food-rating-spacer" />
           </div> 
           <div className="food-item">
             <div className="food-img">
               <img src="" alt="default" />
             </div>
             <div className="food-rating-star">
               <div className="text">Cake</div>
               <ReactStars
                 count={5}
                 onChange={ratingChanged}
                 size={14}
                 color2="#54a61e"
               />
             </div>
             <div className="food-rating-spacer" />
           </div>            
         </div>
       </div>

       <div className="average-rating">
         <ReactStars
           count={5}
           onChange={ratingChanged}
           size={20}
           color2="#54a61e"
         />
         <div className="text">Average Rating</div>
       </div>
       <div className="comment-area">
         <div className="text">Leave a comment</div>
         <textarea className="comment-textarea"/>
       </div>
       <div className="modal-footer">
         <div className="cta  modal-adj">
           <div className="float-left" />
           <div className="float-right">
             <div className="btn close-modal" onClick={closeModal}>
               Cancel
             </div>
             <div className="submit-comment">
               submit
             </div>
           </div>
         </div>        
       </div>
       <div className="comment-count">105 comments</div>
       
         </div>
         <div className="rating-modal-comment-area">
         <div className="user-comment-area">
           <div><img/></div>
           <div className="user-comment">
              <div className="user-comment-header">louis dante</div>
              <div className="user-comment-text">"This is a commment for andela eats and we are testing it."</div>
           </div>
         </div>
       </div>
        </div>
      )
      : null
    }
  </div>
);


RatingModal.propTypes = {
  displayModal: PropTypes.bool,
  closeModal: PropTypes.func,
  ratingChanged: PropTypes.func,
};

export default RatingModal;
