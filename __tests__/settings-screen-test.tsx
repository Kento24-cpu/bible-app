import { Alert } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import * as Updates from 'expo-updates';

import SettingsScreen from '../app/(tabs)/settings';

jest.mock('expo-updates', () => ({
  isEnabled: true,
  checkForUpdateAsync: jest.fn(),
  fetchUpdateAsync: jest.fn(),
}));

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { version: '1.2.3' } },
}));

jest.mock('lucide-react-native', () => ({
  Download: () => null,
  Info: () => null,
}));

const mockCheckForUpdateAsync = jest.mocked(Updates.checkForUpdateAsync);
const mockFetchUpdateAsync = jest.mocked(Updates.fetchUpdateAsync);
const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<SettingsScreen />', () => {
  test('shows the current version', async () => {
    const { getByText } = await render(<SettingsScreen />);
    getByText('1.2.3');
  });

  test('reports when there are no updates', async () => {
    mockCheckForUpdateAsync.mockResolvedValue({ isAvailable: false } as never);

    const { getByText } = await render(<SettingsScreen />);
    await act(async () => {
      fireEvent.press(getByText('Buscar actualizaciones'));
    });

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith('Actualizaciones', 'Ya tienes la última versión.')
    );
  });

  test('downloads an available update and asks to restart', async () => {
    mockCheckForUpdateAsync.mockResolvedValue({ isAvailable: true } as never);
    mockFetchUpdateAsync.mockResolvedValue({ isNew: true } as never);

    const { getByText } = await render(<SettingsScreen />);
    await act(async () => {
      fireEvent.press(getByText('Buscar actualizaciones'));
    });

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        'Actualización lista',
        'Cierra y vuelve a abrir la app para aplicarla.'
      )
    );
    expect(mockFetchUpdateAsync).toHaveBeenCalled();
  });
});
