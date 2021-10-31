import component from "./components/core/component.js";
import {historyRouterPush} from './router.js'


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

    onLogin=(username,password)=>{
        const accounts = JSON.parse(window.localStorage.getItem('accounts')) || [];
        const account = accounts.find(account=>account.username ==username)
        if(!account || account.password!=password){
            alert("login failed");
            return false;
        }
        const todoList = JSON.parse(window.localStorage.getItem(username)) || [];
        this.setState({...this.state,isLoggedIn:true,username,todoList});
        return true;
    }

    navigateToHome=()=>{
        historyRouterPush('/',this.$target,this.state,this);
    }

    navigateToLogin=()=>{
        historyRouterPush('/login',this.$target,this.state,this)
    }

    addTodoList(content){
        console.log(content);
        if(!this.state.isLoggedIn) {
            alert("login first")
            return;
        }
        this.state.todoList.push(content);
        const todoList = JSON.parse(window.localStorage.getItem(this.state.username)) || [];
        todoList.push(content);
        window.localStorage.setItem(this.state.username,JSON.stringify(todoList))
        this.setState({...this.state})
    }

    removeTodoList=(checkedIndexes)=>{
        if(!this.state.isLoggedIn) {
            alert("login first")
            return;
        }
        this.state.todoList = this.state.todoList.reduce((acc,item,index)=>{
            if(checkedIndexes.some(checkedIndex=>checkedIndex==index)) return acc;
            acc.push(item);
            return acc;
        },[])
        this.setState({...this.state});
    }

    init(){
        // initialRouter.call(this)
    }
}