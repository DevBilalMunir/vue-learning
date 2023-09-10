import axios from "axios";

export default class DatanatorService {
  static async upadateRule(payload) {
    const url = "https://devbilalmunir-api.datanator.admissions.prognos-abc.dev/rule/" + payload.id;
    const data = JSON.stringify(payload.body);
    console.log("parsed data", data);

    try {
      const response = await axios.put(url, data);
      // Access the response data directly using response.data
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}
