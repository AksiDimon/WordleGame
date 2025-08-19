import { render, screen, fireEvent } from '@testing-library/react';
import { signInWithPopup } from 'firebase/auth';
import { vi, describe, it, expect } from 'vitest';

// мок firebase/auth 
vi.mock('firebase/auth', () => ({
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));

// мок стора авторизации 
vi.mock('../features/auth/auth.store', () => ({
  useAuth: () => ({ user: null, loading: false }),
}));

// мок локального firebase 
vi.mock('../firebase', () => ({
  auth: {} ,
  googleProvider: {},
}));

import AuthCard from './AuthCard';



describe('AuthCard (guest)', () => {
  it('renders login button and calls signInWithPopup on click', async () => {
    render(<AuthCard />);

    const btn = await screen.findByRole('button', {
      name: /войти через google/i,
    });
    fireEvent.click(btn);

    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});
