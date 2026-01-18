import json
from collections import Counter
import re

def analyze_cohen_corpus():
    # Путь к твоему очищенному файлу
    file_path = r"C:\Users\Ivan\Desktop\УЧЕБА\МАГА\Практика\drive-download-20260116T184135Z-3-001\cohen_clean_corpus.json"
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Файл {file_path} не найден!")
        return

    # Группируем песни по альбомам для детального анализа
    albums = {}
    for song in data:
        album_name = song.get('album', 'Unknown Album').upper()
        if album_name not in albums:
            albums[album_name] = ""
        # Предварительная чистка текста внутри анализатора
        text = song['text'].lower().replace("n't", " not").replace("'m", " am").replace("'s", " is")
        albums[album_name] += text + " "

    # Твой итоговый, максимально полный стоп-лист
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

    print("\n" + "="*60)
    print(f"{'АНАЛИЗ ЛЕКСИКИ ПО АЛЬБОМАМ':^60}")
    print("="*60)

    for album_name, lyrics in albums.items():
        # Извлекаем слова
        words = re.findall(r'\b\w+\b', lyrics)
        
        # Фильтруем: убираем стоп-слова и слишком короткие слова
        meaningful_words = [w for w in words if w not in stop_words and len(w) > 2]
        
        # Считаем ТОП-10 для каждого альбома
        stats = Counter(meaningful_words).most_common(10)
        
        print(f"\n{album_name}")
        print("-" * 60)
        for word, count in stats:
            print(f"{word:<20} | {count:<10}")
        print("-" * 60)

if __name__ == "__main__":
    analyze_cohen_corpus()