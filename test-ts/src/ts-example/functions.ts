let myAdd = function (x: number, y: number): number {
	return x + y;
};

//type declare on left; use =>void for no return
let myAdd2: (x: number, y: number) => number =
	function (x: number, y: number): number { return x + y; };

function buildName(firstName: string, lastName?: string) {
}
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters

let fn: (firstName: string, lastName?: string) => string;

function buildName3(firstName = "Will", lastName: string) { }
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"

function buildName2(firstName: string, ...restOfName: string[]) { }

let deck: Deck = {
	suits: ["hearts", "spades", "clubs", "diamonds"],
	cards: Array(52),
	createCardPicker: function (this: Deck) {
		// NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
		return () => {
			let pickedCard = Math.floor(Math.random() * 52);
			let pickedSuit = Math.floor(pickedCard / 13);

			return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
		}
	}
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

function f(this: void) {
	// make sure `this` is unusable in this standalone function
}

interface Card {
	suit: string;
	card: number;
}

interface Deck {
	suits: string[];
	cards: number[];
	createCardPicker(this: Deck): () => Card;
}

interface Event {
	message: string;
}
interface UIElement {
	//this void
	addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
	info: string;
	onClickBad(this: Handler, e: Event) {
		// oops, used this here. using this callback would crash at runtime
		this.info = e.message;
	}
}
let h = new Handler();
let uiElement: UIElement; uiElement.addClickListener(h.onClickBad); // error!


/* overload */
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };
function pickCard(x: any): any {
	// Check to see if we're working with an object/array
	// if so, they gave us the deck and we'll pick the card
	if (typeof x == "object") {
		let pickedCard = Math.floor(Math.random() * x.length);
		return pickedCard;
	}
	// Otherwise just let them pick the card
	else if (typeof x == "number") {
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);


/* alternative: union type */
type ToPick = { suit: string; card: number; } | number ;
function pick2(x: ToPick) {
	let r = x.suit; //error
	if (typeof x == "object") { //type infer here!
		let r2 = x.suit;
	} else if (typeof x == "number") {
		let r2 = x.suit; //error
		let pickedSuit = Math.floor(x / 13);
	}
}

/* constructor overload
  https://stackoverflow.com/questions/12702548/constructor-overload-in-typescript
  Alternatively, you'd better use static factory methods.
*/
interface IBox {
	x: number;
	y: number;
	height: number;
	width: number;
}

class Box {
	public x: number;
	public y: number;
	public height: number;
	public width: number;

	constructor();
	constructor(obj: IBox);
	constructor(obj?: any) {
		this.x = obj && obj.x || 0
		this.y = obj && obj.y || 0
		this.height = obj && obj.height || 0
		this.width = obj && obj.width || 0;
	}
}
