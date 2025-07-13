type SearchResponse = {
  title?: string;
  pageNumber?: number;
  pageSize?: number;
};

export const searchRequest = async (title: string): Promise<SearchResponse> => {
  const result = await fetch('https://stapi.co/api/v1/rest/animal/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ name: title }),
  });
  if (!result.ok) throw new Error('Failed to fetch characters');

  const data = await result.json();

  console.log(data, 'data');
  return data;
};
