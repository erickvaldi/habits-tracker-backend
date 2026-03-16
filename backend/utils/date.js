function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

// devuelve diferencia en días: a - b
function daysDiff(a, b) {
  const A = startOfDay(a).getTime();
  const B = startOfDay(b).getTime();
  return Math.floor((A - B) / (1000 * 60 * 60 * 24));
}

module.exports = { startOfDay, daysDiff };
