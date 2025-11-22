import { RefreshCw, Copy, Lock, Unlock, Check } from 'lucide-react';
import { useState } from 'react';

export default function Day03ColorPalette() {
  // Generate random hex color
  const generateColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  // Initialize palette with 5 colors
  const [colors, setColors] = useState([
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false }
  ]);

  const [copiedIndex, setCopiedIndex] = useState(null);

  // Generate new palette (keep locked colors)
  const generatePalette = () => {
    setColors(colors.map(color => 
      color.locked ? color : { ...color, hex: generateColor() }
    ));
  };

  // Toggle lock on a color
  const toggleLock = (index) => {
    setColors(colors.map((color, i) => 
      i === index ? { ...color, locked: !color.locked } : color
    ));
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
              Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Space</kbd> to generate new colors
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
      <div className="flex-1 flex">
        {colors.map((color, index) => {
          const isLight = isLightColor(color.hex);
          const textColor = isLight ? 'text-gray-900' : 'text-white';
          
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
                    ? 'bg-gray-900/10 hover:bg-gray-900/20' 
                    : 'bg-white/10 hover:bg-white/20'
                } ${textColor}`}
              >
                {color.locked ? <Lock size={20} /> : <Unlock size={20} />}
              </button>

              {/* Hex Code */}
              <div className={`text-center ${textColor}`}>
                <div className="text-5xl font-bold mb-2 tracking-wide">
                  {color.hex.toUpperCase()}
                </div>
                
                {/* Copy Indicator */}
                <div className={`flex items-center justify-center gap-2 text-sm font-medium transition-opacity ${
                  copiedIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                }`}>
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
                RGB({parseInt(color.hex.slice(1, 3), 16)}, {parseInt(color.hex.slice(3, 5), 16)}, {parseInt(color.hex.slice(5, 7), 16)})
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Options */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2 font-medium">CSS Variables:</p>
            <code className="text-sm text-gray-300 font-mono">
              {colors.map((color, i) => `--color-${i + 1}: ${color.hex};`).join(' ')}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}