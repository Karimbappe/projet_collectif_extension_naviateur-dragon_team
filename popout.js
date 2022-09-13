// creat date for title display
const dateElement = document.querySelector(".date");

function formatDate(date) {
    const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return `${DAYS[date.getDay()]}, ${
        MONTHS[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
    const now = new Date();
    dateElement.textContent = formatDate(now);
});

//parameter time values

const todayApi = new Date().toISOString().slice(0, 10); 

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowApi = tomorrow.toISOString().slice(0,10);

const yesterday= new Date()
yesterday.setDate(yesterday.getDate() -1);
const yesterdayApi = yesterday.toISOString().slice(0,10);
console.log(yesterdayApi);
console.log(tomorrowApi)

//search API for
const tvAPI = "https://api.tvmaze.com/schedule?country=US&date=" 
function fetchTvApi(day){
    fetch(tvAPI+day)
    .then(response =>response.json())
    .then((data) =>showTvInfo(data)) //console.log(data))//
    // .catch(() =>{
    // infoTxt.innerText = "Oups! There is a problem."
   // })
};


let defaultImg = "img/red-matreshka128.png";

function showTvInfo(data){
    document.querySelector('.container').innerHTML=" " 
    var tvInfoString = ""
    for(i=0; i<data.length; i++) {
        let title = data[i].show.name;
        let season = data[i].season;
        let episode = data[i].number;
        let episodeName = data[i].name;
        let showWebPage= data[i].show.officialSite;
        let networkChanel = "No network known";
        if(data[i].show.network!== null){
            networkChanel = data[i].show.network.name;
        };
        let showImage = defaultImg;
        if (data[i].show.image !== null) {
            showImage = data[i].show.image.medium ;
        };
        //showDiv(title, season, episode, episodeName, showImage)
        let showTvInfo =`
        <div class="show__container bd-grid">
            <a href="${showWebPage}" target="_blank" class="show__content">
                <div class="show__data bd-grid">
                    <h3 class="show__title">${title}</h3>
                        <div class="show__information bd-grid">
                            <img class="show__img" src="${showImage}"> 
                            <div class="show__text__info">    
                                <span class="show__season"><strong>Season :</strong> ${season}</span>
                                <span class="show__episode"><strong>Episode :</strong> ${episode}</span>
                                <span class="show__streamer"><strong>Episode name :</strong> ${episodeName}</span>
                                <span class="show__network"><strong>Channel :</strong> ${networkChanel}</span>
                            </div>  
                        </div>                          
                </div>
            </a>       
        </div>`
        tvInfoString += showTvInfo
        //document.querySelector('.container').insertAdjacentHTML("afterend", showTvInfo)
    }
    document.querySelector('.container').innerHTML += tvInfoString
}; 

fetchTvApi(todayApi);