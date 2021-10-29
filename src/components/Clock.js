import component from "./core/component.js";

export default class Clock extends component{
    constructor({$app,initialState,proceedTime,onClickLogin,onClickSignin}){
        super({$app,initialState,className:'clock'});
        this.proceedTime = proceedTime;
        this.onClickLogin = onClickLogin;
        this.onClickSignin = onClickSignin;
    }

    setEvent(){
        setInterval(()=>{
            this.proceedTime()
        },1000)
        this.$target.addEventListener('click',(e)=>{
            if(e.target.closest('.loginBtn')){
                this.onClickLogin();
            }
            if(e.target.closest('.signinBtn')){
                this.onClickSignin();
            }
        })
    }
    
    render(){
        this.$target.innerHTML = `<h1>${this.state.time}</h1> <button class="loginBtn">login</button> <button class="signinBtn">signin</button>`;  
        this.$target.style.backgroundColor="#EC87E4"
    }
}