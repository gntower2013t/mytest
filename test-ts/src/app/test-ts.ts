
let arr = [1, 2, 3];
let a2 = [...(arr.reverse())];
console.log(`${a2}`);

let obj = { aa: 'Waaaaa' };
console.log(`gogo: ${JSON.stringify(obj)}`);

let o: { totalCnt?: number, activeCnt?: number } = null;
let o2 = { ...o };
console.log(`gogo: ${JSON.stringify(o2)}`);

class My {
	static bb = 55;
	static gg() {

	}
}
let my = new My();
// My.prototype===my.prototype



