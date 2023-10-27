var resultado1 = "";
var resultado2 = "";

Webcam.set ({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
var camara = document.getElementById ("camara");
Webcam.attach ("#camara");
function foto (){
    Webcam.snap (
        function (data_uri){
            document.getElementById("result").innerHTML = '<img id="image" src="'+data_uri+'"/>'
        }
    )
}

console.log("ml5: ", ml5.version)
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FPopz9Cik/model.json", modelReady)
function modelReady() {
    console.log("El modelo esta listo")
}
function Hablar() {
    var Voz=window.speechSynthesis;
    var prediccion1="La primer predicción es:"+ resultado1;
    var prediccion2="La segunda predicción es:"+ resultado2;
    var Habla=new SpeechSynthesisUtterance(prediccion1 + prediccion2)
    Voz.speak(Habla)
}

function analizar () {
    var foto = document.getElementById("image");
    classifier.classify(foto, resultados);
}

function resultados(error, datos) {
    if (error) {
        console.log("Error: "+ error);
    }
    else {
        console.log(datos);
        document.getElementById("resultado1").innerHTML = datos[0].label;
        document.getElementById("resultado2").innerHTML = datos[1].label;
        resultado1 = datos [0].label;
        resultado2 = datos [1].label;
        Hablar()
        if (datos[0].label == "Feliz") {
            document.getElementById("emoji1").innerHTML="&#128522;"
        }
        if (datos[0].label == "Triste") {
            document.getElementById("emoji1").innerHTML="&#128532;"
        }
        if (datos [0].label == "Enojado") {
            document.getElementById("emoji1").innerHTML="&#128548;"
        }
        
        if (datos [1].label == "Feliz") {
            document.getElementById("emoji2").innerHTML="&#128522;"
        }
        if (datos [1].label == "Triste") {
            document.getElementById("emoji2").innerHTML="&#128532;"
        }
        if (datos [1].label == "Enojado") {
            document.getElementById("emoji2").innerHTML="&#128548;"
        }
    }
}

