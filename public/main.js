window.upload = async (event) => {
  event.preventDefault();
  const form = event.target;
  const url = form.action;

  const response = await fetch(url, {
    method: "POST",
    body: new FormData(form),
  });
  console.log(await response.text());
  console.log((window.f = event.target));
};
