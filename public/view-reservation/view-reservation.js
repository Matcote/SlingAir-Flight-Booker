const reservationRedirect = () => {
  event.preventDefault();
  const input = document.getElementById("bookingId");
  window.location = `../confirmed?id=${input.value}`;
};
