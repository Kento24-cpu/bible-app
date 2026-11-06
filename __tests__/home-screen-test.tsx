import { render } from '@testing-library/react-native';

import HomeScreen from '../app/(tabs)/index';

describe('<HomeScreen />', () => {
  test('renders the app title', async () => {
    const { getByText } = await render(<HomeScreen />);
    getByText('Biblia');
  });

  test('renders the book list', async () => {
    const { getByText } = await render(<HomeScreen />);
    getByText('Génesis');
    getByText('Éxodo');
  });
});
