const $ = (id) => document.getElementById(id);

const fileInput = $("file");
const preview = $("preview");
const slogan = $("slogan");
const submit = $("submit");
const form = $("form");
let result = null;

const upload = async () => {
  const url = form.action;
  const file = fileInput.files[0];

  const filename = file.name.replace(/\s|(\.(?!\w{3}$))/g, "_");
  const data = new FormData();
  data.append("file", file, filename);

  preview.classList.add("loading");
  submit.classList.add("hidden");
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });

  const reader = new FileReader();
  reader.onload = function (e) {
    slogan.textContent = "WELCOME TO THE MATRIX";
    preview.style.backgroundImage = `url(${e.target.result})`;
    preview.style.backgroundSize = "cover";

    submit.textContent = "SAVE";
    submit.style.opacity = 1;
    submit.classList.remove("hidden");
    preview.classList.remove("loading");
  };
  result = await response.blob();
  reader.readAsDataURL(result);
};

window.choose = () => {
  fileInput.click();
};

submit.onclick = () => {
  if (!result) {
    upload();
  } else {
    const a = document.createElement("a");
    a.download = fileInput.files[0].name;
    a.href = URL.createObjectURL(result);
    a.dataset.downloadurl = ["image/jpeg", a.download, a.href].join(":");
    a.click();
  }
};

fileInput.onchange = () => {
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = function (e) {
    slogan.textContent = "JOIN THE MATRIX";
    submit.classList.remove("hidden");
    preview.style.backgroundImage = `url(${e.target.result})`;
    preview.style.backgroundSize = "cover";
    submit.textContent = "START";
    result = null;
  };
  if (file) reader.readAsDataURL(file);
};
