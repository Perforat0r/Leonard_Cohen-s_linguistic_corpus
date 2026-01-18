export interface CorpusStats {
  totalUniqueWords: number // e.g., 3842
  totalAlbums: number // e.g., 15
  totalTracks: number // e.g., 134
  totalWords: number // e.g., 45678
  averageLexicalDensity: number // e.g., 0.32 (32%)
  careerSpan: string // e.g., "1967–2016"
}

// =====================================================
// ALBUM & TRACK DATA (for Album Browser + Charts)
// =====================================================
export interface Track {
  id: string // URL-safe identifier, e.g., "suzanne"
  title: string // Display title, e.g., "Suzanne"
  duration: string // Format "M:SS", e.g., "3:48"
  wordCount: number // Total words in lyrics
  uniqueWords: number // Unique words in lyrics
  lyrics: string // Full lyrics or placeholder
}

export interface Album {
  id: string // URL-safe identifier
  title: string // Full album title
  year: number // Release year
  trackCount: number // Number of tracks
  totalWords: number // Sum of all track word counts
  uniqueWords: number // Unique words across album
  avgWordsPerSong: number // totalWords / trackCount
  tracks: Track[] // Array of track data
}

// =====================================================
// WORD CLOUD DATA (for Word Frequency Visualization)
// =====================================================
export interface WordCloudItem {
  word: string // The word itself
  count: number // Total occurrences across corpus
  size: number // Visual size (12-48 recommended range)
}

// Python example to generate word cloud data:
// word_cloud = [
//     {"word": "love", "count": 342, "size": 48},
//     {"word": "night", "count": 187, "size": 36},
//     ...
// ]
// Size calculation: size = 12 + (count / max_count) * 36

// =====================================================
// COMPARISON DATA (for 1967 vs 2016 Analysis)
// =====================================================
export interface ComparisonAlbumData {
  album: string // Album title
  year: number // Release year
  totalWords: number // Total word count
  uniqueWords: number // Unique word count
  avgWordsPerSong: number // Average words per track
  trackCount: number // Number of tracks
  lexicalDensity: number // uniqueWords / totalWords (0-1)
  avgSentenceLength: number // Average words per sentence
  dominantMood: string // e.g., "Romantic & Melancholic"
  topThemes: string[] // e.g., ["Love", "Spirituality", "Loss"]
  poeticDevices: string[] // e.g., ["Metaphor", "Imagery", "Repetition"]
}

// =====================================================
// TEMPORAL ANALYSIS DATA (for Charts)
// =====================================================
export interface TimelineDataPoint {
  year: number // Album release year
  words: number // Total words for that album
  unique: number // Unique words for that album
  tracks: number // Track count
  album: string // Album title
}

export interface DensityDataPoint {
  year: number // Album release year
  density: string // Lexical density as percentage string "31.3"
  avgWords: number // Average words per song
  album: string // Album title
}

// =====================================================
// COMPLETE CORPUS DATA STRUCTURE
// =====================================================
export interface CorpusData {
  stats: CorpusStats
  albums: Album[]
  wordCloud: WordCloudItem[]
  comparison1967: ComparisonAlbumData
  comparison2016: ComparisonAlbumData
}

// =====================================================
// PYTHON SCRIPT TEMPLATE FOR DATA GENERATION
// =====================================================
/*

import json
import re
from collections import Counter

def analyze_lyrics(lyrics_text):
    """Analyze a single song's lyrics."""
    words = re.findall(r'\b[a-z]+\b', lyrics_text.lower())
    sentences = re.split(r'[.!?]+', lyrics_text)
    
    return {
        'wordCount': len(words),
        'uniqueWords': len(set(words)),
        'avgSentenceLength': len(words) / max(len(sentences), 1),
        'wordFrequencies': Counter(words)
    }

def generate_corpus_json(albums_data):
    """Generate the full corpus JSON structure."""
    
    all_word_counts = Counter()
    
    corpus = {
        'stats': {
            'totalUniqueWords': 0,
            'totalAlbums': len(albums_data),
            'totalTracks': 0,
            'totalWords': 0,
            'averageLexicalDensity': 0,
            'careerSpan': f"{min(a['year'] for a in albums_data)}–{max(a['year'] for a in albums_data)}"
        },
        'albums': [],
        'wordCloud': [],
        'comparison1967': None,
        'comparison2016': None
    }
    
    for album in albums_data:
        # Process each album...
        pass
    
    # Generate word cloud from all_word_counts
    max_count = max(all_word_counts.values())
    corpus['wordCloud'] = [
        {
            'word': word,
            'count': count,
            'size': int(12 + (count / max_count) * 36)
        }
        for word, count in all_word_counts.most_common(100)
    ]
    
    return corpus

# Export to JSON
# with open('corpus_data.json', 'w') as f:
#     json.dump(corpus, f, indent=2)

*/
