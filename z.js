const a = [
  {
    x: 1,
  },
  {
    x: 2,
  },
];

for (const v of a) {
  v.y = 123;
}

console.log(a);
