const rateHelper = (id,rating) => {
    const lSObj = localStorage.getItem('ratingObj');
    if(lSObj){
        const ratingObj = JSON.parse(lSObj)
        localStorage.setItem('ratingObj',JSON.stringify({...ratingObj,[`${id}`]:rating})) 
        return
    }
    localStorage.setItem('ratingObj', JSON.stringify({ [`${id}`]: rating })); 
}

const getRatingHelper = () => {
    const lSObj = localStorage.getItem('ratingObj');
    if (!lSObj) return {};
    return JSON.parse(lSObj)
}
export {rateHelper,getRatingHelper}