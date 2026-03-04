'use-client';

import { ClipLoader } from "react-spinners";

export default function Loading() {
    const cssOverride = {
        display: "block",
        margin: "100px auto",
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <ClipLoader size={150} color="#3b82f6" cssOverride={cssOverride} aria-label="Loading-spinner" />
        </div>
    );
}