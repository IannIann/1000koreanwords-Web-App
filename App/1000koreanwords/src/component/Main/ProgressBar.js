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
    const { grade, progressPercentage, label, current, total } = this.props;

    const isRatio = current !== undefined && total !== undefined;
    const pct = isRatio ? Math.round((current / total) * 100) : progressPercentage;
    const displayValue = isRatio ? `${current}/${total}` : `${progressPercentage}%`;

    return (
      <>
        <div className="progress-meta">
          {label && <span className="progress-label">{label}</span>}
          <span className="progress-pct">{displayValue}</span>
        </div>
        <div className={`progress-segments ${grade !== null ? `level-${grade}` : ''}`}>
          {this.renderSegments(pct)}
        </div>
      </>
    );
  }
}