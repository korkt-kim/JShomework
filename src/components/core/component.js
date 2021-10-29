export default class component{
    constructor({$app,initialState,tagName='div',className=''}){
        this.$target = document.createElement(tagName);
        this.$target.className  =className;
        $app.appendChild(this.$target);
        
        this.setup(initialState);
        this.mounted();
        this.render();

        this.setEvent();
    }

    setup(initialState){
        this.state= initialState;
    }

    mounted(){}

    setEvent(){}

    setState(nextState){
        this.state= nextState;
        this.render();
    }

    render(){}
}