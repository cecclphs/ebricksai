# **Chapter 5: Digital Input - Buttons and Interaction**

> **⚠️ Important Reminder:** All eBricks modules use standard servo pin layout:
>
> - 🟨 Yellow wire = Signal (SIG)
> - 🔴 Red wire = 5V Power ONLY
> - ⬛ Black wire = Ground (GND)
>   **Never connect red to 3.3V!**

## **Chapter Overview**

🎯 **What You'll Learn:**

- How to read button presses (digital input)
- Understanding pull-up resistors
- Why buttons "bounce" and how to fix it
- State management and toggling
- Creating interactive systems
- Two-button controls
- Combining input with previous concepts

🔧 **Required eBricks-AI Modules:**

- Controller module (Arduino Pro Mini / ESP32)
- 8-bit LED Bar module (already connected)
- 2× Button modules
- Power connector
- Connection wires

⏱️ **Time Required:** 90-120 minutes

---

## **5.1 From Control to Interaction**

So far, you've been **controlling** things - LEDs blink when and how YOU tell them to. But real systems are **interactive** - they respond to user input!

### **The Shift in Thinking**

**Before (Chapters 1-4):**

```
You write code → Arduino executes → LEDs respond
     (predetermined behavior)
```

**Now (Chapter 5 onwards):**

```
User presses button → Arduino detects → Arduino decides → LEDs respond
     (behavior depends on input!)
```

This is the foundation of **all interactive systems**: games, apps, robots, smart devices, etc.

---

## **5.2 Connecting Your Button Modules**

Let's connect your first button!

### **Understanding Your eBricks-AI Button Module**

Your button module has 4 pins total:

```
[Button Module - Standard Servo Layout]
┌──────────────────────┐
│   [Button]           │ ← Physical button
├──────────────────────┤
│ 1  │ 1  │ 2  │ 2    │ ← Pin labels
├──────────────────────┤
│ YEL│ RED│ BLK│       │ ← Wire colors
└──────────────────────┘
```

**Pin connections (Standard Servo Layout):**

- **Pin 1 (1)** = Signal (Yellow wire) - goes to Arduino GPIO pin
- **Pin 2 (2)** = Power (Red wire) - connects to **5V ONLY** ⚠️
- **Pin 3 (2)** = Ground (Black wire) - connects to GND

⚠️ **CRITICAL:** Red wire MUST connect to 5V power, NOT 3.3V!

**Color Coding Guide:**

- 🟨 **Yellow** = Signal (SIG) - carries button press information
- 🔴 **Red** = Power (VCC) - 5V ONLY
- ⬛ **Black** = Ground (GND) - 0V reference

---

### **Physical Connection**

**Step 1:** Disconnect USB power first! ⚡

**Step 2:** Connect Button 1 using servo layout pins:

- Button 🟨 Yellow (SIG) → Arduino Pin 10
- Button 🔴 Red (5V) → Arduino 5V ⚠️ **RED ONLY - NOT 3.3V!**
- Button ⬛ Black (GND) → Arduino GND

**Step 3:** Connect Button 2 using servo layout pins:

- Button 🟨 Yellow (SIG) → Arduino Pin 11
- Button 🔴 Red (5V) → Arduino 5V ⚠️ **RED ONLY - NOT 3.3V!**
- Button ⬛ Black (GND) → Arduino GND

**Step 4:** Double-check connections

**Step 5:** Reconnect USB power

**💡 eBricks-AI Advantage:** Notice how clean this is? No breadboard spaghetti, just clearly labeled pins and organized jumper wires!

---

## **5.3 🧪 Experiment 1: Reading a Button**

Let's read our first button press!

### **The Prediction Game**

Before we write code, let's think:

**Question 1:** When you press a button, what happens electrically?

- A) The circuit opens (disconnects)
- B) The circuit closes (connects)
- C) Voltage increases
- D) Current reverses

<details>
<summary>Answer</summary>

**B) The circuit closes (connects)**

A button is just a switch. When you press it, two metal contacts touch, completing a circuit!

```
Button NOT pressed:  ---o    o---  (open circuit)
Button pressed:      ---●----●---  (closed circuit)
```

</details>

---

### **First Button Reading Code**

```cpp
const int BUTTON_PIN = 10;  // Button connected to pin 10
const int LED_PIN = 2;      // First LED on bar

void setup() {
  pinMode(BUTTON_PIN, INPUT);  // Button is INPUT (we're READING it)
  pinMode(LED_PIN, OUTPUT);     // LED is OUTPUT (we're CONTROLLING it)

  Serial.begin(9600);
  Serial.println("=== Button Test ===");
  Serial.println("Press the button!");
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);  // Read the button!

  Serial.print("Button state: ");
  Serial.println(buttonState);

  delay(100);  // So we can read the output
}
```

**Upload this and open Serial Monitor!**

---

### **🧪 What Do You Observe?**

**Without pressing the button, what numbers do you see?**

Your observation: \***\*\*\*\*\***\_\_\_\***\*\*\*\*\***

**Now press and HOLD the button. What numbers do you see?**

Your observation: \***\*\*\*\*\***\_\_\_\***\*\*\*\*\***

**Release the button. What numbers?**

Your observation: \***\*\*\*\*\***\_\_\_\***\*\*\*\*\***

---

### **The Surprise (Floating Pin Problem)**

You might see:

- Random numbers flickering between 0 and 1
- Mostly 1s, or mostly 0s
- Inconsistent readings

**Why?** The pin is "floating" - when the button isn't pressed, the pin isn't connected to anything, so it picks up electrical noise like an antenna!

```
Button not pressed:
Arduino Pin 10 ----o    o---- Button ---- GND
                    ^
                    |
                 Floating! Picks up random electrical noise
```

**This is a problem we need to solve!**

---

## **5.4 Understanding Pull-Up Resistors**

The solution: **Pull-up resistors**

### **What's a Pull-Up Resistor?**

A pull-up resistor "pulls" the voltage UP to 5V (HIGH) when nothing else is controlling it.

**Visual explanation:**

```
Without pull-up (floating):
5V
 |
 |   Pin reads random values
 ?---- Arduino Pin
 |
GND


With pull-up resistor:
5V
 |
 R (resistor pulls pin HIGH)
 |---- Arduino Pin (reads HIGH = 1)
 |
o    o Button (open)
 |
GND


Button pressed:
5V
 |
 R
 |---- Arduino Pin (reads LOW = 0)
 |
●----● Button (closed - connects to GND)
 |
GND
```

**The magic:**

- Button NOT pressed → Pin pulled HIGH (1) by resistor
- Button pressed → Pin connected to GND → reads LOW (0)

---

### **Arduino's Built-In Pull-Up Resistors**

**Good news!** Arduino has pull-up resistors built in! We just need to activate them.

**Change one line:**

```cpp
void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);  // Changed from INPUT
  pinMode(LED_PIN, OUTPUT);

  Serial.begin(9600);
}
```

That's it! Just add `_PULLUP` to `INPUT`!

---

### **🧪 Experiment 2: Testing INPUT_PULLUP**

Upload the modified code with `INPUT_PULLUP`.

**Observe:**

- Button NOT pressed: Reads **1** (HIGH)
- Button pressed: Reads **0** (LOW)

**Wait, this seems backwards!**

Yes! With pull-up resistors:

- **Not pressed = 1 (HIGH)**
- **Pressed = 0 (LOW)**

This is called **active-LOW** logic.

```cpp
// Updated code with better logic
void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW) {  // LOW means pressed!
    Serial.println("PRESSED!");
  } else {
    Serial.println("Not pressed");
  }

  delay(100);
}
```

---

## **5.5 Controlling LEDs with Buttons**

Now let's make something happen!

### **Simple Button-Controlled LED**

```cpp
const int BUTTON_PIN = 10;
const int LED_PIN = 2;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW) {  // Button pressed
    digitalWrite(LED_PIN, HIGH);  // Turn LED ON
  } else {                         // Button not pressed
    digitalWrite(LED_PIN, LOW);   // Turn LED OFF
  }
}
```

**Upload and test!**

**Result:** LED is ON when button is pressed, OFF when released.

---

### **🧪 Experiment 3: The Inversion Challenge**

Can you make the LED:

- **ON when button is NOT pressed**
- **OFF when button IS pressed**

Try it yourself first!

<details>
<summary>Solution</summary>

```cpp
void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == HIGH) {  // Button NOT pressed
    digitalWrite(LED_PIN, HIGH);
  } else {                       // Button pressed
    digitalWrite(LED_PIN, LOW);
  }
}
```

Or more elegantly using inverse logic:

```cpp
void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  digitalWrite(LED_PIN, buttonState);  // HIGH=ON, LOW=OFF
}
```

</details>

---

## **5.6 Toggle Behavior - The Challenge**

Here's what students usually want: "Press button to turn LED ON, press again to turn OFF."

**Let's try the obvious approach:**

```cpp
void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW) {  // Button pressed
    digitalWrite(LED_PIN, HIGH);  // Turn ON
  }

  if (buttonState == LOW) {  // Button pressed again?
    digitalWrite(LED_PIN, LOW);   // Turn OFF
  }
}
```

**Upload this. What happens?**

The LED stays OFF! Why?

**Because:** Both `if` statements run in the SAME loop. If the button is pressed, we turn LED ON, then immediately check again (button still pressed!), and turn it OFF.

**We need to detect the TRANSITION from not-pressed → pressed!**

---

## **5.7 Detecting Button Press Events**

We need to remember what the button state WAS last time, so we can detect when it CHANGES.

### **The Concept: State Memory**

```
Previous State  |  Current State  |  What happened?
─────────────────────────────────────────────────
   HIGH (not)   |   HIGH (not)    |  Nothing
   HIGH (not)   |   LOW (pressed) |  PRESS EVENT! ✓
   LOW (pressed)|   LOW (pressed) |  Still holding
   LOW (pressed)|   HIGH (not)    |  RELEASE EVENT
```

We only want to trigger action on the **PRESS EVENT** - the moment the button goes from not-pressed to pressed.

---

### **Button Press Detection Code**

```cpp
const int BUTTON_PIN = 10;
const int LED_PIN = 2;

int lastButtonState = HIGH;  // Remember previous state

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int currentButtonState = digitalRead(BUTTON_PIN);

  // Check if button state CHANGED
  if (currentButtonState != lastButtonState) {
    // State changed!

    if (currentButtonState == LOW) {
      // Button was just pressed (HIGH → LOW transition)
      Serial.println("Button PRESSED!");
    } else {
      // Button was just released (LOW → HIGH transition)
      Serial.println("Button RELEASED!");
    }

    delay(50);  // Small delay for debouncing (we'll improve this later)
  }

  // Remember this state for next loop
  lastButtonState = currentButtonState;
}
```

**Upload and test!** Press and release the button while watching Serial Monitor.

---

### **Understanding the State Tracking**

Let's trace through what happens:

```
Initial: lastButtonState = HIGH (not pressed)

Loop 1:
  currentButtonState = HIGH (still not pressed)
  currentButtonState != lastButtonState? NO (both HIGH)
  Skip the if block
  lastButtonState = HIGH

Loop 2: [You press button]
  currentButtonState = LOW (pressed)
  currentButtonState != lastButtonState? YES! (LOW != HIGH)
  currentButtonState == LOW? YES → Print "PRESSED!"
  lastButtonState = LOW

Loop 3: [Still holding button]
  currentButtonState = LOW (still pressed)
  currentButtonState != lastButtonState? NO (both LOW)
  Skip the if block
  lastButtonState = LOW

Loop 4: [You release button]
  currentButtonState = HIGH (released)
  currentButtonState != lastButtonState? YES! (HIGH != LOW)
  currentButtonState == LOW? NO → Print "RELEASED!"
  lastButtonState = HIGH
```

**We only trigger actions on STATE CHANGES!**

---

## **5.8 Creating a Toggle Switch**

Now we can make a proper toggle!

```cpp
const int BUTTON_PIN = 10;
const int LED_PIN = 2;

int lastButtonState = HIGH;
int ledState = LOW;  // Track LED state

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, ledState);  // Set initial LED state
}

void loop() {
  int currentButtonState = digitalRead(BUTTON_PIN);

  // Check for button press (HIGH → LOW transition)
  if (currentButtonState == LOW && lastButtonState == HIGH) {
    // Toggle LED state
    ledState = !ledState;  // Flip: LOW→HIGH or HIGH→LOW
    digitalWrite(LED_PIN, ledState);

    delay(50);  // Debounce delay
  }

  lastButtonState = currentButtonState;
}
```

**Upload and test!**

- Press once → LED turns ON
- Press again → LED turns OFF
- Press again → LED turns ON
- etc.

**It works!** 🎉

---

### **Understanding the NOT Operator (!)**

```cpp
ledState = !ledState;
```

The `!` operator means NOT (logical inversion):

- `!HIGH` = `LOW`
- `!LOW` = `HIGH`
- `!true` = `false`
- `!false` = `true`

So `ledState = !ledState` flips the state!

**Alternative way to write it:**

```cpp
if (ledState == HIGH) {
  ledState = LOW;
} else {
  ledState = HIGH;
}
```

But `!` is more elegant!

---

## **5.9 The Bouncing Problem**

### **🧪 Experiment 4: Detecting the Issue**

Modify your toggle code to count button presses:

```cpp
const int BUTTON_PIN = 10;
const int LED_PIN = 2;

int lastButtonState = HIGH;
int pressCount = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Press counter - try to press exactly once!");
}

void loop() {
  int currentButtonState = digitalRead(BUTTON_PIN);

  if (currentButtonState == LOW && lastButtonState == HIGH) {
    pressCount++;
    Serial.print("Press #");
    Serial.println(pressCount);

    // Blink to confirm
    digitalWrite(LED_PIN, HIGH);
    delay(50);
    digitalWrite(LED_PIN, LOW);
  }

  lastButtonState = currentButtonState;
}
```

**Try to press the button exactly ONCE, very quickly.**

**What happens?** You might see:

```
Press #1
Press #2
```

**You pressed once, but Arduino counted TWO presses!**

---

### **What's Happening: Button Bounce**

When you press a mechanical button, the metal contacts don't make perfect contact immediately. They literally **bounce** against each other!

**Oscilloscope view of a button press:**

```
Time: →→→→→→→→→→→→→→→

Signal:
HIGH ────┐              ┌───────
         │  ┌─┐  ┌─┐  ┌┘
         └──┘ └──┘ └──┘
         ↑ Button pressed
         │
         └─ Bouncing! (5-50ms)
```

**To the Arduino:** It looks like multiple presses in rapid succession!

---

### **Solution: Debouncing**

**Debouncing** means ignoring rapid changes and only registering a press after the button has been stable.

**Software debouncing approach:**

1. Detect button press
2. Wait a bit (10-50ms)
3. Read button again
4. If still pressed, it's a real press!

---

### **Improved Debounced Toggle**

```cpp
const int BUTTON_PIN = 10;
const int LED_PIN = 2;
const int DEBOUNCE_DELAY = 50;  // 50 milliseconds

int lastButtonState = HIGH;
int ledState = LOW;
unsigned long lastDebounceTime = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, ledState);
  Serial.begin(9600);
}

void loop() {
  int reading = digitalRead(BUTTON_PIN);

  // Check if button state changed
  if (reading != lastButtonState) {
    // Reset the debounce timer
    lastDebounceTime = millis();
  }

  // Check if enough time has passed
  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY) {
    // If we're here, the reading has been stable for DEBOUNCE_DELAY

    // Check for button press (HIGH → LOW)
    if (reading == LOW && lastButtonState == HIGH) {
      ledState = !ledState;
      digitalWrite(LED_PIN, ledState);

      Serial.print("Toggle! LED is now: ");
      Serial.println(ledState ? "ON" : "OFF");
    }
  }

  lastButtonState = reading;
}
```

**This is the professional way to handle buttons!**

---

### **Understanding the Debounce Logic**

```
Button changes → Reset timer (lastDebounceTime = millis())
                    ↓
Wait for DEBOUNCE_DELAY (50ms)
                    ↓
If still stable after 50ms → Accept the reading
                    ↓
If button state = pressed → Take action
```

**Visual timeline:**

```
Time:     0ms          10ms      50ms      60ms
         ──┬────────────┬─────────┬─────────┬───
Button:    PRESS↓    bounce   stable    stable
Action:    Start timer  wait     ✓Accept   done
```

---

## **5.10 🧪 Experiment 5: Button Counter with LEDs**

Let's combine concepts! Create a counter that:

- Shows count in binary on LED bar
- Increments when button is pressed
- Resets at 255

```cpp
const int BUTTON_PIN = 10;
const int FIRST_LED = 2;
const int DEBOUNCE_DELAY = 50;

int lastButtonState = HIGH;
unsigned long lastDebounceTime = 0;
byte counter = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  for (int pin = FIRST_LED; pin <= 9; pin++) {
    pinMode(pin, OUTPUT);
  }

  Serial.begin(9600);
  displayBinary(counter);
}

void displayBinary(byte number) {
  Serial.print("Count: ");
  Serial.print(number);
  Serial.print(" = ");

  for (int bit = 0; bit < 8; bit++) {
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
  int reading = digitalRead(BUTTON_PIN);

  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY) {
    if (reading == LOW && lastButtonState == HIGH) {
      counter++;  // Increment counter

      if (counter > 255) {  // Byte overflow
        counter = 0;
      }

      displayBinary(counter);
    }
  }

  lastButtonState = reading;
}
```

**Test this!** Press the button and watch the binary counter increment!

---

### **Challenge 5.1: Up/Down Counter**

Add the second button to make an up/down counter:

- Button 1: Increment
- Button 2: Decrement

**Hint:** You'll need to track state for BOTH buttons separately!

---

## **5.11 Two-Button Interactions**

Now let's use both buttons together!

### **Pattern: Two Independent Buttons**

```cpp
const int BUTTON1_PIN = 10;
const int BUTTON2_PIN = 11;
const int LED1_PIN = 2;
const int LED2_PIN = 3;

// State tracking for button 1
int lastButton1State = HIGH;
unsigned long lastDebounce1Time = 0;

// State tracking for button 2
int lastButton2State = HIGH;
unsigned long lastDebounce2Time = 0;

const int DEBOUNCE_DELAY = 50;

void setup() {
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  // Handle button 1
  int reading1 = digitalRead(BUTTON1_PIN);
  if (reading1 != lastButton1State) {
    lastDebounce1Time = millis();
  }
  if ((millis() - lastDebounce1Time) > DEBOUNCE_DELAY) {
    if (reading1 == LOW && lastButton1State == HIGH) {
      Serial.println("Button 1 pressed!");
      digitalWrite(LED1_PIN, HIGH);
      delay(100);
      digitalWrite(LED1_PIN, LOW);
    }
  }
  lastButton1State = reading1;

  // Handle button 2
  int reading2 = digitalRead(BUTTON2_PIN);
  if (reading2 != lastButton2State) {
    lastDebounce2Time = millis();
  }
  if ((millis() - lastDebounce2Time) > DEBOUNCE_DELAY) {
    if (reading2 == LOW && lastButton2State == HIGH) {
      Serial.println("Button 2 pressed!");
      digitalWrite(LED2_PIN, HIGH);
      delay(100);
      digitalWrite(LED2_PIN, LOW);
    }
  }
  lastButton2State = reading2;
}
```

**Notice:** Each button has its own state variables! This is important for independent tracking.

---

### **🧪 Experiment 6: Detecting Simultaneous Presses**

Can Arduino detect when BOTH buttons are pressed at the same time?

```cpp
const int BUTTON1_PIN = 10;
const int BUTTON2_PIN = 11;

void setup() {
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  int button1 = digitalRead(BUTTON1_PIN);
  int button2 = digitalRead(BUTTON2_PIN);

  if (button1 == LOW && button2 == LOW) {
    Serial.println("BOTH BUTTONS PRESSED!");
  } else if (button1 == LOW) {
    Serial.println("Button 1 only");
  } else if (button2 == LOW) {
    Serial.println("Button 2 only");
  }

  delay(100);
}
```

**Try pressing:**

- Just button 1
- Just button 2
- Both together

**You can detect all three cases!**

---

## **5.12 Building Interactive Patterns**

Now let's create more sophisticated interactions!

### **Project 1: LED Chaser Game**

One LED is lit. Press button 1 to move right, button 2 to move left.

```cpp
const int BUTTON1_PIN = 10;  // Move right
const int BUTTON2_PIN = 11;  // Move left
const int FIRST_LED = 2;
const int NUM_LEDS = 8;

int currentLED = 0;  // Which LED is lit (0-7)

// Button state tracking
int lastButton1 = HIGH;
int lastButton2 = HIGH;
unsigned long lastDebounce1 = 0;
unsigned long lastDebounce2 = 0;
const int DEBOUNCE = 50;

void setup() {
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);

  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }

  updateDisplay();
}

void updateDisplay() {
  // Turn all LEDs off
  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    digitalWrite(pin, LOW);
  }

  // Turn on current LED
  digitalWrite(FIRST_LED + currentLED, HIGH);
}

void loop() {
  // Check button 1 (move right)
  int read1 = digitalRead(BUTTON1_PIN);
  if (read1 != lastButton1) {
    lastDebounce1 = millis();
  }
  if ((millis() - lastDebounce1) > DEBOUNCE) {
    if (read1 == LOW && lastButton1 == HIGH) {
      currentLED++;
      if (currentLED >= NUM_LEDS) {
        currentLED = 0;  // Wrap around
      }
      updateDisplay();
    }
  }
  lastButton1 = read1;

  // Check button 2 (move left)
  int read2 = digitalRead(BUTTON2_PIN);
  if (read2 != lastButton2) {
    lastDebounce2 = millis();
  }
  if ((millis() - lastDebounce2) > DEBOUNCE) {
    if (read2 == LOW && lastButton2 == HIGH) {
      currentLED--;
      if (currentLED < 0) {
        currentLED = NUM_LEDS - 1;  // Wrap around
      }
      updateDisplay();
    }
  }
  lastButton2 = read2;
}
```

**Try it!** You can now control which LED is lit with the buttons!

---

### **Project 2: Reaction Time Game**

LED lights up at random time. How fast can you press the button?

```cpp
const int BUTTON_PIN = 10;
const int LED_PIN = 2;

unsigned long lightOnTime = 0;
bool gameActive = false;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);

  randomSeed(analogRead(A0));  // Seed random number generator

  Serial.println("=== Reaction Time Game ===");
  Serial.println("Wait for LED, then press button as fast as you can!");
  Serial.println();

  startNewRound();
}

void startNewRound() {
  digitalWrite(LED_PIN, LOW);
  gameActive = false;

  // Random delay between 2-5 seconds
  int delayTime = random(2000, 5000);

  Serial.print("Get ready...");
  delay(delayTime);

  // Light up LED!
  digitalWrite(LED_PIN, HIGH);
  lightOnTime = millis();
  gameActive = true;
  Serial.println(" GO!");
}

void loop() {
  if (gameActive) {
    if (digitalRead(BUTTON_PIN) == LOW) {
      // Button pressed!
      unsigned long reactionTime = millis() - lightOnTime;

      Serial.print("Reaction time: ");
      Serial.print(reactionTime);
      Serial.println(" ms");

      if (reactionTime < 200) {
        Serial.println("AMAZING! Lightning fast! ⚡");
      } else if (reactionTime < 300) {
        Serial.println("Great reaction! 👍");
      } else if (reactionTime < 500) {
        Serial.println("Good! 👌");
      } else {
        Serial.println("Not bad, but you can do better! 💪");
      }

      Serial.println();
      delay(2000);  // Pause before next round
      startNewRound();
    }
  }
}
```

**Challenge yourself!** Can you get under 200ms?

---

### **Project 3: Simon Says Memory Game**

Arduino shows a pattern, you repeat it with buttons!

```cpp
const int BUTTON1_PIN = 10;
const int BUTTON2_PIN = 11;
const int LED1_PIN = 2;
const int LED2_PIN = 3;

const int MAX_SEQUENCE = 20;
int sequence[MAX_SEQUENCE];
int sequenceLength = 0;
int currentStep = 0;

enum GameState {
  SHOWING_PATTERN,
  WAITING_FOR_INPUT,
  GAME_OVER
};

GameState gameState = SHOWING_PATTERN;

void setup() {
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);

  Serial.begin(9600);
  randomSeed(analogRead(A0));

  Serial.println("=== Simon Says ===");
  Serial.println("Watch the pattern, then repeat it!");
  Serial.println("Button 1 = LED 1, Button 2 = LED 2");
  Serial.println();

  startNewGame();
}

void startNewGame() {
  sequenceLength = 1;  // Start with 1 step
  currentStep = 0;
  gameState = SHOWING_PATTERN;

  // Generate first random step
  sequence[0] = random(2);  // 0 or 1

  delay(1000);
  showPattern();
}

void showPattern() {
  Serial.print("Watch this pattern (");
  Serial.print(sequenceLength);
  Serial.println(" steps):");

  for (int i = 0; i < sequenceLength; i++) {
    int led = (sequence[i] == 0) ? LED1_PIN : LED2_PIN;

    Serial.print(sequence[i] + 1);
    Serial.print(" ");

    digitalWrite(led, HIGH);
    delay(500);
    digitalWrite(led, LOW);
    delay(300);
  }

  Serial.println();
  Serial.println("Your turn! Repeat the pattern.");

  gameState = WAITING_FOR_INPUT;
  currentStep = 0;
}

void loop() {
  if (gameState == WAITING_FOR_INPUT) {
    // Check for button presses
    static int lastButton1 = HIGH;
    static int lastButton2 = HIGH;

    int button1 = digitalRead(BUTTON1_PIN);
    int button2 = digitalRead(BUTTON2_PIN);

    // Button 1 pressed
    if (button1 == LOW && lastButton1 == HIGH) {
      handleInput(0);
      digitalWrite(LED1_PIN, HIGH);
      delay(200);
      digitalWrite(LED1_PIN, LOW);
      delay(50);
    }

    // Button 2 pressed
    if (button2 == LOW && lastButton2 == HIGH) {
      handleInput(1);
      digitalWrite(LED2_PIN, HIGH);
      delay(200);
      digitalWrite(LED2_PIN, LOW);
      delay(50);
    }

    lastButton1 = button1;
    lastButton2 = button2;
  }
}

void handleInput(int buttonPressed) {
  if (buttonPressed == sequence[currentStep]) {
    // Correct!
    Serial.print("✓ ");
    currentStep++;

    if (currentStep >= sequenceLength) {
      // Completed this level!
      Serial.println();
      Serial.println("SUCCESS! Level complete! 🎉");
      Serial.println();

      delay(1000);

      // Add next step to sequence
      sequenceLength++;
      if (sequenceLength > MAX_SEQUENCE) {
        Serial.println("YOU WON THE ENTIRE GAME! 🏆");
        delay(5000);
        startNewGame();
        return;
      }

      sequence[sequenceLength - 1] = random(2);

      gameState = SHOWING_PATTERN;
      delay(500);
      showPattern();
    }
  } else {
    // Wrong!
    Serial.println();
    Serial.println("✗ WRONG! Game Over!");
    Serial.print("You reached level ");
    Serial.println(sequenceLength);
    Serial.println();

    // Flash both LEDs
    for (int i = 0; i < 3; i++) {
      digitalWrite(LED1_PIN, HIGH);
      digitalWrite(LED2_PIN, HIGH);
      delay(200);
      digitalWrite(LED1_PIN, LOW);
      digitalWrite(LED2_PIN, LOW);
      delay(200);
    }

    delay(2000);
    startNewGame();
  }
}
```

**This is a complete game!** See how far you can get!

---

## **5.13 Advanced Button Techniques**

### **Long Press Detection**

Detect if button is held for a long time:

```cpp
const int BUTTON_PIN = 10;
const int LED_PIN = 2;
const unsigned long LONG_PRESS_TIME = 1000;  // 1 second

unsigned long pressStartTime = 0;
bool isPressed = false;
bool longPressTriggered = false;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW) {
    // Button is pressed
    if (!isPressed) {
      // Just started pressing
      pressStartTime = millis();
      isPressed = true;
      longPressTriggered = false;
    } else {
      // Still pressing - check if long press
      if (!longPressTriggered && (millis() - pressStartTime) >= LONG_PRESS_TIME) {
        Serial.println("LONG PRESS!");
        digitalWrite(LED_PIN, HIGH);
        longPressTriggered = true;
      }
    }
  } else {
    // Button is not pressed
    if (isPressed) {
      // Just released
      if (!longPressTriggered) {
        Serial.println("Short press");
      }
      digitalWrite(LED_PIN, LOW);
      isPressed = false;
    }
  }
}
```

**Use cases:**

- Short press: Toggle
- Long press: Settings menu
- (Like your phone's power button!)

---

### **Double-Click Detection**

Detect two quick presses:

```cpp
const int BUTTON_PIN = 10;
const unsigned long DOUBLE_CLICK_TIME = 300;  // Max time between clicks

int lastButton = HIGH;
unsigned long lastPressTime = 0;
int clickCount = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  int button = digitalRead(BUTTON_PIN);

  // Detect button press
  if (button == LOW && lastButton == HIGH) {
    unsigned long currentTime = millis();

    if ((currentTime - lastPressTime) < DOUBLE_CLICK_TIME) {
      // Second click within time window!
      Serial.println("DOUBLE CLICK!");
      clickCount = 0;  // Reset
    } else {
      // First click (or single click)
      clickCount = 1;
    }

    lastPressTime = currentTime;
    delay(50);  // Debounce
  }

  // Check for single click timeout
  if (clickCount == 1 && (millis() - lastPressTime) > DOUBLE_CLICK_TIME) {
    Serial.println("Single click");
    clickCount = 0;
  }

  lastButton = button;
}
```

---

## **5.14 💡 Key Concepts Summary**

### **Digital Input Basics**

- ✅ `pinMode(pin, INPUT_PULLUP)` sets pin as input with pull-up resistor
- ✅ `digitalRead(pin)` returns HIGH or LOW
- ✅ With INPUT_PULLUP: Not pressed = HIGH, Pressed = LOW
- ✅ Pull-up resistors prevent floating pins

### **Button State Management**

- ✅ Track previous state to detect transitions
- ✅ Press event = transition from HIGH to LOW
- ✅ Release event = transition from LOW to HIGH
- ✅ Check for state CHANGE, not just state

### **Debouncing**

- ✅ Mechanical buttons "bounce" (rapid on/off)
- ✅ Software debouncing waits for stable reading
- ✅ Use `millis()` timing instead of `delay()`
- ✅ Typical debounce time: 10-50ms

### **Toggle Behavior**

- ✅ Remember LED state in a variable
- ✅ Flip state with `!` operator
- ✅ Only change on button press event
- ✅ Display current state

### **Multiple Buttons**

- ✅ Each button needs its own state variables
- ✅ Can detect simultaneous presses
- ✅ Process each button independently
- ✅ Can create complex interactions

---

## **5.15 🚀 Final Challenges**

### **Challenge A: Speed Clicker**

Count how many times you can press a button in 10 seconds!

**Requirements:**

- Start on button press
- Count presses for 10 seconds
- Show count on Serial
- Display count in binary on LEDs
- High score tracking

---

### **Challenge B: Combination Lock**

Create a lock that opens with a specific button combination!

**Example:** Button1, Button2, Button1, Button1, Button2

**Requirements:**

- Must press correct sequence
- Wrong press resets
- LED indication for success/failure
- Timeout if too slow

---

### **Challenge C: Morse Code Trainer**

User presses button in Morse code pattern, Arduino decodes it!

**Requirements:**

- Short press = dot (·)
- Long press = dash (−)
- Space = letter separator
- Decode and display letter

**Example:**

- `··` (short-short) = I
- `−−−` (long-long-long) = O
- `·−·` = R

---

### **Challenge D: Two-Player Game**

Both players have a button. Light moves back and forth. Press button when light is on your side to score!

**Requirements:**

- LED scans back and forth
- Each player scores when light is on their half
- First to 10 points wins
- Speed increases over time

---

### **Challenge E: Button-Controlled Binary Editor**

Use buttons to manually create any 8-bit binary number!

**Controls:**

- Button 1: Move cursor left/right
- Button 2: Toggle current bit
- Long press Button 1: Reset
- Serial display shows decimal value

---

## **5.16 Troubleshooting Guide**

**Problem: Button presses not detected**

Check:

- [ ] Using `INPUT_PULLUP` mode?
- [ ] Correct pin number?
- [ ] Button physically working? (test with multimeter)
- [ ] Checking for `LOW` (not `HIGH`) when button pressed?
- [ ] Connections secure?

---

**Problem: Multiple presses detected per single press**

Check:

- [ ] Added debouncing code?
- [ ] Debounce delay long enough? (try 50ms)
- [ ] Only triggering on state CHANGE?
- [ ] Not using `delay()` inside detection code?

---

**Problem: Missed button presses**

Check:

- [ ] Loop running fast enough? (remove unnecessary delays)
- [ ] Debounce time too long?
- [ ] Checking button state frequently?
- [ ] Not blocking with long `delay()` calls?

---

**Problem: Two buttons interfering**

Check:

- [ ] Each button has separate state variables?
- [ ] Each button has separate debounce timer?
- [ ] Not reusing variable names?
- [ ] Both buttons connected to different pins?

---

**Problem: Toggle not working properly**

Check:

- [ ] Using state change detection (not just current state)?
- [ ] Remembering previous button state?
- [ ] Only toggling on press event (HIGH → LOW)?
- [ ] Using `!` correctly to flip state?

---

## **5.17 Understanding Timing Without delay()**

**Why we use `millis()` instead of `delay()`:**

**Bad approach:**

```cpp
void loop() {
  if (digitalRead(BUTTON_PIN) == LOW) {
    digitalWrite(LED_PIN, HIGH);
    delay(50);  // ← BLOCKS everything!
    digitalWrite(LED_PIN, LOW);
  }
}
```

**Problem:** During `delay(50)`, Arduino can't check the button!

**Good approach:**

```cpp
unsigned long lastDebounceTime = 0;

void loop() {
  int button = digitalRead(BUTTON_PIN);

  if (button != lastButton) {
    lastDebounceTime = millis();  // Just record the time
  }

  if ((millis() - lastDebounceTime) > 50) {
    // 50ms has passed, safe to read
  }

  // Arduino keeps running, checking button constantly!
}
```

**The difference:**

- `delay()` = "Stop everything and wait"
- `millis()` timing = "Remember when something happened, check if enough time has passed"

---

## **5.18 Code Organization: Creating Functions**

As projects get complex, organize code into functions!

**Before - messy:**

```cpp
void loop() {
  // 100 lines of button 1 handling
  // 100 lines of button 2 handling
  // 100 lines of LED updating
  // Very hard to read!
}
```

**After - organized:**

```cpp
void loop() {
  handleButton1();
  handleButton2();
  updateDisplay();
  // Easy to read!
}

void handleButton1() {
  // All button 1 logic here
}

void handleButton2() {
  // All button 2 logic here
}

void updateDisplay() {
  // All LED logic here
}
```

**Benefits:**

- Easier to debug
- Easier to modify
- Easier to understand
- Can reuse functions

---

## **5.19 What You've Achieved**

Congratulations! You can now:

- ✅ Read digital input from buttons
- ✅ Understand pull-up resistors
- ✅ Detect button press and release events
- ✅ Implement proper debouncing
- ✅ Create toggle switches
- ✅ Handle multiple buttons independently
- ✅ Build interactive games and applications
- ✅ Use non-blocking timing with millis()
- ✅ Organize code with functions

**Most importantly:** You've created your first truly **INTERACTIVE** systems! Your code now responds to the real world!

---

## **Looking Ahead to Chapter 6**

In the next chapter, we'll explore **analog input** with potentiometers!

You'll learn:

- Difference between digital (ON/OFF) and analog (variable)
- Reading values from 0-1023
- Mapping ranges
- Creating volume controls, brightness controls
- Smoothing noisy readings
- Using potentiometers as user input

**Before next class:**

- Play with the reaction time game - can you beat your friends?
- Think about other interactive projects you'd like to build
- Consider: What's the difference between a light switch (digital) and a dimmer (analog)?

---

**Vocabulary Review:**

- **Digital Input** - Reading ON or OFF states
- **Pull-up Resistor** - Resistor that pulls pin HIGH when not connected
- **Debouncing** - Filtering out mechanical bounce in switches
- **State** - Current condition of a variable or system
- **Edge Detection** - Detecting when something changes (transitions)
- **Press Event** - The moment a button goes from not-pressed to pressed
- **millis()** - Returns milliseconds since Arduino started
- **Non-blocking** - Code that doesn't stop to wait
- **Toggle** - Switch between two states

---

**In your notebook:**

- Draw a state diagram for toggle behavior
- List 5 everyday devices that use buttons
- Design your own button-based game
- Sketch ideas for multi-button interfaces

See you in Chapter 6 - where we move from binary to **continuous values**! 🚀

---
