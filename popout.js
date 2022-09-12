//search API for
var today = new Date().toISOString().slice(0, 10); 
const tvAPI = "https://api.tvmaze.com/schedule?country=US&date="+today     


//date in title htlm
document.getElementById("current__date").innerHTML = today ; 

function fetchTvApi(){
    fetch(tvAPI)
    .then(response =>response.json())
    .then((data) =>showTvInfo(data)) //console.log(data))//
    // .catch(() =>{
    // infoTxt.innerText = "Oups! There is a problem."
   // })
};

let defaultImg = "img/red-matreshka128.png";

function showTvInfo(data){
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
                            <span class="show__seasons">Season : ${season}</span>
                            <span class="show__episode">Episode : ${episode}</span>
                            <span class="show__streamer">Episode name : ${episodeName}</span>
                            <span class="show__network">Channel : ${networkChanel}</span>
                            <img class="show__img" src="${showImage}"> 
                        </div>                          
                </div>
            </a>       
        </div>`
        document.querySelector('.container').insertAdjacentHTML("afterend", showTvInfo)
    }
}; 

fetchTvApi();