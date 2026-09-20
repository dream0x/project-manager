#!/bin/bash

set -euo pipefail

## front

docker compose exec front bash -c '
set -euo pipefail

echo "Creating project"
npx create-expo-app -e with-router .

echo "Installing dependencies"
npx expo install @biomejs/biome \
  axios zustand \
  tamagui @tamagui/config react-native-svg @tamagui/lucide-icons-2 react-native-reanimated @tamagui/animations-reanimated \
  @react-native-async-storage/async-storage

echo "Initializing project"
npx @biomejs/biome init

echo "Starting server"
npx expo start --lan -p 3000

# stop server
# docker exec front pkill -f "expo start --lan -p 3000"
'

## back
