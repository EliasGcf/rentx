const authConfig = {
  secret_token: '9970383976148455904e2332d57720bc',
  secret_refresh_token: '1fc094ccbba9d94260f18971a7a0faf5',
  expires_in_token: '15m',
  expires_in_refresh_token_days: 30,
  expires_in_refresh_token: '',
};

authConfig.expires_in_refresh_token = `${authConfig.expires_in_refresh_token_days}d`;

export { authConfig };
