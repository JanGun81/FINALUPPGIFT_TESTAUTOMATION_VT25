import { test as base, expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

export const test = base.extend<{ api: APIRequestContext; baseURL: string }>({
  api: async ({ request }, use) => {
    await use(request);
  },

  baseURL: async ({}, use) => {
    await use('https://hoff.is/store2/api/v1');
  },
});

export { expect };