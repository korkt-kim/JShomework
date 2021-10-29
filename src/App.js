import component from "./components/core/component.js";
import Clock from './components/Clock.js';
import GeoLocation from './components/Geolocation.js';
import Login from "./components/Login.js";
import Signin from "./components/Signin.js";
import TodoList from "./components/TodoList.js";

export default class App extends component{
    constructor($app){
        super({$app,initialState:{time:new Date(),isLoggedIn:false,username:'',todoList:[]},className:'app'});
        const randomNumber = Math.floor(Math.random()*7 +1);
        $app.style.backgroundImage = `url(../assets/${randomNumber}.png)`;
        this.init();
    }

    mounted(){
        this.mountClock()
        this.mountGeoLocation();
        this.mountLogin();
        this.mountSignin();
        this.mountTodoList();
    }

    mountClock(){
        this.clock = new Clock({$app:this.$target,initialState:this.state,proceedTime:()=>this.proceedTime.call(this.clock)});
    }

    mountLogin(){
        this.login = new Login({$app:this.$target,initialState:this.state,onClickLogin:(username,password)=>this.onLogin.call(this.login,username,password),navigateToSignin:()=>this.navigateToSignin.call(this.login)});
    }
    
    mountSignin(){
        this.signin = new Signin({$app:this.$target,initialState:this.state,onClickSignin:(username,password)=>this.onSignin.call(this.signin,username,password),navigateToLogin:()=>this.navigateToSignin.call(this.signin)});
    }

    mountGeoLocation(){
        this.geoLocation = new GeoLocation({$app:this.$target,initialState:this.state});
    }

    mountTodoList(){
        this.todoList = new TodoList({$app:this.$target,initialState:this.state});
    }

    proceedTime(){
        this.setState({
            ...this.state,
            time:new Date()
        })
    }

    onLogin(username,password){
        const accounts = JSON.parse(window.localStorage.getItem('accounts')) || [];
        const account = accounts.find(account=>account.username ==username)
        if(!account || account.password!=password){
            alert("login failed");
            return;
        }
        this.setState({...this.state,isLoggedIn:true,username});
    }

    onSignin(username,password){
        const accounts = JSON.parse(window.localStorage.getItem('accounts')) || [];
        const account = accounts.find(account=>account.username ==username);
        if(account){
            alert('signin failed');
            return;
        }
        window.localStorage.setItem('accounts',JSON.stringify([...accounts,{username,password}]));
    }

    navigateToSignin(){

    }

    navigateToLogin(){

    }

    onAddTodoList(){
        // const allTodoList = window.localStorage.getItem('todoList') || [];
        // allTodoList.find(todoList=>todoList.account==this.state.username)
    }

    onDeleteTodoList(){

    }

    init(){
        
    }
}