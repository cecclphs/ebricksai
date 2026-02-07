# **Chapter 9: Integration - Building Complete Systems**

## **Chapter Overview**

🎯 **What You'll Learn:**

- System design thinking (planning before coding)
- State machines and modes
- Integrating multiple inputs and outputs
- Creating polished user interfaces
- Debugging complex systems
- Building complete, professional projects
- Expanding beyond this course with eBricks modules

🔧 **Required eBricks-AI Modules:**

- Controller module (Arduino Pro Mini / ESP32)
- ALL modules from previous chapters:
  - 8-bit LED Bar
  - 8-digit 7-Segment Display (MAX7219)
  - Buzzer
  - Potentiometer
  - 2× Buttons
- Power connector
- Connection wires

⏱️ **Time Required:** 120-180 minutes (multiple sessions)

---

## **9.1 The eBricks-AI Ecosystem - Your Journey Has Just Begun**

### **What You've Learned So Far**

Congratulations! In Chapters 1-8, you've mastered:

- ✅ Digital output (LEDs, patterns, binary)
- ✅ Digital input (buttons, debouncing, state management)
- ✅ Analog input (potentiometer, mapping, smoothing)
- ✅ Sound output (buzzer, tones, melodies)
- ✅ Visual display (7-segment, numbers, timers)
- ✅ Programming fundamentals (loops, variables, functions)

**But this is just the beginning!**

---

### **The Power of eBricks-AI: Infinite Possibilities**

The eBricks-AI system you've been using is **modular and extensible**. Think of it like LEGO blocks - you can keep adding pieces!

**What you've used so far:**

```
Controller ← You've been using this
LED Bar    ← You've been using this
Buttons    ← You've been using this
Display    ← You've been using this
Buzzer     ← You've been using this
Pot        ← You've been using this
```

**But there are HUNDREDS more modules available!**

---

### **Example eBricks-AI Modules You Can Add**

**Sensors:**

- **Temperature/Humidity sensors** (DHT11, DHT22)
- **Light sensors** (LDR, BH1750)
- **Distance sensors** (Ultrasonic HC-SR04)
- **Motion sensors** (PIR)
- **Sound sensors** (microphone modules)
- **Gas sensors** (MQ series)
- **Accelerometers** (MPU6050)
- **Pressure sensors** (BMP180)
- **Heart rate sensors** (Pulse sensor)
- **Touch sensors** (Capacitive touch)

**Output Modules:**

- **RGB LED strips** (WS2812B, Neopixels)
- **LCD displays** (16×2, 20×4 character displays)
- **OLED displays** (128×64 graphical displays)
- **Servo motors** (for movement and robotics)
- **Stepper motors** (precise positioning)
- **Relays** (control high-power devices)
- **RGB LEDs** (full-color lighting)

**Communication Modules:**

- **Bluetooth** (HC-05, BLE modules)
- **WiFi** (ESP8266, built-in ESP32)
- **GPS** (NEO-6M)
- **RFID readers** (RC522)
- **SD card modules** (data logging)
- **Real-Time Clock** (DS3231 - accurate timekeeping)

**And many more!** Every module is a standard electronic component, designed to mount on the eBricks LEGO-compatible base system with clearly labeled pins for jumper wire connections.

---

### **Why This Matters**

**Traditional breadboard approach:**

```
New sensor → Figure out wiring → Deal with messy breadboard
            → Debug unlabeled pins → Hope it works
            → Trace through dozens of wires to troubleshoot
```

**eBricks-AI approach:**

```
New module → Mount on base → Look up labeled pins (VCC, GND, SIG)
           → Connect jumper wires → Write code → It works! → Add another module
```

**The skills you've learned in this course apply to ALL eBricks modules!**

Everything uses the same principles:

- Digital input/output
- Analog input
- Communication protocols (SPI, I2C, UART)
- Libraries and code structure

**Example:** The temperature sensor (DHT11) module:

- Connects just like your button module
- Uses `digitalRead()` just like buttons (but with special timing)
- Has a library (like LedControl for the display)
- Code structure looks familiar:
  ```cpp
  DHT dht(DHT_PIN, DHT11);
  float temp = dht.readTemperature();  // Just like analogRead()!
  ```

---

### **Your Next Steps After This Course**

**Level 1: Master what you have** (this course)

- Combine your current modules in new ways
- Build the projects in this chapter
- Create your own original projects

**Level 2: Add one new module**

- Pick something interesting (RGB LED strip? Distance sensor?)
- Find an eBricks module for it
- Read its documentation
- Build a project combining old and new

**Level 3: Complex systems**

- Combine 5+ modules
- Build IoT projects (with WiFi module)
- Create robots (with motors and sensors)
- Make smart home devices

**Level 4: Design your own**

- Understand electronics deeply enough to design circuits
- Use eBricks modules as a rapid prototyping platform
- Move to custom PCB designs for final products

**The foundation you're building now supports everything above!**

---

## **9.2 System Design Thinking**

Before writing a single line of code, let's learn to **design systems**.

### **The Five Questions**

Before starting any project, answer these:

**1. What does it DO?**

- Write one sentence describing the project
- Example: "A reaction game that tests how fast you can press a button"

**2. What are the INPUTS?**

- What does the user control?
- What sensors provide information?
- Example: "Two buttons for player input"

**3. What are the OUTPUTS?**

- What does the user see/hear?
- What information is displayed?
- Example: "LED shows when to press, buzzer beeps, display shows time"

**4. What are the STATES/MODES?**

- What different situations can occur?
- How does behavior change?
- Example: "Waiting → Countdown → Active → Result → Waiting"

**5. What are the TRANSITIONS?**

- How do you move between states?
- What triggers each transition?
- Example: "Button press starts countdown, countdown ends → active, etc."

---

### **Example: Designing a Digital Thermometer**

**1. What does it DO?**
"Displays current temperature with visual and audio warnings if too hot"

**2. INPUTS:**

- Temperature sensor (hypothetical - not in current kit, but could add!)
- Button to toggle °C/°F
- Button to set alarm temperature

**3. OUTPUTS:**

- 7-segment display shows temperature
- LED bar shows temperature level
- Buzzer sounds alarm if too hot

**4. STATES:**

- Normal mode (display current temp)
- Setting mode (adjust alarm threshold)
- Alarm mode (temperature too high)

**5. TRANSITIONS:**

- Button 1: Normal → Setting
- Button 2: Increment threshold
- Timeout: Setting → Normal
- Temp > Threshold: Normal → Alarm
- Button press: Alarm → Normal

---

### **🧪 Exercise 1: Design Your Own Project**

Pick one of these project ideas and complete the Five Questions:

**Option A:** Binary Quiz Game
**Option B:** Musical Instrument
**Option C:** Score Keeper
**Option D:** Your own idea!

**Write in your notebook:**

1. What does it DO?
2. INPUTS?
3. OUTPUTS?
4. STATES?
5. TRANSITIONS?

**This is the most important step!** Good design prevents problems later.

---

## **9.3 State Machines - The Professional Way**

A **state machine** is a structured way to manage different modes/behaviors.

### **Without State Machine (Messy)**

```cpp
void loop() {
  if (gameRunning && !gameOver && startTime > 0) {
    // Game logic
  } else if (!gameRunning && setupMode) {
    // Setup logic
  } else if (gameOver && !menuOpen) {
    // Game over logic
  }
  // ... gets confusing fast!
}
```

**Problems:**

- Hard to read
- Easy to miss cases
- Difficult to debug
- Spaghetti logic

---

### **With State Machine (Clean)**

```cpp
enum GameState {
  STATE_MENU,
  STATE_PLAYING,
  STATE_GAME_OVER
};

GameState currentState = STATE_MENU;

void loop() {
  switch (currentState) {
    case STATE_MENU:
      handleMenu();
      break;

    case STATE_PLAYING:
      handlePlaying();
      break;

    case STATE_GAME_OVER:
      handleGameOver();
      break;
  }
}
```

**Benefits:**

- Clear and organized
- Easy to add new states
- Each function handles one state
- Transitions are explicit

---

### **State Machine Template**

```cpp
// Define all possible states
enum SystemState {
  STATE_IDLE,
  STATE_ACTIVE,
  STATE_PAUSED,
  STATE_ERROR
};

SystemState currentState = STATE_IDLE;

void setup() {
  // Initialize everything
  enterState(STATE_IDLE);
}

void loop() {
  // Handle current state
  switch (currentState) {
    case STATE_IDLE:
      handleIdle();
      break;

    case STATE_ACTIVE:
      handleActive();
      break;

    case STATE_PAUSED:
      handlePaused();
      break;

    case STATE_ERROR:
      handleError();
      break;
  }
}

void enterState(SystemState newState) {
  // Clean up old state
  exitState(currentState);

  // Set new state
  currentState = newState;

  // Initialize new state
  switch (newState) {
    case STATE_IDLE:
      Serial.println("Entering IDLE state");
      // Setup for idle
      break;

    case STATE_ACTIVE:
      Serial.println("Entering ACTIVE state");
      // Setup for active
      break;

    // ... etc
  }
}

void exitState(SystemState oldState) {
  // Clean up when leaving state
  switch (oldState) {
    case STATE_IDLE:
      // Cleanup idle
      break;
    // ... etc
  }
}

void handleIdle() {
  // Logic for idle state

  // Check for transitions
  if (/* condition to start */) {
    enterState(STATE_ACTIVE);
  }
}

void handleActive() {
  // Logic for active state

  // Check for transitions
  if (/* condition to pause */) {
    enterState(STATE_PAUSED);
  }
}

// ... handlers for other states
```

**This template works for ANY project!**

---

## **9.4 Complete Project 1: Reaction Time Challenge**

Let's build a complete, polished game combining everything!

### **Design Document**

**What it does:**
Two-player reaction time game. Players compete to press their button fastest when the LED lights up.

**Inputs:**

- Button 1 (Player 1)
- Button 2 (Player 2)
- Potentiometer (difficulty - adjusts delay range)

**Outputs:**

- LED Bar (shows countdown and winner)
- 7-Segment Display (shows reaction times)
- Buzzer (ready beep, go signal, winner sound)

**States:**

- WAITING: Waiting for both players to ready up
- COUNTDOWN: Visual countdown before GO
- ACTIVE: LED lit, waiting for first press
- RESULT: Show winner and reaction time
- VICTORY: Special animation for winner

**Transitions:**

- WAITING → COUNTDOWN: Both buttons pressed
- COUNTDOWN → ACTIVE: Countdown complete
- ACTIVE → RESULT: Button pressed
- RESULT → VICTORY: After displaying time
- VICTORY → WAITING: After celebration

---

### **Complete Code**

```cpp
#include <LedControl.h>

// Pin definitions
const int BUTTON1_PIN = 10;
const int BUTTON2_PIN = 11;
const int POT_PIN = A0;
const int BUZZER_PIN = 12;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;
const int DIN_PIN = 11;  // Note: Shared with LED bar pin, adjust if needed
const int CLK_PIN = 13;
const int CS_PIN = 10;   // Note: May conflict with button, adjust pins as needed

// For real implementation, adjust pins to avoid conflicts!
// Example: Move buttons to different pins, or use a dedicated CS pin

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

// Game states
enum GameState {
  STATE_WAITING,
  STATE_COUNTDOWN,
  STATE_ACTIVE,
  STATE_RESULT,
  STATE_VICTORY
};

GameState currentState = STATE_WAITING;

// Game variables
bool player1Ready = false;
bool player2Ready = false;
unsigned long goTime = 0;
unsigned long reactionTime = 0;
int winner = 0;  // 0 = none, 1 = player1, 2 = player2
int countdownValue = 3;
unsigned long countdownStart = 0;

// Button state tracking
int lastButton1 = HIGH;
int lastButton2 = HIGH;
unsigned long lastDebounce1 = 0;
unsigned long lastDebounce2 = 0;
const int DEBOUNCE_DELAY = 50;

void setup() {
  // Initialize pins
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);

  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }

  // Initialize display
  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);

  Serial.begin(9600);
  Serial.println("=== Reaction Time Challenge ===");
  Serial.println("Both players press button to start!");

  enterState(STATE_WAITING);
}

void loop() {
  // Read buttons with debouncing
  int reading1 = digitalRead(BUTTON1_PIN);
  int reading2 = digitalRead(BUTTON2_PIN);

  bool button1Pressed = false;
  bool button2Pressed = false;

  // Debounce Button 1
  if (reading1 != lastButton1) {
    lastDebounce1 = millis();
  }
  if ((millis() - lastDebounce1) > DEBOUNCE_DELAY) {
    if (reading1 == LOW && lastButton1 == HIGH) {
      button1Pressed = true;
    }
  }
  lastButton1 = reading1;

  // Debounce Button 2
  if (reading2 != lastButton2) {
    lastDebounce2 = millis();
  }
  if ((millis() - lastDebounce2) > DEBOUNCE_DELAY) {
    if (reading2 == LOW && lastButton2 == HIGH) {
      button2Pressed = true;
    }
  }
  lastButton2 = reading2;

  // Handle current state
  switch (currentState) {
    case STATE_WAITING:
      handleWaiting(button1Pressed, button2Pressed);
      break;

    case STATE_COUNTDOWN:
      handleCountdown();
      break;

    case STATE_ACTIVE:
      handleActive(button1Pressed, button2Pressed);
      break;

    case STATE_RESULT:
      handleResult();
      break;

    case STATE_VICTORY:
      handleVictory();
      break;
  }
}

void enterState(GameState newState) {
  currentState = newState;

  switch (newState) {
    case STATE_WAITING:
      player1Ready = false;
      player2Ready = false;
      winner = 0;
      clearAllLEDs();
      lc.clearDisplay(0);
      displayMessage("rEdY");
      Serial.println("Waiting for players...");
      break;

    case STATE_COUNTDOWN:
      countdownValue = 3;
      countdownStart = millis();
      Serial.println("Countdown starting...");
      playReadyBeep();
      break;

    case STATE_ACTIVE:
      goTime = millis();
      setAllLEDs(true);
      playGoSound();
      Serial.println("GO!");
      break;

    case STATE_RESULT:
      setAllLEDs(false);
      displayNumber(reactionTime);
      Serial.print("Winner: Player ");
      Serial.print(winner);
      Serial.print(" - ");
      Serial.print(reactionTime);
      Serial.println("ms");
      break;

    case STATE_VICTORY:
      playVictorySound();
      Serial.println("Celebration!");
      break;
  }
}

void handleWaiting(bool btn1, bool btn2) {
  // Flash LEDs for each ready player
  if (btn1) {
    player1Ready = true;
    digitalWrite(FIRST_LED, HIGH);
    tone(BUZZER_PIN, 800, 50);
  }

  if (btn2) {
    player2Ready = true;
    digitalWrite(FIRST_LED + 7, HIGH);
    tone(BUZZER_PIN, 1000, 50);
  }

  // Start when both ready
  if (player1Ready && player2Ready) {
    delay(500);
    enterState(STATE_COUNTDOWN);
  }
}

void handleCountdown() {
  unsigned long elapsed = millis() - countdownStart;
  unsigned long perCount = 1000;  // 1 second per count

  int currentCount = 3 - (elapsed / perCount);

  if (currentCount != countdownValue && currentCount >= 0) {
    countdownValue = currentCount;

    // Display countdown
    clearAllLEDs();
    for (int i = 0; i <= countdownValue; i++) {
      digitalWrite(FIRST_LED + i, HIGH);
    }

    lc.clearDisplay(0);
    lc.setDigit(0, 0, countdownValue, false);

    tone(BUZZER_PIN, 600, 100);
    Serial.print("Countdown: ");
    Serial.println(countdownValue);
  }

  // After countdown, wait random time then GO
  if (elapsed > 3000) {
    int potValue = analogRead(POT_PIN);
    int randomDelay = map(potValue, 0, 1023, 500, 3000);

    delay(randomDelay);
    enterState(STATE_ACTIVE);
  }
}

void handleActive(bool btn1, bool btn2) {
  if (btn1 || btn2) {
    reactionTime = millis() - goTime;
    winner = btn1 ? 1 : 2;
    enterState(STATE_RESULT);
  }
}

void handleResult() {
  // Show winning player's side lit
  clearAllLEDs();
  if (winner == 1) {
    for (int i = 0; i < 4; i++) {
      digitalWrite(FIRST_LED + i, HIGH);
    }
  } else {
    for (int i = 4; i < 8; i++) {
      digitalWrite(FIRST_LED + i, HIGH);
    }
  }

  delay(3000);
  enterState(STATE_VICTORY);
}

void handleVictory() {
  // Victory animation
  for (int loop = 0; loop < 3; loop++) {
    for (int i = 0; i < NUM_LEDS; i++) {
      clearAllLEDs();
      digitalWrite(FIRST_LED + i, HIGH);
      delay(50);
    }
  }

  delay(2000);
  enterState(STATE_WAITING);
}

// Helper functions
void clearAllLEDs() {
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    digitalWrite(pin, LOW);
  }
}

void setAllLEDs(bool state) {
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    digitalWrite(pin, state ? HIGH : LOW);
  }
}

void displayNumber(int num) {
  lc.clearDisplay(0);

  if (num == 0) {
    lc.setDigit(0, 0, 0, false);
    return;
  }

  int digitPos = 0;
  while (num > 0 && digitPos < 8) {
    lc.setDigit(0, digitPos, num % 10, false);
    num /= 10;
    digitPos++;
  }
}

void displayMessage(const char* msg) {
  lc.clearDisplay(0);
  for (int i = 0; i < 4 && msg[i] != '\0'; i++) {
    lc.setChar(0, 3 - i, msg[i], false);
  }
}

void playReadyBeep() {
  tone(BUZZER_PIN, 800, 200);
}

void playGoSound() {
  tone(BUZZER_PIN, 1500, 300);
}

void playVictorySound() {
  int notes[] = {262, 330, 392, 523};
  for (int i = 0; i < 4; i++) {
    tone(BUZZER_PIN, notes[i], 150);
    delay(180);
  }
}
```

**This is a complete, polished game!** 🎮

**Note about pin conflicts:** In a real implementation, you'd need to carefully assign pins to avoid conflicts. The display's DIN/CLK/CS pins may overlap with other components. Adjust pin assignments in your actual hardware setup!

---

## **9.5 Complete Project 2: Smart Stopwatch**

A professional stopwatch with lap times, statistics, and sound feedback.

### **Design Document**

**Features:**

- Start/Stop/Reset controls
- Lap time recording (up to 10 laps)
- Display current time, lap count, best lap
- Visual feedback on LED bar
- Sound feedback for all actions
- Potentiometer controls display mode

**States:**

- STOPPED: Timer at zero or stopped
- RUNNING: Timer counting
- PAUSED: Timer stopped but not reset
- LAP_VIEW: Viewing lap statistics

---

### **Code Structure**

```cpp
#include <LedControl.h>

// Pin definitions
const int BUTTON_START_STOP = 10;
const int BUTTON_LAP_RESET = 11;
const int POT_PIN = A0;
const int BUZZER_PIN = 12;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;
const int DIN_PIN = 11;
const int CLK_PIN = 13;
const int CS_PIN = 10;

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

// States
enum StopwatchState {
  STATE_STOPPED,
  STATE_RUNNING,
  STATE_PAUSED,
  STATE_LAP_VIEW
};

StopwatchState currentState = STATE_STOPPED;

// Timing variables
unsigned long startTime = 0;
unsigned long elapsedTime = 0;
unsigned long pausedTime = 0;

// Lap tracking
const int MAX_LAPS = 10;
unsigned long lapTimes[MAX_LAPS];
int lapCount = 0;
unsigned long lastLapTime = 0;

// Display modes
enum DisplayMode {
  MODE_TIME,
  MODE_LAP_COUNT,
  MODE_BEST_LAP,
  MODE_AVERAGE
};

DisplayMode displayMode = MODE_TIME;

// Button debouncing
int lastButton1 = HIGH;
int lastButton2 = HIGH;
unsigned long lastDebounce1 = 0;
unsigned long lastDebounce2 = 0;
const int DEBOUNCE_DELAY = 50;

void setup() {
  pinMode(BUTTON_START_STOP, INPUT_PULLUP);
  pinMode(BUTTON_LAP_RESET, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);

  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }

  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);

  Serial.begin(9600);
  Serial.println("=== Smart Stopwatch ===");

  displayTime(0);
}

void loop() {
  // Read buttons
  int reading1 = digitalRead(BUTTON_START_STOP);
  int reading2 = digitalRead(BUTTON_LAP_RESET);

  bool button1Pressed = checkButton(reading1, lastButton1, lastDebounce1);
  bool button2Pressed = checkButton(reading2, lastButton2, lastDebounce2);

  lastButton1 = reading1;
  lastButton2 = reading2;

  // Read pot for display mode (only when stopped)
  if (currentState == STATE_STOPPED) {
    int potValue = analogRead(POT_PIN);
    displayMode = (DisplayMode)map(potValue, 0, 1023, 0, 3);
  }

  // Handle states
  switch (currentState) {
    case STATE_STOPPED:
      handleStopped(button1Pressed, button2Pressed);
      break;

    case STATE_RUNNING:
      handleRunning(button1Pressed, button2Pressed);
      break;

    case STATE_PAUSED:
      handlePaused(button1Pressed, button2Pressed);
      break;

    case STATE_LAP_VIEW:
      handleLapView(button1Pressed, button2Pressed);
      break;
  }

  // Update LED bar to show progress (0-60 seconds)
  if (currentState == STATE_RUNNING || currentState == STATE_PAUSED) {
    updateLEDBar();
  }
}

bool checkButton(int reading, int& lastState, unsigned long& lastTime) {
  if (reading != lastState) {
    lastTime = millis();
  }

  if ((millis() - lastTime) > DEBOUNCE_DELAY) {
    if (reading == LOW && lastState == HIGH) {
      return true;
    }
  }

  return false;
}

void handleStopped(bool btn1, bool btn2) {
  if (btn1) {
    // Start
    startTime = millis();
    elapsedTime = 0;
    lapCount = 0;
    lastLapTime = 0;
    currentState = STATE_RUNNING;

    tone(BUZZER_PIN, 1000, 100);
    Serial.println("Started");
  }

  if (btn2) {
    // Cycle display mode
    displayMode = (DisplayMode)((displayMode + 1) % 4);
    tone(BUZZER_PIN, 800, 50);
  }

  // Display according to mode
  updateDisplay();
}

void handleRunning(bool btn1, bool btn2) {
  // Update time display
  unsigned long currentTime = millis() - startTime + elapsedTime;
  displayTime(currentTime);

  if (btn1) {
    // Pause
    pausedTime = millis();
    elapsedTime += pausedTime - startTime;
    currentState = STATE_PAUSED;

    tone(BUZZER_PIN, 800, 100);
    Serial.println("Paused");
  }

  if (btn2) {
    // Record lap
    if (lapCount < MAX_LAPS) {
      unsigned long currentTime = millis() - startTime + elapsedTime;
      unsigned long lapTime = currentTime - lastLapTime;
      lapTimes[lapCount] = lapTime;
      lapCount++;
      lastLapTime = currentTime;

      playLapSound();
      Serial.print("Lap ");
      Serial.print(lapCount);
      Serial.print(": ");
      Serial.println(lapTime);

      // Brief flash
      flashLEDs();
    }
  }
}

void handlePaused(bool btn1, bool btn2) {
  displayTime(elapsedTime);

  if (btn1) {
    // Resume
    startTime = millis();
    currentState = STATE_RUNNING;

    tone(BUZZER_PIN, 1000, 100);
    Serial.println("Resumed");
  }

  if (btn2) {
    // Reset
    elapsedTime = 0;
    lapCount = 0;
    currentState = STATE_STOPPED;

    tone(BUZZER_PIN, 600, 200);
    Serial.println("Reset");
    displayTime(0);
  }
}

void handleLapView(bool btn1, bool btn2) {
  // Not implemented in this version
  // Could show individual lap times
}

void displayTime(unsigned long milliseconds) {
  unsigned long seconds = milliseconds / 1000;
  unsigned long minutes = seconds / 60;
  seconds = seconds % 60;
  unsigned long hundredths = (milliseconds / 10) % 100;

  lc.clearDisplay(0);

  // Format: MM:SS.HH
  lc.setDigit(0, 0, hundredths % 10, false);
  lc.setDigit(0, 1, hundredths / 10, true);  // Decimal point
  lc.setDigit(0, 2, seconds % 10, false);
  lc.setDigit(0, 3, seconds / 10, true);     // Decimal point
  lc.setDigit(0, 4, minutes % 10, false);

  if (minutes >= 10) {
    lc.setDigit(0, 5, minutes / 10, false);
  }
}

void updateDisplay() {
  lc.clearDisplay(0);

  switch (displayMode) {
    case MODE_TIME:
      displayTime(0);
      break;

    case MODE_LAP_COUNT:
      lc.setDigit(0, 0, lapCount % 10, false);
      lc.setChar(0, 1, 'L', false);
      break;

    case MODE_BEST_LAP:
      if (lapCount > 0) {
        unsigned long best = lapTimes[0];
        for (int i = 1; i < lapCount; i++) {
          if (lapTimes[i] < best) {
            best = lapTimes[i];
          }
        }
        displayTime(best);
      }
      break;

    case MODE_AVERAGE:
      if (lapCount > 0) {
        unsigned long total = 0;
        for (int i = 0; i < lapCount; i++) {
          total += lapTimes[i];
        }
        displayTime(total / lapCount);
      }
      break;
  }
}

void updateLEDBar() {
  unsigned long currentTime;
  if (currentState == STATE_RUNNING) {
    currentTime = millis() - startTime + elapsedTime;
  } else {
    currentTime = elapsedTime;
  }

  int seconds = (currentTime / 1000) % 60;
  int numLEDs = map(seconds, 0, 59, 0, NUM_LEDS);

  for (int i = 0; i < NUM_LEDS; i++) {
    digitalWrite(FIRST_LED + i, i < numLEDs ? HIGH : LOW);
  }
}

void playLapSound() {
  tone(BUZZER_PIN, 1200, 50);
  delay(60);
  tone(BUZZER_PIN, 1400, 50);
}

void flashLEDs() {
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    digitalWrite(pin, HIGH);
  }
  delay(100);
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    digitalWrite(pin, LOW);
  }
}
```

**A professional-grade stopwatch!** ⏱️

---

## **9.6 Complete Project 3: Interactive Simon Says**

Classic memory game with escalating difficulty!

### **Features:**

- LED sequence that increases in length
- Audio feedback for each LED
- Visual and audio celebration for success
- Tracks high score
- Adjustable speed with potentiometer

---

### **Key Code Snippets**

```cpp
// Game structure
const int MAX_SEQUENCE = 50;
int sequence[MAX_SEQUENCE];
int sequenceLength = 1;
int currentStep = 0;

enum GameState {
  STATE_SHOWING,
  STATE_WAITING_INPUT,
  STATE_SUCCESS,
  STATE_FAIL
};

// Pattern generation
void generateNextStep() {
  sequence[sequenceLength] = random(NUM_LEDS);
  sequenceLength++;
}

// Show pattern with corresponding tones
void showPattern() {
  int notes[] = {262, 294, 330, 349, 392, 440, 494, 523};

  for (int i = 0; i < sequenceLength; i++) {
    int led = sequence[i];

    digitalWrite(FIRST_LED + led, HIGH);
    tone(BUZZER_PIN, notes[led], 400);
    delay(500);
    digitalWrite(FIRST_LED + led, LOW);
    delay(200);
  }
}

// Check user input
void checkInput(int buttonPressed) {
  if (buttonPressed == sequence[currentStep]) {
    // Correct!
    playCorrectSound();
    currentStep++;

    if (currentStep >= sequenceLength) {
      // Level complete!
      enterState(STATE_SUCCESS);
    }
  } else {
    // Wrong!
    enterState(STATE_FAIL);
  }
}
```

**Implementation left as challenge!** Combine this structure with state machine pattern.

---

## **9.7 Debugging Complex Systems**

When projects get complex, debugging gets harder. Here's a systematic approach.

### **The Debug Process**

**1. Isolate the Problem**

- Does it work at all?
- Which part doesn't work?
- When does it fail?
- Can you reproduce it?

**2. Add Serial Debugging**

```cpp
void loop() {
  Serial.print("State: ");
  Serial.println(currentState);

  Serial.print("Button1: ");
  Serial.println(digitalRead(BUTTON1_PIN));

  // Print EVERYTHING you need to see
}
```

**3. Test Components Individually**

```cpp
// Comment out everything except one subsystem
void loop() {
  // testButtons();
  // testDisplay();
  testLEDs();  // Test this only
  // testBuzzer();
}
```

**4. Use LED Indicators**

```cpp
// Flash LED to show program is running
digitalWrite(FIRST_LED, millis() % 1000 < 500);

// Show state on LEDs
void displayStateOnLEDs() {
  clearAllLEDs();
  digitalWrite(FIRST_LED + currentState, HIGH);
}
```

**5. Check Your Assumptions**

```cpp
// Verify what you think is happening
Serial.print("I think button is pressed: ");
Serial.println(buttonPressed);
Serial.print("Actual button value: ");
Serial.println(digitalRead(BUTTON_PIN));
```

---

### **Common Integration Issues**

**Problem: Everything works separately, fails together**

**Cause:** Pin conflicts, power issues, or timing problems

**Solution:**

```cpp
// Check pin assignments
void printPinAssignments() {
  Serial.println("=== Pin Assignments ===");
  Serial.print("Button1: "); Serial.println(BUTTON1_PIN);
  Serial.print("Button2: "); Serial.println(BUTTON2_PIN);
  Serial.print("Buzzer: "); Serial.println(BUZZER_PIN);
  // ... print all pins

  // Check for duplicates!
}
```

---

**Problem: Erratic behavior**

**Cause:** Usually debouncing or state management

**Solution:**

```cpp
// Add state entry logging
void enterState(GameState newState) {
  Serial.print("STATE CHANGE: ");
  Serial.print(currentState);
  Serial.print(" -> ");
  Serial.println(newState);

  currentState = newState;
  // ...
}
```

---

**Problem: Display shows garbage**

**Cause:** Communication issues or incorrect data

**Solution:**

```cpp
// Verify data before sending
void displayNumber(int num) {
  Serial.print("Displaying: ");
  Serial.println(num);

  if (num < 0 || num > 99999999) {
    Serial.println("ERROR: Number out of range!");
    return;
  }

  // ... display code
}
```

---

## **9.8 Creating Your Own Project**

Now it's your turn! Follow this process:

### **Step 1: Choose Your Project**

Pick something that:

- Interests YOU personally
- Uses at least 3 different modules
- Has a clear purpose
- Is achievable in 2-4 hours

**Ideas:**

- Musical instrument
- Game (any type!)
- Timer/counter for specific use
- Training/exercise tool
- Educational tool
- Practical daily-use device

---

### **Step 2: Complete Design Document**

Use the Five Questions (section 9.2):

1. What does it DO?
2. INPUTS?
3. OUTPUTS?
4. STATES?
5. TRANSITIONS?

**Draw diagrams:**

- State diagram
- Physical layout
- User interface sketch

---

### **Step 3: Build Incrementally**

**Don't write everything at once!**

**Phase 1: Hardware test**

```cpp
void loop() {
  // Just verify each component works
  testButtons();
  testDisplay();
  testLEDs();
  testBuzzer();
}
```

**Phase 2: Basic functionality**

```cpp
// Minimal working version
// One state, basic input/output
```

**Phase 3: Add states**

```cpp
// Implement state machine
// Add transitions
```

**Phase 4: Polish**

```cpp
// Add sound effects
// Improve visuals
// Add features
```

---

### **Step 4: Test and Iterate**

- Test each state individually
- Test all transitions
- Try to break it!
- Get feedback from others
- Improve based on feedback

---

### **Step 5: Document**

Write down:

- What it does
- How to use it
- Pin connections
- Any special notes

**This helps:**

- When you come back to it later
- When sharing with others
- For your portfolio

---

## **9.9 💡 Key Concepts Summary**

### **System Design**

- ✅ Plan before coding (Five Questions)
- ✅ Draw diagrams and sketches
- ✅ Think about user experience
- ✅ Consider edge cases

### **State Machines**

- ✅ Use enum for states
- ✅ switch/case for state handling
- ✅ enterState() for transitions
- ✅ Separate functions for each state
- ✅ Clear, organized code

### **Integration**

- ✅ Test components individually first
- ✅ Build incrementally
- ✅ Watch for pin conflicts
- ✅ Manage power requirements
- ✅ Consider timing issues

### **Debugging**

- ✅ Use Serial.print extensively
- ✅ Isolate problems
- ✅ Test assumptions
- ✅ Use LED indicators
- ✅ Keep calm and systematic

### **Polish**

- ✅ Sound feedback for actions
- ✅ Visual feedback (LEDs)
- ✅ Clear display messages
- ✅ Smooth transitions
- ✅ Error handling

---

## **9.10 Beyond This Course: The eBricks-AI Universe**

### **Your Foundation is Solid**

You now understand:

- Digital I/O (the basis for 90% of modules)
- Analog input (sensors use this)
- Communication (SPI for displays, I2C for many sensors)
- Libraries (every module has one)
- State machines (professional code structure)

**These skills transfer to ANY Arduino project!**

---

### **Next Modules to Explore**

**Easy additions (use same concepts):**

**RGB LED Strip (WS2812B):**

- Uses digital output (similar to LED bar)
- Library: FastLED or Adafruit_NeoPixel
- Create colorful light shows!
- Mount on eBricks base, connect with jumper wires

**LCD Display (16×2 or 20×4):**

- Uses I2C communication
- Library: LiquidCrystal_I2C
- Show text messages!
- Simple 4-pin connection

**Ultrasonic Distance Sensor (HC-SR04):**

- Uses digitalWrite and digitalRead
- Measure distance to objects
- Build parking sensor, people counter
- Plug-and-play module

---

**Intermediate additions:**

**Temperature/Humidity Sensor (DHT11/DHT22):**

- Digital communication with special timing
- Library: DHT
- Build weather station
- Standard eBricks module

**Servo Motors:**

- Uses PWM (like LED brightness)
- Library: Servo
- Create moving robots
- Pre-mounted on eBricks modules

**Real-Time Clock (DS3231):**

- I2C communication
- Library: RTClib
- Keep accurate time
- Battery backup built-in

---

**Advanced additions:**

**Accelerometer/Gyroscope (MPU6050):**

- I2C communication
- Library: MPU6050
- Detect motion, orientation
- Build gesture controller

**Bluetooth Module (HC-05):**

- Serial communication
- Control from phone!
- Build remote-controlled projects

**SD Card Module:**

- SPI communication (like MAX7219)
- Log data long-term
- Create data logger

---

### **The Pattern: It's Always the Same**

**For ANY new eBricks module:**

**1. Physical connection:**

```
Module → Mount on eBricks base
Connect: VCC, GND, Signal pins with labeled jumper wires
```

**2. Find the library:**

```
Arduino IDE → Library Manager
Search for module name
Install
```

**3. Run example:**

```
File → Examples → [Library Name] → Basic Example
Upload and test
```

**4. Read documentation:**

```
Understand functions
Check pin requirements
Note any special considerations
```

**5. Integrate:**

```
Add to your project
Follow state machine pattern
Test incrementally
```

**You already know how to do this!**

---

### **Where to Find Modules**

**eBricks-AI modules:**

- Official eBricks online store
- Pre-assembled, tested
- Guaranteed compatibility
- Clear documentation

**Standard electronic modules:**

- Any Arduino-compatible module works!
- Connect to eBricks system via adapters
- Huge selection available
- Learning to evaluate quality is part of the journey

---

## **9.11 Learning Resources**

### **For Continuing Your Journey**

**Online resources:**

- Arduino official tutorials (arduino.cc)
- eBricks-AI documentation
- YouTube channels (Andreas Spiess, Paul McWhorter, GreatScott!)
- Arduino forums (forum.arduino.cc)
- Reddit r/arduino community

**Books:**

- "Getting Started with Arduino" by Massimo Banzi
- "Arduino Cookbook" by Michael Margolis
- "Programming Arduino" by Simon Monk

**Project ideas:**

- Instructables.com
- Hackster.io
- Arduino Project Hub

---

### **Building a Portfolio**

**Document your projects:**

- Take photos/videos
- Write clear descriptions
- Share code on GitHub
- Explain what you learned

**Why this matters:**

- College applications
- Job applications
- Shows initiative and skills
- Helps others learn
- Reference for yourself later

---

## **9.12 🚀 Final Challenges**

### **Challenge A: Design and Build Your Masterpiece**

Create ONE complete project that showcases everything you've learned:

**Requirements:**

- Uses at least 4 different modules
- Implements state machine
- Has polished UI (sound + visual feedback)
- Solves a real problem or provides real entertainment
- Is something YOU care about

**Timeline:** 3-5 hours of work

**Deliverables:**

- Working project
- Design document
- Code with comments
- User manual (how to use it)
- Demonstration video

---

### **Challenge B: Module Integration**

Pick ONE new eBricks module you don't have yet:

- Research it online
- Design a project that would use it
- Write pseudocode for the integration
- Draw the connections
- (Bonus: Actually get the module and build it!)

---

### **Challenge C: Optimization**

Take one of the projects from this chapter:

- Improve the code structure
- Add error handling
- Make it more user-friendly
- Add features
- Optimize performance

---

### **Challenge D: Teaching**

The best way to learn is to teach:

- Teach someone else one concept from this course
- Create a tutorial for a specific project
- Help a classmate with their project
- Explain state machines to a friend

---

## **9.13 Conclusion: You Are Now an Arduino Developer**

### **Look How Far You've Come**

**Chapter 1:** You made an LED blink

**Chapter 9:** You build complete interactive systems with:

- 8 LEDs
- 8-digit display
- Multiple buttons
- Sound output
- Analog input
- Professional code structure
- State management
- User interfaces

**That's incredible growth!** 🎉

---

### **What You Can Do Now**

You can:

- ✅ Design systems from scratch
- ✅ Write organized, professional code
- ✅ Debug complex problems
- ✅ Integrate multiple components
- ✅ Create polished user experiences
- ✅ Learn new modules independently
- ✅ Build real, useful projects

**You're not a beginner anymore - you're a maker!**

---

### **The Skills Transfer**

These fundamentals apply to:

- **Robotics** - control motors and sensors
- **IoT** - connect to internet, smart home
- **Embedded systems** - professional applications
- **Product design** - prototyping ideas
- **Art installations** - interactive art
- **Science projects** - data collection
- **Home automation** - DIY smart devices

**Arduino is a gateway to all of these fields!**

---

### **The eBricks-AI Advantage**

You learned on the eBricks-AI platform, which means:

- Clean, professional builds
- Quick iteration and experimentation
- Easy to add new modules
- Clearly labeled pin connections
- Focus on learning, not guessing which wire goes where

**But the concepts work EVERYWHERE:**

- Traditional breadboard projects
- Custom PCB designs
- Professional embedded systems
- Any microcontroller platform

**Your knowledge is transferable!**

---

### **Continue Growing**

**This course is just the foundation.**

The eBricks-AI ecosystem has hundreds of modules you haven't explored yet:

- Sensors of all types
- Different display technologies
- Motors and actuators
- Communication modules
- Power management
- And more being developed!

**Each module is a new superpower for your projects.**

**The pattern is always the same:**

1. Connect it
2. Install library
3. Test example
4. Integrate into project
5. Make something amazing

**You know how to do this now!**

---

### **Your Next Steps**

**This week:**

- Build one complete project from this chapter
- Test every feature
- Polish until you're proud of it

**This month:**

- Add one new eBricks module
- Combine it with what you know
- Share your creation

**This year:**

- Build 10+ projects
- Learn 5+ new modules
- Maybe design your own module!

**Remember:**

- Start simple
- Build incrementally
- Test frequently
- Don't give up when stuck (that's when you learn most!)
- Share what you create
- Help others learn

---

### **A Final Message**

You started this course knowing almost nothing about Arduino or programming.

Now you can:

- Build interactive systems
- Write organized code
- Debug problems
- Design user interfaces
- Integrate hardware
- Create real projects

**That's an amazing journey!** 🚀

But more importantly, you learned **HOW to learn**:

- Read documentation
- Test hypotheses
- Debug systematically
- Build incrementally
- Ask the right questions

**These skills will serve you forever, far beyond Arduino.**

---

### **The Community Awaits**

Makers around the world are building incredible things:

- Robots
- Art installations
- Scientific instruments
- Games
- Tools
- Solutions to real problems

**You're now part of this community.**

Share your projects. Learn from others. Help beginners. Push boundaries.

**The only limit is your imagination.**

---

### **Thank You**

Thank you for taking this journey. Thank you for your curiosity, persistence, and creativity.

The projects you'll build in the future - the ones that solve problems, bring joy, or push boundaries - those projects start with the foundation you built here.

**Now go make something amazing!** ✨

---

## **9.14 Quick Reference: Complete Pin Map**

For your projects, here's a suggested pin layout to avoid conflicts:

```
Arduino Pro Mini / ESP32 - Recommended Pin Assignment

Digital Outputs (LEDs):
  Pin 2-9: LED Bar (8 LEDs)

Digital Inputs (Buttons):
  Pin 10: Button 1
  Pin 11: Button 2
  (Use INPUT_PULLUP mode)

Analog Inputs:
  A0: Potentiometer
  A1-A7: Available for additional sensors

PWM Outputs:
  Pin 3: Available for servo/motor
  Pin 5: Available for servo/motor
  Pin 6: Available for servo/motor

Audio Output:
  Pin 12: Buzzer

SPI (Display):
  Pin 11 (MOSI): Display DIN
  Pin 13 (SCK): Display CLK
  Pin 10 (CS): Display CS/LOAD
  (Note: Conflicts with Button 1 - adjust as needed!)

I2C (Future sensors):
  A4 (SDA): I2C Data
  A5 (SCL): I2C Clock
  (For LCD, RTC, many sensors)

Serial (USB):
  Pin 0 (RX): Receive
  Pin 1 (TX): Transmit
  (Don't use these - needed for programming!)

Power:
  VCC/5V: Power to all modules
  GND: Ground to all modules
```

**Important:** In actual projects, you may need to adjust pins to avoid conflicts! The eBricks system makes this easier with clear labeling.

---

## **9.15 Troubleshooting: Complex Systems**

**When multiple things don't work:**

1. **Power issues**
   - Check if all modules get power
   - USB might not provide enough current
   - Use external 5V supply if needed
   - eBricks power distribution helps here

2. **Pin conflicts**
   - Two modules on same pin?
   - Check pin assignments carefully
   - Use printPinAssignments() function

3. **Library conflicts**
   - Some libraries don't work together
   - Check library documentation
   - Update to latest versions

4. **Timing issues**
   - Avoid long delay() in complex projects
   - Use millis() for non-blocking timing
   - State machines help organize timing

5. **Memory issues**
   - Arduino has limited RAM
   - Too many variables?
   - Large arrays filling memory?
   - Use PROGMEM for constants

---

**If all else fails:**

**Strip it down:**

```cpp
// Comment out EVERYTHING except the problematic part
void loop() {
  // testButtons();     // Commented
  // testDisplay();     // Commented
  testLEDs();           // ONLY THIS
  // testBuzzer();      // Commented
  // runStateMachine(); // Commented
}
```

**Then slowly add back pieces until it breaks again.**

**You'll find the problem!**

---

## **Vocabulary Review - Complete Course**

**Hardware:**

- **eBricks-AI** - Modular electronic building block system
- **Module** - Pre-assembled electronic component on eBricks board
- **Pin** - Connection point on Arduino
- **LED** - Light Emitting Diode
- **Button** - Momentary switch (push to connect)
- **Potentiometer** - Variable resistor with knob
- **Buzzer** - Sound output device (passive piezo type)
- **Display** - 7-segment LED display (8 digits)
- **MAX7219** - Display driver chip

**Programming:**

- **Variable** - Storage for data
- **Function** - Reusable block of code
- **Loop** - Code that repeats
- **State Machine** - Organized way to manage modes
- **Library** - Pre-written code package
- **Debug** - Find and fix problems

**Concepts:**

- **Digital** - ON/OFF, HIGH/LOW, 1/0
- **Analog** - Continuous range of values
- **PWM** - Pulse Width Modulation (fake analog output)
- **Frequency** - How often something repeats (Hz)
- **Debouncing** - Filtering mechanical switch bounce
- **State** - Current mode/condition of system
- **Transition** - Moving from one state to another

---

## **Final Checklist: Am I Ready to Build Alone?**

Can you:

- [ ] Connect eBricks modules correctly?
- [ ] Install Arduino libraries?
- [ ] Write basic setup() and loop()?
- [ ] Use digitalWrite() and digitalRead()?
- [ ] Use analogRead() and map()?
- [ ] Control LEDs in patterns?
- [ ] Read buttons with debouncing?
- [ ] Play tones on buzzer?
- [ ] Display numbers on 7-segment?
- [ ] Create a state machine?
- [ ] Debug with Serial.print()?
- [ ] Read module documentation?
- [ ] Build incrementally (test as you go)?
- [ ] Design before coding?
- [ ] Ask good questions when stuck?

**If you checked most of these: YES, you're ready!** 🎓

---

**You did it! Now go build something AWESOME!** 🚀✨

---

**End of Course**

_Keep learning. Keep making. Keep sharing._

_The Arduino community is waiting for your contributions!_

_Welcome to the world of makers!_ 🛠️💡
