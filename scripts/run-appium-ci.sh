#!/usr/bin/env bash
set -e

echo "Setting up adb reverse for local backend on port 5000..."
adb reverse tcp:5000 tcp:5000

echo "Installing release APK..."
adb install -r mobile/frontend/android/app/build/outputs/apk/release/app-release.apk

echo "Starting Appium server in background..."
appium --address 127.0.0.1 --port 4723 > /tmp/appium.log 2>&1 &
APP_PID=$!

echo "Waiting for Appium server readiness..."
for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:4723/status >/dev/null 2>&1; then
    echo "Appium server is ready!"
    break
  fi
  sleep 2
done

cd appium-tests

echo "Running Appium E2E mocha tests..."
run_tests() {
  E2E_EMAIL="$E2E_EMAIL" \
  E2E_PASSWORD="$E2E_PASSWORD" \
  APP_PACKAGE="com.careernavigator.app" \
  APP_ACTIVITY="com.careernavigator.app.MainActivity" \
  npx mocha tests/app-e2e-tests.js --reporter spec
}

if ! run_tests; then
  echo "=== Appium Server Log on Failure ==="
  cat /tmp/appium.log || true
  exit 1
fi

echo "Appium E2E tests finished successfully."
