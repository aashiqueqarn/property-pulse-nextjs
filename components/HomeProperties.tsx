import PropertyCard from "./PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";

export default async function HomeProperties() {
    await connectDB();
    const properties = await Property.find({}).lean();
    const recentProperties = properties.slice(0, 6);
    return (
        <>
            <section className="px-y py-6">
                <div className="container-xl lg:container m-auto px-y py-6">
                    <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>
                    {
                        recentProperties.length == 0 ? (
                            <p>No Properties found</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {recentProperties.map((property) => (
                                    <PropertyCard key={property._id.toString()} property={property} />
                                ))}
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
}