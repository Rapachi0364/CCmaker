document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const jobInput = document.getElementById("jobInput");
  const descInput = document.getElementById("descInput");

  const fontSelect = document.getElementById("fontSelect");
  const fontSize = document.getElementById("fontSize");
  const fontColor = document.getElementById("fontColor");
  const boldCheck = document.getElementById("boldCheck");

  nameInput.value = App.state.texts.name.value;
  jobInput.value = App.state.texts.job.value;
  descInput.value = App.state.texts.desc.value;

  nameInput.addEventListener("input", () => {
    App.state.texts.name.value = nameInput.value || "名前";
    App.render();
    App.saveLocal();
  });

  jobInput.addEventListener("input", () => {
    App.state.texts.job.value = jobInput.value || "職業";
    App.render();
    App.saveLocal();
  });

  descInput.addEventListener("input", () => {
    App.state.texts.desc.value = descInput.value || "説明文";
    App.render();
    App.saveLocal();
  });

  document.querySelectorAll(".draggable").forEach(el => {
    el.addEventListener("click", () => {
      App.selectedKey = el.dataset.key;
      updateEditor();
    });
  });

  fontSelect.addEventListener("change", () => {
    App.state.texts[App.selectedKey].font = fontSelect.value;
    App.render();
    App.saveLocal();
  });

  fontSize.addEventListener("input", () => {
    App.state.texts[App.selectedKey].size = Number(fontSize.value);
    App.render();
    App.saveLocal();
  });

  fontColor.addEventListener("input", () => {
    App.state.texts[App.selectedKey].color = fontColor.value;
    App.render();
    App.saveLocal();
  });

  boldCheck.addEventListener("change", () => {
    App.state.texts[App.selectedKey].bold = boldCheck.checked;
    App.render();
    App.saveLocal();
  });

  window.updateEditor = function() {
    const t = App.state.texts[App.selectedKey];

    fontSelect.value = t.font;
    fontSize.value = t.size;
    fontColor.value = t.color;
    boldCheck.checked = t.bold;
  };

  updateEditor();
});