/* Live site previews: each tile loads the real site in a scaled iframe (lazy). */
(function () {
  var frames = document.querySelectorAll(".live-frame");
  if (!frames.length) return;
  var BASE = 1280;
  function fit(box) {
    var f = box.querySelector("iframe");
    if (f) f.style.transform = "scale(" + box.clientWidth / BASE + ")";
  }
  function load(box) {
    var f = box.querySelector("iframe");
    if (f && !f.src) f.src = box.getAttribute("data-src");
  }
  frames.forEach(fit);
  window.addEventListener("resize", function () { frames.forEach(fit); });
  if ("ResizeObserver" in window) {
    var ro = new ResizeObserver(function (es) { es.forEach(function (e) { fit(e.target); }); });
    frames.forEach(function (b) { ro.observe(b); });
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { load(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "700px 0px" });
    frames.forEach(function (b) { io.observe(b); });
  } else {
    frames.forEach(load);
  }
})();
