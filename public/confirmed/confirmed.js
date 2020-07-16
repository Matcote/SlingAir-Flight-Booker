const loadInfo = () => {
  const url = new URL(window.location);
  const userId = url.searchParams.get("id");
  console.log(userId);
  fetch(`/confirmation/${userId}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log("DATA: ", data);
      document.getElementById("flight").innerText = data.flight;
      document.getElementById("seat").innerText = data.seat;
      document.getElementById("name").innerText = data.name;
      document.getElementById("email").innerText = data.email;
    });
};

loadInfo();
