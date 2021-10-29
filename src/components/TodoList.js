import component from './core/component.js'

export default class TodoList extends component{
    constructor({$app,initialState}){
        super({$app,initialState,tagName:'div',className:'todoList'});
    }

    render(){
        this.$target.innerHTML = 
        `
            <ul>
                ${this.state.todoList.map(todo=>{
                    return `<li>${todo}</li>`
                }).join(',')}
            </ul>
        `
    }

}