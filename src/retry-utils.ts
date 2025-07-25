/**
 * Retry utilities for handling network failures
 */

export interface RetryOptions {
  maxRetries: number;
  retryDelay: number;
  backoff?: "linear" | "exponential";
  shouldRetry?: (error: any) => boolean;
}

const defaultRetryOptions: RetryOptions = {
  backoff: "exponential",
  maxRetries: 3,
  retryDelay: 1000,
  shouldRetry: (error) => {
    // Retry on network errors or 5xx server errors
    if (error.code === "ECONNREFUSED" || error.code === "ETIMEDOUT") {
      return true;
    }
    if (error.status >= 500 && error.status < 600) {
      return true;
    }
    // Don't retry on client errors (4xx)
    if (error.status >= 400 && error.status < 500) {
      return false;
    }
    return true;
  },
};

/**
 * Execute a function with retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const opts = { ...defaultRetryOptions, ...options };
  let lastError: any;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry
      if (attempt === opts.maxRetries || !opts.shouldRetry!(error)) {
        throw error;
      }

      // Calculate delay
      const delay =
        opts.backoff === "exponential"
          ? opts.retryDelay * 2 ** attempt
          : opts.retryDelay;

      console.log(
        `Retry attempt ${attempt + 1}/${opts.maxRetries} after ${delay}ms`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Wrap fetch with timeout support
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
