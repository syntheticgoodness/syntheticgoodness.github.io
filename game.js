const SCREENS = {
    aisle: {
        // image_url: "https://cdn.shopify.com/s/files/1/1128/0456/files/milk_bread_1024x1024.gif?v=1559190391",
        image_url: "./start.jpg",
        buttons: `<span style="float: left;">
                    <button onclick="setScreen('shelf');">&lt;--</button>&nbsp;Examine shelf
                </span>
                <span style="float: right;">Examine shelf&nbsp;
                    <button onclick="setScreen('shelf');">--&gt;</button>
                </span>`
    },
    shelf: {
        image_url: "./dingledoogle.jpg",
        buttons: `<span style="float: left;">
                    <button onclick="setScreen('take');">^</button>&nbsp;Take item
                </span>
                <span style="float: right;">Exit&nbsp;
                    <button onclick="setScreen('aisle');">--&gt;</button>
                </span>`
    },
    take: {
        image_url: "./dingledoogle2.gif",
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
        setTimeout(() => {
            setScreen("shelf");
            fadeInDingleDoogle();
        }, 7.87 * 1000);
    }
    else {
        fadeIn();
    }
}

async function fadeIn() {
    let game_panel = document.querySelector("#game-panel");
    for (let i = 0; i <= 1; i += 0.025) {
        game_panel.style.opacity = i;
        await delay(20);
    }
}

async function fadeInDingleDoogle() {
    let game_panel = document.querySelector("#wocaonima");
    for (let i = 1; i >= 0; i -= 0.025) {
        game_panel.style.opacity = i;
        console.log(i)
        await delay(20);
    }
}