document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("saveButton");
  const saveJson = document.getElementById("saveJson");
  const loadJson = document.getElementById("loadJson");

  saveButton.addEventListener("click", savePNG);
  saveJson.addEventListener("click", saveJSON);
  loadJson.addEventListener("change", loadJSON);

async function savePNG() {

  const oldFit =
    App.el.photo.style.objectFit;

  App.el.photo.style.objectFit =
    "cover";

  const canvas =
    await html2canvas(
      App.el.card,
      {
        backgroundColor: null,
        scale: 2,
        useCORS: true
      }
    );

  App.el.photo.style.objectFit =
    oldFit;

  const link =
    document.createElement("a");

  link.download = createName("png");

  link.href =
    canvas.toDataURL("image/png");

  link.click();

}
  function saveJSON() {
    const json = JSON.stringify(App.state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = createName("json");
    link.click();

    URL.revokeObjectURL(url);
  }

  function loadJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        App.state = App.deepMerge(App.state, data);
        App.render();

        if (typeof updateEditor === "function") {
          updateEditor();
        }

        App.saveLocal();
      } catch (err) {
        alert("JSONを読み込めませんでした");
        console.error(err);
      }
    };

    reader.readAsText(file);
  }

  function createName(ext) {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    return `card_${y}${m}${day}_${h}${min}.${ext}`;
  }
});