const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://a2diz.github.io/klubraskras';

// ===== ССЫЛКИ И КНОПКИ =====
test('Кнопка "Вступить в клуб" ведёт на секцию #join', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.click('a.btn-hero');
  await expect(page).toHaveURL(/#join/);
});

test('Кнопка "Листать страницы" (книга 1) ведёт на review-tea.html', async ({ page }) => {
  await page.goto(BASE_URL);
  const href = await page.getAttribute('a.btn-review:first-of-type', 'href');
  expect(href).toContain('review-tea.html');
});

test('Кнопка "Листать страницы" (книга 2) ведёт на review-meeting.html', async ({ page }) => {
  await page.goto(BASE_URL);
  const buttons = page.locator('a.btn-review');
  const href = await buttons.nth(1).getAttribute('href');
  expect(href).toContain('review-meeting.html');
});

test('Ссылка на Telegram ведёт на @plack14', async ({ page }) => {
  await page.goto(BASE_URL);
  const href = await page.getAttribute('a.btn-tg', 'href');
  expect(href).toContain('t.me/plack14');
});

test('Ссылки "Купить на Ozon" ведут на ozon.ru', async ({ page }) => {
  await page.goto(BASE_URL);
  const links = page.locator('a.btn-outline');
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    if (href && href.includes('ozon')) {
      expect(href).toContain('ozon.ru');
    }
  }
});

test('Навигация — ссылки ведут на нужные секции', async ({ page }) => {
  await page.goto(BASE_URL);
  const navLinks = ['#about', '#books', '#naming', '#join'];
  for (const link of navLinks) {
    const el = page.locator(`a[href="${link}"]`).first();
    await expect(el).toBeVisible();
  }
});

// ===== СТРАНИЦЫ ОТКРЫВАЮТСЯ =====
test('Главная страница открывается', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Клуб раскрасок/);
});

test('Страница обзора "Убийство за чашечкой чая" открывается', async ({ page }) => {
  await page.goto(`${BASE_URL}/review-tea.html`);
  await expect(page.locator('h1')).toContainText('чашечкой');
});

test('Страница обзора "История одной встречи" открывается', async ({ page }) => {
  await page.goto(`${BASE_URL}/review-meeting.html`);
  await expect(page.locator('h1')).toContainText('встречи');
});

// ===== КАРТИНКИ =====
test('Обложка книги 1 загружается', async ({ page }) => {
  await page.goto(BASE_URL);
  const img = page.locator('img[alt="Убийство за чашечкой чая"]');
  await expect(img).toBeVisible();
  const naturalWidth = await img.evaluate(el => el.naturalWidth);
  expect(naturalWidth).toBeGreaterThan(0);
});

test('Обложка книги 2 загружается', async ({ page }) => {
  await page.goto(BASE_URL);
  const img = page.locator('img[alt="История одной встречи"]');
  await expect(img).toBeVisible();
  const naturalWidth = await img.evaluate(el => el.naturalWidth);
  expect(naturalWidth).toBeGreaterThan(0);
});

// ===== ФОРМА =====
test('Форма названия — поле обязательно для заполнения', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.click('button.btn-submit');
  const input = page.locator('input[name="club_name"]');
  const validationMessage = await input.evaluate(el => el.validationMessage);
  expect(validationMessage).not.toBe('');
});

test('Форма названия — поле принимает текст', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[name="club_name"]', 'Тест название');
  const value = await page.inputValue('input[name="club_name"]');
  expect(value).toBe('Тест название');
});

// ===== МОБИЛЬНАЯ ВЕРСИЯ =====
test('Мобильное меню — гамбургер открывает меню', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE_URL);
  const burger = page.locator('#nav-burger');
  await burger.click();
  const mobileMenu = page.locator('#nav-mobile');
  await expect(mobileMenu).toHaveClass(/open/);
});

test('На мобилке сайт не обрезается по горизонтали', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE_URL);
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  expect(bodyWidth).toBeLessThanOrEqual(375);
});

test('На планшете сайт выглядит нормально', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(BASE_URL);
  await expect(page.locator('h1')).toBeVisible();
});
