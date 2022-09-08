//search API for
//const ApiKey = P2-Qci4nbi8mozK9fx8kwS3gbaYHhALm
var today = new Date().toISOString().slice(0, 10)
const tvAPI = "https://api.tvmaze.com/schedule/web?date="+today+"&country=US";


console.log(today);


function fetchTvApi(){
    fetch(tvAPI)
    .then(response => response.json())
    .then((data) => console.log(data));
};

fetchTvApi();

