import React from 'react';
import { Row, Col, Card, Pagination } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import CardDescription from '../card-description/CardDescription';
import './movies.css'
import cutString from "../../helpers/cutString";

const Movies = ({ movies, windowWidth, handleRate, isSearch, page, handleChangePage, count }) => (
  <>
    <Row gutter={[35, 35]}>
      {movies.map((movie) => (
        <Col span={windowWidth > 900 ? 12 : 24} key={movie.id}>
          <Card hoverable className="cardStyle" cover={<img alt="example" className="cover-img" src={movie.imageSrc} />}>
            <CardDescription
              count={count}
              userRate={movie.rating}
              releaseDate={format(new Date(movie.releaseDate || 0), 'MMMM d, yyyy')}
              id={movie.id}
              handleRate={handleRate}
              rate={movie.rate}
              movieTitle={cutString(movie.title, 50)}
              movieDesc={cutString(movie.desc, 160)}
              genreIds={movie.genreIds}
            />
          </Card>
        </Col>
      ))}
    </Row>
    <Pagination
      style={{ textAlign: 'center', marginTop: '20px' }}
      defaultPageSize={20}
      onChange={(curPage) => handleChangePage(curPage, isSearch)}
      current={page}
      total={count}
      showSizeChanger={false}
    />
  </>
);

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      releaseDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  windowWidth: PropTypes.number.isRequired,
  handleRate: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  isSearch: PropTypes.bool.isRequired,
};

export default Movies;
