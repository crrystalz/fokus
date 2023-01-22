from pymongo import MongoClient

# Connect to the MongoDB server
client = MongoClient("mongodb://localhost:27017/")

# Select the database
db = client.mydatabase

# Create a new collection
db.create_collection("users")

print("Collection created successfully")
