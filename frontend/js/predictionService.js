let dotInterval = null;

function startPredictingAnimation() {
    const predictionText = document.getElementById('prediction-text');
    let dotCount = 0;

    predictionText.textContent = "Predicting";

    clearInterval(dotInterval);
    dotInterval = setInterval(() => { 
        dotCount = (dotCount + 1) % 4; 
        predictionText.textContent = "Predicting" + '.'.repeat(dotCount);
    }, 350) 
}

export function stopPredictingAnimation(finalText) {
    clearInterval(dotInterval);
    dotInterval = null;

    const predictionText = document.getElementById('prediction-text');
    predictionText.textContent = finalText;
}

export async function sendCanvasForPrediction(canvas) {
    const data = canvas.toDataURL('image/png');
    
    const payload = {
        image: data
    };

    const predictionText = document.getElementById('prediction-text');

    startPredictingAnimation();
    
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
        stopPredictingAnimation(result.prediction);

    } catch (error) {
        console.error("Error:", error);
        predictionText.textContent = "Error predicting...";
    }
}