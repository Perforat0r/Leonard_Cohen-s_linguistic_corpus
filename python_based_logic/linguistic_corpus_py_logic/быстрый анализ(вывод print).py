import json
from collections import Counter
import re

def analyze_top_words():
    # Загружаем очищенный файл
    try:
        with open('cohen_clean_corpus.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("Файл cohen_clean_corpus.json не найден!")
        return

    all_text = ""
    for song in data:
        # Предварительная чистка сокращений
        clean_lyrics = song['text'].lower().replace("n't", " not").replace("'m", " am")
        all_text += clean_lyrics + " "

    # Разбиваем на слова (только буквы)
    words = re.findall(r'\b\w+\b', all_text)

    # Твой максимально полный список стоп-слов
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

    # Оставляем только те слова, которых нет в списке и которые длиннее 2 символов
    meaningful_words = [w for w in words if w not in stop_words and len(w) > 2]

    # Считаем ТОП-25 для большей наглядности
    stats = Counter(meaningful_words).most_common(25)

    print("\n" + "="*50)
    print(f"{'ЯДРО ПОЭЗИИ ЛЕОНАРДА КОЭНА':^50}")
    print("="*50)
    print(f"{'СЛОВО (КОНЦЕПТ)':<25} | {'ЧАСТОТА':<10}")
    print("-"*50)
    for word, count in stats:
        print(f"{word.upper():<25} | {count:<10}")
    print("="*50)

if __name__ == "__main__":
    analyze_top_words()