import React, { useRef, useState, useEffect } from 'react';
import '../styles/UploadPhoto.css';

const loadingMessages = [
  'Uploading image',
  'Coaxing pixels through tubes',
  'Negotiating with firewalls',
  'First-class ticket to servers',
  'Waking face recognition hamsters',
  'Face or potato? Calibrating...',
  "Convincing cats they're faces",
  'Almost there',
];

const UploadPhoto = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [messageInterval, setMessageInterval] = useState(null);
  const transitionDuration = 3000;

  useEffect(() => {
    return () => {
      if (messageInterval) clearInterval(messageInterval);
    };
  }, [messageInterval]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setFile(file);
      setIsError(false);
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = (ev) => setImgSrc(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setImgSrc('');
      setIsError(true);
      setErrorMessage('Only PNG and JPG files are allowed.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setFile(file);
      setIsError(false);
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = (ev) => setImgSrc(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setImgSrc('');
      setIsError(true);
      setErrorMessage('Only PNG and JPG files are allowed.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const clearImage = () => {
    setFile(null);
    setImgSrc('');
    setIsError(false);
    setErrorMessage('');
  };

  const updateMessage = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      setIsVisible(true);
    }, transitionDuration / 2);
  };

  const submitImage = async () => {
    if (!file) {
      setIsError(true);
      setErrorMessage('No image to submit');
      return;
    }
    document.getElementById('upload-image').scrollIntoView({ behavior: 'smooth' });
    setIsError(false);
    setIsUploading(true);
    setCurrentMessageIndex(0);
    const interval = setInterval(updateMessage, transitionDuration);
    setMessageInterval(interval);
    try {
      // Simulasi upload
      await new Promise((res) => setTimeout(res, 5000));
      // Simulasi sukses, bisa diganti dengan fetch ke backend
      setIsUploading(false);
      clearInterval(interval);
      setMessageInterval(null);
      // Simpan ke localStorage jika perlu
      // localStorage.setItem('croppedImage', imgSrc);
      // window.location.href = '/analysis';
    } catch {
      setIsError(true);
      setErrorMessage('Failed to process the image. Please try another photo or try again later.');
      setIsUploading(false);
      clearInterval(interval);
      setMessageInterval(null);
    }
  };

  return imgSrc ? (
    <div className="upload-preview-container" id="upload-image">
      <img
        src={imgSrc}
        alt="Preview"
        className={`upload-preview-img${isUploading ? ' opacity-50' : ''}`}
      />
      <div className="upload-preview-actions">
        <button className="upload-btn" onClick={submitImage} disabled={isUploading}>Submit</button>
        <button className="upload-btn outline" onClick={clearImage} disabled={isUploading}>Clear</button>
      </div>
      {(isError || isUploading) && (
        <div className={`upload-message${isError ? ' error' : ' uploading'}`}>
          {isError ? (
            errorMessage
          ) : (
            <div className="upload-message-loading">
              <span className="upload-dots">●●●</span>
              {isVisible && (
                <span className="upload-message-text">{loadingMessages[currentMessageIndex]}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div
      role="none"
      id="upload-image"
      className="upload-dropzone-react"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      tabIndex={0}
      aria-label="Upload photo"
    >
      <span className="upload-icon-svg" aria-hidden="true">📤</span>
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        className="upload-input"
        onChange={handleFileChange}
        style={{ zIndex: 2, position: 'absolute', inset: 0, cursor: 'pointer' }}
      />
      <div className="upload-dropzone-text">
        <div>Hey, you!. Drag and drop your beautiful selfie here.</div>
        <small>Only PNG and JPG Allowed</small>
      </div>
      {isError && <div className="upload-message error">{errorMessage}</div>}
    </div>
  );
};

export default UploadPhoto;