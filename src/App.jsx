import { Form, Footer, Header } from './components';
import preview from './assets/preview.png';
import Loader from './assets/loader.gif'
import { downloadImage } from './utils';

import { useState } from 'react';

const App = () => {

	// const [isLoading, setIsLoading] = useState(false)
	const [isGenerating, setIsGenerating] = useState(false);
	const [generatedImage, setGeneratedImage] = useState({
		photo: null,
		altText: null,
	});

	// const generateImage = async (prompt, setPrompt) => {
	// 	if (prompt) {
	// 		try {
	// 			setIsGenerating(true);
	// 			const response = await fetch(
	// 				'/api',
	// 				{
	// 					method: 'POST',
	// 					headers: {
	// 						'Content-Type': 'application/json',
	// 					},
	// 					body: JSON.stringify({
	// 						prompt,
	// 					}),
	// 				}
	// 			);

	// 			const data = await response.json();
	// 			setGeneratedImage({
	// 				photo: `data:image/jpeg;base64,${data.photo}`,
	// 				altText: prompt,
	// 			});
	// 		} catch (err) {
	// 			alert(err);
	// 		} finally {
	// 			setPrompt('');
	// 			setIsGenerating(false);
	// 		}
	// 	} else {
	// 		alert('Please provide proper prompt');
	// 	}
	// };
	const generateImage = async (prompt, setPrompt) => {
		if (prompt) {
			try{
				setIsGenerating(true);
				fetch('/generate-image-with-comfyui', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ prompt })
				})
				.then(response => response.json())
				.then(data => {
					const promptId = data.promptId;
					// 轮询历史端点直到图片生成完成
					const intervalId = setInterval(() => {
						fetch(`/history/${promptId}`)
							.then(res => res.json())
							.then(historyData => {
								if (historyData.filename) {
									clearInterval(intervalId);
									setGeneratedImage({
										photo: `/view?filename=${encodeURIComponent(historyData.filename)}`,
										altText: prompt
									});
									console.log('Image generated:', historyData.filename);
									setIsGenerating(false);
								}
							});
					}, 5000); // 每5秒查询一次
				})
				.catch(err => {
					console.error('Error generating image:', err);
					setIsGenerating(false);
				});
			} catch (err) {
				alert(err);
			} finally {
				setPrompt('');
				setIsGenerating(false);
			}
		} else {
			alert('Please provide proper prompt');
		}
	};

	 // 下载图片的功能
	 const downloadImage = (imageUrl) => {
        if (!imageUrl) return;
		console.log("imageUrl: ", imageUrl);
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'download'; // 可以指定下载图片的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


	return (
		<div className='container'>
			<Header />
			<main className="flex-container">
				<Form generateImage={generateImage} prompt={prompt} />
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
							alt="preview"
							className="imgg preview-img"
						/>
					)}

					{isGenerating && (
						<div className="loader-comp">
							<img src={Loader} alt="" className='loader-img' />
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
