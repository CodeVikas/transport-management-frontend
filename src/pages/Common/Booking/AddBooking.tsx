import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  createBooking,
  fetchByIdBooking,
  updateBooking,
} from "../../../Store/feature/Booking/BookingThunk.js";
import {
  fetchCustomer,
  fetchDriver,
} from "../../../Store/feature/User/UserThunk.js";
import { ArrowLeft } from "lucide-react";

interface Booking {
  id?: string;
  pickupLocation: string;
  dropLocation: string;
  bookingDate: string;
  cargoDescription?: string;
  weightKg: number;
  volumeM3?: number;
  estimatedCost?: number;
}

export default function AddBookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingId = location?.state?.bookingId;
  const { customer, status } = useSelector((state) => state.users);
  const { driver } = useSelector((state) => state.users);
  console.log("Customers:", driver);
  const [bookingData, setBookingData] = useState<Booking | null>(null);

  useEffect(() => {
    dispatch(fetchCustomer());
    dispatch(fetchDriver());
  }, [dispatch]);
  useEffect(() => {
    if (bookingId) {
      dispatch(fetchByIdBooking(bookingId)).then((data) => {
        setBookingData(data.payload.data);
      });
    }
    dispatch(fetchCustomer());
  }, [bookingId, dispatch]);

  const initialValues: Booking = {
    id: bookingData?._id || "",
    pickupLocation: bookingData?.pickupLocation || "",
    dropLocation: bookingData?.dropLocation || "",
    bookingDate: bookingData?.bookingDate
      ? bookingData.bookingDate.split("T")[0]
      : "",
    cargoDescription: bookingData?.cargoDescription || "",
    weightKg: bookingData?.weightKg || 0,
    volumeM3: bookingData?.volumeM3 || 0,
    estimatedCost: bookingData?.estimatedCost || 0,
    customer: bookingData?.customer || '',
    driver: bookingData?.driver || '',
  };

  const validationSchema = Yup.object({
    pickupLocation: Yup.string().required("Pickup Location is required"),
    dropLocation: Yup.string().required("Drop Location is required"),
    bookingDate: Yup.date().required("Booking Date is required"),
    cargoDescription: Yup.string(),
    weightKg: Yup.number()
      .required("Weight is required")
      .positive("Weight must be positive"),
    volumeM3: Yup.number().positive("Volume must be positive").nullable(),
    estimatedCost: Yup.number()
      .positive("Estimated Cost must be positive")
      .nullable(),
    customer: Yup.string()
      .required("Customer Name is required")
      .trim()
      .min(1, "Customer Name cannot be empty"),
  });

  const handleSubmit = async (values: Booking) => {
    if (bookingId) {
      await dispatch(updateBooking({ id: bookingId, ...values })).then(
        (res) => {
          if (res.meta.requestStatus === "fulfilled")
            navigate("/manager/booking/list");
        }
      );
    } else {
      await dispatch(createBooking(values)).then((res) => {
        if (res.meta.requestStatus === "fulfilled")
          navigate("/manager/booking/list");
      });
    }
    await dispatch(fetchBookings({ skip: 0, limit: 10, search: "" }));
  };

  return (
    <div className="form-container">
      {/* Header */}
      <div className="header" style={{ display: "flex", gap: "0.5rem" }}>
        <ArrowLeft style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        <h1>{bookingId ? "Edit Booking" : "Add Booking"}</h1>
      </div>

      {/* Form */}
      <div className="form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-body grid md:grid-cols-2 gap-4">
                {/* Pickup Location */}
                <div className="field">
                  <label className="required">Pickup Location</label>
                  <Field
                    type="text"
                    name="pickupLocation"
                    placeholder="Enter pickup location"
                  />
                  <ErrorMessage
                    name="pickupLocation"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Drop Location */}
                <div className="field">
                  <label className="required">Drop Location</label>
                  <Field
                    type="text"
                    name="dropLocation"
                    placeholder="Enter drop location"
                  />
                  <ErrorMessage
                    name="dropLocation"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Booking Date */}
                <div className="field">
                  <label className="required">Booking Date</label>
                  <Field type="date" name="bookingDate" />
                  <ErrorMessage
                    name="bookingDate"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Cargo Description */}
                <div className="field">
                  <label>Cargo Description</label>
                  <Field
                    type="text"
                    name="cargoDescription"
                    placeholder="Enter cargo description"
                  />
                  <ErrorMessage
                    name="cargoDescription"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Weight (kg) */}
                <div className="field">
                  <label className="required">Weight (kg)</label>
                  <Field
                    type="number"
                    name="weightKg"
                    placeholder="Enter weight in kg"
                  />
                  <ErrorMessage
                    name="weightKg"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Volume (m³) */}
                <div className="field">
                  <label>Volume (m³)</label>
                  <Field
                    type="number"
                    name="volumeM3"
                    placeholder="Enter volume in m³"
                  />
                  <ErrorMessage
                    name="volumeM3"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Estimated Cost ($) */}
                <div className="field">
                  <label>Estimated Cost ($)</label>
                  <Field
                    type="number"
                    name="estimatedCost"
                    placeholder="Enter estimated cost"
                  />
                  <ErrorMessage
                    name="estimatedCost"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="field">
                  <label className="required">Customer Name</label>
                  <div className="relative">
                    <Field
                      as="select"
                      name="customer"
                      className="pl-10 placeholder-size"
                    >
                      <option value="">-- Select Customer --</option>
                      {customer?.data?.map((cus) => (
                        <option key={cus._id} value={cus._id}>
                          {cus.fullName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="customer"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
                <div className="field">
                  <label>Driver Name</label>
                  <div className="relative">
                    <Field
                      as="select"
                      name="driver"
                      className="pl-10 placeholder-size"
                    >
                      <option value="">-- Select Driver --</option>
                      {driver?.data?.map((cus) => (
                        <option key={cus._id} value={cus._id}>
                          {cus.fullName}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-footer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit"
                >
                  {bookingId ? "Update Booking" : "Add Booking"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
