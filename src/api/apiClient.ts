import type { SearchResponse } from '../types/types';

export const searchRequest = async (
  title: string,
  pageNumber: number = 0,
  pageSize: number = 6
): Promise<SearchResponse> => {
  const query = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });
  const url = 'https://stapi.co/api/v1/rest/animal/search?' + query.toString();
  const result = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      name: title,
    }),
  });
  if (!result.ok) throw new Error('Failed to fetch characters');

  const data = await result.json();

  return data;
};
