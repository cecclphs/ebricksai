# **Chapter 3: Digital Output - Patterns and Loops**

## **Chapter Overview**

🎯 **What You'll Learn:**

- Why repetitive code is a problem
- How to use variables to store values
- How FOR loops work (through discovery!)
- Creating patterns across multiple LEDs
- The famous "Knight Rider" scanning effect
- Thinking algorithmically about patterns

🔧 **Required eBricks-AI Modules:**

- Controller module (Arduino Pro Mini / ESP32)
- 8-bit LED Bar module (already connected from Chapter 2)
- Power connector
- Connection wires

⏱️ **Time Required:** 90-120 minutes

---

## **3.1 The Problem: Too Much Typing!**

Let's start with a challenge. Try to create a pattern where each LED lights up in sequence, one at a time, from LED 1 to LED 8.

### **The "Obvious" Solution**

Based on what you learned in Chapter 2, you might write:

```cpp
void setup() {
  pinMode(2, OUTPUT);  // LED 1
  pinMode(3, OUTPUT);  // LED 2
  pinMode(4, OUTPUT);  // LED 3
  pinMode(5, OUTPUT);  // LED 4
  pinMode(6, OUTPUT);  // LED 5
  pinMode(7, OUTPUT);  // LED 6
  pinMode(8, OUTPUT);  // LED 7
  pinMode(9, OUTPUT);  // LED 8
}

void loop() {
  // Turn on LED 1
  digitalWrite(2, HIGH);
  delay(200);
  digitalWrite(2, LOW);

  // Turn on LED 2
  digitalWrite(3, HIGH);
  delay(200);
  digitalWrite(3, LOW);

  // Turn on LED 3
  digitalWrite(4, HIGH);
  delay(200);
  digitalWrite(4, LOW);

  // Turn on LED 4
  digitalWrite(5, HIGH);
  delay(200);
  digitalWrite(5, LOW);

  // Turn on LED 5
  digitalWrite(6, HIGH);
  delay(200);
  digitalWrite(6, LOW);

  // Turn on LED 6
  digitalWrite(7, HIGH);
  delay(200);
  digitalWrite(7, LOW);

  // Turn on LED 7
  digitalWrite(8, HIGH);
  delay(200);
  digitalWrite(8, LOW);

  // Turn on LED 8
  digitalWrite(9, HIGH);
  delay(200);
  digitalWrite(9, LOW);
}
```

**Go ahead and upload this.** It works! You'll see a scanning pattern across your LED bar.

But let's count:

- **8 lines** in setup()
- **24 lines** in loop()
- **32 lines total** just to make 8 LEDs blink in sequence!

### **The Problems with This Approach**

1. **Too much typing** - Your fingers get tired!
2. **Easy to make mistakes** - Did you notice the pattern? Easy to use wrong pin numbers
3. **Hard to modify** - What if you want to change the delay? You'd need to change it 8 times!
4. **What if you had 100 LEDs?** This approach doesn't scale

**There must be a better way!**

---

## **3.2 Discovering Variables**

Let's start solving this problem step by step.

### **🧪 Experiment 1: What's Changing?**

Look at the pattern in our code:

```cpp
digitalWrite(2, HIGH);  // Pin 2
digitalWrite(3, HIGH);  // Pin 3
digitalWrite(4, HIGH);  // Pin 4
digitalWrite(5, HIGH);  // Pin 5
```

**Question:** What's changing each time?

Your answer: ****\*\*****\_\_\_****\*\*****

**Answer:** The pin number! It goes 2, 3, 4, 5, 6, 7, 8, 9.

**Question:** What stays the same?

Your answer: ****\*\*****\_\_\_****\*\*****

**Answer:** Everything else! We're always doing:

- `digitalWrite`
- `HIGH`
- `delay(200)`
- Then `LOW`

### **Introducing Variables**

Instead of writing the number directly, we can store it in a **variable**.

Think of a variable like a box with a label:

```
┌─────────────┐
│ pin = 2     │  ← The box (variable named "pin")
└─────────────┘     contains the value 2
```

**Let's try it:**

```cpp
void loop() {
  int pin;  // Create a variable named "pin"

  pin = 2;  // Put the value 2 in the box
  digitalWrite(pin, HIGH);  // Use the value from the box
  delay(200);
  digitalWrite(pin, LOW);

  pin = 3;  // Change the value to 3
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);

  pin = 4;  // Change the value to 4
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);

  // ... and so on
}
```

**Upload this and test it!**

### **Understanding Variables**

Let's break down the syntax:

```cpp
int pin;
```

- `int` = "integer" = whole number (like 2, 3, 4, not 2.5)
- `pin` = the name we chose for our variable (we could call it anything)
- `;` = end of statement

```cpp
pin = 2;
```

- `pin` = the variable name
- `=` = assignment operator (means "put this value in the variable")
- `2` = the value we're storing

**Important:** In programming, `=` means "assign" not "equals"!

```
Math:     x = 5 means "x equals 5"
Arduino:  x = 5 means "put 5 into x"
```

### **Shorter Syntax**

We can declare and assign in one line:

```cpp
int pin = 2;  // Create variable "pin" and put 2 in it
```

---

## **3.3 🧪 Experiment 2: Variables Can Change**

Let's play with variables to understand them better.

**Try this code:**

```cpp
void setup() {
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  Serial.begin(9600);  // This lets us see variable values!
}

void loop() {
  int pin = 2;

  Serial.print("Pin is: ");
  Serial.println(pin);  // Show value of pin
  digitalWrite(pin, HIGH);
  delay(500);
  digitalWrite(pin, LOW);
  delay(500);

  pin = 3;  // Change the value!

  Serial.print("Pin is now: ");
  Serial.println(pin);
  digitalWrite(pin, HIGH);
  delay(500);
  digitalWrite(pin, LOW);
  delay(500);

  pin = 4;  // Change again!

  Serial.print("Pin is now: ");
  Serial.println(pin);
  digitalWrite(pin, HIGH);
  delay(500);
  digitalWrite(pin, LOW);
  delay(500);
}
```

**After uploading:**

1. Click **Tools → Serial Monitor** (or press Ctrl+Shift+M)
2. Watch the text appear!

You should see:

```
Pin is: 2
Pin is now: 3
Pin is now: 4
Pin is: 2
Pin is now: 3
Pin is now: 4
...
```

**Serial Monitor is your debugging superpower!** You can use `Serial.println()` to see what your code is doing.

---

### **Understanding What Happened**

The variable `pin` started at 2, then we changed it to 3, then to 4.

**Key insight:** Variables can change value while the program runs!

```
Time →
pin = 2  →  pin = 3  →  pin = 4  →  (loop repeats)  →  pin = 2 ...
```

---

## **3.4 The Pattern Recognition Challenge**

Now let's look at how `pin` changes:

```cpp
pin = 2;  // First LED
// ... do stuff ...
pin = 3;  // Second LED
// ... do stuff ...
pin = 4;  // Third LED
// ... do stuff ...
pin = 5;  // Fourth LED
```

**Question:** Can you describe the pattern?

Your answer: ******\*\*******\_\_\_******\*\*******

**Answer:** Each time, we **add 1** to pin!

```
2 + 1 = 3
3 + 1 = 4
4 + 1 = 5
5 + 1 = 6
...
```

### **Can We Tell Arduino to Do This Automatically?**

**YES! This is exactly what FOR loops do!**

---

## **3.5 Discovering FOR Loops**

### **The Problem Statement**

We want Arduino to:

1. Start with pin = 2
2. Do something with that pin
3. Add 1 to pin (so now pin = 3)
4. Do something with that pin
5. Add 1 to pin (so now pin = 4)
6. Keep going until pin = 9
7. Stop

**This is exactly what a FOR loop does!**

### **FOR Loop Syntax**

```cpp
for (int pin = 2; pin <= 9; pin = pin + 1) {
  // Code here runs 8 times
  // with pin being 2, then 3, then 4, ... up to 9
}
```

Let's break this down:

```cpp
for (START; CONDITION; CHANGE) {
  // What to repeat
}
```

**The three parts:**

1. **START:** `int pin = 2`
   - Create variable called `pin`
   - Start with value 2

2. **CONDITION:** `pin <= 9`
   - Keep going while pin is less than or equal to 9
   - When pin becomes 10, stop!

3. **CHANGE:** `pin = pin + 1`
   - After each loop, add 1 to pin

### **How It Runs - Step by Step**

Let me show you exactly what happens:

```
1. START: Create pin, set pin = 2
2. CHECK: Is pin <= 9? Yes (2 <= 9) ✓
3. RUN: Execute code inside { }
4. CHANGE: pin = pin + 1, so now pin = 3
5. CHECK: Is pin <= 9? Yes (3 <= 9) ✓
6. RUN: Execute code inside { }
7. CHANGE: pin = pin + 1, so now pin = 4
8. CHECK: Is pin <= 9? Yes (4 <= 9) ✓
9. RUN: Execute code inside { }
...continues...
25. CHANGE: pin = pin + 1, so now pin = 10
26. CHECK: Is pin <= 9? No (10 <= 9) ✗
27. STOP: Exit the loop
```

---

## **3.6 🧪 Experiment 3: Your First FOR Loop**

Let's write a FOR loop to set up all our pins!

```cpp
void setup() {
  Serial.begin(9600);

  for (int pin = 2; pin <= 9; pin = pin + 1) {
    pinMode(pin, OUTPUT);

    // Let's see what's happening!
    Serial.print("Set pin ");
    Serial.print(pin);
    Serial.println(" as OUTPUT");
  }

  Serial.println("Setup complete!");
}

void loop() {
  // Empty for now
}
```

**Upload this and open the Serial Monitor.**

You should see:

```
Set pin 2 as OUTPUT
Set pin 3 as OUTPUT
Set pin 4 as OUTPUT
Set pin 5 as OUTPUT
Set pin 6 as OUTPUT
Set pin 7 as OUTPUT
Set pin 8 as OUTPUT
Set pin 9 as OUTPUT
Setup complete!
```

**Wow!** We replaced 8 lines of code with just 3 lines!

```cpp
// Old way - 8 lines:
pinMode(2, OUTPUT);
pinMode(3, OUTPUT);
pinMode(4, OUTPUT);
pinMode(5, OUTPUT);
pinMode(6, OUTPUT);
pinMode(7, OUTPUT);
pinMode(8, OUTPUT);
pinMode(9, OUTPUT);

// New way - 3 lines:
for (int pin = 2; pin <= 9; pin = pin + 1) {
  pinMode(pin, OUTPUT);
}
```

---

## **3.7 🧪 Experiment 4: Sequential LED Pattern**

Now let's use a FOR loop to light up LEDs in sequence!

```cpp
void setup() {
  for (int pin = 2; pin <= 9; pin = pin + 1) {
    pinMode(pin, OUTPUT);
  }
}

void loop() {
  // Light up each LED in sequence
  for (int pin = 2; pin <= 9; pin = pin + 1) {
    digitalWrite(pin, HIGH);
    delay(200);
    digitalWrite(pin, LOW);
  }
}
```

**Upload this!**

You should see LEDs lighting up one by one from left to right!

**Compare with our original 32-line version:**

- Old version: 32 lines
- New version: 11 lines
- Same result!

---

### **Understanding the Loop Execution**

Let's trace through what happens in `loop()`:

```
First time through FOR loop:
- pin = 2
- digitalWrite(2, HIGH) → LED 1 turns ON
- delay(200) → Wait 0.2 seconds
- digitalWrite(2, LOW) → LED 1 turns OFF
- pin = pin + 1 → pin becomes 3

Second time through FOR loop:
- pin = 3
- digitalWrite(3, HIGH) → LED 2 turns ON
- delay(200) → Wait 0.2 seconds
- digitalWrite(3, LOW) → LED 2 turns OFF
- pin = pin + 1 → pin becomes 4

...continues for pins 4, 5, 6, 7, 8, 9...

After pin 9:
- pin = pin + 1 → pin becomes 10
- Is pin <= 9? No!
- Exit the FOR loop
- End of loop() function
- Arduino runs loop() again!
```

---

## **3.8 Shorthand Operators**

Programmers are lazy (in a good way!). We have shortcuts for common operations.

### **Increment Operator**

Instead of:

```cpp
pin = pin + 1;
```

We can write:

```cpp
pin++;
```

Both mean "add 1 to pin"!

**From now on, we'll use this shorthand:**

```cpp
for (int pin = 2; pin <= 9; pin++) {
  // pin++ is the same as pin = pin + 1
}
```

### **Other Useful Shortcuts**

```cpp
pin--;           // Same as: pin = pin - 1
pin += 2;        // Same as: pin = pin + 2
pin -= 3;        // Same as: pin = pin - 3
pin *= 2;        // Same as: pin = pin * 2
pin /= 2;        // Same as: pin = pin / 2
```

---

## **3.9 🧪 Experiment 5: Controlling Speed**

Now that we understand loops, let's experiment!

### **Challenge 5.1: Speed Control**

**Question:** How can we make the pattern go faster?

Try it yourself first, then check the solution.

<details>
<summary>Solution</summary>

Change the delay!

```cpp
void loop() {
  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(pin, HIGH);
    delay(50);  // Changed from 200 to 50
    digitalWrite(pin, LOW);
  }
}
```

</details>

---

### **Challenge 5.2: Variable Speed**

What if we want the pattern to **accelerate** - start slow and get faster?

**Hint:** Make the delay get smaller each time.

**Think about it:** How could we make delay depend on which LED is lit?

<details>
<summary>Solution</summary>

```cpp
void loop() {
  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(pin, HIGH);

    int delayTime = (10 - pin) * 50;  // Pin 2: 400ms, Pin 9: 50ms
    delay(delayTime);

    digitalWrite(pin, LOW);
  }
}
```

Watch the pattern speed up!

</details>

---

## **3.10 🧪 Experiment 6: Backward Pattern**

Can we make the LEDs scan from right to left instead?

### **Method 1: Count Down**

```cpp
void loop() {
  for (int pin = 9; pin >= 2; pin--) {  // Start at 9, go down to 2
    digitalWrite(pin, HIGH);
    delay(200);
    digitalWrite(pin, LOW);
  }
}
```

**Notice:**

- Start: `pin = 9` (highest number)
- Condition: `pin >= 2` (keep going while pin is greater than or equal to 2)
- Change: `pin--` (subtract 1 each time)

---

### **Challenge 6.1: Back and Forth**

Make the LEDs scan left to right, then right to left, continuously!

**Hint:** You'll need TWO for loops in your loop() function.

<details>
<summary>Solution</summary>

```cpp
void loop() {
  // Go left to right
  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(pin, HIGH);
    delay(100);
    digitalWrite(pin, LOW);
  }

  // Go right to left
  for (int pin = 9; pin >= 2; pin--) {
    digitalWrite(pin, HIGH);
    delay(100);
    digitalWrite(pin, LOW);
  }
}
```

</details>

---

## **3.11 Knight Rider Effect**

Remember the TV show Knight Rider? Let's create that iconic scanning effect!

The difference from our back-and-forth pattern: **leave a "tail" of LEDs on** for a more dramatic effect.

### **The Goal**

Instead of just one LED at a time, we want:

```
Frame 1: ●○○○○○○○
Frame 2: ○●○○○○○○
Frame 3: ○○●○○○○○
Frame 4: ○○○●○○○○
...
```

But with a nice **trailing fade** effect.

### **Simple Knight Rider - No Fade (Yet)**

```cpp
void loop() {
  // Scan left to right
  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(pin, HIGH);
    delay(80);
    digitalWrite(pin, LOW);
    delay(20);  // Small gap between LEDs
  }

  // Scan right to left
  for (int pin = 8; pin >= 3; pin--) {  // Note: 8 to 3, not 9 to 2
    digitalWrite(pin, HIGH);             // This prevents double-flash at ends
    delay(80);
    digitalWrite(pin, LOW);
    delay(20);
  }
}
```

**Upload and watch!**

---

### **Challenge 11.1: Knight Rider with Trail**

Create a version where 3 LEDs are lit at once, with the middle one being the "main" LED:

```
○●○○○○○○  ← LED pattern
 ↑ main LED, ± 1 dimmer (we'll simulate with timing)
```

This is tricky! Think about how you might turn on the LED behind and ahead of the main one.

---

## **3.12 🧪 Experiment 7: Nested Loops**

You can put loops inside loops! This is called **nesting**.

### **Example: Blink Each LED Three Times**

```cpp
void loop() {
  for (int pin = 2; pin <= 9; pin++) {
    // For each pin, blink it 3 times
    for (int blink = 0; blink < 3; blink++) {
      digitalWrite(pin, HIGH);
      delay(100);
      digitalWrite(pin, LOW);
      delay(100);
    }
    delay(300);  // Pause before next LED
  }
}
```

**What's happening:**

1. Outer loop: pin = 2
2. Inner loop runs 3 times: blink LED on pin 2 three times
3. Outer loop: pin = 3
4. Inner loop runs 3 times: blink LED on pin 3 three times
5. ...continues...

**Visual representation:**

```
For pin 2:
  Blink 0: ON-OFF
  Blink 1: ON-OFF
  Blink 2: ON-OFF

For pin 3:
  Blink 0: ON-OFF
  Blink 1: ON-OFF
  Blink 2: ON-OFF

...
```

---

### **Challenge 7.1: Cascading Blinks**

Make each LED blink a number of times equal to its position:

- LED 1 (pin 2): blink 1 time
- LED 2 (pin 3): blink 2 times
- LED 3 (pin 4): blink 3 times
- ...
- LED 8 (pin 9): blink 8 times

<details>
<summary>Hint</summary>

Use `(pin - 1)` as the number of times to blink!

</details>

<details>
<summary>Solution</summary>

```cpp
void loop() {
  for (int pin = 2; pin <= 9; pin++) {
    int numBlinks = pin - 1;  // Pin 2 → 1 blink, Pin 3 → 2 blinks, etc.

    for (int i = 0; i < numBlinks; i++) {
      digitalWrite(pin, HIGH);
      delay(100);
      digitalWrite(pin, LOW);
      delay(100);
    }

    delay(500);  // Pause before next LED
  }
}
```

</details>

---

## **3.13 Keeping All LEDs On**

What if we want to turn LEDs on one by one, but **keep them all on**?

### **The Problem with Our Current Approach**

```cpp
for (int pin = 2; pin <= 9; pin++) {
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);  // This turns it off!
}
```

Each LED turns off before the next one turns on.

### **The Solution: Don't Turn Them Off!**

```cpp
void setup() {
  for (int pin = 2; pin <= 9; pin++) {
    pinMode(pin, OUTPUT);
  }
}

void loop() {
  // Turn all off first
  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(pin, LOW);
  }

  delay(1000);

  // Turn on one by one
  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(pin, HIGH);
    delay(200);
    // Notice: no digitalWrite(pin, LOW) here!
  }

  delay(1000);
}
```

**Result:** LEDs light up one by one and stay lit!

---

### **Challenge 13.1: LED Bar Graph**

Create a "loading bar" effect where:

1. All LEDs turn off
2. LEDs fill up one by one from left to right
3. Once full, all turn off
4. Repeat

---

### **Challenge 13.2: Breathing Effect**

Create a pattern where:

1. LEDs light up one by one (left to right)
2. LEDs turn off one by one (left to right)
3. LEDs light up one by one (right to left)
4. LEDs turn off one by one (right to left)
5. Repeat

This should look like the LED bar is "breathing"!

---

## **3.14 Common FOR Loop Mistakes**

Let's learn from common mistakes!

### **Mistake #1: Wrong Condition Operator**

**Wrong:**

```cpp
for (int pin = 2; pin < 9; pin++) {  // < instead of <=
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);
}
```

**What happens:** Only pins 2-8 light up. Pin 9 is skipped!

**Why:** `pin < 9` means "while pin is less than 9", so when pin = 9, the loop stops.

**Fix:** Use `pin <= 9` (less than **or equal to**)

---

### **Mistake #2: Infinite Loop**

**Wrong:**

```cpp
for (int pin = 2; pin <= 9;) {  // Missing pin++
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);
}
```

**What happens:** Only pin 2 blinks forever! Arduino seems frozen.

**Why:** `pin` never changes! It stays at 2 forever.

**Fix:** Always include the increment: `pin++`

---

### **Mistake #3: Off-by-One Errors**

**Wrong:**

```cpp
for (int pin = 1; pin <= 9; pin++) {  // Started at 1 instead of 2
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);
}
```

**What happens:** First LED doesn't light, or strange behavior.

**Why:** There's no LED on pin 1! Our LEDs are on pins 2-9.

**Remember:** Arrays and hardware connections often start at unexpected numbers!

---

### **Mistake #4: Wrong Loop Variable**

**Wrong:**

```cpp
void setup() {
  for (int i = 2; i <= 9; i++) {
    pinMode(i, OUTPUT);
  }
}

void loop() {
  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(i, HIGH);  // Using 'i' instead of 'pin'
    delay(200);
    digitalWrite(i, LOW);
  }
}
```

**What happens:** Compiler error: "'i' was not declared in this scope"

**Why:** The variable `i` only exists inside setup()'s loop, not in loop()'s loop!

**Fix:** Use the correct variable name: `pin`

---

## **3.15 💡 Key Concepts Summary**

### **Variables**

- ✅ Variables store values that can change
- ✅ `int variableName = value;` creates an integer variable
- ✅ Use `Serial.println()` to see variable values
- ✅ Variables only exist in the { } block where they're created

### **FOR Loops**

- ✅ FOR loops repeat code multiple times
- ✅ `for (start; condition; change) { }`
- ✅ Three parts: initialization, condition, increment
- ✅ Loop runs while condition is true
- ✅ `pin++` means `pin = pin + 1`
- ✅ `pin--` means `pin = pin - 1`

### **Comparison Operators**

- ✅ `<=` means "less than or equal to"
- ✅ `>=` means "greater than or equal to"
- ✅ `<` means "less than"
- ✅ `>` means "greater than"
- ✅ `==` means "equals" (not = which means assign!)

### **Loop Patterns**

- ✅ Count up: `for (int i = 2; i <= 9; i++)`
- ✅ Count down: `for (int i = 9; i >= 2; i--)`
- ✅ Nested loops: loops inside loops
- ✅ Can skip the LOW digitalWrite to keep LEDs on

---

## **3.16 🚀 Final Challenges**

Ready to test your skills? Try these challenges!

### **Challenge A: Even LEDs Only**

Light up only the even-numbered LEDs (2, 4, 6, 8) in sequence.

**Hint:** Use `pin += 2` instead of `pin++`

---

### **Challenge B: Odd LEDs Only**

Light up only the odd-numbered LEDs (3, 5, 7, 9) in sequence.

---

### **Challenge C: Outside-In**

Make LEDs light up from both ends moving toward the center:

```
Step 1: ●○○○○○○●
Step 2: ○●○○○○●○
Step 3: ○○●○○●○○
Step 4: ○○○●●○○○
```

**Hint:** You'll need two variables, one counting up and one counting down!

<details>
<summary>Solution</summary>

```cpp
void loop() {
  // Turn all off
  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(pin, LOW);
  }

  // Light from outside to inside
  for (int i = 0; i < 4; i++) {
    int leftPin = 2 + i;    // 2, 3, 4, 5
    int rightPin = 9 - i;   // 9, 8, 7, 6

    digitalWrite(leftPin, HIGH);
    digitalWrite(rightPin, HIGH);
    delay(300);
  }

  delay(1000);
}
```

</details>

---

### **Challenge D: Random Blink**

Make LEDs blink in random order!

**New function you'll need:**

```cpp
int randomPin = random(2, 10);  // Random number from 2 to 9
```

---

### **Challenge E: Binary Counter (Preview)**

Using what you know about FOR loops, try to display the numbers 0-7 in binary on your LED bar.

**Binary refresher:**

```
0 = 000 = ○○○○○○○○
1 = 001 = ○○○○○○○●
2 = 010 = ○○○○○○●○
3 = 011 = ○○○○○○●●
4 = 100 = ○○○○○●○○
5 = 101 = ○○○○○●○●
6 = 110 = ○○○○○●●○
7 = 111 = ○○○○○●●●
```

This is challenging! We'll learn easier ways to do this in Chapter 4.

---

## **3.17 Troubleshooting Guide**

**Problem: FOR loop doesn't run at all**

Check:

- [ ] Is the condition correct? `pin <= 9` not `pin < 2`
- [ ] Does the start value meet the condition? If you write `for (int pin = 10; pin <= 9; pin++)` the condition is false from the start!

---

**Problem: FOR loop runs forever**

Check:

- [ ] Did you include the increment? `pin++`
- [ ] Is the increment going the right direction? If counting down, use `pin--` not `pin++`

---

**Problem: Wrong number of iterations**

Check:

- [ ] Off-by-one error? `pin < 9` gives you 2-8, `pin <= 9` gives you 2-9
- [ ] Starting from the right number? Your LEDs are on pins 2-9, not 0-7 or 1-8

---

**Problem: Compiler error: "expected ';' before ')' token"**

Check:

- [ ] Did you include all three parts? `for (start; condition; change)`
- [ ] Are there semicolons between the parts? `for (int i = 0; i < 10; i++)`

---

## **3.18 Understanding Loop Timing**

**Important concept:** Everything in a FOR loop takes time!

```cpp
for (int pin = 2; pin <= 9; pin++) {
  digitalWrite(pin, HIGH);  // ← Takes microseconds
  delay(200);               // ← Takes 200ms
  digitalWrite(pin, LOW);   // ← Takes microseconds
}
```

**Total time for one complete loop:**

- 8 LEDs × (200ms + a tiny bit) = about 1.6 seconds

**What if we want to know exactly how long things take?**

```cpp
void loop() {
  unsigned long startTime = millis();  // Current time in milliseconds

  for (int pin = 2; pin <= 9; pin++) {
    digitalWrite(pin, HIGH);
    delay(200);
    digitalWrite(pin, LOW);
  }

  unsigned long endTime = millis();
  unsigned long duration = endTime - startTime;

  Serial.print("Loop took ");
  Serial.print(duration);
  Serial.println(" milliseconds");
}
```

**Try this!** Open Serial Monitor and watch the timing.

---

## **3.19 Code Organization Tips**

As your programs get longer, organization becomes important!

### **Use Descriptive Variable Names**

**Bad:**

```cpp
for (int x = 2; x <= 9; x++) {  // What is x?
  digitalWrite(x, HIGH);
}
```

**Good:**

```cpp
for (int pin = 2; pin <= 9; pin++) {  // Ah, pin numbers!
  digitalWrite(pin, HIGH);
}
```

---

### **Add Comments for Complex Loops**

```cpp
// Light up LEDs from left to right
for (int pin = 2; pin <= 9; pin++) {
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);
}

// Light up LEDs from right to left
for (int pin = 9; pin >= 2; pin--) {
  digitalWrite(pin, HIGH);
  delay(200);
  digitalWrite(pin, LOW);
}
```

---

### **Use Constants for Magic Numbers**

Instead of:

```cpp
for (int pin = 2; pin <= 9; pin++) {  // Why 2 and 9?
```

Write:

```cpp
const int FIRST_LED_PIN = 2;
const int LAST_LED_PIN = 9;

for (int pin = FIRST_LED_PIN; pin <= LAST_LED_PIN; pin++) {
  // Much clearer!
}
```

**const** means the value can't change (constant).

---

## **3.20 What You've Achieved**

Congratulations! You can now:

- ✅ Use variables to store and modify values
- ✅ Write efficient FOR loops
- ✅ Create complex LED patterns with minimal code
- ✅ Control timing and speed of patterns
- ✅ Use nested loops for complex behaviors
- ✅ Debug common loop mistakes
- ✅ Think algorithmically about patterns

**Most importantly:** You've learned to recognize patterns in code and use loops to eliminate repetition!

---

## **Looking Ahead to Chapter 4**

In the next chapter, we'll finally tackle **binary numbers** and create our own binary counter!

You'll learn:

- How computers really count
- What binary means
- Bitwise operations
- How to convert between decimal and binary
- Creating a full 8-bit binary counter (0-255)

**Take a break!** Try creating your own LED pattern. Can you make something nobody in class has thought of yet?

---

**Vocabulary Review:**

- **Variable** - A named storage location for a value
- **int** - Integer data type (whole numbers)
- **FOR loop** - A structure that repeats code a specific number of times
- **Increment** - Add 1 to a value (++)
- **Decrement** - Subtract 1 from a value (--)
- **Nested loop** - A loop inside another loop
- **Iteration** - One pass through a loop
- **Condition** - A test that determines if a loop continues
- **Scope** - Where a variable can be used

---

**In your notebook:**

- Draw a diagram showing how a FOR loop executes
- Write down three patterns you created
- Explain to a friend (or rubber duck!) how FOR loops save typing

See you in Chapter 4 - where we dive into binary! 🚀

---
