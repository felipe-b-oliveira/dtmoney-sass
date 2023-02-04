import {createContext, useEffect, useState, ReactNode, useContext} from 'react';
import {api} from '../services/api';

interface Transaction {
    id: number;
    title: string;
    type: string;
    amount: number;
    category: string;
    createdAt: string;
}

// Forms of declare TransactionInput

// interface TransactionInput {
//     title: string;
//     type: string;
//     amount: number;
//     category: string;
// }

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// Allows children components inside TransactionsProvider component. (see App.tsx)
interface TransactionProviderProps {
    children: ReactNode;
}

// Allows to pass createTransation method on Context.Provider
interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// Hack to Typescript not to be throwing errors about default value.
// TODO: See if the community already have a solution for this.
const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        
        const {transaction} = response.data;

        // React imutability concept, we copy all array and add the new information in the end of it.
        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

// Exporting a custom hooks
export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}
