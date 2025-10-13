'use client'

import { StatsigProvider as StatsigReactProvider } from '@statsig/react-bindings'
import { StatsigSessionReplayPlugin } from '@statsig/session-replay'
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics'

export function StatsigProvider({ children }: { children: React.ReactNode }) {
  return (
    <StatsigReactProvider
      sdkKey="client-XaBpqoeyBxXiUmjLHJUog919UImQMHF4zKHcDSD2PtT"
      user={{ userID: "user-id" }}
      loadingComponent={<div>Loading analytics...</div>}
      options={{
        plugins: [
          new StatsigSessionReplayPlugin(),
          new StatsigAutoCapturePlugin(),
        ],
      }}
    >
      {children}
    </StatsigReactProvider>
  )
}
