#!/bin/bash

echo "🚀 Starting Efficover Main Site Demo..."
echo "📍 Navigate to the demo section to see both VOC and EOB demos"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🌐 Starting development server..."
echo "📱 Open http://localhost:5173 in your browser"
echo "🎯 Go to the 'Demo' section to see both demos"
echo ""

npm run dev 