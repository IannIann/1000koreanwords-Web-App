import '@app/style/buttonpronunciation.css';
import tool from '@app/tool/tool';

export default function ButtonPronunciation({ text, display = true }) {
    if (!display) return null;

    return (
        <button className="component-button-pronunciation pi pi-volume-up" onClick={() => tool.speakText(text)} />
    );
}
