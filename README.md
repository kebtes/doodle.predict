<div align="center">
  <img src="banner.png">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
  <img src="https://img.shields.io/badge/python-3.10-blue" alt="Python" />
  <img src="https://img.shields.io/badge/TensorFlow-2.12.0-orangen" alt="Tensorflow" />
  <img src="https://img.shields.io/badge/FastAPI-0.95.2-blue" alt="FastAPI" />
</div>

#### A simple web-based doodle predictor trained on top of the [Google Quick, Draw! dataset](https://quickdraw.withgoogle.com/data). Draw something in your browser, and the model will try to guess what it is. 

---

## 🔧 Tech Stack Overview

| Frontend                              | Backend                                       | Model                                                  |
|-------------------------------------|----------------------------------------------|--------------------------------------------------------|
| Built with **HTML5**, **CSS3**, and vanilla **JavaScript** | Powered by **FastAPI**, providing a fast, async REST API | Developed using **TensorFlow** — a convolutional neural network trained on the Quick, Draw! dataset |
| Features a responsive drawing canvas with smooth real-time input handling | Accepts and processes base64-encoded canvas images for prediction | Designed to classify simplified grayscale doodles and output the most probable label |
| Dynamic UI with animated feedback that updates predictions live | Lightweight and efficient prediction endpoint at `/predict` | Optimized for quick, accurate doodle recognition       |
