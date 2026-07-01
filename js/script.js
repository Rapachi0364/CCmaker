window.App = {
  selectedKey: "name",

  state: {
    template: "fantasy",
    background: "",
    frame: "",
    photo: "",
    photoTransform: {
      x: 0,
      y: 0,
      scale: 1
    },
    photoArea: {
      left: 60,
      top: 80,
      width: 580,
      height: 700
    },
    texts: {
      name: {
        value: "名前",
        x: 40,
        y: 780,
        size: 68,
        color: "#ffffff",
        font: "Noto Sans JP",
        bold: true,
        shadow: true
      },
      job: {
        value: "職業",
        x: 45,
        y: 865,
        size: 32,
        color: "#ffffff",
        font: "Noto Sans JP",
        bold: false,
        shadow: true
      },
      desc: {
        value: "説明文",
        x: 45,
        y: 915,
        size: 22,
        color: "#ffffff",
        font: "Noto Sans JP",
        bold: false,
        shadow: true
      }
    }
  },

  el: {},

  init() {
    this.el.card = document.getElementById("card");
    this.el.background = document.getElementById("background");
    this.el.frame = document.getElementById("frame");
    this.el.photoArea = document.getElementById("photoArea");
    this.el.photo = document.getElementById("photo");

    this.el.nameText = document.getElementById("nameText");
    this.el.jobText = document.getElementById("jobText");
    this.el.descText = document.getElementById("descText");

    this.loadLocal();
    this.render();
  },

  render() {
    this.renderBackground();
    this.renderPhotoArea();
    this.renderPhoto();
    this.renderTexts();
  },

  renderBackground() {
    this.el.background.style.backgroundImage =
      this.state.background ? `url("${this.state.background}")` : "";

    this.el.frame.src = this.state.frame || "";
  },

  renderPhotoArea() {
    const p = this.state.photoArea;
    this.el.photoArea.style.left = p.left + "px";
    this.el.photoArea.style.top = p.top + "px";
    this.el.photoArea.style.width = p.width + "px";
    this.el.photoArea.style.height = p.height + "px";
  },

renderPhoto() {
  const photo = this.el.photo;
  const area = this.el.photoArea;

  if (this.state.photo && photo.src !== this.state.photo) {
    photo.src = this.state.photo;
  }

  const p = this.state.photoTransform;

  photo.style.left = p.x + "px";
  photo.style.top = p.y + "px";
  photo.style.transform = `scale(${p.scale})`;

  if (this.exportMode === "cover") {
    photo.style.width = "100%";
    photo.style.height = "100%";
    photo.style.objectFit = "cover";
  } else {
    photo.style.width = "100%";
    photo.style.height = "100%";
    photo.style.objectFit = "contain";
  }
},

  renderTexts() {
    this.applyText(this.el.nameText, this.state.texts.name);
    this.applyText(this.el.jobText, this.state.texts.job);
    this.applyText(this.el.descText, this.state.texts.desc);
  },

  applyText(el, data) {
    el.textContent = data.value;
    el.style.left = data.x + "px";
    el.style.top = data.y + "px";
    el.style.fontSize = data.size + "px";
    el.style.color = data.color;
    el.style.fontFamily = data.font;
    el.style.fontWeight = data.bold ? "bold" : "normal";
    el.style.textShadow = data.shadow
      ? "3px 3px 8px rgba(0,0,0,.5)"
      : "none";
  },

  saveLocal() {
    localStorage.setItem("magCardState", JSON.stringify(this.state));
  },

  loadLocal() {
    const data = localStorage.getItem("magCardState");
    if (!data) return;

    try {
      const saved = JSON.parse(data);
      this.state = this.deepMerge(this.state, saved);
    } catch (e) {
      console.error(e);
    }
  },

  deepMerge(target, source) {
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        target[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});