#!/bin/bash

# Deploy script for Railway
# This script pushes changes to both main and railway-deploy branches

echo "🚀 Deploying to Railway..."

# Push to main branch
echo "📤 Pushing to main branch..."
git push origin main

# Push main to railway-deploy branch
echo "📤 Syncing to railway-deploy branch..."
git push origin main:railway-deploy

echo "✅ Deployment complete!"
echo "🌐 Railway will deploy from railway-deploy branch"
