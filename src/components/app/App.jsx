import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Layout, Menu, Input } from 'antd';
import './App.css';
import lodash from 'lodash';
import MovieApi from '../../movie-api/movieApi';
import { GenresProvider } from '../../movie-api/apiContext';
import MainContent from '../main-content/MainContent';
import { getRatingHelper, rateHelper } from '../../rate-helper/rateHelper';

const { Content } = Layout;
const movieApi = new MovieApi();

const App = () => {
  const startMoviesSet = useMemo(() => ({ elements: [], count: 0, page: 1 }), []);
  const [searchMovies, setSearchMovies] = useState(startMoviesSet);
  const [ratedMovies, setRatedMovies] = useState(startMoviesSet);
  const [inputValue, setInputValue] = useState('return');
  const [currentPlace, setCurrentPlace] = useState('search');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);

  function returnMoviesObj(loadedMovies, name, page = 1) {
    if (name === 'movies') {
      const ratingObj = getRatingHelper();
      setSearchMovies({
        elements: loadedMovies.results.map((movie) => {
          let imageSrc = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          if (movie.poster_path === null) {
            imageSrc = 'https://image.tmdb.org/t/p/w500//sH6030EbSzOUTFFZrpnTdSpeNP0.jpg';
          }
          return {
            title: movie.title,
            imageSrc,
            desc: movie.overview,
            rate: movie.vote_average,
            id: movie.id,
            releaseDate: movie.release_date,
            rating: ratingObj[`${movie.id}`],
            genreIds: movie.genre_ids,
          };
        }),
        count: loadedMovies.total_results,
        page,
      });
      setIsloading(false);
    } else {
      
      setRatedMovies({
        elements: loadedMovies.results.map((movie) => {
          let imageSrc = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
          if (movie.poster_path === null) {
            imageSrc = 'https://image.tmdb.org/t/p/w500//sH6030EbSzOUTFFZrpnTdSpeNP0.jpg';
          }
          return {
            title: movie.title,
            imageSrc,
            desc: movie.overview,
            rate: movie.vote_average,
            id: movie.id,
            releaseDate: movie.release_date,
            rating: movie.rating,
            genreIds: movie.genre_ids,
          };
        }),
        count: loadedMovies.total_results,
        page,
      });
      setIsloading(false);
    }
  }

  const setMoviesFunc = useCallback(
    async (title, page = 1) => {
      try {
        setIsloading(true);
        const loadedMovies = await movieApi.getMoviesByQuery(title, page);
        returnMoviesObj(loadedMovies, 'movies', page);
        setError(null);
      } catch (err) {
        setIsloading(false);
        setError(err);
        setSearchMovies(startMoviesSet);
      }
    },
    [startMoviesSet]
  );

  async function setRatedMoviesFunc(page = 1) {
    try {
      setIsloading(true);
      const loadedMovies = await movieApi.getRatedMovies(page);
      returnMoviesObj(loadedMovies, 'ratedMovies', page);
    } catch (err) {
      setIsloading(false);
      setError(err);
      setRatedMovies(startMoviesSet);
    }
  }

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleChangePage = (curPage, isSearch) => {
    if (isSearch) {
      setMoviesFunc(inputValue, curPage);
      return;
    }
    setRatedMoviesFunc(curPage);
  };

  useEffect(() => {
    window.addEventListener('resize', lodash.debounce(handleWindowResize, 100));
  }, []);

  useEffect(() => {
    movieApi
      .createGuestSession()
      .then(() => {
        movieApi.getGenres().then((loadedGenres) => {
          setGenres(loadedGenres);
        });
      })
      .then(() => setMoviesFunc('return'));
  }, [setMoviesFunc]);

  const handleRate = (id, rating) => {
    movieApi.rateMovie(id, rating).then(() => {
      rateHelper(id, rating);
    });
  };

  const onSearch = useCallback(
    (value) => {
      setMoviesFunc(value, 1);
    },
    [setMoviesFunc]
  );

  const onSearchDebounced = useMemo(() => lodash.debounce(onSearch, 500), [onSearch]);

  const inputOnChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    onSearchDebounced(value);
  };

  const handleClick = (click) => {
    setCurrentPlace(click.key);
    if (click.key === 'rated' && currentPlace === 'search') {
      setRatedMoviesFunc(1);
    }
  };

  const isSearch = currentPlace === 'search';

  return (
    <div className="App">
      <Content>
        <div className="site-layout-content">
          <Menu
            style={{ justifyContent: 'center', marginBottom: '20px', border: 'none' }}
            onClick={handleClick}
            selectedKeys={[currentPlace]}
            mode="horizontal"
          >
            <Menu.Item key="search">Search</Menu.Item>
            <Menu.Item key="rated">Rated</Menu.Item>
          </Menu>
          <div>
            
            {isSearch ? <Input value={inputValue} style={{ marginBottom: '20px' }} onChange={inputOnChange} /> : null}
            <GenresProvider value={genres}>
              <MainContent
                isFailed={!!error}
                movies={isSearch ? searchMovies : ratedMovies}
                isSearch={isSearch}
                windowWidth={windowWidth}
                inputOnChange={inputOnChange}
                inputValue={inputValue}
                handleRate={handleRate}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
                onSearch={onSearch}
              />
            </GenresProvider>
            
          </div>
        </div>
      </Content>
    </div>
  );
};

export default App;
