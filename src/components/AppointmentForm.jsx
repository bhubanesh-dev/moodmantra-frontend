import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { createPortal } from "react-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaUserMd,
  FaShieldAlt,
  FaCheckCircle,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

const AppointmentForm = ({
  isOpen,
  onClose,
  docInfo,
  selectedDate,
  selectedTime,
  onSuccess,
}) => {
  const { token, userData, backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    reasonForVisit: "",
    sessionType: "Online",
    communicationMethod: "Zoom",
    briefNotes: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
    consentGiven: false,
  });

  const [loading, setLoading] = useState(false);
  const [otherReason, setOtherReason] = useState("");

  const reasonsForVisit = [
    "Anxiety",
    "Depression",
    "Relationship Issues",
    "Stress Management",
    "Trauma/PTSD",
    "Other",
  ];

  const communicationMethods = ["Zoom", "Google Meet", "Phone Call"];

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consentGiven) {
      toast.error(
        "Please agree to the cancellation policy and consent to telehealth"
      );
      return;
    }

    if (!formData.reasonForVisit) {
      toast.error("Please select a reason for visit");
      return;
    }

    if (formData.sessionType === "Online" && !formData.communicationMethod) {
      toast.error("Please select a communication method for online sessions");
      return;
    }

    setLoading(true);

    try {
      const date = selectedDate;
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      const slotDate = day + "/" + month + "/" + year;

      const appointmentData = {
        docId: docInfo._id,
        slotDate,
        slotTime: selectedTime,
        reasonForVisit:
          formData.reasonForVisit === "Other"
            ? otherReason
            : formData.reasonForVisit,
        sessionType: formData.sessionType,
        communicationMethod:
          formData.sessionType === "Online"
            ? formData.communicationMethod
            : undefined,
        briefNotes: formData.briefNotes,
        emergencyContact: formData.emergencyContact,
        consentGiven: formData.consentGiven,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        appointmentData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        onClose();

        // Redirect to payment for the temporary reservation
        try {
          const paymentResponse = await axios.post(
            `${backendUrl}/api/user/payment-razorpay`,
            { tempReservationId: data.tempReservationId },
            { headers: { token } }
          );

          if (paymentResponse.data.success) {
            // Initialize Razorpay payment
            const options = {
              key: import.meta.env.VITE_RAZORPAY_KEY_ID,
              amount: paymentResponse.data.order.amount,
              currency: paymentResponse.data.order.currency,
              name: "Appointment Payment",
              description: "Appointment Payment",
              order_id: paymentResponse.data.order.id,
              receipt: paymentResponse.data.order.receipt,
              handler: async (response) => {
                try {
                  const verifyResponse = await axios.post(
                    `${backendUrl}/api/user/verify-razorpay`,
                    response,
                    { headers: { token } }
                  );
                  if (verifyResponse.data.success) {
                    toast.success(verifyResponse.data.message);
                    onSuccess();
                  }
                } catch (error) {
                  console.log(error);
                  toast.error(
                    error.response?.data?.message ||
                      "Payment verification failed"
                  );
                }
              },
              modal: {
                ondismiss: function () {
                  toast.info("Payment cancelled");
                  // Clean up the temporary reservation on payment cancellation
                  axios
                    .post(
                      `${backendUrl}/api/user/cancel-payment`,
                      { tempReservationId: data.tempReservationId },
                      { headers: { token } }
                    )
                    .catch((error) => {
                      console.log("Error cleaning up reservation:", error);
                    });
                },
              },
              prefill: {
                name: userData?.name || "Patient Name",
                email: userData?.email || "patient@example.com",
              },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response) {
              toast.error("Payment failed");
              // Clean up the temporary reservation on payment failure
              axios
                .post(
                  `${backendUrl}/api/user/cancel-payment`,
                  { tempReservationId: data.tempReservationId },
                  { headers: { token } }
                )
                .catch((error) => {
                  console.log("Error cleaning up reservation:", error);
                });
            });
            rzp.open();
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to initiate payment. Please try again.");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[99999] p-4"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-white rounded-t-3xl p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Appointment Details
                </h2>
                <p className="text-gray-600">
                  Please provide additional information for your appointment
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Appointment Summary */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FaUserMd className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {docInfo.name}
                  </h3>
                  <p className="text-gray-600">{docInfo.speciality}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-600" />
                  <span className="text-gray-700">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-purple-600" />
                  <span className="text-gray-700">{selectedTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 overflow-y-auto flex-1"
          >
            {/* Personal Details (Auto-filled) */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaUser className="text-purple-600" />
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData?.name || ""}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData?.email || ""}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={userData?.phone || "Not provided"}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <input
                    type="text"
                    value={userData?.gender || "Not selected"}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Reason for Visit */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Reason for Visit <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.reasonForVisit}
                onChange={(e) =>
                  handleInputChange("reasonForVisit", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select a reason</option>
                {reasonsForVisit.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              {formData.reasonForVisit === "Other" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please specify
                  </label>
                  <input
                    type="text"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please describe your reason for visit"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              )}
            </div>

            {/* Session Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Session Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="sessionType"
                    value="Online"
                    checked={formData.sessionType === "Online"}
                    onChange={(e) =>
                      handleInputChange("sessionType", e.target.value)
                    }
                    className="mr-3 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-3">
                    <FaVideo className="text-purple-600 text-xl" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Online (Video Call)
                      </div>
                      <div className="text-sm text-gray-500">
                        Secure video consultation
                      </div>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="sessionType"
                    value="In-Person"
                    checked={formData.sessionType === "In-Person"}
                    onChange={(e) =>
                      handleInputChange("sessionType", e.target.value)
                    }
                    className="mr-3 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-3">
                    <FaUserMd className="text-purple-600 text-xl" />
                    <div>
                      <div className="font-medium text-gray-900">In-Person</div>
                      <div className="text-sm text-gray-500">
                        Face-to-face consultation
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Communication Method (if Online) */}
            {formData.sessionType === "Online" && (
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Preferred Communication Method{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {communicationMethods.map((method) => (
                    <label
                      key={method}
                      className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="communicationMethod"
                        value={method}
                        checked={formData.communicationMethod === method}
                        onChange={(e) =>
                          handleInputChange(
                            "communicationMethod",
                            e.target.value
                          )
                        }
                        className="mr-3 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="font-medium text-gray-900">{method}</div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Brief Notes */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Brief Notes (Optional)
              </label>
              <textarea
                value={formData.briefNotes}
                onChange={(e) =>
                  handleInputChange("briefNotes", e.target.value)
                }
                placeholder="Anything you'd like the therapist to know beforehand?"
                maxLength={200}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <div className="text-sm text-gray-500 mt-2 text-right">
                {formData.briefNotes.length}/200 characters
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Emergency Contact (Optional but recommended)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact.name}
                    onChange={(e) =>
                      handleInputChange("emergencyContact.name", e.target.value)
                    }
                    placeholder="Emergency contact name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={(e) =>
                      handleInputChange(
                        "emergencyContact.phone",
                        e.target.value
                      )
                    }
                    placeholder="Emergency contact phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact.relationship}
                    onChange={(e) =>
                      handleInputChange(
                        "emergencyContact.relationship",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Spouse, Parent"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentGiven}
                  onChange={(e) =>
                    handleInputChange("consentGiven", e.target.checked)
                  }
                  className="mt-1 text-purple-600 focus:ring-purple-500"
                  required
                />
                <div className="text-sm text-gray-700">
                  <span className="font-medium">I agree to the </span>
                  <a
                    href="/cancellation-policy"
                    target="_blank"
                    className="text-purple-600 hover:underline font-medium"
                  >
                    cancellation policy
                  </a>
                  <span className="font-medium">
                    {" "}
                    and consent to telehealth if applicable.
                  </span>
                  <span className="text-red-500"> *</span>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 pb-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.consentGiven}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  loading || !formData.consentGiven
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Booking...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Confirm Appointment
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default AppointmentForm;
