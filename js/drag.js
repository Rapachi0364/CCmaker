document.addEventListener("DOMContentLoaded", () => {
  let target = null;
  let key = "";
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;

  document.querySelectorAll(".draggable").forEach(el => {
    el.addEventListener("pointerdown", e => {
      target = el;
      key = el.dataset.key;

      App.selectedKey = key;

      if (typeof updateEditor === "function") {
        updateEditor();
      }

      target.classList.add("dragging");

      startX = e.clientX;
      startY = e.clientY;

      baseX = App.state.texts[key].x;
      baseY = App.state.texts[key].y;

      target.setPointerCapture(e.pointerId);
    });

    el.addEventListener("pointermove", e => {
      if (!target) return;

      App.state.texts[key].x = baseX + (e.clientX - startX);
      App.state.texts[key].y = baseY + (e.clientY - startY);

      App.renderTexts();
    });

    el.addEventListener("pointerup", e => {
      if (!target) return;

      target.classList.remove("dragging");
      target.releasePointerCapture(e.pointerId);

      target = null;
      App.saveLocal();
    });
  });
});