from google import genai

API_KEY = "AQ.Ab8RN6K8yZJDJ0noBqrgvs7DbWvcn8bJXqt7ePuyaggjmcbmPw"

print("KEY =", API_KEY)

client = genai.Client(api_key=API_KEY)

response = client.models.generate_content(
   model="gemini-2.0-flash-lite",
    contents="What is AI?"
)

print(response.text)