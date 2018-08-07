// ===========================================
// Puerto
// ===========================================
process.env.PORT = process.env.PORT || 3000;

// ===========================================
// Entorno
// ===========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================================
// Vencimiento del Token
// ===========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';

// ===========================================
// SEED
// ===========================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ===========================================
// Base de datos
// ===========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;

// ===========================================
// Google Client ID
// ===========================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '479961544695-3npvn1vi9g4pjn1ch6cg5432qr1i6pso.apps.googleusercontent.com'