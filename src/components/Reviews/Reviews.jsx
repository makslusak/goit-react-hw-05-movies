import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';
import { getReviews } from '../../services/api';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getReviews(movieId);

        setReviews(responce.data.results);
      } catch (error) {}
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews?.map(review => {
            return (
              <li className={css.item}>
                <p className={css.author}>{review.author}</p>
                <p>{review.content}</p>
                <p>{review.created_at}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={css.noReview}>
          No one has left a review for this movie yet :({' '}
        </p>
      )}
    </>
  );
};
export default Reviews;
