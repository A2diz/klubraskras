# 🎨 Сайт Клуба Раскрасок

Сайт небольшого клуба любителей раскрасок, основанного 20 июня 2025 года.

## 🚀 Деплой на GitHub Pages

### Шаг 1 — Создай репозиторий

1. Зайди на [github.com/new](https://github.com/new)
2. Назови репозиторий, например: `coloring-club`
3. Сделай его **Public** (для бесплатного GitHub Pages)
4. Нажми **Create repository**

### Шаг 2 — Загрузи файлы

```bash
git init
git add .
git commit -m "🎨 Initial commit: coloring club website"
git branch -M main
git remote add origin https://github.com/ТВО_ИМЯПОЛЬЗОВАТЕЛЯ/coloring-club.git
git push -u origin main
```

### Шаг 3 — Включи GitHub Pages

1. Перейди в `Settings` → `Pages`
2. В разделе **Source** выбери **GitHub Actions**
3. Сохрани

После следующего пуша сайт автоматически задеплоится! Адрес будет:
`https://ТВО_ИМЯПОЛЬЗОВАТЕЛЯ.github.io/coloring-club/`

---

## 📬 Настройка формы (Formspree)

1. Зарегистрируйся на [formspree.io](https://formspree.io)
2. Нажми **+ New Form**
3. В настройках формы укажи email: `eavrublevskaya@gmail.com`
4. Скопируй ID формы (выглядит как `xyzwabcd`)
5. В файле `index.html` найди строку:
   ```html
   <form class="name-form" action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   и замени `YOUR_FORM_ID` на свой ID

---

## 🤖 Claude Code (GitHub Actions)

Для работы автоматических ревью кода:

1. Перейди в `Settings` → `Secrets and variables` → `Actions`
2. Нажми **New repository secret**
3. Имя: `ANTHROPIC_API_KEY`
4. Значение: твой API ключ от Anthropic

---

## 📁 Структура файлов

```
coloring-club/
├── index.html          # Главная страница
├── style.css           # Стили
├── main.js             # JavaScript
├── book1.png           # Обложка "Убийство за чашечкой чая"
├── book2.png           # Обложка "История одной встречи"
├── README.md
└── .github/
    └── workflows/
        ├── deploy.yml        # Деплой на GitHub Pages
        └── claude-review.yml # Автоматическое ревью кода
```
