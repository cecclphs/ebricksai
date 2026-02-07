# **Chapter 8: The 7-Segment Display - Showing Numbers**

## **Chapter Overview**

🎯 **What You'll Learn:**

- How 7-segment displays work
- Understanding the MAX7219 driver chip
- Installing and using Arduino libraries
- Displaying numbers 0-9
- Multi-digit displays (up to 8 digits)
- Creating counters and timers
- Scrolling numbers and simple text
- Building practical display projects

🔧 **Required eBricks-AI Modules:**

- Controller module (Arduino Pro Mini / ESP32)
- 8-digit 7-segment display with MAX7219 driver
- Buzzer module (from Chapter 7)
- Potentiometer module (from Chapter 6)
- 2× Button modules (from Chapter 5)
- 8-bit LED Bar module (optional for this chapter)
- Power connector
- Connection wires

⏱️ **Time Required:** 90-120 minutes

---

## **8.1 Understanding 7-Segment Displays**

### **What is a 7-Segment Display?**

Look at any digital clock, microwave, or calculator. See those numbers made of glowing segments? That's a **7-segment display**!

**Why "7-segment"?**

```
    ┌─── A ───┐
    │         │
    F         B
    │         │
    ├─── G ───┤
    │         │
    E         C
    │         │
    └─── D ───┘
          (DP)

Each segment is an LED!
DP = Decimal Point
```

**By turning different segments ON/OFF, we can make digits:**

```
Number 0:    Number 1:    Number 8:
┌───────┐    ┌───────┐    ┌───────┐
│       │    │       │    │       │
│       │    │       │    │       │
│       │    │       │    │       │
│       │    ├───────┤    ├───────┤
│       │    │       │    │       │
│       │    │       │    │       │
│       │    │       │    │       │
└───────┘    └───────┘    └───────┘

All except G  B and C only  All segments!
```

---

### **🧪 Activity: Decode These Numbers**

Which segments are ON for each digit?

```
Display:     Segments ON:
   8         A, B, C, D, E, F, G (all!)
   0         A, B, C, D, E, F (no G)
   1         B, C (right side only)
   7         A, B, C (top and right)
   5         A, F, G, C, D
```

**Try it yourself!** Draw which segments you'd need for the number **3**.

<details>
<summary>Answer</summary>

**Number 3:** A, B, C, D, G (top, right side, middle, bottom)

```
┌───────┐
        │
        │
        │
├───────┤
        │
        │
        │
└───────┘
```

</details>

---

### **The Challenge: Controlling 7 Segments**

For **one digit**, we need 7 pins (one per segment)!

For **8 digits** (like on our display), we'd need:

```
8 digits × 7 segments = 56 pins!
```

**But Arduino only has ~20 pins total!** 😱

**This is a problem!**

---

## **8.2 The Solution: MAX7219 Driver Chip**

### **What is the MAX7219?**

The **MAX7219** is a smart chip that:

- Controls up to 8 digits (64 LEDs!)
- Only needs 3 Arduino pins!
- Handles all the multiplexing automatically
- Includes brightness control
- Has built-in digit decoding

**It's like hiring an assistant!**

```
Arduino (3 pins) ──→ MAX7219 ──→ 8-Digit Display (56+ connections)
                       ↑
                   "Assistant"
```

---

### **How It Works: SPI Communication**

MAX7219 uses **SPI** (Serial Peripheral Interface):

```
Arduino               MAX7219
  ├─ Pin 11 (MOSI) ──→ DIN   (Data In)
  ├─ Pin 13 (SCK)  ──→ CLK   (Clock)
  └─ Pin 10 (CS)   ──→ LOAD  (Chip Select)
```

**What these do:**

- **DIN (Data In):** Arduino sends display data
- **CLK (Clock):** Timing signal (like a metronome)
- **LOAD (Chip Select):** "Hey MAX7219, I'm talking to you!"

**You don't need to understand the details!** Arduino libraries handle all of this!

---

### **Your eBricks-AI Display Module**

Your display module has the MAX7219 built in!

```
[8-Digit 7-Segment Display Module]
┌──────────────────────────────────┐
│ 8 8 8 8 8 8 8 8                  │ ← 8 digits
├──────────────────────────────────┤
│ VCC GND DIN CLK CS               │ ← Connections
└──────────────────────────────────┘
```

**Clean and simple!** No 56 wires - just 5 connections!

---

## **8.3 Connecting Your Display**

### **Physical Connection**

**Step 1:** Disconnect USB power! ⚡

**Step 2:** Connect the 7-segment display:

- Display VCC → Arduino 5V
- Display GND → Arduino GND
- Display DIN → Arduino Pin 11 (MOSI)
- Display CLK → Arduino Pin 13 (SCK)
- Display CS/LOAD → Arduino Pin 10

**Step 3:** Double-check all connections

**Step 4:** Reconnect USB power

**💡 eBricks-AI Advantage:** The module has the MAX7219 already integrated! In traditional setups, you'd need to wire the chip yourself with many connections.

---

## **8.4 Installing the LedControl Library**

To control the MAX7219, we need a **library** - pre-written code that makes our job easier!

### **What's a Library?**

A library is like a toolbox of functions someone else wrote:

**Without library:**

```cpp
// Send 16 bits of data with clock pulses...
// Handle SPI protocol timing...
// Calculate segment patterns...
// 200+ lines of complex code!
```

**With library:**

```cpp
lc.setDigit(0, 0, 5, false);  // Show "5" on digit 0 - Easy!
```

**Libraries save you TONS of work!**

---

### **Installing LedControl Library**

**Step 1:** Open Arduino IDE

**Step 2:** Go to **Sketch → Include Library → Manage Libraries...**

**Step 3:** In the search box, type: `LedControl`

**Step 4:** Find **"LedControl by Eberhard Fahle"**

**Step 5:** Click **Install**

**Step 6:** Wait for "Installed" to appear

**Step 7:** Close the Library Manager

**Done!** ✅

---

## **8.5 🧪 Experiment 1: First Display Test**

Let's make sure everything is connected correctly!

### **Test Code**

```cpp
#include <LedControl.h>

// Pin connections
const int DIN_PIN = 11;
const int CLK_PIN = 13;
const int CS_PIN = 10;

// Create LedControl object
// LedControl(DIN, CLK, CS, number of displays)
LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

void setup() {
  Serial.begin(9600);
  Serial.println("=== 7-Segment Display Test ===");

  // Initialize the display
  lc.shutdown(0, false);  // Wake up the MAX7219
  lc.setIntensity(0, 8);  // Set brightness (0-15, 8 is medium)
  lc.clearDisplay(0);     // Clear the display

  Serial.println("Display initialized!");
}

void loop() {
  // Display the number 8 on all digits
  for (int digit = 0; digit < 8; digit++) {
    lc.setDigit(0, digit, 8, false);
  }

  Serial.println("Displaying: 88888888");

  delay(2000);

  // Clear display
  lc.clearDisplay(0);
  Serial.println("Cleared");

  delay(1000);
}
```

**Upload this code!**

---

### **What Should Happen**

You should see:

1. All 8 digits show "8" (all segments lit)
2. Wait 2 seconds
3. Display clears
4. Wait 1 second
5. Repeat

**If you see "88888888"** → ✅ Success! Everything is connected correctly!

**If nothing appears** → See Troubleshooting section 8.18

---

### **Understanding the Code**

Let's break it down:

```cpp
#include <LedControl.h>
```

**This loads the library** - like opening a toolbox.

```cpp
LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);
```

**Creates a controller object** named `lc`:

- Tells it which pins we're using
- `1` = we have 1 display module (you can chain multiple!)

```cpp
lc.shutdown(0, false);
```

**Wakes up the display:**

- `0` = display number (if you had multiple displays)
- `false` = not in shutdown mode (wake up!)

```cpp
lc.setIntensity(0, 8);
```

**Sets brightness:**

- `0` = display number
- `8` = brightness level (0-15, where 0=dim, 15=bright)

```cpp
lc.setDigit(0, digit, 8, false);
```

**Shows a digit:**

- First `0` = display number
- `digit` = which digit position (0-7, right to left!)
- `8` = the number to show
- `false` = don't show decimal point

---

## **8.6 🧪 Experiment 2: Counting 0-9**

Let's make it count!

```cpp
#include <LedControl.h>

const int DIN_PIN = 11;
const int CLK_PIN = 13;
const int CS_PIN = 10;

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);

  Serial.begin(9600);
  Serial.println("=== Counting Display ===");
}

void loop() {
  // Count from 0 to 9 on the rightmost digit (digit 0)
  for (int i = 0; i <= 9; i++) {
    lc.setDigit(0, 0, i, false);

    Serial.print("Displaying: ");
    Serial.println(i);

    delay(500);
  }

  delay(1000);
  lc.clearDisplay(0);
  delay(500);
}
```

**You should see:** 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, then clear and repeat!

---

### **Important: Digit Numbering**

**Digits are numbered from RIGHT to LEFT!**

```
Display:     7  6  5  4  3  2  1  0
Position:   [8][8][8][8][8][8][8][8]
            ↑                      ↑
          Left                  Right
       (highest)            (rightmost)
```

**Why?** This matches how we write numbers:

- `123` = digit 0 shows 3, digit 1 shows 2, digit 2 shows 1

---

### **🧪 Challenge 2.1: Count Backwards**

Make it count from 9 down to 0!

<details>
<summary>Solution</summary>

```cpp
void loop() {
  for (int i = 9; i >= 0; i--) {  // Changed direction
    lc.setDigit(0, 0, i, false);
    Serial.print("Displaying: ");
    Serial.println(i);
    delay(500);
  }

  delay(1000);
  lc.clearDisplay(0);
  delay(500);
}
```

</details>

---

## **8.7 🧪 Experiment 3: Multi-Digit Numbers**

Let's display larger numbers using multiple digits!

### **Displaying 2-Digit Numbers**

```cpp
#include <LedControl.h>

const int DIN_PIN = 11;
const int CLK_PIN = 13;
const int CS_PIN = 10;

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);

  Serial.begin(9600);
}

void displayNumber(int num) {
  // Extract digits
  int ones = num % 10;
  int tens = (num / 10) % 10;

  // Display digits
  lc.setDigit(0, 0, ones, false);  // Rightmost digit
  lc.setDigit(0, 1, tens, false);  // Second digit

  Serial.print("Displaying: ");
  Serial.println(num);
}

void loop() {
  // Count from 0 to 99
  for (int i = 0; i <= 99; i++) {
    displayNumber(i);
    delay(100);
  }

  delay(2000);
  lc.clearDisplay(0);
  delay(1000);
}
```

**Watch it count from 00 to 99!** 📊

---

### **Understanding Digit Extraction**

How do we break 42 into 4 and 2?

```cpp
int num = 42;

int ones = num % 10;        // 42 % 10 = 2 (remainder)
int tens = (num / 10) % 10; // 42 / 10 = 4, then 4 % 10 = 4
```

**The pattern continues:**

```cpp
int num = 12345;

int ones      = (num / 1) % 10;     // 5
int tens      = (num / 10) % 10;    // 4
int hundreds  = (num / 100) % 10;   // 3
int thousands = (num / 1000) % 10;  // 2
int tenthous  = (num / 10000) % 10; // 1
```

**Each division by 10 shifts one digit to the right!**

---

### **🧪 Challenge 3.1: 4-Digit Counter**

Display numbers from 0 to 9999!

**Hint:** You'll need to extract 4 digits.

<details>
<summary>Solution</summary>

```cpp
void displayNumber(int num) {
  int digit0 = (num / 1) % 10;
  int digit1 = (num / 10) % 10;
  int digit2 = (num / 100) % 10;
  int digit3 = (num / 1000) % 10;

  lc.setDigit(0, 0, digit0, false);
  lc.setDigit(0, 1, digit1, false);
  lc.setDigit(0, 2, digit2, false);
  lc.setDigit(0, 3, digit3, false);
}

void loop() {
  for (int i = 0; i <= 9999; i++) {
    displayNumber(i);
    delay(10);  // Faster!
  }

  delay(2000);
  lc.clearDisplay(0);
  delay(1000);
}
```

</details>

---

## **8.8 Leading Zeros and Blank Digits**

### **The Problem**

When displaying 42, we probably don't want to see `00000042` - we want ` 42` (or `42`).

**Two approaches:**

**1. Leading zeros (00042):**

```cpp
displayNumber(42);  // Shows: 00000042
```

**2. Leading blanks ( 42):**

```cpp
displayNumberNoBlanks(42);  // Shows:       42
```

---

### **Implementing Leading Blanks**

```cpp
void displayNumber(int num) {
  lc.clearDisplay(0);  // Clear first

  if (num == 0) {
    lc.setDigit(0, 0, 0, false);
    return;
  }

  int digitPos = 0;

  while (num > 0) {
    int digit = num % 10;
    lc.setDigit(0, digitPos, digit, false);
    num = num / 10;
    digitPos++;
  }
}

void loop() {
  displayNumber(42);    // Shows:       42
  delay(2000);
  displayNumber(9);     // Shows:        9
  delay(2000);
  displayNumber(1234);  // Shows:     1234
  delay(2000);
}
```

**Much cleaner!** No leading zeros unless you want them.

---

## **8.9 🧪 Experiment 4: Button Counter with Display**

Let's combine concepts! Button increments a counter shown on display.

```cpp
#include <LedControl.h>

const int DIN_PIN = 11;
const int CLK_PIN = 13;
const int CS_PIN = 10;
const int BUTTON_PIN = 10;  // Adjust if needed
const int BUZZER_PIN = 12;

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

int counter = 0;
int lastButton = HIGH;
unsigned long lastDebounce = 0;
const int DEBOUNCE_DELAY = 50;

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);

  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);

  Serial.begin(9600);
  displayNumber(counter);
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

void loop() {
  int reading = digitalRead(BUTTON_PIN);

  if (reading != lastButton) {
    lastDebounce = millis();
  }

  if ((millis() - lastDebounce) > DEBOUNCE_DELAY) {
    if (reading == LOW && lastButton == HIGH) {
      counter++;

      if (counter > 99999999) {  // Max 8 digits
        counter = 0;
      }

      displayNumber(counter);

      // Beep!
      tone(BUZZER_PIN, 1000, 50);

      Serial.print("Count: ");
      Serial.println(counter);
    }
  }

  lastButton = reading;
}
```

**Now you have an interactive counter!** Press button to increment, hear a beep, see the number!

---

### **🧪 Challenge 4.1: Up/Down Counter**

Use two buttons:

- Button 1: Increment
- Button 2: Decrement
- Don't go below 0

---

## **8.10 🧪 Experiment 5: Potentiometer-Controlled Display**

Display the potentiometer value in real-time!

```cpp
#include <LedControl.h>

const int DIN_PIN = 11;
const int CLK_PIN = 13;
const int CS_PIN = 10;
const int POT_PIN = A0;

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);

  Serial.begin(9600);
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

void loop() {
  int potValue = analogRead(POT_PIN);

  // Display 0-1023
  displayNumber(potValue);

  Serial.print("Pot value: ");
  Serial.println(potValue);

  delay(50);
}
```

**Turn the pot and watch the numbers change!**

---

### **🧪 Challenge 5.1: Percentage Display**

Map pot to 0-100 and show as percentage!

**Bonus:** Show decimal point after 2nd digit (for "XX.X%")

<details>
<summary>Solution</summary>

```cpp
void loop() {
  int potValue = analogRead(POT_PIN);

  // Map to 0-100
  int percentage = map(potValue, 0, 1023, 0, 100);

  // Extract digits
  int ones = percentage % 10;
  int tens = (percentage / 10) % 10;
  int hundreds = (percentage / 100) % 10;

  lc.clearDisplay(0);
  lc.setDigit(0, 0, ones, false);
  lc.setDigit(0, 1, tens, true);  // Decimal point = true!

  if (hundreds > 0) {
    lc.setDigit(0, 2, hundreds, false);
  }

  delay(50);
}
```

Shows: `0.0` to `100.0`

</details>

---

## **8.11 Brightness Control**

The MAX7219 has 16 brightness levels!

```cpp
lc.setIntensity(0, level);  // level = 0 to 15
```

**Values:**

- 0 = Dimmest (barely visible)
- 8 = Medium (comfortable)
- 15 = Brightest (use outdoors or for effect)

---

### **Dynamic Brightness Example**

```cpp
void loop() {
  // Fade up
  for (int brightness = 0; brightness <= 15; brightness++) {
    lc.setIntensity(0, brightness);
    delay(200);
  }

  delay(500);

  // Fade down
  for (int brightness = 15; brightness >= 0; brightness--) {
    lc.setIntensity(0, brightness);
    delay(200);
  }

  delay(500);
}
```

**The display "breathes"!**

---

### **🧪 Challenge: Auto-Brightness**

Use potentiometer to control display brightness!

```cpp
void loop() {
  int potValue = analogRead(POT_PIN);
  int brightness = map(potValue, 0, 1023, 0, 15);

  lc.setIntensity(0, brightness);
  displayNumber(brightness);  // Show current brightness level

  delay(50);
}
```

---

## **8.12 Decimal Points**

Each digit has a decimal point! Useful for displaying decimals.

```cpp
// Show "12.34"
lc.setDigit(0, 0, 4, false);  // 4
lc.setDigit(0, 1, 3, false);  // 3
lc.setDigit(0, 2, 2, true);   // 2. ← decimal point ON!
lc.setDigit(0, 3, 1, false);  // 1
```

**Display shows:** `12.34`

---

### **Temperature Display Example**

```cpp
void displayTemperature(float temp) {
  // Convert 25.6 to 256
  int tempInt = (int)(temp * 10);

  int digit0 = tempInt % 10;
  int digit1 = (tempInt / 10) % 10;
  int digit2 = (tempInt / 100) % 10;

  lc.clearDisplay(0);
  lc.setDigit(0, 0, digit0, false);
  lc.setDigit(0, 1, digit1, true);   // Decimal point!
  lc.setDigit(0, 2, digit2, false);
}

void loop() {
  displayTemperature(25.6);  // Shows: 25.6
  delay(1000);
  displayTemperature(18.3);  // Shows: 18.3
  delay(1000);
}
```

---

## **8.13 🧪 Experiment 6: Stopwatch**

Build a working stopwatch!

```cpp
#include <LedControl.h>

const int DIN_PIN = 11;
const int CLK_PIN = 13;
const int CS_PIN = 10;
const int BUTTON_START_STOP = 10;
const int BUTTON_RESET = 11;

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

unsigned long startTime = 0;
unsigned long elapsedTime = 0;
bool running = false;

int lastButton1 = HIGH;
int lastButton2 = HIGH;

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);

  pinMode(BUTTON_START_STOP, INPUT_PULLUP);
  pinMode(BUTTON_RESET, INPUT_PULLUP);

  Serial.begin(9600);
  displayTime(0);
}

void displayTime(unsigned long milliseconds) {
  // Convert to seconds and hundredths
  unsigned long hundredths = (milliseconds / 10) % 100;
  unsigned long seconds = (milliseconds / 1000) % 60;
  unsigned long minutes = (milliseconds / 60000) % 100;

  lc.clearDisplay(0);

  // Display: MM.SS.HH (minutes.seconds.hundredths)
  lc.setDigit(0, 0, hundredths % 10, false);
  lc.setDigit(0, 1, hundredths / 10, true);  // Decimal point

  lc.setDigit(0, 2, seconds % 10, false);
  lc.setDigit(0, 3, seconds / 10, true);     // Decimal point

  lc.setDigit(0, 4, minutes % 10, false);
  lc.setDigit(0, 5, minutes / 10, false);
}

void loop() {
  // Read buttons
  int button1 = digitalRead(BUTTON_START_STOP);
  int button2 = digitalRead(BUTTON_RESET);

  // Start/Stop button
  if (button1 == LOW && lastButton1 == HIGH) {
    if (running) {
      // Stop
      elapsedTime += millis() - startTime;
      running = false;
      Serial.println("Stopped");
    } else {
      // Start
      startTime = millis();
      running = true;
      Serial.println("Started");
    }
    delay(50);
  }

  // Reset button
  if (button2 == LOW && lastButton2 == HIGH) {
    elapsedTime = 0;
    running = false;
    displayTime(0);
    Serial.println("Reset");
    delay(50);
  }

  lastButton1 = button1;
  lastButton2 = button2;

  // Update display if running
  if (running) {
    unsigned long currentTime = elapsedTime + (millis() - startTime);
    displayTime(currentTime);
  } else {
    displayTime(elapsedTime);
  }

  delay(10);  // Update display frequently
}
```

**You now have a functioning stopwatch!** ⏱️

**Controls:**

- Button 1: Start/Stop
- Button 2: Reset

**Display format:** `MM.SS.HH` (Minutes.Seconds.Hundredths)

---

## **8.14 Displaying Letters (Limited)**

7-segment displays can show some letters!

```cpp
// Letters you can display reasonably well:
lc.setChar(0, 0, 'A', false);  // A
lc.setChar(0, 1, 'b', false);  // b
lc.setChar(0, 2, 'C', false);  // C
lc.setChar(0, 3, 'd', false);  // d
lc.setChar(0, 4, 'E', false);  // E
lc.setChar(0, 5, 'F', false);  // F
lc.setChar(0, 6, 'H', false);  // H
lc.setChar(0, 7, 'L', false);  // L
// Also: P, U, o, n, r, t, etc.
```

**Result:** `A b C d E F H L`

---

### **Scrolling Text**

```cpp
const char message[] = "HELLO   ";  // Need trailing spaces
int messageLength = 8;

void loop() {
  for (int offset = 0; offset < messageLength; offset++) {
    lc.clearDisplay(0);

    for (int i = 0; i < 8; i++) {
      int charIndex = (offset + i) % messageLength;
      lc.setChar(0, 7 - i, message[charIndex], false);
    }

    delay(300);
  }
}
```

**Watch "HELLO" scroll across the display!**

---

## **8.15 🧪 Experiment 7: Countdown Timer**

Build a countdown timer with alarm!

```cpp
#include <LedControl.h>

const int DIN_PIN = 11;
const int CLK_PIN = 13;
const int CS_PIN = 10;
const int BUTTON_START = 10;
const int BUTTON_SET = 11;
const int BUZZER_PIN = 12;

LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 1);

int setMinutes = 1;
int setSeconds = 0;
unsigned long countdownStart = 0;
bool counting = false;

int lastButton1 = HIGH;
int lastButton2 = HIGH;

void setup() {
  lc.shutdown(0, false);
  lc.setIntensity(0, 8);
  lc.clearDisplay(0);

  pinMode(BUTTON_START, INPUT_PULLUP);
  pinMode(BUTTON_SET, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);

  Serial.begin(9600);
  displayTime(setMinutes, setSeconds);
}

void displayTime(int minutes, int seconds) {
  lc.clearDisplay(0);

  lc.setDigit(0, 0, seconds % 10, false);
  lc.setDigit(0, 1, seconds / 10, true);  // Decimal
  lc.setDigit(0, 2, minutes % 10, false);
  lc.setDigit(0, 3, minutes / 10, false);
}

void playAlarm() {
  for (int i = 0; i < 5; i++) {
    tone(BUZZER_PIN, 1000);
    delay(200);
    tone(BUZZER_PIN, 1500);
    delay(200);
  }
  noTone(BUZZER_PIN);
}

void loop() {
  int button1 = digitalRead(BUTTON_START);
  int button2 = digitalRead(BUTTON_SET);

  // Start/Stop button
  if (button1 == LOW && lastButton1 == HIGH) {
    if (counting) {
      counting = false;
      Serial.println("Paused");
    } else {
      countdownStart = millis();
      counting = true;
      Serial.println("Started");
    }
    tone(BUZZER_PIN, 800, 50);
    delay(50);
  }

  // Set button (only works when not counting)
  if (button2 == LOW && lastButton2 == HIGH && !counting) {
    setSeconds += 10;
    if (setSeconds >= 60) {
      setSeconds = 0;
      setMinutes++;
      if (setMinutes > 99) {
        setMinutes = 0;
      }
    }
    displayTime(setMinutes, setSeconds);
    tone(BUZZER_PIN, 600, 50);
    delay(200);
  }

  lastButton1 = button1;
  lastButton2 = button2;

  // Update countdown
  if (counting) {
    unsigned long elapsed = millis() - countdownStart;
    unsigned long totalSeconds = (setMinutes * 60) + setSeconds;
    unsigned long remainingMs = (totalSeconds * 1000) - elapsed;

    if (remainingMs <= 0) {
      // Time's up!
      counting = false;
      displayTime(0, 0);
      playAlarm();

      // Flash display
      for (int i = 0; i < 5; i++) {
        lc.clearDisplay(0);
        delay(200);
        displayTime(0, 0);
        delay(200);
      }

      Serial.println("TIME'S UP!");
    } else {
      int remainingSec = remainingMs / 1000;
      int minutes = remainingSec / 60;
      int seconds = remainingSec % 60;
      displayTime(minutes, seconds);
    }
  }

  delay(100);
}
```

**A complete countdown timer!** ⏰

**Features:**

- Button 1: Start/Pause
- Button 2: Add 10 seconds (when stopped)
- Alarm sound and flashing when time's up!

---

## **8.16 💡 Key Concepts Summary**

### **7-Segment Display Basics**

- ✅ 7 segments (A-G) form digits 0-9
- ✅ Each segment is an LED
- ✅ Combinations create different characters
- ✅ 8th segment is decimal point
- ✅ Can display some letters (A, b, C, d, E, F, H, L, P, U, etc.)

### **MAX7219 Driver**

- ✅ Controls up to 8 digits with 3 pins
- ✅ Uses SPI communication (DIN, CLK, CS)
- ✅ Built-in brightness control (0-15)
- ✅ Handles multiplexing automatically
- ✅ Simplifies wiring dramatically

### **LedControl Library**

- ✅ `lc.shutdown(0, false)` - Wake up display
- ✅ `lc.setIntensity(0, level)` - Set brightness
- ✅ `lc.clearDisplay(0)` - Clear all digits
- ✅ `lc.setDigit(0, pos, digit, dp)` - Show digit with optional decimal
- ✅ `lc.setChar(0, pos, char, dp)` - Show character

### **Important Concepts**

- ✅ Digits numbered 0-7 from RIGHT to LEFT
- ✅ Extract digits with division and modulo
- ✅ `millis()` for timing applications
- ✅ Combine with buttons, pots, buzzer for complete projects

---

## **8.17 🚀 Final Challenges**

### **Challenge A: Score Keeper**

Create a 2-player score keeper:

- Each player has a button
- Display both scores (4 digits each)
- Buzzer sounds different for each player
- Long press resets scores
- First to 9999 wins with special animation

---

### **Challenge B: Digital Clock**

Build a real-time clock:

- Display HH:MM:SS format
- Use `millis()` for timekeeping
- Buttons to set hours and minutes
- Blinking colon separator (use decimal points)
- Alarm feature at set time

**Note:** This won't keep accurate time after power off (no RTC module), but will run while powered!

---

### **Challenge C: Reaction Time Leaderboard**

Expand the reaction game:

- Show "GO" on display
- Measure reaction time
- Display result in milliseconds
- Keep track of best 3 times
- Show leaderboard on display
- Scroll through times with button

---

### **Challenge D: Calculator**

Build a simple calculator:

- Pot controls first number (0-99)
- Button 1 cycles operation (+, -, ×, ÷)
- Pot controls second number
- Button 2 calculates result
- Display shows: num1 OP num2 = result (scrolling)

---

### **Challenge E: Number Guessing Game**

Computer thinks of random number 0-99:

- Use pot to guess
- Display your current guess
- LED bar shows "warmer/colder"
- Buzzer pitch indicates closeness
- Display shows guesses taken
- New game on button press

---

## **8.18 Troubleshooting Guide**

**Problem: Display shows nothing / all dark**

Check:

- [ ] VCC connected to 5V?
- [ ] GND connected properly?
- [ ] DIN, CLK, CS on correct pins?
- [ ] Called `lc.shutdown(0, false)` in setup?
- [ ] Brightness not set to 0?
- [ ] LedControl library installed?
- [ ] USB providing enough power?

---

**Problem: Display shows random segments/gibberish**

Check:

- [ ] Correct pin numbers in LedControl constructor?
- [ ] DIN, CLK, CS not swapped?
- [ ] Verify pin numbers match your wiring
- [ ] Try example code from library first
- [ ] Module compatible with LedControl library?

---

**Problem: Some digits work, others don't**

Check:

- [ ] Using correct digit numbers (0-7)?
- [ ] Remember: 0 is RIGHTMOST digit
- [ ] Calling clearDisplay before setting digits?
- [ ] Hardware issue? (Try displaying 8 on all digits to test)

---

**Problem: Display very dim or too bright**

Check:

- [ ] Brightness set appropriately? (try 8)
- [ ] `lc.setIntensity(0, level)` called?
- [ ] Power supply sufficient?
- [ ] Ambient lighting affecting perception?

Solution: Adjust brightness:

```cpp
lc.setIntensity(0, 8);  // Try values 0-15
```

---

**Problem: Numbers appear backwards or wrong**

Check:

- [ ] Understanding digit numbering? (0 = rightmost)
- [ ] Digit extraction math correct?
- [ ] Displaying in correct order?

Debug by showing known pattern:

```cpp
// Should show 01234567
for (int i = 0; i < 8; i++) {
  lc.setDigit(0, i, i, false);
}
```

---

**Problem: Library won't install**

Check:

- [ ] Arduino IDE updated to latest version?
- [ ] Internet connection active?
- [ ] Try restarting Arduino IDE
- [ ] Search for "LedControl by Eberhard Fahle" specifically

Manual installation:

1. Download from https://github.com/wayoda/LedControl
2. Sketch → Include Library → Add .ZIP Library
3. Select downloaded file

---

**Problem: Compilation error about LedControl**

Check:

- [ ] `#include <LedControl.h>` at top of code?
- [ ] Library actually installed?
- [ ] Correct capitalization? (LedControl not ledcontrol)

---

## **8.19 Understanding SPI Communication (Advanced)**

**What happens when you call `lc.setDigit()`?**

Behind the scenes, Arduino:

1. Pulls CS/LOAD pin LOW (select MAX7219)
2. Sends 16 bits of data via DIN:
   - 8 bits for register address
   - 8 bits for data value
3. Pulses CLK pin for each bit
4. Pulls CS/LOAD pin HIGH (latch data)

**Timing diagram:**

```
CS:   ──────┐                ┌────
            └────────────────┘

CLK:  ──┐  ┐  ┐  ┐  ┐  ┐  ┐  ┐
        └──┘  └──┘  └──┘  └──┘

DIN:  ───ADDRESS────DATA────
```

**The beauty:** LedControl library handles ALL of this!

---

## **8.20 MAX7219 Registers (For Curious Minds)**

The MAX7219 has internal registers you can access:

```
Register | Function
─────────┼──────────────────
0x00     | No-Op (do nothing)
0x01-0x08| Digit 0-7 data
0x09     | Decode mode
0x0A     | Intensity (brightness)
0x0B     | Scan limit (how many digits)
0x0C     | Shutdown mode
0x0F     | Display test
```

**LedControl abstracts these away**, but if you're curious:

```cpp
// Low-level: Set digit 0 to show '5'
// LedControl does this internally!
```

**You don't need to know this**, but it's interesting to understand what's happening under the hood!

---

## **8.21 Multiple Displays (Chaining)**

MAX7219 modules can be chained! Connect:

- First module's DIN → Arduino
- First module's DOUT → Second module's DIN
- Both CLK and CS pins connect in parallel

```cpp
// For 2 displays:
LedControl lc = LedControl(DIN_PIN, CLK_PIN, CS_PIN, 2);

// Control first display:
lc.setDigit(0, 0, 5, false);

// Control second display:
lc.setDigit(1, 0, 3, false);
```

**This gives you 16 digits total!**

---

## **8.22 What You've Achieved**

Congratulations! You can now:

- ✅ Control 7-segment displays with MAX7219
- ✅ Install and use Arduino libraries
- ✅ Display numbers 0-9 and simple letters
- ✅ Create multi-digit displays
- ✅ Extract digits from numbers mathematically
- ✅ Build counters and timers
- ✅ Control brightness dynamically
- ✅ Use decimal points for decimals
- ✅ Combine displays with buttons, pots, and sound
- ✅ Build complete practical projects

**Most importantly:** You can now SHOW information to users in a clear, readable way!

---

## **Looking Ahead to Chapter 9**

In the next chapter, we'll **COMBINE EVERYTHING** we've learned!

You'll learn:

- System design thinking
- Integrating multiple inputs and outputs
- State machines and modes
- Creating complete, polished projects
- User interface design
- Real-world problem solving

**Before next class:**

- Think about a project YOU want to build
- What would combine display, buttons, sound, LEDs?
- Sketch your idea on paper
- Consider: What would make it feel "complete"?

---

**Vocabulary Review:**

- **7-Segment Display** - Display with 7 LED segments forming digits
- **MAX7219** - Driver chip that controls multiple displays
- **SPI** - Serial Peripheral Interface (communication protocol)
- **Multiplexing** - Rapidly switching to control many LEDs with few pins
- **Library** - Pre-written code that adds functionality
- **Register** - Internal storage location in a chip
- **Digit Position** - Location of digit (0-7, right to left)
- **Decimal Point** - Dot indicating decimal position
- **Brightness/Intensity** - How bright the display appears

---

**In your notebook:**

- Draw how segments A-G form different digits
- Sketch your dream project using the display
- Write the math for extracting digits from 12345
- Design a user interface layout

See you in Chapter 9 - where we build complete systems! 🎯🚀

---
