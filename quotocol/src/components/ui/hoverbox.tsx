"use client"

import React, { useState, useEffect } from 'react';

// interface AllContents {
//     shortData: {
//         owner: string;
//         link: string;
//     };
//     fullData: {
//         owner: string;
//         addr: string;
//         ens: string;
//         link: string;
//         pubDate: string;
//         ipfs: string;
//         mintDate: string;
//         quote: number;
//     };
// }

interface AllContents {
    shortData: React.ReactNode;
    fullData: React.ReactNode;
    link: string;
}

const getURL = (origin: string): string => {
	const base = "https://medium.com/";
	const head = "/api/proxy/";
	const path = origin.split(base)[1];
	return head + path;
};


const HoverBox: React.FC<AllContents> = ({ shortData, fullData, link }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [iframeContent, setIframeContent] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = React.useRef<HTMLDivElement>(null);
    const apiLink = getURL(link);

    const HOVER_BOX_WIDTH = 500;
    const HOVER_BOX_GAP = 16;

    const handleMouseEnter = () => {
        setIsHovered(true);
        
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Calculate position
            let x = rect.right + HOVER_BOX_GAP;
            let y = Math.max(16, rect.top);

            // If not enough space on the right, show on the left
            if (rect.right + HOVER_BOX_WIDTH + HOVER_BOX_GAP > windowWidth) {
                x = rect.left - HOVER_BOX_WIDTH - HOVER_BOX_GAP;
            }

            // If too close to bottom, adjust vertical position
            const maxHeight = 500;
            if (rect.top + maxHeight > windowHeight) {
                y = windowHeight - maxHeight - HOVER_BOX_GAP;
            }

            setPosition({ x, y });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        const fetchIframeContent = async () => {
            fetch(apiLink)
                .then(response => response.text())
                .then(data => setIframeContent(data))
                .catch(error => console.error(error));
        };

        if (isHovered) {
            fetchIframeContent();
        }
    }, [isHovered]);

    return (
        <div
            ref={containerRef}
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm 
                hover:border-purple-100 hover:shadow-md transition-all duration-200">
                {shortData}
            </div>
            {isHovered && (
                <div 
                    className="fixed bg-white rounded-xl border border-gray-200 shadow-xl 
                        z-[100] w-[500px] backdrop-blur-sm backdrop-filter 
                        animate-in fade-in duration-200 max-h-[500px] overflow-auto"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                    }}
                >
                    <div className="sticky top-0 right-0 bg-white/80 backdrop-blur-sm p-2 text-right border-b">
                        <span className="text-xs text-gray-400">ESC to close</span>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-6">
                            {fullData}
                        </div>
                        {iframeContent && (
                            <div className="mt-6 rounded-lg border border-gray-100 overflow-hidden bg-white">
                                <iframe 
                                    srcDoc={iframeContent} 
                                    title="Preview Content" 
                                    className="w-full h-80 bg-gray-50" 
                                />
                            </div>
                        )}
                    </div>

                    <div className="sticky bottom-0 px-8 py-4 bg-gray-50 border-t border-gray-100">
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-purple-600 hover:text-purple-700 
                                flex items-center gap-1 font-medium"
                        >
                            View full content 
                            <span className="text-xs">↗</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HoverBox;