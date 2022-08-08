var myDate = new Date(); // Set this to your date in whichever timezone.
console.log('🚀 ~ file: test.js ~ line 3 ~ myDate', myDate);
var utcDate = myDate.toUTCString();
console.log('🚀 ~ file: test.js ~ line 6 ~ utcDate', utcDate);

console.log(
  '🚀 ~ file: test.js ~ line 9 ~ moment(myDate).format().toISOString()',
  moment(myDate).format().toISOString()
);

new Date().toISOString() > '2012-11-04T14:51:06.157Z';
