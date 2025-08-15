# Firebase Google Auth Mini

Мини-проект на Vite + React + TypeScript + Firebase Web SDK с входом через Google и кнопкой выхода.

## Старт

```bash
npm i
cp .env.local.example .env.local  # заполните ключи из Firebase Console
npm run dev
```

## Настройка Firebase

1. В консоли Firebase включите **Authentication → Sign-in method → Google**.
2. В *Project settings → General → Your apps* создайте Web App и скопируйте конфиг в `.env.local`.
