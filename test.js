var myDate = new Date(); // Set this to your date in whichever timezone.
console.log(myDate);
var utcDate = myDate.toUTCString();
console.log(utcDate);

console.log(moment(myDate).format().toISOString());

new Date().toISOString() > '2012-11-04T14:51:06.157Z';
