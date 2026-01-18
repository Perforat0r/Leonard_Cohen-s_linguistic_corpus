"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ZoomIn, ImageIcon, BarChart2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ExternalImageProps {
  src: string
  alt: string
  caption?: string
  source?: string
  sourceUrl?: string
  width?: number
  height?: number
}

export function ExternalImage({ src, alt, caption, source, sourceUrl, width = 600, height = 400 }: ExternalImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <figure className="relative group">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-zoom-in overflow-hidden rounded-lg border border-border bg-muted">
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="animate-pulse flex flex-col items-center gap-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Loading image...</span>
                </div>
              </div>
            )}
            {hasError ? (
              <div className="flex items-center justify-center h-48 bg-muted">
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground">Failed to load image</span>
                </div>
              </div>
            ) : (
              <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={width}
                height={height}
                className={"w-full h-auto rounded-lg"}
                onLoadingComplete={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setHasError(true)
                }}
              />
            )}
            <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-foreground" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{alt}</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={1200}
              height={800}
              className={"w-full h-auto rounded-lg"}
              onLoadingComplete={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false)
                setHasError(true)
              }}
            />
          </div>
          {caption && <p className="text-sm text-muted-foreground mt-2">{caption}</p>}
        </DialogContent>
      </Dialog>

      {(caption || source) && (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {caption && <span>{caption}</span>}
          {source && (
            <span className="ml-2">
              Source:{" "}
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  {source}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                source
              )}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

interface EmbeddedChartProps {
  embedUrl: string
  title: string
  description?: string
  height?: number
}

export function EmbeddedChart({ embedUrl, title, description, height = 400 }: EmbeddedChartProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="relative rounded-lg overflow-hidden border border-border bg-muted">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
              <div className="animate-pulse flex flex-col items-center gap-2">
                <BarChart2 className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Loading chart...</span>
              </div>
            </div>
          )}
          <iframe
            src={embedUrl}
            title={title}
            width="100%"
            height={height}
            frameBorder="0"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Gallery component for multiple external images
interface MediaGalleryProps {
  items: ExternalImageProps[]
  columns?: 2 | 3 | 4
}

export function MediaGallery({ items, columns = 3 }: MediaGalleryProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {items.map((item, index) => (
        <ExternalImage key={index} {...item} />
      ))}
    </div>
  )
}
