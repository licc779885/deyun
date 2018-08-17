function t(t) {
  return (t = t.toString())[1] ? t : "0" + t
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatTime2(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
module.exports = {
  formatTime: function (e) {
    var n = e.getFullYear(),
      o = e.getMonth() + 1,
      r = e.getDate(),
      u = e.getHours(),
      i = e.getMinutes(),
      g = e.getSeconds();
    return [n, o, r].map(t).join("/") + " " + [u, i, g].map(t).join(":")
  }, 
  formatTime2: formatTime2
};