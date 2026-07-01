document.addEventListener("DOMContentLoaded", () => {

  const photoInput =
    document.getElementById("photoInput");

  const photoArea =
    App.el.photoArea;

  /*=========================
    アップロード
  =========================*/

  photoInput.addEventListener(
    "change",
    loadPhoto
  );

  function loadPhoto(e) {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {

      App.state.photo =
        reader.result;

      App.state.photoTransform = {
        x: 0,
        y: 0,
        scale: 1
      };

      App.render();
      App.saveLocal();

    };

    reader.readAsDataURL(file);

  }

  /*=========================
    ドラッグ
  =========================*/

  let dragging = false;

  let startX = 0;
  let startY = 0;

  let baseX = 0;
  let baseY = 0;

  photoArea.addEventListener(
    "pointerdown",
    startDrag
  );

  function startDrag(e) {

    dragging = true;

    startX = e.clientX;
    startY = e.clientY;

    baseX =
      App.state.photoTransform.x;

    baseY =
      App.state.photoTransform.y;

    photoArea.setPointerCapture(
      e.pointerId
    );

  }

  photoArea.addEventListener(
    "pointermove",
    dragMove
  );

  function dragMove(e) {

    if (!dragging) return;

    App.state.photoTransform.x =
      baseX +
      (e.clientX - startX);

    App.state.photoTransform.y =
      baseY +
      (e.clientY - startY);

    App.renderPhoto();

  }

  photoArea.addEventListener(
    "pointerup",
    stopDrag
  );

  photoArea.addEventListener(
    "pointercancel",
    stopDrag
  );

  function stopDrag(e) {

    if (!dragging) return;

    dragging = false;

    try {

      photoArea.releasePointerCapture(
        e.pointerId
      );

    } catch {}

    App.saveLocal();

  }

  /*=========================
    ズーム
  =========================*/

  photoArea.addEventListener(
    "wheel",
    zoomPhoto,
    {
      passive: false
    }
  );

  function zoomPhoto(e) {

    e.preventDefault();

    if (e.deltaY < 0) {

      App.state.photoTransform.scale +=
        0.1;

    } else {

      App.state.photoTransform.scale -=
        0.1;

    }

    App.state.photoTransform.scale =
      Math.max(
        0.1,
        Math.min(
          10,
          App.state.photoTransform.scale
        )
      );

    App.renderPhoto();

    App.saveLocal();

  }

  /*=========================
    ダブルクリック
  =========================*/

  photoArea.addEventListener(
    "dblclick",
    resetPhoto
  );

  function resetPhoto() {

    App.state.photoTransform = {
      x: 0,
      y: 0,
      scale: 1
    };

    App.renderPhoto();

    App.saveLocal();

  }

});