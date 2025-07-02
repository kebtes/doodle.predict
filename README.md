<div align="center">
  <img src="banner.png">
</div>

<b> A simple web-based doodle predictor trained on top of the [Google Quick, Draw! dataset](https://quickdraw.withgoogle.com/data). Draw something in your browser, and the model will try to guess what it is. </b>

---

## 🔧 Tech Stack Overview

| Frontend                              | Backend                                       | Model                                                  |
|-------------------------------------|----------------------------------------------|--------------------------------------------------------|
| Built with **HTML5**, **CSS3**, and vanilla **JavaScript** | Powered by **FastAPI**, providing a fast, async REST API | Developed using **TensorFlow** — a convolutional neural network trained on the Quick, Draw! dataset |
| Features a responsive drawing canvas with smooth real-time input handling | Accepts and processes base64-encoded canvas images for prediction | Designed to classify simplified grayscale doodles and output the most probable label |
| Dynamic UI with animated feedback that updates predictions live | Lightweight and efficient prediction endpoint at `/predict` | Optimized for quick, accurate doodle recognition       |
