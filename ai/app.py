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
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
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
    
    if class_idx < len(CLASS_NAMES):
        class_name = CLASS_NAMES[class_idx]
    else:
        class_name = "Unknown"
    
    logger.info(f"Predicted: {class_name} with confidence {confidence:.4f}")
    
    # Debug: Log top 3 predictions
    top_indices = np.argsort(predictions[0])[-3:][::-1]
    for idx in top_indices:
        if idx < len(CLASS_NAMES):
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
        # Apple
        "Apple___Apple_scab": "apple-scab",
        "Apple___Black_rot": "apple-black-rot",
        "Apple___Cedar_apple_rust": "apple-cedar-rust", # Not in frontend yet
        "Apple___healthy": "apple-healthy",
        
        # Blueberry
        "Blueberry___healthy": "blueberry-healthy",
        
        # Cherry
        "Cherry_(including_sour)___Powdery_mildew": "cherry-powdery-mildew",
        "Cherry_(including_sour)___healthy": "cherry-healthy",
        
        # Corn
        "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot": "corn-gray-leaf-spot",
        "Corn_(maize)___Common_rust_": "corn-common-rust",
        "Corn_(maize)___Northern_Leaf_Blight": "corn-northern-leaf-blight",
        "Corn_(maize)___healthy": "corn-healthy",
        
        # Grape
        "Grape___Black_rot": "grape-black-rot",
        "Grape___Esca_(Black_Measles)": "grape-esca",
        "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "grape-leaf-blight",
        "Grape___healthy": "grape-healthy",
        
        # Orange
        "Orange___Haunglongbing_(Citrus_greening)": "orange-citrus-greening",
        
        # Peach
        "Peach___Bacterial_spot": "peach-bacterial-spot",
        "Peach___healthy": "peach-healthy",
        
        # Pepper
        "Pepper,_bell___Bacterial_spot": "pepper-bacterial-spot",
        "Pepper,_bell___healthy": "pepper-healthy",
        
        # Potato
        "Potato___Early_blight": "potato-early-blight",
        "Potato___Late_blight": "potato-late-blight",
        "Potato___healthy": "potato-healthy",
        
        # Raspberry
        "Raspberry___healthy": "raspberry-healthy", # Not in frontend yet
        
        # Soybean
        "Soybean___healthy": "soybean-healthy",
        
        # Squash
        "Squash___Powdery_mildew": "squash-powdery-mildew",
        
        # Strawberry
        "Strawberry___Leaf_scorch": "strawberry-leaf-scorch",
        "Strawberry___healthy": "strawberry-healthy",
        
        # Tomato
        "Tomato___Bacterial_spot": "tomato-bacterial-spot",
        "Tomato___Early_blight": "tomato-early-blight",
        "Tomato___Late_blight": "tomato-late-blight",
        "Tomato___Leaf_Mold": "tomato-leaf-mold",
        "Tomato___Septoria_leaf_spot": "tomato-septoria-leaf-spot",
        "Tomato___Spider_mites_Two-spotted_spider_mite": "tomato-spider-mites",
        "Tomato___Target_Spot": "tomato-target-spot",
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "tomato-yellow-leaf-curl",
        "Tomato___Tomato_mosaic_virus": "tomato-mosaic-virus",
        "Tomato___healthy": "tomato-healthy",
    }
    return mapping.get(class_name, "unknown")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
