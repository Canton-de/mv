import React from 'react';
import PropTypes from 'prop-types';
import { Button, Rate } from 'antd';
import { GenresConsumer } from '../../movie-api/apiContext';

const movieTitleStyle = {
  fontSize: '10px',
  lineHeight: '14px',
  color: 'black',
  textTransform: 'capitalize',
  marginBotton: '7px',
  paddingRight: '30px',
};
const movieGenreStyle = {
  height: '12px',
  lineHeight: '10px',
  fontSize: '8px',
  color: 'rgba(0, 0, 0, 0.6)',
  padding: '3px',
  textTransform: 'capitalize',
  background: '#FAFAFA',
  marginRight: '8px',
};
const movieDescStyle = {
  color: 'black',
  overflow: 'hidden',
  lineHeight: '9px',
};

const rateStyle = {
  position: 'absolute',
  bottom: '5px',
  right: '5px',
  width: '100%',
  textAlign: 'center',
};

const CardDescription = ({ movieTitle, genreIds, movieDesc, rate, handleRate, id, userRate, releaseDate }) => {
  let color;
  if (rate < 4) color = '#E90000';
  else if (rate < 6) color = '#E97E00';
  else if (rate < 8) color = '#E9D100';
  else color = '#66E900';
  const round = {
    position: 'absolute',
    top: '5px',
    right: '10px',
    borderRadius: '50%',
    border: `2px solid ${color}`,
    color: 'black',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <GenresConsumer>
      {(movieGenres) => {
        const genres = movieGenres.filter((genre) => genreIds.some((gn) => gn === genre.id));
        return (
          <>
            <div style={movieTitleStyle}>{`${movieTitle}  `}</div>
            <div style={{ color: 'rgb(130, 126, 126)' }}>{releaseDate}</div>
            {genres.map((genre) => (
              <Button key={genre.id} style={movieGenreStyle} href="#" size="small" type="default">
                {genre.name}
              </Button>
            ))}
            <div id="movie-desc" style={movieDescStyle}>
              {movieDesc}
            </div>

            <div style={round}>{rate}</div>
            <Rate
              defaultValue={userRate}
              style={rateStyle}
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
