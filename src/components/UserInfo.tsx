import React, { useState } from 'react';
import { DiscoveryResponse } from '../types';
import './UserInfo.css';

interface UserInfoProps {
  discoveryData: DiscoveryResponse | null;
  onHubClick?: (orgId: string, hubUrl: string) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ discoveryData, onHubClick }) => {
  const [loadingHub, setLoadingHub] = useState<string | null>(null);

  const handleHubClick = (hubCode: string, hubUrl: string) => {
    if (!discoveryData || !onHubClick) return;
    
    // Find the organization ID from service access
    const serviceAccess = discoveryData.discovery.service_access.find(
      access => access.hub_code === hubCode
    );
    
    if (serviceAccess) {
      setLoadingHub(hubCode);
      onHubClick(serviceAccess.org_id, hubUrl);
    }
  };

  return (
    <div className="user-info">
      {discoveryData && (
        <>
          <h4>Hubs</h4>
          <div className="data-list">
            {discoveryData.discovery.hubs.map((hub, index) => (
              <div key={index} className="data-item">
                <div className="data-item-header">
                  <span 
                    className={`data-item-title ${onHubClick ? 'clickable' : ''}`}
                    onClick={() => onHubClick && handleHubClick(hub.code, hub.url)}
                  >
                    {hub.display_name}
                    {loadingHub === hub.code && <span className="loading-indicator">...</span>}
                  </span>
                  <span className="data-item-code">{hub.code} ({hub.url})</span>
                </div>
              </div>
            ))}
          </div>
          
          <h4>Organizations</h4>
          <div className="data-list">
            {discoveryData.discovery.organizations.map((org, index) => (
              <div key={index} className="data-item">
                <div className="data-item-header">
                  <span className="data-item-title">{org.display_name}</span>
                  <span className="data-item-id">ID: {org.id}</span>
                </div>
              </div>
            ))}
          </div>
          
          <h4>Services</h4>
          <div className="data-list">
            {discoveryData.discovery.services.map((service, index) => (
              <div key={index} className="data-item">
                <div className="data-item-header">
                  <span className="data-item-title">{service.display_name}</span>
                  <span className="data-item-code">{service.code}</span>
                </div>
              </div>
            ))}
          </div>
          
          <h4>Service Access</h4>
          <div className="data-list">
            {discoveryData.discovery.service_access.map((access, index) => (
              <div key={index} className="data-item">
                <div className="data-item-header">
                  <span className="data-item-title">Hub: {access.hub_code}</span>
                  <span className="data-item-id">Org: {access.org_id}</span>
                </div>
                <div className="data-item-services">
                  <span className="data-item-services-label">Services: </span>
                  {access.services.map((service, i) => (
                    <span key={i} className="data-item-service-tag">{service}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;