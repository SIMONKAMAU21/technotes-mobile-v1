import { create } from 'zustand';





interface globalDefaultProps {
  visible: boolean;
  description: string;
}

// interface transferProps {
//   channel: number;
//   name: string;
//   type: string;
// }

// interface accountProps {
//   uuid: string;
//   balance: string;
//   name: string;
//   currency: string;
// }

export type globalProps = globalDefaultProps | null;

interface StoreData {
  isLoading: boolean;
  globalError: globalProps;
  globalSuccess: globalProps;
//   fromAccount: accountProps | {};
//   toAccount: accountProps | {};
//   account: AccountCardsProps2 | {};
//   otpChannel: string;
//   username: string;
//   token: string;
//   type: string;
//   channel: ChannelModalCardsProps | {};
//   transfer: transferProps | {};
//   selectedContact: null;
//   requestMoneyContact: null;
//   airtimeContact: null;
//   favouriteAirtimeContact: null;
//   favouriteBankContact: null;
//   favouriteMoneyContact: null;
//   moneyTransferContact: null;
//   bankTransferContact: null;
//   signupContact: null;
//   loginContact: null;
// //   contacts: Contact[];
// //   walletPayload: payoutPayload | {};
//   selectedAccountNumber: string;
//   selectedTillNumber: string;
//   selectedTillName: string;
//   selectedPaybillNumber: string;
//   selectedPaybillAccount: string;
//   selectedNetwork: string;
//   selectedBankAccountNumber: string;
//   selectedBankRecipientName: string;
//   selectedBankName: string;
//   selectedBankCode: string;
  actions: {
    setIsLoading: (loading: boolean) => void;
    setGlobalError: (error: globalProps) => void;
    setGlobalSuccess: (success: globalProps) => void;
    // setAccount: (account: AccountCardsProps2) => void;
    // setTransfer: (transfer: transferProps) => void;
    // setFromAccount: (account: accountProps) => void;
    // setToAccount: (account: accountProps) => void;
    // setWalletPayload: (payload: payoutPayload) => void;
    // setChannel: (channel: ChannelModalCardsProps) => void;
    // setOtpChannel: (newChannel: string) => void;
    // setUsername: (username: string) => void;
    // setToken: (token: string) => void;
    // setType: (type: string) => void;
    // setContacts: (contacts: Contact[]) => void;
    // setSelectedContact: (selectedContact: null) => void;
    // setRequestMoneyContact: (contact?: Contact) => void;
    // setAirtimeContact: (contact?: Contact) => void;
    // setFavouriteAirtimeContact: (contact?: Contact) => void;
    // setFavouriteBankContact: (contact?: Contact) => void;
    // setFavouriteMoneyContact: (contact?: Contact) => void;
    // setmoneyTransferContact: (contact?: Contact) => void;
    // setbankTransferContact: (contact?: Contact) => void;
    // setSignUpContact: (contact?: Contact) => void;
    // setLoginContact: (contact?: Contact) => void;
    // setSelectedAccountNumber: (accountNumber: string) => void;
    // setSelectedTillNumber: (accountNumber: string) => void;
    // setSelectedTillName: (accountName: string) => void;
    // setSelectedPaybillNumber: (accountNumber: string) => void;
    // setSelectedPaybillAccount: (accountNumber: string) => void;
    // setSelectedNetwork: (network: string) => void;
    // setSelectedBankAccountNumber: (accountNumber: string) => void;
    // setSelectedBankRecipientName: (accountName: string) => void;
    // setSelectedBankName: (accountName: string) => void;
    // setSelectedBankCode: (accountNumber: string) => void;
    // clearContacts: () => void;
  };
}

export const useAppStore = create<StoreData>((set, get) => ({
  isLoading: false,
  tab: 'Home',
  globalError: null,
  globalSuccess: null,
//   fromAccount: '',
//   toAccount: '',
//   account: {},
//   channel: {},
//   otpChannel: '',
//   username: '',
//   token: '',
//   type: '',
//   transfer: {},
//   walletPayload: {},
//   contacts: [],
//   selectedContact: null,
//   requestMoneyContact: null,
//   airtimeContact: null,
//   favouriteAirtimeContact: null,
//   favouriteMoneyContact: null,
//   favouriteBankContact: null,
//   moneyTransferContact: null,
//   bankTransferContact: null,
//   signupContact: null,
//   loginContact: null,
//   selectedAccountNumber: '',
//   selectedTillNumber: '',
//   selectedTillName: '',
//   selectedPaybillAccount: '',
//   selectedPaybillNumber: '',
//   selectedNetwork: '',
//   selectedBankAccountNumber: '',
//   selectedBankRecipientName: '',
//   selectedBankName: '',
//   selectedBankCode: '',
  actions: {
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
    setGlobalError: (error: globalProps) => set({ globalError: error }),
    setGlobalSuccess: (success: globalProps) => set({ globalSuccess: success }),
    // setAccount: (account: AccountCardsProps2 | {}) => set({ account: account }),
    // setTransfer: (transfer: transferProps | {}) => set({ transfer: transfer }),
    // setFromAccount: (account: accountProps) => set({ fromAccount: account }),
    // setToAccount: (account: accountProps) => set({ toAccount: account }),
    // setWalletPayload: (payload: payoutPayload) => set({ walletPayload: payload }),
    // setChannel: (channel: ChannelModalCardsProps) => set({ channel: channel }),
    // setSelectedContact: (contact: any) => set({ selectedContact: contact }),
    // setContacts: (contacts) => set({ contacts }),
    // setRequestMoneyContact: (contact) => set({ requestMoneyContact: contact }),
    // setAirtimeContact: (contact) => set({ airtimeContact: contact }),
    // setFavouriteAirtimeContact: (contact) => set({ favouriteAirtimeContact: contact }),
    // setFavouriteMoneyContact: (contact) => set({ favouriteMoneyContact: contact }),
    // setFavouriteBankContact: (contact) => set({ favouriteBankContact: contact }),
    // setmoneyTransferContact: (contact) => set({ moneyTransferContact: contact }),
    // setbankTransferContact: (contact) => set({ bankTransferContact: contact }),
    // setSignUpContact: (contact) => set({ signupContact: contact }),
    // setLoginContact: (contact) => set({ loginContact: contact }),
    // setSelectedAccountNumber: (accountNumber: string) =>
    //   set({ selectedAccountNumber: accountNumber }),
    // setSelectedTillNumber: (accountNumber: string) => set({ selectedTillNumber: accountNumber }),
    // setSelectedTillName: (accountName: string) => set({ selectedTillName: accountName }),
    // setSelectedPaybillNumber: (accountNumber: string) =>
    //   set({ selectedPaybillNumber: accountNumber }),
    // setSelectedPaybillAccount: (accountNumber: string) =>
    //   set({ selectedPaybillAccount: accountNumber }),
    // setSelectedNetwork: (network: string) => set({ selectedNetwork: network }),
    // setSelectedBankAccountNumber: (accountNumber: string) =>
    //   set({ selectedBankAccountNumber: accountNumber }),
    // setSelectedBankRecipientName: (accountName: string) =>
    //   set({ selectedBankRecipientName: accountName }),
    // setSelectedBankName: (accountName: string) => set({ selectedBankName: accountName }),
    // setSelectedBankCode: (accountNumber: string) => set({ selectedBankCode: accountNumber }),
    // clearContacts: () =>
    //   set({
    //     requestMoneyContact: undefined,
    //     airtimeContact: undefined,
    //     favouriteAirtimeContact: undefined,
    //     favouriteMoneyContact: undefined,
    //     favouriteBankContact: undefined,
    //     moneyTransferContact: undefined,
    //     bankTransferContact: undefined,
    //     signupContact: undefined,
    //     loginContact: undefined,
    //   }),
    // setOtpChannel: (newChannel: string) => set({ otpChannel: newChannel }),
    // setUsername: (username: string) => set({ username }),
    // setToken: (token: string) => set({ token }),
    // setType: (type: string) => set({ type }),
  },
}));

export const useAppActions = () => useAppStore((state) => state.actions);

export const useAppState = () => useAppStore((state) => state);

export default useAppStore;
