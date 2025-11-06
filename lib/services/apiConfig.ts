import type { APIConfig, APISource } from '@/types/anime';

// Default API configurations
const defaultAPIs: Record<APISource, APIConfig> = {
  jikan: {
    name: 'Jikan API',
    baseUrl: process.env.NEXT_PUBLIC_JIKAN_API_URL || 'https://api.jikan.moe/v4',
    enabled: true,
    rateLimitMs: 1000, // 1 request per second
  },
  fallback: {
    name: 'Fallback Data',
    baseUrl: '/data/fallback-anime.json',
    enabled: true,
  },
  custom: {
    name: 'Custom API',
    baseUrl: '',
    enabled: false,
  },
};

// API Manager class for future extensibility
class APIManager {
  private apis: Map<string, APIConfig>;

  constructor() {
    this.apis = new Map(Object.entries(defaultAPIs));
  }

  // Get all configured APIs
  getAllAPIs(): APIConfig[] {
    return Array.from(this.apis.values());
  }

  // Get enabled APIs
  getEnabledAPIs(): APIConfig[] {
    return Array.from(this.apis.values()).filter((api) => api.enabled);
  }

  // Get specific API config
  getAPI(source: string): APIConfig | undefined {
    return this.apis.get(source);
  }

  // Add or update API configuration
  setAPI(source: string, config: APIConfig): void {
    this.apis.set(source, config);
  }

  // Enable/disable an API
  toggleAPI(source: string, enabled: boolean): boolean {
    const api = this.apis.get(source);
    if (api) {
      api.enabled = enabled;
      return true;
    }
    return false;
  }

  // Remove an API
  removeAPI(source: string): boolean {
    return this.apis.delete(source);
  }

  // Get primary API (first enabled API)
  getPrimaryAPI(): APIConfig | undefined {
    return this.getEnabledAPIs()[0];
  }

  // Validate API configuration
  validateAPIConfig(config: APIConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.name || config.name.trim() === '') {
      errors.push('API name is required');
    }

    if (!config.baseUrl || config.baseUrl.trim() === '') {
      errors.push('API base URL is required');
    }

    // Validate URL format
    if (config.baseUrl && !config.baseUrl.startsWith('http') && !config.baseUrl.startsWith('/')) {
      errors.push('API base URL must be a valid URL or path');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Export configuration (for admin panel)
  exportConfig(): string {
    const config = Object.fromEntries(this.apis);
    return JSON.stringify(config, null, 2);
  }

  // Import configuration (for admin panel)
  importConfig(configJson: string): { success: boolean; error?: string } {
    try {
      const config = JSON.parse(configJson);
      this.apis = new Map(Object.entries(config));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid JSON',
      };
    }
  }
}

// Singleton instance
export const apiManager = new APIManager();

// Helper functions for easy access
export function getAPIConfig(source: APISource): APIConfig | undefined {
  return apiManager.getAPI(source);
}

export function getAllAPIConfigs(): APIConfig[] {
  return apiManager.getAllAPIs();
}

export function getEnabledAPIConfigs(): APIConfig[] {
  return apiManager.getEnabledAPIs();
}

// Future: This function will be used by admin panel to add new APIs
export function addCustomAPI(config: APIConfig): { success: boolean; error?: string } {
  const validation = apiManager.validateAPIConfig(config);

  if (!validation.valid) {
    return {
      success: false,
      error: validation.errors.join(', '),
    };
  }

  // Generate a unique ID for the custom API
  const customId = `custom_${Date.now()}`;
  apiManager.setAPI(customId, config);

  return { success: true };
}
