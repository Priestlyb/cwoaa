import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config";
import Lottie from "lottie-react";
import Search from "../pages/events/search.json";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const BookingAdmin = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [downloadMessage, setDownloadMessage] = useState("");

    // Downloading Button
    const downloadNameList = () => {
        setDownloadMessage(""); // Clear previous message

        const today = new Date();
        const todayString = today.toLocaleDateString();

        const todayBookings = bookings.filter((b) => {
            const bookingDate = new Date(b.date_for_mass).toLocaleDateString();
            return bookingDate === todayString;
        });

        if (todayBookings.length === 0) {
            setDownloadMessage("No bookings found for today.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`Names for Mass on ${todayString}`, 14, 15);

        const head = [["#", "Name", "Email", "Intention"]];
        const body = [];
        todayBookings.forEach((b, i) => {
            body.push([i + 1, b.bookMass_name, b.bookMass_email, b.mass_intention]);
        });

        autoTable(doc, {
            head,
            body,
            startY: 20,
            styles: { fontSize: 12 },
            headStyles: { fillColor: "#07176C" },
        });

        doc.save(`Mass_Names_${todayString}.pdf`);
        setDownloadMessage("PDF downloaded successfully, Wait for download.");
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 10;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axiosInstance.get("/bookings");
                setBookings(res.data || []);
                setFilteredBookings(res.data || []);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = bookings.filter(
            (b) =>
                b.bookMass_name.toLowerCase().includes(lowerSearch) ||
                b.bookMass_email.toLowerCase().includes(lowerSearch) ||
                b.mass_intention.toLowerCase().includes(lowerSearch)
        );

        setFilteredBookings(filtered);
        setCurrentPage(1); // reset to page 1 on search
    }, [search, bookings]);

    // Pagination logic
    const indexOfLast = currentPage * bookingsPerPage;
    const indexOfFirst = indexOfLast - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <p>Loading bookings...</p>;

    return (
        <div className="row mt-5" id="BookedMasses" style={{ padding: "0 1rem" }}>
            {/* Search Bar */}
            <div
                className="col-lg-12 mb-5"
                data-aos="fade-right"
            >
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Lottie animationData={Search} loop style={{ width: 30, height: 30 }} />

                    <input
                        type="text"
                        placeholder="Search by name, email or intention"
                        className="event_search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <br />
                {downloadMessage && (
                    <div className="alert alert-info mt-3">
                        {downloadMessage}
                    </div>
                )}
                <button
                    onClick={downloadNameList}
                    className="btn btn-dark mb-4"
                    style={{ width: "fit-content" }}
                >
                    📄 Download Names as PDF
                </button>

            </div>

            {currentBookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <>
                    {/* Cards container */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {currentBookings.map((booking, index) => (
                            <div
                                key={booking._id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "12px",
                                    padding: "1rem",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                    backgroundColor: "#fff",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.03)";
                                    e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                                }}
                            >
                                {/* Image (replace 'booking.imageUrl' with your actual image field) */}
                                {booking.bookMass_img?.length > 0 ? (
                                    <img
                                        src={booking.bookMass_img[0].url}
                                        alt={`${booking.bookMass_name} booking`}
                                        style={{
                                            width: "100%",
                                            height: "160px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            marginBottom: "1rem",
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "160px",
                                            backgroundColor: "#e0e0e0",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#888",
                                            marginBottom: "1rem",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        No image available
                                    </div>
                                )}


                                <h5 style={{ color: "#0d6efd", marginBottom: "0.5rem" }}>
                                    {indexOfFirst + index + 1}. {booking.bookMass_name}
                                </h5>

                                <p>
                                    <strong style={{ color: "#0d6efd" }}>Email:</strong> {booking.bookMass_email}
                                </p>
                                <p>
                                    <strong style={{ color: "#0d6efd" }}>Phone:</strong> N/A
                                </p>
                                <p>
                                    <strong style={{ color: "#0d6efd" }}>Prayer Intention:</strong>{" "}
                                    {booking.mass_intention}
                                </p>
                                <p>
                                    <strong style={{ color: "#0d6efd" }}>Date for Mass:</strong>{" "}
                                    {new Date(booking.date_for_mass).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center flex-wrap" style={{ gap: "0.25rem" }}>
                            {[...Array(totalPages).keys()].map((n) => (
                                <li
                                    key={n + 1}
                                    className={`page-item ${currentPage === n + 1 ? "active" : ""}`}
                                    style={{ margin: "0.25rem" }}
                                >
                                    <button
                                        onClick={() => paginate(n + 1)}
                                        className="page-link"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {n + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default BookingAdmin;
