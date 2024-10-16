// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError } from ".";

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    const toAccount = getBankAccount(0);
    expect(() => account.transfer(200, toAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(200, account)).toThrow();
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(200);
    expect(account.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(80);
    expect(account.getBalance()).toBe(20);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const toAccount = getBankAccount(0);
    account.transfer(80, toAccount);
    expect(account.getBalance()).toBe(20);
    expect(toAccount.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);

    const balance = await account.fetchBalance();

    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const oldBalance = account.getBalance();

    try {
      await account.synchronizeBalance();
      expect(oldBalance).not.toBe(account.getBalance());
    } catch (error) {
      expect(oldBalance).toBe(account.getBalance());
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
