export async function sendCanvasForPrediction(canvas) {
    const data = canvas.toDataURL('image/png');
    
    const payload = {
        image: data
    };

    const predictionText = document.getElementById('prediction-text');
    predictionText.textContent = "Predicting...";

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        predictionText.textContent = result.prediction;

    } catch (error) {
        console.error("Error:", error);
        predictionText.textContent = "Error predicting...";
    }
}