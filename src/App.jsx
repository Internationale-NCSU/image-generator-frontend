import React, { useState, useCallback, useEffect } from 'react';
import { Form, Footer, Header } from './components';
import preview from './assets/preview.png';
import Loader from './assets/loader.gif';



const App = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState({ photo: null, altText: null });
    const [prompt, setPrompt] = useState('');

    const generateImage = useCallback((prompt) => {
        if (!prompt) {
            alert('Please provide proper prompt');
            return;
        }
        setIsGenerating(true);
        fetch('/generate-image-with-comfyui', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        })
        .then(response => response.json())
        .then(data => {
            const { promptId } = data;
            const intervalId = setInterval(() => {
                fetch(`/history/${promptId}`)
                    .then(res => res.json())
                    .then(historyData => {
						console.log('History data:', historyData);
                        if (historyData.filename) {
                            clearInterval(intervalId);
                            setGeneratedImage({
                                photo: `http://127.0.0.1:8188/view?filename=${encodeURIComponent(historyData.filename)}`,
                                altText: prompt
                            });
                            console.log('Image generated:', historyData.filename);
                            setIsGenerating(false);
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching history:', err);
                    });
            }, 5000); // Poll every 5 seconds

            return () => clearInterval(intervalId);
        })
        .catch(err => {
            console.error('Error generating image:', err);
            setIsGenerating(false);
        })
        .finally(() => setPrompt(''));
    }, []);

    const downloadImage = useCallback((imageUrl) => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'downloaded-image'; // Optionally set the downloaded file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return (
        <div className='container'>
            <Header />
            <main className="flex-container">
                <Form generateImage={() => generateImage(prompt)} setPrompt={setPrompt} />
                <div className="image-container">
                    {generatedImage.photo ? (
                        <img
                            src={generatedImage.photo}
                            alt={generatedImage.altText}
                            className="imgg ai-img"
                        />
                    ) : (
                        <img
                            src={preview}
                            alt="Preview"
                            className="imgg preview-img"
                        />
                    )}
                    {isGenerating && (
                        <div className="loader-comp">
                            <img src={Loader} alt="Loading..." className='loader-img' />
                        </div>
                    )}
                    <button
                        className="btn"
                        onClick={() => downloadImage(generatedImage.photo)}
                        disabled={!generatedImage.photo}
                    >
                        Download
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
