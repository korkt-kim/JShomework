import Clock from './components/Clock.js';
import GeoLocation from './components/Geolocation.js';
import Login from "./components/Login.js";
import TodoList from "./components/TodoList.js";


const routes = {
    '/': function(target,state,params){
        const {proceedTime,addTodoList,removeTodoList,navigateToLogin:onClickLogin} = params;
        new Clock({$app:target,initialState:state,proceedTime,onClickLogin});
        new GeoLocation({$app:target,initialState:state})
        new TodoList({$app:target,initialState:state,onClickAddBtn:addTodoList,onClickRemoveBtn:removeTodoList});
    },
    '/login': function(target,state,params){
        const {proceedTime,onLogin,navigateToHome} = params;
        new Clock({$app:target,initialState:state,proceedTime});
        new GeoLocation({$app:target,initialState:state,})
        new Login({$app:target,initialState:state,onLogin,navigateToHome})
    },
};

export function initialRouter(target,nextState,params){
    window.history.pushState({}, null, window.location.origin + "/");
    routes["/"](target,nextState,params);
    window.addEventListener('popstate',(e)=>{
        target.innerHTML = ''
        routes[window.location.pathname](target,e.state,params);
    })
}

export function historyRouterPush(pathName,target,nextState,params) {
    target.innerHTML  =''
    window.history.pushState(nextState, null, window.location.origin + pathName);
    routes[pathName](target,nextState,params)
}
