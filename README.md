
<div align="center">
  
# 🎨 Random Color Palette Generator

**A modern web application that generates beautiful color palettes using real-time data.**

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=ff00cc,333399,00c9ff,92fe9d&height=200&section=header&text=Explore%20Colors&fontSize=50&fontAlignY=35&desc=Built%20with%20JavaScript%20&%20The%20Color%20API&descAlignY=55&descAlign=50&fontColor=ffffff" alt="Color Palette Banner" width="100%" />

<br>

*Built to practice API integration, asynchronous JavaScript, color math algorithms, and modern UI design.*

</div>

---
## 🚀 Live Preview

### 🌐 [Click Here to View the Live Project on Netlify](https://ashish-hexcraft.netlify.app/)

## 📸 Preview

<div align="center"> <img src="./preview1.gif" alt="Color Palette Generator Preview" width="850" /> </div>

---

## 🚀 Features

* 🎲 **4 Generation Modes:** Create Random, Monochromatic, Complementary, or Analogous palettes using custom HSL math algorithms.
* 📊 **Deep API Data:** Fetches exact color names, RGB, and HSL values dynamically.
* 📋 **Click-to-Copy:** One-click copy functionality using the modern Clipboard API.
* ✨ **Modern UI/UX:** Features a glassmorphism aesthetic and interactive hover states.
* ⏳ **Asynchronous UI Feedback:** Includes loading spinners and sliding Toast notifications.
* ⚠️ **Error Handling:** Graceful fallbacks and UI alerts if the API request fails.
* 📱 **Fully Responsive:** Grid-based layout that automatically adjusts for mobile devices.

---

## 🛠️ Technologies Used

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/REST_API-02303A?style=for-the-badge&logo=json&logoColor=white" alt="REST API" />
  <img src="https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
</p>

* **External API:** [The Color API](https://www.thecolorapi.com)
* **Core JS Concepts:** `async/await`, Fetch API, Promises (`Promise.all`), DOM Manipulation, Math conversions (`hexToHsl`, `hslToHex`).

---

## ⚙️ How It Works (Behind the Code)

1. **Algorithm-Driven Colors:** The app generates a base hex color, converts it to HSL format, manipulates the Hue or Lightness values mathematically, and converts it back to Hex.
2. **Parallel Fetching:** Maps over the generated color array and uses `Promise.all()` to fetch data from The Color API for all 5 colors simultaneously, drastically reducing load times.
3. **Dynamic Rendering:** Displays placeholder "loading" cards while fetching. Once resolved, the DOM is injected with the official color names and values.

---

## 💻 How to Run Locally

1. Clone the repository to your local machine.
2. Ensure `index.html`, `style.css`, and `script.js` are in the same directory.
3. Open `index.html` directly in your web browser.

---

## 🔮 Future Improvements

- [ ] Add options to copy specific formats directly (RGB/HSL).
- [ ] Add a "Lock Color" feature to hold one specific color while randomizing the rest.
- [ ] Implement Local Storage to save favorite generated palettes.
- [ ] Add an export feature to download the palette as a PNG.

---

<div align="center">
  <b>Developed by Ashish Kushwaha</b>
</div>
