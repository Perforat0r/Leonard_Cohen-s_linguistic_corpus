import matplotlib.pyplot as plt
import numpy as np

# Твои данные
early_words = ['LOVER', 'MAN', 'WAR', 'LADY', 'BODY', 'HAND', 'WOMAN', 'GREEN']
early_counts = [92, 30, 24, 18, 17, 16, 15, 12]

late_words = ['HEART', 'PLACE', 'DAY', 'LIGHT', 'TRUTH', 'HOME', 'MIND', 'HEALING']
late_counts = [36, 26, 23, 22, 21, 19, 17, 14]

def draw_butterfly():
    # Настройка стиля
    plt.style.use('dark_background') # Коэн — это всегда немного нуар
    fig, ax = plt.subplots(figsize=(12, 8))
    
    y_pos = np.arange(len(early_words))

    # Рисуем левую сторону (Ранний)
    # Делаем значения отрицательными, чтобы они шли влево
    ax.barh(y_pos, [-x for x in early_counts], color='#2ecc71', label='Ранний (1967-1974)')
    
    # Рисуем правую сторону (Поздний)
    ax.barh(y_pos, late_counts, color='#f1c40f', label='Поздний (2000-2016)')

    # Добавляем подписи слов
    for i, word in enumerate(early_words):
        ax.text(-5, i, word, ha='right', va='center', color='white', fontweight='bold')
    
    for i, word in enumerate(late_words):
        ax.text(5, i, word, ha='left', va='center', color='white', fontweight='bold')

    # Настройка осей
    ax.set_yticks([]) # Убираем стандартные деления
    ax.set_xticks([]) # Убираем цифры снизу
    ax.axvline(0, color='white', linewidth=1) # Линия разделения
    
    plt.title('ЛЕОНАРД КОЭН: СМЕНА ПАРАДИГМЫ\n(Телесные образы vs Философские смыслы)', 
              fontsize=16, pad=30, color='white')
    
    plt.legend(loc='upper center', bbox_to_anchor=(0.5, -0.05), ncol=2)
    
    # Убираем рамку
    for spine in ax.spines.values():
        spine.set_visible(False)

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    draw_butterfly()