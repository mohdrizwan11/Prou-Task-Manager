import React, { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { employeeAPI } from '../services/api';
import './EmployeeList.css';

const EmployeeList = () => {
  const { employees, loading, error, refetch } = useEmployees();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: 'Developer',
    department: 'Engineering',
    salary: '',
    phone: '',
  });
  const [editingId, setEditingId] = useState(null);

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
      if (editingId) {
        await employeeAPI.update(editingId, formData);
      } else {
        await employeeAPI.create(formData);
      }
      setFormData({
        name: '',
        email: '',
        position: 'Developer',
        department: 'Engineering',
        salary: '',
        phone: '',
      });
      setShowForm(false);
      setEditingId(null);
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving employee');
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await employeeAPI.delete(id);
        refetch();
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting employee');
      }
    }
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="employee-container">
      <h2>👥 Employees</h2>

      <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '➕ Add Employee'}
      </button>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option>Manager</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>QA</option>
            <option>HR</option>
          </select>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option>Engineering</option>
            <option>Sales</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Operations</option>
          </select>
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <button type="submit" className="btn-submit">
            {editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>${emp.salary.toLocaleString()}</td>
                <td>{emp.phone}</td>
                <td>
                  <button
                    className="btn-small btn-edit"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-small btn-delete"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;