from app import app
from models import db, User, Product, Category, Review
import random

def seed_data():
    with app.app_context():
        print("Clearing existing data...")
        db.drop_all()
        db.create_all()
        
        print("Creating categories...")
        categories = [
            Category(
                name="Electronics",
                description="Electronic devices and gadgets",
                image_url="/api/placeholder/200/200"
            ),
            Category(
                name="Clothing",
                description="Fashion and apparel",
                image_url="/api/placeholder/200/200"
            ),
            Category(
                name="Home & Kitchen",
                description="Home and kitchen essentials",
                image_url="/api/placeholder/200/200"
            ),
            Category(
                name="Books",
                description="Books and educational materials",
                image_url="/api/placeholder/200/200"
            ),
            Category(
                name="Sports",
                description="Sports and outdoor equipment",
                image_url="/api/placeholder/200/200"
            )
        ]
        db.session.add_all(categories)
        db.session.commit()
        
        print("Creating products...")
        products = []
        
        # Electronics Products
        electronics_products = [
            {
                "name": "Smartphone Pro Max",
                "description": "Latest flagship smartphone with advanced features",
                "price": 999.99,
                "stock": 50,
                "image_url": "https://images.unsplash.com/photo-1517765371796-5bd3a7d30a29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
                "category": categories[0],
                "sku": "ELEC001",
                "weight": 0.2,
                "dimensions": "15x7x1"
            },
            {
                "name": "Wireless Earbuds",
                "description": "High-quality wireless earbuds with noise cancellation",
                "price": 149.99,
                "stock": 100,
                "image_url": "https://images.unsplash.com/photo-1648447272271-1c2292144c50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpcmVsZXNzJTIwZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
                "category": categories[0],
                "sku": "ELEC002",
                "weight": 0.1,
                "dimensions": "5x5x3"
            },
            {
                "name": "Smart Watch",
                "description": "Feature-rich smartwatch with health tracking",
                "price": 299.99,
                "stock": 75,
                "image_url": "https://images.unsplash.com/photo-1523395451704-22c6fb0522cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
                "category": categories[0],
                "sku": "ELEC003",
                "weight": 0.15,
                "dimensions": "4x4x2"
            }
        ]
        products.extend([Product(**p) for p in electronics_products])
        
        # Clothing Products
        clothing_products = [
            {
                "name": "Classic T-Shirt",
                "description": "Comfortable cotton t-shirt",
                "price": 19.99,
                "stock": 200,
                "image_url": "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNsYXNzaWMlMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D",
                "category": categories[1],
                "sku": "CLO001",
                "weight": 0.2,
                "dimensions": "30x20x2"
            },
            {
                "name": "Denim Jeans",
                "description": "Classic fit denim jeans",
                "price": 49.99,
                "stock": 150,
                "image_url": "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRlbmltJTIwamVhbnN8ZW58MHx8MHx8fDA%3D",
                "category": categories[1],
                "sku": "CLO002",
                "weight": 0.5,
                "dimensions": "40x30x5"
            }
        ]
        products.extend([Product(**p) for p in clothing_products])
        
        # Home & Kitchen Products
        home_products = [
            {
                "name": "Coffee Maker",
                "description": "Programmable coffee maker with timer",
                "price": 79.99,
                "stock": 60,
                "image_url": "https://media.istockphoto.com/id/1402014660/photo/morning-routine.jpg?s=2048x2048&w=is&k=20&c=Ps78g7G6739uBWvh7KJ3qvLFQXtBAmD2pIqCbcBmvGU=",
                "category": categories[2],
                "sku": "HOME001",
                "weight": 2.5,
                "dimensions": "25x20x35"
            },
            {
                "name": "Blender",
                "description": "High-powered blender for smoothies and more",
                "price": 129.99,
                "stock": 45,
                "image_url": "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "category": categories[2],
                "sku": "HOME002",
                "weight": 3.0,
                "dimensions": "20x20x40"
            }
        ]
        products.extend([Product(**p) for p in home_products])
        
        # Books
        book_products = [
            {
                "name": "Python Programming Guide",
                "description": "Comprehensive guide to Python programming",
                "price": 39.99,
                "stock": 100,
                "image_url": "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHl0aG9uJTIwcHJvZ3JhbW1pbmclMjBndWlkZXxlbnwwfHwwfHx8MA%3D%3D",
                "category": categories[3],
                "sku": "BOOK001",
                "weight": 0.8,
                "dimensions": "25x20x3"
            },
            {
                "name": "Web Development Basics",
                "description": "Learn the fundamentals of web development",
                "price": 44.99,
                "stock": 85,
                "image_url": "https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnQlMjBiYXNpY3MlMjBib29rfGVufDB8fDB8fHww",
                "category": categories[3],
                "sku": "BOOK002",
                "weight": 0.9,
                "dimensions": "25x20x3"
            }
        ]
        products.extend([Product(**p) for p in book_products])
        
        # Sports Products
        sports_products = [
            {
                "name": "Yoga Mat",
                "description": "Non-slip exercise yoga mat",
                "price": 29.99,
                "stock": 120,
                "image_url": "https://media.istockphoto.com/id/2170986614/photo/yoga-mat.webp?a=1&b=1&s=612x612&w=0&k=20&c=uC56s5n3DCO1q-wLdLIvy67lXkwWG6rXQpRFy0vkhAE=",
                "category": categories[4],
                "sku": "SPORT001",
                "weight": 1.0,
                "dimensions": "180x60x0.5"
            },
            {
                "name": "Dumbbell Set",
                "description": "Adjustable dumbbell set with stand",
                "price": 199.99,
                "stock": 30,
                "image_url": "https://media.istockphoto.com/id/155161684/photo/fifteen-pound-hand-weights.webp?a=1&b=1&s=612x612&w=0&k=20&c=j9dkFtC0pwXIxno63q37iGcXo23Oi2-nJYUKKqUs1P8=",
                "category": categories[4],
                "sku": "SPORT002",
                "weight": 20.0,
                "dimensions": "40x20x20"
            }
        ]
        products.extend([Product(**p) for p in sports_products])
        
        db.session.add_all(products)
        
        print("Creating test users...")
        test_user = User(
            username="testuser",
            email="test@example.com",
            first_name="Test",
            last_name="User",
            address="123 Test St, Test City, 12345",
            phone="123-456-7890"
        )
        test_user.password_hash = "password123"
        
        admin_user = User(
            username="admin",
            email="admin@example.com",
            first_name="Admin",
            last_name="User",
            address="456 Admin St, Admin City, 12345",
            phone="098-765-4321"
        )
        admin_user.password_hash = "admin123"
        
        db.session.add_all([test_user, admin_user])
        
        print("Creating product reviews...")
        # Add some sample reviews
        for product in products:
            num_reviews = random.randint(3, 8)
            for _ in range(num_reviews):
                review = Review(
                    user=test_user if random.random() < 0.5 else admin_user,
                    product=product,
                    rating=random.randint(3, 5),
                    comment=f"Great product! Review #{random.randint(1000, 9999)}"
                )
                db.session.add(review)
        
        db.session.commit()
        print("Seeding completed successfully!")

if __name__ == '__main__':
    seed_data()
