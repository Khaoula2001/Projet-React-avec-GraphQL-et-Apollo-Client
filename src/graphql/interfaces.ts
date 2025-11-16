import { TypeCompte, TypeTransaction } from './types';

export interface Compte {
    id: string;
    solde: number;
    dateCreation: string;
    type: TypeCompte;
}

export interface Transaction {
    id: string;
    type: TypeTransaction;
    montant: number;
    date: string;
    compte: Compte;
}

export interface SoldeStats {
    count: number;
    sum: number;
    average: number;
}

export interface TransactionStats {
    count: number;
    sumDepots: number;
    sumRetraits: number;
}

export interface CompteRequest {
    solde: number;
    type: TypeCompte;
}

export interface TransactionRequest {
    type: TypeTransaction;
    montant: number;
    compteId: string;
    date?: string;
}
