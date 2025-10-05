// src/services/__mocks__/newsService.ts
export type Fact = {
  id: string;
  date: string;
  content: string;
};

export const fetchFacts = jest.fn(async (date: string, lang: 'en' | 'hi' = 'en') => {
  return [
    { id: '1', date, content: 'Fact 1 content' },
    { id: '2', date, content: 'Fact 2 content' },
  ];
});
