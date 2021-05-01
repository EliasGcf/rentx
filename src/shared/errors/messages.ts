import { MIN_RENT_HOURS } from '@shared/constants';

const errorsMessages = {
  user_is_not_admin: 'User must be an administrator to do this operation.',
  user_is_not_registered: 'User is not registered.',
  car_is_not_registered: 'Car is not registered.',
  rent_is_not_registered: 'Rent is not registered.',
  incorrect_credentials: 'Incorrect credentials, try again.',
  missing_auth_token: 'Authentication token is missing.',
  email_already_registered: 'This email is already registered.',
  category_already_registered: 'This category name is already registered.',
  specification_already_registered: 'This specification name is already registered.',
  car_already_registered: 'This license plate is already registered.',
  password_reset_token_not_format_valid: 'Token must be a string.',
  invalid_token: 'Invalid authentication token, please log in a new session.',
  expired_token: 'Expired token, please try again with another link.',
  user_rent_in_progress: 'There is a rent in progress with this user.',
  car_rent_in_progress: 'There is a rent in progress with this car.',
  invalid_return_rent_date: `Expected return date is less than ${MIN_RENT_HOURS}h.`,
  to_many_requests: 'Too many requests. Come down.',
};

export { errorsMessages };
