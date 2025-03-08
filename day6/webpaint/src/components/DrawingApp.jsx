import { useState, useRef, useEffect } from 'react';
import './DrawingApp.css';

function DrawingApp() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [context, setContext] = useState(null);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 3;
    
    setContext(ctx);
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    setInitialSize({ width: rect.width, height: rect.height });
    
    const handleResize = () => {
      const imageData = canvas.toDataURL('image/png');
      
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width;
      canvas.height = newRect.height;
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 3;
      
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = imageData;
    };
    
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = currentColor;
    }
  }, [currentColor, context]);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const imageData = canvas.toDataURL('image/png');
    
    const newHistory = canvasHistory.slice(0, currentStep + 1);
    newHistory.push(imageData);
    
    if (newHistory.length > 10) {
      newHistory.shift();
    }
    
    setCanvasHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const startDrawing = (e) => {
    if (!context) return;
    
    const { x, y } = getCoordinates(e);
    
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    
    const { x, y } = getCoordinates(e);
    
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
      saveCanvasState();
    }
    setIsDrawing(false);
  };

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleColorSelect = (color) => {
    setCurrentColor(color);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      saveCanvasState();
    }
  };

  const undoLastAction = () => {
    if (currentStep > 0) {
      const canvas = canvasRef.current;
      if (!canvas || !context) return;
      
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      
      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = canvasHistory[newStep];
    }
  };

  return (
    <div className="drawing-app">
      <div className="desktop-frame">
        <div className="background-image"></div>
        
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        ></canvas>
        
        <div className="color-palette">
          <div 
            className={`color-circle ${currentColor === '#ffffff' ? 'active' : ''}`}
            style={{ backgroundColor: '#ffffff' }}
            onClick={() => handleColorSelect('#ffffff')}
          ></div>
          
          <div 
            className={`color-circle ${currentColor === '#000000' ? 'active' : ''}`}
            style={{ backgroundColor: '#000000' }}
            onClick={() => handleColorSelect('#000000')}
          ></div>
          
          <div 
            className={`color-circle ${currentColor === '#ff0000' ? 'active' : ''}`}
            style={{ backgroundColor: '#ff0000' }}
            onClick={() => handleColorSelect('#ff0000')}
          ></div>
          
          <div 
            className={`color-circle ${currentColor === '#ff9000' ? 'active' : ''}`}
            style={{ backgroundColor: '#ff9000' }}
            onClick={() => handleColorSelect('#ff9000')}
          ></div>
          
          <div 
            className={`color-circle ${currentColor === '#ffff00' ? 'active' : ''}`}
            style={{ backgroundColor: '#ffff00' }}
            onClick={() => handleColorSelect('#ffff00')}
          ></div>
          
          <div 
            className={`color-circle ${currentColor === '#00ff00' ? 'active' : ''}`}
            style={{ backgroundColor: '#00ff00' }}
            onClick={() => handleColorSelect('#00ff00')}
          ></div>
          
          <div 
            className={`color-circle ${currentColor === '#0000ff' ? 'active' : ''}`}
            style={{ backgroundColor: '#0000ff' }}
            onClick={() => handleColorSelect('#0000ff')}
          ></div>
          
          <div 
            className={`color-circle ${currentColor === '#800080' ? 'active' : ''}`}
            style={{ backgroundColor: '#800080' }}
            onClick={() => handleColorSelect('#800080')}
          ></div>
          
          <button 
            className="refresh-icon"
            onClick={clearCanvas}
            style={{ backgroundColor: '#32ba00', color: 'white' }}
          >
            ↻
          </button>
          
          <button 
            className="undo-icon"
            onClick={undoLastAction}
            style={{ backgroundColor: '#0078d7', color: 'white' }}
            disabled={currentStep <= 0}
          >
            ↩
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrawingApp;
