'use server';
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

export default async function addProperty(formData: any) {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error("UserId is required");
    }
    const {userId} = sessionUser;
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images")
        .filter((image: any) => image.name !== "");
    const data = {
        owner: userId,
        type: formData.get("type"),
        name: formData.get("name"),
        description: formData.get("description"),
        location: {
            street: formData.get("location.street"),
            city: formData.get("location.city"),
            state: formData.get("location.state"),
            zipCode: formData.get("location.zipcode"),
        },
        beds: Number(formData.get("beds")),
        baths: Number(formData.get("baths")),
        squareFeet: Number(formData.get("square_feet")),
        amenities,
        rates: {
            nightly: Number(formData.get("rates.nightly")),
            weekly: Number(formData.get("rates.weekly")),
            monthly: Number(formData.get("rates.monthly")),
        },
        seller_info: {
            name: formData.get("seller_info.name"),  
            email: formData.get("seller_info.email"),
            phone: formData.get("seller_info.phone"),
        },
    };
    const imageUrls = [];
    for (const image of images) {
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        const imageBase64 = imageData.toString("base64");
        const imageMimeType = image.type;
        const imageDataUrl = `data:${imageMimeType};base64,${imageBase64}`;
        const result = await cloudinary.uploader.upload(imageDataUrl, {
            folder: "propertypulse",
        });
        imageUrls.push(result.secure_url);
    }
    data.images = imageUrls;
    const newProperty = new Property(data);
    await newProperty.save();
    revalidatePath("/" + "layout");
    redirect(`/properties/${newProperty._id}`);
}
