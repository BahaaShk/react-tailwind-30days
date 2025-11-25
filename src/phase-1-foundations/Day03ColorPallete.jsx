import { RefreshCw, Copy, Lock, Unlock, Check } from 'lucide-react';
import { useState } from 'react';

export default function Day03ColorPalette() {

  const [selectedColor, setSelectedColor] = useState(null);

  // Generate random hex color
  const generateColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

// Simple color name detector
const getColorName = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Find the dominant color
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Check if it's grayscale (all values close together)
  if (max - min < 30) {
    if (max < 50) return 'Black';
    if (max < 100) return 'Dark Gray';
    if (max < 180) return 'Gray';
    if (max < 230) return 'Light Gray';
    return 'White';
  }
  
  // Find dominant color
  let colorName = '';
  
  if (r > g && r > b) {
    colorName = 'Red';
  } else if (g > r && g > b) {
    colorName = 'Green';
  } else if (b > r && b > g) {
    colorName = 'Blue';
  } else if (r > 150 && g > 150 && b < 100) {
    colorName = 'Yellow';
  } else if (r > 150 && b > 150 && g < 100) {
    colorName = 'Magenta';
  } else if (g > 150 && b > 150 && r < 100) {
    colorName = 'Cyan';
  } else if (r > 150 && g > 100 && b < 100) {
    colorName = 'Orange';
  } else {
    colorName = 'Mixed';
  }
  
  // Add light/dark prefix
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const prefix = brightness > 200 ? 'Light ' : brightness < 100 ? 'Dark ' : '';
  
  return prefix + colorName;
};

// Add this function after getColorName:
const adjustBrightness = (hex, percent) => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  
  // Adjust each channel
  r = Math.min(255, Math.max(0, Math.round(r + (r * percent / 100))));
  g = Math.min(255, Math.max(0, Math.round(g + (g * percent / 100))));
  b = Math.min(255, Math.max(0, Math.round(b + (b * percent / 100))));
  
  // Convert back to hex
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return '#' + toHex(r) + toHex(g) + toHex(b);
};

// Function to generate 5 shades
const generateShades = (hex) => {
  return [
    adjustBrightness(hex, -40),  // Much darker
    adjustBrightness(hex, -20),  // Darker
    hex,                          // Original
    adjustBrightness(hex, 20),   // Lighter
    adjustBrightness(hex, 40)    // Much lighter
  ];
};

  // Initialize palette with 5 colors
  const [colors, setColors] = useState([
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
  ]);

  const [copiedIndex, setCopiedIndex] = useState(null);

  // Generate new palette (keep locked colors)
  const generatePalette = () => {
    setColors(
      colors.map((color) =>
        color.locked ? color : { ...color, hex: generateColor() }
      )
    );
  };

  // Toggle lock on a color
  const toggleLock = (index) => {
    setColors(
      colors.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    );
  };

  // Copy color to clipboard
  const copyToClipboard = (hex, index) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Check if color is light or dark (for text contrast)
  const isLightColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="p-6 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Color Palette Generator
            </h1>
            <p className="text-gray-400 text-sm">
              Press{" "}
              <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Space</kbd>{" "}
              to generate new colors
            </p>
          </div>
          <button
            onClick={generatePalette}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <RefreshCw size={20} />
            Generate
          </button>
        </div>
      </div>

      {/* Color Palette Display */}
      <div className="flex-1 flex flex-wrap">
        {colors.map((color, index) => {
          const isLight = isLightColor(color.hex);
          const textColor = isLight ? "text-gray-900" : "text-white";
          const colorName = getColorName(color.hex);

          return (
            <div
              key={index}
              style={{ backgroundColor: color.hex }}
              className="flex-1 flex flex-col items-center justify-center gap-4 p-8 transition-all duration-300 hover:flex-[1.2] cursor-pointer group relative"
              onClick={() => copyToClipboard(color.hex, index)}
            >
              {/* Lock Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLock(index);
                }}
                className={`absolute top-6 right-6 p-2 rounded-lg transition-all ${
                  isLight
                    ? "bg-gray-900/10 hover:bg-gray-900/20"
                    : "bg-white/10 hover:bg-white/20"
                } ${textColor}`}
              >
                {color.locked ? <Lock size={20} /> : <Unlock size={20} />}
              </button>

              {/* Hex Code */}
              <div className={`text-center ${textColor}`}>
                <div className="text-5xl font-bold mb-2 tracking-wide">
                  {color.hex.toUpperCase()}
                </div>

                {/* NEW — Color Name */}
                <div className="text-lg font-medium opacity-80 mb-1">
                  {colorName}
                </div>

                {/* Copy Indicator */}
                <div
                  className={`flex items-center justify-center gap-2 text-sm font-medium transition-opacity ${
                    copiedIndex === index
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-60"
                  }`}
                >
                  {copiedIndex === index ? (
                    <>
                      <Check size={16} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Click to copy</span>
                    </>
                  )}
                </div>
              </div>

              {/* RGB Values */}
              <div className={`text-sm font-mono ${textColor} opacity-70`}>
                RGB(
                {parseInt(color.hex.slice(1, 3), 16)},{" "}
                {parseInt(color.hex.slice(3, 5), 16)},{" "}
                {parseInt(color.hex.slice(5, 7), 16)})
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Options */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2 font-medium">
              CSS Variables:
            </p>
            <code className="text-sm text-gray-300 font-mono">
              {colors
                .map((color, i) => `--color-${i + 1}: ${color.hex};`)
                .join(" ")}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
