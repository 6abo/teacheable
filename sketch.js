// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/mUV88zZpr/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confianza = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  //flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  textAlign(LEFT);
  textSize(8);
  text(confianza, 10, height -4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  //flippedVideo = ml5.flipImage(video)
  classifier.classify(video, gtonResult);
  //flippedVideo.remove();
}

// When we get a result
function gtonResult(results, error) {
  // If there is an error
  if (error) {
    console.log(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confianza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
