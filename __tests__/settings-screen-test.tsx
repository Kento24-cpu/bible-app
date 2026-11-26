import { Alert } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import * as Updates from 'expo-updates';

import SettingsScreen from '../app/(tabs)/settings';

jest.mock('expo-updates', () => ({
  isEnabled: true,
  checkForUpdateAsync: jest.fn(),
  fetchUpdateAsync: jest.fn(),
  reloadAsync: jest.fn(),
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
const mockReloadAsync = jest.mocked(Updates.reloadAsync);
const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<SettingsScreen />', () => {
  test('shows the current version', async () => {
    const { getByText } = await render(<SettingsScreen />);
    getByText('1.2.3');
  });

  test('says it is up to date when there are no updates', async () => {
    mockCheckForUpdateAsync.mockResolvedValue({ isAvailable: false } as never);

    const { getByText } = await render(<SettingsScreen />);
    await act(async () => {
      fireEvent.press(getByText('Buscar actualizaciones'));
    });

    await waitFor(() => expect(getByText('Ya estás al día')).toBeTruthy());
    expect(alertSpy).not.toHaveBeenCalled();
    expect(mockFetchUpdateAsync).not.toHaveBeenCalled();
    expect(mockReloadAsync).not.toHaveBeenCalled();
  });

  test('downloads an available update and reloads the app', async () => {
    mockCheckForUpdateAsync.mockResolvedValue({ isAvailable: true } as never);
    mockFetchUpdateAsync.mockResolvedValue({ isNew: true } as never);
    mockReloadAsync.mockResolvedValue(undefined as never);

    const { getByText } = await render(<SettingsScreen />);
    await act(async () => {
      fireEvent.press(getByText('Buscar actualizaciones'));
    });

    await waitFor(() => expect(mockReloadAsync).toHaveBeenCalled());
    expect(mockFetchUpdateAsync).toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
  });
});
