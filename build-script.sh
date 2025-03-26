#!/bin/bash
# Custom build script for Vercel deployment
# Run this script in your local repo after cloning and before pushing to GitHub

# Build the client
npm run build

# Create a file to copy necessary server files to dist
mkdir -p dist/api

# Copy API files
cp -r api/* dist/api/

echo "Build completed successfully!"