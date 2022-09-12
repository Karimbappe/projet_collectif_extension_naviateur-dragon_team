//search API for
//const ApiKey = P2-Qci4nbi8mozK9fx8kwS3gbaYHhALm
var today = new Date().toISOString().slice(0, 10)
const tvAPI = "https://api.tvmaze.com/schedule/web?date="+today+"&country=US";

function fetchTvApi(){
    fetch(tvAPI)
    .then(response => response.json())
    .then((data) => showTvInfo(data)) //console.log(data))
    // .catch(() =>{
    //     infoTxt.innerText = "Oups! There is a problem."
    //     })
};


function showTvInfo(data){
    for(i=0; i<data.length; i++) {
    let title = data[i]._embedded.show.name;
    let season = data[i].season;
    let episode = data[i].number;
    let episodeName = data[i].name;
    let showImage = data[i]._embedded.show.image.medium;
    

    //showDiv(title, season, episode, episodeName, showImage)
    let showTvInfo =`
    <div class="show__container bd-grid">
    <div class="show__content">
                    <div class="show__data bd-grid">
                        <h3 class="show__title">${title}</h3>
                        <span class="show__seasons">${season}</span>
                        <span class="show__episode">${episode}</span>
                        <span class="show__streamer">${episodeName}</span>
                        <img src="${showImage}">
                    </div>
    </div>`
    document.querySelector('.container').insertAdjacentHTML("afterend", showTvInfo)
    }
};

// function showDiv(){  
// };

fetchTvApi();