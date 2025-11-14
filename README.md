# 🎒 ToonKit

**A modern, beautiful JSON to TOON converter** - Transform your JSON data into Token-Oriented Object Notation for more efficient LLM communication.

[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff?style=flat&logo=vite)](https://vitejs.dev/)

## 🌟 What is TOON?

**TOON (Token-Oriented Object Notation)** is a compact, human-readable data format designed specifically for Large Language Models. It reduces token count by 30-60% compared to formatted JSON while maintaining accuracy and readability.

### Why TOON Matters

- **💰 Cost Efficient**: Fewer tokens = lower API costs for LLM interactions
- **⚡ Faster Processing**: Reduced token count means faster model responses
- **🎯 LLM-Friendly**: Explicit structure with built-in validation guardrails
- **📊 Perfect for Arrays**: Tabular format shines with uniform data structures

### Example Transformation

**JSON** (482 tokens):
```json
{
  "shopping_cart": [
    { "id": "GDKVEG984", "name": "iPhone 15 Pro Max", "quantity": 2, "price": 1499.99, "category": "Electronics" },
    { "id": "GDKVEG985", "name": "Samsung Galaxy S24 Ultra", "quantity": 1, "price": 1299.99, "category": "Electronics" },
    { "id": "GDKVEG986", "name": "Apple Watch Series 9", "quantity": 1, "price": 199.99, "category": "Electronics" },
    { "id": "GDKVEG987", "name": "MacBook Pro 16-inch", "quantity": 1, "price": 2499.99, "category": "Electronics" }
  ]
}
```

**TOON** (275 tokens - **43% savings!**):
```
shopping_cart: [4]{id,name,quantity,price,category}:
 GDKVEG984,iPhone 15 Pro Max,2,1499.99,Electronics
 GDKVEG985,Samsung Galaxy S24 Ultra,1,1299.99,Electronics
 GDKVEG986,Apple Watch Series 9,1,199.99,Electronics
 GDKVEG987,MacBook Pro 16-inch,1,2499.99,Electronics
```

## ✨ Features

### 🎨 Beautiful UI
- Modern glassmorphism design with gradient backgrounds
- Responsive layout that works on all devices
- Dark theme optimized for extended use

### ⚙️ Flexible Options
- **Custom Delimiter**: Choose your separator (comma, pipe, tab, etc.)
- **Indentation Control**: 1 space, 2 spaces, 4 spaces, or tabs
- **Length Markers**: Toggle array length indicators `[#]`

### 🛠️ Powerful Tools
- **Load Example**: Quickly test with pre-loaded sample data
- **Clear All**: Reset everything with one click
- **Copy Output**: One-click copy to clipboard
- **Download**: Export TOON files directly

### 📊 Real-Time Analytics
- Live token counting for both JSON and TOON
- Instant savings percentage calculation
- Visual comparison of efficiency gains

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hzeghari/toonkit.git
cd toonkit

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see ToonKit in action!

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📖 How to Use

1. **Paste Your JSON**: Enter or paste your JSON data in the left panel
2. **Configure Options**: Adjust delimiter, indentation, and length markers
3. **Convert**: Click the "🚀 Convert to TOON" button
4. **Review Results**: See your TOON output and token savings
5. **Export**: Copy or download your converted data

### Tips for Best Results

✅ **TOON works best with:**
- Uniform arrays (objects with identical keys)
- Flat or moderately nested structures
- Tabular data like lists, products, or records

⚠️ **Use JSON for:**
- Deeply nested hierarchical data
- Highly variable object structures
- Mixed-type arrays

## 🏗️ Tech Stack

- **Frontend Framework**: React 19.2 with TypeScript
- **Styling**: Tailwind CSS 4.0 (with new `@import` syntax)
- **Build Tool**: Vite 7.2
- **Code Quality**: ESLint with TypeScript support

## 📁 Project Structure

```
ToonKit/
├── src/
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.tsx             # Application entry point
│   └── utils/
│       ├── toonConverter.ts # Core TOON conversion logic
│       └── tokenCounter.ts  # Token counting utilities
├── public/                  # Static assets
├── index.html              # HTML entry point
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests
- 📖 Improve documentation

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- TOON specification and format design
- The React and Vite communities
- Tailwind CSS for the amazing styling framework

## 🔗 Links

- [TOON Specification](https://github.com/cognitivecomputations/toon)
- [Live Demo](https://toonkit.vercel.app)
- [Report Issues](https://github.com/hzeghari/toonkit/issues)

---

<div align="center">

**Made with ❤️ for the LLM community**

⭐ Star this repo if you find it useful!

</div>
