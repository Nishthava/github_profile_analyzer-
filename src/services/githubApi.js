const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


export const fetchUser = async (username) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `token ${TOKEN}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("User not found");
    }

    return await response.json();

  } catch (error) {
    console.error("fetchUser error:", error.message);
    return { error: error.message };
  }
};


export const fetchRepos = async (username) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `token ${TOKEN}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repos");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [];

  } catch (error) {
    console.error("fetchRepos error:", error.message);
    return [];
  }
};