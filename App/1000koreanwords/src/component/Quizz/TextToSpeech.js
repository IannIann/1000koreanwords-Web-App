import React from "react";

export default class TextToSpeech extends React.Component {
    playTTS = () => {
        const audioEl = document.querySelector('.component-tts > audio');
        audioEl.play();
    }

    render() {
        return (
            <div className="component-tts">
                <audio onCanPlay={this.playTTS} controls src={ttsURL(this.props.word, this.props.lang)} />
            </div>
        );
    }
}

const ttsURL = (text, lang) => {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${text}`;
}