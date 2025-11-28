import React from 'react';
import Navbar from './components/Navbar';
import EmployeeList from './pages/EmployeeList';
import TaskList from './pages/TaskList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="app-content">
        <section id="employees">
          <EmployeeList />
        </section>
        <section id="tasks">
          <TaskList />
        </section>
      </div>
      <footer className="app-footer">
        <p>© 2025 ProU Technology - Employee & Task Manager | Built with ❤️ using MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;