// Hub interface
export interface Hub {
  code: string;
  display_name: string;
  url: string;
}

// Organization interface
export interface Organization {
  id: string;
  display_name: string;
}

// Service interface
export interface Service {
  code: string;
  display_name: string;
}

// Service access interface
export interface ServiceAccess {
  hub_code: string;
  org_id: string;
  services: string[];
}

// API response interface
export interface Discovery {
  hubs: Hub[];
  organizations: Organization[];
  services: Service[];
  service_access: ServiceAccess[];
}

export interface DiscoveryResponse {
  discovery: Discovery;
} 