const p = [0, 0, 0, 0, 0, 0, 0, 0];

let n = 147;

let i = 8;

while (n > 0) {
  p[i] = n % 2;
  n = n / 2;
  i = i - 1;
}

console.log('p', p.slice(0, 5));
