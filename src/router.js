import Clock from './components/Clock.js';
import GeoLocation from './components/Geolocation.js';
import Login from "./components/Login.js";
import Signin from "./components/Signin.js";
import TodoList from "./components/TodoList.js";


const routes = {
    '/': function(){
        console.log(this)
        new Clock({$app:this.$target,initialState:this.state,proceedTime:this.proceedTime,onClickLogin:this.navigateToLogin.bind(this),onClickSignin:this.navigateToSignin.bind(this)});
        new GeoLocation({$app:this.$target,initialState:this.state})
        new TodoList({$app:this.$target,initialState:this.state});
    },
    '/login': function(){
        new Clock({$app:this.$target,initialState:this.state,proceedTime:this.proceedTime,onClickLogin:this.navigateToLogin.bind(this),onClickSignin:this.navigateToSignin.bind(this)});
        new GeoLocation({$app:this.$target,initialState:this.state})
        new Login({$app:this.$target,initialState:this.state})
    },
    '/signin': function(){
        new Clock({$app:this.$target,initialState:this.state,proceedTime:this.proceedTime,onClickLogin:this.navigateToLogin.bind(this),onClickSignin:this.navigateToSignin.bind(this)});
        new GeoLocation({$app:this.$target,initialState:this.state})
        new Signin({$app:this.$target,initialState:this.state})
    },
};

export function initialRouter(){
    window.history.pushState(this.state, null, window.location.origin + "/");
    routes["/"].call(this);
    window.addEventListener('popstate',(e)=>{
        this.$target.innerHTML = ''
        routes[window.location.pathname].call(this);
    })
}

export function historyRouterPush(pathName) {
    this.$target.innerHTML =''
    window.history.pushState(this.state, pathName, window.location.origin + pathName);
    routes[pathName].call(this)
}
