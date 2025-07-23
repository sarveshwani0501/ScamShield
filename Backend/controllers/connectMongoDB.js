const mongoose  = require('mongoose')
 async function connectMongoDB(dbURL){
    try {
        const res = await mongoose.connect(dbURL);
        console.log("Connected to MongoDB Atlas", res.connection.host);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });
        
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    
}}

module.exports = { connectMongoDB }