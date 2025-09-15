import httpx
import openai
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 或指定你的前端地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 推荐用环境变量存储敏感信息
OPENAI_API_KEY = ""  # 建议用 os.getenv("OPENAI_API_KEY")
OPENAI_BASE_URL = ""  # 你的大模型服务URL
MODEL_NAME = ""

client = openai.OpenAI(
    api_key=OPENAI_API_KEY,
    base_url=OPENAI_BASE_URL,
    http_client=httpx.Client(verify=False),
)


@app.post("/api/llm/stream")
async def llm_stream(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")

    def stream():
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[{"role": "user", "content": prompt}],
            stream=True,
        )
        for chunk in response:
            content = chunk.choices[0].delta.content
            if content:
                yield content

    return StreamingResponse(stream(), media_type="text/plain")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7890, lifespan="on", log_level="debug")
    # {"prompts": [{"role": "user", "content": "Hello"}]}
