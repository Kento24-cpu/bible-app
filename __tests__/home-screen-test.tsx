import { render } from '@testing-library/react-native';

import HomeScreen from '../app/(tabs)/index';

describe('<HomeScreen />', () => {
  test('renders the app title', async () => {
    const { getByText } = await render(<HomeScreen />);
    getByText('Biblia');
  });
});
