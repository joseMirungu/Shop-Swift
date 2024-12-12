from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from config import app, db, api
from models import User, Product, Category, CartItem, Order, OrderItem

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
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.authenticate(data['password']):
            return {'error': 'Invalid credentials'}, 401
            
        token = create_access_token(identity=user.id)
        return {'token': token, 'user': user.to_dict()}, 200

# Product Routes
class Products(Resource):
    def get(self):
        category_id = request.args.get('category_id')
        if category_id:
            products = Product.query.filter_by(category_id=category_id).all()
        else:
            products = Product.query.all()
        return [product.to_dict() for product in products]

class ProductById(Resource):
    def get(self, id):
        product = Product.query.get_or_404(id)
        return product.to_dict()

# Category Routes
class Categories(Resource):
    def get(self):
        categories = Category.query.all()
        return [category.to_dict() for category in categories]

# Cart Routes
class CartItems(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        cart_items = CartItem.query.filter_by(user_id=user_id).all()
        return [item.to_dict() for item in cart_items]

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Check if product exists and has enough stock
        product = Product.query.get_or_404(data['product_id'])
        if product.stock < data.get('quantity', 1):
            return {'error': 'Not enough stock available'}, 400
        
        existing_item = CartItem.query.filter_by(
            user_id=user_id, 
            product_id=data['product_id']
        ).first()
        
        try:
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
        user_id = get_jwt_identity()
        cart_item = CartItem.query.get_or_404(id)
        
        if cart_item.user_id != user_id:
            return {'error': 'Unauthorized'}, 401
            
        try:
            db.session.delete(cart_item)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

    @jwt_required()
    def patch(self, id):
        user_id = get_jwt_identity()
        cart_item = CartItem.query.get_or_404(id)
        
        if cart_item.user_id != user_id:
            return {'error': 'Unauthorized'}, 401
            
        data = request.get_json()
        
        try:
            if 'quantity' in data:
                # Check stock availability
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
        user_id = get_jwt_identity()
        orders = Order.query.filter_by(user_id=user_id).all()
        return [order.to_dict() for order in orders]

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        cart_items = CartItem.query.filter_by(user_id=user_id).all()
        
        if not cart_items:
            return {'error': 'Cart is empty'}, 400
            
        # Calculate total and check stock
        total_amount = 0
        for item in cart_items:
            if item.quantity > item.product.stock:
                return {'error': f'Not enough stock for {item.product.name}'}, 400
            total_amount += item.product.price * item.quantity
        
        try:
            # Create order
            order = Order(user_id=user_id, total_amount=total_amount)
            db.session.add(order)
            
            # Create order items and update stock
            for cart_item in cart_items:
                order_item = OrderItem(
                    order=order,
                    product_id=cart_item.product_id,
                    quantity=cart_item.quantity,
                    price=cart_item.product.price
                )
                db.session.add(order_item)
                
                # Update product stock
                cart_item.product.stock -= cart_item.quantity
                
                # Remove cart item
                db.session.delete(cart_item)
            
            db.session.commit()
            return order.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

class OrderById(Resource):
    @jwt_required()
    def get(self, id):
        user_id = get_jwt_identity()
        order = Order.query.get_or_404(id)
        
        if order.user_id != user_id:
            return {'error': 'Unauthorized'}, 401
            
        return order.to_dict()

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

if __name__ == '__main__':
    app.run(port=5555, debug=True)