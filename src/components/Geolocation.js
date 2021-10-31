import component from "./core/component.js"

const API_KEY = `c985ad421dde791c0140b88dc7b9fb50`;

export default class Geolocation extends component{
    constructor({$app,initialState}){
        super({$app,initialState,className:'geolocation'});
        
    }
    async onGeoOk(position){
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const weather = await this.getWeather(lat,lng)
        this.$target.innerHTML = `<h1>위도:${lat},경도:${lng},날씨:${weather}</h1>`
    }

    async getWeather(latitude,longitude){
        try{
            const data = await(await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)).json();
            return data.weather[0].main;
        }catch(e){
            return 'clear';
        }
        
    }

    onGeoError(){
        this.$target.innerHTML = `<div>위치를 알 수 없습니다.</div>`
    }

    render(){
        navigator.geolocation.getCurrentPosition((position)=>this.onGeoOk(position),()=>this.onGeoError());
    }
}