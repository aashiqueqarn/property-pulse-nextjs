import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectDB();
    const property = await Property.findById(id).lean();
    return (
        <>
            <PropertyHeaderImage image={property?.images[0]} />
            <section>{property?.name}</section>
        </>
    )
}