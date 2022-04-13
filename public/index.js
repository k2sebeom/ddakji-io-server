const btn = document.querySelector('#play-btn');

btn.onclick = () => {
    const client = io.connect('http://localhost:4000');

    client.on('recMatch', (data) => {
        console.log(data.rival);
    });

    client.emit('reqQueue', {
        d_id: 0,
        nickname: "asdS"
    })
}