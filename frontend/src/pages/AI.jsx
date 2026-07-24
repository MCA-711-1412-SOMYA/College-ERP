import { useState } from "react"
import axios from "axios"

function AI() {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const askAI = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/ask-ai",
        {
          question: question
        }
      )

      setAnswer(response.data.answer)

    } catch (error) {

      console.log(error)

      alert("AI Error ❌")
    }
  }

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        AI Assistant 🤖
      </h1>

      {/* INPUT */}

      <div className="bg-slate-800 p-6 rounded-xl">

        <textarea
          rows="5"
          placeholder="Ask anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-4 rounded bg-slate-700 outline-none"
        />

        <button
          onClick={askAI}
          className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-3 rounded font-bold"
        >
          Ask AI
        </button>

      </div>

      {/* ANSWER */}

      {answer && (

        <div className="bg-slate-800 p-6 rounded-xl mt-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Response
          </h2>

          <p className="text-lg leading-8">
            {answer}
          </p>

        </div>

      )}

    </div>
  )
}

export default AI