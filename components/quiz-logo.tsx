export function Logo() {
  return (
    <div className="text-2xl font-bold tracking-tight text-black cursor-default">
      <span className="text-blue-500">pr</span>
      <span>launch.io</span>
    </div>
  )
}

export function StickyLogoBanner() {
  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b py-3 px-4">
      <div className="flex justify-center">
        <Logo />
      </div>
    </div>
  )
}
