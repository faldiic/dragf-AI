import React, { useEffect, useRef, useState } from 'react';
import '../styles/Analysis.css';
import seasonData from '../data/season_mst_colors.json';

const loadingMessages = [
  'Generating color analysis',
  'Adjusting white balance for perfect neutrals',
  'Compensating for sneaky ambient lighting',
  ",Decoding your skin's secret hues",
  'Solving the RGB rubik\'s cube',
  'Debating warm vs. cool tones',
  'Painting your perfect palette',
  'Banishing unflattering shades',
  'Preparing the color forecast',
];

const navigationTip = {
  title: 'Tip',
  description: 'Click the tabs to see more information!',
};

const tip = {
  title: 'Tip',
  description: 'Click on a color swatch to see how it looks on you!',
};

function Analysis() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [croppedImage, setCroppedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [tab, setTab] = useState('analysis');
  const [disclaimer, setDisclaimer] = useState({ title: '', description: '' });
  const transitionDuration = 5000;
  const messageInterval = useRef(null);

  useEffect(() => {
    messageInterval.current = setInterval(updateMessage, transitionDuration);
    const localCroppedImage = localStorage.getItem('croppedImage');
    let localAnalysis = localStorage.getItem('analysis');
    if (localCroppedImage) {
      setCroppedImage('data:image/jpeg;base64,' + localCroppedImage);
      let analysisObj;
      if (localAnalysis) {
        analysisObj = JSON.parse(localAnalysis);
        setAnalysis(analysisObj);
      } else {
        analysisObj = {
          season: 'Spring',
          characteristics: 'Bright, warm, and clear',
          colorsToSuggest: [
            { name: 'Coral', hexCode: '#FF7F50' },
            { name: 'Peach', hexCode: '#FFDAB9' },
            { name: 'Aqua', hexCode: '#00FFFF' }
          ],
          reasonToSuggest: 'These colors enhance your natural glow.',
          colorsToAvoid: [
            { name: 'Black', hexCode: '#000000' },
            { name: 'Gray', hexCode: '#808080' }
          ],
          reasonToAvoid: 'These colors may dull your complexion.',
          content: 'You look best in warm, clear, and bright colors.',
          textColor: '#e0a96d',
        };
        setAnalysis(analysisObj);
      }
      // Set disclaimer sesuai season
      let seasonKey = analysisObj.season;
      if (seasonData[seasonKey] && seasonData[seasonKey].description) {
        setDisclaimer({ title: seasonKey, description: seasonData[seasonKey].description });
      } else {
        setDisclaimer({ title: seasonKey, description: 'No description available.' });
      }
      setIsLoading(false);
      clearInterval(messageInterval.current);
    } else {
      // Tidak ada gambar, redirect ke home setelah loading
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = '/';
      }, 2000);
    }
    return () => {
      if (messageInterval.current) clearInterval(messageInterval.current);
    };
  }, []);

  function updateMessage() {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      setIsVisible(true);
    }, transitionDuration / 2);
  }

  function handleColorSelected(color) {
    setSelectedColor(color);
  }

  function clearLocalStorage() {
    const theme = localStorage.getItem('theme');
    localStorage.clear();
    if (theme) localStorage.setItem('theme', theme);
    window.location.href = '/';
  }

  // SwatchSlide with popup preview
  function SwatchSlide({ colors, onColorSelected }) {
    return (
      <div className="swatch-slide">
        {colors && colors.map((c, idx) => (
          <button
            key={c.hex || c.name || idx}
            className="swatch-color"
            style={{ background: c.hex || c.hexCode, border: selectedColor === (c.hex || c.hexCode) ? '2px solid #333' : 'none' }}
            onClick={() => onColorSelected(c.hex || c.hexCode)}
            title={c.name || c.hex || c.hexCode}
          >
            &nbsp;
          </button>
        ))}
      </div>
    );
  }

  // Popup preview color overlay
  const showPopup = !!selectedColor;

  // Alert: judul = description, deskripsi = dynamic dari JSON
  function Alert({ title, description }) {
    return (
      <div className="alert-box">
        <p>{title}</p>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    );
  }

  return (
    <div className="analysis-container">
      {!isLoading && analysis ? (
        <>
          <h1 className="analysis-title">Your Personalized Color Profile</h1>
          <div className="analysis-main-grid">
            {/* Left: Image & Season */}
            <div className="analysis-image-panel">
              <img src={croppedImage} alt="Preview" className="analysis-img" />
              {/* Popup overlay color preview */}
              {showPopup && (
                <div className="color-popup-overlay" style={{ background: selectedColor }} />
              )}
              {/* <div style={{ marginTop: "1.2rem", width: "100%" }}>
                <div className="analysis-characteristics">{analysis.characteristics}</div>
              </div> */}
            </div>
            {/* Right: Tabs & Swatch */}
            <div className="analysis-info-panel">
              <div className="analysis-tabs">
                <div className="tab-list">
                  <button className={tab === 'analysis' ? 'active' : ''} onClick={() => setTab('analysis')}>Analysis</button>
                  <button className={tab === 'colorsToSuggest' ? 'active' : ''} onClick={() => setTab('colorsToSuggest')}>Recommended Colors</button>
                  <button className={tab === 'colorsToAvoid' ? 'active' : ''} onClick={() => setTab('colorsToAvoid')}>Colors to Avoid</button>
                </div>
                <div className="tab-content">
                  {tab === 'analysis' && (
                    <>
                      <div>{analysis.content}</div>
                      <h2 className="analysis-season" style={{ color: analysis.textColor }}>{analysis.season}</h2>
                      <Alert {...navigationTip} />
                    </>
                  )}
                  {tab === 'colorsToSuggest' && (
                    <>
                      <h2 className="analysis-section-title">Recommended Colors</h2>
                      <p>{analysis.reasonToSuggest}</p>
                      <SwatchSlide colors={analysis.colorsToSuggest} onColorSelected={handleColorSelected} />
                      <Alert {...tip} />
                    </>
                  )}
                  {tab === 'colorsToAvoid' && (
                    <>
                      <h2 className="analysis-section-title">Colors to Avoid</h2>
                      <p>{analysis.reasonToAvoid}</p>
                      <SwatchSlide colors={analysis.colorsToAvoid} onColorSelected={handleColorSelected} />
                      <Alert {...tip} />
                    </>
                  )}
                  <span className="disclaimer-container">
                    <Alert title={disclaimer.description} description="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="analysis-actions">
            <button className="analysis-btn" onClick={() => alert('Save as image feature coming soon!')}>Export</button>
            <button className="analysis-btn" onClick={clearLocalStorage}>Go back to home</button>
          </div>
        </>
      ) : (
        <div className="analysis-loading">
          <span className="analysis-spinner">●●●</span>
          {isVisible && (
            <span className="analysis-loading-message">{loadingMessages[currentMessageIndex]}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Analysis;
