const authConfig = {
  jwt: {
    secret: '9970383976148455904e2332d57720bc',
    expires_in: '15m',
  },
  refreshJwt: {
    secret: '1fc094ccbba9d94260f18971a7a0faf5',
    expires_in_days: 30,
    expires_in: '',
  },
};

authConfig.refreshJwt.expires_in = `${authConfig.refreshJwt.expires_in_days}d`;

export { authConfig };
