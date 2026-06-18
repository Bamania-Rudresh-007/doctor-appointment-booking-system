
const allowedOrigins = [
  process.env.FRONTEND_URL ,'https://doctor-appointment-booking-system-puce-omega.vercel.app', 'http://localhost:5173'
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Debug helper: Check Render's live application logs
    console.log("Incoming request origin:", origin);
    console.log("Allowed backend origins list:", allowedOrigins);

    // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
  optionsSuccessStatus: 200 
};

export {corsOptions};