import { fireEvent, render } from '@testing-library/react-native';
import { Uniwind } from 'uniwind';

import SettingsScreen from '../app/(tabs)/settings';

describe('<SettingsScreen />', () => {
  test('renders the three theme options', async () => {
    const { getByText } = await render(<SettingsScreen />);
    getByText('Sistema');
    getByText('Claro');
    getByText('Oscuro');
  });

  test('applies the selected theme', async () => {
    const setTheme = jest.spyOn(Uniwind, 'setTheme');
    const { getByText } = await render(<SettingsScreen />);

    fireEvent.press(getByText('Oscuro'));

    expect(setTheme).toHaveBeenCalledWith('dark');
    setTheme.mockRestore();
  });

  test('shows the app version', async () => {
    const { getByText } = await render(<SettingsScreen />);
    getByText('Versión de la app');
  });
});
