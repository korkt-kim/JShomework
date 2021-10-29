import component from "./core/component.js";

export default class Signin extends component{
    constructor({$app,initialState,onClickSignin,navigateToLogin}){
        super({$app,initialState,tagName:'div',className:'signin'});
        this.onClickSignin = onClickSignin;
        this.navigateToLogin = navigateToLogin
    }

    setEvent(){
        this.$target.addEventListener('click',(e)=>{
            if(e.target.closest('.signinBtn')){
                e.preventDefault();
                const username = document.querySelector('.usernameInput').value;
                const password = document.querySelector('.passwordInput').value;
                this.onClickSignin(username,password);
            }
            if(e.target.closest('.loginLink')){
                e.preventDefault();
                this.navigateToLogin();
            }
        })
    }

    render(){
        if(this.state.isLoggedIn){
            this.$target.innerHTML = `<h1>Signin/h1><p>you're already logged in</p>`
        }else{
            this.$target.innerHTML = 
            `
                <h1>Signin</h1>
                <form>
                    <input class="usernameInput" type="text" name="username" placeholder="username"/>
                    <input class="passwordInput" type="password" name="password" placeholder="password"/>
                    <button class="signinBtn"type="submit" >signin</button>
                    <a class="loginLink">already have account</a>
                </form>
            `
        }
    }
}