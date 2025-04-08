import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Changepassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const token = JSON.parse(sessionStorage.getItem("userInfo")).token;

  useEffect(() => {
    setShowCard(true); // Trigger animation on mount
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
    } else if (newPassword === oldPassword) {
      setMessage("The new password should not be equal to the old password.");
    } else {
      axios
        .put(
          "http://bonex.runasp.net/me/change-password",
          {
            currentPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setMessage("Password changed successfully");
        })
        .catch((error) => {
          console.error(error);
          setMessage("An error occurred while changing the password.");
        });
    }
  };

  return (
    <div className="mt-5 mb-5 container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <div
            className={`rounded-lg p-6 shadow-lg bg-white transition-all duration-500 transform ${
              showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-center text-2xl font-bold mb-4">
              Change Your Password
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Use the form below to update your password.
            </p>

            {message && (
              <div
                className={`text-center py-2 mb-4 rounded transition-colors duration-300 ${
                  message === "Password changed successfully"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Old Password with Visibility Toggle */}
              <div className="mb-4 relative">
                <label htmlFor="oldPassword" className="block text-gray-700 mb-1">
                  Old Password
                </label>
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                  required
                  className="w-full rounded-full shadow-sm border border-[#37B7C3] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#37B7C3] transition duration-200"
                />
                <button
                  type="button"
                  onClick={toggleOldPasswordVisibility}
                  className="absolute right-0 top-0 mt-2 mr-3 p-0 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={showOldPassword ? faEyeSlash : faEye}
                    style={{ color: "#37B7C3", fontSize: "1.2rem",marginTop: "1.8rem",marginRight: "0.5rem" }}
                  />
                </button>
              </div>

              {/* New Password */}
              <div className="mb-4 relative">
                <label htmlFor="newPassword" className="block text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full rounded-full shadow-sm border border-[#37B7C3] py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#37B7C3] transition duration-200"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 top-0 mt-2 mr-3 p-0 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    style={{ color: "#37B7C3", fontSize: "1.2rem" ,marginTop: "1.8rem",marginRight: "0.5rem"}}
                  />
                </button>
              </div>

              {/* Confirm New Password */}
              <div className="mb-4 relative">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full rounded-full shadow-sm border border-[#37B7C3] py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#37B7C3] transition duration-200"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 top-0 mt-2 mr-3 p-0 focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    style={{ color: "#37B7C3", fontSize: "1.2rem", marginTop: "1.8rem",marginRight: "0.5rem" }}
                  />
                </button>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full mt-3 rounded-lg px-4 py-2 text-white bg-gradient-to-r from-[#088395] to-[#077a80] border border-transparent focus:outline-none hover:from-[#077a80] hover:to-[#056766] transform hover:scale-105 transition duration-200"
                  style={{ borderRadius: "50px" }}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
