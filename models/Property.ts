import { model, models, Schema } from "mongoose";

const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "Owner is required" ],
    },
    name: {
        type: String,
        required: [ true, "Name is required" ],
    },
    type: {
        type: String,
        required: [ true, "Type is required" ],
    },
    description: {
        type: String,
    },
    location: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
    },
    beds: {
        type: Number,
        required: [ true, "Number of beds is required" ],
    },
    baths: {
        type: Number,
        required: [ true, "Number of baths is required" ],
    },
    squareFeet: {
        type: Number,
        required: [ true, "Square feet is required" ],
    },
    amenities: [
        {
            type: String,

        }
    ],
    rates: {
        nightly: Number,
        weekly: Number,
        monthly: Number,
    },
    seller_info: {
        name: String,
        email: String,
        phone: String,
    },
    images: [
        {
            type: String,
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false,
    },

}
, { timestamps: true }
);

const Property = models.Property || model("Property", PropertySchema);
export default Property;