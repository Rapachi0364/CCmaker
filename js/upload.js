document.addEventListener("DOMContentLoaded", () => {
  const photoInput = document.getElementById("photoInput");
  const photo = App.el.photo;

  photoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      App.state.photo = reader.result;
      App.state.photoTransform = {
        x: 0,
        y: 0,
        scale: 1
      };

      App.render();
      App.saveLocal();
    };

    reader.readAsDataURL(file);
  });

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;

  photo.addEventListener("pointerdown", e => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    baseX = App.state.photoTransform.x;
    baseY = App.state.photoTransform.y;
    photo.setPointerCapture(e.pointerId);
  });

  photo.addEventListener("pointermove", e => {
    if (!dragging) return;

    App.state.photoTransform.x = baseX + (e.clientX - startX);
    App.state.photoTransform.y = baseY + (e.clientY - startY);

    App.renderPhoto();
  });

  photo.addEventListener("pointerup", e => {
    dragging = false;
    photo.releasePointerCapture(e.pointerId);
    App.saveLocal();
  });

  photo.addEventListener("wheel", e => {
    e.preventDefault();

    if (e.deltaY < 0) {
      App.state.photoTransform.scale += 0.1;
    } else {
      App.state.photoTransform.scale -= 0.1;
    }

    App.state.photoTransform.scale = Math.max(
      0.3,
      Math.min(5, App.state.photoTransform.scale)
    );

    App.renderPhoto();
    App.saveLocal();
  }, { passive: false });

  photo.addEventListener("dblclick", () => {
    App.state.photoTransform = {
      x: 0,
      y: 0,
      scale: 1
    };

    App.renderPhoto();
    App.saveLocal();
  });
});