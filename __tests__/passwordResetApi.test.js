import axios from 'axios';
import {requestPasswordResetCode, verifyPasswordResetCode, resetPasswordApi} from '../src/api/api';

jest.mock('axios', () => ({post: jest.fn()}));
jest.mock('@react-native-async-storage/async-storage', () => ({getItem: jest.fn()}));

beforeEach(() => jest.clearAllMocks());

test('request, verify and confirm use the backend JSON contract without login', async () => {
  axios.post.mockResolvedValue({data: 'success'});
  const email = 'plant@example.com';
  const code = '123456';
  expect(await requestPasswordResetCode(email)).toBe('success');
  expect(await verifyPasswordResetCode(email, code)).toBe('success');
  expect(await resetPasswordApi({email, code, newPassword: 'NewPass2!'})).toBe('success');
  expect(axios.post.mock.calls).toEqual([
    ['http://3.25.69.13:8080/api/email/password-reset/request', {email}],
    ['http://3.25.69.13:8080/api/email/password-reset/verify', {email, code}],
    ['http://3.25.69.13:8080/api/email/password-reset/confirm', {email, code, newPassword: 'NewPass2!'}],
  ]);
});

test('failed confirmation propagates the server error instead of reporting success', async () => {
  const error = {response: {status: 400, data: {message: 'expired'}}};
  axios.post.mockRejectedValue(error);
  await expect(resetPasswordApi({email: 'plant@example.com', code: '123456', newPassword: 'NewPass2!'}))
    .rejects.toBe(error);
});
