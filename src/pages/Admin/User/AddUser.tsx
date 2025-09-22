import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  createUser,
  fetchByIdUser,
  fetchUsers,
  updateUser,
} from "../../../Store/feature/User/UserThunk.js";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function AddUserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location?.state?.userId;
  console.log("userId",userId)
  const [isData, setIsData] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchByIdUser(userId)).then((data) => {
        setIsData(data.payload.data);
      });
    }
  }, [userId, dispatch]);

  const initialValues: User = {
    id: isData?._id || "",
    firstName: isData?.firstName || "",
    lastName: isData?.lastName || "",
    email: isData?.email || "",
    phone: isData?.phone || "",
    password: "",
    confirmPassword: "",
    role: isData?.role || "", // Add role
    address: isData?.address || "",
  };

  const createValidationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .trim()
      .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters")
      .min(1, "First Name cannot be empty"),
    lastName: Yup.string()
      .required("Last Name is required")
      .trim()
      .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters")
      .min(1, "Last Name cannot be empty"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Email must be valid format"
      ),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .test(
        "no-spaces",
        "Phone number cannot contain spaces",
        (value) => !/\s/.test(value || "")
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string()
      .required("Role is required")
      .oneOf(
        ["admin", "manager", "driver", "accountant", "customer"],
        "Invalid role"
      ),
    address: Yup.string()
      .required("Address is required")
      .min(5, "Address must be at least 5 characters"),
  });

  const updateValidationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .trim()
      .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters")
      .min(1, "First Name cannot be empty"),
    lastName: Yup.string()
      .required("Last Name is required")
      .trim()
      .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters")
      .min(1, "Last Name cannot be empty"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Email must be valid format"
      ),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .test(
        "no-spaces",
        "Phone number cannot contain spaces",
        (value) => !/\s/.test(value || "")
      ),
    role: Yup.string()
      .required("Role is required")
      .oneOf(
        ["admin", "manager", "driver", "accountant", "customer"],
        "Invalid role"
      ),
    address: Yup.string()
      .required("Address is required")
      .min(5, "Address must be at least 5 characters"),
  });

  const handleSubmit = async (values: User) => {
    if (userId) {
      await dispatch(updateUser(values)).then((respnse) => {
        if (respnse.meta.requestStatus === "fulfilled") {
          navigate("/admin/user/list");
        }
      });
    } else {
      await dispatch(createUser(values)).then((respnse) => {
        if (respnse.meta.requestStatus === "fulfilled") {
          navigate("/admin/user/list");
        }
      });
    }
    await dispatch(fetchUsers({ skip: 0, limit: 10, search: "" }));
  };

  return (
    <div className="form-container">
      {/* Header */}
      <div className="header" style={{ display: "flex", gap: "0.5rem" }}>
        <ArrowLeft
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 style={{ display: "flex" }}>
          {userId ? "Edit Staff" : "Add Staff"}
        </h1>
      </div>

      {/* Add/Edit User Card */}
      <div className="form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={
            userId ? updateValidationSchema : createValidationSchema
          }
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-body">
                {/* Personal Information Section */}
                <div className="section">
                  <div className="grid">
                    <div className="field">
                      <label className="required">First Name</label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="firstName"
                          className="pl-10 placeholder-size"
                          placeholder="Enter first name"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="required">Last Name</label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="lastName"
                          className="pl-10 placeholder-size"
                          placeholder="Enter last name"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="error-message"
                        />
                      </div>
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
                    <div className="field">
                      <label className="required">Email Address</label>
                      <div className="relative">
                        <Field
                          type="email"
                          name="email"
                          disabled={userId ? true : false}
                          className="pl-10 placeholder-size"
                          placeholder="Enter email address"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </div>

                    {!userId && (
                      <>
                        <div className="field">
                          <label>Password</label>
                          <div className="relative flex flex-col">
                            <div className="relative">
                              <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="w-full pl-4 pr-10 placeholder-size"
                                placeholder="Enter password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label>Confirm Password</label>
                          <div className="relative flex flex-col">
                            <div className="relative">
                              <Field
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="w-full pl-4 pr-10 placeholder-size"
                                placeholder="Confirm password"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                            <ErrorMessage
                              name="confirmPassword"
                              component="div"
                              className="mt-1 text-sm text-red-600"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="field">
                      <label className="required">Role</label>
                      <div className="relative">
                        <Field
                          as="select"
                          name="role"
                          className="pl-10 placeholder-size"
                        >
                          <option value="">Select Role</option>
                          <option value="manager">Manager</option>
                          <option value="driver">Driver</option>
                          <option value="accountant">Accountant</option>
                          <option value="customer">Customer</option>
                        </Field>
                        <ErrorMessage
                          name="role"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="required">Address</label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="address"
                          className="pl-10 placeholder-size"
                          placeholder="Enter address"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="form-footer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit"
                >
                  {userId ? "Update Staff" : "Add Staff"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
