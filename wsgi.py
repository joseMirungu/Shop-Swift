import os
import sys

# Adjust the path to look in src directory
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.join(current_dir, 'src')
sys.path.insert(0, src_dir)

from app import app

if __name__ == "__main__":
    app.run()