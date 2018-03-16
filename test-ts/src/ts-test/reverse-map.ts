
/* string enum reverse mapping
https://stackoverflow.com/questions/44883072/reverse-mapping-for-string-enums
*/
type Mode = "Silent" | "Normal" | "Deleted";
const Mode = {
    get Silent(): Mode { return "Silent"; },
    get Normal(): Mode { return "Normal"; },
    get Deleted(): Mode { return "Deleted"; }
}
let modeStr: string = "Silent";
let mode: Mode;

mode = Mode[modeStr]; // Silent
mode = Mode.Normal; // Normal
mode = "Deleted"; // Deleted
mode = Mode["unknown"]; // undefined
// mode = "invalid"; // Error

{
	type Mode = string; //"Silent" | "Normal" | "Deleted"
	let Mode = {
		Silent: "Silent",
		Normal: "Normal",
		Deleted: "Deleted"
	}

	let modeStr: string = "Silent";
	let mode: Mode;

	mode = Mode[modeStr]; // Silent
	mode = Mode.Normal; // Normal, can't infer??
	mode = "Deleted"; // Deleted
	mode = Mode["unknown"]; // undefined
	mode = "invalid"; // "invalid"

}

/* use enum */
{
	enum Mode {
		Silent = <any>"Silent",
		Normal = <any>"Normal",
		Deleted = <any>"Deleted"
	}

	let modeStr: string = "Silent";
	let mode: Mode;

	mode = Mode[modeStr]; // Silent
	mode = Mode.Normal; // Normal
	//mode = "Deleted"; // Error
	mode = Mode["unknown"]; // undefined
}

/* proxy, es2015 ? */
{
	type StringEnum<T extends string> = {[K in T]: K}
	const proxy = new Proxy({}, {
		get(target, property) {
			return property;
		}
	})
	function stringEnum<T extends string>(): StringEnum<T> {
		return proxy as StringEnum<T>;
	}
	type Mode = "Silent" | "Normal" | "Deleted";
	const Mode = stringEnum<Mode>();
}
