const loadInfo = () => {
  const url = new URL(window.location);
  const userId = url.searchParams.get("id");
  fetch(`/confirmation/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("flight").innerText = data.flight;
      document.getElementById("seat").innerText = data.seat;
      document.getElementById("name").innerText =
        data.givenName + " " + data.surname;
      document.getElementById("email").innerText = data.email;
    })
    .catch((err) => {
      return err.error ? JSON.parse(err.error) : err;
    });
};

loadInfo();
