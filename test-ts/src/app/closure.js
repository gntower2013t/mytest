

let c = counter(), d = counter(); // Create two counters
c.count() // => 0
d.count() // => 0
c.count() // => 1
d.count() // => 1
c.reset() // reset!!
c.count() // => 0: because we reset c
d.count() // => 2: d was not reset