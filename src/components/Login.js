import component from "./core/component.js";

export default class Login extends component{
    constructor({$app,initialState,onLogin,navigateToHome}){
        super({$app,initialState,tagName:'div',className:'login'});
        this.onLogin = onLogin;
        this.navigateToHome = navigateToHome;
    }

    setEvent(){
        this.$target.addEventListener('click',(e)=>{
            if(e.target.closest('.loginBtn')){
                e.preventDefault();
                const username = document.querySelector('.usernameInput').value;
                const password = document.querySelector('.passwordInput').value;
                
                if(this.onLogin(username,password)){
                    this.navigateToHome();
                }
            }
        })
    }

    render(){
        if(this.state.isLoggedIn){
            this.$target.innerHTML = `<h1>Login</h1><p>You're Already LoggedIn!</p>`
        }else{
            this.$target.innerHTML=
            `
                <h1>Login</h1>
                <form>
                    <input class="usernameInput" type="text" name="username" placeholder="username"/>
                    <input class="passwordInput" type="text" name="username" placeholder="password"/>
                    <button type="submit" class="loginBtn">Login</button>
                </form>
            `
        }
    }
}