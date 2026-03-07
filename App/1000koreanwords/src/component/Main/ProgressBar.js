import React from "react";
import '@app/style/progressbar.css';

const TOTAL_SEGS = 10;

export default class ProgressBar extends React.Component {

renderSegments(pct) {
  const filled  = Math.floor(pct / 100 * TOTAL_SEGS);
  const partial = (pct / 100 * TOTAL_SEGS) - filled;
  const STEP_DURATION = 0.1; 

  return Array.from({ length: TOTAL_SEGS }, (_, i) => {
    let cls = 'progress-seg';
    
    // On calcule les deux délais
    const delayForward = i * STEP_DURATION;
    const delayReverse = (TOTAL_SEGS - 1 - i) * STEP_DURATION;

    let style = {
      '--delay': `${delayForward.toFixed(2)}s`,
      '--delay-reverse': `${delayReverse.toFixed(2)}s`
    };

    if (i < filled) {
      cls += ' filled';
    } else if (i === filled && partial > 0) {
      cls += ' partial';
      style['--partial'] = `${(partial * 100).toFixed(1)}%`;
    }

    return <div key={i} className={cls} style={style} />;
  });
}
  render() {
    const { grade, progressPercentage } = this.props;

    return (
      <>
        <div className="progress-meta">
          <span className="progress-label">Progress</span>
          <span className={`progress-pct`}>
            {progressPercentage}%
          </span>
        </div>
        <div className={`progress-segments  ${grade !== null ? `level-${grade}` : ''}`}>
          {this.renderSegments(progressPercentage)}
        </div>
      </>
    );
  }
}