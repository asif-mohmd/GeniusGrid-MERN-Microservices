import mongoose,{Document,Model,Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IInstructor extends Document {
    name: string;
    email: string;
    password?: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
    // SignAccessToken: () => string;
    // SignRefreshToken: () => string;
  }

  const instructorSchema: Schema<IInstructor> = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please enter your first name"],
      },
  
      email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
          validator: function (value: string) {
            return emailRegex.test(value);
          },
          message: "Please enter a valid email.",
        },
        unique: true,
      },
  
      password: {
        type: String,
      },
  
      isVerified: {
        type: Boolean,
        default: false,
      },
  
      courses: [
        {
          courseId: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  // Hash password
  instructorSchema.pre<IInstructor>("save", async function (next) {
    if (!this.isModified) {
      next();
    }
    this.password = await bcrypt.hash(this.password || "", 10);
    next();
  });

  // sign access token
  instructorSchema.methods.SignAccessToken = function () {
    return jwt.sign(
      { id: this._id, role: this.role },
      process.env.ACCESS_TOKEN || "",
      {
        expiresIn: "5m",
      }
    );
  };

  // sign refresh token
  instructorSchema.methods.SignRefreshToken = function () {
    return jwt.sign(
      { id: this._id, role: this.role },
      process.env.REFRESH_TOKEN || "",
      {
        expiresIn: "3d",
      }
    );
  };
  
  // compare password
  instructorSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const InstructorModel: Model<IInstructor> = mongoose.model("Instructor", instructorSchema);
  export default InstructorModel;