import Sanity from '@sanity/client';

export const SanityClient = Sanity({
  projectId: `cxxdyw8a`,
  dataset: `production`,
  apiVersion: `2021-03-25`,
  useCdn: true,
});
