/**
 * Cutty API Client
 * 
 * Handles communication with the Cutty app backend for synthetic data operations
 */

export interface SyntheticDataResponse {
  success: boolean;
  file?: {
    id: string;
    name: string;
    size: number;
    type: string;
    downloadUrl: string;
  };
  metadata?: {
    recordCount: number;
    generatedAt: string;
    state?: string;
    states?: string[];
  };
  error?: string;
  details?: string[];
}

export interface SupportedStatesResponse {
  success: boolean;
  states: string[];
  error?: string;
}

export class CuttyAPIClient {
  private baseURL: string;

  constructor(baseURL: string = 'http://localhost:8787') {
    // Remove trailing slash if present
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  /**
   * Generate synthetic patient data
   */
  async generateSyntheticData(params: {
    count: number;
    states?: string[];
  }): Promise<SyntheticDataResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/synthetic-data/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          count: params.count,
          ...(params.states && params.states.length > 0 && { states: params.states })
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        return {
          success: false,
          error: errorData.error || `HTTP error! status: ${response.status}`,
          details: errorData.details,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to generate synthetic data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Get list of supported states for synthetic data generation
   */
  async getSupportedStates(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/synthetic-data/supported-states`);
      
      if (!response.ok) {
        console.warn('Failed to fetch supported states, using defaults');
        // Return default states if API fails
        return ['CA', 'FL', 'GA', 'IL', 'NY', 'OH', 'PA', 'TX'];
      }

      const data: SupportedStatesResponse = await response.json();
      return data.states || [];
    } catch (error) {
      console.error('Failed to fetch supported states:', error);
      // Return default states on error
      return ['CA', 'FL', 'GA', 'IL', 'NY', 'OH', 'PA', 'TX'];
    }
  }

  /**
   * Construct download URL for a file
   */
  getDownloadUrl(fileId: string, isAnonymous: boolean = true): string {
    if (isAnonymous) {
      return `${this.baseURL}/api/v1/synthetic-data/download/${fileId}`;
    }
    return `${this.baseURL}/api/v1/files/${fileId}`;
  }

  /**
   * Trigger file download in browser
   */
  async downloadFile(downloadUrl: string, filename?: string): Promise<boolean> {
    try {
      // For anonymous downloads, we can use direct navigation
      if (downloadUrl.includes('/synthetic-data/download/')) {
        // Create a temporary anchor element to trigger download
        const a = document.createElement('a');
        a.href = downloadUrl.startsWith('http') ? downloadUrl : `${this.baseURL}${downloadUrl}`;
        a.download = filename || 'synthetic-data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return true;
      }

      // For authenticated downloads, we need to fetch with credentials
      const response = await fetch(
        downloadUrl.startsWith('http') ? downloadUrl : `${this.baseURL}${downloadUrl}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'synthetic-data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  }
}

// Export a default instance
export const cuttyAPI = new CuttyAPIClient();