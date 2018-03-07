
/* string enum reverse mapping */
type Mode = "Silent" | "Normal" | "Deleted";
const mode = {
    get Silent(): Mode { return "Silent"; },
    get Normal(): Mode { return "Normal"; },
    get Deleted(): Mode { return "Deleted"; }
}
