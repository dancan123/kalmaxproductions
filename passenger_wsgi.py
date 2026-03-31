import sys, os

# Add your project path to sys.path
sys.path.append(os.getcwd())

# Import the FastAPI 'app' from your app.py
from app import app as application
