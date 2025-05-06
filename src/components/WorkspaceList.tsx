import React from 'react';
import { WorkspaceRoleOptionalResponse, WorkspaceRoleRequiredResponse } from '../services/api';
import BackButton from './BackButton';
import './WorkspaceList.css';

interface WorkspaceListProps {
  workspaces: WorkspaceRoleRequiredResponse[] | WorkspaceRoleOptionalResponse[];
  loading: boolean;
  error: string | null;
  onBack?: () => void;
  onWorkspaceSelect: (workspaceId: string) => void;
}

const WorkspaceList: React.FC<WorkspaceListProps> = ({ 
  workspaces, 
  loading, 
  error, 
  onBack,
  onWorkspaceSelect
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="workspace-list">
      <div className="workspace-header">
        <h3>Workspaces</h3>
        {onBack && <BackButton onClick={onBack} label="Back to Hubs" />}
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading workspaces...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : workspaces.length === 0 ? (
        <div className="empty-container">
          <p>No workspaces found for this organization.</p>
        </div>
      ) : (
        <div className="workspace-grid">
          {workspaces.map((workspace) => (
            <div 
              key={workspace.id} 
              className="workspace-card"
              onClick={() => onWorkspaceSelect(workspace.id)}
            >
              <h4 className="workspace-name">{workspace.name}</h4>
              {workspace.description && (
                <p className="workspace-description">{workspace.description}</p>
              )}
              <div className="workspace-details">
                <div className="workspace-detail">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{formatDate(workspace.created_at)}</span>
                </div>
                <div className="workspace-detail">
                  <span className="detail-label">Updated:</span>
                  <span className="detail-value">{formatDate(workspace.updated_at)}</span>
                </div>
                <div className="workspace-detail">
                  <span className="detail-label">Created by:</span>
                  <span className="detail-value">{workspace.created_by.name}</span>
                </div>
                <div className="workspace-detail">
                  <span className="detail-label">Role:</span>
                  <span className="detail-value">{workspace.current_user_role}</span>
                </div>
              </div>
              <div className="workspace-actions">
                <button 
                  className="workspace-action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onWorkspaceSelect(workspace.id);
                  }}
                >
                  View Objects
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspaceList; 