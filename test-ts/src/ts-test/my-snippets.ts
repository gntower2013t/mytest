type extra = {
    [key: string]: [ValidatorFn | null, AsyncValidatorFn | null];
};

const [oriErr={}] = [control.errors]; //null handling

.map(([,y])=>y); //destructure


JSON.stringify(obj) // |json jsonpipe


/* Function type */
type a = Function;
let x: a = () => { }
x();
