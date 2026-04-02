import '@app/style/progressbar.css';

const TOTAL_SEGS = 10;
const STEP_DURATION = 0.1;

function renderSegments(pct) {
    const filled  = Math.floor(pct / 100 * TOTAL_SEGS);
    const partial = (pct / 100 * TOTAL_SEGS) - filled;

    return Array.from({ length: TOTAL_SEGS }, (_, i) => {
        const style = {
            '--delay':         `${(i * STEP_DURATION).toFixed(2)}s`,
            '--delay-reverse': `${((TOTAL_SEGS - 1 - i) * STEP_DURATION).toFixed(2)}s`,
        };

        let cls = 'progress-seg';
        if (i < filled) {
            cls += ' filled';
        } else if (i === filled && partial > 0) {
            cls += ' partial';
            style['--partial'] = `${(partial * 100).toFixed(1)}%`;
        }

        return <div key={i} className={cls} style={style} />;
    });
}

export default function ProgressBar({ grade, progressPercentage, label, current, total }) {
    const isRatio      = current !== undefined && total !== undefined;
    const pct          = isRatio ? Math.round((current / total) * 100) : progressPercentage;
    const displayValue = isRatio ? `${current}/${total}` : `${progressPercentage}%`;

    return (
        <>
            <div className="progress-meta">
                {label && <span className="progress-label">{label}</span>}
                <span className="progress-pct">{displayValue}</span>
            </div>
            <div className={`progress-segments ${grade !== null ? `level-${grade}` : ''}`}>
                {renderSegments(pct)}
            </div>
        </>
    );
}
