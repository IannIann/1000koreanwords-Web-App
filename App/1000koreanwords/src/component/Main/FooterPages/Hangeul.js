import '@app/style/hangeul.css';

export default function Hangeul() {
    return (
        <div className="component-hangeul">
            <h1 className="page-title">한글 Reading Guide</h1>
            <p className="page-subtitle">From zero to reading Korean — a complete beginner's guide</p>

            <nav className="hangeul-toc">
                <a href="#what-is-hangul">What is Hangul?</a>
                <a href="#consonants">Consonants</a>
                <a href="#vowels">Vowels</a>
                <a href="#syllable-blocks">Syllable Blocks</a>
                <a href="#batchim">Batchim</a>
                <a href="#pronunciation-rules">Pronunciation Rules</a>
                <a href="#common-mistakes">Common Mistakes</a>
            </nav>

            {/* ── SECTION 1 ── */}
            <section className="hangeul-section" id="what-is-hangul">
                <h2>1. What is Hangul?</h2>
                <p className="hangeul-section-subtitle">한글 — the Korean alphabet</p>

                <p>
                    Hangul (한글) was invented in 1443 by King Sejong the Great. He designed it
                    deliberately to be easy to learn. Each letter shape was based on the position of
                    the mouth and tongue when producing that sound.
                </p>
                <p>
                    It is a <strong>phonetic alphabet</strong>: each letter represents one sound, not
                    a picture or a whole word. There are <strong>24 basic letters</strong>, split into
                    14 consonants and 10 vowels.
                </p>
                <p>
                    Korean letters are not written in a line. They are <strong>stacked into syllable
                    blocks</strong>. Each block represents exactly one syllable. Text runs left to
                    right, top to bottom, like English.
                </p>

                <div className="hangeul-tip">
                    <strong>Key insight</strong>
                    Once you know the 24 letters and how blocks work, you can read any Korean word
                    out loud. Even without knowing its meaning. Most people reach that point in a few
                    hours.
                </div>

                <table className="hangeul-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Hangul</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Type</td><td>Phonetic alphabet (one letter = one sound)</td></tr>
                        <tr><td>Basic letters</td><td>24 (14 consonants + 10 vowels)</td></tr>
                        <tr><td>Writing unit</td><td>Syllable block (not individual letters)</td></tr>
                        <tr><td>Direction</td><td>Left to right, top to bottom</td></tr>
                        <tr><td>Created</td><td>1443, by King Sejong the Great</td></tr>
                    </tbody>
                </table>
            </section>

            {/* ── SECTION 2 ── */}
            <section className="hangeul-section" id="consonants">
                <h2>2. Consonants (자음)</h2>
                <p className="hangeul-section-subtitle">14 basic + 5 tense = 19 consonants total</p>

                <p>
                    Korean consonants belong to three families. Understanding the families is more
                    useful than memorizing 19 isolated letters, because most share a base shape and
                    a related sound.
                </p>

                <div className="hangeul-family-grid">
                    <div className="hangeul-family-card plain">
                        <div className="family-label">Plain (기본)</div>
                        <div className="family-desc">Soft, minimal air. These are the base consonants.</div>
                        <div className="family-chars">ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅎ</div>
                    </div>
                    <div className="hangeul-family-card aspirated">
                        <div className="family-label">Aspirated (격음)</div>
                        <div className="family-desc">A strong puff of air. Visually, they add a stroke to the plain base.</div>
                        <div className="family-chars">ㅋ ㅌ ㅍ ㅊ</div>
                    </div>
                    <div className="hangeul-family-card tense">
                        <div className="family-label">Tense (경음)</div>
                        <div className="family-desc">Squeezed, no air at all. Written as doubled letters.</div>
                        <div className="family-chars">ㄲ ㄸ ㅃ ㅆ ㅉ</div>
                    </div>
                </div>

                <div className="hangeul-tip">
                    <strong>The paper test</strong>
                    Hold a sheet of paper in front of your mouth. Aspirated consonants (ㅋ ㅌ ㅍ ㅊ)
                    should make it fly forward. Tense consonants (ㄲ ㄸ ㅃ ㅆ ㅉ) produce almost no
                    air at all. Plain consonants fall somewhere in between.
                </div>

                <p>
                    Each consonant can appear in two positions inside a syllable block: at the
                    <strong> start</strong> of a syllable (initial position) or at the{' '}
                    <strong>end</strong> (final position, also called batchim). The same consonant
                    letter can sound different depending on where it sits. The table below shows both.
                    Final position sounds are covered in detail in Section 5.
                </p>

                <h3>14 Basic Consonants</h3>
                <table className="hangeul-table">
                    <thead>
                        <tr>
                            <th>Letter</th>
                            <th>Name</th>
                            <th>Initial sound</th>
                            <th>Final sound</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="char">ㄱ</td>
                            <td className="name">기역 giyeok</td>
                            <td>"g" as in <em>go</em> (softer than English)</td>
                            <td>unreleased "k"</td>
                        </tr>
                        <tr>
                            <td className="char">ㄴ</td>
                            <td className="name">니은 nieun</td>
                            <td>"n" as in <em>no</em></td>
                            <td>"n"</td>
                        </tr>
                        <tr>
                            <td className="char">ㄷ</td>
                            <td className="name">디귿 digeut</td>
                            <td>"d" as in <em>do</em> (softer)</td>
                            <td>unreleased "t"</td>
                        </tr>
                        <tr>
                            <td className="char">ㄹ</td>
                            <td className="name">리을 rieul</td>
                            <td>flap — like "tt" in American <em>butter</em></td>
                            <td>"l" as in <em>feel</em></td>
                        </tr>
                        <tr>
                            <td className="char">ㅁ</td>
                            <td className="name">미음 mieum</td>
                            <td>"m" as in <em>mom</em></td>
                            <td>"m"</td>
                        </tr>
                        <tr>
                            <td className="char">ㅂ</td>
                            <td className="name">비읍 bieup</td>
                            <td>"b" as in <em>be</em> (softer)</td>
                            <td>unreleased "p"</td>
                        </tr>
                        <tr>
                            <td className="char">ㅅ</td>
                            <td className="name">시옷 siot</td>
                            <td>"s" (or "sh" before ㅣ ㅑ ㅕ ㅛ ㅠ)</td>
                            <td>unreleased "t"</td>
                        </tr>
                        <tr>
                            <td className="char">ㅇ</td>
                            <td className="name">이응 ieung</td>
                            <td>silent (placeholder)</td>
                            <td>"ng" as in <em>song</em></td>
                        </tr>
                        <tr>
                            <td className="char">ㅈ</td>
                            <td className="name">지읒 jieut</td>
                            <td>between "j" and "ch"</td>
                            <td>unreleased "t"</td>
                        </tr>
                        <tr>
                            <td className="char">ㅎ</td>
                            <td className="name">히읗 hieut</td>
                            <td>breathy "h"</td>
                            <td>absorbed or silent</td>
                        </tr>
                    </tbody>
                </table>

                <h3>4 Aspirated Consonants</h3>
                <table className="hangeul-table">
                    <thead>
                        <tr>
                            <th>Letter</th>
                            <th>Name</th>
                            <th>Sound</th>
                            <th>Base letter</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="char">ㅋ</td>
                            <td className="name">키읔 kieuk</td>
                            <td>"k" with a puff of air</td>
                            <td>ㄱ + stroke</td>
                        </tr>
                        <tr>
                            <td className="char">ㅌ</td>
                            <td className="name">티읕 tieut</td>
                            <td>"t" with a puff of air</td>
                            <td>ㄷ + stroke</td>
                        </tr>
                        <tr>
                            <td className="char">ㅍ</td>
                            <td className="name">피읖 pieup</td>
                            <td>"p" with a puff of air</td>
                            <td>ㅂ + stroke</td>
                        </tr>
                        <tr>
                            <td className="char">ㅊ</td>
                            <td className="name">치읓 chieut</td>
                            <td>"ch" with a puff of air</td>
                            <td>ㅈ + stroke</td>
                        </tr>
                    </tbody>
                </table>

                <h3>5 Tense Consonants</h3>
                <table className="hangeul-table">
                    <thead>
                        <tr>
                            <th>Letter</th>
                            <th>Name</th>
                            <th>Sound</th>
                            <th>Base letter</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="char">ㄲ</td>
                            <td className="name">쌍기역</td>
                            <td>hard "k" — tense, no air</td>
                            <td>ㄱ doubled</td>
                        </tr>
                        <tr>
                            <td className="char">ㄸ</td>
                            <td className="name">쌍디귿</td>
                            <td>hard "t" — tense, no air</td>
                            <td>ㄷ doubled</td>
                        </tr>
                        <tr>
                            <td className="char">ㅃ</td>
                            <td className="name">쌍비읍</td>
                            <td>hard "p" — tense, no air</td>
                            <td>ㅂ doubled</td>
                        </tr>
                        <tr>
                            <td className="char">ㅆ</td>
                            <td className="name">쌍시옷</td>
                            <td>hard "ss" — tense, no air</td>
                            <td>ㅅ doubled</td>
                        </tr>
                        <tr>
                            <td className="char">ㅉ</td>
                            <td className="name">쌍지읒</td>
                            <td>hard "ch" — tense, no air</td>
                            <td>ㅈ doubled</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Why the three-way contrast matters</h3>
                <p>
                    These three families are separate phonemes. Korean speakers hear them as completely
                    distinct, the same way English speakers distinguish "p" from "b". Mixing them up
                    changes the word:
                </p>

                <div className="hangeul-minimal-pairs">
                    <div className="hangeul-pair">
                        <div>
                            <div className="pair-char">달</div>
                            <div className="pair-info">dal<br /><span className="pair-meaning">moon</span></div>
                        </div>
                    </div>
                    <div className="hangeul-pair">
                        <div>
                            <div className="pair-char">탈</div>
                            <div className="pair-info">tal<br /><span className="pair-meaning">mask</span></div>
                        </div>
                    </div>
                    <div className="hangeul-pair">
                        <div>
                            <div className="pair-char">딸</div>
                            <div className="pair-info">ttal<br /><span className="pair-meaning">daughter</span></div>
                        </div>
                    </div>
                    <div className="hangeul-pair">
                        <div>
                            <div className="pair-char">발</div>
                            <div className="pair-info">bal<br /><span className="pair-meaning">foot / leg</span></div>
                        </div>
                    </div>
                    <div className="hangeul-pair">
                        <div>
                            <div className="pair-char">팔</div>
                            <div className="pair-info">pal<br /><span className="pair-meaning">arm</span></div>
                        </div>
                    </div>
                    <div className="hangeul-pair">
                        <div>
                            <div className="pair-char">빨</div>
                            <div className="pair-info">ppal<br /><span className="pair-meaning">red</span></div>
                        </div>
                    </div>
                </div>

                <h3>Special notes on ㄹ and ㅇ</h3>
                <div className="hangeul-warning">
                    <strong>Watch out : ㄹ is not R or L</strong>
                    ㄹ is a flap between vowels: the tongue briefly bounces off the gum ridge, like
                    the "tt" in American "butter". At the end of a syllable it sounds like "l" in
                    "feel". Never curl the tongue back or round the lips like English R.
                </div>
                <div className="hangeul-warning">
                    <strong>Watch out : ㅇ has two roles</strong>
                    At the <em>start</em> of a syllable it is completely silent. It gives vowels a
                    place to sit (아 = "a", 이 = "i"). At the <em>end</em> of a syllable it is a
                    full /ng/ sound as in "song" (강 = "gang", 방 = "bang"). Never skip the final ㅇ.
                </div>
            </section>

            {/* ── SECTION 3 ── */}
            <section className="hangeul-section" id="vowels">
                <h2>3. Vowels (모음)</h2>
                <p className="hangeul-section-subtitle">10 basic + 11 compound = 21 vowels total</p>

                <p>
                    Vowels come in two shapes. <strong>Vertical vowels</strong> have a tall line and
                    sit to the right of their consonant. <strong>Horizontal vowels</strong> have a
                    wide line and sit below their consonant. The shape tells you instantly where the
                    vowel goes in a syllable block, which you will need when you reach Section 4.
                </p>

                <h3>10 Basic Vowels</h3>
                <table className="hangeul-table">
                    <thead>
                        <tr>
                            <th>Letter</th>
                            <th>Type</th>
                            <th>Sound</th>
                            <th>Tip</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="char">ㅏ</td>
                            <td>Vertical</td>
                            <td className="sound">"a" as in <em>father</em></td>
                            <td>Mouth wide open</td>
                        </tr>
                        <tr>
                            <td className="char">ㅓ</td>
                            <td>Vertical</td>
                            <td className="sound">"uh" — open, not rounded</td>
                            <td>Like British "fur" without the R. One sound, not two.</td>
                        </tr>
                        <tr>
                            <td className="char">ㅣ</td>
                            <td>Vertical</td>
                            <td className="sound">"ee" as in <em>see</em></td>
                            <td>Pure — don't let it drift</td>
                        </tr>
                        <tr>
                            <td className="char">ㅑ</td>
                            <td>Vertical</td>
                            <td className="sound">"ya" as in <em>yard</em></td>
                            <td>ㅏ with a Y onset</td>
                        </tr>
                        <tr>
                            <td className="char">ㅕ</td>
                            <td>Vertical</td>
                            <td className="sound">"yuh"</td>
                            <td>ㅓ with a Y onset</td>
                        </tr>
                        <tr>
                            <td className="char">ㅗ</td>
                            <td>Horizontal</td>
                            <td className="sound">"o" — pure, no glide</td>
                            <td>Like Spanish or Italian "o". Not English "oh", which drifts.</td>
                        </tr>
                        <tr>
                            <td className="char">ㅜ</td>
                            <td>Horizontal</td>
                            <td className="sound">"oo" as in <em>food</em> — pure</td>
                            <td>Hold the sound steady</td>
                        </tr>
                        <tr>
                            <td className="char">ㅡ</td>
                            <td>Horizontal</td>
                            <td className="sound">"eu" — no English equivalent</td>
                            <td>Spread lips flat (no rounding), say "ugh". This is the hardest vowel for English speakers.</td>
                        </tr>
                        <tr>
                            <td className="char">ㅛ</td>
                            <td>Horizontal</td>
                            <td className="sound">"yo" as in <em>yoga</em></td>
                            <td>ㅗ with a Y onset</td>
                        </tr>
                        <tr>
                            <td className="char">ㅠ</td>
                            <td>Horizontal</td>
                            <td className="sound">"yoo"</td>
                            <td>ㅜ with a Y onset</td>
                        </tr>
                    </tbody>
                </table>

                <h3>11 Compound Vowels</h3>
                <p>
                    Compound vowels combine two basic vowels. The shape is a visual merge of both
                    components.
                </p>

                <table className="hangeul-table">
                    <thead>
                        <tr>
                            <th>Letter</th>
                            <th>Components</th>
                            <th>Sound</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="char">ㅘ</td><td>ㅗ + ㅏ</td><td className="sound">"wa"</td><td>봐요 — (I) see</td></tr>
                        <tr><td className="char">ㅚ</td><td>ㅗ + ㅣ</td><td className="sound">"weh"</td><td>외국 — foreign country</td></tr>
                        <tr><td className="char">ㅙ</td><td>ㅗ + ㅐ</td><td className="sound">"weh" (same as ㅚ)</td><td>돼지 — pig</td></tr>
                        <tr><td className="char">ㅝ</td><td>ㅜ + ㅓ</td><td className="sound">"wuh" as in <em>wonder</em></td><td>뭐 — what</td></tr>
                        <tr><td className="char">ㅞ</td><td>ㅜ + ㅔ</td><td className="sound">"weh"</td><td>웨이터 — waiter</td></tr>
                        <tr><td className="char">ㅟ</td><td>ㅜ + ㅣ</td><td className="sound">"wi"</td><td>쥐 — mouse</td></tr>
                        <tr><td className="char">ㅢ</td><td>ㅡ + ㅣ</td><td className="sound">"eui" (context-dependent)</td><td>의사 — doctor</td></tr>
                        <tr><td className="char">ㅐ</td><td>ㅏ + ㅣ</td><td className="sound">"eh" as in <em>bed</em></td><td>개 — dog</td></tr>
                        <tr><td className="char">ㅔ</td><td>ㅓ + ㅣ</td><td className="sound">"eh" (identical to ㅐ in modern Korean)</td><td>네 — yes</td></tr>
                        <tr><td className="char">ㅒ</td><td>ㅑ + ㅣ</td><td className="sound">"yeh"</td><td>얘 — this kid</td></tr>
                        <tr><td className="char">ㅖ</td><td>ㅕ + ㅣ</td><td className="sound">"yeh" (same as ㅒ)</td><td>예 — yes / example</td></tr>
                    </tbody>
                </table>

                <div className="hangeul-tip">
                    <strong>Note on ㅐ and ㅔ</strong>
                    These two vowels are spelled differently but pronounced identically in modern
                    Korean. Don't try to distinguish them in speech. Learn the spelling of each word
                    as you encounter it.
                </div>

                <div className="hangeul-tip">
                    <strong>Note on ㅢ</strong>
                    Its pronunciation shifts with context. At the start of a word it sounds like
                    "eui" (both vowel sounds blended). After a consonant it usually sounds like ㅣ
                    "ee". As the possessive particle 의 it often sounds like "e" (as in <em>bed</em>).
                </div>
            </section>

            {/* ── SECTION 4 ── */}
            <section className="hangeul-section" id="syllable-blocks">
                <h2>4. Syllable Blocks (음절)</h2>
                <p className="hangeul-section-subtitle">Every Korean syllable is written as a stacked block</p>

                <p>
                    This is what makes Korean look different from European languages. Letters are not
                    written in a row. They are arranged into <strong>square blocks</strong>, one block
                    per syllable. Each block must contain at least one consonant and one vowel.
                </p>

                <p>
                    Recall from Section 3 that vowels are either vertical (tall line, goes to the
                    right of the consonant) or horizontal (wide line, goes below the consonant).
                    This directly determines how the block is laid out.
                </p>

                <div className="hangeul-tip">
                    <strong>Golden rule : find the vowel first</strong>
                    Every block has exactly one vowel. Spot it: is it a vertical line on the right,
                    or a horizontal line below? Everything else follows. What comes before or above
                    it is the initial consonant. What sits at the bottom is the final consonant
                    (batchim).
                </div>

                <h3>Block structures</h3>
                <div className="hangeul-block-grid">
                    <div className="hangeul-block-item">
                        <div className="hangeul-block-visual">
                            <div className="bv-row">
                                <div className="bv-cell C">C</div>
                                <div className="bv-cell V">V↕</div>
                            </div>
                        </div>
                        <span className="hangeul-block-example">가</span>
                        <div className="hangeul-block-breakdown">ㄱ + ㅏ → "ga"</div>
                    </div>
                    <div className="hangeul-block-item">
                        <div className="hangeul-block-visual">
                            <div className="bv-row">
                                <div className="bv-cell C CV">C</div>
                            </div>
                            <div className="bv-row">
                                <div className="bv-cell V CV">V↔</div>
                            </div>
                        </div>
                        <span className="hangeul-block-example">노</span>
                        <div className="hangeul-block-breakdown">ㄴ + ㅗ → "no"</div>
                    </div>
                    <div className="hangeul-block-item">
                        <div className="hangeul-block-visual">
                            <div className="bv-row">
                                <div className="bv-cell C">C</div>
                                <div className="bv-cell V">V↕</div>
                            </div>
                            <div className="bv-row">
                                <div className="bv-cell B CV">B (batchim)</div>
                            </div>
                        </div>
                        <span className="hangeul-block-example">한</span>
                        <div className="hangeul-block-breakdown">ㅎ + ㅏ + ㄴ → "han"</div>
                    </div>
                    <div className="hangeul-block-item">
                        <div className="hangeul-block-visual">
                            <div className="bv-row">
                                <div className="bv-cell C CV">C</div>
                            </div>
                            <div className="bv-row">
                                <div className="bv-cell V CV">V↔</div>
                            </div>
                            <div className="bv-row">
                                <div className="bv-cell B CV">B (batchim)</div>
                            </div>
                        </div>
                        <span className="hangeul-block-example">글</span>
                        <div className="hangeul-block-breakdown">ㄱ + ㅡ + ㄹ → "geul"</div>
                    </div>
                    <div className="hangeul-block-item">
                        <div className="hangeul-block-visual">
                            <div className="bv-row">
                                <div className="bv-cell C">ㅇ</div>
                                <div className="bv-cell V">V↕</div>
                            </div>
                        </div>
                        <span className="hangeul-block-example">아</span>
                        <div className="hangeul-block-breakdown">ㅇ(silent) + ㅏ → "a"</div>
                    </div>
                </div>

                <p>
                    When a syllable starts with a vowel sound (no initial consonant), the silent
                    placeholder <strong>ㅇ</strong> fills the consonant slot to keep the block square.
                </p>

                <h3>Reading real words</h3>
                <div className="hangeul-examples">
                    <div className="hangeul-example-card">
                        <div className="ex-korean">한글</div>
                        <div className="ex-pronunciation">han-geul</div>
                        <div className="ex-meaning">Hangul — the Korean alphabet</div>
                    </div>
                    <div className="hangeul-example-card">
                        <div className="ex-korean">서울</div>
                        <div className="ex-pronunciation">seo-ul</div>
                        <div className="ex-meaning">Seoul — capital of Korea</div>
                    </div>
                    <div className="hangeul-example-card">
                        <div className="ex-korean">김치</div>
                        <div className="ex-pronunciation">gim-chi</div>
                        <div className="ex-meaning">Kimchi</div>
                    </div>
                    <div className="hangeul-example-card">
                        <div className="ex-korean">한국어</div>
                        <div className="ex-pronunciation">han-guk-eo</div>
                        <div className="ex-meaning">Korean language</div>
                    </div>
                    <div className="hangeul-example-card">
                        <div className="ex-korean">태권도</div>
                        <div className="ex-pronunciation">tae-kwon-do</div>
                        <div className="ex-meaning">Taekwondo</div>
                    </div>
                    <div className="hangeul-example-card">
                        <div className="ex-korean">안녕하세요</div>
                        <div className="ex-pronunciation">an-nyeong-ha-se-yo</div>
                        <div className="ex-meaning">Hello</div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 5 ── */}
            <section className="hangeul-section" id="batchim">
                <h2>5. Batchim (받침)</h2>
                <p className="hangeul-section-subtitle">The final consonant at the bottom of a syllable block</p>

                <p>
                    A <strong>batchim</strong> (받침) is a consonant at the bottom of a syllable block.
                    Not every syllable has one, it is optional. When present, it is the last sound
                    of that syllable.
                </p>
                <p>
                    You have already seen how consonants sound at the start of a syllable (Section 2).
                    In final position, things simplify. Although any of the 19 consonants can appear as
                    a batchim, they all collapse into just <strong>7 distinct sounds</strong>. Each of
                    these sounds is <em>unreleased</em>: you form the mouth shape but stop before
                    releasing the air.
                </p>

                <table className="hangeul-table">
                    <thead>
                        <tr>
                            <th>Sound</th>
                            <th>Consonants that make it</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="char">ㄱ</td>
                            <td>ㄱ ㅋ ㄲ</td>
                            <td>Unreleased "k" — mouth closes at the back</td>
                        </tr>
                        <tr>
                            <td className="char">ㄴ</td>
                            <td>ㄴ</td>
                            <td>"n" — tongue stays on gum ridge</td>
                        </tr>
                        <tr>
                            <td className="char">ㄷ</td>
                            <td>ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ</td>
                            <td>Unreleased "t" — tongue on gum ridge, no release</td>
                        </tr>
                        <tr>
                            <td className="char">ㄹ</td>
                            <td>ㄹ</td>
                            <td>"l" as in <em>feel</em></td>
                        </tr>
                        <tr>
                            <td className="char">ㅁ</td>
                            <td>ㅁ</td>
                            <td>"m" — lips close</td>
                        </tr>
                        <tr>
                            <td className="char">ㅂ</td>
                            <td>ㅂ ㅍ</td>
                            <td>Unreleased "p" — lips close, no release</td>
                        </tr>
                        <tr>
                            <td className="char">ㅇ</td>
                            <td>ㅇ</td>
                            <td>"ng" as in <em>song</em> — back of throat</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Double batchim (겹받침)</h3>
                <p>
                    Some syllables have <strong>two consonants</strong> stacked in the batchim slot.
                    Only one gets pronounced. The rule depends on which cluster it is:
                </p>
                <table className="hangeul-table">
                    <thead>
                        <tr>
                            <th>Which sounds</th>
                            <th>Batchim clusters</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>First consonant</td>
                            <td>ㄵ ㄶ ㄼ ㅄ</td>
                            <td>없다 → [업따] — not have</td>
                        </tr>
                        <tr>
                            <td>Second consonant</td>
                            <td>ㄺ ㄻ</td>
                            <td>닭 → [닥] — chicken &nbsp;|&nbsp; 삶 → [삼] — life</td>
                        </tr>
                    </tbody>
                </table>
                <div className="hangeul-tip">
                    <strong>Liaison exception</strong>
                    When a double batchim is followed by ㅇ (silent placeholder), the second
                    consonant moves to the next syllable instead of being dropped: 닭이 → [달기],
                    없어 → [업써]. This is the liaison rule (covered in Section 6) applied to double
                    batchim clusters.
                </div>
            </section>

            {/* ── SECTION 6 ── */}
            <section className="hangeul-section" id="pronunciation-rules">
                <h2>6. Pronunciation Rules</h2>
                <p className="hangeul-section-subtitle">How sounds change in connected speech</p>

                <p>
                    Korean is written phonemically, but sounds shift at syllable boundaries in
                    natural speech. These changes are predictable. Your mouth is taking natural
                    shortcuts for smoothness, exactly like English does ("want to" → "wanna").
                </p>
                <p>
                    The written form stays the same. The pronunciation adapts. Both matter.
                </p>

                <div className="hangeul-rule">
                    <div className="rule-header">
                        <span className="rule-number">Rule 1</span>
                        <span className="rule-name">Liaison — 연음화</span>
                    </div>
                    <div className="rule-condition">
                        When a batchim is followed by a syllable starting with ㅇ (silent
                        placeholder), the batchim consonant slides forward and becomes the initial
                        consonant of the next syllable. This is the most frequent rule you will
                        encounter.
                    </div>
                    <div className="rule-examples">
                        <div className="rule-ex"><span className="ke">밥이</span><span className="arrow">→</span><span className="pronounced">[바비]</span> rice (subject)</div>
                        <div className="rule-ex"><span className="ke">있어요</span><span className="arrow">→</span><span className="pronounced">[이써요]</span> there is</div>
                        <div className="rule-ex"><span className="ke">한국어</span><span className="arrow">→</span><span className="pronounced">[한구거]</span> Korean language</div>
                        <div className="rule-ex"><span className="ke">좋아요</span><span className="arrow">→</span><span className="pronounced">[조아요]</span> it's good (ㅎ disappears)</div>
                    </div>
                </div>

                <div className="hangeul-rule">
                    <div className="rule-header">
                        <span className="rule-number">Rule 2</span>
                        <span className="rule-name">Nasalization — 비음화</span>
                    </div>
                    <div className="rule-condition">
                        When a stop batchim from the ㄱ, ㄷ, or ㅂ family meets a nasal consonant
                        (ㄴ or ㅁ), the stop shifts to the nasal at the same point of articulation:
                        ㄱ → ㅇ, ㄷ → ㄴ, ㅂ → ㅁ.
                    </div>
                    <div className="rule-examples">
                        <div className="rule-ex"><span className="ke">국내</span><span className="arrow">→</span><span className="pronounced">[궁내]</span> domestic</div>
                        <div className="rule-ex"><span className="ke">감사합니다</span><span className="arrow">→</span><span className="pronounced">[감사함니다]</span> thank you</div>
                        <div className="rule-ex"><span className="ke">학년</span><span className="arrow">→</span><span className="pronounced">[항년]</span> school year</div>
                    </div>
                </div>

                <div className="hangeul-rule">
                    <div className="rule-header">
                        <span className="rule-number">Rule 3</span>
                        <span className="rule-name">Liquid Assimilation — 유음화</span>
                    </div>
                    <div className="rule-condition">
                        When ㄴ and ㄹ are adjacent, ㄴ becomes ㄹ. The result is two ㄹ sounds in a row.
                    </div>
                    <div className="rule-examples">
                        <div className="rule-ex"><span className="ke">설날</span><span className="arrow">→</span><span className="pronounced">[설랄]</span> Lunar New Year</div>
                        <div className="rule-ex"><span className="ke">신라</span><span className="arrow">→</span><span className="pronounced">[실라]</span> Silla dynasty</div>
                    </div>
                </div>

                <div className="hangeul-rule">
                    <div className="rule-header">
                        <span className="rule-number">Rule 4</span>
                        <span className="rule-name">Palatalization — 구개음화</span>
                    </div>
                    <div className="rule-condition">
                        When a ㄷ or ㅌ batchim is followed by the vowel ㅣ, they shift forward in
                        the mouth: ㄷ becomes ㅈ, ㅌ becomes ㅊ.
                    </div>
                    <div className="rule-examples">
                        <div className="rule-ex"><span className="ke">같이</span><span className="arrow">→</span><span className="pronounced">[가치]</span> together</div>
                        <div className="rule-ex"><span className="ke">굳이</span><span className="arrow">→</span><span className="pronounced">[구지]</span> insistently</div>
                        <div className="rule-ex"><span className="ke">끝이</span><span className="arrow">→</span><span className="pronounced">[끄치]</span> the end</div>
                    </div>
                </div>

                <div className="hangeul-rule">
                    <div className="rule-header">
                        <span className="rule-number">Rule 5</span>
                        <span className="rule-name">Aspiration — 격음화</span>
                    </div>
                    <div className="rule-condition">
                        When ㅎ meets a plain consonant in either direction, they fuse into the
                        corresponding aspirated consonant: ㄱ+ㅎ → ㅋ, ㄷ+ㅎ → ㅌ, ㅂ+ㅎ → ㅍ,
                        ㅈ+ㅎ → ㅊ.
                    </div>
                    <div className="rule-examples">
                        <div className="rule-ex"><span className="ke">좋다</span><span className="arrow">→</span><span className="pronounced">[조타]</span> to be good</div>
                        <div className="rule-ex"><span className="ke">입학</span><span className="arrow">→</span><span className="pronounced">[이팍]</span> enrollment</div>
                        <div className="rule-ex"><span className="ke">못하다</span><span className="arrow">→</span><span className="pronounced">[모타다]</span> cannot</div>
                    </div>
                </div>

                <div className="hangeul-rule">
                    <div className="rule-header">
                        <span className="rule-number">Rule 6</span>
                        <span className="rule-name">Tensification — 경음화</span>
                    </div>
                    <div className="rule-condition">
                        When a stop batchim (ㄱ, ㄷ, or ㅂ family) is followed by a plain consonant
                        (ㄱ ㄷ ㅂ ㅅ ㅈ), the plain consonant becomes its tense equivalent.
                    </div>
                    <div className="rule-examples">
                        <div className="rule-ex"><span className="ke">학교</span><span className="arrow">→</span><span className="pronounced">[학꾜]</span> school</div>
                        <div className="rule-ex"><span className="ke">먹다</span><span className="arrow">→</span><span className="pronounced">[먹따]</span> to eat</div>
                        <div className="rule-ex"><span className="ke">식당</span><span className="arrow">→</span><span className="pronounced">[식땅]</span> restaurant</div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 7 ── */}
            <section className="hangeul-section" id="common-mistakes">
                <h2>7. Common Mistakes</h2>
                <p className="hangeul-section-subtitle">Traps to avoid before they become habits</p>

                <div className="hangeul-warning">
                    <strong>Treating romanization as pronunciation</strong>
                    Romanization (the English letters used to write Korean sounds) is a temporary
                    scaffold, not an accurate representation. "eo" is not "ee-oh", it is one sound.
                    "eu" is not "ee-oo". Always redirect your attention to the Hangul character and
                    its sound. Drop romanization as soon as you can.
                </div>

                <div className="hangeul-warning">
                    <strong>Ignoring the plain / aspirated / tense distinction</strong>
                    ㄱ, ㅋ, and ㄲ are three separate phonemes. Korean speakers hear them as clearly
                    as English speakers hear "p" and "b". Use the paper test from Section 2 and
                    practice minimal pairs: 달 (moon) / 탈 (mask) / 딸 (daughter).
                </div>

                <div className="hangeul-warning">
                    <strong>Using English R or L for ㄹ</strong>
                    ㄹ is neither. Between vowels it is a flap, the tongue taps the gum ridge once,
                    like American "butter". At the end of a syllable it is a lateral, like "l" in
                    "feel". Never curl the tongue back. Never hold it against the ridge.
                </div>

                <div className="hangeul-warning">
                    <strong>Thinking ㅇ is always silent</strong>
                    ㅇ is only silent at the start of a syllable. At the end it is a full /ng/ sound
                    (강 = "gang", 방 = "bang", 영어 = "yeong-eo"). Skipping it changes the word.
                </div>

                <div className="hangeul-warning">
                    <strong>Applying English vowel drifting</strong>
                    Korean vowels are pure and steady. They don't glide. English "no" drifts to
                    /noʊ/; Korean 노 stays at /no/ the whole way through. Record yourself. If the
                    vowel changes shape, correct it.
                </div>

                <div className="hangeul-warning">
                    <strong>Reading syllables in isolation instead of applying liaison</strong>
                    한국어 is not "han-guk-eo" in natural speech, liaison turns it into [한구거].
                    있어요 is not "it-eo-yo" it is [이써요]. Always look at syllable boundaries
                    when reading, not just each syllable on its own.
                </div>
            </section>
        </div>
    );
}
