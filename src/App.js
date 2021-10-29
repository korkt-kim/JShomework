import component from "./components/core/component.js";
import Clock from './components/Clock.js';
import GeoLocation from './components/Geolocation.js';
import Login from "./components/Login.js";
import Signin from "./components/Signin.js";
import TodoList from "./components/TodoList.js";

export default class App extends component{
    constructor($app){
        super({$app,initialState:{time:'',isLoggedIn:false,username:'',todoList:[],route:'/'},className:'app'});
        const randomNumber = Math.floor(Math.random()*7 +1);
        $app.style.backgroundImage = `url(../assets/${randomNumber}.png)`;
        this.init();
        window.history.pushState({...this.state},null,'/');
    }

    mounted(){
        this.$target.innerHTML=''
        this.mountClock()
        this.mountGeoLocation();
        switch (this.state.route){
            case '/login':
                console.log("asdf")
                this.mountLogin();
                break;
            case '/signin':
                this.mountSignin();
                break;
            default :
                this.mountTodoList();
                break;
        }
        
    }

    mountClock(){
        this.clock = new Clock({$app:this.$target,initialState:this.state,proceedTime:()=>this.proceedTime.call(this.clock),onClickLogin:this.navigateToLogin.bind(this),onClickSignin:this.navigateToSignin.bind(this)});
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
        window.history.pushState({isLoggedIn:false,username:'',route:'/signin'},null,'/signin');
        this.setState({...this.state,isLoggedIn:false,username:'',route:'/signin'})
        this.mounted()
    }

    navigateToLogin(){
        window.history.pushState({isLoggedIn:false,username:'',route:'/login'},null,'/login');
        this.setState({...this.state,isLoggedIn:false,username:'',route:'/login'})
        this.mounted()
    }

    onAddTodoList(){
        // const allTodoList = window.localStorage.getItem('todoList') || [];
        // allTodoList.find(todoList=>todoList.account==this.state.username)
    }

    onDeleteTodoList(){

    }

    init(){
        window.addEventListener('popstate',(e)=>{
            console.log(e);
            this.setState({...this.state,route:e.state.route})
            this.mounted();
        })
    }
}