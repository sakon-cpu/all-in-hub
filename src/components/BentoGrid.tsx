"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto p-4 auto-rows-[180px]",
                className
            )}
        >
            {children}
        </div>
    );
};

interface BentoCardProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    noPadding?: boolean;
}

export const BentoCard = ({
    children,
    className,
    title,
    description,
    header,
    icon,
    onClick,
    noPadding,
}: BentoCardProps) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -5, scale: 1.01 }}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl glass transition-all duration-300 hover:glow-sm",
                onClick && "cursor-pointer",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {header && <div className="relative w-full overflow-hidden">{header}</div>}

            {(title || description || icon || children) && (
                <div className={cn(
                    "relative z-10 flex flex-col gap-2 h-full justify-between",
                    !noPadding && "p-6 md:p-8"
                )}>
                    <div className="flex flex-col gap-2">
                        {icon && <div className="mb-2 text-accent flex justify-start">{icon}</div>}
                        {title && (
                            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 leading-tight">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-xs md:text-sm text-gray-400 line-clamp-2 md:line-clamp-3 hidden md:block">
                                {description}
                            </p>
                        )}
                    </div>
                    {children}
                </div>
            )}
        </motion.div>
    );
};
