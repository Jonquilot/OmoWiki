document.getElementById('latinToggle').addEventListener('click', function () {
  document.querySelectorAll('.translatable').forEach(function (el) {
    const tmp = el.textContent;
    el.textContent = el.dataset.latin;
    el.dataset.latin = tmp;
  });
});