const API_BASE_URL = "https://flashprep-backend.vercel.app/";

export async function fetchSets() {
  try {
    const response = await fetch(API_BASE_URL + "sets");
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
