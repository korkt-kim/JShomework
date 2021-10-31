import component from "./components/core/component.js";
import {historyRouterPush,initialRouter} from './router.js'


export default class App extends component{
    constructor($app){
        super({$app,initialState:{time:'',isLoggedIn:false,username:'',todoList:[],route:'/'},className:'app',tagName:'main'});
        const randomNumber = Math.floor(Math.random()*7 +1);
        this.$target.style.backgroundImage = `url(../assets/${randomNumber}.png)`;

        this.init();
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
        historyRouterPush.call(this,'/signin')
    }

    navigateToLogin(){
        historyRouterPush.call(this,'/login')
    }

    onAddTodoList(){
       
    }

    onDeleteTodoList(){

    }

    init(){
        initialRouter.call(this)
    }
}