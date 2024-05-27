const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');
const WebSocket = require('ws');
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(express.static(path.resolve(__dirname, './build')));

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

let jsonData = {
    "client_id": "b5ba6e9e33eb40acbeee13966b404953",
    "prompt": {
		"3": {
			"inputs": {
			"seed": 156680208700286,
			"steps": 40,
			"cfg": 2,
			"sampler_name": "euler",
			"scheduler": "normal",
			"denoise": 1,
			"model": [
				"11",
				0
			],
			"positive": [
				"6",
				0
			],
			"negative": [
				"7",
				0
			],
			"latent_image": [
				"5",
				0
			]
			},
			"class_type": "KSampler",
			"_meta": {
			"title": "KSampler"
			}
		},
		"4": {
			"inputs": {
			"ckpt_name": "playground-v2.5-1024px-aesthetic.fp16.safetensors"
			},
			"class_type": "CheckpointLoaderSimple",
			"_meta": {
			"title": "Load Checkpoint"
			}
		},
		"5": {
			"inputs": {
			"width": 1024,
			"height": 1024,
			"batch_size": 1
			},
			"class_type": "EmptyLatentImage",
			"_meta": {
			"title": "Empty Latent Image"
			}
		},
		"6": {
			"inputs": {
			"text": "beautiful scenery nature glass bottle landscape, purple galaxy bottle,",
			"clip": [
				"4",
				1
			]
			},
			"class_type": "CLIPTextEncode",
			"_meta": {
			"title": "CLIP Text Encode (Prompt)"
			}
		},
		"7": {
			"inputs": {
			"text": "text, watermark",
			"clip": [
				"4",
				1
			]
			},
			"class_type": "CLIPTextEncode",
			"_meta": {
			"title": "CLIP Text Encode (Prompt)"
			}
		},
		"8": {
			"inputs": {
			"samples": [
				"3",
				0
			],
			"vae": [
				"4",
				2
			]
			},
			"class_type": "VAEDecode",
			"_meta": {
			"title": "VAE Decode"
			}
		},
		"10": {
			"inputs": {},
			"class_type": "PreviewImage",
			"_meta": {
			"title": "40 Steps, 2.0 CFG"
			}
		},
		"11": {
			"inputs": {
			"sampling": "edm_playground_v2.5",
			"sigma_max": 120,
			"sigma_min": 0.002,
			"model": [
				"4",
				0
			]
			},
			"class_type": "ModelSamplingContinuousEDM",
			"_meta": {
			"title": "ModelSamplingContinuousEDM"
			}
		},
		"12": {
			"inputs": {
			"seed": 156680208700286,
			"steps": 40,
			"cfg": 4,
			"sampler_name": "euler",
			"scheduler": "normal",
			"denoise": 1,
			"model": [
				"11",
				0
			],
			"positive": [
				"6",
				0
			],
			"negative": [
				"7",
				0
			],
			"latent_image": [
				"5",
				0
			]
			},
			"class_type": "KSampler",
			"_meta": {
			"title": "KSampler"
			}
		},
		"13": {
			"inputs": {
			"samples": [
				"12",
				0
			],
			"vae": [
				"4",
				2
			]
			},
			"class_type": "VAEDecode",
			"_meta": {
			"title": "VAE Decode"
			}
		},
		"14": {
			"inputs": {
			"images": [
				"13",
				0
			]
			},
			"class_type": "PreviewImage",
			"_meta": {
			"title": "40 Steps, 4.0 CFG"
			}
		},
		"15": {
			"inputs": {
			"seed": 156680208700286,
			"steps": 20,
			"cfg": 2,
			"sampler_name": "euler",
			"scheduler": "normal",
			"denoise": 1,
			"model": [
				"11",
				0
			],
			"positive": [
				"6",
				0
			],
			"negative": [
				"7",
				0
			],
			"latent_image": [
				"5",
				0
			]
			},
			"class_type": "KSampler",
			"_meta": {
			"title": "KSampler"
			}
		},
		"16": {
			"inputs": {
			"samples": [
				"15",
				0
			],
			"vae": [
				"4",
				2
			]
			},
			"class_type": "VAEDecode",
			"_meta": {
			"title": "VAE Decode"
			}
		},
		"17": {
			"inputs": {
			"images": [
				"16",
				0
			]
			},
			"class_type": "PreviewImage",
			"_meta": {
			"title": "20 Steps, 2.0 CFG"
			}
		},
		"18": {
			"inputs": {
			"seed": 156680208700286,
			"steps": 40,
			"cfg": 2.5,
			"sampler_name": "euler",
			"scheduler": "normal",
			"denoise": 1,
			"model": [
				"21",
				0
			],
			"positive": [
				"6",
				0
			],
			"negative": [
				"7",
				0
			],
			"latent_image": [
				"5",
				0
			]
			},
			"class_type": "KSampler",
			"_meta": {
			"title": "KSampler"
			}
		},
		"19": {
			"inputs": {
			"samples": [
				"18",
				0
			],
			"vae": [
				"4",
				2
			]
			},
			"class_type": "VAEDecode",
			"_meta": {
			"title": "VAE Decode"
			}
		},
		"20": {
			"inputs": {
			"images": [
				"19",
				0
			]
			},
			"class_type": "PreviewImage",
			"_meta": {
			"title": "40 Steps, 2.5 CFG, 0.8 RescaledCFG"
			}
		},
		"21": {
			"inputs": {
			"multiplier": 0.8,
			"model": [
				"11",
				0
			]
			},
			"class_type": "RescaleCFG",
			"_meta": {
			"title": "RescaleCFG"
			}
		},
		"22": {
			"inputs": {
			"filename_prefix": "ComfyUI",
			"images": [
				"8",
				0
			]
			},
			"class_type": "SaveImage",
			"_meta": {
			"title": "Save Image"
			}
		}
	}   
}

app.post('/api', async (req, res) => {
	try {
		const { prompt } = req.body;
		const response = await openai.images.generate({
			prompt,
			n: 1,
			size: '1024x1024',
			response_format: 'b64_json',
		});

		const image = response.data[0].b64_json;
		res.status(200).json({ photo: image });
	} catch (error) {
		console.error(error);
	}
});

app.post('/generate-image-with-comfyui', async (req, res) => {
    const { prompt } = req.body;

    // 检查 prompt 是否有效
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    // WebSocket 服务器的地址
    const wsUrl = 'ws://127.0.0.1:8188/ws';
    const ws = new WebSocket(wsUrl);

    ws.on('open', function open() {
        console.log('WebSocket 连接已建立。');
    });

    ws.on('message', function incoming(data) {
        const response = JSON.parse(data);
		console.log('Received message:', data);
		jsonData.prompt[6].inputs.text = prompt;
        // 获取 sid 并发送 prompt 请求
        if (response.data.sid) {
            const clientId = response.data.sid;
			jsonData.sid = clientId;
			console.log("sid: ", clientId);
			console.log("jsonData sid: ", jsonData.sid);
			console.log("jsonData prompt: ", jsonData.prompt[6].inputs.text);
            fetch('http://127.0.0.1:8188/prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            }).then(resp => resp.json())
              .then(data => {
                  if (data.prompt_id) {
                      res.json({ promptId: data.prompt_id });
                  }
              });
            ws.close();
        }
    });

    ws.on('error', function error(err) {
        console.error('WebSocket error:', err);
        res.status(500).json({ error: 'WebSocket connection error' });
    });
});

app.get('/history/:promptId', async (req, res) => {
    const { promptId } = req.params;
    fetch(`http://127.0.0.1:8188/history/${promptId}`)
        .then(resp => resp.json())
        .then(data => {
            const latestImage = data[promptId].outputs[Object.keys(data[promptId].outputs).pop()].images[0].filename;
            res.json({ filename: latestImage });
			
        })
        .catch(err => {
            console.error('Error retrieving history:', err);
            res.status(500).json({ error: 'Error retrieving image history' });
        });
}); 

app.get('/view', async (req, res) => {
    const { filename } = req.query;  // 从查询参数中获取 filename
    if (!filename) {
        return res.status(400).send('Filename parameter is required');
    }

    const comfyUIUrl = `http://127.0.0.1:8188/view?filename=${encodeURIComponent(filename)}`;
	console.log("comfyUIUrl: ", comfyUIUrl);
    try {
        const response = await fetch(comfyUIUrl);  // 向 ComfyUI 发送请求
        if (!response.ok) {
            throw new Error('Failed to fetch from ComfyUI');
        }

        const contentType = response.headers.get('content-type'); // 获取内容类型
        response.body.pipe(res).on('error', (err) => {
            // 在传输中处理任何错误
            console.error('Error streaming the image:', err);
            res.status(500).send('Failed to stream image');
        });

        res.setHeader('Content-Type', contentType); // 确保内容类型正确设置
    } catch (error) {
        console.error('Error fetching image from ComfyUI:', error);
        res.status(500).send('Error fetching image');
    }
});
const startServer = async () => {
	app.listen(8080, () => console.log('Server started on port 8080'));
};

startServer();
