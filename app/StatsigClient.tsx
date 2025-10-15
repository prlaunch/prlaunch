'use client';
import { StatsigProvider, useClientAsyncInit } from "@statsig/react-bindings";
import { StatsigAutoCapturePlugin } from "@statsig/web-analytics";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";

export function StatsigClient({ children }: { children: React.ReactNode }) {
    const { client } = useClientAsyncInit(
        "client-XaBpqoeyBxXiUmjLHJUog919UImQMHF4zKHcDSD2PtT",
        { userID: 'anonymous' },
        { plugins: [new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin()] }
    );

    // Render children immediately even if client is not ready yet
    if (!client) {
        return <>{children}</>;
    }

    return <StatsigProvider client={client}>{children}</StatsigProvider>;
}
