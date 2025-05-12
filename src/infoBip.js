const myHeaders = new Headers();
myHeaders.append("Authorization", "App d051ce0911d20ff80f688e0c28c22378-337b5c86-1b8c-4749-96d7-8fc9e8c5d92f");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

const raw = JSON.stringify({
    "messages": [
        {
            "destinations": [{"to":"244934156335"}],
            "from": "447491163443",
            "text": "Congratulations on sending your first message. Go ahead and check the delivery report in the next step."
        }
    ]
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch("https://e5r442.api.infobip.com/sms/2/text/advanced", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    