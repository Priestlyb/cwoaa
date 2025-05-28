import React, { useState } from "react";
import "./book_mass.css";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./form.json";
import { PaystackButton } from "react-paystack";
import { axiosInstance } from "../../config";

function Bookmass() {
  const publicKey = "pk_test_fd8b4294d192d5f6289259b9314df59d8e55b671";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [intention, setIntention] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [uiMessage, setUiMessage] = useState({ type: "", text: "" });

  const handleSubmit = async () => {
    if (!name || !email || !date || !intention || !receipt) {
      setUiMessage({
        type: "error",
        text: "❗ Please fill in all fields and upload a receipt.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("bookMass_name", name);
    formData.append("bookMass_email", email);
    formData.append("date_for_mass", date);
    formData.append("mass_intention", intention);
    formData.append("receipt", receipt); // assuming one image only

    try {
      setIsSubmitting(true);
      const res = await axiosInstance.post("/book-mass", formData);

      if (res.status === 200) {
        setConfirmationMsg(
          "✅ Your mass booking has been submitted. Check your email for confirmation."
        );
        setUiMessage({ type: "success", text: "Booking submitted successfully!" });

        // Optionally clear the form
        setEmail("");
        setName("");
        setDate("");
        setIntention("");
        setReceipt(null);
        setTimeout(() => window.location.reload(), 3000);
      }
    } catch (error) {
      console.error(error);
      setUiMessage({
        type: "error",
        text: "❌ There was an error submitting your booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUiMessage({ type: "", text: "" }), 5000);
    }
  };

  const componentProps = {
    email,
    amount: 100000, // ₦1000 in kobo
    metadata: { name },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      setPaymentDone(true);
      setUiMessage({ type: "success", text: "✅ Payment successful!" });
      setTimeout(() => setUiMessage({ type: "", text: "" }), 10000);
    },
    onClose: () =>
      setUiMessage({ type: "info", text: "Payment process closed." }),
  };

  return (
    <div className="container mb-5 mt-5">
      <div className="row bm_row">
        <div className="row col-lg-6">
          <h1 className="fw-bold">Book Mass</h1>
          <p>
            Please make your payment to the below account or pay online using
            Paystack.
          </p>

          <strong>
            Bank: <span>FIDELITY BANK</span>
          </strong>
          <br />
          <strong>
            Account: <span>6060118805</span>
          </strong>
          <br />
          <strong>
            Account Name:{" "}
            <span>ABUJA ARCHDIOCESAN CATHOLIC WOMEN ORGANISATION</span>
          </strong>

          <div className="col-lg-6 mt-3">
            <div className="subscribe">
              <input
                type="text"
                name="name"
                placeholder="Family Name"
                className="subscribe-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Your e-mail"
                className="subscribe-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <label>Date For Mass</label>
                <input
                  className="subscribe-input"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {paymentDone && (
                <>
                  <div>
                    <label>Upload Receipt</label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="subscribe-input"
                      onChange={(e) => setReceipt(e.target.files[0])}
                    />
                  </div>
                  <textarea
                    placeholder="Mass Intention"
                    className="subscribe-textarea"
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                  />
                </>
              )}

              <div className="submit-btn mt-3">
                {!paymentDone ? (
                  <PaystackButton className="bm_btn" {...componentProps} />
                ) : (
                  <button
                    className="bm_btn"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <span className="bm_btn-text-one">
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </span>
                    <span className="bm_btn-text-two">
                      {isSubmitting ? "Wait..." : "Sent!"}
                    </span>
                  </button>
                )}
              </div>

              {/* UI Message Box */}
              {uiMessage.text && (
                <div
                  className={`alert mt-3 ${
                    uiMessage.type === "error"
                      ? "alert-danger"
                      : uiMessage.type === "success"
                      ? "alert-success"
                      : "alert-info"
                  }`}
                >
                  {uiMessage.text}
                </div>
              )}

              {/* Confirmation Message */}
              {confirmationMsg && (
                <p className="mt-3 text-success fw-bold">{confirmationMsg}</p>
              )}
            </div>
          </div>
        </div>

        <div
          className="col-lg-6 bm_col_right"
          data-aos="zoom-in"
          data-aos-duration="900"
        >
          <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
}

export default Bookmass;
