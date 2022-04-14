
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

        document.querySelector('#board').onmouseup = (e) => {
            const board = $('#board');
            let x = e.clientX - board.offset().left;
            let y = e.clientY - board.offset().top;
            client.emit('reqAttack', {
                x: x / 200,
                y: y / 200,
                p: 20
            })
            console.log(x / 200, y / 200);
        }

        client.on('recAttackResult', (data) => {
            console.log(`Attack result ${data.result}`);
        })
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