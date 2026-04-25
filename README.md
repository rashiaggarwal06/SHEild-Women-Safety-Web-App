# SHEild 🛡️ - Women Safety Web Application

A full-stack women safety web application built with the MERN stack, designed to provide real-time emergency alerts and safety features for women in critical situations.

---

## 🚀 Features

- 🔐 Secure user authentication (Login / Signup)
- 🚨 Emergency alert system with real-time notifications
- 📞 Emergency contact management workflows
- ⚡ Optimized REST APIs with ~280ms response latency
- 🗄️ MongoDB with indexed queries for fast data retrieval

---

## 🛠️ Tech Stack

| Layer | Technology |
|----------|-----------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| API | REST APIs |
| Auth | JWT Authentication |

---

## 📸 Screenshots

![SHEild Screenshot](screenshot.png)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas

### Steps

1. Clone the repository
\```
git clone https://github.com/rashiaggarwal06/SHEild-Women-Safety-Web-App.git
\```

2. Install backend dependencies
\```
cd backend
npm install
\```

3. Install frontend dependencies
\```
cd frontend
npm install
\```

4. Create a `.env` file in the backend folder
\```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
\```

5. Run the backend
\```
npm start
\```

6. Run the frontend
\```
npm start
\```

---

## 📁 Project Structure

<svg width="100%" viewBox="0 0 680 420" role="img">
  <title>SHEild Project Structure</title>
  <desc>A tree diagram showing the folder and file structure of the SHEild project</desc>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Root -->
  <g class="c-purple">
    <rect x="40" y="20" width="140" height="36" rx="8" stroke-width="0.5"/>
    <text class="th" x="110" y="38" text-anchor="middle" dominant-baseline="central">📁 SHEild/</text>
  </g>

  <!-- Vertical trunk from root -->
  <line x1="110" y1="56" x2="110" y2="100" stroke="var(--color-border-secondary)" stroke-width="1.5"/>
  <line x1="110" y1="100" x2="520" y2="100" stroke="var(--color-border-secondary)" stroke-width="1.5"/>

  <!-- Branch drops -->
  <line x1="200" y1="100" x2="200" y2="130" stroke="var(--color-border-secondary)" stroke-width="1.5"/>
  <line x1="430" y1="100" x2="430" y2="130" stroke="var(--color-border-secondary)" stroke-width="1.5"/>
  <line x1="560" y1="100" x2="560" y2="130" stroke="var(--color-border-secondary)" stroke-width="1.5"/>

  <!-- backend/ -->
  <g class="c-teal">
    <rect x="130" y="130" width="140" height="36" rx="8" stroke-width="0.5"/>
    <text class="th" x="200" y="148" text-anchor="middle" dominant-baseline="central">📁 backend/</text>
  </g>

  <!-- frontend/ -->
  <g class="c-teal">
    <rect x="360" y="130" width="140" height="36" rx="8" stroke-width="0.5"/>
    <text class="th" x="430" y="148" text-anchor="middle" dominant-baseline="central">📁 frontend/</text>
  </g>

  <!-- README.md -->
  <g class="c-gray">
    <rect x="510" y="130" width="120" height="36" rx="8" stroke-width="0.5"/>
    <text class="th" x="570" y="148" text-anchor="middle" dominant-baseline="central">📄 README.md</text>
  </g>

  <!-- backend trunk + horizontal -->
  <line x1="200" y1="166" x2="200" y2="210" stroke="var(--color-border-secondary)" stroke-width="1.5"/>
  <line x1="200" y1="210" x2="340" y2="210" stroke="var(--color-border-secondary)" stroke-width="1.5"/>

  <!-- backend sub-branches -->
  <line x1="220" y1="210" x2="220" y2="240" stroke="var(--color-border-secondary)" stroke-width="1.5"/>
  <line x1="270" y1="210" x2="270" y2="240" stroke="var(--color-border-secondary)" stroke-width="1.5"/>
  <line x1="320" y1="210" x2="320" y2="240" stroke="var(--color-border-secondary)" stroke-width="1.5"/>

  <!-- server.js dashed drop -->
  <line x1="200" y1="166" x2="200" y2="370" stroke="var(--color-border-secondary)" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="200" y1="370" x2="360" y2="370" stroke="var(--color-border-secondary)" stroke-width="1"/>
  <line x1="360" y1="370" x2="360" y2="360" stroke="var(--color-border-secondary)" stroke-width="1"/>

  <!-- models/ -->
  <g class="c-amber">
    <rect x="170" y="240" width="100" height="34" rx="8" stroke-width="0.5"/>
    <text class="th" x="220" y="257" text-anchor="middle" dominant-baseline="central">📁 models/</text>
  </g>

  <!-- routes/ -->
  <g class="c-amber">
    <rect x="220" y="240" width="100" height="34" rx="8" stroke-width="0.5"/>
    <text class="th" x="270" y="257" text-anchor="middle" dominant-baseline="central">📁 routes/</text>
  </g>

  <!-- controllers/ -->
  <g class="c-amber">
    <rect x="270" y="240" width="110" height="34" rx="8" stroke-width="0.5"/>
    <text class="th" x="325" y="257" text-anchor="middle" dominant-baseline="central">📁 controllers/</text>
  </g>

  <!-- server.js -->
  <g class="c-coral">
    <rect x="320" y="340" width="100" height="34" rx="8" stroke-width="0.5"/>
    <text class="th" x="370" y="357" text-anchor="middle" dominant-baseline="central">⚙️ server.js</text>
  </g>

  <!-- frontend trunk + horizontal -->
  <line x1="430" y1="166" x2="430" y2="210" stroke="var(--color-border-secondary)" stroke-width="1.5"/>
  <line x1="390" y1="210" x2="470" y2="210" stroke="var(--color-border-secondary)" stroke-width="1.5"/>

  <!-- frontend sub-branches -->
  <line x1="400" y1="210" x2="400" y2="240" stroke="var(--color-border-secondary)" stroke-width="1.5"/>
  <line x1="460" y1="210" x2="460" y2="240" stroke="var(--color-border-secondary)" stroke-width="1.5"/>

  <!-- src/ -->
  <g class="c-amber">
    <rect x="355" y="240" width="90" height="34" rx="8" stroke-width="0.5"/>
    <text class="th" x="400" y="257" text-anchor="middle" dominant-baseline="central">📁 src/</text>
  </g>

  <!-- public/ -->
  <g class="c-amber">
    <rect x="415" y="240" width="90" height="34" rx="8" stroke-width="0.5"/>
    <text class="th" x="460" y="257" text-anchor="middle" dominant-baseline="central">📁 public/</text>
  </g>

  <!-- Legend -->
  <g class="c-purple"><rect x="40" y="390" width="14" height="14" rx="3" stroke-width="0.5"/></g>
  <text class="ts" x="60" y="401">Root</text>
  <g class="c-teal"><rect x="110" y="390" width="14" height="14" rx="3" stroke-width="0.5"/></g>
  <text class="ts" x="130" y="401">Main folders</text>
  <g class="c-amber"><rect x="220" y="390" width="14" height="14" rx="3" stroke-width="0.5"/></g>
  <text class="ts" x="240" y="401">Sub-folders</text>
  <g class="c-coral"><rect x="320" y="390" width="14" height="14" rx="3" stroke-width="0.5"/></g>
  <text class="ts" x="340" y="401">Entry file</text>
  <g class="c-gray"><rect x="400" y="390" width="14" height="14" rx="3" stroke-width="0.5"/></g>
  <text class="ts" x="420" y="401">Docs</text>
</svg>
---

## 🙋‍♀️ Contact

Made with ❤️ by **Rashi Aggarwal**

- 📧 Email: rashiaggarwalofficial@gmail.com
- 💼 LinkedIn: [linkedin.com/in/rashiaggarwal06](https://www.linkedin.com/in/rashiaggarwal06)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
