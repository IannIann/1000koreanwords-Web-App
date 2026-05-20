import '@app/style/quizztheme.css';

export default function QuizzTheme({ theme, krTheme }) {
  return (
    <div className="quizz-theme-header">
      <div className="center">
        <div className="page-title">{theme}</div>
        <div className="page-subtitle">{krTheme}</div>
      </div>
    </div>
  );
}