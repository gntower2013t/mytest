let map = new Map<string,number>(
  // ['detail/duplicate/:id',''] //es6, doesn't work in ts
)

/* iterate typescript Map */
map.forEach((v, k, map) => { })

// map to array, make map iterable
Array.from(map)
