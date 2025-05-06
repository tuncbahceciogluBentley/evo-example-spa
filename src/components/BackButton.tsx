import React from 'react';
import './BackButton.css';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, label = 'Back to Workspaces' }) => {
  return (
    <button onClick={onClick} className="back-button">
      {label}
    </button>
  );
};

export default BackButton; 