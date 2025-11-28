import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useEmployees } from '../hooks/useEmployees';
import { taskAPI } from '../services/api';
import './TaskList.css';

const TaskList = () => {
  const { tasks, loading, error, refetch } = useTasks();
  const { employees } = useEmployees();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    dueDate: '',
    tags: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()),
      };
      if (editingId) {
        await taskAPI.update(editingId, payload);
      } else {
        await taskAPI.create(payload);
      }
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        priority: 'Medium',
        dueDate: '',
        tags: '',
      });
      setShowForm(false);
      setEditingId(null);
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving task');
    }
  };

  const handleEdit = (task) => {
    setFormData({
      ...task,
      tags: task.tags?.join(', ') || '',
    });
    setEditingId(task._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await taskAPI.delete(id);
        refetch();
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting task');
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.update(taskId, { status: newStatus });
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating task');
    }
  };

  const filteredTasks =
    filterStatus === 'All' ? tasks : tasks.filter((t) => t.status === filterStatus);

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const getEmployeeName = (id) => {
    // Accept either an id string or an object (populated assignedTo)
    const lookupId = typeof id === 'string' ? id : id?._id || id?.value || null;
    const emp = employees.find((e) => e._id === lookupId);
    if (emp) return emp.name;
    // If passed an object with a name (populated but employees not loaded), use it
    if (typeof id === 'object' && id?.name) return id.name;
    return 'Unknown';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Low: '#48bb78',
      Medium: '#ed8936',
      High: '#f6ad55',
      Critical: '#f56565',
    };
    return colors[priority] || '#667eea';
  };

  return (
    <div className="task-container">
      <h2>✅ Tasks</h2>

      <div className="task-controls">
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '➕ Add Task'}
        </button>
        <div className="filter-buttons">
          {['All', 'Pending', 'In Progress', 'Completed', 'On Hold'].map(
            (status) => (
              <button
                key={status}
                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
          />
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
          />
          <button type="submit" className="btn-submit">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="tasks-grid">
        {filteredTasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                {task.priority}
              </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-meta">
              <strong>Assigned to:</strong> {getEmployeeName(task.assignedTo._id || task.assignedTo)}
            </div>
            <div className="task-meta">
              <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
            </div>
            <div className="task-meta">
              <strong>Status:</strong>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="status-select"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>
            {task.tags && task.tags.length > 0 && (
              <div className="task-tags">
                {task.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="task-actions">
              <button className="btn-small btn-edit" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button
                className="btn-small btn-delete"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;