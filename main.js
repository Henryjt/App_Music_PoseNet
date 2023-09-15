pulsoesquerdoY = 0
pulsodireitoY = 0
pulsoesquerdoX = 0
pulsodireitoX = 0
pontuacaopulsodireito = 0
pontuacaopulsoesquerdo = 0


function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function draw() {
    background("white")
    image(video, 0, 0, 500, 500)
    if (pontuacaopulsodireito > 0.2) {
        circle(pulsodireitoX, pulsodireitoY, 40)
        if (pulsodireitoY > 0 && pulsodireitoY <= 100)  {
            document.getElementById("Velocidade").innerHTML = "Velocidade = 0.5x"
            r = 0.5
        }
        else if (pulsodireitoY > 0 && pulsodireitoY <= 200)  {
            document.getElementById("Velocidade").innerHTML = "Velocidade = 1x"
            r = 1
        }
        else if (pulsodireitoY > 0 && pulsodireitoY <= 300)  {
            document.getElementById("Velocidade").innerHTML = "Velocidade = 1.5x"
            r = 1.5
        }
        else if (pulsodireitoY > 0 && pulsodireitoY <= 400)  {
            document.getElementById("Velocidade").innerHTML = "Velocidade = 2x"
            r = 2
        }
        else if (pulsodireitoY > 400)  {
            document.getElementById("Velocidade").innerHTML = "Velocidade = 2.5x"
            r = 2.5
        }
        song.rate(r)
    }
    if (pontuacaopulsoesquerdo > 0.2) {
    circle(pulsoesquerdoX, pulsoesquerdoY, 40)
    pulsoesquerdoYnumero = Number(pulsoesquerdoY)
    volume = pulsoesquerdoYnumero / 500
    document.getElementById("Volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume)}
}

function preload() {
    song = loadSound("music.mp3");
}

function tocar() {
    song.play()

}

function interromper() {
    song.stop()
}

function modelLoaded() {
    console.log("O modelo poseNet foi carregado")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        pulsoesquerdoY=results[0].pose.leftWrist.y
        pulsodireitoY=results[0].pose.rightWrist.y
        pulsoesquerdoX=results[0].pose.leftWrist.x
        pulsodireitoX=results[0].pose.rightWrist.x
        pontuacaopulsoesquerdo=results[0].pose.leftWrist.confidence
        pontuacaopulsodireito=results[0].pose.rightWrist.confidence
    }
}