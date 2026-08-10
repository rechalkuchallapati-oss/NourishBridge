/**
 * Strip sensitive fields before sending user data to clients.
 */
export function sanitizeUser(user) {
  const doc = user?.toObject ? user.toObject() : user;

  return {
    id: doc._id ?? doc.id,
    fullName: doc.fullName,
    email: doc.email,
    phone: doc.phone,
    role: doc.role,
    profileImage: doc.profileImage,
    address: doc.address,
    status: doc.status,
    verificationStatus: doc.verificationStatus,
    lastLoginAt: doc.lastLoginAt,
    createdAt: doc.createdAt,
  };
}

export default sanitizeUser;
