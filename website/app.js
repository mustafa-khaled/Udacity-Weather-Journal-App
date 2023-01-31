// Personal API Key for OpenWeatherMap API
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = `&appid=654776ebb3beaa0e02edf64486ba543d&units=metric`;

// Create a new date instance dynamically with JS
let dateInst = new Date();
let date = `${dateInst.getDay() + 4}.${
  dateInst.getMonth() + 1
}.${dateInst.getFullYear()}`;

const performAction = async () => {
  // get zipCode And feelings and generate date
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  if (zipCode === "") {
    document.querySelector(".wrong-zip").style.display = "none";
    document.querySelector(".no-zip").style.display = "block";
    return;
  }

  // Get temperature via API
  const res = await fetch(baseURL + zipCode + apiKey);
  if (res.status !== 200) {
    document.querySelector(".no-zip").style.display = "none";
    document.querySelector(".wrong-zip").style.display = "block";
    return;
  }
  const data = await res.json();
  const temp = data.main.temp;

  // send temperature And feelings and date To local server
  await fetch(`/save-data`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ temp, feelings, date }),
  });

  //get Data From Local Backend
  const res2 = await fetch(`/get-data`);
  const data2 = await res2.json();

  // update UI dynamically
  document.getElementById(
    "temp"
  ).innerHTML = `temperature: ${data2.temp}&deg;C`;
  document.getElementById("date").textContent = `Date: ${data2.date}`;
  document.getElementById(
    "content"
  ).textContent = `Feelings: ${data2.feelings}`;
  document.querySelector(".wrong-zip").style.display = "none";
  document.querySelector(".no-zip").style.display = "none";
};

const btn = document.querySelector("#generate");

btn.addEventListener("click", performAction);