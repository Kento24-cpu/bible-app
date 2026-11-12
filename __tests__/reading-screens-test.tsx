import { render } from '@testing-library/react-native';

import BookScreen from '../app/book/[index]';
import ChapterScreen from '../app/chapter/[index]/[chapter]';

let mockParams: Record<string, string> = {};

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  useLocalSearchParams: () => mockParams,
  useFocusEffect: () => {},
  Stack: { Screen: () => null },
}));

describe('reading screens', () => {
  test('chapter screen renders verses and navigation', async () => {
    mockParams = { index: '42', chapter: '3' };
    const { getAllByText, getByText } = await render(<ChapterScreen />);
    expect(getAllByText(/Nicodemo/).length).toBeGreaterThan(0);
    getByText('3 / 21');
    getByText('Anterior');
    getByText('Siguiente');
  });

  test('chapter screen hides navigation at chapter boundaries', async () => {
    mockParams = { index: '0', chapter: '1' };
    const { getByText, queryByText } = await render(<ChapterScreen />);
    expect(queryByText('Anterior')).toBeNull();
    getByText('Siguiente');
  });

  test('book screen renders the chapter grid', async () => {
    mockParams = { index: '42' };
    const { getByText } = await render(<BookScreen />);
    getByText('1');
    getByText('10');
  });
});
