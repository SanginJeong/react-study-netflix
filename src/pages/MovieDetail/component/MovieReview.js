import React, {useState} from 'react'

const MovieReview = ({review}) => {
  const [isExpanded, setIsExpanded] = useState(false); 

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const previewTextLength = 200;
  const reviewContent = isExpanded ? review.content : review.content.substring(0, previewTextLength) + '...';

  return (
    <div className="movie-review">
      <h3>{review.author}</h3>
      <p>{reviewContent}</p>
      <button onClick={toggleReadMore} className="read-more-btn">
        {isExpanded ? '접기' : '더보기'}
      </button>
    </div>
  );
}

export default MovieReview