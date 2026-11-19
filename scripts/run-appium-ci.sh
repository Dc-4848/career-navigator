#!/usr/bin/env bash
set -Eeuo pipefail

echo "Setting up adb reverse for local backend on port 5000..."
adb reverse tcp:5000 tcp:5000

echo "Installing release APK..."
adb install -r mobile/frontend/android/app/build/outputs/apk/release/app-release.apk

echo "Starting Appium server in background..."
appium --address 127.0.0.1 --port 4723 --log-level info > /tmp/appium.log 2>&1 &
APP_PID=$!
mkdir -p appium-results
cleanup() {
  kill "$APP_PID" 2>/dev/null || true
}
trap cleanup EXIT

echo "Waiting for Appium server readiness..."
for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:4723/status >/dev/null 2>&1; then
    echo "Appium server is ready!"
    break
  fi
  if ! kill -0 "$APP_PID" 2>/dev/null; then
    echo "Appium server exited before becoming ready."
    cat /tmp/appium.log || true
    exit 1
  fi
  sleep 2
done

if ! curl -fsS http://127.0.0.1:4723/status >/dev/null 2>&1; then
  echo "Appium server did not become ready within 60 seconds."
  cat /tmp/appium.log || true
  exit 1
fi

cd appium-tests
echo "Running Appium E2E mocha tests..."
set +e
E2E_EMAIL="$E2E_EMAIL" \
  E2E_PASSWORD="$E2E_PASSWORD" \
  APP_PACKAGE="com.careernavigator.app" \
  APP_ACTIVITY="com.careernavigator.app.MainActivity" \
  npx mocha tests/app-e2e-tests.js --reporter json > ../appium-results/mocha.json
TEST_EXIT_CODE=$?
set -e
echo "$TEST_EXIT_CODE" > ../appium-results/exit-code
if [ "$TEST_EXIT_CODE" -ne 0 ]; then
  echo "=== Android logcat tail on failure ==="
  adb logcat -d -t 2000 > ../appium-results/logcat.txt || true
  echo "=== Appium server log on failure ==="
  cp /tmp/appium.log ../appium-results/appium.log || true
fi

exit "$TEST_EXIT_CODE"
