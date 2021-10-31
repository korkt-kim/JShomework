import component from "./core/component.js";

export default class Clock extends component{
    constructor({$app,initialState,proceedTime,onClickLogin}){
        super({$app,initialState,className:'clock'});
        this.proceedTime = proceedTime;
        this.onClickLogin = onClickLogin;
    }

    setEvent(){
        setInterval(()=>{
            this.proceedTime()
        },1000)
        this.$target.addEventListener('click',(e)=>{
            if(e.target.closest('.loginBtn')){
                this.onClickLogin();
            }
        })
    }
    
    render(){
        this.$target.innerHTML = `<h1>${this.state.time}</h1> 
        ${this.state.isLoggedIn ? `hi, ${this.state.username}` : `<button class="loginBtn">login</button>`} 
        `
    }
}