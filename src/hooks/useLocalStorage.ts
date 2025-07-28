import { useCallback } from 'react';

export const useSearchStorage = () => {
  const getSearchTerm = useCallback((): string => {
    return localStorage.getItem('searchTerm')?.trim() || '';
  }, []);

  const saveSearchTerm = useCallback((term: string) => {
    localStorage.setItem('searchTerm', term.trim());
  }, []);

  return {
    getSearchTerm,
    saveSearchTerm,
  };
};
