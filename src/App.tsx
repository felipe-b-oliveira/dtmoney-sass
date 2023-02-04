import {useState} from "react";
import {Header} from "./components/Header";
import {Dashboard} from "./components/Dashboard";
import {NewTransactionModal} from "./components/NewTransactionModal";

import {GlobalStyle} from "./styles/global";
import {TransactionsProvider} from "./hooks/useTransactions";

/**
* Author: Felipe Oliveira
* Description: Temporary implementation of props for study purposes. In future the component will be reorganized and
* the props will be passed to buttton using React Context API.
*/
export function App() {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    // React naming function convention: 
    // When a function indicates a user interation, we uses the 'handle' before function name.
    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    // React naming function convention:
    // When a function indicates a user interation, we uses the 'handle' before function name.
    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

    return (
        <TransactionsProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

            <Dashboard />

            <NewTransactionModal
                isOpen={isNewTransactionModalOpen}
                onRequestClose={handleCloseNewTransactionModal}
            />

            <GlobalStyle />
        </TransactionsProvider>
    );
}
