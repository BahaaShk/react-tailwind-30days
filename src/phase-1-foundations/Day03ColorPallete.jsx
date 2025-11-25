import { RefreshCw, Copy, Lock, Unlock, Check, Download, X } from 'lucide-react';
import { useState, useEffect } from 'react';

function Day03ColorPalette() {
  // Helper function to generate random hex color
  const generateColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  // State: array of 5 color objects
  const [colors, setColors] = useState([
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false },
    { hex: generateColor(), locked: false }
  ]);

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Load saved palettes from localStorage on mount
  const [savedPalettes, setSavedPalettes] = useState(() => {
    const saved = localStorage.getItem('colorPalettes');
    return saved ? JSON.parse(saved) : [];
  });

  // Generate new palette (but keep locked colors!)
  const generatePalette = () => {
    setColors(colors.map(color => 
      color.locked ? color : { ...color, hex: generateColor() }
    ));
  };

  // Toggle lock on a specific color
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

  // CHALLENGE 1: Get color name
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

  // CHALLENGE 2: Adjust brightness for shades
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

  // CHALLENGE 3: Save current palette
  const savePalette = () => {
    const newPalette = {
      id: Date.now(),
      colors: colors.map(c => c.hex),
      createdAt: new Date().toLocaleString()
    };
    
    const updated = [...savedPalettes, newPalette];
    setSavedPalettes(updated);
    localStorage.setItem('colorPalettes', JSON.stringify(updated));
    
    alert('Palette saved! 🎉');
  };

  // Load a saved palette
  const loadPalette = (paletteColors) => {
    setColors(paletteColors.map(hex => ({ hex, locked: false })));
    setSelectedColor(null);
  };

  // Delete a saved palette
  const deletePalette = (id) => {
    const updated = savedPalettes.filter(p => p.id !== id);
    setSavedPalettes(updated);
    localStorage.setItem('colorPalettes', JSON.stringify(updated));
  };

  // CHALLENGE 4: Export palette as image
  const exportAsImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    const colorWidth = canvas.width / colors.length;
    
    colors.forEach((color, index) => {
      // Fill rectangle with color
      ctx.fillStyle = color.hex;
      ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height);
      
      // Add hex text
      ctx.fillStyle = isLightColor(color.hex) ? '#000000' : '#FFFFFF';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        color.hex.toUpperCase(),
        index * colorWidth + colorWidth / 2,
        canvas.height / 2
      );
    });
    
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `palette-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  // Keyboard shortcut: Space to generate
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        generatePalette();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [colors]);

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
          <div className="flex items-center gap-3">
            <button
              onClick={savePalette}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Save Palette
            </button>
            <button
              onClick={exportAsImage}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Download size={18} />
              Export PNG
            </button>
            <button
              onClick={generatePalette}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={20} />
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Color Palette Display */}
      <div className="flex-1 flex flex-wrap">
        {colors.map((color, index) => {
          const isLight = isLightColor(color.hex);
          const textColor = isLight ? 'text-gray-900' : 'text-white';
          
          return (
            <div
              key={index}
              style={{ backgroundColor: color.hex }}
              className="flex-1 flex flex-col items-center justify-center gap-4 p-8 transition-all duration-300 hover:flex-[1.2] cursor-pointer group relative"
              onClick={() => setSelectedColor(selectedColor === index ? null : index)}
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
                
                {/* CHALLENGE 1: Color Name */}
                <div className="text-lg font-medium mb-3 opacity-80">
                  {getColorName(color.hex)}
                </div>
                
                {/* Copy Indicator */}
                <div 
                  className={`flex items-center justify-center gap-2 text-sm font-medium transition-opacity ${
                    copiedIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(color.hex, index);
                  }}
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
                RGB({parseInt(color.hex.slice(1, 3), 16)}, {parseInt(color.hex.slice(3, 5), 16)}, {parseInt(color.hex.slice(5, 7), 16)})
              </div>
              
              {/* Hint for shades */}
              {selectedColor !== index && (
                <div className={`text-xs ${textColor} opacity-50 mt-2`}>
                  Click to see shades
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CHALLENGE 2: Shade Variants Panel */}
      {selectedColor !== null && (
        <div className="bg-gray-900 border-t border-gray-800 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">
                Shades of {colors[selectedColor].hex.toUpperCase()} - {getColorName(colors[selectedColor].hex)}
              </h3>
              <button
                onClick={() => setSelectedColor(null)}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <X size={18} />
                Close
              </button>
            </div>
            
            <div className="flex gap-2">
              {generateShades(colors[selectedColor].hex).map((shade, i) => (
                <div
                  key={i}
                  onClick={() => copyToClipboard(shade, `shade-${i}`)}
                  style={{ backgroundColor: shade }}
                  className="flex-1 h-32 rounded-lg cursor-pointer flex items-center justify-center group hover:scale-105 transition-transform relative"
                >
                  <div className={`font-mono text-sm font-bold ${
                    isLightColor(shade) ? 'text-gray-900' : 'text-white'
                  } opacity-0 group-hover:opacity-100 transition-opacity text-center`}>
                    <div>{shade.toUpperCase()}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {i === 0 && 'Darkest'}
                      {i === 1 && 'Darker'}
                      {i === 2 && 'Original'}
                      {i === 3 && 'Lighter'}
                      {i === 4 && 'Lightest'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHALLENGE 3: Saved Palettes Section */}
      {savedPalettes.length > 0 && (
        <div className="p-6 bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-white font-bold text-xl mb-4">
              Saved Palettes ({savedPalettes.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 ring-purple-500 transition-all cursor-pointer"
                  onClick={() => loadPalette(palette.colors)}
                >
                  {/* Mini color preview */}
                  <div className="flex h-24">
                    {palette.colors.map((hex, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: hex }}
                        className="flex-1"
                      />
                    ))}
                  </div>
                  
                  {/* Palette info */}
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {palette.createdAt}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this palette?')) {
                          deletePalette(palette.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

export default Day03ColorPalette;