# **Chapter 2: Your First Program - The Blink**

> **📌 Remember:** All eBricks modules use standard servo pin layout:
>
> - 🟨 Yellow = Signal (SIG)
> - 🔴 Red = 5V Power ONLY
> - ⬛ Black = Ground (GND)

## **Chapter Overview**

🎯 **What You'll Learn:**

- How to read and understand Arduino code
- What `setup()` and `loop()` do
- How to control an LED
- How to use eBricks-AI LED modules
- The concept of digital output
- Understanding GPIO pins and connections

🔧 **Required eBricks-AI Modules:**

- Controller module (Arduino Pro Mini / ESP32)
- 8-bit LED Bar module
- Power connector
- 3x connection wires

⏱️ **Time Required:** 60-90 minutes

---

## **2.1 Connecting Your First eBricks-AI Module**

Let's connect the LED Bar module to your Arduino controller.

### **Understanding the eBricks-AI Connection System**

The LED Bar module has multiple connection points. It uses the standard servo layout with three main wire colors:

```
[LED Bar Module - Standard Servo Layout]
┌─────────────────────────┐
│ ●  ●  ●  ●  ●  ●  ●  ● │ ← 8 LEDs
│ LED1 through LED8       │
├─────────────────────────┤
│YEL│RED│BLK│ D2-D9       │ ← Servo header + data pins
└─────────────────────────┘
```

**Standard Servo Header (first 3 connections):**

- 🟨 **Yellow** = Signal (SIG) - connects to a data pin
- 🔴 **Red** = Power (5V) - connects to Arduino 5V ONLY ⚠️
- ⬛ **Black** = Ground (GND) - completes the circuit

**Additional Data Pins:**

- **D2-D9** = Individual data lines for each LED (control which LEDs light up)

For detailed GPIO information, see [GPIO Reference Guide](/gpio-reference)

### **Making the Connections**

**Step 1: Power OFF**

- Unplug USB cable from Arduino
- **Golden Rule:** Always disconnect power before making hardware changes!

**Step 2: Understand the connection pattern**

The LED Bar module connects using the standard servo layout:

```
LED Bar Module → Arduino
┌─────────────────────────┐
│ ●  ●  ●  ●  ●  ●  ●  ● │
├─────────────────────────┤
│YEL│RED│BLK│ D2-D9       │
└─────────────────────────┘
 │   │   │    └─→ Pins 2-9 (data for each LED)
 │   │   └──────→ GND (Black)
 │   └──────────→ 5V (Red) ⚠️ RED ONLY - NOT 3.3V!
 └──────────────→ Pin for signal (Yellow)
```

**Step 3: Connect the Servo Header (power connections)**

This LED Bar uses all 8 data pins, so connect the servo header for power and signal:

- 🟨 **Yellow wire**: LED Bar Yellow → Arduino Pin 2 (signal line)
- 🔴 **Red wire**: LED Bar Red → Arduino **5V** ⚠️ **RED ONLY - NOT 3.3V!**
- ⬛ **Black wire**: LED Bar Black → Arduino **GND**

**Step 4: Connect the Data Lines**

Connect each LED to its corresponding pin:

- LED Bar **D2** → Arduino **Pin 2** (Yellow from servo header already does this)
- LED Bar **D3** → Arduino **Pin 3**
- LED Bar **D4** → Arduino **Pin 4**
- LED Bar **D5** → Arduino **Pin 5**
- LED Bar **D6** → Arduino **Pin 6**
- LED Bar **D7** → Arduino **Pin 7**
- LED Bar **D8** → Arduino **Pin 8**
- LED Bar **D9** → Arduino **Pin 9**

**Step 5: Verify connections**

- 🟨 Yellow connected to Pin 2 ✓
- 🔴 Red connected to 5V (NOT 3.3V) ✓
- ⬛ Black connected to GND ✓
- All data lines (D2-D9) firmly connected ✓

**Step 6: Power ON**

- Plug USB cable back in
- LED Bar may show a power indicator or test pattern
- Ready for programming!

---

## **2.2 Anatomy of an Arduino Program**

Open Arduino IDE and look at the Blink example again (File → Examples → 01.Basics → Blink).

```cpp
// This is the Blink program
// Let's understand every single line

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
```

Let's break this down piece by piece.

### **Comments**

```cpp
// This is a comment
```

Anything after `//` is a comment. Arduino ignores it completely.

**Why use comments?**

- Explain what your code does
- Leave notes for yourself
- Temporarily disable code without deleting it

**Try this:** Add a comment to your code:

```cpp
// My first Arduino program!
// Author: [Your Name]
// Date: [Today's Date]
```

**Multi-line comments:**

```cpp
/*
  This is a comment
  that spans multiple
  lines
*/
```

---

### **The Structure: setup() and loop()**

Every Arduino program has two main functions:

```cpp
void setup() {
  // Runs ONCE when Arduino starts
}

void loop() {
  // Runs REPEATEDLY forever
}
```

**Think of it like this:**

```
Arduino Powers On
      ↓
   setup() runs ONCE
   - Set up pins
   - Initialize settings
   - Prepare everything
      ↓
   loop() runs
      ↓
   loop() runs again
      ↓
   loop() runs again
      ↓
   loop() runs again
      ↓
   ... (forever)
```

**Real-world analogy:**

```
setup() = Getting ready in the morning
- Wake up
- Put on clothes
- Eat breakfast
(You only do this ONCE per day)

loop() = Your daily routine
- Go to class
- Study
- Exercise
(You repeat this every day)
```

---

### **pinMode() - Telling Arduino What a Pin Does**

```cpp
pinMode(LED_BUILTIN, OUTPUT);
```

Let's read this in English:

- `pinMode` = "pin mode" = set how a pin behaves
- `LED_BUILTIN` = the built-in LED (pin 13 on most Arduinos)
- `OUTPUT` = this pin will SEND signals (not receive)

**Why do we need this?**

Arduino pins can do different jobs:

- **OUTPUT** - Arduino controls the pin (sends signals OUT)
- **INPUT** - Arduino reads the pin (receives signals IN)

**Analogy:**

```
pinMode is like setting your phone:
- OUTPUT mode = You're making calls (talking)
- INPUT mode = You're receiving calls (listening)
```

**For our LED:**
We want Arduino to CONTROL the LED, so we use OUTPUT.

---

### **digitalWrite() - Turning Things ON/OFF**

```cpp
digitalWrite(LED_BUILTIN, HIGH);
```

Reading in English:

- `digitalWrite` = "digital write" = set a pin to ON or OFF
- `LED_BUILTIN` = which pin
- `HIGH` = turn it ON

**HIGH vs LOW:**

- `HIGH` = ON = 5 volts = LED lights up
- `LOW` = OFF = 0 volts = LED turns off

**Analogy:**

```
digitalWrite is like a light switch:
- HIGH = flip switch UP = light ON
- LOW = flip switch DOWN = light OFF
```

---

### **delay() - Waiting**

```cpp
delay(1000);
```

Reading in English:

- `delay` = wait / pause
- `1000` = for 1000 milliseconds = 1 second

**Time units:**

- 1000 milliseconds (ms) = 1 second
- 500 ms = 0.5 seconds = half a second
- 100 ms = 0.1 seconds = very fast blink
- 5000 ms = 5 seconds

**Why do we need delay?**

Without delay, Arduino would turn the LED on and off SO FAST (millions of times per second) that:

1. You couldn't see it blinking
2. It would just look dimly lit
3. It would be like a light switch being flipped too fast to notice

---

## **2.3 Understanding the Complete Blink Program**

Now let's read the whole program with our new understanding:

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  // Translation: "Hey Arduino, pin 13 (LED_BUILTIN) is going to be an OUTPUT.
  //               I'm going to control it."
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  // Turn LED ON (send 5V to pin 13)

  delay(1000);
  // Wait 1 second (while LED stays ON)

  digitalWrite(LED_BUILTIN, LOW);
  // Turn LED OFF (send 0V to pin 13)

  delay(1000);
  // Wait 1 second (while LED stays OFF)

  // Now loop() ends and Arduino runs it again...
  // So LED turns ON again, and the cycle repeats!
}
```

**Timeline visualization:**

```
Time: 0ms ──────────→ 1000ms ─────────→ 2000ms ─────────→ 3000ms
LED:  ON            → ON turns OFF   → OFF turns ON    → ON
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ░░░░░░░░░░░░░░  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

---

## **2.4 🧪 Experiment 1: Changing Blink Speed**

Now let's experiment! This is where learning really happens.

### **Prediction Exercise**

Before changing anything, predict:

**Question 1:** What will happen if we change `delay(1000)` to `delay(500)`?

Your prediction: **\*\***\*\***\*\***\_\_\_\_**\*\***\*\***\*\***

**Question 2:** What will happen if we change `delay(1000)` to `delay(100)`?

Your prediction: **\*\***\*\***\*\***\_\_\_\_**\*\***\*\***\*\***

**Question 3:** What will happen if we change `delay(1000)` to `delay(5000)`?

Your prediction: **\*\***\*\***\*\***\_\_\_\_**\*\***\*\***\*\***

### **Testing Your Predictions**

**Test 1: Faster blink**

Change your code to:

```cpp
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);              // Changed from 1000 to 500
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);              // Changed from 1000 to 500
}
```

1. Click **Verify** (✓)
2. Click **Upload** (▶)
3. Watch the LED

**What happened?** **\*\***\*\***\*\***\_\_\_\_**\*\***\*\***\*\***

**Why?** Because 500ms = 0.5 seconds, so the LED blinks twice as fast!

---

**Test 2: Even faster**

Change to:

```cpp
delay(100);  // 0.1 seconds
```

Upload and observe.

**What do you notice?** The LED is blinking really fast! Can you still see it blinking, or does it look dimly lit?

---

**Test 3: Slow blink**

Change to:

```cpp
delay(5000);  // 5 seconds
```

Upload and observe.

**Observation:** Now the LED stays on for 5 seconds, then off for 5 seconds.

---

### **Challenge 1.1: Asymmetric Blink**

What if we want the LED to be ON for a different amount of time than it's OFF?

```cpp
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(2000);              // ON for 2 seconds
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);               // OFF for 0.5 seconds
}
```

**Before uploading, predict:** What pattern will you see?

Upload and test. Were you correct?

---

### **Challenge 1.2: Rapid Fire**

Create a pattern where the LED:

- Blinks fast 3 times
- Stays off for 2 seconds
- Repeats

**Hint:** You'll need to write the blink code multiple times in loop().

**Try it yourself first!** Then check the solution below.

<details>
<summary>Click to reveal solution</summary>

```cpp
void loop() {
  // Fast blink 1
  digitalWrite(LED_BUILTIN, HIGH);
  delay(100);
  digitalWrite(LED_BUILTIN, LOW);
  delay(100);

  // Fast blink 2
  digitalWrite(LED_BUILTIN, HIGH);
  delay(100);
  digitalWrite(LED_BUILTIN, LOW);
  delay(100);

  // Fast blink 3
  digitalWrite(LED_BUILTIN, HIGH);
  delay(100);
  digitalWrite(LED_BUILTIN, LOW);
  delay(100);

  // Long pause
  delay(2000);
}
```

</details>

---

## **2.5 Using Your eBricks-AI LED Bar**

Now let's control the LEDs on your LED Bar module instead of the built-in LED.

### **Remember:** Your LED Bar is connected to pins 2-9

Each LED has a pin number:

```
LED 1 → Pin 2
LED 2 → Pin 3
LED 3 → Pin 4
LED 4 → Pin 5
LED 5 → Pin 6
LED 6 → Pin 7
LED 7 → Pin 8
LED 8 → Pin 9
```

### **Controlling LED #1**

```cpp
void setup() {
  pinMode(2, OUTPUT);  // LED 1 is connected to pin 2
}

void loop() {
  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);
  delay(1000);
}
```

**Upload this code.** You should see the first LED on your LED Bar blinking!

---

### **🧪 Experiment 2: Controlling Multiple LEDs**

Let's make TWO LEDs blink.

```cpp
void setup() {
  pinMode(2, OUTPUT);  // LED 1
  pinMode(3, OUTPUT);  // LED 2
}

void loop() {
  // Turn both ON
  digitalWrite(2, HIGH);
  digitalWrite(3, HIGH);
  delay(1000);

  // Turn both OFF
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  delay(1000);
}
```

**What happens?** Both LEDs blink together (in sync).

---

### **Challenge 2.1: Alternating LEDs**

Make LED 1 and LED 2 take turns blinking.

**Before looking at the solution, try it yourself!**

<details>
<summary>Solution</summary>

```cpp
void loop() {
  digitalWrite(2, HIGH);   // LED 1 ON
  digitalWrite(3, LOW);    // LED 2 OFF
  delay(500);

  digitalWrite(2, LOW);    // LED 1 OFF
  digitalWrite(3, HIGH);   // LED 2 ON
  delay(500);
}
```

</details>

---

### **Challenge 2.2: Three-Step Sequence**

Make a pattern where:

1. LED 1 lights up
2. LED 2 lights up
3. LED 3 lights up
4. All turn off
5. Repeat

Try it yourself first!

---

## **2.6 Common Mistakes and Debugging**

Let's learn from common mistakes. **These are GOOD mistakes** - everyone makes them!

### **Mistake #1: Forgetting pinMode()**

**Wrong code:**

```cpp
void setup() {
  // Oops! Forgot to set pinMode
}

void loop() {
  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);
  delay(1000);
}
```

**What happens:** LED doesn't light up or behaves erratically.

**Why:** Arduino doesn't know pin 2 should be an OUTPUT.

**Fix:** Always set pinMode in setup()!

---

### **Mistake #2: Forgetting to Turn OFF**

**Wrong code:**

```cpp
void loop() {
  digitalWrite(2, HIGH);
  delay(1000);
  // Oops! Forgot to turn it OFF
}
```

**What happens:** LED turns on and stays on forever.

**Why:** You turned it ON but never turned it OFF.

---

### **Mistake #3: No Delay**

**Wrong code:**

```cpp
void loop() {
  digitalWrite(2, HIGH);
  digitalWrite(2, LOW);
}
```

**What happens:** LED appears dimly lit, not blinking.

**Why:** It's blinking millions of times per second - too fast to see!

**This teaches us:** Computers are REALLY fast. Without delay(), your code runs incredibly quickly.

---

### **Mistake #4: Wrong Pin Number**

**Wrong code:**

```cpp
void setup() {
  pinMode(2, OUTPUT);
}

void loop() {
  digitalWrite(3, HIGH);  // Oops! Set up pin 2, but using pin 3
  delay(1000);
  digitalWrite(3, LOW);
  delay(1000);
}
```

**What happens:** Nothing! The wrong LED (or no LED) lights up.

**Fix:** Make sure pinMode and digitalWrite use the SAME pin number.

---

## **2.7 💡 Key Concepts Summary**

Before moving to the next chapter, make sure you understand these concepts:

### **Program Structure**

- ✅ Every Arduino program has `setup()` and `loop()`
- ✅ `setup()` runs ONCE when Arduino starts
- ✅ `loop()` runs FOREVER, repeatedly

### **Digital Output**

- ✅ `pinMode(pin, OUTPUT)` tells Arduino this pin will send signals
- ✅ `digitalWrite(pin, HIGH)` turns pin ON (5V)
- ✅ `digitalWrite(pin, LOW)` turns pin OFF (0V)

### **Timing**

- ✅ `delay(ms)` pauses the program
- ✅ 1000 ms = 1 second
- ✅ Without delay, blinking is too fast to see

### **eBricks-AI Connections**

- ✅ Each LED on the LED Bar connects to a specific Arduino pin
- ✅ Always connect VCC to power and GND to ground
- ✅ Unplug power before changing connections

---

## **2.8 🚀 Final Challenges**

Ready to test your understanding? Try these challenges.

### **Challenge 1: SOS Signal**

Create an SOS signal in Morse code:

- S = three short blinks
- O = three long blinks
- S = three short blinks
- Pause, then repeat

**Morse timing:**

- Short = 200ms
- Long = 600ms
- Pause between letters = 600ms
- Pause between words = 1400ms

---

### **Challenge 2: Heartbeat Pattern**

Create a pattern that looks like a heartbeat:

- Quick double pulse
- Pause
- Quick double pulse
- Longer pause
- Repeat

---

### **Challenge 3: Traffic Light**

Using 3 LEDs, simulate a traffic light:

- Red (5 seconds)
- Yellow (2 seconds)
- Green (5 seconds)
- Yellow (2 seconds)
- Back to Red

---

### **Challenge 4: Binary Clock Second Counter**

Use all 8 LEDs to count from 0 to 255 in binary, with each number showing for 1 second.

**Hint:** This is tricky! We'll learn an easier way in Chapter 4. For now, try to manually code at least 0-7.

---

## **2.9 Troubleshooting Guide**

**Problem: No LED lights up**

Check:

- [ ] Is USB plugged in? (Power LED on Arduino should be lit)
- [ ] Did you upload the code? (Not just verify)
- [ ] Is `pinMode()` in `setup()`?
- [ ] Are you using the correct pin number?
- [ ] Is the eBricks-AI LED Bar properly connected?

---

**Problem: LED stays on constantly**

Check:

- [ ] Did you include `digitalWrite(pin, LOW)`?
- [ ] Did you upload the NEW code after making changes?

---

**Problem: LED blinks too fast / appears dim**

Check:

- [ ] Is there a `delay()` after each digitalWrite?
- [ ] Is the delay long enough? (Try 1000ms to start)

---

**Problem: Wrong LED is blinking**

Check:

- [ ] Does the pin number in `pinMode()` match the one in `digitalWrite()`?
- [ ] Is the physical connection correct? (LED Bar pin 2 → Arduino pin 2)

---

## **2.10 What You've Achieved**

Congratulations! You can now:

- ✅ Write a complete Arduino program
- ✅ Understand setup() and loop()
- ✅ Control digital outputs
- ✅ Connect eBricks-AI modules
- ✅ Create timing patterns
- ✅ Debug common mistakes

**Most importantly:** You're starting to think like a programmer. You predicted what code would do, tested it, and learned from the results.

---

## **Looking Ahead**

In the next chapter, we'll:

- Control all 8 LEDs efficiently
- Learn about FOR loops
- Create awesome patterns
- Understand binary numbers
- Make a moving "Knight Rider" effect

**But first, take a break!** Go show someone your blinking LED. Explain what `setup()` and `loop()` do. Teaching others is one of the best ways to learn.

---

**Vocabulary Review:**

- **pinMode()** - Sets whether a pin is INPUT or OUTPUT
- **digitalWrite()** - Turns a pin ON (HIGH) or OFF (LOW)
- **delay()** - Pauses the program for a specified number of milliseconds
- **setup()** - Function that runs once when Arduino starts
- **loop()** - Function that runs repeatedly forever
- **Comment** - Text in code that Arduino ignores (starts with //)
- **HIGH** - Pin is ON (5V)
- **LOW** - Pin is OFF (0V)

---

**Save your work!**

- File → Save As → "Chapter2_Blink_Experiments"
- Add comments to remember what each version does

**In your notebook, write down:**

- Three things you learned
- One thing you're still confused about
- One thing you want to try next

See you in Chapter 3! 🚀
