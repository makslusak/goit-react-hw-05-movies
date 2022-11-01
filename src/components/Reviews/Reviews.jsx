import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';
import { getReviews } from '../../services/api';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getReviews(movieId);

        setReviews(responce.data.results);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <ul>
      {reviews?.map(review => {
        return (
          <li>
            <p>{review.author}</p>
            <p>{review.content}</p>
            <p>{review.created_at}</p>
          </li>
        );
      })}
    </ul>
  );
};
