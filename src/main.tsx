import React from "react";
import ReactDOM from "react-dom/client";
import {createServer, Model} from "miragejs";
import {App} from "./App";

createServer({
    models: {
        transaction: Model,
    },

    seeds(server) {
        server.db.loadData({
            transactions: [
                {
                    id: 1,
                    title: 'Feelancer',
                    type: 'deposit',
                    amount: 500,
                    category: 'Dev',
                    createdAt: new Date('2021-02-12 09:00:00'),
                },
                {
                    id: 2,
                    title: 'Pizza',
                    type: 'withdraw',
                    amount: 100,
                    category: 'Food',
                    createdAt: new Date('2021-02-13 19:00:00'),
                }
            ]
        })
    },

    routes() {
        this.namespace = 'api';

        this.get('/transactions', () => {
            return this.schema.all('transaction')
        })

        this.post('/transactions', (schema, request) => {
            const data = JSON.parse(request.requestBody);

            return schema.create('transaction', data);
        })
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
