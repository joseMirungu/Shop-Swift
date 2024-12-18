import os
import sys
from pathlib import Path


from server.seed import seed_data
seed_data()

# Get absolute paths
root_dir = Path(__file__).resolve().parent
server_dir = root_dir / 'server'

# Add both root and server directories to Python path
sys.path.insert(0, str(root_dir))
sys.path.insert(0, str(server_dir))

from app import app

# Add CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Debug endpoint to verify paths
@app.route('/api/debug-paths')
def debug_paths():
    return {
        'root_dir': str(root_dir),
        'server_dir': str(server_dir),
        'current_working_dir': os.getcwd(),
        'static_folder': app.static_folder,
        'python_path': sys.path[:3],
        'build_exists': os.path.exists(str(root_dir / 'client' / 'build')),
        'index_exists': os.path.exists(str(root_dir / 'client' / 'build' / 'index.html')),
    }


if __name__ == "__main__":
    app.run()