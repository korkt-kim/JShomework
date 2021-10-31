import App from './App.js'
import { initialRouter } from './router.js';


const app = document.querySelector('body');

const contentMain = new App(app)

initialRouter(contentMain.$target,contentMain.state,contentMain);