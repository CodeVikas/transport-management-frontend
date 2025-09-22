import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../../Store/feature/Login/authSlice.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RotatingLines } from "react-loader-spinner";
import LoginImage from "../../Assets/loginTransportImage.jpg";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("LOCAL_STORAGE_TOKEN");
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsloading(true);
    await dispatch(login(values))
      .then((res) => {
        setIsloading(false);
        if (res?.payload?.status === true) {
          console.log("Login successful:", res);
          if (res.payload.data.role == "admin") {
            navigate("/admin/dashboard");
          } else if (res.payload.data.role == "manager") {
            navigate("/manager/dashboard");
          } else if (res.payload.data.role == "customer") {
            navigate("/customer/dashboard");
          } else {
            navigate("/driver/dashboard");
          }
        } else {
          setAuthError("Invalid email or password. Please try again.");
        }
        // navigate("/dashboard");
      })
      .catch((err) => {
        setAuthError("Invalid email or password. Please try again.");
        console.error(err);
        setIsloading(false);
      })
      .finally(() => {
        setIsloading(false);
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 ">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="hidden md:block relative">
          <img
            src={LoginImage}
            alt="Education"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/20"></div>
        </div>

        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">
              Please sign in to access your dashboard
            </p>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 text-gray-400 h-5 w-5 z-10" />
                      <Field
                        type="email"
                        name="email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="admin@ownprep.com"
                      />
                    </div>
                    <div className="h-2">
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm ml-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 text-gray-400 h-5 w-5 z-10" />
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <div className="h-2">
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm ml-4"
                      />
                    </div>
                  </div>
                  {authError && (
                    <div className="text-red-500 text-sm mb-4">{authError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    {isLoading ? (
                      <RotatingLines
                        visible={true}
                        height="28"
                        width="28"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
