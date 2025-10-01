# Online Quiz Application

A modern, interactive quiz application built with React and Node.js. Features a sleek dark theme, real-time feedback, and an intuitive user interface for an engaging learning experience.

<<<<<<< HEAD
![Quiz App Screenshot](screenshots/quiz-app.png)
=======
<img width="1793" height="624" alt="image" src="https://github.com/user-attachments/assets/00faf74e-1c78-405d-b7b1-ad280b9da307" />
<img width="1817" height="740" alt="image" src="https://github.com/user-attachments/assets/701d0109-09c6-453f-871d-94ac4f079a44" />
<img width="1210" height="916" alt="image" src="https://github.com/user-attachments/assets/d7360927-1d00-438c-9555-bb1cd006928f" />
>>>>>>> a35eb12888caf88db64763c8c2640e3655bdc81c

## 🌟 Features

### User Interface

- Clean, modern dark-themed design for reduced eye strain
- Smooth animations and transitions using Framer Motion
- Responsive layout optimized for all device sizes
- Interactive components with dynamic hover effects
- Intuitive navigation and progress tracking

### Quiz Functionality

- Dynamic question loading and state management
- Real-time answer tracking and validation
- Interactive progress bar showing quiz completion
- Timer with visual countdown and color indicators
- Flexible question navigation (previous/next)
- Comprehensive results page with detailed feedback

### Results & Feedback

- Immediate feedback after quiz submission
- Detailed score breakdown with percentage
- Clear display of correct answers for wrong responses
- Visual indicators for correct/incorrect answers
- Option to retake quiz and improve performance
- Performance-based encouraging messages

## ✨ Key Features Explained

```
online-quiz-app/
├── backend/               # Node.js & Express backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── frontend/             # React frontend
    ├── src/
    │   ├── api/         # API service
    │   ├── components/  # React components
    │   ├── context/     # State management
    │   ├── styles/      # Global styles
    │   ├── App.jsx      # Main app component
    │   └── index.js     # Entry point
```

### Timer System

- 30-minute time limit per quiz session
- Visual countdown with dynamic color changes
- Automatic submission when time expires
- Circular progress indicator with percentage
- Color-coded warnings for remaining time

### Scoring System

- Fair scoring with equal points per question
- Real-time score calculation
- Instant feedback on answer submission
- Detailed breakdown of performance
- Performance-based feedback messages

### Question Navigation

- Intuitive sequential navigation
- Previous/Next functionality
- Real-time progress tracking
- Answer review before final submission
- Invalid submission prevention

## 🛠️ Technical Stack

### Frontend

- **React** - UI framework for component-based architecture
- **React Router** - Seamless navigation and routing
- **Styled Components** - Modern, component-based styling
- **Framer Motion** - Smooth, professional animations
- **Context API** - Efficient state management

### Backend

- **Node.js** - Scalable runtime environment
- **Express** - Fast, minimalist web framework
- **SQLite** - Reliable, file-based database
- **RESTful API** - Clean, standardized endpoints

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- SQLite database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/online-quiz-app.git
cd online-quiz-app
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

4. Set up environment variables:
   Create `.env` files in both frontend and backend directories:

Backend `.env`:

```env
PORT=5000
NODE_ENV=development
```

Frontend `.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

Visit `http://localhost:3000` to access the application.

## 🔒 API Endpoints

### Quiz Routes

- `GET /api/quiz` - Retrieve all questions
- `GET /api/quiz/:id` - Get specific question
- `POST /api/quiz/submit` - Submit quiz answers
- `POST /api/quiz` - Create new question (admin only)

## 🎨 UI/UX Features

### Theme

- Dark theme optimized for reduced eye strain
- High contrast ratios for improved readability
- Consistent color palette:
  - Primary: #4CAF50 (Green)
  - Background: #1a1a1a
  - Cards: #2d2d2d
  - Text: #ffffff, #999999

### Animations

- Smooth page transitions
- Question fade-in effects
- Interactive button animations
- Progress bar transitions
- Score reveal animations

## 🔧 Configuration

### Backend Configuration

Database setup in `backend/config/database.js`:

```javascript
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./quiz.db");
```

### Frontend Configuration

API configuration in `frontend/src/constants/index.js`:

```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
<<<<<<< HEAD

## 👥 Author

Your Name

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

=======
.
>>>>>>> a35eb12888caf88db64763c8c2640e3655bdc81c
## 🙏 Acknowledgments

- React.js community for the excellent framework
- Node.js team for the robust backend environment
- Framer Motion for the smooth animations
- Styled Components for the elegant styling solution
