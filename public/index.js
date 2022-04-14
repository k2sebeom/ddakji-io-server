
const loginScreen = $(`
<div id="login-screen">
    <input type="text" id="nickname-input">
    <button class="btn-primary" id="play-btn">Play</button>
</div>
`)

const loadingScreen = $(`
<div id="loading-screen">
    <h1>Looking for a match...</h1>
</div>
`)

const playScreen = $(`
<div id="play-screen">
    <div class="arena">
        <div id="board">
        </div>
        <div id="lineup">
        </div>
    </div>
</div>
`)

$('.container').append(loginScreen);

const btn = document.querySelector('#play-btn');
const nameInput = document.querySelector("#nickname-input");

btn.onclick = () => {
    const client = io.connect('http://localhost:4000');

    client.on('recMatch', (data) => {
        const rival = data.rival;
        const card1 = $(`
            <div style="margin: 20px">
                <div style="width: 50px;height: 50px;background-color: cyan;"></div>
                <p>${rival.nickname}</p>
            </div>
        `);
        const card2 = $(`
            <div style="margin: 20px">
                <div style="width: 50px;height: 50px;background-color: cyan;"></div>
                <p>${nameInput.value}</p>
            </div>
        `);
        
        loadingScreen.replaceWith(playScreen);
        
        $('#lineup').append(card1);
        $('#lineup').append(card2);
    });

    client.emit('reqQueue', {
        d_id: 0,
        nickname: nameInput.value
    })

    loginScreen.replaceWith(loadingScreen);
}

nameInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        btn.click();
    }
  });