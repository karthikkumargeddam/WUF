export default function ShippingPolicy() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-zinc-950 dark:text-white">
                Shipping Policy
            </h1>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">⏱️ Dispatch Times</h2>
                    <p>
                        Our standard dispatch time is 2 working days (Monday to Friday), excluding UK bank holidays and national holidays, from the time payment is received.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Standard (Economy) Delivery</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Free delivery on all orders over £150</li>
                        <li>Delivery aim: 3–4 working days from order placement</li>
                        <li>Applies to non-customised goods only</li>
                        <li>Subject to stock availability</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Express Delivery (1–2 Working Days)</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Available on request for non-customised items</li>
                        <li>Not available for any products involving personalisation (print or embroidery)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">🧵 CUSTOMISED ORDERS – LEAD TIMES</h2>
                    <p className="font-semibold">Standard Lead Time:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>10–15 working days from order confirmation</li>
                    </ul>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
                        <p className="font-semibold">🟡 Please note:</p>
                        <p className="mt-2">If artwork or logo setup has already started, your order is no longer eligible for cancellation without fees:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>30% deduction from the order total</li>
                            <li>£15 logo digitalisation fee, if applicable</li>
                        </ul>
                    </div>

                    <p className="mt-4">
                        If a logo or artwork has already been prepared or emailed, full refunds are not available, even if the product hasn't yet entered production.
                    </p>
                    <p>
                        Returning customers do not need to approve the logo again, unless uploading a new design or text.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Shipping Times UK Delivery</h2>
                    <p>
                        All items are shipped via Royal Mail 48hr tracked delivery. It can take up to 3 working days for the item to be delivered from the time it has been dispatched.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">🚚 Shipping Policy – UK Only</h2>
                    <p className="font-semibold">We currently only ship orders within the United Kingdom.</p>
                    <p className="mt-2">
                        Unfortunately, we do not offer international shipping at this time. Orders placed with a delivery address outside the UK will be cancelled and refunded.
                    </p>
                </section>

                <section className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-3">📞 Questions about shipping?</h3>
                    <p>
                        Contact us at <a href="mailto:support@wearunifab.com" className="text-blue-600 hover:underline font-semibold">support@wearunifab.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
