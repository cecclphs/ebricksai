# **Chapter 7: Sound and Music with Buzzers**

## **Chapter Overview**

🎯 **What You'll Learn:**

- How buzzers and speakers work
- Generating tones with `tone()` and `noTone()`
- Understanding sound frequencies
- Musical note frequencies and scales
- Creating melodies and songs
- Sound effects for games
- Combining sound with LEDs and inputs
- Building interactive musical instruments

🔧 **Required eBricks-AI Modules:**

- Controller module (Arduino Pro Mini / ESP32)
- Buzzer module (passive buzzer/piezo speaker)
- 8-bit LED Bar module (already connected)
- Potentiometer module (from Chapter 6)
- 2× Button modules (from Chapter 5)
- Power connector
- Connection wires

⏱️ **Time Required:** 90-120 minutes

---

## **7.1 Understanding Sound**

### **What is Sound?**

Sound is **vibration** traveling through air. When something vibrates:

1. It pushes air molecules
2. Creates pressure waves
3. Waves travel to your ear
4. Your eardrum vibrates
5. Your brain interprets it as sound!

---

### **Frequency - How Fast It Vibrates**

**Frequency** = number of vibrations per second

**Measured in Hertz (Hz):**

- 1 Hz = 1 vibration per second
- 100 Hz = 100 vibrations per second
- 1000 Hz (1 kHz) = 1000 vibrations per second

**The Rule:**

- **High frequency** = High pitch (like a whistle)
- **Low frequency** = Low pitch (like a drum)

---

### **🧪 Physical Activity: Understanding Frequency**

**Try this with a ruler:**

1. Hold a ruler on the edge of a table
2. Let part of it hang over the edge
3. Press down on the table end
4. Flick the overhanging end

**Experiment:**

- **Long overhang:** Vibrates slowly → LOW pitch sound
- **Short overhang:** Vibrates quickly → HIGH pitch sound

**This is frequency!** Fast vibrations = high frequency = high pitch!

---

### **Human Hearing Range**

```
20 Hz ─────────────────────────────── 20,000 Hz
  │                                      │
  └─ Lowest we can hear    Highest we can hear ─┘

  Speech: 300 - 3,000 Hz
  Music:  20 - 20,000 Hz
  Middle C: 261.63 Hz
```

**Fun fact:** As you get older, you lose ability to hear high frequencies!

---

## **7.2 How Buzzers Work**

### **Types of Buzzers**

**1. Active Buzzer:**

- Has built-in oscillator
- Just apply voltage → makes sound
- Fixed frequency (can't change pitch)
- **Not what we're using!**

**2. Passive Buzzer (Piezo Speaker):**

- No built-in oscillator
- Must send it varying signals
- Can create ANY frequency
- **This is what we're using!** ✓

---

### **Inside a Passive Buzzer**

```
[Cross-section of Piezo Buzzer]

    ┌───────────────┐
    │   Diaphragm   │ ← Flexible disk
    │               │
    ├───────────────┤
    │ Piezo Crystal │ ← Expands/contracts with voltage
    │               │
    └───────────────┘
        ││││││
      Signal Pin
```

**How it works:**

1. Send HIGH signal → Crystal expands → Diaphragm moves OUT
2. Send LOW signal → Crystal contracts → Diaphragm moves IN
3. Repeat fast → Diaphragm vibrates → Creates sound!

**Key insight:** The SPEED of HIGH/LOW switching determines the PITCH!

---

### **Your eBricks-AI Buzzer Module**

Your buzzer module has connections:

```
[Buzzer Module]
┌──────────────┐
│   [Buzzer]   │ ← Sound comes out here!
├──────────────┤
│ VCC GND SIG  │ ← Connections
└──────────────┘
```

**Pin connections:**

- **VCC** → Arduino VCC (5V) - Powers the buzzer
- **GND** → Arduino GND - Ground reference
- **SIG** → Arduino Digital Pin (we'll use pin 12)

---

## **7.3 Connecting Your Buzzer**

### **Physical Connection**

**Step 1:** Disconnect USB power! ⚡

**Step 2:** Connect buzzer:

- Buzzer VCC → Arduino VCC (5V)
- Buzzer GND → Arduino GND
- Buzzer SIG → Arduino Pin 12

**Step 3:** Verify all other connections (LEDs, buttons, pot) are secure

**Step 4:** Reconnect USB power

**⚠️ Volume Warning:** Buzzers can be LOUD! If it's too loud in class, you can:

- Put tape over the buzzer hole
- Use shorter beep durations
- Stand further away

---

## **7.4 🧪 Experiment 1: Making Your First Sound**

Let's make our first beep!

### **The Manual Approach (Understanding the Basics)**

Before using Arduino's built-in functions, let's understand what's happening:

```cpp
const int BUZZER_PIN = 12;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  // Create 1000 Hz tone manually
  // 1000 Hz = 1000 cycles per second
  // 1 cycle = 1/1000 second = 1000 microseconds
  // Half cycle (HIGH) = 500 microseconds
  // Half cycle (LOW) = 500 microseconds

  digitalWrite(BUZZER_PIN, HIGH);
  delayMicroseconds(500);  // Wait 500 microseconds
  digitalWrite(BUZZER_PIN, LOW);
  delayMicroseconds(500);
}
```

**Upload this!**

You should hear a continuous 1000 Hz tone!

---

### **Understanding What's Happening**

Let's visualize the signal:

```
Time: →→→→→→→→→→→→→→→

Signal:
HIGH ──┐  ┐  ┐  ┐  ┐  ┐
       │  │  │  │  │  │
       └──┘  └──┘  └──┘

       ← 500µs →
       ← 1000µs (1ms) →

1000 cycles per second = 1000 Hz
```

**The buzzer diaphragm vibrates 1000 times per second!**

---

### **🧪 Challenge 1.1: Change the Pitch**

Can you make it higher pitched?

**Hint:** Higher pitch = higher frequency = SHORTER delays!

<details>
<summary>Solution for 2000 Hz (double the frequency)</summary>

```cpp
void loop() {
  digitalWrite(BUZZER_PIN, HIGH);
  delayMicroseconds(250);  // Half of 500
  digitalWrite(BUZZER_PIN, LOW);
  delayMicroseconds(250);
}
```

**2000 Hz = one cycle every 0.5ms = 250µs HIGH + 250µs LOW**

</details>

---

## **7.5 The Easy Way: tone() Function**

Making tones manually is tedious! Arduino has a built-in function: **`tone()`**

### **Using tone()**

```cpp
tone(pin, frequency);
```

**Parameters:**

- `pin` - Which pin the buzzer is on
- `frequency` - Frequency in Hz

**That's it!** Arduino handles all the HIGH/LOW switching automatically!

---

### **Basic tone() Example**

```cpp
const int BUZZER_PIN = 12;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  tone(BUZZER_PIN, 1000);  // Play 1000 Hz
  delay(1000);              // For 1 second

  noTone(BUZZER_PIN);      // Stop the tone
  delay(1000);              // Silence for 1 second
}
```

**Upload this!**

You should hear: BEEP - silence - BEEP - silence - repeating

---

### **The tone() Function - Complete Syntax**

There's an optional third parameter for duration:

```cpp
tone(pin, frequency, duration);
```

**Parameters:**

- `pin` - Which pin
- `frequency` - Frequency in Hz
- `duration` - How long to play (in milliseconds) - OPTIONAL

**With duration:**

```cpp
void loop() {
  tone(BUZZER_PIN, 1000, 500);  // Play 1000 Hz for 500ms
  delay(500);                    // Wait for tone to finish
  delay(500);                    // Additional silence
}
```

**⚠️ Important:** Even with duration parameter, you need `delay()` to wait for the tone to finish! The `tone()` function is **non-blocking** - it starts the tone and immediately continues!

---

## **7.6 🧪 Experiment 2: Frequency Exploration**

Let's explore different frequencies!

```cpp
const int BUZZER_PIN = 12;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Try different frequencies
  int frequencies[] = {100, 200, 400, 800, 1600, 3200};

  for (int i = 0; i < 6; i++) {
    Serial.print("Playing: ");
    Serial.print(frequencies[i]);
    Serial.println(" Hz");

    tone(BUZZER_PIN, frequencies[i]);
    delay(500);

    noTone(BUZZER_PIN);
    delay(200);
  }

  Serial.println("---");
  delay(1000);
}
```

**Listen to the progression!**

**Notice:**

- 100 Hz - Very low, almost feel the vibrations
- 200 Hz - Low pitch
- 400 Hz - Mid-low
- 800 Hz - Mid-high
- 1600 Hz - High pitch
- 3200 Hz - Very high, piercing

**Each doubling of frequency = one octave up in music!**

---

### **🧪 Challenge 2.1: Find Your Range**

Modify the code to test your hearing range!

```cpp
void loop() {
  // Start at 20 Hz, go up to 20000 Hz
  for (int freq = 20; freq <= 20000; freq += 100) {
    Serial.print(freq);
    Serial.println(" Hz");

    tone(BUZZER_PIN, freq);
    delay(50);
  }

  noTone(BUZZER_PIN);
  delay(2000);
}
```

**Question:** At what frequency do you stop hearing it?

Most teenagers can hear up to 17,000-20,000 Hz!

---

## **7.7 Musical Notes and Frequencies**

### **The Musical Scale**

Music uses specific frequencies called **notes**:

```
Note | Frequency (Hz) | Description
─────┼────────────────┼─────────────────
C4   | 261.63         | Middle C
D4   | 293.66         |
E4   | 329.63         |
F4   | 349.23         |
G4   | 392.00         |
A4   | 440.00         | Concert A (tuning standard)
B4   | 493.88         |
C5   | 523.25         | One octave above middle C
```

**The pattern repeats!**

- C3 = 130.81 Hz (half of C4)
- C5 = 523.25 Hz (double C4)
- C6 = 1046.50 Hz (double C5)

---

### **Defining Musical Notes in Code**

Let's create constants for common notes:

```cpp
// Musical note frequencies (Hz)
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_C5  523

#define NOTE_REST 0  // Silence

const int BUZZER_PIN = 12;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void playNote(int frequency, int duration) {
  if (frequency == 0) {
    // Rest (silence)
    noTone(BUZZER_PIN);
  } else {
    tone(BUZZER_PIN, frequency);
  }
  delay(duration);
  noTone(BUZZER_PIN);
  delay(50);  // Small gap between notes
}

void loop() {
  // Play a C major scale
  playNote(NOTE_C4, 500);
  playNote(NOTE_D4, 500);
  playNote(NOTE_E4, 500);
  playNote(NOTE_F4, 500);
  playNote(NOTE_G4, 500);
  playNote(NOTE_A4, 500);
  playNote(NOTE_B4, 500);
  playNote(NOTE_C5, 500);

  delay(2000);
}
```

**You just played a musical scale!** 🎵

---

## **7.8 🧪 Experiment 3: Creating Melodies**

Let's play an actual song! We'll start with "Mary Had a Little Lamb"

### **Melody as Arrays**

Instead of writing `playNote()` many times, use arrays!

```cpp
// Note definitions
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_G4  392
#define NOTE_A4  440
#define NOTE_B4  494
#define NOTE_REST 0

const int BUZZER_PIN = 12;

// Mary Had a Little Lamb
int melody[] = {
  NOTE_E4, NOTE_D4, NOTE_C4, NOTE_D4,
  NOTE_E4, NOTE_E4, NOTE_E4, NOTE_REST,
  NOTE_D4, NOTE_D4, NOTE_D4, NOTE_REST,
  NOTE_E4, NOTE_G4, NOTE_G4, NOTE_REST,
  NOTE_E4, NOTE_D4, NOTE_C4, NOTE_D4,
  NOTE_E4, NOTE_E4, NOTE_E4, NOTE_E4,
  NOTE_D4, NOTE_D4, NOTE_E4, NOTE_D4,
  NOTE_C4
};

int noteDurations[] = {
  4, 4, 4, 4,
  4, 4, 2, 4,
  4, 4, 2, 4,
  4, 4, 2, 4,
  4, 4, 4, 4,
  4, 4, 4, 4,
  4, 4, 4, 4,
  1
};

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  playMelody();
  delay(5000);  // Wait 5 seconds before repeating
}

void playMelody() {
  int numNotes = sizeof(melody) / sizeof(melody[0]);

  for (int i = 0; i < numNotes; i++) {
    // Calculate note duration
    // 4 = quarter note, 2 = half note, 1 = whole note
    int duration = 1000 / noteDurations[i];

    if (melody[i] == NOTE_REST) {
      noTone(BUZZER_PIN);
    } else {
      tone(BUZZER_PIN, melody[i]);
    }

    delay(duration);
    noTone(BUZZER_PIN);

    // Small pause between notes
    delay(duration * 0.1);
  }
}
```

**You've created a music player!** 🎶

---

### **Understanding Musical Timing**

**Note durations in music:**

```
Whole note       = 1    = 1000ms / 1 = 1000ms
Half note        = 2    = 1000ms / 2 = 500ms
Quarter note     = 4    = 1000ms / 4 = 250ms
Eighth note      = 8    = 1000ms / 8 = 125ms
Sixteenth note   = 16   = 1000ms / 16 = 62.5ms
```

**The formula:**

```cpp
int duration = baseDuration / noteDuration;
```

Where `baseDuration` might be 1000ms for a slow tempo, or 500ms for faster!

---

### **🧪 Challenge 3.1: Add More Songs**

Here are some famous melodies to try:

**Twinkle Twinkle Little Star:**

```
C C G G A A G
F F E E D D C
```

**Happy Birthday:**

```
C C D C F E
C C D C G F
```

**Jingle Bells (chorus):**

```
E E E E E E
E G C D E
```

**Try programming these!**

---

## **7.9 Sound Effects**

Let's create sound effects for games!

### **Siren Effect**

```cpp
const int BUZZER_PIN = 12;

void playSiren() {
  // Sweep from low to high
  for (int freq = 400; freq < 1600; freq += 50) {
    tone(BUZZER_PIN, freq);
    delay(20);
  }

  // Sweep from high to low
  for (int freq = 1600; freq > 400; freq -= 50) {
    tone(BUZZER_PIN, freq);
    delay(20);
  }
}

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  playSiren();
  delay(500);
}
```

**Sounds like a police siren!** 🚨

---

### **Laser Effect**

```cpp
void playLaser() {
  // Quick drop from high to low
  for (int freq = 2000; freq > 200; freq -= 50) {
    tone(BUZZER_PIN, freq);
    delay(2);
  }
  noTone(BUZZER_PIN);
}

void loop() {
  playLaser();
  delay(1000);
}
```

**Pew pew!** 🔫

---

### **Power-Up Effect**

```cpp
void playPowerUp() {
  // Quick ascending notes
  int notes[] = {262, 330, 392, 523, 659};

  for (int i = 0; i < 5; i++) {
    tone(BUZZER_PIN, notes[i]);
    delay(100);
  }
  noTone(BUZZER_PIN);
}

void loop() {
  playPowerUp();
  delay(2000);
}
```

**Like collecting a coin in a video game!** ✨

---

### **Game Over Effect**

```cpp
void playGameOver() {
  // Descending notes with sad feeling
  int notes[] = {392, 370, 349, 330, 294, 262};

  for (int i = 0; i < 6; i++) {
    tone(BUZZER_PIN, notes[i]);
    delay(300);
  }

  // Final low note
  tone(BUZZER_PIN, 196);
  delay(800);
  noTone(BUZZER_PIN);
}

void loop() {
  playGameOver();
  delay(3000);
}
```

**Wah wah waaah...** 😢

---

## **7.10 🧪 Experiment 4: Button-Controlled Piano**

Let's build a musical instrument!

### **Simple Two-Note Piano**

```cpp
const int BUZZER_PIN = 12;
const int BUTTON1_PIN = 10;
const int BUTTON2_PIN = 11;

const int NOTE_C4 = 262;
const int NOTE_E4 = 330;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);

  Serial.begin(9600);
  Serial.println("=== Piano ===");
  Serial.println("Button 1 = C, Button 2 = E");
}

void loop() {
  int button1 = digitalRead(BUTTON1_PIN);
  int button2 = digitalRead(BUTTON2_PIN);

  if (button1 == LOW) {
    tone(BUZZER_PIN, NOTE_C4);
    Serial.println("Playing C");
  } else if (button2 == LOW) {
    tone(BUZZER_PIN, NOTE_E4);
    Serial.println("Playing E");
  } else {
    noTone(BUZZER_PIN);
  }

  delay(10);
}
```

**Now you have a two-key piano!** Press buttons to play notes!

---

### **Enhanced Piano with Visual Feedback**

```cpp
const int BUZZER_PIN = 12;
const int BUTTON1_PIN = 10;
const int BUTTON2_PIN = 11;
const int LED1_PIN = 2;
const int LED2_PIN = 3;

const int NOTE_C4 = 262;
const int NOTE_E4 = 330;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON1_PIN, INPUT_PULLUP);
  pinMode(BUTTON2_PIN, INPUT_PULLUP);
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
}

void loop() {
  int button1 = digitalRead(BUTTON1_PIN);
  int button2 = digitalRead(BUTTON2_PIN);

  if (button1 == LOW) {
    tone(BUZZER_PIN, NOTE_C4);
    digitalWrite(LED1_PIN, HIGH);
  } else {
    digitalWrite(LED1_PIN, LOW);
  }

  if (button2 == LOW) {
    tone(BUZZER_PIN, NOTE_E4);
    digitalWrite(LED2_PIN, HIGH);
  } else {
    digitalWrite(LED2_PIN, LOW);
  }

  if (button1 == HIGH && button2 == HIGH) {
    noTone(BUZZER_PIN);
  }

  delay(10);
}
```

**Now the LEDs light up when you play notes!** 💡🎵

---

## **7.11 🧪 Experiment 5: Potentiometer-Controlled Theremin**

A **theremin** is an instrument where you control pitch by moving your hand! We'll use a potentiometer instead of hand position.

```cpp
const int BUZZER_PIN = 12;
const int POT_PIN = A0;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);

  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }

  Serial.begin(9600);
}

void loop() {
  int potValue = analogRead(POT_PIN);

  // Map to frequency range (200 Hz to 2000 Hz)
  int frequency = map(potValue, 0, 1023, 200, 2000);

  // Map to number of LEDs (visual feedback)
  int numLEDs = map(potValue, 0, 1023, 0, NUM_LEDS);

  // Play tone
  tone(BUZZER_PIN, frequency);

  // Display on LEDs
  for (int i = 0; i < NUM_LEDS; i++) {
    if (i < numLEDs) {
      digitalWrite(FIRST_LED + i, HIGH);
    } else {
      digitalWrite(FIRST_LED + i, LOW);
    }
  }

  // Print info
  Serial.print("Frequency: ");
  Serial.print(frequency);
  Serial.println(" Hz");

  delay(50);
}
```

**Turn the pot to play different notes!** 🎵

**This is how a real theremin works** (except it uses hand proximity instead of a pot)!

---

### **🧪 Challenge 5.1: Add Button Control**

Modify the theremin to:

- Only play sound when button is pressed
- Otherwise, silent (like releasing piano key)

---

### **🧪 Challenge 5.2: Scale Quantization**

Instead of smooth frequency changes, snap to musical notes!

**Hint:** Divide the pot range into 8 sections, each mapped to a note of the scale!

<details>
<summary>Solution</summary>

```cpp
void loop() {
  int potValue = analogRead(POT_PIN);

  // Divide into 8 regions
  int noteIndex = map(potValue, 0, 1023, 0, 8);

  // Scale notes
  int scale[] = {262, 294, 330, 349, 392, 440, 494, 523};

  if (noteIndex >= 8) noteIndex = 7;  // Constrain

  int frequency = scale[noteIndex];

  tone(BUZZER_PIN, frequency);

  Serial.print("Note index: ");
  Serial.print(noteIndex);
  Serial.print(" = ");
  Serial.print(frequency);
  Serial.println(" Hz");

  delay(50);
}
```

</details>

---

## **7.12 Combining Sound with Previous Concepts**

### **Binary Counter with Audio Feedback**

```cpp
const int BUZZER_PIN = 12;
const int BUTTON_PIN = 10;
const int FIRST_LED = 2;
const int NUM_LEDS = 8;

byte counter = 0;
int lastButton = HIGH;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  for (int pin = FIRST_LED; pin < FIRST_LED + NUM_LEDS; pin++) {
    pinMode(pin, OUTPUT);
  }

  Serial.begin(9600);
  displayBinary(counter);
}

void displayBinary(byte number) {
  Serial.print("Count: ");
  Serial.println(number);

  for (int bit = 0; bit < NUM_LEDS; bit++) {
    int pin = FIRST_LED + bit;

    if (number & (1 << bit)) {
      digitalWrite(pin, HIGH);
    } else {
      digitalWrite(pin, LOW);
    }
  }
}

void playCountSound() {
  // Higher pitch for higher numbers
  int frequency = map(counter, 0, 255, 200, 1000);
  tone(BUZZER_PIN, frequency, 100);
}

void loop() {
  int button = digitalRead(BUTTON_PIN);

  if (button == LOW && lastButton == HIGH) {
    counter++;
    displayBinary(counter);
    playCountSound();
    delay(50);
  }

  lastButton = button;
}
```

**Each count plays a slightly higher pitch!** 🔢🎵

---

### **Reaction Game with Sound**

```cpp
const int BUZZER_PIN = 12;
const int BUTTON_PIN = 10;
const int LED_PIN = 2;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);

  Serial.begin(9600);
  randomSeed(analogRead(A0));

  Serial.println("=== Reaction Game ===");
  Serial.println("Press button when LED lights!");
}

void loop() {
  // Wait random time
  int waitTime = random(2000, 5000);
  delay(waitTime);

  // Light LED and beep!
  digitalWrite(LED_PIN, HIGH);
  tone(BUZZER_PIN, 1000, 100);

  unsigned long startTime = millis();

  // Wait for button press
  while (digitalRead(BUTTON_PIN) == HIGH) {
    // Waiting...
  }

  unsigned long reactionTime = millis() - startTime;

  // Turn off LED
  digitalWrite(LED_PIN, LOW);

  // Play result sound
  if (reactionTime < 200) {
    playPowerUp();  // Fast = good!
    Serial.print("AMAZING! ");
  } else if (reactionTime < 400) {
    playSuccess();  // OK
    Serial.print("Good! ");
  } else {
    playTryAgain();  // Slow
    Serial.print("Too slow! ");
  }

  Serial.print(reactionTime);
  Serial.println("ms");

  delay(2000);
}

void playPowerUp() {
  int notes[] = {262, 330, 392, 523};
  for (int i = 0; i < 4; i++) {
    tone(BUZZER_PIN, notes[i], 80);
    delay(100);
  }
}

void playSuccess() {
  tone(BUZZER_PIN, 523, 200);
  delay(220);
  tone(BUZZER_PIN, 659, 200);
}

void playTryAgain() {
  tone(BUZZER_PIN, 392);
  delay(150);
  tone(BUZZER_PIN, 330);
  delay(300);
  noTone(BUZZER_PIN);
}
```

**Different sounds for different performance levels!**

---

## **7.13 Advanced: Playing Chords**

**Problem:** `tone()` can only play ONE frequency at a time.

**Can we play chords (multiple notes together)?**

**Answer:** Sort of! We can **alternate** between notes very quickly!

```cpp
const int BUZZER_PIN = 12;

void playChord(int freq1, int freq2, int duration) {
  unsigned long startTime = millis();

  while (millis() - startTime < duration) {
    tone(BUZZER_PIN, freq1);
    delay(5);
    tone(BUZZER_PIN, freq2);
    delay(5);
  }

  noTone(BUZZER_PIN);
}

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  // C major chord (C-E-G)
  Serial.println("C-E chord");
  playChord(262, 330, 500);
  delay(500);

  Serial.println("C-G chord");
  playChord(262, 392, 500);
  delay(500);

  Serial.println("E-G chord");
  playChord(330, 392, 500);
  delay(500);

  delay(2000);
}
```

**It's not perfect** (sounds a bit buzzy), but it creates a chord-like effect!

---

## **7.14 💡 Key Concepts Summary**

### **Sound Fundamentals**

- ✅ Sound is vibration traveling through air
- ✅ Frequency (Hz) = vibrations per second
- ✅ High frequency = high pitch, Low frequency = low pitch
- ✅ Human hearing: 20 Hz to 20,000 Hz
- ✅ Musical notes have specific frequencies

### **Arduino Sound Functions**

- ✅ `tone(pin, frequency)` - Start playing a tone
- ✅ `tone(pin, frequency, duration)` - Play tone for specific time
- ✅ `noTone(pin)` - Stop playing tone
- ✅ tone() is non-blocking (continues immediately)
- ✅ Only one tone can play at a time per Arduino

### **Musical Concepts**

- ✅ Notes: C, D, E, F, G, A, B
- ✅ Octaves: doubling frequency = one octave up
- ✅ Middle C (C4) = 261.63 Hz
- ✅ Concert A (A4) = 440 Hz (tuning standard)
- ✅ Note durations: whole, half, quarter, eighth notes

### **Sound Effects**

- ✅ Sweeping frequencies create sirens
- ✅ Quick descending = laser/whoosh
- ✅ Ascending = power-up/success
- ✅ Descending = sad/game over
- ✅ Combining with LEDs enhances feedback

---

## **7.15 🚀 Final Challenges**

### **Challenge A: Simon Says with Sound**

Enhance the Simon Says game from Chapter 5:

- Each LED has a unique tone
- Pattern plays with sound
- User must match the audio-visual pattern
- Success/failure sound effects

---

### **Challenge B: Music Box**

Create a music box that:

- Stores multiple songs in memory
- Button 1 cycles through songs
- Button 2 plays selected song
- Potentiometer controls playback speed
- LEDs show which song is selected
- Visual rhythm indicator (LEDs pulse with beat)

---

### **Challenge C: Alarm Clock**

Build an alarm system:

- Set alarm time using buttons (hours/minutes)
- Display time in binary on LEDs
- When alarm triggers:
  - Play escalating alarm sound
  - Flash LEDs
  - Button press to snooze (5 more minutes)
  - Long press to turn off

---

### **Challenge D: Electronic Drum Kit**

Create a drum kit:

- Each button plays different drum sound
- Kick: Low frequency (80-100 Hz)
- Snare: High frequency with noise
- Hi-hat: Very high frequency (5000+ Hz)
- Record and playback patterns
- LED visualization of rhythm

**Hint for drum sounds:**

```cpp
void playKick() {
  for (int freq = 150; freq > 40; freq -= 5) {
    tone(BUZZER_PIN, freq);
    delay(2);
  }
  noTone(BUZZER_PIN);
}

void playSnare() {
  // Rapid random frequencies = noise
  for (int i = 0; i < 30; i++) {
    tone(BUZZER_PIN, random(100, 300));
    delay(2);
  }
  noTone(BUZZER_PIN);
}
```

---

### **Challenge E: Pitch Detector Game**

Create a game where:

- Arduino plays a random note
- User must match it with potentiometer
- When within ±5 Hz: Success sound + LED
- Show "closeness" on LED bar
- Score tracking
- Increasing difficulty (shorter time, wider frequency range)

---

## **7.16 Troubleshooting Guide**

**Problem: No sound at all**

Check:

- [ ] Using PASSIVE buzzer (not active)?
- [ ] Correct pin number in code?
- [ ] Buzzer connected to VCC and GND?
- [ ] SIG wire to correct Arduino pin?
- [ ] Volume too low? (try putting ear closer)
- [ ] Frequency in audible range (20-20000 Hz)?

---

**Problem: Buzzer makes clicking/buzzing but no tone**

Check:

- [ ] Frequency too low? (try 400-1000 Hz)
- [ ] Using active buzzer by mistake?
- [ ] Called `noTone()` immediately after `tone()`?
- [ ] Using pin that supports tone()? (most do, but not all)

---

**Problem: Wrong pitch / doesn't match musical notes**

Check:

- [ ] Frequency values correct? (C4 = 262 Hz)
- [ ] Using integer values (not 261.63)?
- [ ] Calculation errors in frequency conversion?
- [ ] Buzzer physical limitations? (some can't do very low/high frequencies)

---

**Problem: Melody plays too fast or too slow**

Check:

- [ ] Note duration calculations correct?
- [ ] Tempo value appropriate? (try 1000ms base)
- [ ] Including delay() after tone()?
- [ ] Small pause between notes?

**Solution:**

```cpp
int tempo = 1000;  // Try different values
int duration = tempo / noteDuration;
```

---

**Problem: Tone continues after it should stop**

Check:

- [ ] Calling `noTone()` after playing?
- [ ] Using correct pin in `noTone(pin)`?
- [ ] Not stuck in infinite loop?

**Always pair tone() with noTone():**

```cpp
tone(BUZZER_PIN, frequency);
delay(duration);
noTone(BUZZER_PIN);  // Don't forget!
```

---

**Problem: Buzzer very quiet**

Check:

- [ ] VCC connected to 5V (not 3.3V)?
- [ ] Good electrical connections?
- [ ] Buzzer facing correct direction?
- [ ] Frequency in optimal range (500-4000 Hz louder)?
- [ ] Physical obstruction? (tape, case, etc.)

**Some buzzers are just quieter!** eBricks modules should be reasonably loud.

---

**Problem: Interference with other components**

Check:

- [ ] tone() interfering with PWM pins?
- [ ] Timing conflicts with delay()?
- [ ] Electrical noise affecting sensors?

**Solutions:**

- Use non-PWM pins for tone() if possible
- Keep buzzer wires away from sensor wires
- Add small delay between tone operations

---

## **7.17 Understanding tone() Limitations**

**Important things to know about tone():**

### **1. Only One Tone at a Time**

```cpp
tone(12, 262);  // Start playing C
tone(12, 330);  // Stops C, starts playing E
// Cannot play both simultaneously!
```

**Workaround:** Rapidly alternate (see section 7.13)

---

### **2. Blocks PWM on Some Pins**

On Arduino Uno/Nano:

- `tone()` on pin 3 or 11 disables PWM on pins 3 and 11
- Solution: Don't use PWM (analogWrite) on those pins while using tone()

---

### **3. Uses Timer**

`tone()` uses Timer2, which may conflict with:

- Other timer-based functions
- Some libraries
- Usually not a problem for basic projects

---

### **4. No Volume Control**

You cannot make a tone quieter or louder with `tone()`.

**Workarounds:**

- Pulse the tone (on-off-on-off) for "quieter" effect
- Use PWM on transistor controlling buzzer (advanced)
- Choose different frequencies (some naturally sound quieter)

---

## **7.18 Musical Theory Basics**

### **Scales**

**Major scale** (happy sound):

```
C  D  E  F  G  A  B  C
Do Re Mi Fa So La Ti Do
```

**Minor scale** (sad sound):

```
A  B  C  D  E  F  G  A
```

**Pentatonic scale** (sounds good with any note):

```
C  D  E  G  A  C
```

---

### **Intervals**

**Distance between notes:**

- Semitone (half-step): C to C# (smallest interval)
- Tone (whole-step): C to D (two semitones)
- Octave: C to C (double frequency)

---

### **Tempo**

**Speed of music:**

- Largo: 40-60 BPM (beats per minute) - Very slow
- Andante: 76-108 BPM - Walking pace
- Allegro: 120-168 BPM - Fast
- Presto: 168-200 BPM - Very fast

**Calculate delay from BPM:**

```cpp
int BPM = 120;  // Beats per minute
int beatDuration = 60000 / BPM;  // milliseconds per beat
```

---

## **7.19 Creating Your Own Sound Library**

Organize your sound effects into reusable functions!

### **Sound Effects Library Template**

```cpp
// sound_effects.h (in your mind - or create a separate tab)

const int BUZZER_PIN = 12;

void beep() {
  tone(BUZZER_PIN, 1000, 100);
  delay(150);
}

void beepBeep() {
  tone(BUZZER_PIN, 1000, 100);
  delay(120);
  tone(BUZZER_PIN, 1000, 100);
  delay(150);
}

void success() {
  int notes[] = {262, 330, 392, 523};
  for (int i = 0; i < 4; i++) {
    tone(BUZZER_PIN, notes[i], 100);
    delay(120);
  }
}

void error() {
  tone(BUZZER_PIN, 200, 200);
  delay(250);
  tone(BUZZER_PIN, 150, 400);
  delay(450);
}

void alert() {
  for (int i = 0; i < 3; i++) {
    tone(BUZZER_PIN, 1500, 100);
    delay(120);
    tone(BUZZER_PIN, 1000, 100);
    delay(120);
  }
}

void startup() {
  int notes[] = {262, 294, 330, 349, 392};
  for (int i = 0; i < 5; i++) {
    tone(BUZZER_PIN, notes[i], 150);
    delay(180);
  }
}

void shutdown() {
  int notes[] = {392, 349, 330, 294, 262};
  for (int i = 0; i < 5; i++) {
    tone(BUZZER_PIN, notes[i], 150);
    delay(180);
  }
}
```

**Now you can just call `success()` or `error()` anywhere in your code!**

---

## **7.20 What You've Achieved**

Congratulations! You can now:

- ✅ Generate tones using `tone()` and `noTone()`
- ✅ Understand frequency and pitch relationship
- ✅ Play musical notes and scales
- ✅ Create melodies from arrays of notes
- ✅ Generate sound effects for games
- ✅ Build interactive musical instruments
- ✅ Combine audio with visual feedback
- ✅ Understand musical timing and tempo
- ✅ Create immersive multi-sensory projects

**Most importantly:** You've added another dimension to your projects - **SOUND!** Your creations can now see (LEDs), hear (buttons/sensors), and speak (buzzer)!

---

## **Looking Ahead to Chapter 8**

In the next chapter, we'll work with the **7-Segment Display**!

You'll learn:

- How 7-segment displays work
- Using the MAX7219 driver chip
- Displaying numbers 0-9
- Multi-digit displays
- Scrolling text
- Creating a digital clock
- Score displays for games
- Combining display with all previous concepts

**Before next class:**

- Look for 7-segment displays around you (microwaves, alarm clocks, calculators)
- Think about what you'd like to display
- Practice your melodies - maybe compose your own song!
- Consider: How would you show letters on a 7-segment display?

---

**Vocabulary Review:**

- **Frequency** - Number of vibrations per second (Hz)
- **Pitch** - How high or low a sound is perceived
- **Tone** - A sound at a specific frequency
- **Hertz (Hz)** - Unit of frequency (cycles per second)
- **Note** - A specific musical frequency (C, D, E, etc.)
- **Octave** - Doubling or halving of frequency
- **Melody** - Sequence of musical notes
- **Duration** - How long a sound plays
- **Tempo** - Speed of music (BPM)
- **Passive Buzzer** - Requires signal to generate sound

---

**In your notebook:**

- Draw a wave diagram showing high vs low frequency
- List your favorite sound effects and describe their frequency patterns
- Design a musical game concept
- Write down frequencies of your favorite melody

See you in Chapter 8 - where we make things display! 🔢✨

---
