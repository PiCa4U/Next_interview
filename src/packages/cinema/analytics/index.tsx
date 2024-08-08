"use client";

import { useEffect } from 'react';

const ClarityScript: React.FC = () => {
    useEffect(() => {
        (function (c: any, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: Node){
            c[a] = c[a] || function () {
                (c[a].q = c[a].q || []).push(arguments);
            };
            t = l.createElement(r) as HTMLScriptElement;
            t.async = true;
            t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0];
            if (y && y.parentNode) {
                y.parentNode.insertBefore(t, y);
            }
        })(window, document, "clarity", "script", "nk3htf4zk5");
    }, []);

    return null;
};

export default ClarityScript;
