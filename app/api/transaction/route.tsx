
import { NextRequest, NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

export async function POST(req: NextRequest) {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false, 
            serverKey: process.env.MIDTRANS_SERVER_KEY as string,
            clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
        });

        const { transactionDetails, customerDetails, itemDetails } = await req.json();

        const parameter = {
            transaction_details: transactionDetails,
            customer_details: customerDetails,
            item_details: itemDetails,
            credit_card: {
            secure: true,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        return NextResponse.json({ redirect_url: transaction.redirect_url }, { status: 200 });
    } catch (error) {
    console.error('Transaction Error:', error);
    return NextResponse.json({ message: 'Transaction failed', error }, { status: 500 });
    }
}
