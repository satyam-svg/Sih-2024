const { GoogleGenerativeAI } = require("@google/generative-ai");

(async () => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyA4jRzg34j878RRC_24ZnXqGV7ZL76Tfao");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Define a reusable function to generate responses as a female doctor
    function generateDoctorResponse(userSymptoms) {
      return `You are a professional female doctor. A patient is describing symptoms and would like a thoughtful diagnosis and treatment plan. The patient's symptoms are: ${userSymptoms}. 
      Please respond with a comprehensive treatment plan including diagnosis, recommended medications with dosages and timing, lifestyle advice, and dietary suggestions as needed. 
      Your response should be empathetic and professional.`;
    }

    // Use the function with specific symptoms
    const userSymptoms = "mood swings, bloating, breast tenderness, headaches, tiredness, and food cravings";
    const prompt = generateDoctorResponse(userSymptoms);

    // Await the model response inside the async function
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
})();
