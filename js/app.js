'use-strict';

window.onload = function () {
  GorgyClock.Clock.init('studio-clock');
}


setTimeout(() => {
  document.getElementById("message1").style.display = "none";
  document.getElementById("message2").style.display = "block";
  setTimeout(() => {
    document.getElementById("message2").style.display = "none";
    document.getElementById("message3").style.display = "block";
    setTimeout(() => {
      document.getElementById("message3").style.display = "none";
      document.getElementById("message4").style.display = "block";
      setTimeout(() => {
        document.getElementById("message4").style.display = "none";
        document.getElementById("message5").style.display = "block";
        setTimeout(() => {
          document.getElementById("message5").style.display =
            "none";
          document.getElementById("message6").style.display =
            "block";
          setTimeout(() => {
            document.getElementById("message6").style
              .display = "none";
            document.getElementById("popup-home-start")
              .style.display = "block";
          }, 3000);
        }, 3000);
      }, 3000);
    }, 3000);
  }, 3000);
}, 3000);

document.getElementById("popup-home-start").onclick = function () {
  document.querySelector(".popup-home").classList.add("animate__fadeOut");
  setTimeout(() => {
    document.querySelector(".popup-home").style.display = "none";
  }, 1000);
  projet();
};



navigator.mediaDevices.getUserMedia({
  audio: true
});

var end = new Audio('../medias/blinding-end.mp3');
var cage = new Audio('../medias/cage.mp3');
var start = new Audio('../medias/machine-start.mp3');

document.getElementById("end_volume").defaultValue = 0.8;
document.getElementById("cage_volume").defaultValue = 0.8;
document.getElementById("start_volume").defaultValue = 0.8;


function timing(time, push) {

  var seconds = Math.round(time.duration);
  var intervalId = setInterval(function () {

    seconds--;

    if (seconds === 0) {
      clearInterval(intervalId);
    }


    str1 = seconds.toString();
    let element = document.getElementById(push);
    element.textContent = '0:' + str1.padStart(2, '0');

  }, 1000);

}


function record_timing() {

  var seconds = 12;
  var intervalId = setInterval(function () {

    seconds--;

    if (seconds === 0) {
      clearInterval(intervalId);
    }


    str1 = seconds.toString();
    let element = document.getElementById("record_info");
    element.textContent = 'Enregistrement dans ' + str1.padStart(2, '0') + ' secondes';

  }, 1000);

}


function duration(song, div) {
  var seconds = song;
  var intervalId = setInterval(function () {

    seconds--;

    if (seconds === 0) {
      clearInterval(intervalId);
    }


    let width_bar = Math.round(100 * song.currentTime / song.duration);

    let barok = width_bar.toString();
    let bar = document.getElementById(div)
    bar.style.width = barok + "%";

  }, 200);



}

function record_bar(duration, push) {

  document.getElementById('record').style.display = "block";

  var total = duration;
  var seconds = 0;
  var intervalId = setInterval(function () {

    seconds++;

    if (seconds === total) {
      document.getElementById("record_info").innerText = "Enregistrement terminé";
      document.getElementById('record').style.display = "none";
      clearInterval(intervalId);
    }


    let width_bar = Math.round(100 * seconds / total);
    let barok = width_bar.toString();
    let bar = document.getElementById(push)
    bar.style.width = barok + "%";

  }, 1000);

}


function sendToServer(file) {
  // var  = audio.getBlob()
  var time = Date.now();
  var title = 'FileName_' + time;

  const formData = new FormData()
  formData.append('title', title)
  formData.append('experiment', file, 'fileName.wav')

  fetch('http://localhost:3001/experiment', {
    method: 'POST',
    body: formData,
  }).then(res => console.log(res.text()))
}


function projet() {

  console.log('fin de la musique')
  record_timing();
  timing(end, "timing_end");
  duration(end, "progress_end")
  end.play();

  setTimeout(function () {
    record_bar(7, "record_bar")
    navigator.mediaDevices.getUserMedia({
        audio: true
      })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          // sendToServer(audioBlob);
          setTimeout(function () {
            timing(end, "timing_end");
            duration(end, "progress_end");
            end.play();
            console.log('tu vas te réécouter haha')

            setTimeout(function () {
              timing(cage, "timing_cage");
              duration(cage, "progress_cage")
              cage.play();
              console.log('maintenant')
              audio.play();
              document.getElementById("cage_volume")
                .defaultValue = 0.3;

              setTimeout(function () {
                timing(start, "timing_start");
                duration(start, "progress_start")
                start.play();
              }, 11500);

            }, 12000);

          }, 15000);


        });

        setTimeout(() => {
          mediaRecorder.stop();
        }, 9000);
      });
    timing(cage, "timing_cage");
    duration(cage, "progress_cage")
    document.getElementById("record_info").innerText = "Enregistrement en cours";
    console.log('parle now !')
    cage.play();

    setTimeout(function () {

      timing(start, "timing_start");
      duration(start, "progress_start");
      start.play();
      setTimeout(function () {
        document.querySelector(".popup-after").style.display = "flex";
        setTimeout(() => {
          document.getElementById("message7").style.display = "none";
          document.getElementById("message8").style.display = "block";
          setTimeout(() => {
            document.getElementById("message8").style.display =
              "block";
            document.querySelector(".popup-after").classList
              .add("animate__fadeOut");
            setTimeout(() => {
              document.querySelector(".popup-after")
                .style.display = "none";
            }, 1000);
          }, 6000);
        }, 4000);
      }, 4000);
    }, 11500);


  }, 12000);

}



function changevolume(player, amount) {
  player.volume = amount;
}