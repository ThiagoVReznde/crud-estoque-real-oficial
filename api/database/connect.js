import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// 1. Definição do URI (Do arquivo .env)
const MONGODB_URI = process.env.MONGO_URI;

// 2. Cache Global
// Isso impede que o Vercel crie 100 conexões se 100 pessoas entrarem no site.
// Ele reaproveita a conexão aberta.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// 3. A Função de Conexão
export async function connectDB() {
    if (cached.conn) {
      console.log("Using cached connection");
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = {
      bufferCommands: false,
    };
  
      console.log("⏳ Tentando conectar ao MongoDB..."); // <--- LOG NOVO
      console.log(`📡 URI: ${process.env.MONGO_URI.substring(0, 20)}...`); // <--- Mostra o começo da URI para ver se leu o .env
  
      cached.promise = mongoose.connect(process.env.MONGO_URI, opts)
        .then((mongoose) => {
          console.log("✅ Conexão estabelecida com sucesso!");
          return mongoose;
        })
        .catch((err) => { // <--- CATCH IMPORTANTE
          console.error("❌ Erro ao conectar no Mongoose:", err.message);
          throw err;
        });
    }
  
    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  
    return cached.conn;
  }