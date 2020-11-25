const videoElement = document.querySelector("#video");
const pipBtn = document.querySelector("#pipButton");
const selectVideoBtn = document.querySelector("#selectVideoButton");
const closeBtn = document.querySelector("#closeButton");

let mediaStream;

async function selectMediaStream() {
    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (error) {
        // Catch error
        console.log("Error:", error);
    }
}

//Start Media Stream
selectVideoBtn.addEventListener("click", async () => {
    const selected = await selectMediaStream(videoElement);
    //Show Buttons
    pipBtn.style.display = "block";
    closeBtn.style.display = "block";
});

//Close Media Stream
closeBtn.addEventListener("click", async () => {
    if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
    }
    const mediaStreamTrack = mediaStream.getVideoTracks();
    mediaStreamTrack && mediaStreamTrack[0].stop();
    //Hide Buttons
    pipBtn.style.display = "none";
    closeBtn.style.display = "none";
});

// Toggle picture in picture
pipBtn.addEventListener("click", async () => {
    try {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();

        } else {
            await videoElement.requestPictureInPicture();

        }
    } catch (error) {
        console.log("Error in pip button: ", error);
    }
});


// Control picture in picture for innerText
videoElement.addEventListener('enterpictureinpicture', function () {
    pipBtn.innerText = "Off PiP";
});

videoElement.addEventListener('leavepictureinpicture', function () {
    pipBtn.innerText = "On PiP";
});