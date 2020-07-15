const loadInfo = () => {
  fetch(`/confirmation`)
    .then((response) => {
      console.log(response);
      JSON.parse(response);
    })
    .then((data) => {
      console.log(data);
      document.getElementById("flight").innerText = data.flight;
      document.getElementById("seat").innerText = data.seat;
      document.getElementById("name").innerText = data.name;
      document.getElementById("email").innerText = data.email;
    });
};

loadInfo();
