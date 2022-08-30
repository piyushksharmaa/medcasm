const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time display
  const timeDisplay = document.querySelector(".time-display");
  // Get the length of the outline
  const timeSelect = document.querySelectorAll(".time-select button");
  const outlineLength = outline.getTotalLength();
  //   console.log(outlineLength);
  //Duration
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;
  //Pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });
  //Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
    // song.play();
  });
  // Select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
  // Create a function specific to stop and play the sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
  // We can animate the circle
  song.ontimeupdate = () => {
    // This function basically runs every time the song runs, so when we hit play this is gonna execute the song ontimeupdate and everytime the song keeps going on it's gonna keep updating and when the song stops it's not gonna run anymore
    let currentTime = song.currentTime; // This gonna start from 0 and slowly gonna increment all the way till the song finishes
    let elapsedTime = fakeDuration - currentTime;
    let seconds = Math.floor(elapsedTime % 60); // 1.....59 then 0 again
    let minutes = Math.floor(elapsedTime / 60);

    //Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
