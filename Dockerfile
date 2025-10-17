# Use Node.js 18
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 8080

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "🚀 Starting server..."' >> /app/start.sh && \
    echo 'node server.js' >> /app/start.sh && \
    chmod +x /app/start.sh

# Start the server
CMD ["/app/start.sh"]
