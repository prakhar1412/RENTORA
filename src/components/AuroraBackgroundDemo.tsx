"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Link } from "react-router-dom";

export function AuroraBackgroundDemo() {
    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4 max-w-4xl mx-auto text-center"
            >
                <div className="text-3xl md:text-5xl lg:text-7xl font-bold dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300 pb-2">
                    Unlock Your Creative Potential in NCR.
                </div>
                <div className="font-light text-base md:text-2xl dark:text-neutral-200 py-4 max-w-2xl">
                    Discover and rent coworking spaces, meeting rooms, studios, tools, and more in Delhi NCR.
                </div>
                <Link to="/map" className="relative group">
                    <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-8 py-3 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        Explore Spaces
                    </button>
                </Link>
            </motion.div>
        </AuroraBackground>
    );
}
