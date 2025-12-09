var btn = document.getElementById('checkBtn');

btn.onclick = function () {
  var out = document.getElementById('output');
  out.innerHTML = '';

  var A_str = document.getElementById('A').value.trim();
  var H_str = document.getElementById('H').value.trim();
  var R_str = document.getElementById('R').value.trim();
  var M_str = document.getElementById('M').value.trim();

  var missing = [];
  if (!A_str) missing.push('Ошибка: не указан A (ребро куба).');
  if (!H_str) missing.push('Ошибка: не указан H (высота цилиндра).');
  if (!R_str) missing.push('Ошибка: не указан R (радиус цилиндра).');
  if (!M_str) missing.push('Ошибка: не указан M (объём жидкости).');

  if (missing.length > 0) {
    out.innerHTML = missing.map(function (s) { return '<div class="err">' + s + '</div>'; }).join('');
    return;
  }

  var A = parseFloat(A_str);
  var H = parseFloat(H_str);
  var R = parseFloat(R_str);
  var M = parseFloat(M_str);

  var bad = [];
  if (!isFinite(A) || A <= 0) bad.push('A должен быть положительным числом.');
  if (!isFinite(H) || H <= 0) bad.push('H должен быть положительным числом.');
  if (!isFinite(R) || R <= 0) bad.push('R должен быть положительным числом.');
  if (!isFinite(M) || M < 0) bad.push('M должен быть числом >= 0.');

  if (bad.length > 0) {
    out.innerHTML = bad.map(function (s) { return '<div class="err">' + s + '</div>'; }).join('');
    return;
  }

  var vCube = A * A * A;
  var vCyl = Math.PI * R * R * H;
  var total = vCube + vCyl;

  var canCube = M >= vCube;
  var canCyl = M >= vCyl;
  var canBoth = M >= total;

  function fmt(x) {
    return (Math.abs(x - Math.round(x)) < 1e-9) ? String(Math.round(x)) : x.toFixed(6);
  }

  var parts = [];
  parts.push('<div class="main_text">Объём куба (A³): <b>' + fmt(vCube) + '</b></div>');
  parts.push('<div class="main_text">Объём цилиндра (π·R²·H): <b>' + fmt(vCyl) + '</b></div>');
  parts.push('<div class="main_text">Общий объём двух ёмкостей: <b>' + fmt(total) + '</b></div>');
  parts.push('<hr>');
  parts.push('<div class="main_text"' + (canCube ? 'ok' : 'no') + '">Достаточно ли M = <b>' + fmt(M) + '</b> для заполнения куба? — <b>' + (canCube ? 'Да' : 'Нет') + '</b></div>');
  parts.push('<div class="main_text"' + (canCyl ? 'ok' : 'no') + '">...для заполнения цилиндра? — <b>' + (canCyl ? 'Да' : 'Нет') + '</b></div>');
  parts.push('<div class="main_text"' + (canBoth ? 'ok' : 'no') + '">...для заполнения обоих одновременно? — <b>' + (canBoth ? 'Да' : 'Нет') + '</b></div>');

  out.innerHTML = parts.join('');
};