import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Set an User Name"]
  }, 
  email : {
    type: String,
    required: [true, "Add a valid Email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Set a password"]
  },
  userInfo : {
    age: {
      type: Number
    }, 
    location: {
      type: String
    },
    Qualification: {
      type: String
    },
    Domain: {
      type: String
    }
  }
}, {
  timestamps: true
});

const userModel = mongoose.model('User', userSchema);
export default userModel;