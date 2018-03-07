import "reflect-metadata";

@MyDecorC
class Test{

    @format("aa")
    mm = ((str: string)=>{
        console.log(`property init ${str}`);
        return str;
    })("mm");

    constructor() {
        console.log(`constructor begin`);
    }
}

function MyDecorC(constructor: Function) {
    console.log(`dec class: ${typeof constructor}`);
    
}

function DecProp() {
    
}

const formatMetadataKey = Symbol("format");
function format(formatString: string) {
    console.log(`=== format`);
    
    const res = Reflect.metadata(formatMetadataKey, formatString);

    console.log(`=== format end ${res}`);
    return res;
}

function getFormat(target: any, propertyKey: string) {
    console.log(`==== getformat`)
    const res = Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    console.log(`==== getformat end ${res}`)
    return res;
}

// =============================
console.log("start testing======");

const test = new Test();

console.log("framework code=====");

getFormat(test, "mm");