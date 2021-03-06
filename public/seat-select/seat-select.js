const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";

const renderSeats = (seatData) => {
  document.querySelector(".form-container").style.display = "block";
  seatsDiv.innerHTML = " ";
  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // render the seat availability based on the data...
      if (
        seatData.find((element) => element.id === seatNumber).isAvailable ===
        false
      ) {
        seat.innerHTML = seatOccupied;
      } else {
        seat.innerHTML = seatAvailable;
      }
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = (event) => {
  const flightNumber = flightInput.value;
  console.log("toggleFormContent: ", flightNumber);
  const verify = flightNumber.split("");
  if (
    verify[0] === "S" &&
    verify[1] === "A" &&
    !isNaN(verify[2]) &&
    !isNaN(verify[3]) &&
    !isNaN(verify[4])
  ) {
    fetch(`/flights/${flightNumber}`)
      .then((res) => res.json())
      .then((data) => {
        renderSeats(data);
      });
  } else {
    console.log('Error: required format "SA###"');
  }
};

const handleConfirmSeat = (event) => {
  event.preventDefault();
  // TODO: everything in here!
  fetch("/users", {
    method: "POST",
    body: JSON.stringify({
      givenName: document.getElementById("givenName").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      seat: selection,
      flight: flightInput.value,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.id !== undefined){
        window.location = `../confirmed?id=${data.id}`;
      }else {
        window.alert(data.message)
      }
    })
    .catch((err) => {
      console.log(err)
    });
};

const dropdown = () => {
  fetch("/flights")
    .then((response) => response.json())
    .then((data) => {
      data
        .forEach((string) => {
          const newOption = document.createElement("option");
          newOption.value = string;
          newOption.innerText = string;
          flightInput.appendChild(newOption);
        })
      toggleFormContent();
    });
};
dropdown();
