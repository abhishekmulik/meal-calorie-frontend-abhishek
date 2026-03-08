import Image from "next/image";
import React from "react";

type EmptyStateProps = {
    title?: string;
    subtitle?: string;
};

function EmptyState({ title = "No data found", subtitle = "Try adding something to get started.",
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center">
            <Image src="/empty-state.svg" alt="empty state" width={256} height={256} />
            <h3 className="text-lg font-semibold text-foreground">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                {subtitle}
            </p>
        </div>
    );
}

export default EmptyState;