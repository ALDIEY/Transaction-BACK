import axios from 'axios';

const API_BASE_URL = 'http://votre_adresse_api/';

export const TransactionService = {
  depot: async (transaction: TransactionInfo) => {
    return axios.post(`${API_BASE_URL}depot`, transaction);
  },
  retrait: async (transaction: TransactionInfo) => {
    return axios.post(`${API_BASE_URL}retrait`, transaction);
  },
  transfert: async (transaction: TransactionInfo) => {
    return axios.post(`${API_BASE_URL}transfert`, transaction);
  },
};
