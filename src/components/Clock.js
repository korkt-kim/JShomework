import component from "./core/component.js";

export default class Clock extends component{
    constructor({$app,initialState,proceedTime}){
        super({$app,initialState,className:'clock'});
        this.proceedTime = proceedTime;
    }

    setEvent(){
        setInterval(()=>{
            this.proceedTime()
        },1000)
    }
    
    render(){
        this.$target.innerHTML = `<h1>${this.state.time}</h1>`;  
        this.$target.style.backgroundColor="#EC87E4"
    }
}