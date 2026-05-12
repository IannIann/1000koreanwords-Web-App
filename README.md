# 1000 Korean Words

A flashcard app to learn the 1000 most common Korean words. 

The backend lives in a separate repo: [1000koreanwords-API](https://github.com/IannIann/1000koreanwords-Web-API).

## What it does

- 28 built-in decks of ~40 words each, sorted by theme and difficulty.
- Quiz with a flashcards flipping and two answers: correct, wrong.
- Deck progression
- Cards can be hidden by the user.
- Cards can be copied to a custom deck.
- You can create your own decks and cards if you want to study something specific.
- Text-to-speech on each card so you can hear the word.
- A page on Hangeul (the Korean alphabet) for people who want to learn reading.
- Account system with email signup, login, password reset.

## Stack

- Front: React.
- Back: Node + Express + MongoDB. Auth uses HttpOnly cookies.

## Getting it running

You need the API running first (see the other repo).

```bash
cd App/1000koreanwords
npm install
npm start
```

## Project layout

```
App/1000koreanwords/src/
  component/   UI components, grouped by feature
  data/        API calls, one file per resource
  service/     Logic that combines several data calls
  style/       One CSS file per component
  tool/        Small helpers (route guards, withRouter, etc.)
```

Path alias `@app` points to `src/`.

## Author

Iann
