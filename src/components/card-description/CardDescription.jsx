import React from 'react';
import PropTypes from 'prop-types';
import { Button, Rate } from 'antd';
import { GenresConsumer } from '../../movie-api/apiContext';
import './card-description.css'


const CardDescription = ({ movieTitle, genreIds, movieDesc, rate, handleRate, id, userRate, releaseDate }) => {
  let color;
  if (rate < 4) color = '#E90000';
  else if (rate < 6) color = '#E97E00';
  else if (rate < 8) color = '#E9D100';
  else color = '#66E900';
  return (
    <GenresConsumer>
      {(movieGenres) => {
        const genres = movieGenres.filter((genre) => genreIds.some((gn) => gn === genre.id));
        return (
          <>
            <div className="movie-title">{`${movieTitle}  `}</div>
            <div className="movie-date">{releaseDate}</div>
            {genres.map((genre) => (
              <Button key={genre.id} className="movie-genre" href="#" size="small" type="default">
                {genre.name}
              </Button>
            ))}
            <div className="movie-desc">
              {movieDesc}
            </div>
            <div className="round" style={{border: `2px solid ${color}`}}>{rate}</div>
            <Rate
              defaultValue={userRate}
              className="rate"
              onChange={(rating) => {
                handleRate(id, rating);
              }}
              count="10"
            />
          </>
        );
      }}
    </GenresConsumer>
  );
};

CardDescription.defaultProps = {
  userRate: 0,
};

CardDescription.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieDesc: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  releaseDate: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleRate: PropTypes.func.isRequired,
  userRate: PropTypes.number,
  genreIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default CardDescription;
