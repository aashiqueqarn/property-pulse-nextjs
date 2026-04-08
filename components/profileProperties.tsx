'use client';
import { useState } from "react";
import Image from "next/image";

interface PropertyType {
    _id: string;
    name: string;
    type: string;
    description?: string;
    location: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    };
    beds: number;
    baths: number;
    squareFeet: number;
    amenities: string[];
    rates: {
        nightly?: number;
        weekly?: number;
        monthly?: number;
    };
    seller_info: {
        name?: string;
        email?: string;
        phone?: string;
    };
    images: string[];
    isFeatured: boolean;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function ProfileProperties({properties: initialProperties}: {properties: PropertyType[]}) {
    const [properties, setProperties] = useState<PropertyType[]>(initialProperties);
    return properties.map((property: PropertyType) => (
        <div className="mb-10" key={property._id}>
            <a href="/property.html">
                <Image
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images[0]}
                    alt="Property 1"
                    width={100}
                    height={100}
                />
            </a>
            <div className="mt-2">
                <p className="text-lg font-semibold">{property.name}</p>
                <p className="text-gray-600">Address: {property.location.street}, {property.location.city}, {property.location.state} {property.location.zipCode}</p>
            </div>
            <div className="mt-2">
                <a href="/add-property.html" className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600">
                    Edit
                </a>
                <button className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600" type="button">
                    Delete
                </button>
            </div>
        </div>
    ))
}