from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from typing import Optional
import bcrypt
from datetime import datetime, timedelta
import jwt

app = FastAPI(title="Banking Management System API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class User(BaseModel):
    username: str
    password: str
    full_name: Optional[str] = None
    balance: float = 0.0

class Token(BaseModel):
    access_token: str
    token_type: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Database operations
def load_db():
    try:
        with open('bank_data.json', 'r') as f:
            return json.load(f)
    except:
        return {"users": {}}

def save_db(data):
    with open('bank_data.json', 'w') as f:
        json.dump(data, f, indent=4)

# Authentication
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = load_db()
    user = db["users"].get(form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    if not bcrypt.checkpw(form_data.password.encode(), user["password"].encode()):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_access_token({"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/register")
async def register(user: User):
    db = load_db()
    if user.username in db["users"]:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())
    db["users"][user.username] = {
        "password": hashed_password.decode(),
        "full_name": user.full_name,
        "balance": user.balance
    }
    save_db(db)
    return {"message": "User registered successfully"}

@app.get("/balance")
async def get_balance(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        db = load_db()
        return {"balance": db["users"][username]["balance"]}
    except:
        raise HTTPException(status_code=401, detail="Invalid token")