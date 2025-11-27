export async function getUserProfile() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
