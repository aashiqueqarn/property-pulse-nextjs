'use server';
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function addProperty(formData: any) {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error("UserId is required");
    }
    const {userId} = sessionUser;
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images")
        .filter((image: any) => image.name !== "")
        .map((image: any) => image.name); // Filter out empty file inputs
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
        images,
    };
    const newProperty = new Property(data);
    await newProperty.save();
    revalidatePath("/" + "layout");
    redirect(`/property/${newProperty._id}`);
}
