import * as React from 'react';

interface OrderConfirmationEmailProps {
    orderId: string;
    customerName: string;
    items: Array<{
        title: string;
        quantity: number;
        price: number;
        variantTitle?: string;
    }>;
    total: number;
    shippingAddress: {
        street: string;
        city: string;
        zip: string;
        country: string;
    };
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
    orderId,
    customerName,
    items,
    total,
    shippingAddress,
}) => (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f5', padding: '40px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', padding: '40px', border: '1px solid #e4e4e7' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#09090b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0' }}>
                    Order Confirmed
                </h1>
                <p style={{ marginTop: '8px', color: '#71717a', fontSize: '14px' }}>
                    Reference ID: <span style={{ color: '#09090b', fontWeight: 'bold' }}>#{orderId}</span>
                </p>
            </div>

            {/* Greeting */}
            <p style={{ color: '#09090b', fontSize: '16px', lineHeight: '1.5', marginBottom: '24px' }}>
                Hello <strong>{customerName}</strong>,
                <br />
                We have received your procurement order. Our logistics team is currently processing your items for dispatch.
            </p>

            {/* Order Items */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#a1a1aa', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #f4f4f5', paddingBottom: '8px' }}>
                    Manifest
                </h2>
                {items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #fafafa', paddingBottom: '12px' }}>
                        <div>
                            <p style={{ margin: '0', color: '#09090b', fontWeight: 'bold', fontSize: '14px' }}>{item.title}</p>
                            <p style={{ margin: '4px 0 0 0', color: '#71717a', fontSize: '12px' }}>
                                Qty: {item.quantity} {item.variantTitle ? `• ${item.variantTitle}` : ''}
                            </p>
                        </div>
                        <p style={{ margin: '0', color: '#09090b', fontWeight: 'bold', fontSize: '14px' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div style={{ borderTop: '2px solid #09090b', paddingTop: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ margin: '0', fontSize: '16px', fontWeight: '900', textTransform: 'uppercase', color: '#09090b' }}>Total Payable</p>
                    <p style={{ margin: '0', fontSize: '20px', fontWeight: '900', color: '#09090b' }}>${total.toFixed(2)}</p>
                </div>
            </div>

            {/* Shipping */}
            <div style={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', color: '#a1a1aa', letterSpacing: '0.1em' }}>
                    Shipping Destination
                </h3>
                <p style={{ margin: '0', color: '#09090b', fontSize: '14px', lineHeight: '1.6' }}>
                    {shippingAddress.street}<br />
                    {shippingAddress.city}, {shippingAddress.zip}<br />
                    {shippingAddress.country}
                </p>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid #f4f4f5', paddingTop: '20px' }}>
                <p style={{ color: '#a1a1aa', fontSize: '12px', margin: '0' }}>
                    © 2026 Wearunifab Replica. All rights reserved.
                </p>
            </div>
        </div>
    </div>
);

export default OrderConfirmationEmail;
