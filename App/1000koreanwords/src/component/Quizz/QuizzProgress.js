import ProgressBar from '@app/component/Main/ProgressBar';

export default function QuizzProgress({ scoreIndex, maxIndex }) {
  return (
    <div className="component-quizz-progress">
      <ProgressBar current={scoreIndex} total={maxIndex} grade={null} label="CARD" />
    </div>
  );
}