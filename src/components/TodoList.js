import component from './core/component.js'

export default class TodoList extends component{
    constructor({$app,initialState,onClickAddBtn,onClickRemoveBtn}){
        super({$app,initialState,tagName:'div',className:'todoList'});
        this.onClickAddBtn = onClickAddBtn;
        this.onClickRemoveBtn = onClickRemoveBtn;
    }

    setEvent(){
        this.$target.addEventListener('click',(e)=>{
            if(e.target.closest('.addTodoListBtn')){
                e.preventDefault();
                const textInput = this.$target.querySelector('.addTodo').value;
                this.onClickAddBtn(textInput)
            }
        })
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
                        return `<li>${todo}</li>`
                    }).join('')}
                </ul>
            </form>
        `
    }

}