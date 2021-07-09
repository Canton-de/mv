import React from 'react';
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';
import Movies from '../movies/Movies';
import Loader from '../../img/loader/Loader';

const MainContent = ({ movies, isSearch, windowWidth, handleRate, handleChangePage, isLoading, isFailed }) => {
  const { count, page, elements } = movies;
  const loader = isLoading ? <Loader /> : null;
  const currentPage = (
    <Movies
      isSearch={isSearch}
      movies={elements}
      windowWidth={windowWidth}
      handleRate={handleRate}
      handleChangePage={handleChangePage}
      count={count}
      page={page}
    />
  );

  const content = !isLoading ? currentPage : null;
  const emptySpace = null;
  if (isFailed) {
    return <StopOutlined />;
  }
  return (
    <>
      {emptySpace}
      {content}
      {loader}
    </>
  );
};

MainContent.propTypes = {
  movies: PropTypes.shape({
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        releaseDate: PropTypes.string.isRequired,
      })
    ),
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  }).isRequired,
  windowWidth: PropTypes.number.isRequired,
  handleRate: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  isFailed: PropTypes.bool.isRequired,
  isSearch: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MainContent;
