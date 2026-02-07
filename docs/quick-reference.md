# eBricks-AI Quick Reference Card

## 🔴 CRITICAL: Wire Colors & 5V Rule

```
🟨 Yellow = Signal (connects to GPIO pins)
🔴 Red = 5V ONLY (NEVER 3.3V - DAMAGES MODULES!)
⬛ Black = Ground (0V reference)
```

**⚠️ Every module MUST have all three wires connected:**
- Yellow to GPIO pin
- Red to 5V
- Black to GND

---

## Arduino Pro Mini GPIO Pinout

```
Digital Output Pins:     Digital Input Pins:      Analog Input Pins:
Pin 0-13                 Pin 0-13                 A0-A5

PWM Capable Pins:        Power Pins:
3, 5, 6, 9, 10, 11       5V, GND, 3.3V
```

**Pin 0 & 1:** Serial communication (avoid if using Serial Monitor)

---

## Standard Servo Layout (ALL eBricks Modules)

```
[Any eBricks Module]
┌──────────────────┐
│ Connections:     │
├──────────────────┤
│YEL │ RED │ BLK   │
└──────────────────┘
 │    │     └───→ GND (Black)
 │    └──────────→ 5V (Red) ⚠️
 └──────────────→ GPIO Pin (Yellow)
```

---

## Module Connection Template

**For ANY eBricks module:**

1. **Disconnect USB power first!** ⚡
2. **Connect Yellow wire** → Arduino GPIO pin (0-13 or A0-A5)
3. **Connect Red wire** → Arduino **5V ONLY** ⚠️
4. **Connect Black wire** → Arduino **GND**
5. **Verify all connections tight**
6. **Reconnect USB power**
7. **Code your solution**

---

## Common Module Connections

### Digital Output (LEDs, Buzzers)
```
Module Yellow → Pin 2-13 (or PWM pins for brightness)
Module Red    → 5V
Module Black  → GND
```

### Digital Input (Buttons)
```
Module Yellow → Pin 2-13 (read on/off state)
Module Red    → 5V
Module Black  → GND
```

### Analog Input (Potentiometers, Sensors)
```
Module Yellow → A0-A5 (read 0-1023)
Module Red    → 5V
Module Black  → GND
```

---

## Arduino Code Template

### Reading a Digital Input (Button)
```cpp
pinMode(10, INPUT);           // Set Pin 10 as input
if (digitalRead(10) == HIGH) {
  // Button pressed!
}
```

### Writing Digital Output (LED)
```cpp
pinMode(13, OUTPUT);          // Set Pin 13 as output
digitalWrite(13, HIGH);       // Turn on
digitalWrite(13, LOW);        // Turn off
```

### Reading Analog Input (Potentiometer)
```cpp
int value = analogRead(A0);   // Read 0-1023
Serial.println(value);
```

### PWM Output (Brightness/Speed)
```cpp
analogWrite(3, 128);          // Half brightness (0-255)
```

---

## Color Coding Cheat Sheet

| Wire | Color | Connects To | Purpose |
|------|-------|------------|---------|
| 1 | 🟨 Yellow | GPIO 0-13 or A0-A5 | Signal/Data |
| 2 | 🔴 Red | 5V ONLY | Power |
| 3 | ⬛ Black | GND | Ground/Return |

---

## Troubleshooting Checklist

- [ ] Yellow connected to GPIO pin?
- [ ] Red connected to 5V (NOT 3.3V)?
- [ ] Black connected to GND?
- [ ] All wires fully inserted?
- [ ] Using correct pin number in code?
- [ ] Code uploaded successfully?
- [ ] USB cable still connected?

**If nothing works:**
1. Check RED wire is on 5V (not 3.3V) - MOST COMMON ERROR
2. Check all three wires are connected
3. Check pin number in code matches wire placement
4. Try different GPIO pin
5. See [GPIO Reference](/gpio-reference) for detailed help

---

## Avoid These Mistakes!

❌ **Red to 3.3V** → Damages module  
❌ **Missing black wire** → Module won't work  
❌ **Yellow to 5V** → Wrong direction (should be GPIO)  
❌ **Swapped yellow and red** → Doesn't work and wastes time  
❌ **Using pin 0 or 1** (when using Serial) → Interferes with upload  

---

## Pin Limitations

- **Pins 0 & 1:** Serial (used for USB communication)
- **PWM Pins:** 3, 5, 6, 9, 10, 11 (for `analogWrite`)
- **Analog Pins:** A0-A5 (input only, for `analogRead`)
- **All Digital:** Can be INPUT or OUTPUT

---

## Quick Code Reference

```cpp
// Setup (runs once at start)
void setup() {
  pinMode(13, OUTPUT);        // Digital output
  pinMode(10, INPUT);         // Digital input
  Serial.begin(9600);         // Start serial
}

// Loop (runs repeatedly)
void loop() {
  // Read digital input
  int buttonState = digitalRead(10);
  
  // Read analog input
  int potValue = analogRead(A0);
  
  // Write digital output
  digitalWrite(13, HIGH);
  
  // Write PWM output (0-255)
  analogWrite(3, 128);
  
  // Print to Serial Monitor
  Serial.println(potValue);
  
  // Delay
  delay(100);
}
```

---

## Need More Help?

- **GPIO Pins & Connections:** See [GPIO Reference Guide](/gpio-reference)
- **Chapter 1:** Setting up Arduino
- **Chapter 2:** Your first program
- **Chapter 5:** Using buttons
- **Chapter 6:** Reading sensors

---

**Print this card and keep it handy!** 📋

Last Updated: 2024 | eBricks-AI Course
