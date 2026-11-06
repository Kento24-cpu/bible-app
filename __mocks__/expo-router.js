module.exports = {
  useRouter: () => ({ push: () => {}, replace: () => {}, back: () => {} }),
  useLocalSearchParams: () => ({}),
  useGlobalSearchParams: () => ({}),
  Link: 'Link',
  Stack: { Screen: () => null },
  Tabs: { Screen: () => null },
  ErrorBoundary: () => null,
};
