const getUserIdFromCookie = () => {
    const { cookie } = document;
    const parsed = cookie.split('; ');
    const obj = Object.fromEntries(parsed.map((parse) => parse.split('=')));
    return obj.userId
  }
  export default getUserIdFromCookie