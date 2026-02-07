# **Chapter 1: Setting Up Your Workspace**

> ⚠️ **CRITICAL - Read This First:**
>
> All eBricks modules require **5V power connected with RED wire**.
>
> - 🔴 Red wire = 5V ONLY (never 3.3V)
> - ⬛ Black wire = Ground (GND)
> - 🟨 Yellow wire = Signal/Data
>
> See [GPIO Reference Guide](/gpio-reference) for complete pin information

## **1.1 What You'll Need**

Before we write our first line of code, let's make sure you have everything ready.

### **Hardware Checklist**

- [ ] eBricks-AI Arduino Starter Kit (all modules)
- [ ] Computer (Windows, Mac, or Linux)
- [ ] USB cable (usually USB-A to USB-Mini or USB-C)
- [ ] Good lighting
- [ ] Clear workspace (at least 60cm × 40cm)

### **Software Checklist**

- [ ] Arduino IDE (we'll install this together)
- [ ] USB drivers (usually automatic, but we'll check)
- [ ] Internet connection (for initial setup)

---

## **1.2 Installing the Arduino IDE**

The Arduino IDE (Integrated Development Environment) is where you'll write, check, and upload your code to the Arduino.

### **Step-by-Step Installation**

**For Windows:**

1. Open your web browser and go to: `https://www.arduino.cc/en/software`

2. Click **"Windows Win 10 and newer"**

3. You'll see two options:
   - "Windows installer" (recommended) - Downloads an .exe file
   - "Windows ZIP file" - For advanced users

4. Click **"Just Download"** (or donate if you'd like to support Arduino!)

5. Once downloaded, run the installer:
   - Click "I Agree" to the license
   - Keep all default options selected
   - Click "Install"
   - If Windows asks "Do you want to install this device software?" → Click **"Install"**

6. When finished, click "Close"

7. You should now see an Arduino icon on your desktop

**For Mac:**

1. Go to: `https://www.arduino.cc/en/software`

2. Click **"macOS 10.14 or newer"**

3. Click **"Just Download"**

4. Once downloaded, open the .dmg file

5. Drag the Arduino icon into your Applications folder

6. Open Arduino from Applications

7. If Mac says "Arduino cannot be opened because it's from an unidentified developer":
   - Go to System Preferences → Security & Privacy
   - Click "Open Anyway"

**For Linux:**

1. Go to: `https://www.arduino.cc/en/software`

2. Download the appropriate version (32-bit, 64-bit, or ARM)

3. Extract the downloaded file

4. Open terminal and navigate to the extracted folder

5. Run: `sudo ./install.sh`

---

## **1.3 First Look at Arduino IDE**

**Launch the Arduino IDE.** You should see a window that looks like this:

```
┌─────────────────────────────────────────┐
│ File  Edit  Sketch  Tools  Help         │
├─────────────────────────────────────────┤
│  ▶ ✓  🔍  Serial Monitor               │  ← Toolbar
├─────────────────────────────────────────┤
│                                         │
│  void setup() {                         │
│    // put your setup code here,        │  ← Code Editor
│    // to run once:                     │
│                                         │
│  }                                      │
│                                         │
│  void loop() {                          │
│    // put your main code here,         │
│    // to run repeatedly:               │
│                                         │
│  }                                      │
│                                         │
├─────────────────────────────────────────┤
│  Done compiling.                        │  ← Status Bar
└─────────────────────────────────────────┘
```

### **Understanding the Interface**

**Top Toolbar Buttons:**

- **✓ (Verify)** - Checks your code for errors
- **▶ (Upload)** - Sends your code to Arduino
- **📄 (New)** - Creates a new program
- **📂 (Open)** - Opens an existing program
- **💾 (Save)** - Saves your program

**Code Editor:**
This is where you'll type your programs. Notice it already has some code - we'll explain what this means soon.

**Status Bar:**
Shows messages like "Compiling..." or "Done uploading." Pay attention to this area!

---

## **1.4 Connecting Your eBricks-AI Arduino**

Now let's connect your Arduino to the computer.

### **Physical Connection**

**1. Locate your eBricks-AI controller module** (Arduino Pro Mini or ESP32)

**2. Find the USB port** on the module - it's usually labeled "USB" or has a distinctive connector

**3. Connect the USB cable:**

- One end to the eBricks-AI controller
- Other end to your computer's USB port

**4. Look for the power LED** on your module - it should light up (usually green or blue)

✅ **Success indicator:** LED lights up immediately when connected

❌ **Problem:** No LED? See Section 1.7 Troubleshooting

### **Software Configuration**

Now we need to tell the Arduino IDE which type of Arduino you have and which port it's connected to.

**Step 1: Select Your Board**

1. In Arduino IDE, click **Tools** → **Board** → **Arduino AVR Boards**

2. Find and click **"Arduino Pro or Pro Mini"**
   (If using ESP32 module, you'll select ESP32 boards - see Appendix C)

3. Then click **Tools** → **Processor** → **"ATmega328P (3.3V, 8MHz)"**
   (The exact version depends on your module - check the label)

**Step 2: Select Your Port**

1. Click **Tools** → **Port**

2. You should see something like:
   - **Windows:** `COM3` or `COM4` (the number might be different)
   - **Mac:** `/dev/cu.usbserial-XXXXXXXX`
   - **Linux:** `/dev/ttyUSB0` or `/dev/ttyACM0`

3. Select the port that appeared AFTER you plugged in your Arduino

**💡 Pro Tip:** If you see multiple ports and don't know which is correct:

- Unplug your Arduino
- Check what ports are listed
- Plug Arduino back in
- The NEW port that appears is your Arduino!

---

## **1.5 Testing the Connection**

Let's make sure everything is working correctly.

### **The Built-in LED Test**

Most Arduino boards have a built-in LED connected to pin 13. Let's use this to test our setup.

**1. In the Arduino IDE, click:** File → Examples → 01.Basics → Blink

A new window opens with code already written. Don't worry about understanding it yet - we'll explain everything soon.

**2. Click the ✓ (Verify) button**

You should see:

- Orange text scrolling in the bottom black area
- After a few seconds: "Done compiling."
- At the bottom: "Sketch uses XXXX bytes..."

✅ **This means your code is valid!**

**3. Click the ▶ (Upload) button**

You should see:

- Orange/red text scrolling
- "Uploading..."
- LEDs on Arduino flickering rapidly
- "Done uploading."

✅ **If a small LED on your Arduino board is now blinking on and off every second - SUCCESS!** Your setup is complete!

---

## **1.6 Understanding What Just Happened**

Let's break down what you just did:

**1. You wrote code** (well, Arduino provided it)
**2. Arduino IDE "compiled" it** (translated human-readable code into machine language)
**3. Arduino IDE "uploaded" it** (sent the machine code to your Arduino)
**4. Arduino ran the code** (and will keep running it forever, or until you upload new code)

Think of it like this:

```
Your Code (English)
    ↓
Compiler (Translator)
    ↓
Machine Code (Arduino's Language)
    ↓
Upload (Delivery)
    ↓
Arduino Executes (Follows Instructions)
```

---

## **1.7 Troubleshooting Common Setup Issues**

### **Problem 1: "Port is not available" or "Port is grayed out"**

**Possible causes:**

- Arduino isn't plugged in
- USB cable is power-only (no data)
- Driver not installed
- Wrong board selected

**Solutions:**

**Solution A: Check the cable**

- Try a different USB cable
- Some cheap cables are "charge-only" and can't transfer data
- Look for a cable that says "data" or that you've successfully used for file transfers

**Solution B: Install drivers**

_For Windows:_

1. Right-click the Windows Start button
2. Click "Device Manager"
3. Look for "Ports (COM & LPT)"
4. If you see a yellow warning triangle:
   - Right-click it → "Update Driver"
   - Choose "Search automatically"

_For Mac:_

- Usually automatic, but if issues persist, download FTDI or CH340 drivers from manufacturer website

**Solution C: Try a different USB port**

- Some USB hubs don't provide enough power
- Try plugging directly into computer

---

### **Problem 2: Error during upload - "avrdude: stk500_recv(): programmer is not responding"**

**This means:** Arduino IDE can't communicate with your Arduino

**Solutions:**

1. **Check the correct board is selected:**
   - Tools → Board → Arduino Pro or Pro Mini
   - Tools → Processor → ATmega328P (3.3V, 8MHz)

2. **Check the correct port is selected:**
   - Tools → Port → (Select the one that appeared when you plugged in Arduino)

3. **Reset the Arduino:**
   - Unplug it
   - Wait 5 seconds
   - Plug it back in
   - Try uploading again

4. **Try pressing the reset button** (small button on Arduino) RIGHT as you see "Uploading..." appear

---

### **Problem 3: Code compiles but LED doesn't blink**

**Check:**

1. **Is the built-in LED working?**
   - Some Arduino clones don't have a built-in LED on pin 13
   - Solution: Connect an eBricks-AI LED module to pin 13 (we'll learn this in Chapter 2)

2. **Is the correct program uploaded?**
   - Click Upload again to make sure

3. **Is Arduino getting power?**
   - Check if the power LED (usually green) is on

---

### **Problem 4: "Error compiling for board Arduino Pro or Pro Mini"**

**Check:**

1. **Did you modify the code accidentally?**
   - Click File → Examples → 01.Basics → Blink to get a fresh copy

2. **Is the correct processor selected?**
   - Tools → Processor → make sure it matches your Arduino
   - Check the label on your eBricks module

---

### **Problem 5: Arduino IDE won't open or crashes**

**Solutions:**

1. **Make sure you have the latest version:**
   - Download again from arduino.cc

2. **For Mac: Security settings**
   - System Preferences → Security & Privacy → Allow Arduino

3. **For Windows: Antivirus interference**
   - Temporarily disable antivirus during installation
   - Add Arduino to antivirus exceptions

---

## **1.8 Organizing Your Workspace**

Before we dive into programming, let's set up a good workspace.

### **Physical Organization**

**Your eBricks-AI Modules:**

- Keep modules in their container when not in use
- Sort by type: inputs, outputs, power
- Check connections are clean (no bent pins)

**Your Workspace:**

- Clear, flat surface
- Good lighting (important for seeing small labels!)
- Anti-static mat (optional but recommended)
- Notebook for notes and sketches

### **Digital Organization**

**Create a project folder:**

```
Documents/
  └── Arduino Projects/
      ├── Week1_Blink/
      ├── Week2_Patterns/
      ├── Week3_Buttons/
      └── ... (we'll add more as we go)
```

**Naming convention:**

- Use descriptive names: `LED_Pattern_Wave.ino` not `sketch1.ino`
- No spaces in filenames: use underscores `_` or hyphens `-`
- Include date for experiments: `2024_11_15_Button_Test.ino`

**Backup strategy:**

- Save your work regularly
- Keep multiple versions of working code
- Comment your code (we'll learn this in Chapter 2)

---

## **1.9 Quick Reference**

**Arduino IDE Shortcuts:**

- `Ctrl + R` (or `Cmd + R` on Mac) - Verify code
- `Ctrl + U` (or `Cmd + U` on Mac) - Upload code
- `Ctrl + Shift + M` (or `Cmd + Shift + M` on Mac) - Open Serial Monitor
- `Ctrl + /` (or `Cmd + /` on Mac) - Comment/uncomment lines

**eBricks-AI Connection Tips - Standard Servo Layout:**

- 🟨 Yellow = Signal/Data (connects to Arduino GPIO pins 0-13 or A0-A5)
- 🔴 Red = 5V Power ONLY (never 3.3V - will damage modules!)
- ⬛ Black = Ground/GND (completes the circuit)
- Always check module pin labels before connecting
- Power LEDs should light up when connected with RED to 5V
- Use jumper wires to connect labeled pins
- Keep wires organized and trace them if troubleshooting
- Every module MUST have all three connections (Yellow, Red, Black)

---

## **1.10 Pre-Flight Checklist**

Before moving to Chapter 2, make sure you can answer "YES" to all these:

- [ ] Arduino IDE is installed and opens without errors
- [ ] I can select my board type in Tools → Board
- [ ] I can select a port in Tools → Port
- [ ] I successfully uploaded the Blink example
- [ ] An LED on my Arduino is blinking
- [ ] I understand where to type code (code editor area)
- [ ] I know what Verify and Upload buttons do
- [ ] I have a organized folder for my projects

**If you answered NO to any of these**, review the relevant section or ask for help!

---

## **Congratulations!**

You've completed the setup. Your computer and Arduino are now talking to each other.

In Chapter 2, we'll dive into your first real program and start using your eBricks-AI LED modules.

**Take a 5-minute break** - stretch, grab water, and when you're ready, let's make some lights blink!

---

**[← Back to Chapter 0](/chapter0) | [Continue to Chapter 2 →](/chapter2)**
