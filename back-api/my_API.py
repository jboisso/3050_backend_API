from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def get_hello_world():
    return "Hallo Welt"

@app.get("/cap")
def get_caps(text: str, caps: bool = True):
    if caps:
        return text.upper()
    else:
        return text