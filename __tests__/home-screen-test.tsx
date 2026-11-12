import { fireEvent, render, waitFor } from '@testing-library/react-native';

import HomeScreen from '../app/(tabs)/index';

describe('<HomeScreen />', () => {
  test('renders the app title', async () => {
    const { getByText } = await render(<HomeScreen />);
    getByText('Biblia');
  });

  test('expands the Old Testament books', async () => {
    const { getByText, queryByText } = await render(<HomeScreen />);

    expect(queryByText('Génesis')).toBeNull();

    fireEvent.press(getByText('Antiguo Testamento'));
    await waitFor(() => getByText('Génesis'));
    getByText('Éxodo');
  });

  test('expands the New Testament books', async () => {
    const { getByText, queryByText } = await render(<HomeScreen />);

    expect(queryByText('San Mateo')).toBeNull();

    fireEvent.press(getByText('Nuevo Testamento'));
    await waitFor(() => getByText('San Mateo'));
  });
});
