const SCREENS = {
    aisle: {
        // image_url: "https://cdn.shopify.com/s/files/1/1128/0456/files/milk_bread_1024x1024.gif?v=1559190391",
        image_url: "./grocerystore.png",
        buttons: `<span style="float: left;">
                    <button onclick="setScreen('shelf');">&lt;--</button>&nbsp;Examine shelf
                </span>
                <span style="float: right;">Examine shelf&nbsp;
                    <button onclick="setScreen('shelf');">--&gt;</button>
                </span>`
    },
    shelf: {
        image_url: "https://i.pinimg.com/originals/17/78/bd/1778bd3bc3371e66373857531d78c2a2.gif",
        buttons: `<span style="float: left;">
                    <button onclick="setScreen('take');">^</button>&nbsp;Take item
                </span>
                <span style="float: right;">Exit&nbsp;
                    <button onclick="setScreen('aisle');">--&gt;</button>
                </span>`
    },
    take: {
        image_url: "https://media.tenor.com/pUOMvcDJvr8AAAAM/clock-5-seconds.gif",
        buttons: "<button style='opacity: 0;'>dingle doodle</button>",
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function setScreen(id) {
    document.getElementById("game-panel").src = SCREENS[id].image_url;
    document.getElementById("choices").innerHTML = SCREENS[id].buttons;

    if (id == "take") {
        setTimeout(() => { setScreen("shelf"); }, 5 * 1000);
    }
    else {
        fadeIn();
    }
}

async function fadeIn() {
    let game_panel = document.querySelector("#game-panel");
    for (let i = 0; i <= 1; i += 0.25) {
        game_panel.style.opacity = i;
        await delay(200);
    }
}