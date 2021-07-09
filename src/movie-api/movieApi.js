export default class MovieApi {
  apiKey = 'f03061d57b89ba996b6ac905509f9c64';

  baseUrl = 'https://api.themoviedb.org/3/';

  async getMoviesByQuery(query, page = 1) {
    
    const res = await fetch(`${this.baseUrl}search/movie?query=${query}&api_key=${this.apiKey}&page=${page}`);
    if (res.ok) {
      const jsonRes = res.json();
      return jsonRes;
    }
    throw new Error('server error');
  }

  getUserIdFromCookie(){
    const { cookie } = document;
    const parsed = cookie.split('; ');
    const obj = Object.fromEntries(parsed.map((parse) => parse.split('=')));
    return obj.userId
  }

  async createGuestSession() {
    const {cookie} = document
    if(cookie.indexOf('userId=')!==-1) return;
    const rrr = await fetch(`${this.baseUrl}authentication/guest_session/new?api_key=${this.apiKey}`);
    const res = await rrr.json();
    const sessionId = res.guest_session_id;
    document.cookie=`userId=${sessionId}; max-age=72000`
  }

  async rateMovie(movieId,rate) {
    const userId = this.getUserIdFromCookie()
    const stringified = JSON.stringify({'value': rate})
    const sended = await fetch(
      `${this.baseUrl}movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${userId}`,
      {
        body: stringified,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return sended
  }

  async getRatedMovies(page){
    const userId = this.getUserIdFromCookie();
    const rrr = await fetch(`${this.baseUrl}guest_session/${userId}/rated/movies?api_key=${this.apiKey}&page=${page}`);
    const res = await rrr.json();
    return res;
  }

  async getGenres(){

    const response = await fetch(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`);
    const genres = await response.json()
    return genres.genres
  }
}