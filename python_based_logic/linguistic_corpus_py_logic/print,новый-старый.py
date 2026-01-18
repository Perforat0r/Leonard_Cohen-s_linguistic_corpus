import json
import re
from collections import Counter

# ==============================
# 1. Загрузка корпуса
# ==============================



with open(r"C:\Users\Ivan\Desktop\УЧЕБА\МАГА\Практика\drive-download-20260116T184135Z-3-001\cohen_clean_corpus.json", encoding="utf-8") as f:
    data = json.load(f)

# ==============================
# 2. Стоп-слова
# (базовые + усиленные)
# ==============================

    stop_words = {# Базовые служебные
        'the', 'and', 'you', 'to', 'i', 'a', 'it', 'in', 'of', 'my', 
        'is', 'that', 'for', 'me', 'on', 'with', 't', 's', 'your', 'be',
        'all', 'have', 'but', 'so', 'not', 'as', 'was', 'we', 'this',
        'there', 'are', 'they', 'she', 'who', 'don', 'her', 'when', 'now',
        'can', 'from', 'what', 'his', 'just', 'where', 'one', 'out', 'up', 
        'had', 'has', 'will', 'no', 'if', 'do', 'at', 'him', 'by',
        'would', 'could', 'their', 'them', 'how', 'an', 'or', 'some',
        'were', 'then', 'been', 'here', 'back', 'down', 'said', 'say', 
        'let', 'than', 'into', 'very', 'only', 'more', 'even', 'through',
        # Глаголы-пустышки и ошметки
        'got', 'take', 'did', 'need', 'see', 'come', 'want', 'always', 
        'again', 'long', 'little', 'too', 'well', 'know', 'never',
        'much', 'before', 'should', 'must', 'these', 'those', 'every',
        'aren', 'ain', 'won', 'yet', 'ever', 'once', 'why', 'after', 
        'yes', 'came', 'took', 'get', 'make', 'turned', 'happens', 
        'happened', 'going', 'away', 'give', 'about', 'other', 'may',
        'might', 'without', 'upon', 'shall', 'tell', 'show'
        'come','like','know','back','then','were','don','yes','some','well',
        'said','say','want','again','ever','got','could','here','would',
        'keep', 'look', 'left', 'around', 'another', 'nothing', 'something',
        'going', 'away', 'many', 'much', 'everybody', 'everyone'
        'between', 'kind', 'ask', 'hear', 'though', 'better', 'live', 'even', 'actually', 'didn'
}

# ==============================
# 3. Деление по периодам
# ==============================

early_words = []
late_words = []

for song in data:
    year = song.get("year")

    if not isinstance(year, int):
        continue

    text = song["text"].lower()
    words = re.findall(r'\b[a-z]+\b', text)
    words = [w for w in words if w not in stop_words and len(w) > 2]

    if 1967 <= year <= 1974:
        early_words.extend(words)
    elif 2000 <= year <= 2016:
        late_words.extend(words)

# ==============================
# 4. Частоты
# ==============================

early_counts = Counter(early_words)
late_counts = Counter(late_words)

# ==============================
# 5. Выделение характерных слов
# ==============================

MIN_FREQ = 10        # минимальная частота
DOMINANCE = 2        # во сколько раз чаще, чем в другом периоде

distinctive_early = []
distinctive_late = []

for word in early_counts:
    if (
        early_counts[word] >= MIN_FREQ and
        early_counts[word] > late_counts[word] * DOMINANCE
    ):
        distinctive_early.append((word, early_counts[word]))

for word in late_counts:
    if (
        late_counts[word] >= MIN_FREQ and
        late_counts[word] > early_counts[word] * DOMINANCE
    ):
        distinctive_late.append((word, late_counts[word]))

# ==============================
# 6. Вывод результатов
# ==============================

print("\n" + "=" * 60)
print("ХАРАКТЕРНЫЕ СЛОВА РАННЕГО КОЭНА (1967–1974)")
print("=" * 60)

for word, freq in sorted(distinctive_early, key=lambda x: x[1], reverse=True)[:15]:
    print(f"{word:<15} {freq}")

print("\n" + "=" * 60)
print("ХАРАКТЕРНЫЕ СЛОВА ПОЗДНЕГО КОЭНА (2000–2016)")
print("=" * 60)

for word, freq in sorted(distinctive_late, key=lambda x: x[1], reverse=True)[:15]:
    print(f"{word:<15} {freq}")
