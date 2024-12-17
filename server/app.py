from flask import request, jsonify, make_response, send_from_directory
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import os
from config import app, db, api
from models import User, Product, Category, CartItem, Order, OrderItem

# Configure CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Updated CORS config

# Update database configuration for production
database_url = os.environ.get('DATABASE_URL')
if database_url:
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# Replace your current static file config with this:
if os.environ.get('FLASK_ENV') == 'production':
    app.static_folder = os.path.join('client', 'build', 'static')
    app.static_url_path = '/static'

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path.startswith('api'):
            return {'error': 'Not Found'}, 404
        try:
            # First try to serve static files
            if path and os.path.exists(os.path.join('client', 'build', path)):
                return send_from_directory(os.path.join('client', 'build'), path)
            # Default to index.html
            return send_from_directory(os.path.join('client', 'build'), 'index.html')
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found_error(error):
    if request.path.startswith('/api/'):
        return jsonify({"error": "API endpoint not found"}), 404
    try:
        return send_from_directory(os.path.join('client', 'build'), 'index.html')
    except:
        return jsonify({"error": "Not Found"}), 404
    
# User Authentication Routes
class Signup(Resource):
    def post(self):
        data = request.get_json()
        
        if User.query.filter_by(email=data['email']).first():
            return {'error': 'Email already exists'}, 400
            
        if User.query.filter_by(username=data['username']).first():
            return {'error': 'Username already exists'}, 400
            
        user = User(
            username=data['username'],
            email=data['email']
        )
        user.password_hash = data['password']
        
        try:
            db.session.add(user)
            db.session.commit()
            token = create_access_token(identity=user.id)
            return {'token': token, 'user': user.to_dict()}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            user = User.query.filter_by(email=data['email']).first()
            
            if not user or not user.authenticate(data['password']):
                return {'error': 'Invalid credentials'}, 401
                
            token = create_access_token(identity=user.id)
            return {'token': token, 'user': user.to_dict()}, 200
        except Exception as e:
            return {'error': str(e)}, 400

# Product Routes
class Products(Resource):
    def get(self):
        try:
            category_id = request.args.get('category_id')
            if category_id:
                products = Product.query.filter_by(category_id=category_id).all()
            else:
                products = Product.query.all()
            return [product.to_dict() for product in products]
        except Exception as e:
            return {'error': str(e)}, 400

class ProductById(Resource):
    def get(self, id):
        try:
            product = Product.query.get_or_404(id)
            return product.to_dict()
        except Exception as e:
            return {'error': str(e)}, 404

# Category Routes
class Categories(Resource):
    def get(self):
        try:
            categories = Category.query.all()
            return [category.to_dict() for category in categories]
        except Exception as e:
            return {'error': str(e)}, 400

# Cart Routes
class CartItems(Resource):
    @jwt_required()
    def get(self):
        try:
            user_id = get_jwt_identity()
            cart_items = CartItem.query.filter_by(user_id=user_id).all()
            return [item.to_dict() for item in cart_items]
        except Exception as e:
            return {'error': str(e)}, 400

    @jwt_required()
    def post(self):
        try:
            user_id = get_jwt_identity()
            data = request.get_json()
            
            product = Product.query.get_or_404(data['product_id'])
            if product.stock < data.get('quantity', 1):
                return {'error': 'Not enough stock available'}, 400
            
            existing_item = CartItem.query.filter_by(
                user_id=user_id, 
                product_id=data['product_id']
            ).first()
            
            if existing_item:
                existing_item.quantity += data.get('quantity', 1)
            else:
                cart_item = CartItem(
                    user_id=user_id,
                    product_id=data['product_id'],
                    quantity=data.get('quantity', 1)
                )
                db.session.add(cart_item)
                
            db.session.commit()
            return {'message': 'Item added to cart'}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

class CartItemDetail(Resource):
    @jwt_required()
    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            cart_item = CartItem.query.get_or_404(id)
            
            if cart_item.user_id != user_id:
                return {'error': 'Unauthorized'}, 401
                
            db.session.delete(cart_item)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

    @jwt_required()
    def patch(self, id):
        try:
            user_id = get_jwt_identity()
            cart_item = CartItem.query.get_or_404(id)
            
            if cart_item.user_id != user_id:
                return {'error': 'Unauthorized'}, 401
                
            data = request.get_json()
            
            if 'quantity' in data:
                if data['quantity'] > cart_item.product.stock:
                    return {'error': 'Not enough stock available'}, 400
                cart_item.quantity = data['quantity']
            
            db.session.commit()
            return cart_item.to_dict()
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

# Order Routes
class Orders(Resource):
    @jwt_required()
    def get(self):
        try:
            user_id = get_jwt_identity()
            orders = Order.query.filter_by(user_id=user_id).all()
            return [order.to_dict() for order in orders]
        except Exception as e:
            return {'error': str(e)}, 400

    @jwt_required()
    def post(self):
        try:
            user_id = get_jwt_identity()
            cart_items = CartItem.query.filter_by(user_id=user_id).all()
            
            if not cart_items:
                return {'error': 'Cart is empty'}, 400
                
            total_amount = 0
            for item in cart_items:
                if item.quantity > item.product.stock:
                    return {'error': f'Not enough stock for {item.product.name}'}, 400
                total_amount += item.product.price * item.quantity
            
            order = Order(user_id=user_id, total_amount=total_amount)
            db.session.add(order)
            
            for cart_item in cart_items:
                order_item = OrderItem(
                    order=order,
                    product_id=cart_item.product_id,
                    quantity=cart_item.quantity,
                    price=cart_item.product.price
                )
                db.session.add(order_item)
                cart_item.product.stock -= cart_item.quantity
                db.session.delete(cart_item)
            
            db.session.commit()
            return order.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

class OrderById(Resource):
    @jwt_required()
    def get(self, id):
        try:
            user_id = get_jwt_identity()
            order = Order.query.get_or_404(id)
            
            if order.user_id != user_id:
                return {'error': 'Unauthorized'}, 401
                
            return order.to_dict()
        except Exception as e:
            return {'error': str(e)}, 404
@app.errorhandler(404)
def not_found_error(error):
    if request.path.startswith('/api/'):
        return jsonify({"error": "API endpoint not found"}), 404
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({"error": "Internal Server Error"}), 500

# Add resources to API
api.add_resource(Signup, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(Products, '/api/products')
api.add_resource(ProductById, '/api/products/<int:id>')
api.add_resource(Categories, '/api/categories')
api.add_resource(CartItems, '/api/cart')
api.add_resource(CartItemDetail, '/api/cart/<int:id>')
api.add_resource(Orders, '/api/orders')
api.add_resource(OrderById, '/api/orders/<int:id>')

@app.route('/health')
def health_check():
    try:
        db.session.execute('SELECT 1')
        return jsonify({
            'status': 'healthy',
            'database': 'connected'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e)
        }), 500

# CORS headers 
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))
    app.run(host='0.0.0.0', port=port)