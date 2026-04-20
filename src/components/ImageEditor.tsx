import { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Download, Sun, Contrast, Droplets, Palette, Sliders, Pen, Crop, Type, Layers, Move, Save } from 'lucide-react';

export default function ImageEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [invert, setInvert] = useState(0);
  const [activeTab, setActiveTab] = useState<'adjust' | 'filter' | 'transform' | 'tools'>('adjust');
  const [activeTool, setActiveTool] = useState<string>('move');
  const [drawingMode, setDrawingMode] = useState(false);
  const [drawColor, setDrawColor] = useState('#2563EB');
  const [brushSize, setBrushSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const [cropEnd, setCropEnd] = useState<{ x: number; y: number } | null>(null);
  const [textMode, setTextMode] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textPos, setTextPos] = useState<{ x: number; y: number } | null>(null);
  const [textSize, setTextSize] = useState(24);

  const loadImage = () => {
    const seeds = ['nature', 'city', 'portrait', 'abstract', 'tech', 'food', 'travel', 'design'];
    const seed = seeds[Math.floor(Math.random() * seeds.length)];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const maxW = 600;
      const maxH = 400;
      let w = img.width;
      let h = img.height;
      if (w > maxW) { h *= maxW / w; w = maxW; }
      if (h > maxH) { w *= maxH / h; h = maxH; }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
      }
      setImageLoaded(true);
    };
    img.src = `https://picsum.photos/seed/${seed}/800/600`;
  };

  const applyFilters = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    const seed = canvas.dataset.seed || 'nature';
    img.onload = () => {
      canvas.width = parseInt(canvas.dataset.ow || String(canvas.width));
      canvas.height = parseInt(canvas.dataset.oh || String(canvas.height));
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      ctx.restore();

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) blur(${blur}px) sepia(${sepia}%) grayscale(${grayscale}%) invert(${invert}%)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
    };
    img.src = `https://picsum.photos/seed/${seed}/800/600`;
  }, [brightness, contrast, saturation, hue, blur, sepia, grayscale, invert, rotation, flipH, flipV]);

  useEffect(() => {
    if (imageLoaded) {
      applyFilters();
    }
  }, [brightness, contrast, saturation, hue, blur, sepia, grayscale, invert, rotation, flipH, flipV, applyFilters, imageLoaded]);

  const handleLoadClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.dataset.seed = `editor${Date.now()}`;
    }
    loadImage();
    if (canvasRef.current) {
      canvasRef.current.dataset.seed = `editor${Date.now()}`;
    }
  };

  const resetAll = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setHue(0);
    setBlur(0);
    setSepia(0);
    setGrayscale(0);
    setInvert(0);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  const presets = [
    { name: 'Original', values: { brightness: 100, contrast: 100, saturation: 100, hue: 0, sepia: 0, grayscale: 0, invert: 0, blur: 0 } },
    { name: 'Vintage', values: { brightness: 110, contrast: 85, saturation: 70, hue: 10, sepia: 40, grayscale: 0, invert: 0, blur: 0 } },
    { name: 'Noir', values: { brightness: 100, contrast: 130, saturation: 0, hue: 0, sepia: 0, grayscale: 100, invert: 0, blur: 0 } },
    { name: 'Warm', values: { brightness: 105, contrast: 105, saturation: 120, hue: -10, sepia: 15, grayscale: 0, invert: 0, blur: 0 } },
    { name: 'Cool', values: { brightness: 100, contrast: 110, saturation: 90, hue: 190, sepia: 0, grayscale: 0, invert: 0, blur: 0 } },
    { name: 'Dramatic', values: { brightness: 90, contrast: 150, saturation: 130, hue: 0, sepia: 0, grayscale: 0, invert: 0, blur: 0 } },
    { name: 'Faded', values: { brightness: 115, contrast: 80, saturation: 60, hue: 0, sepia: 20, grayscale: 0, invert: 0, blur: 0 } },
    { name: 'Negative', values: { brightness: 100, contrast: 100, saturation: 100, hue: 0, sepia: 0, grayscale: 0, invert: 100, blur: 0 } },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setBrightness(preset.values.brightness);
    setContrast(preset.values.contrast);
    setSaturation(preset.values.saturation);
    setHue(preset.values.hue);
    setSepia(preset.values.sepia);
    setGrayscale(preset.values.grayscale);
    setInvert(preset.values.invert);
    setBlur(preset.values.blur);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (cropMode) {
      setCropStart({ x, y });
      setCropEnd(null);
    } else if (textMode) {
      setTextPos({ x, y });
    } else if (drawingMode) {
      setIsDrawing(true);
      setLastPos({ x, y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (cropMode && cropStart) {
      setCropEnd({ x, y });
    } else if (drawingMode && isDrawing && lastPos) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !canvas) return;
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.stroke();
      setLastPos({ x, y });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const handleAddText = () => {
    if (!textPos || !textInput) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    ctx.font = `${textSize}px Inter, sans-serif`;
    ctx.fillStyle = drawColor;
    ctx.fillText(textInput, textPos.x, textPos.y);
    setTextInput('');
    setTextPos(null);
  };

  const handleCropApply = () => {
    if (!cropStart || !cropEnd) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const x = Math.min(cropStart.x, cropEnd.x);
    const y = Math.min(cropStart.y, cropEnd.y);
    const w = Math.abs(cropEnd.x - cropStart.x);
    const h = Math.abs(cropEnd.y - cropStart.y);
    if (w < 10 || h < 10) return;

    const imageData = ctx.getImageData(x, y, w, h);
    canvas.width = w;
    canvas.height = h;
    ctx.putImageData(imageData, 0, 0);

    setCropMode(false);
    setCropStart(null);
    setCropEnd(null);
  };

  const tools = [
    { id: 'move', icon: <Move size={16} />, label: 'Move' },
    { id: 'pen', icon: <Pen size={16} />, label: 'Draw' },
    { id: 'crop', icon: <Crop size={16} />, label: 'Crop' },
    { id: 'text', icon: <Type size={16} />, label: 'Text' },
    { id: 'layers', icon: <Layers size={16} />, label: 'Layers' },
  ];

  const sliders = [
    { key: 'brightness', label: 'Brightness', value: brightness, set: setBrightness, min: 0, max: 200, icon: <Sun size={14} /> },
    { key: 'contrast', label: 'Contrast', value: contrast, set: setContrast, min: 0, max: 200, icon: <Contrast size={14} /> },
    { key: 'saturation', label: 'Saturation', value: saturation, set: setSaturation, min: 0, max: 200, icon: <Droplets size={14} /> },
    { key: 'hue', label: 'Hue Rotate', value: hue, set: setHue, min: -180, max: 180, icon: <Palette size={14} /> },
    { key: 'blur', label: 'Blur', value: blur, set: setBlur, min: 0, max: 10, icon: <Sliders size={14} /> },
    { key: 'sepia', label: 'Sepia', value: sepia, set: setSepia, min: 0, max: 100, icon: <Sliders size={14} /> },
    { key: 'grayscale', label: 'Grayscale', value: grayscale, set: setGrayscale, min: 0, max: 100, icon: <Sliders size={14} /> },
    { key: 'invert', label: 'Invert', value: invert, set: setInvert, min: 0, max: 100, icon: <Sliders size={14} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Pen className="text-rose-500" size={28} />
            Image Editor
          </h1>
          <p className="text-slate-500 mt-1">Retouch and modify images with advanced editing tools</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={resetAll} className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
            <RotateCcw size={16} /> Reset
          </button>
          <button onClick={handleDownload} disabled={!imageLoaded} className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* Left Toolbar */}
        <div className="lg:w-12 flex lg:flex-col items-center gap-1 bg-white rounded-xl border border-slate-200 p-1.5">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id);
                if (tool.id === 'pen') {
                  setDrawingMode(!drawingMode);
                  setCropMode(false);
                  setTextMode(false);
                } else if (tool.id === 'crop') {
                  setCropMode(!cropMode);
                  setDrawingMode(false);
                  setTextMode(false);
                } else if (tool.id === 'text') {
                  setTextMode(!textMode);
                  setDrawingMode(false);
                  setCropMode(false);
                } else {
                  setDrawingMode(false);
                  setCropMode(false);
                  setTextMode(false);
                }
              }}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                (tool.id === 'pen' && drawingMode) || (tool.id === 'crop' && cropMode) || (tool.id === 'text' && textMode) || (activeTool === tool.id && !drawingMode && !cropMode && !textMode)
                  ? 'bg-rose-100 text-rose-600'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title={tool.label}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><ZoomOut size={16} /></button>
              <span className="text-xs text-slate-500 w-12 text-center">{zoom}%</span>
              <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><ZoomIn size={16} /></button>
            </div>
            <div className="text-xs text-slate-400">
              {drawingMode && <span className="text-rose-600 font-medium">Draw Mode</span>}
              {cropMode && <span className="text-rose-600 font-medium">Crop Mode — Click and drag to select</span>}
              {textMode && <span className="text-rose-600 font-medium">Text Mode — Click to place text</span>}
              {!drawingMode && !cropMode && !textMode && 'Select a tool to begin'}
            </div>
          </div>
          <div className="flex items-center justify-center min-h-[300px] bg-[repeating-conic-gradient(#e2e8f0_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] rounded-lg overflow-auto">
            {!imageLoaded ? (
              <button
                onClick={handleLoadClick}
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium text-sm transition-colors shadow-md"
              >
                Load Sample Image
              </button>
            ) : (
              <canvas
                ref={canvasRef}
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
                className={`max-w-full border border-slate-200 rounded shadow-sm ${
                  drawingMode || cropMode || textMode ? 'cursor-crosshair' : 'cursor-default'
                }`}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
              />
            )}
          </div>
          {cropMode && cropStart && cropEnd && (
            <div className="mt-3 flex justify-center">
              <button onClick={handleCropApply} className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-medium">
                <Save size={14} className="inline mr-1" /> Apply Crop
              </button>
            </div>
          )}
          {textMode && textPos && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <input
                type="text"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                placeholder="Enter text..."
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm w-48"
                onKeyDown={e => e.key === 'Enter' && handleAddText()}
              />
              <input
                type="number"
                value={textSize}
                onChange={e => setTextSize(parseInt(e.target.value) || 16)}
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm w-16"
                min={8}
                max={120}
              />
              <button onClick={handleAddText} className="px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-medium">Add Text</button>
            </div>
          )}
          {(drawingMode) && (
            <div className="mt-3 flex items-center justify-center gap-4">
              <label className="text-xs text-slate-500">Color:</label>
              <input type="color" value={drawColor} onChange={e => setDrawColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
              <label className="text-xs text-slate-500">Size:</label>
              <input type="range" min={1} max={20} value={brushSize} onChange={e => setBrushSize(parseInt(e.target.value))} className="w-24" />
              <span className="text-xs text-slate-500">{brushSize}px</span>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="lg:w-72 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200">
            {(['adjust', 'filter'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === tab ? 'text-rose-600 border-b-2 border-rose-500 bg-rose-50/50' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'adjust' ? 'Adjust' : 'Filters'}
              </button>
            ))}
          </div>

          <div className="p-4 max-h-[500px] overflow-y-auto">
            {activeTab === 'adjust' && (
              <div className="space-y-4">
                {sliders.map(slider => (
                  <div key={slider.key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                        {slider.icon} {slider.label}
                      </label>
                      <span className="text-xs text-slate-400 tabular-nums">{slider.value}{slider.key === 'hue' ? '°' : slider.key === 'blur' ? 'px' : '%'}</span>
                    </div>
                    <input
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      value={slider.value}
                      onChange={e => slider.set(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>
                ))}

                <div className="pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-700 mb-3">Transform</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setRotation(r => r - 90)} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-700 transition-colors">↺ Rotate Left</button>
                    <button onClick={() => setRotation(r => r + 90)} className="px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-700 transition-colors">↻ Rotate Right</button>
                    <button onClick={() => setFlipH(f => !f)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${flipH ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'}`}>↔ Flip H</button>
                    <button onClick={() => setFlipV(f => !f)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${flipV ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'}`}>↕ Flip V</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'filter' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 mb-3">Quick presets for common photo retouching styles</p>
                {presets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="w-full px-4 py-3 text-left rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all text-sm font-medium text-slate-700"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
