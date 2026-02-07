# GPIO Reference Guide - Understanding Pins and Connections

## What is GPIO?

**GPIO** stands for **General Purpose Input/Output**. These are the pins on your Arduino that you can control with code.

Think of GPIO pins like the nervous system of your Arduino:
- They send signals OUT to control things (LEDs, buzzers, motors)
- They receive signals IN from things (buttons, sensors, potentiometers)

## Your Arduino's GPIO Pins

Your Arduino Pro Mini has 14 digital GPIO pins and 6 analog input pins:

```
Arduino Pro Mini Pin Layout

Digital Pins (0-13):
┌─────────────────────────────────┐
│ 0   1   2   3   4   5   6   7   │ ← Digital pins
│ 8   9  10  11  12  13           │ ← More digital pins
│                                 │
│ A0  A1  A2  A3  A4  A5          │ ← Analog pins
│                                 │
│ VCC (5V)     GND (0V)           │ ← Power pins
└─────────────────────────────────┘
```

## Pin Categories

### Digital Pins (0-13)
- **Can be INPUT** - read button presses, sensor signals
- **Can be OUTPUT** - control LEDs, buzzers, motors
- **Can use PWM** - pins 3, 5, 6, 9, 10, 11 support PWM (brightness/speed control)

### Analog Input Pins (A0-A5)
- **Input only** - read analog values (potentiometers, temperature sensors, light sensors)
- Range: 0-1023 (representing 0V to reference voltage)
- Useful for reading continuously varying values (not just on/off)

### Power Pins
- **VCC (5V)** - Power supply from USB or battery
- **3.3V** - Lower voltage output (some devices need this)
- **GND (Ground)** - 0V reference (MUST connect to complete circuit)

## eBricks Standard Servo Layout

All eBricks modules use the **standard servo connector layout** with three wires:

```
Standard Servo Layout
┌─────────────────────┐
│ Signal │ Power │ GND │
│  (1)   │  (2)  │ (3) │
├─────────────────────┤
│ Yellow │ Red   │Black│
│        │       │     │
│  SIG   │ VCC   │ GND │
└─────────────────────┘
```

### Pin Order (LEFT to RIGHT):
1. **Yellow Wire** = Signal (SIG)
2. **Red Wire** = Power (VCC) - 5V ONLY
3. **Black Wire** = Ground (GND) - 0V

### Wire Color Meanings

🟨 **Yellow = Signal (SIG)**
- Carries data or control signals
- Connects to Arduino GPIO pin (0-13 for digital, A0-A5 for analog)
- Transfers information between module and Arduino

🔴 **Red = Power (VCC)**
- Provides 5V power to the module
- **CRITICAL: Red wire connects to 5V ONLY**
- ⚠️ Never connect red wire to 3.3V (will damage the module)
- ⚠️ Never leave red wire unconnected
- Always check the module voltage requirement

⬛ **Black = Ground (GND)**
- Returns to 0V reference
- Completes the electrical circuit
- Must be connected for any module to work
- Usually labeled GND on modules and boards

## Common Connection Mistakes

### ❌ MISTAKE 1: Red wire to 3.3V
```
WRONG:
Button Red → Arduino 3.3V  ← Will damage module!

RIGHT:
Button Red → Arduino 5V    ← Correct
```

### ❌ MISTAKE 2: Missing ground connection
```
WRONG:
Button Yellow → Pin 10
Button Red → 5V
(No black wire) ← Won't work at all!

RIGHT:
Button Yellow → Pin 10
Button Red → 5V
Button Black → GND  ← Essential!
```

### ❌ MISTAKE 3: Swapped colors
```
WRONG:
Module Signal → Arduino 5V     ← Will break things
Module 5V → Arduino Pin 10     ← Wrong direction

RIGHT:
Module Yellow → Arduino Pin 10
Module Red → Arduino 5V
Module Black → Arduino GND
```

### ❌ MISTAKE 4: Using 3.3V Arduino
Some Arduino boards (like Arduino Zero) use 3.3V as main power.
eBricks modules REQUIRE 5V - they won't work on 3.3V systems.

## How to Read a Module Diagram

When you see an eBricks module connection diagram:

```
[Button Module - Standard Servo Layout]
┌──────────────────────┐
│   [Button]           │ ← Physical button
├──────────────────────┤
│ 1  │ 1  │ 2  │ 2    │ ← Pin numbers (1, 1, 2, 2)
├──────────────────────┤
│ YEL│ RED│ BLK│       │ ← Wire colors
└──────────────────────┘
```

**Read it like this:**
- Position 1 (Yellow) = Signal
- Position 2 (Red) = 5V Power
- Position 3 (Black) = Ground

The pin numbers shown are just for reference - what matters is the COLOR.

## Digital Input Example: Button

**Goal:** Read when a button is pressed

```
Button Module → Arduino
┌──────────────┐
│   [Button]   │
├──────────────┤
│YEL│RED│BLK│  │
└──────────────┘
 │   │   └──────→ GND (Black to any GND pin)
 │   └──────────→ 5V (Red to 5V ONLY)
 └──────────────→ Pin 10 (Yellow to GPIO pin)
```

**In code:**
```cpp
pinMode(10, INPUT);        // Set pin 10 as input
if (digitalRead(10) == HIGH) {
  // Button is pressed
}
```

## Digital Output Example: LED

**Goal:** Turn an LED on and off

```
LED Module → Arduino
┌──────────────┐
│    [LED]     │
├──────────────┤
│YEL│RED│BLK│  │
└──────────────┘
 │   │   └──────→ GND (Black to any GND pin)
 │   └──────────→ 5V (Red to 5V ONLY)
 └──────────────→ Pin 13 (Yellow to GPIO pin)
```

**In code:**
```cpp
pinMode(13, OUTPUT);       // Set pin 13 as output
digitalWrite(13, HIGH);    // Turn LED on
digitalWrite(13, LOW);     // Turn LED off
```

## Analog Input Example: Potentiometer

**Goal:** Read a knob position (0-1023)

```
Potentiometer Module → Arduino
┌──────────────┐
│   [Knob]     │
├──────────────┤
│YEL│RED│BLK│  │
└──────────────┘
 │   │   └──────→ GND (Black to any GND pin)
 │   └──────────→ 5V (Red to 5V ONLY)
 └──────────────→ A0 (Yellow to analog pin A0-A5)
```

**In code:**
```cpp
int value = analogRead(A0);  // Read 0-1023
Serial.println(value);
```

## Ground (GND) is Critical

Ground is the **reference point** for all signals. Every module MUST have a ground connection:

```
Why ground matters:

When voltage is HIGH:
Signal = 5V relative to GND = 1 (digital) or 1023 (analog)

When voltage is LOW:
Signal = 0V relative to GND = 0 (digital) or 0 (analog)

Without GND connection:
Arduino can't measure anything - no reference!
```

**Rule: Every module needs THREE connections:**
1. Yellow (Signal)
2. Red (Power)
3. Black (Ground)

## Arduino Pin Limitations

### Special Pins to Avoid
- **Pins 0 & 1** - Used for Serial communication (uploading code)
- Use these only if you're not debugging with Serial Monitor

### PWM Pins (for brightness/speed control)
- **Pins 3, 5, 6, 9, 10, 11** - Can do PWM
- Use `analogWrite()` for 0-255 brightness levels
- Other pins only do digital (0 or 1)

## Quick Troubleshooting

**Module not responding?**
- [ ] Yellow wire connected to Arduino?
- [ ] Red wire connected to Arduino 5V (NOT 3.3V)?
- [ ] Black wire connected to Arduino GND?
- [ ] All three wires firmly seated?

**Reading weird values?**
- [ ] Ground wire definitely connected?
- [ ] No wires touching each other?
- [ ] Using correct pin in code?

**Module getting hot or damaged?**
- [ ] Red wire was on 3.3V instead of 5V?
- [ ] Wrong wires swapped?
- STOP using immediately and check connections!

## Summary

| Wire Color | Function | Connects To | Critical? |
|-----------|----------|-------------|-----------|
| 🟨 Yellow | Signal | GPIO pin (0-13 or A0-A5) | Yes |
| 🔴 Red | 5V Power | Arduino 5V ONLY | YES ⚠️ |
| ⬛ Black | Ground | Arduino GND | Yes |

**Remember:** Yellow carries information, Red powers the module, Black completes the circuit. Every module needs all three.
