import React, { useContext, useState } from 'react';
import { AuthContext } from "react-oauth2-code-pkce";
import UserInfo from '../components/UserInfo';
import WorkspaceList from '../components/WorkspaceList';
import GeoScienceObjectList from '../components/GeoScienceObjectList';
import WorkspaceFileList from '../components/WorkspaceFileList';
import { EvoWorkspacesApi, EvoGeoScienceObjectsApi, EvoFileApi, fetchUserDiscovery} from '../services/api';
import './Dashboard.css';
import BackButton from '../components/BackButton';
import { useQuery } from '@tanstack/react-query';

const Dashboard: React.FC = () => {
  const { token, logOut } = useContext(AuthContext);
  
  // State for workspace view
  const [showWorkspaces, setShowWorkspaces] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [selectedHubUrl, setSelectedHubUrl] = useState<string | null>(null);
  
  // State for workspace objects
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);

  const { data: discoveryData, isLoading: discoveryLoading, error: discoveryError } = useQuery({
    queryKey: ['discovery'],
    queryFn: () => fetchUserDiscovery(token),
  });

  const { data: workspacesData, isLoading: workspacesLoading, error: workspacesError } = useQuery({
    queryKey: ['workspaces', selectedHubUrl, selectedOrgId],
    queryFn: () => {
      if (!selectedHubUrl || !selectedOrgId || !token) {
        throw new Error('Missing required parameters');
      }
      const workspacesApi = new EvoWorkspacesApi(selectedHubUrl, token);
      return workspacesApi.getWorkspaces(selectedOrgId);
    },
  });

  const { data: workspaceObjectsData, isLoading: workspaceObjectsLoading, error: workspaceObjectsError } = useQuery({
    queryKey: ['workspaceObjects', selectedHubUrl, selectedOrgId, selectedWorkspaceId],
    queryFn: () => {
      if (!selectedHubUrl || !selectedOrgId || !selectedWorkspaceId || !token) {
        throw new Error('Missing required parameters');
      }
      const geoScienceObjectsApi = new EvoGeoScienceObjectsApi(selectedHubUrl, token);
      return geoScienceObjectsApi.getGeoScienceObjects(selectedOrgId, selectedWorkspaceId);
    },
  });

  const { data: workspaceFilesData, isLoading: workspaceFilesLoading, error: workspaceFilesError } = useQuery({
    queryKey: ['workspaceFiles', selectedHubUrl, selectedOrgId, selectedWorkspaceId],
    queryFn: () => {
      if (!selectedHubUrl || !selectedOrgId || !selectedWorkspaceId || !token) {
        throw new Error('Missing required parameters');
      }
      const fileApi = new EvoFileApi(selectedHubUrl, token);
      return fileApi.getFiles(selectedOrgId, selectedWorkspaceId);
    },
  });

  if (!token) {
    return null; // This should not happen if ProtectedRoute is working correctly
  }

  const handleLogout = () => {
    logOut();
  };
  
  const handleHubClick = (orgId: string, hubUrl: string) => {
    setSelectedOrgId(orgId);
    setSelectedHubUrl(hubUrl);
    setShowWorkspaces(true);
  };
  
  const handleBackToHubs = () => {
    setShowWorkspaces(false);
    setSelectedOrgId(null);
    setSelectedHubUrl(null);
  };

  const handleWorkspaceSelect = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);
  };

  const handleBackToWorkspaces = () => {
    setSelectedWorkspaceId(null);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      
      {discoveryLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading user information...</p>
        </div>
      ) : discoveryError ? (
        <div className="error-container">
          <h3>Error</h3>
          <p>{discoveryError.message}</p>
        </div>
      ) : showWorkspaces && selectedOrgId && selectedHubUrl ? (
        selectedWorkspaceId ? (
          <div className="workspace-content">
            <div className="workspace-navigation">
              <BackButton onClick={handleBackToWorkspaces} />
            </div>
            <div className="workspace-section">
              <GeoScienceObjectList
                objects={workspaceObjectsData || []}
                loading={workspaceObjectsLoading}
                error={workspaceObjectsError?.message || null}
              />
            </div>
            <div className="workspace-section">
              <WorkspaceFileList
                files={workspaceFilesData || []}
                loading={workspaceFilesLoading}
                error={workspaceFilesError?.message || null}
              />
            </div>
          </div>
        ) : (
          <div className="workspace-section">
            <WorkspaceList 
              workspaces={workspacesData || []}
              loading={workspacesLoading}
              error={workspacesError?.message || null}
              onBack={handleBackToHubs}
              onWorkspaceSelect={handleWorkspaceSelect}
            />
          </div>
        )
      ) : (
        <div className="user-info-section">
          <UserInfo 
            discoveryData={discoveryData || null} 
            onHubClick={handleHubClick}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard; 