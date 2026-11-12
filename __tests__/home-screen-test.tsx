import { fireEvent, render, waitFor } from '@testing-library/react-native';

import HomeScreen from '../app/(tabs)/index';

describe('<HomeScreen />', () => {
  test('renders the app title', async () => {
    const { getByText } = await render(<HomeScreen />);
    getByText('Biblia');
  });

  test('shows the Old Testament by default', async () => {
    const { getByText, queryByText } = await render(<HomeScreen />);

    getByText('Génesis');
    getByText('Éxodo');
    expect(queryByText('San Mateo')).toBeNull();
  });

  test('switches to the New Testament', async () => {
    const { getByText, queryByText } = await render(<HomeScreen />);

    expect(queryByText('San Mateo')).toBeNull();

    fireEvent.press(getByText('Nuevo Testamento'));
    await waitFor(() => getByText('San Mateo'));
    expect(queryByText('Génesis')).toBeNull();
  });
});
