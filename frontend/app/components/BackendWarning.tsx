'use client'

import { useState, useEffect } from 'react';

export default function BackendWarning() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const hasSeenWarning = sessionStorage.getItem('backendWarningShown');
    
    if (!hasSeenWarning) {
      sessionStorage.setItem('backendWarningShown', 'true');
      
      const warningTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      wakeUpBackend(warningTimeout);
    }
  }, []);

  const wakeUpBackend = async (warningTimeout: NodeJS.Timeout) => {
    try {
      await fetch(`https://musclememory-backend.onrender.com/api/exercises`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // If we get a response, cancel the warning timeout
      clearTimeout(warningTimeout);      
    } catch (error) {
      console.log('Backend wake-up call failed (this is expected if server is cold):', error);
      // Don't clear the timeout if there's an error - let the warning show
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="backend-warning-overlay" onClick={handleDismiss}>
      <div className="backend-warning-modal" onClick={(e) => e.stopPropagation()}>
        <div className="backend-warning-content">
          <div className="backend-warning-icon">
            ⚠️
          </div>
          <div className="backend-warning-text">
            <strong>Backend Loading</strong>
            <p>
              The backend server is starting up due to inactivity. Initial data requests may take a moment.
            </p>
          </div>
          <button 
            onClick={handleDismiss}
            className="backend-warning-dismiss"
            aria-label="Dismiss warning"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
