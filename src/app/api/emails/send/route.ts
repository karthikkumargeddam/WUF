import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/components/emails/OrderConfirmationEmail';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    try {
        const { to, orderData } = await req.json();

        // If no API key or resend client, log and return success (simulation mode)
        if (!resend || !process.env.RESEND_API_KEY) {
            console.log("----------------------------------------");
            console.log("📧 [SIMULATION] Email would be sent to:", to);
            console.log("📝 [SIMULATION] Subject:", `Order Confirmation #${orderData.orderId}`);
            console.log("----------------------------------------");
            return NextResponse.json({ success: true, mode: 'simulation' });
        }

        const data = await resend.emails.send({
            from: 'Wearunifab <onboarding@resend.dev>', // SWITCHED TO DEFAULT DOMAIN FOR TESTING
            to: [to], // Note: You need a verified domain to use custom 'from', using generic restricted domain for now if unmatched
            // For testing without domain: 'onboarding@resend.dev'
            to: [to],
            subject: `Order Confirmation #${orderData.orderId} - Wearunifab`,
            react: OrderConfirmationEmail({
                orderId: orderData.orderId,
                customerName: orderData.customerName,
                items: orderData.items,
                total: orderData.total,
                shippingAddress: orderData.shippingAddress
            }),
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error("Email API Error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
