/**
 * Created by Elf on 05.09.2016.
 */
const ErrorMessages = {
    internetDisable: 'No internet connection. Check your internet settings and restart application please!',
    loginError: 'Wrong username or password',
    wrongCredentials: 'Username or password not valid',
    wrongEmailForReset: 'Email not valid',
    resetPasswordError: 'Error while resetting password',
    signUpInformationIncorrect: 'Incorrect registration information',
    errorFetchAccountData: 'Error while connecting to your account. Please try again later',
    wrongGluwasAmount: 'Wrong gluwas amount. It can not be negative or zero',
    sendGluwasError: 'Error. Send operation failed',
    sellGluwasError: 'Error. Sell operation failed',
    wrongToSendUserInfo: 'User data or password can\'t be empty',
    signUpError: 'Error while creating a user. Try again later',
    errorWhileFetchingBanksList: 'Can\'t get banks list. Try again later',
    errorWhileFetchingTransactions: 'Can\'t get transactions history. Try again later',
    wrongSellBillingInfo: 'Billing information and password can\'t be empty',
    errorReachingToServer: 'Can\'t reaching to server. Try again later',
};

export default ErrorMessages;