let lastDateElem = document.getElementById("lastLoginDate");

function lastLoginDate(username) {
  console.log("called:", username);

  fetch(`https://node-monge-iti-project.herokuapp.com/games/${username}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.date) {
        let dateObj = new Date(data.date);
        let formatedDate = dateObj.toLocaleString("en-US");
        lastDateElem.innerHTML = formatedDate;
      } else {
        lastDateElem.innerHTML = "This is the first game";
      }
    })
    .catch((error) => {
      lastDateElem.innerHTML = "Error";
    });
}

function saveGameDate(username) {
  let data = {
    name: username,
  };

  fetch("https://node-monge-iti-project.herokuapp.com/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
