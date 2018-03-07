"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Test = (function () {
    function Test() {
        this.mm = (function (str) {
            console.log("property init " + str);
            return str;
        })("mm");
        console.log("constructor begin");
    }
    return Test;
}());
__decorate([
    format("aa"),
    __metadata("design:type", Object)
], Test.prototype, "mm", void 0);
Test = __decorate([
    MyDecorC,
    __metadata("design:paramtypes", [])
], Test);
function MyDecorC(constructor) {
    console.log("dec class: " + typeof constructor);
}
function DecProp() {
}
var formatMetadataKey = Symbol("format");
function format(formatString) {
    console.log("=== format");
    var res = Reflect.metadata(formatMetadataKey, formatString);
    console.log("=== format end " + res);
    return res;
}
function getFormat(target, propertyKey) {
    console.log("==== getformat");
    var res = Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    console.log("==== getformat end " + res);
    return res;
}
// =============================
console.log("start testing======");
var test = new Test();
getFormat(test, "mm");
//# sourceMappingURL=test-class.js.map