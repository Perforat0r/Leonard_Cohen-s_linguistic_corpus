"use client"

import { useState } from "react"
import { ChevronRight, Music, FileText, X } from "lucide-react"
import { albums, type Album, type Track } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function AlbumBrowser() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Albums List */}
      <div className="lg:col-span-1">
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Студийные альбомы ({albums.length})</h3>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-2">
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => {
                  setSelectedAlbum(album)
                  setSelectedTrack(null)
                }}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAlbum?.id === album.id
                    ? "bg-primary/10 border-primary text-foreground"
                    : "bg-card border-border hover:border-muted-foreground/50 text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{album.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {album.year} · {album.trackCount} песен
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${selectedAlbum?.id === album.id ? "rotate-90" : ""}`}
                  />
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Tracklist */}
      <div className="lg:col-span-2">
        {selectedAlbum ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{selectedAlbum.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedAlbum.year} · {selectedAlbum.totalWords} слов · {selectedAlbum.uniqueWords} уникальных
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAlbum(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid gap-2">
              {selectedAlbum.tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track)}
                  className="w-full text-left p-4 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground font-mono w-6">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Music className="w-4 h-4 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{track.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {track.duration} · {track.wordCount} слов · {track.uniqueWords} уникальных
                      </p>
                    </div>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select an album to view its tracklist</p>
            </div>
          </div>
        )}
      </div>

      {/* Lyrics Dialog */}
      <Dialog open={!!selectedTrack} onOpenChange={() => setSelectedTrack(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedTrack?.title}</DialogTitle>
            <p className="text-sm text-muted-foreground">
              {selectedAlbum?.title} ({selectedAlbum?.year}) · {selectedTrack?.wordCount} words
            </p>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="prose prose-invert prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-6 rounded-lg">
                {selectedTrack?.lyrics}
              </pre>
            </div>
          </ScrollArea>
          <div className="flex gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
            <span>Всего слов: {selectedTrack?.wordCount}</span>
            <span>Уникальных слов: {selectedTrack?.uniqueWords}</span>
            <span>Длительность: {selectedTrack?.duration}</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
