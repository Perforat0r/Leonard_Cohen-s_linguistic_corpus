import { StatCard } from "@/components/stat-card"
import { AlbumBrowser } from "@/components/album-browser"
import { WordCloud } from "@/components/word-cloud"
import { ComparisonSection } from "@/components/comparison-section"
import { CorpusCharts } from "@/components/corpus-charts"
import { ButterflyChart } from "@/components/butterfly-chart"
import { EvolutionCharts } from "@/components/evolution-charts"
import { corpusStats } from "@/lib/data"
import { BookOpen, BarChart3, GitCompare, Cloud, ImageIcon, TrendingUp } from "lucide-react"
import { BackgroundAudio } from "@/components/background-audio"
import { ExternalImage, MediaGallery } from "@/components/external-media"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <BackgroundAudio
        src="/bg_music.mp3"
        autoPlay={true}
        initialMuted={true}
        initialVolume={0.3}
      />

      <header className="border-b border-border py-20 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Decorative frame corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/60" />
          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/60" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/60" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/60" />

          {/* Inner content with padding for frame */}
          <div className="py-8 px-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Магистерский исследовательский проект</p>
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight text-balance leading-tight">
              Лингвистический корпус Леонарда Коэна
            </h1>
            <div className="w-24 h-px bg-primary mx-auto my-6" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed text-balance">
              Академическое исследование лексических моделей, 
              тематической эволюции и лингвистических характеристик пятнадцати студийных альбомов, выпущенных в период с 1967 по 2019 год.
            </p>
            {/* <p className="text-xs text-muted-foreground/60 mt-6 uppercase tracking-widest">1967 — 2019</p> */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Statistics Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Статистика корпуса</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Уникальные слова"
              value={corpusStats.uniqueWords.toLocaleString()}
              description="За все альбомы"
            />
            <StatCard label="Студийные альбомы" value={corpusStats.totalAlbums} description={corpusStats.careerSpan} />
            <StatCard label="Всего треков" value={corpusStats.totalTracks} description="Песен проанализировано" />
            <StatCard label="Всего слов" value={corpusStats.totalWords.toLocaleString()} description="Внутри корпуса" />
          </div>
        </section>

        {/* External Resources & Media Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-5 h-5 text-primary" />
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Внешние ресурсы и медиа</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Фото Коэна с обложек журналов в ранний и поздний периоды
          </p>

          <div className="space-y-8">
            {/* Example: Single external image with source attribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExternalImage
                src="/vibraciones.jpg"
                alt="Leonard Cohen 1974"
                caption="Журнал Vibraciones, Испания. Выпуск 2, ноябрь 1974"
                sourceUrl="#"
                width={600}
                height={400}
              />
              <ExternalImage
                src="/kviskoteka-2016.jpg"
                alt="Leonard Cohen 2016"
                caption="Квистотека, Хорватия. Выпуск 1123, 18 ноября 2016"
                sourceUrl="#"
                width={600}
                height={400}
              />
            </div>

            {/* Example: Media gallery for multiple images */}
{/*             <div>
              <h3 className="text-sm font-medium text-foreground mb-4">Архивные материалы</h3>
              <MediaGallery
                columns={3}
                items={[
                  {
                    src: "/handwritten-manuscript-lyrics-vintage-paper.jpg",
                    alt: "Original Manuscript Analysis",
                    caption: "Handwritten draft analysis",
                  },
                  {
                    src: "/vinyl-record-album-cover-dark-artistic.jpg",
                    alt: "Album Cover Typography Study",
                    caption: "Visual design correlation",
                  },
                  {
                    src: "/concert-stage-lighting-dramatic-dark.jpg",
                    alt: "Live Performance Documentation",
                    caption: "Performance context data",
                  },
                ]}
              />
            </div> */}
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Временной анализ</h2>
          </div>
          <CorpusCharts />
        </section>

        {/* Evolution Charts Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Эволюция смысла</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Сравнительный анализ доминирующей лексики раннего и позднего творческих периодов, 
            иллюстрирующий тематический сдвиг Коэна от телесных образов к духовному созерцанию.
          </p>
          <EvolutionCharts />
        </section>


        {/* Word Cloud Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Cloud className="w-5 h-5 text-primary" />
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Визуализация частотности слов</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Интерактивная визуализация наиболее часто встречающихся осмысленных слов во всем корпусе (с удаленными словами-пустышками). 
            Наведите курсор на слова, чтобы увидеть количество их вхождений.
          </p>
          <WordCloud />
        </section>

        {/* Butterfly Chart Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <GitCompare className="w-5 h-5 text-primary" />
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
              Смена парадигмы: ранний и поздний Коэн
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Диаграмма-бабочка, сравнивающая характерные слова раннего периода (1967–1974), в котором преобладали телесные/чувственные образы, и позднего периода (2000–2016), сфокусированного на философских/духовных темах. Данные получены из
            корпусного частотного анализа с коэффициентом доминирования ≥ 2x. 
          </p>
          <ButterflyChart />
        </section>

        {/* Comparison Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <GitCompare className="w-5 h-5 text-primary" />
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
              Сравнительный анализ: 1967 vs 2019
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Сравнительное лингвистическое исследование дебютного альбома Коэна и его последней студийной работы, рассматривающее тематическую и
            стилистическую эволюцию на протяжении 49 лет.
          </p>
          <ComparisonSection />
        </section>

        {/* Album Browser Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Дискография</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Просмотр всех 15 студийных альбомов, списков треков с указанием количества слов, длительности текста песен.
          </p>
          <AlbumBrowser />
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-8 pb-20">
          <p className="text-xs text-muted-foreground text-center">
            Данный лингвистический корпус представлен для академических и исследовательских целей. 
            Все упомянутые тексты песен защищены авторским правом и представлены здесь только в учебных целях. 
            Анализ основан на обработке корпуса с помощью Python с использованием
            пользовательской фильтрации стоп-слов.
          </p>
        </footer>
      </div>
    </main>
  )
}
