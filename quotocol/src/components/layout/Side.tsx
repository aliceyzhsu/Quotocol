import React from "react";
import SourceSample from '@/components/SourceSample';
import DerivativeSample from '@/components/DerivativeSample';

interface SideProps {
    sample: "source" | "derivate";
}

const Side: React.FC<SideProps> = ({ sample }) => {
    const SampleComponent = sample === "source" ? SourceSample : DerivativeSample;
    const title = sample === "source" ? "Source Examples" : "Derivative Examples";

    return (
        <aside className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-100">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    {sample === "source" 
                        ? "Browse through source examples"
                        : "Explore derivative content"
                    }
                </p>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="space-y-4">
                    <SampleComponent />
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                    {sample === "source" 
                        ? "View more source examples"
                        : "Discover more derivatives"
                    }
                </p>
            </div>
        </aside>
    );
};

export default Side;