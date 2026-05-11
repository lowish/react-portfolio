"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react"
import Image from "next/image"

type CarouselItem = {
  title: string
  image: string
}

type InfiniteCarouselProps = {
  items?: CarouselItem[]
  speed?: number
}

const defaultItems: CarouselItem[] = [
  {
    title: "CodeGeeks 1",
    image: "/codegeeks1.jpg",
  },
  {
    title: "CodeGeeks 2",
    image: "/codegeeks2.jpg",
  },
  {
    title: "CodeGeeks 3",
    image: "/codegeeks3.jpg",
  },
]

function CarouselCard({ item }: { item: CarouselItem }) {
  return (
    <article className="group relative h-full w-[220px] shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#0d1118] shadow-[0_12px_38px_rgba(0,0,0,0.38)] transition-all duration-300 will-change-transform hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_18px_50px_rgba(0,0,0,0.48)] sm:w-[250px]">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 220px, 250px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          priority={false}
          loading="lazy"
          quality={85}
        />
      </div>
    </article>
  )
}

export function InfiniteCarousel({ items = defaultItems, speed = 55 }: InfiniteCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const cycleWidthRef = useRef(0)
  const offsetRef = useRef(0)
  const lastFrameRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  // Use refs instead of state for animation control to avoid re-renders
  const isHoveredRef = useRef(false)
  const isDraggingRef = useRef(false)
  const releaseManualTimerRef = useRef<number | null>(null)

  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)

  const duplicatedItems = useMemo(() => [...items, ...items], [items])

  // Optimized: Apply transform directly, let normalizeOffset happen lazily
  const applyTransform = useCallback((rawOffset: number) => {
    const track = trackRef.current
    if (!track) return

    const cycle = cycleWidthRef.current
    if (cycle <= 0) return

    // Only apply modulo when offset exceeds cycle (lazy normalization)
    let offset = rawOffset
    if (offset >= cycle) {
      offset = offset - Math.floor(offset / cycle) * cycle
    } else if (offset < 0) {
      offset = offset - Math.floor(offset / cycle) * cycle
    }

    offsetRef.current = offset
    // Use integer values to reduce subpixel rendering overhead
    const pixelOffset = Math.round(offset * 100) / 100
    track.style.transform = `translate3d(${-pixelOffset}px, 0, 0)`
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateCycleWidth = () => {
      cycleWidthRef.current = track.scrollWidth / 2
      applyTransform(offsetRef.current)
    }

    updateCycleWidth()

    const observer = new ResizeObserver(updateCycleWidth)
    observer.observe(track)

    // High-performance animation loop
    const tick = (time: number) => {
      if (lastFrameRef.current === 0) {
        lastFrameRef.current = time
        rafRef.current = window.requestAnimationFrame(tick)
        return
      }

      const delta = time - lastFrameRef.current
      lastFrameRef.current = time

      // Only update if not hovered and not dragging (checked via refs, not state)
      if (!isHoveredRef.current && !isDraggingRef.current) {
        const cycle = cycleWidthRef.current
        if (cycle > 0) {
          const movement = (speed * delta) / 1000
          applyTransform(offsetRef.current + movement)
        }
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      observer.disconnect()
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
      if (releaseManualTimerRef.current !== null) {
        window.clearTimeout(releaseManualTimerRef.current)
      }
    }
  }, [applyTransform, speed])

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    if (!viewport) return

    isDraggingRef.current = true
    dragStartXRef.current = event.clientX
    dragStartOffsetRef.current = offsetRef.current

    viewport.setPointerCapture(event.pointerId)
  }, [])

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    const deltaX = event.clientX - dragStartXRef.current
    applyTransform(dragStartOffsetRef.current - deltaX)
  }, [applyTransform])

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  const handleWheel = useCallback((event: ReactWheelEvent<HTMLDivElement>) => {
    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (Math.abs(dominantDelta) < 0.5) {
      return
    }

    event.preventDefault()
    applyTransform(offsetRef.current + dominantDelta)

    if (releaseManualTimerRef.current !== null) {
      window.clearTimeout(releaseManualTimerRef.current)
    }

    // Update ref without triggering re-render
    isHoveredRef.current = true
    releaseManualTimerRef.current = window.setTimeout(() => {
      isHoveredRef.current = false
    }, 700)
  }, [applyTransform])

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
  }, [])

  return (
    <section id="refactor-only" className="relative px-4 py-16 sm:px-6 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-7 md:mb-9">
          <h2 className="font-sans text-2xl font-light italic sm:text-3xl md:text-5xl">Experience Highlights</h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/12 bg-[#0a0d13]/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:p-6">
          <div
            ref={viewportRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={handleWheel}
            className="cursor-grab overflow-hidden touch-pan-y select-none active:cursor-grabbing"
            aria-label="Infinite project carousel"
          >
            <div ref={trackRef} className="flex w-max gap-4 will-change-transform sm:gap-5">
              {duplicatedItems.map((item, index) => (
                <CarouselCard key={`${item.title}-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}