import component from './core/component.js'

export default class TodoList extends component{
    constructor({$app,initialState}){
        super({$app,initialState,tagName:'div',className:'todoList'});

    }

    render(){
        this.$target.innerHTML = 
        `
            <form>
                <input type="text" class="addTodo"></input>
                <button type="submit" class="addTodoListBtn">add</button>
            </form>
            <form>
                <ul class="todoList">
                    ${this.state.todoList.map(todo=>{
                        return `<input type="check"></input><li>${todo}</li>`
                    }).join('')}
                </ul>
                <button type="submit" class="removeTodoListBtn">remove</button>
            </form>
        `
    }

}