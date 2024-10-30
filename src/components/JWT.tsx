import axios from "axios";

async function getUserPermissions(token: string) {
  if (!token) {
    return {
      status: false,
      permissions: [],
    };
  }

  try {
    const response = await axios.get(
      "https://shell-git-master-justino-soares-projects.vercel.app/api/verify_token",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status == "true")
      return {
        status: true,
        permissions: response.data,
      };
    return {
      status: false,
      permissions: [],
    };
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}

export default getUserPermissions;
