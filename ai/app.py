import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CropGuard-AI")

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "plant_disease_mobilenetv2 .h5")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    logger.info(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    logger.error(f"Failed to load model: {e}")

# Define class names
CLASS_NAMES = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites_Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

@app.get("/")
async def root():
    return {"message": "CropGuard AI Model Server is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image
    content = await file.read()
    image = Image.open(io.BytesIO(content)).convert('RGB')
    
    # Preprocess image
    image = image.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = tf.expand_dims(img_array, 0)
    
    # MobileNetV2 usually expects [-1, 1] normalization
    # If the model was trained with 1/255.0, change this back
    img_array = (img_array / 127.5) - 1.0 
    
    # Predict
    predictions = model.predict(img_array)
    
    # Get highest confidence class
    class_idx = np.argmax(predictions[0])
    confidence = float(predictions[0][class_idx])
    class_name = CLASS_NAMES[class_idx]
    
    logger.info(f"Predicted: {class_name} with confidence {confidence:.4f}")
    
    # Debug: Log top 3 predictions
    top_indices = np.argsort(predictions[0])[-3:][::-1]
    for idx in top_indices:
        logger.info(f"  - {CLASS_NAMES[idx]}: {predictions[0][idx]:.4f}")
    
    # Map to our frontend IDs
    predicted_id = map_to_disease_id(class_name)
    is_healthy = "healthy" in class_name.lower()
    
    return {
        "class_name": class_name,
        "disease_id": predicted_id,
        "confidence": confidence,
        "is_healthy": is_healthy
    }

def map_to_disease_id(class_name: str):
    mapping = {
        "Pepper__bell___Bacterial_spot": "pepper-bacterial-spot",
        "Potato___Early_blight": "potato-early-blight",
        "Potato___Late_blight": "potato-late-blight",
        "Tomato___Bacterial_spot": "tomato-bacterial-spot",
        "Tomato___Early_blight": "tomato-early-blight",
        "Tomato___Late_blight": "tomato-late-blight",
        "Tomato___Leaf_Mold": "tomato-leaf-mold",
        "Tomato___Septoria_leaf_spot": "tomato-septoria-leaf-spot",
        "Tomato___Spider_mites_Two-spotted_spider_mite": "tomato-spider-mites",
        "Tomato___Target_Spot": "tomato-target-spot",
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "tomato-yellow-leaf-curl",
        "Tomato___Tomato_mosaic_virus": "tomato-mosaic-virus",
        # Default healthy mappings
        "Potato___healthy": "healthy",
        "Tomato___healthy": "healthy",
        "Pepper__bell___healthy": "healthy"
    }
    return mapping.get(class_name, "unknown")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
