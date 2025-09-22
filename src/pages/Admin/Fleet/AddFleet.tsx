import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  fetchFleets,
  createFleet,
  fetchByIdFleet,
  updateFleet,
} from "../../../Store/feature/Fleet/FleetThunk.js";
import { ArrowLeft } from "lucide-react";

export default function AddFleetPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fleetId = location?.state?.fleetId;
  const [fleetData, setFleetData] = useState(null);

  useEffect(() => {
    if (fleetId) {
      dispatch(fetchByIdFleet(fleetId)).then((data) => {
        setFleetData(data.payload.data);
      });
    }
  }, [fleetId, dispatch]);

  const initialValues = {
    vehicleNumber: fleetData?.vehicleNumber || "",
    vehicleType: fleetData?.vehicleType || "",
    capacityKg: fleetData?.capacityKg || "",
    phone: fleetData?.phone || "",
    availability: fleetData?.availability || "Available",
    lastServiceDate: fleetData?.lastServiceDate
      ? fleetData.lastServiceDate.split("T")[0]
      : "",
    nextServiceDue: fleetData?.nextServiceDue
      ? fleetData.nextServiceDue.split("T")[0]
      : "",
    vehicleOwnerName: fleetData?.vehicleOwnerName || "",
  };

  const validationSchema = Yup.object({
    vehicleNumber: Yup.string().required("Vehicle Number is required"),
    vehicleType: Yup.string()
      .required("Vehicle Type is required")
      .oneOf(["Truck", "Van", "Car", "Bike", "Other"]),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .test(
        "no-spaces",
        "Phone number cannot contain spaces",
        (value) => !/\s/.test(value || "")
      ),
    capacityKg: Yup.number()
      .required("Capacity is required")
      .positive("Capacity must be positive"),
    availability: Yup.string()
      .required("Availability is required")
      .oneOf(["Available", "In Service", "Under Maintenance", "Unavailable"]),
    lastServiceDate: Yup.date().nullable(),
    nextServiceDue: Yup.date().nullable(),
    vehicleOwnerName: Yup.string().required("Owner Name is required"),
  });

  const handleSubmit = async (values) => {
    if (fleetId) {
      await dispatch(updateFleet({ id: fleetId, ...values })).then((res) => {
        if (res.meta.requestStatus === "fulfilled")
          navigate("/admin/fleet/list");
      });
    } else {
      await dispatch(createFleet(values)).then((res) => {
        if (res.meta.requestStatus === "fulfilled")
          navigate("/admin/fleet/list");
      });
    }
    await dispatch(fetchFleets({ skip: 0, limit: 10, search: "" }));
  };

  return (
    <div className="form-container">
      <div className="header">
        <ArrowLeft
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1>{fleetId ? "Edit Fleet Vehicle" : "Add Fleet Vehicle"}</h1>
      </div>

      <div className="form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-body grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="field">
                  <label className="required">Vehicle Number</label>
                  <Field
                    type="text"
                    name="vehicleNumber"
                    placeholder="Enter vehicle number"
                  />
                  <ErrorMessage
                    name="vehicleNumber"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <label className="required">Vehicle Type</label>
                  <Field as="select" name="vehicleType">
                    <option value="">Select Type</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="vehicleType"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <label className="required">Capacity (kg)</label>
                  <Field
                    type="number"
                    name="capacityKg"
                    placeholder="Enter capacity"
                  />
                  <ErrorMessage
                    name="capacityKg"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <label className="required">Availability</label>
                  <Field as="select" name="availability">
                    <option value="Available">Available</option>
                    <option value="In Service">In Service</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                    <option value="Unavailable">Unavailable</option>
                  </Field>
                  <ErrorMessage
                    name="availability"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <label>Last Service Date</label>
                  <Field type="date" name="lastServiceDate" />
                  <ErrorMessage
                    name="lastServiceDate"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <label>Next Service Due</label>
                  <Field type="date" name="nextServiceDue" />
                  <ErrorMessage
                    name="nextServiceDue"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <label className="required">Vehicle Owner Name</label>
                  <Field
                    type="text"
                    name="vehicleOwnerName"
                    placeholder="Enter owner name"
                  />
                  <ErrorMessage
                    name="vehicleOwnerName"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="field">
                  <label>Phone Number</label>
                  <div className="relative">
                    <Field
                      type="tel"
                      name="phone"
                      className="pl-10 placeholder-size"
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
              </div>

              <div className="form-footer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit"
                >
                  {fleetId ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
