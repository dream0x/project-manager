#!/bin/bash

set -euo pipefail

## web

# docker compose restart web

## front

docker compose exec front bash -c '
set -euo pipefail

echo "Creating project"
npx create-expo-app -e with-router .

echo "Installing dependencies"
# openapi-typescriptに合わせるため、typescript5を使用
npm install -D typescript@~5.9.3 @biomejs/biome openapi-typescript
npm i axios zustand react-hook-form zod @hookform/resolvers
npx expo install \
  tamagui @tamagui/config react-native-svg @tamagui/lucide-icons-2 react-native-reanimated @tamagui/animations-reanimated \
  @react-native-async-storage/async-storage

echo "Initializing project"
npx @biomejs/biome init

echo "Starting server"
npx expo start --lan -p 3000

# stop server
# docker exec front pkill -f "expo start --lan -p 3000"
'

# open-api: curl back:8000/api/v3/api-docs
## back


# docker-compose
