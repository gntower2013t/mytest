//redux middleware impl prototype

let store = {
	dispatch(){
		console.log("ori");
	}
};

preMiddleware = obs => { return obs.do(val => console.log('ACTION: ', val))};

const mid = next => {
	return ()=>{
		console.log("mid1 before");
		next(); //invoke chain start!!
		console.log("mid1 after");
	}
};
const mid2 = next => {
	return ()=>{
		console.log("mid2 before");
		next();  //original
		console.log("mid2 after");
	}
};

let middlewares = [mid, mid2];
middlewares = middlewares.slice();
middlewares.reverse();

let dispatch = store.dispatch;
middlewares.forEach(middleware =>
	dispatch = middleware(dispatch)
)

store = Object.assign({}, store, { dispatch });
store.dispatch();