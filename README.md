# eBricks-AI

A comprehensive, discovery-based learning course for Arduino programming using the eBricks-AI modular system.

## 📚 About This Course

This course teaches Arduino programming through a revolutionary approach: **Concept Before Craftsmanship**. Instead of spending weeks learning to solder and debugging messy breadboard circuits, you'll start coding on Day 1 using eBricks-AI's modular, LEGO-like electronics system.

### What Makes This Different?

- **Day 1:** Writing code and seeing results
- **Week 1:** Building interactive projects
- **Month 1:** Creating IoT systems
- **No soldering required** - Click modules together and focus on learning
- **No messy breadboards** - Reliable connections every time
- **No hardware frustration** - Spend time learning, not debugging

## 🚀 Getting Started

### Prerequisites

- A computer (Windows, Mac, or Linux)
- eBricks-AI Arduino kit
- USB cable (usually included with kit)

### Installation

This documentation site is built with VitePress. To run it locally:

1. **Install dependencies:**

   ```bash
   npm install
   # or if using Bun
   bun install
   ```

2. **Start the development server:**

   ```bash
   npm run docs:dev
   # or
   bun run docs:dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run docs:build
# or
bun run docs:build
```

Preview the production build:

```bash
npm run docs:preview
# or
bun run docs:preview
```

## 📖 Course Structure

### Part I: Getting Started

- **Chapter 1:** Setting Up Your Workspace
- **Chapter 2:** Your First Program - The Blink

### Part II: Foundations

- **Chapter 3:** Digital Output - Making Things Light Up
- **Chapter 4:** Understanding Binary with LEDs
- **Chapter 5:** Digital Input - Buttons and Interaction
- **Chapter 6:** Analog Input - Reading the World

### Part III: Output Devices

- **Chapter 7:** Sound and Music with Buzzers
- **Chapter 8:** The 7-Segment Display

### Part IV: Integration

- **Chapter 9:** Combining Everything

## 🛠️ Development

### Project Structure

```
ebricksai/
├── docs/
│   ├── .vitepress/
│   │   └── config.mts      # VitePress configuration
│   ├── chapter1.md         # Course chapters
│   ├── chapter2.md
│   ├── ...
│   ├── chapter9.md
│   ├── index.md            # Homepage
│   └── about.md            # About eBricks-AI
├── package.json
└── README.md
```

### Adding New Content

1. Create a new `.md` file in the `docs/` folder
2. Add it to the sidebar in `docs/.vitepress/config.mts`
3. Link to it from relevant pages

### Customizing

- **Site config:** Edit `docs/.vitepress/config.mts`
- **Homepage:** Edit `docs/index.md`
- **Theme:** Customize in `docs/.vitepress/config.mts` under `themeConfig`

## 🎯 Learning Outcomes

By completing this course, you will:

- ✅ Understand Arduino programming fundamentals
- ✅ Master digital and analog I/O
- ✅ Work with sensors and actuators
- ✅ Create sound and visual displays
- ✅ Build complete interactive systems
- ✅ Troubleshoot common problems independently
- ✅ Design your own Arduino projects

## 🤝 Contributing

Contributions are welcome! If you find errors, have suggestions, or want to add content:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This course material is released under the MIT License.

## 🙏 Acknowledgments

Special thanks to the eBricks-AI team for creating a learning system that makes electronics accessible to everyone.

## 📞 Support

- **Issues:** Open an issue on GitHub
- **Questions:** Check the troubleshooting sections in each chapter
- **Community:** Join our learning community

---

**Ready to start?** Run `npm run docs:dev` and navigate to Chapter 1 to begin your Arduino journey!
