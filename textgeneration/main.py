from PIL import Image
import io

from fastapi import FastAPI, UploadFile, File

from starlette.middleware.cors import CORSMiddleware

from try_llava import eval_model

app=FastAPI()

origins= ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/dl/generation")
async def generation(images: List[UploadFile] = File(...)):
    try:
        file_data = await [images.file.read() for image in images]
        infer_image = Image.open(io.BytesIO(file_data[0])).convert('RGB')
        file_name = images[0].filename
    except Exception:
        return {"message": "There was an error uploading file"}
    finally:
        result = eval_model(infer_image)
    return {"generation_result": {file_name:result}}

"""
@app.post("/dl/generation")
async def generation(images: bytes = File(...)):
        file_data = Image.open(io.BytesIO(images)).convert("RGB")
        try:
            result = eval_model(file_data)
            return {"result":result}
        except Exception:
            return {"message":"There was an error"}

"""
