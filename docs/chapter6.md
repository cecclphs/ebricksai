# **Chapter 6: Analog Input - Reading the Continuous World**

## **Chapter Overview**

🎯 **What You'll Learn:**

- The difference between digital (ON/OFF) and analog (variable) signals
- How potentiometers work
- Reading analog values with `analogRead()`
- Mapping ranges with `map()` function
- Creating smooth, responsive controls
- Filtering noisy sensor readings
- Building interactive analog-controlled projects

🔧 **Required eBricks-AI Modules:**

- Controller module (Arduino Pro Mini / ESP32)
- 8-bit LED Bar module (already connected)
- Potentiometer module
- 2× Button modules (from Chapter 5)
- Power connector
- Connection wires

⏱️ **Time Required:** 90-120 minutes

---

## **6.1 Digital vs Analog - Understanding the Difference**

### **What We've Learned So Far: Digital**

In Chapters 1-5, everything was **digital** - binary, ON or OFF:

```
Button: PRESSED (0) or NOT PRESSED (1)
LED:    ON (HIGH) or OFF (LOW)
Binary: 0 or 1
```

**Digital is like a light switch:** It's either fully ON or fully OFF. No in-between.

---

### **The Real World: Analog**

But most real-world things aren't just ON or OFF. They vary continuously:

```
Temperature: 20°C, 20.5°C, 21°C, 21.3°C...
Brightness: Dim → Medium → Bright (infinite shades)
Volume: Quiet → Normal → Loud (continuous range)
Position: 0cm, 1cm, 2cm, 2.5cm, 3cm...
```

**Analog is like a dimmer switch:** You can set it to ANY position between fully off and fully on.

---

### **Visual Comparison**

**Digital Signal:**

```
Voltage
5V ┤     ┌────┐     ┌────┐
   │     │    │     │    │
   │     │    │     │    │
0V └─────┘    └─────┘    └─────→ Time

Only two states: HIGH (5V) or LOW (0V)
```

**Analog Signal:**

```
Voltage
5V ┤   ╱╲    ╱╲
   │  ╱  ╲  ╱  ╲
   │ ╱    ╲╱    ╲
0V └──────────────────→ Time

Smooth continuous values: 0V, 0.5V, 1V, 1.5V... 5V
```

---

### **🧪 Physical Analogy Activity**

**Digital (Button):**

- Stand up or sit down (only 2 states)
- You can't be "partially standing"

**Analog (Potentiometer):**

- Raise your arm from your side to above your head
- Your arm can be at ANY angle between 0° and 180°
- Infinite positions!

**This is the difference between digital and analog!**

---

## **6.2 Understanding Potentiometers**

### **What is a Potentiometer?**

A **potentiometer** (or "pot" for short) is a variable resistor with a knob or slider you can turn.

**Common examples:**

- Volume knobs on speakers
- Brightness controls on monitors
- Temperature dials on ovens
- Game controller joysticks

---

### **How Potentiometers Work**

Inside a potentiometer:

```
     5V (VCC)
      │
      ├─────────────────┐
      │                 │
      │    Resistive    │
      │      Track      │
      │                 │
      ├─────[Wiper]─────┤──→ Signal Output
      │        ↑        │
      │        │        │     (voltage varies based
      │     Turn knob   │      on wiper position)
      │                 │
      │                 │
      └─────────────────┘
      │
     GND (0V)
```

**When you turn the knob:**

- **Fully left:** Wiper touches GND → Output = 0V
- **Middle:** Wiper in center → Output = 2.5V
- **Fully right:** Wiper touches VCC → Output = 5V

**It's a voltage divider!** The output voltage varies smoothly from 0V to 5V.

---

### **Your eBricks-AI Potentiometer Module**

Your potentiometer module has three connections:

```
[Potentiometer Module]
┌──────────────┐
│   [Knob]     │ ← Turn this!
├──────────────┤
│ VCC GND SIG  │ ← Connections
└──────────────┘
```

**Pin connections:**

- **VCC** → Arduino 5V (power)
- **GND** → Arduino GND (ground)
- **SIG** → Arduino Analog Pin (A0-A7)

---

## **6.3 Connecting Your Potentiometer**

### **Physical Connection**

**Step 1:** Disconnect USB power! ⚡

**Step 2:** Connect potentiometer to Arduino:

- Pot VCC → Arduino VCC (5V)
- Pot GND → Arduino GND
- Pot SIG → Arduino A0 (Analog pin 0)

**Step 3:** Verify all LED bar and button connections are still secure

**Step 4:** Reconnect USB power

**Notice:** Analog pins are labeled differently! **A0, A1, A2...** not just numbers.

---

### **Understanding Analog Pins**

Arduino has separate analog input pins:

```
[Arduino - Analog Pins]
A0 ●  ← Can read 0-1023
A1 ●
A2 ●     These are ONLY for INPUT
A3 ●     (can't use digitalWrite here!)
A4 ●
A5 ●
...
```

**Important differences:**

- **Digital pins (2-13):** Only read HIGH or LOW
- **Analog pins (A0-A7):** Read values from 0 to 1023

**Why 0-1023?**

- Arduino has a 10-bit ADC (Analog-to-Digital Converter)
- 10 bits = 2^10 = 1024 different values
- Range: 0 to 1023 (1024 values total)

---

## **6.4 🧪 Experiment 1: Reading Analog Values**

Let's read our first analog sensor!

### **Basic Analog Reading Code**

```cpp
const int POT_PIN = A0;  // Potentiometer on analog pin A0

void setup() {
  Serial.begin(9600);
  Serial.println("=== Analog Reading Test ===");
  Serial.println("Turn the potentiometer and watch the values!");
  Serial.println();
}

void loop() {
  int sensorValue = analogRead(POT_PIN);  // Read analog value

  Serial.print("Value: ");
  Serial.println(sensorValue);

  delay(100);  // Update 10 times per second
}
```

**Upload this code and open Serial Monitor!**

---

### **🧪 What Do You Observe?**

**Slowly turn the potentiometer knob from fully left to fully right.**

**Questions:**

1. **What's the lowest value you see?**
   Your answer: **\*\***\_\_\_**\*\***

2. **What's the highest value you see?**
   Your answer: **\*\***\_\_\_**\*\***

3. **When you turn the knob just a tiny bit, does the value change?**
   Your answer: **\*\***\_\_\_**\*\***

4. **How many different values can you get?**
   Your answer: **\*\***\_\_\_**\*\***

---

### **Expected Results**

You should see:

- **Fully left:** Values near **0** (might be 0-5)
- **Fully right:** Values near **1023** (might be 1018-1023)
- **Middle:** Values around **512** (half of 1023)
- **Smooth changes:** Small turns = small value changes

**This is analog input!** You have 1024 distinct values instead of just 2!

---

## **6.5 Visualizing Analog Values with LEDs**

Let's create a **bar graph** on our LED bar to visualize the potentiometer position!

### **Challenge: Think First!**

Before looking at the code:

**Problem:** We have values from 0-1023, but only 8 LEDs.

**Question:** How do we show a value like 512 on just 8 LEDs?

<details>
<summary>Hint</summary>

Think about dividing the range!

- Values 0-127 → Light 1 LED
- Values 128-255 → Light 2 LEDs
- Values 256-383 → Light 3 LEDs
- etc.

</details>

---

### **Bar Graph Code - Version 1 (Manual Approach)**

```cpp
const int POT_PIN = A0;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;

void setup() {
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(POT_PIN);

  // Print value
  Serial.print("Value: ");
  Serial.print(sensorValue);
  Serial.print(" → LEDs: ");

  // Determine how many LEDs to light
  // 1023 / 8 = ~128 values per LED
  int numLEDs = 0;

  if (sensorValue >= 896) {  // 7 * 128
    numLEDs = 8;
  } else if (sensorValue >= 768) {  // 6 * 128
    numLEDs = 7;
  } else if (sensorValue >= 640) {  // 5 * 128
    numLEDs = 6;
  } else if (sensorValue >= 512) {  // 4 * 128
    numLEDs = 5;
  } else if (sensorValue >= 384) {  // 3 * 128
    numLEDs = 4;
  } else if (sensorValue >= 256) {  // 2 * 128
    numLEDs = 3;
  } else if (sensorValue >= 128) {  // 1 * 128
    numLEDs = 2;
  } else if (sensorValue > 0) {
    numLEDs = 1;
  }

  Serial.println(numLEDs);

  // Light up the LEDs
  for (int i = 0; i < NUM_LEDS; i++) {
    if (i < numLEDs) {
      digitalWrite(FIRST_LED + i, HIGH);
    } else {
      digitalWrite(FIRST_LED + i, LOW);
    }
  }

  delay(50);
}
```

**Upload and test!** Turn the pot - watch LEDs light up progressively!

---

### **The Problem with This Approach**

Look at all those `if-else` statements! This is:

- **Tedious to write** (8 conditions!)
- **Hard to modify** (what if we had 16 LEDs?)
- **Error-prone** (easy to miscalculate thresholds)

**There must be a better way!**

---

## **6.6 The Magic of map() Function**

Arduino has a built-in function to convert between ranges: **`map()`**

### **Understanding map()**

```cpp
map(value, fromLow, fromHigh, toLow, toHigh)
```

**Parameters:**

- `value` - The number to map
- `fromLow` - Lower bound of input range
- `fromHigh` - Upper bound of input range
- `toLow` - Lower bound of output range
- `toHigh` - Upper bound of output range

**What it does:** Proportionally converts a value from one range to another!

---

### **Visual Explanation**

```
Input range:     0 ─────────────────────── 1023
                 │                          │
                 │       value = 512        │
                 │           ↓              │
                 └───────────┼──────────────┘
                             │
                             ↓ map(512, 0, 1023, 0, 8)
                             ↓
Output range:    0 ─────────────────────── 8
                 │           ↓              │
                 │       result = 4         │
                 └──────────────────────────┘
```

**Formula behind map():**

```
result = (value - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow
```

**Don't memorize this!** Just use `map()` and let Arduino do the math!

---

### **Examples of map()**

```cpp
// Convert 0-1023 to 0-8 (LED count)
int leds = map(512, 0, 1023, 0, 8);
// Result: 4

// Convert 0-1023 to 0-255 (PWM brightness)
int brightness = map(300, 0, 1023, 0, 255);
// Result: 75

// Convert 0-1023 to percentage (0-100)
int percent = map(768, 0, 1023, 0, 100);
// Result: 75%

// Reverse mapping (high input → low output)
int reversed = map(200, 0, 1023, 1023, 0);
// Result: 823
```

---

### **Bar Graph - Improved with map()**

```cpp
const int POT_PIN = A0;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;

void setup() {
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(POT_PIN);

  // Map 0-1023 to 0-8 (number of LEDs)
  int numLEDs = map(sensorValue, 0, 1023, 0, NUM_LEDS);

  Serial.print("Value: ");
  Serial.print(sensorValue);
  Serial.print(" → LEDs: ");
  Serial.println(numLEDs);

  // Light up LEDs
  for (int i = 0; i < NUM_LEDS; i++) {
    if (i < numLEDs) {
      digitalWrite(FIRST_LED + i, HIGH);
    } else {
      digitalWrite(FIRST_LED + i, LOW);
    }
  }

  delay(50);
}
```

**Much cleaner!** One line replaces all those if-else statements!

---

## **6.7 🧪 Experiment 2: Controlling Speed**

Let's use the potentiometer to control how fast our LED pattern moves!

### **Variable Speed Scanner**

```cpp
const int POT_PIN = A0;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;

void setup() {
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(POT_PIN);

  // Map to delay time: 10ms (fast) to 500ms (slow)
  int delayTime = map(sensorValue, 0, 1023, 10, 500);

  Serial.print("Speed: ");
  Serial.print(delayTime);
  Serial.println("ms per step");

  // Scan left to right
  for (int led = 0; led < NUM_LEDS; led++) {
    // Turn on current LED
    digitalWrite(FIRST_LED + led, HIGH);

    // Read pot again to get current speed
    sensorValue = analogRead(POT_PIN);
    delayTime = map(sensorValue, 0, 1023, 10, 500);

    delay(delayTime);

    // Turn off current LED
    digitalWrite(FIRST_LED + led, LOW);
  }
}
```

**Try this!** Turn the pot while the pattern is running - the speed changes in real-time!

---

### **Challenge 7.1: Reverse Control**

Modify the code so that:

- Pot fully left = FAST
- Pot fully right = SLOW

**Hint:** Use map() with reversed range!

<details>
<summary>Solution</summary>

```cpp
int delayTime = map(sensorValue, 0, 1023, 500, 10);
//                                        ↑    ↑
//                                   Swapped these!
```

</details>

---

## **6.8 🧪 Experiment 3: Analog-Controlled Binary Display**

Let's display the potentiometer value in binary!

```cpp
const int POT_PIN = A0;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;

void setup() {
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }
  Serial.begin(9600);
}

void displayBinary(byte number) {
  for (int bit = 0; bit < NUM_LEDS; bit++) {
    int pin = FIRST_LED + bit;

    if (number & (1 << bit)) {
      digitalWrite(pin, HIGH);
    } else {
      digitalWrite(pin, LOW);
    }
  }
}

void loop() {
  int sensorValue = analogRead(POT_PIN);

  // Map 0-1023 to 0-255 (8-bit range)
  byte mappedValue = map(sensorValue, 0, 1023, 0, 255);

  Serial.print("Analog: ");
  Serial.print(sensorValue);
  Serial.print(" → Binary: ");
  Serial.print(mappedValue);
  Serial.print(" = ");
  Serial.println(mappedValue, BIN);

  displayBinary(mappedValue);

  delay(100);
}
```

**Result:** Turn the pot and watch the binary number change on your LEDs!

---

## **6.9 Constrain and Smoothing**

### **The constrain() Function**

Sometimes you want to limit values to a specific range:

```cpp
constrain(value, min, max)
```

**What it does:** Keeps value between min and max

**Examples:**

```cpp
constrain(150, 0, 100);   // Returns 100 (clamped to max)
constrain(-5, 0, 100);    // Returns 0 (clamped to min)
constrain(50, 0, 100);    // Returns 50 (within range)
```

**Use case:**

```cpp
int brightness = analogRead(POT_PIN);
brightness = constrain(brightness, 50, 255);
// Brightness never goes below 50 (never fully dark)
```

---

### **The Problem: Noisy Readings**

Let's look at what happens when we read analog values very precisely:

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(A0);
  Serial.println(value);
  delay(10);
}
```

**Upload and DON'T touch the potentiometer!**

**What you might see:**

```
512
513
512
514
511
513
512
```

**The value jumps around even when you're not moving the pot!**

**Why?** Electrical noise, tiny voltage fluctuations, interference from other components.

---

### **Solution: Averaging (Smoothing)**

Take multiple readings and average them:

```cpp
const int POT_PIN = A0;
const int NUM_READINGS = 10;

void setup() {
  Serial.begin(9600);
}

int smoothRead(int pin) {
  long sum = 0;  // Use long to avoid overflow

  for (int i = 0; i < NUM_READINGS; i++) {
    sum += analogRead(pin);
    delay(1);  // Small delay between readings
  }

  return sum / NUM_READINGS;  // Return average
}

void loop() {
  int rawValue = analogRead(POT_PIN);
  int smoothValue = smoothRead(POT_PIN);

  Serial.print("Raw: ");
  Serial.print(rawValue);
  Serial.print("\tSmooth: ");
  Serial.println(smoothValue);

  delay(100);
}
```

**The smooth value is much more stable!**

---

### **Running Average (Better Method)**

Instead of reading 10 times every loop, keep a running average:

```cpp
const int POT_PIN = A0;
const int NUM_READINGS = 10;

int readings[NUM_READINGS];  // Array to store readings
int readIndex = 0;           // Current position
int total = 0;               // Running total
int average = 0;             // Average value

void setup() {
  Serial.begin(9600);

  // Initialize array
  for (int i = 0; i < NUM_READINGS; i++) {
    readings[i] = 0;
  }
}

void loop() {
  // Subtract oldest reading
  total = total - readings[readIndex];

  // Read new value
  readings[readIndex] = analogRead(POT_PIN);

  // Add newest reading
  total = total + readings[readIndex];

  // Advance to next position
  readIndex++;
  if (readIndex >= NUM_READINGS) {
    readIndex = 0;  // Wrap around
  }

  // Calculate average
  average = total / NUM_READINGS;

  Serial.println(average);
  delay(50);
}
```

**This is more efficient** - only one analogRead() per loop!

---

## **6.10 🧪 Experiment 4: Combining Analog and Digital**

Let's use the potentiometer AND buttons together!

### **Project: Adjustable Counter**

- Potentiometer controls COUNT SPEED
- Button 1 counts UP
- Button 2 counts DOWN
- Display count in binary

```cpp
const int POT_PIN = A0;
const int BUTTON1_PIN = 10;
const int BUTTON2_PIN = 11;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;

byte counter = 0;
int lastButton1 = HIGH;
int lastButton2 = HIGH;

void setup() {
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);

  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }

  Serial.begin(9600);
  displayBinary(counter);
}

void displayBinary(byte number) {
  Serial.print("Count: ");
  Serial.print(number);
  Serial.print(" = ");

  for (int bit = 0; bit < NUM_LEDS; bit++) {
    int pin = FIRST_LED + bit;

    if (number & (1 << bit)) {
      digitalWrite(pin, HIGH);
      Serial.print("1");
    } else {
      digitalWrite(pin, LOW);
      Serial.print("0");
    }
  }
  Serial.println();
}

void loop() {
  // Read potentiometer for speed
  int potValue = analogRead(POT_PIN);
  int autoSpeed = map(potValue, 0, 1023, 1000, 50);  // 1000ms to 50ms

  // Check button 1 (count up)
  int button1 = digitalRead(BUTTON1_PIN);
  if (button1 == LOW && lastButton1 == HIGH) {
    counter++;
    displayBinary(counter);
    delay(50);  // Debounce
  }
  lastButton1 = button1;

  // Check button 2 (count down)
  int button2 = digitalRead(BUTTON2_PIN);
  if (button2 == LOW && lastButton2 == HIGH) {
    counter--;
    displayBinary(counter);
    delay(50);  // Debounce
  }
  lastButton2 = button2;

  // Auto-count mode when both buttons pressed
  if (button1 == LOW && button2 == LOW) {
    counter++;
    displayBinary(counter);
    delay(autoSpeed);  // Speed controlled by pot!
  }
}
```

**Try this:**

- Press button 1 to count up manually
- Press button 2 to count down manually
- Hold BOTH buttons and turn pot to control auto-count speed!

---

## **6.11 Creating Threshold Controls**

Sometimes you want to detect when an analog value crosses a threshold.

### **Example: Simple Alarm**

```cpp
const int POT_PIN = A0;
const int LED_PIN = 2;
const int THRESHOLD = 800;  // Alarm threshold

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(POT_PIN);

  Serial.print("Value: ");
  Serial.print(sensorValue);

  if (sensorValue > THRESHOLD) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println(" → ALARM!");
  } else {
    digitalWrite(LED_PIN, LOW);
    Serial.println(" → OK");
  }

  delay(100);
}
```

**Turn the pot past the threshold - LED lights up!**

---

### **Hysteresis (Preventing Flickering)**

**Problem:** When value is right at the threshold, it flickers on/off rapidly.

**Solution:** Use TWO thresholds - one for turning ON, one for turning OFF:

```cpp
const int POT_PIN = A0;
const int LED_PIN = 2;
const int THRESHOLD_HIGH = 800;  // Turn ON threshold
const int THRESHOLD_LOW = 700;   // Turn OFF threshold

bool alarmActive = false;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(POT_PIN);

  // Turn ON when crossing HIGH threshold
  if (sensorValue > THRESHOLD_HIGH && !alarmActive) {
    alarmActive = true;
    digitalWrite(LED_PIN, HIGH);
    Serial.println("ALARM ACTIVATED!");
  }

  // Turn OFF when dropping below LOW threshold
  if (sensorValue < THRESHOLD_LOW && alarmActive) {
    alarmActive = false;
    digitalWrite(LED_PIN, LOW);
    Serial.println("Alarm deactivated");
  }

  delay(100);
}
```

**Now it won't flicker** when value is between 700-800!

---

## **6.12 🧪 Experiment 5: Creating Different Control Curves**

Not all controls need to be linear! Let's explore different response curves.

### **Linear Response (What We've Been Using)**

```cpp
int output = map(input, 0, 1023, 0, 255);
```

```
Output
255 ┤                    ╱
    │                  ╱
    │                ╱
    │              ╱
    │            ╱
    │          ╱
    │        ╱
  0 └──────────────────────→ Input (0-1023)
           Linear - equal steps
```

---

### **Exponential Response (For Volume Controls)**

Human perception of volume is logarithmic, so we want exponential mapping:

```cpp
void loop() {
  int sensorValue = analogRead(POT_PIN);

  // Square the input for exponential curve
  long squared = (long)sensorValue * sensorValue;
  int output = map(squared, 0, 1023L * 1023L, 0, 255);

  Serial.print("Input: ");
  Serial.print(sensorValue);
  Serial.print("\tOutput: ");
  Serial.println(output);

  delay(100);
}
```

```
Output
255 ┤                      ╱
    │                    ╱
    │                 ╱
    │              ╱
    │          ╱
    │      ╱
    │  ╱
  0 └──────────────────────→ Input
      Exponential - more control at low end
```

---

### **S-Curve (Smooth Start and End)**

```cpp
float sCurve(int input) {
  // Normalize to 0-1
  float x = input / 1023.0;

  // S-curve formula: 3x² - 2x³
  float y = (3 * x * x) - (2 * x * x * x);

  // Scale back to 0-255
  return y * 255;
}

void loop() {
  int sensorValue = analogRead(POT_PIN);
  int output = (int)sCurve(sensorValue);

  Serial.print("Input: ");
  Serial.print(sensorValue);
  Serial.print("\tOutput: ");
  Serial.println(output);

  delay(100);
}
```

```
Output
255 ┤                 ╱─────
    │               ╱
    │             ╱
    │           ╱
    │         ╱
    │       ╱
    │  ────╱
  0 └──────────────────────→ Input
      S-curve - smooth at both ends
```

**Use cases:**

- Linear: General purpose
- Exponential: Volume, brightness
- S-curve: Smooth motor control

---

## **6.13 Advanced: Dead Zone**

Sometimes you want a range in the middle where nothing happens:

```cpp
const int POT_PIN = A0;
const int DEAD_ZONE_CENTER = 512;
const int DEAD_ZONE_WIDTH = 100;

void loop() {
  int sensorValue = analogRead(POT_PIN);

  int deadZoneMin = DEAD_ZONE_CENTER - DEAD_ZONE_WIDTH / 2;
  int deadZoneMax = DEAD_ZONE_CENTER + DEAD_ZONE_WIDTH / 2;

  int output;

  if (sensorValue < deadZoneMin) {
    // Left side
    output = map(sensorValue, 0, deadZoneMin, -255, 0);
    Serial.print("LEFT: ");
  } else if (sensorValue > deadZoneMax) {
    // Right side
    output = map(sensorValue, deadZoneMax, 1023, 0, 255);
    Serial.print("RIGHT: ");
  } else {
    // Dead zone - no output
    output = 0;
    Serial.print("CENTER (dead zone): ");
  }

  Serial.println(output);
  delay(100);
}
```

**Use case:** Joystick controls where center = no movement

---

## **6.14 💡 Key Concepts Summary**

### **Analog Input Basics**

- ✅ `analogRead(pin)` reads values from 0 to 1023
- ✅ Analog pins labeled A0, A1, A2, etc.
- ✅ 10-bit resolution = 1024 possible values
- ✅ Represents voltage from 0V to 5V
- ✅ Potentiometers create variable voltage

### **Essential Functions**

- ✅ `map(value, fromLow, fromHigh, toLow, toHigh)` - Convert ranges
- ✅ `constrain(value, min, max)` - Limit values
- ✅ Smoothing reduces noise in readings
- ✅ Running average more efficient than repeated readings

### **Advanced Techniques**

- ✅ Hysteresis prevents flickering at thresholds
- ✅ Different curves for different controls
- ✅ Dead zones for centered controls
- ✅ Combining analog and digital inputs

### **Practical Applications**

- ✅ Speed controls
- ✅ Brightness/volume controls
- ✅ Position feedback
- ✅ Threshold detection
- ✅ Interactive interfaces

---

## **6.15 🚀 Final Challenges**

### **Challenge A: Etch-A-Sketch**

Create a simple drawing system:

- Potentiometer controls which LED is "active"
- Button 1 toggles that LED on/off
- Button 2 clears all LEDs
- You can "draw" patterns on the LED bar!

---

### **Challenge B: Digital Thermometer Simulator**

Use potentiometer to simulate temperature:

- Map 0-1023 to temperature range (e.g., 0-50°C)
- Display in binary on LEDs
- Print to Serial in decimal
- LED bar shows "heat level"
- Alarm if temperature > threshold

---

### **Challenge C: Adjustable Metronome**

Create a musical beat keeper:

- Potentiometer controls tempo (BPM)
- Display BPM in binary
- Flash LED on each beat
- Buzzer beeps on beat
- Button changes time signature (4/4, 3/4, 6/8)

**Hint:** Calculate delay from BPM:

```cpp
int delayMs = 60000 / BPM;  // 60000ms = 1 minute
```

---

### **Challenge D: Safe Combination Lock**

Create a lock that opens with correct potentiometer positions:

- Must turn pot to 3 specific positions in sequence
- Each position has a tolerance (± 50)
- LED feedback for correct/incorrect
- Timeout resets if too slow
- Success displays special pattern

---

### **Challenge E: Analog-Controlled Game**

Create "Catch the Light":

- One LED moves back and forth automatically
- Potentiometer controls a "catcher" LED
- Press button when both LEDs align
- Score points for successful catches
- Speed increases with score
- Display score in binary

---

## **6.16 Troubleshooting Guide**

**Problem: Values don't reach 0 or 1023**

Check:

- [ ] Potentiometer fully turned both directions?
- [ ] VCC connected to 5V (not 3.3V)?
- [ ] All jumper wires firmly connected to labeled pins?
- [ ] Potentiometer itself working? (test with multimeter)

**Typical ranges:** 0-5 at minimum, 1018-1023 at maximum is normal.

---

**Problem: Readings are very noisy/jumpy**

Check:

- [ ] Implemented smoothing/averaging?
- [ ] Power supply stable?
- [ ] Wires not near motors or other noise sources?
- [ ] Using shielded cable for long connections?

**Solutions:**

- Increase averaging samples (try 20 instead of 10)
- Add small capacitor (0.1µF) across pot pins
- Keep wires short and away from noise sources

---

**Problem: Values stuck at 0 or 1023**

Check:

- [ ] Is SIG pin connected to analog input (A0-A7)?
- [ ] Not connected to digital pin by mistake?
- [ ] VCC and GND connections correct?
- [ ] Potentiometer not broken? (test continuity)

---

**Problem: Unexpected values or reversed**

Check:

- [ ] VCC and GND swapped?
- [ ] SIG connected to correct pin?
- [ ] Potentiometer wired backwards? (swap VCC and GND)
- [ ] Using correct pin in code (A0, not just 0)?

---

**Problem: map() giving wrong results**

Check:

- [ ] Correct order of parameters?
- [ ] From range matches actual input range?
- [ ] Integer overflow? (use long for large numbers)
- [ ] Testing edge cases (min and max values)?

**Common mistake:**

```cpp
// WRONG:
map(value, 0, 8, 0, 1023);  // Parameters backwards!

// CORRECT:
map(value, 0, 1023, 0, 8);
```

---

**Problem: Control too sensitive or not sensitive enough**

Check:

- [ ] Using appropriate mapping range?
- [ ] Implemented smoothing?
- [ ] Added dead zone if needed?
- [ ] Using correct response curve (linear/exponential)?

**Solutions:**

- Narrow the output range for less sensitivity
- Widen output range for more sensitivity
- Use exponential curve for finer control at one end

---

## **6.17 Understanding ADC (Advanced Topic)**

**What happens inside `analogRead()`?**

Arduino has an **Analog-to-Digital Converter (ADC)** that:

1. **Samples** the voltage on the pin
2. **Compares** it to a reference voltage (5V)
3. **Converts** to a digital number (0-1023)

```
Voltage Input:  3.5V
Reference:      5V
Calculation:    3.5 / 5 = 0.7
10-bit value:   0.7 × 1023 = 716
Result:         analogRead() returns 716
```

**ADC Characteristics:**

- **Resolution:** 10 bits (1024 steps)
- **Speed:** ~10,000 samples per second
- **Accuracy:** ± 2 LSB (Least Significant Bits)
- **Reference:** 5V (or 3.3V on some boards)

---

## **6.18 Real-World Applications**

### **Sensors That Use Analog Output**

Many sensors output analog voltages:

**Temperature Sensors (LM35, TMP36):**

```cpp
int reading = analogRead(TEMP_PIN);
float voltage = reading * (5.0 / 1023.0);
float tempC = (voltage - 0.5) * 100.0;  // TMP36 formula
```

**Light Sensors (LDR - Light Dependent Resistor):**

```cpp
int brightness = analogRead(LDR_PIN);
int ledBrightness = map(brightness, 0, 1023, 255, 0);  // Reverse
```

**Flex Sensors (Bend sensors):**

```cpp
int bend = analogRead(FLEX_PIN);
if (bend > THRESHOLD) {
  Serial.println("Finger bent!");
}
```

**Joysticks:**

```cpp
int joyX = analogRead(JOY_X_PIN);
int joyY = analogRead(JOY_Y_PIN);
int mappedX = map(joyX, 0, 1023, -100, 100);
int mappedY = map(joyY, 0, 1023, -100, 100);
```

---

## **6.19 Calibration Techniques**

For precise applications, calibrate your sensors!

### **Auto-Calibration on Startup**

```cpp
int sensorMin = 1023;
int sensorMax = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Calibrating... move potentiometer through full range!");

  // Calibrate for 5 seconds
  unsigned long startTime = millis();
  while (millis() - startTime < 5000) {
    int reading = analogRead(POT_PIN);

    if (reading < sensorMin) {
      sensorMin = reading;
    }
    if (reading > sensorMax) {
      sensorMax = reading;
    }

    delay(10);
  }

  Serial.print("Calibration complete! Range: ");
  Serial.print(sensorMin);
  Serial.print(" - ");
  Serial.println(sensorMax);
}

void loop() {
  int reading = analogRead(POT_PIN);

  // Use calibrated values
  int mapped = map(reading, sensorMin, sensorMax, 0, 255);
  mapped = constrain(mapped, 0, 255);  // Keep in bounds

  Serial.println(mapped);
  delay(100);
}
```

**This compensates for potentiometer variations!**

---

## **6.20 What You've Achieved**

Congratulations! You can now:

- ✅ Read analog values from sensors
- ✅ Understand the difference between digital and analog
- ✅ Use map() to convert between ranges
- ✅ Implement smoothing for stable readings
- ✅ Create various control curves
- ✅ Combine analog and digital inputs
- ✅ Build responsive, interactive systems
- ✅ Apply hysteresis and dead zones
- ✅ Calibrate sensors for accuracy

**Most importantly:** You can now read the **continuous** world, not just ON/OFF states!

---

## **Looking Ahead to Chapter 7**

In the next chapter, we'll add **sound** to our projects with buzzers!

You'll learn:

- Generating tones with `tone()` and `noTone()`
- Musical note frequencies
- Creating melodies
- Sound effects
- Combining sound with LEDs and inputs
- Building musical instruments and games

**Before next class:**

- Think about sounds in games and devices
- What makes a good alarm sound?
- Can you hum the melody of a song you'd like to program?
- Consider: How do different frequencies sound different?

---

**Vocabulary Review:**

- **Analog** - Continuous values (not just ON/OFF)
- **Digital** - Discrete values (ON or OFF only)
- **ADC** - Analog-to-Digital Converter
- **Resolution** - Number of distinct values (10-bit = 1024)
- **Potentiometer** - Variable resistor with adjustable voltage output
- **map()** - Function to convert between ranges
- **constrain()** - Function to limit values
- **Smoothing** - Averaging readings to reduce noise
- **Hysteresis** - Using two thresholds to prevent flickering
- **Calibration** - Adjusting for sensor variations

---

**In your notebook:**

- Draw a graph comparing digital and analog signals
- List 5 devices you use that have analog controls
- Sketch ideas for analog-controlled projects
- Design a user interface using pot + buttons + LEDs

See you in Chapter 7 - where we make some noise! 🔊🎵

---
