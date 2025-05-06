import React from 'react';
import './WorkspaceFileList.css';
import { ListFile } from '../services/api';

interface WorkspaceFileListProps {
  files: ListFile[];
  loading?: boolean;
  error?: string | null;
}

const WorkspaceFileList: React.FC<WorkspaceFileListProps> = ({
  files,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="workspace-files-loading">
        <div className="loading-spinner" />
        <p>Loading files...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="workspace-files-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!files.length) {
    return (
      <div className="workspace-files-empty">
        <p>No files found in this workspace.</p>
      </div>
    );
  }

  return (
    <div className="workspace-files-container">
      <div className="workspace-files-header">
        <h2>Workspace Files</h2>
      </div>
      <div className="workspace-files-list">
        <table className="workspace-files-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Schema</th>
              <th>Created At</th>
              <th>Modified At</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr
                key={file.file_id}
                className="workspace-file-row"
              >
                <td>
                  <div className="file-name">{file.name}</div>
                  <div className="file-path">{file.path}</div>
                </td>
                <td>
                  <div className="file-date">
                    {new Date(file.created_at).toLocaleString()}
                  </div>
                  <div className="file-user">by {file.created_by?.name}</div>
                </td>
                <td>
                  <div className="file-date">
                    {new Date(file.modified_at).toLocaleString()}
                  </div>
                  <div className="file-user">by {file.modified_by?.name}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkspaceFileList; 