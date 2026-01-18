import matplotlib.pyplot as plt

# Данные из твоего последнего запуска
early_data = {
    'lover': 92, 'man': 30, 'war': 24, 'lady': 18, 
    'body': 17, 'hand': 16, 'woman': 15, 'green': 12
}

late_data = {
    'heart': 36, 'place': 26, 'day': 23, 'light': 22, 
    'truth': 21, 'home': 19, 'mind': 17, 'healing': 14
}

def plot_cohen_evolution():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
    fig.suptitle('Эволюция смыслов Леонарда Коэна', fontsize=16)

    # График раннего периода
    words_early = list(early_data.keys())
    counts_early = list(early_data.values())
    ax1.barh(words_early, counts_early, color='seagreen')
    ax1.set_title('Ранний период (1967–1974)\n"Мир плоти и образов"')
    ax1.invert_yaxis() 

    # График позднего периода
    words_late = list(late_data.keys())
    counts_late = list(late_data.values())
    ax2.barh(words_late, counts_late, color='goldenrod')
    ax2.set_title('Поздний период (2000–2016)\n"Мир духа и итогов"')
    ax2.invert_yaxis()

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    plot_cohen_evolution()