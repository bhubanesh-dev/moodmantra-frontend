import React, { useContext, useState } from "react";
import { Check, ImageUp, SquarePen, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false);

  const [originalData, setOriginalData] = useState(null);

  const handleEditClick = () => {
    setOriginalData({ ...userData });
    setIsEdit(true);
  };

  // handle cancel btn
  const handleCancel = () => {
    setUserData(originalData);
    setIsEdit(false);
    setImage(false);
  };

  const hasChanges = () => {
    if (image) return true;

    return (
      originalData?.name !== userData.name ||
      originalData?.phone !== userData.phone ||
      originalData?.gender !== userData.gender ||
      originalData?.dob !== userData.dob ||
      originalData?.address?.line1 !== userData.address?.line1 ||
      originalData?.address?.line2 !== userData.address?.line2
    );
  };

  const [loading, setLoading] = useState(false);

  // update user profile data
  const updateUserProfileData = async () => {
    setLoading(true); // Start showing loading

    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.put(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop showing loading
    }
  };

  return (
    userData && (
      <div
        className="min-h-screen py-12 px-4"
        style={{
          background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div
            className="p-6"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
              color: "white",
            }}
          >
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                {isEdit ? (
                  <label htmlFor="image" className="cursor-pointer group">
                    <div className="relative mb-4">
                      <img
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md group-hover:border-[#fef08a] transition-all"
                        src={
                          image ? URL.createObjectURL(image) : userData.image
                        }
                        alt="Profile"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-medium">Change</span>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    src={userData.image}
                    alt="Profile"
                  />
                )}

                {isEdit ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="text-xl font-bold text-center bg-transparent border-b border-[#7c3aed] text-[#7c3aed]"
                  />
                ) : (
                  <h2 className="text-xl font-bold mt-4 text-[#7c3aed]">
                    {userData.name}
                  </h2>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                {/* Contact Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#7c3aed] mb-3 border-b pb-2">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-500">
                        Email
                      </label>
                      <p className="text-gray-700">{userData.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500">
                        Phone
                      </label>
                      {isEdit ? (
                        <input
                          type="text"
                          value={userData.phone}
                          onChange={(e) => {
                            if (
                              /^\d*$/.test(e.target.value) &&
                              e.target.value.length <= 10
                            ) {
                              setUserData({
                                ...userData,
                                phone: e.target.value,
                              });
                            }
                          }}
                          className="w-full p-2 border rounded"
                          maxLength="10"
                        />
                      ) : (
                        <p className="text-gray-700">{userData.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500">
                        Address
                      </label>
                      {isEdit ? (
                        <>
                          <input
                            type="text"
                            value={userData.address.line1}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                address: {
                                  ...userData.address,
                                  line1: e.target.value,
                                },
                              })
                            }
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Street address"
                          />
                          <input
                            type="text"
                            value={userData.address.line2}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                address: {
                                  ...userData.address,
                                  line2: e.target.value,
                                },
                              })
                            }
                            className="w-full p-2 border rounded"
                            placeholder="City, State, ZIP"
                          />
                        </>
                      ) : (
                        <>
                          <p className="text-gray-700">
                            {userData.address.line1}
                          </p>
                          <p className="text-gray-700">
                            {userData.address.line2}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div>
                  <h3 className="text-lg font-semibold text-[#7c3aed] mb-3 border-b pb-2">
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500">
                        Gender
                      </label>
                      {isEdit ? (
                        <select
                          value={userData.gender}
                          onChange={(e) =>
                            setUserData({ ...userData, gender: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-700">{userData.gender}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500">
                        Date of Birth
                      </label>
                      {isEdit ? (
                        <input
                          type="date"
                          value={userData.dob}
                          onChange={(e) =>
                            setUserData({ ...userData, dob: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-700">{userData.dob}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              {isEdit ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateUserProfileData}
                    disabled={!hasChanges() || loading}
                    className={`px-6 py-2 rounded-lg text-white transition-colors ${
                      !hasChanges() || loading
                        ? "bg-[#a78bfa] cursor-not-allowed"
                        : "bg-[#7c3aed] hover:bg-[#5b21b6]"
                    }`}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="px-6 py-2 bg-[#7c3aed] text-white rounded-lg hover:bg-[#5b21b6] transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
