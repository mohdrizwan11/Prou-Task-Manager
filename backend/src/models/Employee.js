import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    position: {
      type: String,
      required: [true, 'Please provide a position'],
      enum: ['Manager', 'Developer', 'Designer', 'QA', 'HR'],
    },
    department: {
      type: String,
      required: [true, 'Please provide a department'],
      enum: ['Engineering', 'Sales', 'HR', 'Finance', 'Operations'],
    },
    salary: {
      type: Number,
      required: [true, 'Please provide a salary'],
      min: [0, 'Salary cannot be negative'],
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'On Leave'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;