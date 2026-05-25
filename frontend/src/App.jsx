import { useState } from "react";

const BASE_URL = "https://ai-app-generator-2rb0.onrender.com";

export default function App() {
  // ---------------- AUTH ----------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  // ---------------- AI GENERATOR ----------------
  const [prompt, setPrompt] = useState("");
  const [generatedSchema, setGeneratedSchema] = useState(null);
  const [appGenerated, setAppGenerated] = useState(false);

  // ---------------- TASKS ----------------
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // ---------------- REGISTER ----------------
  const register = async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "User",
        email,
        password,
      }),
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  // ---------------- LOGIN ----------------
  const login = async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.token) {
      setToken(data.token);
      alert("Login Success");
    } else {
      alert("Login Failed");
    }
  };

  // ---------------- FAKE AI GENERATOR ----------------
  const generateApp = () => {
    // VERY SIMPLE AI SIMULATION

    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes("task")) {
      const schema = {
        entities: [
          {
            name: "tasks",
            fields: [
              {
                name: "title",
                type: "string",
                required: true,
              },
              {
                name: "completed",
                type: "boolean",
                required: false,
              },
            ],
          },
        ],
      };

      setGeneratedSchema(schema);
      setAppGenerated(true);
    } else {
      const schema = {
        entities: [
          {
            name: "items",
            fields: [
              {
                name: "name",
                type: "string",
                required: true,
              },
            ],
          },
        ],
      };

      setGeneratedSchema(schema);
      setAppGenerated(true);
    }
  };

  // ---------------- CREATE TASK ----------------
  const createTask = async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: taskTitle,
        completed: false,
      }),
    });

    await res.json();

    setTaskTitle("");

    fetchTasks();
  };

  // ---------------- GET TASKS ----------------
  const fetchTasks = async () => {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setTasks(data);
  };

  // ---------------- DELETE TASK ----------------
  const deleteTask = async (id) => {
    await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: 30,
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <h1> AI APP GENERATOR</h1>

      <p>
        Prompt-driven backend schema generation with dynamic CRUD APIs.
      </p>

      <hr />

      {/* AUTH SECTION */}
      <div style={{ marginTop: 20 }}>
        <h2>🔐 Authentication</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button onClick={register}>Register</button>
        <button onClick={login} style={{ marginLeft: 10 }}>
          Login
        </button>

        <p>
          <b>Token:</b>{" "}
          {token ? token.slice(0, 30) + "..." : "Not Logged In"}
        </p>
      </div>

      <hr />

      {/* AI GENERATOR SECTION */}
      <div style={{ marginTop: 20 }}>
        <h2>🤖 Generate App</h2>

        <textarea
          placeholder="Describe your app..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
          }}
        />

        <button onClick={generateApp}>Generate App</button>
      </div>

      {/* GENERATED SCHEMA */}
      {generatedSchema && (
        <div style={{ marginTop: 30 }}>
          <h2>🧠 Generated Schema</h2>

          <pre
            style={{
              background: "#f4f4f4",
              padding: 20,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(generatedSchema, null, 2)}
          </pre>
        </div>
      )}

      {/* GENERATED CRUD UI */}
      {appGenerated && (
        <div style={{ marginTop: 30 }}>
          <h2>📦 Generated CRUD Interface</h2>

          <input
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{ padding: 10, width: "70%" }}
          />

          <button
            onClick={createTask}
            style={{ marginLeft: 10 }}
          >
            Create Task
          </button>

          <button
            onClick={fetchTasks}
            style={{ marginLeft: 10 }}
          >
            Load Tasks
          </button>

          <div style={{ marginTop: 20 }}>
            {tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <b>{task.title}</b>

                <p>
                  Status: {task.completed ? "Completed" : "Pending"}
                </p>

                <button onClick={() => deleteTask(task._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
