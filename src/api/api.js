const API_BASE_URL = "https://flashprep-backend.vercel.app/";

export const fetchSets = async () => {
  try {
    const response = await fetch(API_BASE_URL + "sets");
    return await response.json();
  } catch (error) {
    console.error("Error fetching sets data:", error);
  }
};

export const fetchSet = async (setId) => {
  try {
    const response = await fetch(API_BASE_URL + "sets/set_id/" + setId);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchQuestions = async (setId) => {
  try {
    const response = await fetch(API_BASE_URL + "questions/set_id/" + setId);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchAnswers = async (setId) => {
  try {
    const response = await fetch(API_BASE_URL + "answers/set_id/" + setId);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createSet = async (newSet) => {
  try {
    const apiUri = API_BASE_URL + "sets/new";
    const postData = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSet),
    };

    fetch(apiUri, postData);
  } catch (error) {
    console.log("Error posting data:", error);
  }
};
