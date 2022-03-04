document.onreadystatechange=function(){
    if(document.readyState == "complete"){
        document.getElementById("loading").style.display="none";
        console.log("yes")
    }
    else{
            document.getElementById("loading").style.display="block";
        console.log("no");
    }
}

async function getWeather(){
    document.getElementById("day7").style.transform="translate(0, 1050px)"
    document.getElementById("day7").innerHTML="";

    var demo = document.getElementById("demo");
    demo.style.transform="translate(2150px, 0)"
try {
let city = document.getElementById("city").value;
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d07f44f393d328ed6b9bd3de4e36c2f8`
document.querySelector(".gmap_canvas").innerHTML=`<iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=${city}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>`
let response = await fetch(url);
let data = await response.json();
showWeather(data); 

let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d07f44f393d328ed6b9bd3de4e36c2f8`
        let res = await fetch(url2);
        let dat = await res.json();
        let days_data = dat.list;
    show7(days_data, 0);
} 
catch(error){
console.log('error:', error) 
}
}
function showWeather(data){
document.getElementById("weather1").innerHTML="";
let location = document.createElement("h2");
location.innerHTML='<i class="fas fa-map-marker-alt"></i>'+ data.name;

let temp = document.createElement("div");
temp.innerHTML=Math.round(+data.main.temp-273) +"°C";

let desc = document.createElement("h2");
desc.innerHTML=data.weather[0].description;

if(data.weather[0].description=="fog" || data.weather[0].description=="smoke" || data.weather[0].description=="haze"){
    document.querySelector("body").style.backgroundImage="url('https://c1.wallpaperflare.com/preview/880/231/618/tree-mist-fog-cloudy.jpg')"
} else{
   document.querySelector("body").style.backgroundImage="url('https://images.wallpaperscraft.com/image/single/boat_mountains_lake_135258_3840x2400.jpg')"
}

document.getElementById("weather1").append(location, temp, desc);

document.getElementById("weather2").innerHTML="";
  let minTemp = document.createElement("h2")
  minTemp.innerHTML='<i class="min fas fa-thermometer-quarter"></i>'+ " min " + Math.round(+data.main.temp_min-273)+"°C";

  let maxTemp = document.createElement("h2");
  maxTemp.innerHTML='<i class=" max fas fa-thermometer-full"></i>'+ " max " + Math.round(+data.main.temp_max-273)+"°C";

  let wind = document.createElement("h2");
  wind.innerHTML='<i class=" wind fas fa-wind"></i>'+ data.wind.speed;
  
  let cloud = document.createElement("h2");
  cloud.innerHTML='<i class="cloud fas fa-cloud"></i>'+ data.clouds.all;

  let sunrise = document.createElement("h2");
  sunrise.innerHTML='<i class="far fa-sun"></i>'+ data.sys.sunrise;

  let sunset = document.createElement("h2");
  sunset.innerHTML='<i class="fas fa-cloud-sun"></i>'+ data.sys.sunset;

  let pressure = document.createElement("h2");
  pressure.innerHTML='<i class="fas fa-compress-arrows-alt"></i>'+ data.main.pressure;

  document.getElementById("weather2").append(minTemp, maxTemp, wind, cloud, sunrise, sunset, pressure);
}

function show7(data,i){
let weakdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = (new Date()).getDay()+i;
if(day>6){
    day -= 7;
}
if(i<8){
    let div = document.createElement("div");
    let days = document.createElement("h2");
    days.textContent=weakdays[day];

    let weather = document.createElement("h1");
    let wea = data[i].weather[0].main;
    if(wea=="Rain"){
        weather.innerHTML='<i class="Rain fas fa-cloud-showers-heavy"></i>';
    }
    else if(wea == "Snow"){
        weather.innerHTML='<i class="Snow far fa-snowflake"></i>'
    }
    else if(wea == "Clouds"){
        weather.innerHTML='<i class="Cloud fas fa-cloud"></i>'
    }
    else if(wea == "Sunny" || wea == "Clear" ){
        weather.innerHTML='<i class="far fa-sun"></i>';
    }

    let lTemp = document.createElement("h2");
    lTemp.innerHTML='<i class="Ltemp fas fa-temperature-low"></i>' + Math.round(+data[i].main.temp_min-273)+"°C";

    let hTemp = document.createElement("h2");
    hTemp.innerHTML='<i class="Htemp fas fa-temperature-high"></i>' + Math.round(+data[i].main.temp_max-273)+"°C";

    div.append(days, weather, lTemp, hTemp);

    document.getElementById("day7").append(div);
    console.log(data[i])
    show7(data, ++i)
}
}
