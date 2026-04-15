"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
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
  const lastFrameRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const releaseManualTimerRef = useRef<number | null>(null)

  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)

  const duplicatedItems = useMemo(() => [...items, ...items], [items])

  const normalizeOffset = (value: number) => {
    const cycle = cycleWidthRef.current
    if (cycle <= 0) {
      return 0
    }

    if (value >= cycle) {
      return value % cycle
    }

    if (value < 0) {
      return ((value % cycle) + cycle) % cycle
    }

    return value
  }

  const applyTransform = (rawOffset: number) => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const offset = normalizeOffset(rawOffset)
    offsetRef.current = offset
    track.style.transform = `translate3d(${-offset}px, 0, 0)`
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const updateCycleWidth = () => {
      cycleWidthRef.current = track.scrollWidth / 2
      applyTransform(offsetRef.current)
    }

    updateCycleWidth()

    const observer = new ResizeObserver(updateCycleWidth)
    observer.observe(track)

    const tick = (time: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = time
      }

      const delta = time - lastFrameRef.current
      lastFrameRef.current = time

      if (!isHovered && !isDragging) {
        const cycle = cycleWidthRef.current
        if (cycle > 0) {
          applyTransform(offsetRef.current + (speed * delta) / 1000)
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
  }, [isDragging, isHovered, speed])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    if (!viewport) {
      return
    }

    setIsDragging(true)
    dragStartXRef.current = event.clientX
    dragStartOffsetRef.current = offsetRef.current

    viewport.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return
    }

    const viewport = viewportRef.current
    if (!viewport) {
      return
    }

    const deltaX = event.clientX - dragStartXRef.current
    applyTransform(dragStartOffsetRef.current - deltaX)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (Math.abs(dominantDelta) < 0.5) {
      return
    }

    event.preventDefault()
    applyTransform(offsetRef.current + dominantDelta)

    if (releaseManualTimerRef.current !== null) {
      window.clearTimeout(releaseManualTimerRef.current)
    }

    setIsHovered(true)
    releaseManualTimerRef.current = window.setTimeout(() => {
      setIsHovered(false)
    }, 700)
  }

  return (
    <section id="refactor-only" className="relative px-4 py-16 sm:px-6 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-7 md:mb-9">
          <h2 className="font-sans text-2xl font-light italic sm:text-3xl md:text-5xl">Experience Highlights</h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/12 bg-[#0a0d13]/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:p-6">
          <div
            ref={viewportRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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