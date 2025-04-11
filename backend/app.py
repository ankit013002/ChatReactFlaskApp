import socketio
import threading
from dotenv import load_dotenv
import os

load_dotenv("../host.env")

HOST_IP = os.getenv("HOST")
PORT = os.getenv("PORT")

sio = socketio.Client()

username = input("Enter your name: ")

@sio.on("connect")
def on_connect():
    print("Connected to server")
    sio.send(f"{username} has joined the chat.")
    threading.Thread(target=send_message, daemon=True).start()

@sio.on("message")
def on_message(data):
    print(data)

def send_message():
    while True:
        msg = input()
        sio.send(f"{username}: {msg}")

sio.connect(f"http://{HOST_IP}:{PORT}")
sio.wait()
