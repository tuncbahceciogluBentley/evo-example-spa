import { DiscoveryResponse } from '../types/api';
import { paths as WorkspacesPaths, components as WorkspacesComponents } from '../../openapi/workspaces-v1';
import { paths as GeoScienceObjectsPaths, components as GeoScienceObjectsComponents } from '../../openapi/geoscience-object-v1';
import { paths as FilePaths, components as FileComponents } from '../../openapi/file-v2';
import createClient, { Client } from 'openapi-fetch';

const API_BASE_URL = 'https://discover.api.seequent.com/evo/identity/v2';

/**
 * Fetches user discovery information from the API
 * @param token - The authentication token
 * @returns Promise with the discovery response
 */
export const fetchUserDiscovery = async (token: string): Promise<DiscoveryResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/discovery?&service=file&service=geoscienceobject`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data as DiscoveryResponse;
  } catch (error) {
    console.error('Error fetching user discovery:', error);
    throw error;
  }
};

export type WorkspaceRoleRequiredResponse = WorkspacesComponents['schemas']['WorkspaceRoleRequiredResponse'];
export type WorkspaceRoleOptionalResponse = WorkspacesComponents['schemas']['WorkspaceRoleOptionalResponse'];

export class EvoWorkspacesApi {
  private client: Client<WorkspacesPaths>;

  constructor(hubUrl: string, token: string) {
    this.client = createClient<WorkspacesPaths>({ baseUrl:hubUrl, headers: { Authorization: `Bearer ${token}` } });
  }

  async getWorkspaces(orgId: string): Promise<WorkspaceRoleRequiredResponse[] | WorkspaceRoleOptionalResponse[]> {
    const {data, error} = await this.client.GET('/workspace/orgs/{org_id}/workspaces', {
      params: {
        path: {
          org_id: orgId,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data.results;
  }
}

export type ListedObject = GeoScienceObjectsComponents['schemas']['ListedObject'];

export class EvoGeoScienceObjectsApi {
  private client: Client<GeoScienceObjectsPaths>;

  constructor(hubUrl: string, token: string) {
    this.client = createClient<GeoScienceObjectsPaths>({ baseUrl:hubUrl, headers: { Authorization: `Bearer ${token}` } });
  }

  async getGeoScienceObjects(orgId: string, workspaceId: string): Promise<ListedObject[]> {
    const {data, error} = await this.client.GET('/geoscience-object/orgs/{org_id}/workspaces/{workspace_id}/objects', {
      params: {
        path: {
          org_id: orgId,
          workspace_id: workspaceId,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data.objects;
  }
}

export type ListFile = FileComponents['schemas']['ListFile'];

export class EvoFileApi {
  private client: Client<FilePaths>;

  constructor(hubUrl: string, token: string) {
    this.client = createClient<FilePaths>({ baseUrl:hubUrl, headers: { Authorization: `Bearer ${token}` } });
  }

  async getFiles(orgId: string, workspaceId: string): Promise<ListFile[]> {
    const {data, error} = await this.client.GET('/file/v2/orgs/{organisation_id}/workspaces/{workspace_id}/files', {
      params: {
        path: {
          organisation_id: orgId,
          workspace_id: workspaceId,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data.files;
  }
}