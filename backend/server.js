const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Supabase client is initialized in config/supabase.js and used in api/ handlers

// Router
const router = require('./router');

const app = express();

// Body parser
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());

// Securities
const limiter = rateLimit({ windowsMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(hpp());
// app.use(cors()); 

app.use(router);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Campground Booking API',
            version: '1.0.0',
            description: 'A simple Express Campground Booking API',
        },
        servers: [
            {
                url: 'http://localhost:5000api/v1',
            }
        ],
    },
    apis: ['./api/**/*.routes.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));