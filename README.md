# User Management CRUD Application

A React + TypeScript based CRUD (Create, Read, Update, Delete) application for managing user data.  
The application is designed with **future extensibility** in mind, allowing new fields to be added with minimal code changes.

---

## 🚀 Tech Stack

- React (Create React App)
- TypeScript
- Material UI
- Axios
- JSON Server (Mock API)

---

## 📋 Features

- Create, Read, Update, and Delete users
- Form validation with required field enforcement
- Configuration-driven form and table rendering
- Clean and user-friendly UI
- Easily extensible architecture for future fields

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-github-repository-url>
cd react-crud-app

---

### 2. Install dependencies
```bash
npm install

---

### 3. Start the mock API (JSON Server)
```bash
npx json-server --watch db.json --port 3001

---

### 4. Start the React application
```bash
npm start


## Adding New Fields

The application uses a configuration-driven approach.

To add a new field (e.g., Date of Birth):
1. Add the field to the `User` interface in `types.ts`
2. Add a new entry to the `formFields` array in `App.tsx`

The form and table automatically update without modifying any UI components.
