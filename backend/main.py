from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
from PIL import Image
import numpy as np
import base64
import io
import json
from contextlib import asynccontextmanager


# ─────────────────────────────────────────────────────────────────────────────
# Pydantic model for incoming POST request payload
class Doodle(BaseModel):
    image: str  # Base64-encoded image string (data URL format)


# ─────────────────────────────────────────────────────────────────────────────
# App lifespan: Load model and class names on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load trained Keras model (skip compiling to speed up loading)
    app.state.model = tf.keras.models.load_model(
        "model.7220251_01.keras", compile=False
    )

    # load class names
    with open("class_names.json", "r") as f:
        app.state.CLASSES = json.load(f)

    yield 


# ─────────────────────────────────────────────────────────────────────────────
# Initialize FastAPI app with lifespan context
app = FastAPI(lifespan=lifespan)

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #TODO : change this to frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─────────────────────────────────────────────────────────────────────────────
# Prediction endpoint
@app.post("/predict")
async def predict(request: Request, doodle: Doodle):
    """
    Accepts a base64-encoded PNG image from the client,
    preprocesses it for the model, and returns the predicted label.
    """
    model = request.app.state.model
    CLASSES = request.app.state.CLASSES

    # Extract and decode base64 PNG image from data URL
    img_data = base64.b64decode(doodle.image.split(",")[1])

    # Open image, convert to grayscale, resize to model input size
    img = Image.open(io.BytesIO(img_data)).convert("L").resize((64, 64))

    # Convert image to normalized NumPy array and reshape for model
    img_array = np.array(img).astype("float32") / 255.0
    img_array = img_array.reshape(1, 64, 64, 1)

    # Run prediction
    preds = model.predict(img_array)
    pred_index = np.argmax(preds)
    label = CLASSES[pred_index]

    # Debug prints 
    # print("Preds:", preds[0])
    # print("Argmax:", pred_index)
    # print("Label:", label)

    return {"prediction": label}
