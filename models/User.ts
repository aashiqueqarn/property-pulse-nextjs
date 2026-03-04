import mongoose, { models, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        image: {
            type: String,
        },
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Property",
            }
        ]
    },
    {
        timestamps: true,
        collection: "users"
    }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;