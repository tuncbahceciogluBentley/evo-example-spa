import React from 'react';
import { ListedObject } from '../services/api';
import './GeoScienceObjectList.css';

interface GeoScienceObjectListProps {
  objects: ListedObject[];
  loading: boolean;
  error: string | null;
}

const GeoScienceObjectList: React.FC<GeoScienceObjectListProps> = ({
  objects,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="geoscience-objects-loading">
        <div className="loading-spinner"></div>
        <p>Loading geoscience objects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="geoscience-objects-error">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (objects.length === 0) {
    return (
      <div className="geoscience-objects-empty">
        <p>No geoscience objects found in this workspace.</p>
      </div>
    );
  }

  return (
    <div className="geoscience-objects-container">
      <div className="geoscience-objects-header">
        <h2>Geoscience Objects</h2>
      </div>
      <div className="geoscience-objects-list">
        {objects.map((object) => (
          <div key={object.object_id} className="geoscience-object-card">
            <h3>{object.name}</h3>
            <div className="geoscience-object-details">
              <p><strong>Path:</strong> {object.path}</p>
              <p><strong>Schema:</strong> {object.schema}</p>
              <p><strong>Created:</strong> {new Date(object.created_at).toLocaleString()}</p>
              <p><strong>Created by:</strong> {object.created_by?.name}</p>
              {object.geojson_bounding_box && (
                <div className="bounding-box-info">
                  <p><strong>Bounding Box:</strong></p>
                  <ul>
                    {object.geojson_bounding_box.coordinates[0]?.map((coord, index) => (
                      <li key={index}>
                        [{coord[0]!.toFixed(4)}, {coord[1]!.toFixed(4)}]
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeoScienceObjectList; 