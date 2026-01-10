export default function RefundPolicy() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-zinc-950 dark:text-white">
                Refund Policy
            </h1>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
                <p className="text-lg">
                    We have a 14-day return policy, which means you have 14 days after receiving your item to request a return.
                </p>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">📦 Eligibility for Return</h2>
                    <p>You may return any item from our standard range within 14 days of delivery, provided it meets the following conditions:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Item is unworn, unused, and unwashed</li>
                        <li>Returned in its original packaging with all labels intact</li>
                        <li>Free from any odours, stains, or damage (e.g. smoke, food, pets)</li>
                        <li>A copy of your order and reason for return is included</li>
                    </ul>
                    <p className="mt-4">🔁 We do not offer exchanges. To get a different size or item, place a new order through our website.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">🚫 Non-Returnable Items</h2>
                    <p>Unless faulty or incorrectly supplied, we cannot accept returns for:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Items that have been embroidered, printed, or customised</li>
                        <li>Items assembled or sourced to your specific requirements</li>
                        <li>Items not part of our standard website range (e.g. special colours, extended sizing)</li>
                    </ul>
                    <p className="mt-4">
                        🛠️ If a customised item is found to be faulty or misprinted, UniFab CustomWear reserves the right to correct or remake the item before issuing any refund, at our sole discretion.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">🔁 HOW TO RETURN AN ITEM</h2>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Ensure the item meets all return conditions</li>
                        <li>Package the item securely, including:
                            <ul className="list-disc pl-6 mt-2">
                                <li>Original order confirmation</li>
                                <li>Written reason for return</li>
                            </ul>
                        </li>
                        <li>Send to:
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg mt-2">
                                <p className="font-semibold">Returns Dept</p>
                                <p>UniFab</p>
                                <p>1 Franklin Court</p>
                                <p>Brook Road</p>
                                <p>Borehamwood, Hertfordshire</p>
                                <p>WD6 5FL</p>
                            </div>
                        </li>
                    </ol>
                    <p className="mt-4">📦 Returns are at your expense. We do not provide return labels.</p>
                    <p>We will cover return carriage costs for exchanges or refunds if the return is due to our error or the item is faulty.</p>
                    <p>Please allow up to 15 working days for returns to be processed.</p>
                    <p className="mt-4">
                        To start a return, you can contact us at <a href="mailto:support@wearunifab.com" className="text-blue-600 hover:underline">support@wearunifab.com</a>.
                        Items sent back to us without first requesting a return will not be accepted.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Cancellations</h2>
                    <p>Orders cancelled without a valid reason more than 4 hours after purchase will be subject to the following deductions:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>30% of the original purchase amount</li>
                        <li>A £15 digitisation fee (if a logo has been processed)</li>
                    </ul>
                    <p className="mt-4">
                        If your logo file has already been received via email, cancellation may still be processed; however, a full refund will not be issued.
                        This is due to non-refundable digitisation work that have already commenced.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Damages and Issues</h2>
                    <p>
                        Please inspect your order upon reception and contact us immediately at <a href="mailto:info@wearunifab.com" className="text-blue-600 hover:underline">info@wearunifab.com</a> if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">💳 REFUNDS</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>We will notify you once we've received and inspected your return, and let you know if the refund was approved or not</li>
                        <li>Refunds are processed within 10 working days of receiving your return</li>
                        <li>Once processed, please allow 2–5 working days for funds to appear</li>
                        <li>Please remember it can take some time for your bank or credit card company to process and post the refund too</li>
                        <li>Refunds will be issued to the same payment method used at the time of purchase</li>
                        <li>Returns during busy periods may take up to 15 working days</li>
                        <li>If more than 15 business days have passed since we've approved your return, please contact us at <a href="mailto:support@wearunifab.com" className="text-blue-600 hover:underline">support@wearunifab.com</a></li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-bold mt-6 mb-3">Exceptions / non-returnable items</h3>
                    <p>Unfortunately, we cannot accept returns on sale items or gift cards.</p>
                </section>

                <section>
                    <h3 className="text-xl font-bold mt-6 mb-3">Exchanges</h3>
                    <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">📦 DELIVERY CLAIMS & SHORTAGES</h2>
                    <p>All claims for damage, shortages or non-delivery must be:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Reported within 48 hours by phone, and</li>
                        <li>Confirmed in writing within 3 working days of dispatch</li>
                    </ul>
                    <p className="mt-4">All claims must be supported by:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>The courier's Proof of Delivery (POD)</li>
                    </ul>
                    <p className="mt-4">When your delivery arrives, please check the parcel and mark the delivery note (or courier's device) if there are any issues. Use one of the following terms:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>"Unchecked" – If you didn't open the parcel at the time of delivery</li>
                        <li>"Damaged" – If the packaging or items are visibly damaged</li>
                        <li>"Short" – If any items are missing from your order</li>
                    </ul>
                    <p className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        ⚠️ These notes help support any claim you may need to make. Without them, we or the courier may not be able to investigate or offer compensation.
                    </p>
                    <p className="mt-4">
                        🟡 We cannot be held responsible for lost or damaged parcels if you request the courier to leave them in a "safe place" (e.g. behind bin, in shed, etc.).
                    </p>
                    <p>We recommend all deliveries are checked in carefully at arrival to confirm all items have been received correctly.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">⚖️ LEGAL NOTICE</h2>
                    <p>This policy does not affect your statutory rights under the Consumer Rights Act 2015 or applicable UK law.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">📞 Need Help?</h2>
                    <p>
                        If you're unsure about your eligibility for return, delivery timelines, or order status, please contact:
                    </p>
                    <p className="mt-2">
                        📧 <a href="mailto:support@wearunifab.com" className="text-blue-600 hover:underline font-semibold">support@wearunifab.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
