import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  slot, 
  format = 'auto', 
  style = {}, 
  className = '' 
}) => {
  useEffect(() => {
    // Check if adsbygoogle is defined
    if (window.adsbygoogle && window.adsbygoogle.length > 0) {
      try {
        // Push the ad
        window.adsbygoogle.push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    } else {
      console.warn('AdSense not loaded yet');
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense Publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;