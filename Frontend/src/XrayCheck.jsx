import React, { useState, useEffect, useCallback, useRef } from 'react';
import unfrac from './x-ray/unfractured.jpg';
import frac1 from './x-ray/bones.jpeg';
import frac2 from './x-ray/bones2.jpeg';
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Collapse,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';

const BoneXPreviewer = () => {
  // State for managing images and UI
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // State for drawing on canvas
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [loadedImage, setLoadedImage] = useState(null);

  // Refs for DOM elements
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Authentication token from session storage
  const token = JSON.parse(sessionStorage.getItem('userInfo'))?.token;

  // Constants for file validation
  const VALID_TYPES = ['image/jpeg', 'image/png'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  // Declare selectedImage early so it can be used in useEffect hooks
  const selectedImage =
    selectedIndex !== null && images[selectedIndex] ? images[selectedIndex] : null;

  // **Canvas Setup Effect**
  // Loads the selected image onto the canvas when it changes
  useEffect(() => {
    if (selectedImage && containerRef.current && canvasRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      canvasRef.current.width = clientWidth;
      canvasRef.current.height = clientHeight;

      const img = new Image();
      img.src = selectedImage.previewUrl;
      img.onload = () => {
        setLoadedImage(img);
        const ctx = canvasRef.current.getContext('2d');
        const canvasRatio = clientWidth / clientHeight;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight;
        if (imgRatio > canvasRatio) {
          drawWidth = clientWidth;
          drawHeight = clientWidth / imgRatio;
        } else {
          drawHeight = clientHeight;
          drawWidth = clientHeight * imgRatio;
        }
        const offsetX = (clientWidth - drawWidth) / 2;
        const offsetY = (clientHeight - drawHeight) / 2;
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };
    }
  }, [selectedImage]);

  // **Resize Effect**
  // Adjusts canvas size and redraws the image on window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current && loadedImage) {
        const { clientWidth, clientHeight } = containerRef.current;
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
        const ctx = canvasRef.current.getContext('2d');
        const canvasRatio = clientWidth / clientHeight;
        const imgRatio = loadedImage.width / loadedImage.height;
        let drawWidth, drawHeight;
        if (imgRatio > canvasRatio) {
          drawWidth = clientWidth;
          drawHeight = clientWidth / imgRatio;
        } else {
          drawHeight = clientHeight;
          drawWidth = clientHeight * imgRatio;
        }
        const offsetX = (clientWidth - drawWidth) / 2;
        const offsetY = (clientHeight - drawHeight) / 2;
        ctx.drawImage(loadedImage, offsetX, offsetY, drawWidth, drawHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loadedImage]);

  // **File Validation**
  const validateFile = useCallback((file) => {
    if (!VALID_TYPES.includes(file.type)) {
      setSnackbar({
        open: true,
        message: 'Only JPEG and PNG images are allowed.',
        severity: 'error',
      });
      return false;
    }
    if (file.size > MAX_SIZE) {
      setSnackbar({
        open: true,
        message: 'File size exceeds 5MB limit.',
        severity: 'error',
      });
      return false;
    }
    return true;
  }, []);

  // **Handle File Upload**
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (validateFile(file)) {
        const newImage = {
          file,
          previewUrl: URL.createObjectURL(file),
          result: null,
          id: Date.now() + Math.random(),
        };
        setImages((prev) => {
          const updated = [...prev, newImage];
          setSelectedIndex(updated.length - 1);
          return updated;
        });
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [validateFile]
  );

  // **Display Message for Analysis Result**
  const getDisplayMessage = (prediction) => {
    if (!prediction) return { message: 'No analysis available.', severity: 'info' };
    const lowerPred = prediction.toLowerCase();
    if (lowerPred.includes('no fracture')) {
      return { message: 'Good news, there is no fracture.', severity: 'success' };
    } else if (lowerPred.includes('fracture')) {
      return { message: 'Warning: A fracture has been detected.', severity: 'error' };
    } else {
      return { message: 'Analysis result: ' + prediction, severity: 'info' };
    }
  };

  // **Analyze Image**
  const handleAnalyze = useCallback(async () => {
    if (selectedIndex === null || !images[selectedIndex]) {
      setSnackbar({
        open: true,
        message: 'No image selected for analysis.',
        severity: 'warning',
      });
      return;
    }

    if (!token) {
      setSnackbar({
        open: true,
        message: 'Authentication required. Please log in.',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('XrayImage', images[selectedIndex].file);

    try {
      const response = await fetch('http://bonex.runasp.net/Xray/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        const aiResult =
          data.aiAnalysisResult || '{"prediction":"Analysis completed - no specific findings"}';
        const result = JSON.parse(aiResult);

        setImages((prev) => {
          const updated = [...prev];
          updated[selectedIndex] = { ...updated[selectedIndex], result };
          return updated;
        });

        const { message, severity } = getDisplayMessage(result.prediction);
        setSnackbar({ open: true, message, severity });
      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [selectedIndex, images, token]);

  // **Delete Image**
  const handleDelete = useCallback(
    (index) => {
      setImages((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        URL.revokeObjectURL(prev[index].previewUrl);

        if (selectedIndex === index) setSelectedIndex(null);
        else if (selectedIndex > index) setSelectedIndex(selectedIndex - 1);
        return updated;
      });
    },
    [selectedIndex]
  );

  // **Drag and Drop Handlers**
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    const newImages = Array.from(files)
      .filter(validateFile)
      .map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        result: null,
        id: Date.now() + Math.random(),
      }));

    if (newImages.length > 0) {
      const newLength = images.length + newImages.length;
      setImages((prev) => [...prev, ...newImages]);
      setSelectedIndex(newLength - 1);
    }
  };

  // **Handle Example Image Click**
  const handleExampleClick = useCallback(
    async (localImagePath) => {
      try {
        const response = await fetch(localImagePath);
        const blob = await response.blob();
        const file = new File([blob], 'example.jpg', { type: blob.type });

        if (validateFile(file)) {
          const newImage = {
            file,
            previewUrl: URL.createObjectURL(file),
            result: null,
            id: Date.now() + Math.random(),
          };
          setImages((prev) => {
            const updated = [...prev, newImage];
            setSelectedIndex(updated.length - 1);
            return updated;
          });
        }
      } catch (error) {
        console.error('Error fetching example image:', error);
      }
    },
    [validateFile]
  );

  // **Drawing Handlers**
  const handleMouseDown = (e) => {
    if (
      !canvasRef.current ||
      !selectedImage?.result ||
      getDisplayMessage(selectedImage.result.prediction).severity !== 'error'
    )
      return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !canvasRef.current || !loadedImage) return;
    const ctx = canvasRef.current.getContext('2d');
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Clear canvas and redraw image
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const { clientWidth, clientHeight } = containerRef.current;
    const canvasRatio = clientWidth / clientHeight;
    const imgRatio = loadedImage.width / loadedImage.height;
    let drawWidth, drawHeight;
    if (imgRatio > canvasRatio) {
      drawWidth = clientWidth;
      drawHeight = clientWidth / imgRatio;
    } else {
      drawHeight = clientHeight;
      drawWidth = clientHeight * imgRatio;
    }
    const offsetX = (clientWidth - drawWidth) / 2;
    const offsetY = (clientHeight - drawHeight) / 2;
    ctx.drawImage(loadedImage, offsetX, offsetY, drawWidth, drawHeight);

    // Draw circle
    const dx = x - startPos.x;
    const dy = y - startPos.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    ctx.beginPath();
    ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // **Send Annotated Image**
  const handleSendReview = async () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/jpeg');
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], 'annotated.jpg', { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('annotatedImage', file);

    try {
      const response = await fetch('http://bonex.runasp.net/Xray/review', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (response.ok) {
        setSnackbar({ open: true, message: 'Review sent successfully.', severity: 'success' });
      } else {
        throw new Error('Failed to send review');
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Error: ${error.message}`, severity: 'error' });
    }
  };

  // **Render Component**
  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Box
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          border: isDragging ? '2px dashed #1976d2' : '2px dashed transparent',
        }}
      >
        {images.length === 0 ? (
          // Welcome Screen
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              px: 2,
              boxSizing: 'border-box',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              Upload an image to detect fracture
            </Typography>
            <Button
              variant="contained"
              sx={{
                fontSize: '1.125rem',
                px: 4,
                py: 1.75,
                borderRadius: '9999px',
                transition: 'transform 0.3s ease',
                mb: 2,
                '&:hover': { transform: 'scale(1.05)' },
              }}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              Upload Image
            </Button>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
              or drop a file
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
              No image? Try one of these:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Box
                component="img"
                src={unfrac}
                alt="Unfractured example"
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.08)' },
                }}
                onClick={() => handleExampleClick(unfrac)}
              />
              <Box
                component="img"
                src={frac1}
                alt="Fractured example 1"
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.08)' },
                }}
                onClick={() => handleExampleClick(frac1)}
              />
              <Box
                component="img"
                src={frac2}
                alt="Fractured example 2"
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.08)' },
                }}
                onClick={() => handleExampleClick(frac2)}
              />
            </Box>
          </Box>
        ) : (
          <>
            {selectedImage && (
              // Canvas for Image Display and Drawing
              <div ref={containerRef} style={{ width: '90vw', height: '80vh', position: 'relative' }}>
                <canvas
                  ref={canvasRef}
                  style={{ width: '100%', height: '100%' }}
                  onMouseDown={
                    selectedImage?.result &&
                    getDisplayMessage(selectedImage.result.prediction).severity === 'error'
                      ? handleMouseDown
                      : undefined
                  }
                  onMouseMove={
                    selectedImage?.result &&
                    getDisplayMessage(selectedImage.result.prediction).severity === 'error'
                      ? handleMouseMove
                      : undefined
                  }
                  onMouseUp={
                    selectedImage?.result &&
                    getDisplayMessage(selectedImage.result.prediction).severity === 'error'
                      ? handleMouseUp
                      : undefined
                  }
                />
                {loading && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <CircularProgress size={60} />
                    <Typography variant="h6" style={{ marginTop: '16px' }}>
                      Processing image...
                    </Typography>
                  </div>
                )}
              </div>
            )}
            <Collapse in={!!selectedImage?.result}>
              {(() => {
                const { message, severity } = getDisplayMessage(selectedImage?.result?.prediction);
                return (
                  <Box
                    sx={{
                      mt: 2,
                      p: 3,
                      borderRadius: 2,
                      boxShadow: 2,
                      width: '50vw',
                      maxWidth: '600px',
                      textAlign: 'center',
                      bgcolor: {
                        success: 'success.light',
                        error: 'error.light',
                        info: 'info.light',
                      }[severity],
                      border: '1px solid',
                      borderColor: {
                        success: 'success.main',
                        error: 'error.main',
                        info: 'info.main',
                      }[severity],
                    }}
                  >
                    <Typography variant="h6">{message}</Typography>
                  </Box>
                );
              })()}
            </Collapse>
          </>
        )}
      </Box>

      {/* Controls */}
      {selectedImage && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 150,
            right: 20,
            display: 'flex',
            gap: 2,
            bgcolor: 'white',
            p: 2,
            borderRadius: 2,
            boxShadow: 1,
            zIndex: 1,
          }}
        >
          {/* Placeholder for zoom controls (not implemented in this version) */}
          <Button
            variant="contained"
            sx={{
              borderRadius: '9999px',
              px: 3,
              py: 1.25,
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' },
            }}
            onClick={handleAnalyze}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Analyze
          </Button>
          {selectedImage?.result &&
            getDisplayMessage(selectedImage.result.prediction).severity === 'error' && (
              <Button
                variant="contained"
                sx={{
                  borderRadius: '9999px',
                  px: 3,
                  py: 1.25,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
                onClick={handleSendReview}
              >
                Send Review
              </Button>
            )}
        </Box>
      )}

      {/* Thumbnail Strip */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          display: 'flex',
          gap: 1,
          p: 1,
          bgcolor: '#f5f5f5',
          borderRadius: 2,
          overflowX: 'auto',
        }}
      >
        <Box
          component="label"
          sx={{
            width: 100,
            height: 100,
            bgcolor: '#e0e7ff',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#c7d2fe' },
            flexShrink: 0,
          }}
        >
          <AddIcon color="primary" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            hidden
            onChange={handleFileChange}
          />
        </Box>
        {images.map((img, i) => (
          <Box key={img.id} sx={{ position: 'relative', flexShrink: 0 }}>
            <Box
              onClick={() => setSelectedIndex(i)}
              sx={{
                width: 100,
                height: 100,
                border: i === selectedIndex ? '2px solid #1976d2' : '2px solid transparent',
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover': { borderColor: '#1976d2' },
              }}
            >
              <img
                src={img.previewUrl}
                alt={`Thumbnail ${i}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {img.result && (
                <CheckIcon
                  sx={{
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    color: 'green',
                  }}
                />
              )}
            </Box>
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'white' }}
              onClick={() => handleDelete(i)}
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BoneXPreviewer;
