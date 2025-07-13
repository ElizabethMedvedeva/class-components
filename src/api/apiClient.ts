type SearchResponse = {
  title?: string;
  pageNumber?: number;
  pageSize?: number;
};

export const search = async (
  title: string,
  pageNumber: number,
  pageSize: number
): Promise<SearchResponse> => {
  const result = await fetch('https://stapi.co/api/v1/rest/character/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, pageNumber, pageSize }),
  });
  if (!result.ok) throw new Error('Failed to fetch characters');

  const data = await result.json();

  console.log(data, 'data');
  return data;
};
