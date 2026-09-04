import { useState } from 'react';
import { ImageOff, Image as ImageIcon } from 'lucide-react';
import './Thumb.css';

// Blob URLs are placeholders in the test data, so a failed load falls back to an icon.
export default function Thumb({ src, alt, size = 'md' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const Icon = failed ? ImageOff : ImageIcon;
    return (
      <div className={`thumb thumb--${size} thumb--empty`} role="img" aria-label={alt || 'Image unavailable'}>
        <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img className={`thumb thumb--${size}`} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
  );
}
