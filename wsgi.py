import os
import sys

# Adjust the path to look in server directory
current_dir = os.path.dirname(os.path.abspath(__file__))
server_dir = os.path.join(current_dir, 'server')
sys.path.insert(0, server_dir)

from app import app

if __name__ == "__main__":
    app.run()