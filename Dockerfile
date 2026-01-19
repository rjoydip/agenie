# Use the official Bun image
FROM oven/bun:1.2.19

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb first for better caching
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY ./packages ./packages

# Expose the port
EXPOSE 3000

# Set default environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Health check endpoint (uncomment if your app has a health check route)
# HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD curl -f http://localhost:3000/health || exit 1

# Run the application
CMD ["bun", "run", "packages/cli/dist/index.js"]