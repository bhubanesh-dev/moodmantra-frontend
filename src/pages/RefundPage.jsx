import React from "react";

const RefundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10 border border-purple-100 space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">
          Consultation Sessions for{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Raska Mon
          </span>
        </h1>

        <section className="text-gray-700 leading-relaxed space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Payments
          </h2>
          <p>
            All applicable payments must be made prior to availing Raska Mon
            services. Session bookings will not be confirmed until payment is
            received by Raska Mon. If accessing services through a third-party
            or organization beyond included sessions, bookings will not be
            confirmed until payment is received. All purchases expire one year
            from the date of purchase.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Fee Information
          </h2>
          <p>
            For individual users, the fee per session varies based on the
            selected Psychological Wellness Professional.
          </p>
          <p>
            For users accessing sessions through their organization beyond
            included sessions, the fee depends on the selected Professional and
            specific organizational arrangements.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Cancellation, Reschedule, and Refund
          </h2>
          <p>
            As an online psychological wellness platform, Raska Mon aims to
            maximize user satisfaction with flexible cancellation and refund
            policies.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-4">
            Session Reschedule
          </h3>
          <p>
            Raska Mon allows users to reschedule sessions based on the timing of
            the request relative to the scheduled session:
          </p>

          <p>Initiation of Session Reschedule</p>
          <p>Action</p>

          <ul className="list-disc list-inside mt-2">
            <li>At least 24 hours in advance-- Free Reschedule</li>
            <li>
              Within 24 hours of the session---Requires new booking and payment
              if applicable
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-4">
            Session Cancellation and Refund Cancellation by the User
          </h3>
          <p>Users can cancel sessions and claim a refund via:</p>
          <ul className="list-disc list-inside">
            <li>Session Refund: Credit to the customers account.</li>
            <li>
              Cash Refund: Refund to the original payment method, if payment was
              made.
            </li>
          </ul>

          <p>A cancellation service charge applies as follows :</p>
          <ul className="list-disc list-inside">
            <li>
              At least 24 hours in advance: Rs 100 cancellation service charge;
              remaining amount refunded (100% Session Refund or Cash Refund
              after deduction).
            </li>
            <li>
              Within 24 hours of the session: 15% of the amount paid as a
              cancellation service charge; remaining amount refunded (if
              applicable).
            </li>
          </ul>

          <p>
            For cancellations at least 24 hours in advance (after Rs 100
            charge):
          </p>
          <ul className="list-disc list-inside">
            <li>Book a new session with the same expert at cancellation.</li>
            <li>
              Receive a session credit (valid for 1 year from purchase) after
              the charge.
            </li>
            <li>
              Request a cash refund (after Rs 100 deduction) by writing to{" "}
              <a
                href="mailto:support@raskamon.com"
                className="text-purple-600 underline"
              >
                support@raskamon.com
              </a>
              .
            </li>
          </ul>

          <p>For cancellations within 24 hours (after 15% charge):</p>
          <ul className="list-disc list-inside">
            <li>
              Remaining amount may be credited as a session credit or refunded
              as cash (if payment was made) by writing to{" "}
              <a
                href="mailto:support@raskamon.com"
                className="text-purple-600 underline"
              >
                support@raskamon.com
              </a>
              .
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-4">
            Cancellation by Raska Mon Expert
          </h3>
          <p>
            If a session is cancelled by the expert, users receive a session
            credit, regardless of timing. This credit can be used within its
            validity period to:
          </p>
          <ul className="list-disc list-inside">
            <li>Extend by 30 days if cancelled within 30 days of expiry.</li>
            <li>
              Request a cash refund (if payment was made) by contacting{" "}
              <a
                href="mailto:support@raskamon.com"
                className="text-purple-600 underline"
              >
                support@raskamon.com
              </a>
              .
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-4">
            Session Delayed/Technical Issues
          </h3>
          <p>
            If a session is incomplete due to unforeseen issues on Raska Mon’s
            end, users may write to{" "}
            <a
              href="mailto:support@raskamon.com"
              className="text-purple-600 underline"
            >
              support@raskamon.com
            </a>
            . Refunds will be assessed case-by-case
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Fee Information
          </h2>
          <p>
            Users can subscribe to Premium plans (Plus plan for self-help, Pro
            plan for professional support). Plans are available on monthly,
            quarterly, or annual billing cycles, managed entirely by respective
            platforms or website admin. Payments are due at the start of each
            cycle (monthly, quarterly, or annually).
          </p>
          <p>
            Introductory discounts (first cycle only) and free trials (once per
            user, not for Pro) may be offered. Refunds, if applicable, are
            handled by Google Play Store or Apple App Store (if platform is
            available) per their policies. For cancellation issues or refund
            queries, contact{" "}
            <a
              href="mailto:support@raskamon.com"
              className="text-purple-600 underline"
            >
              support@raskamon.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPage;
