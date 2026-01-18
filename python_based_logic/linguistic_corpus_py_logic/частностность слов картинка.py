import json
import re
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import os

# Получаем абсолютный путь к папке, где находится текущий скрипт
script_dir = os.path.dirname(os.path.abspath(__file__))

# Объединяем путь к папке с именем файла
file_path = os.path.join(script_dir, "cohen_clean_corpus.json")

# 1. Загрузка данных
#with open("cohen_clean_corpus.json", encoding="utf-8") as f:
#   data = json.load(f)

with open(file_path, encoding="utf-8") as f:
    data = json.load(f)

# 2. Твой финальный стоп-лист (чтобы в облако не попал мусор)
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

# 3. Собираем весь текст
all_text = ""
for song in data:
    all_text += song['text'].lower() + " "

# 4. Генерация облака
# Мы сделаем его в стиле "Dark Cohen": черный фон и холодные оттенки
wordcloud = WordCloud(
    width=1600, 
    height=800,
    background_color='black',
    colormap='YlOrBr',  # Золотисто-оранжевые тона (как свет в темноте)
    stopwords=stop_words,
    min_font_size=10
).generate(all_text)

# 5. Визуализация
plt.figure(figsize=(20,10), facecolor='k')
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")
plt.tight_layout(pad=0)
plt.show()