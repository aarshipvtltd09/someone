/**
 * Web Audio API synthesizer for dreamy celestial ambient music box & magical sound effects.
 * Safe, zero-dependency, works cross-browser without external media files.
 */

class CelestialAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private loopTimer: number | null = null;
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public getStatus() {
    return { isPlaying: this.isPlaying, isMuted: this.isMuted };
  }

  public startAmbient() {
    this.initContext();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    // Create master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // Pentatonic scale notes for dreamy celestial music box (frequencies in Hz)
    // F# Major Pentatonic: F#4, G#4, A#4, C#5, D#5, F#5, G#5, A#5, C#6
    const melody = [
      { note: 369.99, delay: 0 },    // F#4
      { note: 466.16, delay: 600 },  // A#4
      { note: 554.37, delay: 1200 }, // C#5
      { note: 622.25, delay: 1800 }, // D#5
      { note: 739.99, delay: 2400 }, // F#5
      { note: 554.37, delay: 3000 }, // C#5
      { note: 466.16, delay: 3600 }, // A#4
      { note: 415.30, delay: 4200 }, // G#4
      { note: 369.99, delay: 4800 }, // F#4
      { note: 554.37, delay: 5400 }, // C#5
      { note: 739.99, delay: 6000 }, // F#5
      { note: 830.61, delay: 6600 }, // G#5
      { note: 932.33, delay: 7200 }, // A#5
      { note: 739.99, delay: 7800 }, // F#5
      { note: 622.25, delay: 8400 }, // D#5
      { note: 554.37, delay: 9000 }, // C#5
    ];

    const playLoop = () => {
      if (!this.isPlaying || !this.ctx) return;
      melody.forEach(({ note, delay }) => {
        setTimeout(() => {
          if (this.isPlaying) {
            this.playMusicBoxTone(note);
          }
        }, delay);
      });
      // Schedule next loop
      this.loopTimer = window.setTimeout(playLoop, 9800);
    };

    playLoop();
  }

  private playMusicBoxTone(freq: number) {
    if (!this.ctx || !this.gainNode || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Pure bell-like sine with subtle overtone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.14, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  public stopAmbient() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  /**
   * Sound effect: Magical sparkle / chime when touching stars or clicking buttons
   */
  public playSparkle() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98]; // E5, G5, B5, E6, G6
      notes.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);
        g.gain.setValueAtTime(0.001, now + idx * 0.06);
        g.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.06 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

        osc.connect(g);
        g.connect(this.ctx!.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.65);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Sound effect: Soft celestial chime
   */
  public playChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.3);

      g.gain.setValueAtTime(0.001, now);
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(g);
      g.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Silence
    }
  }

  /**
   * Sound effect: Firework burst crackle
   */
  public playFirework() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft white noise burst + resonant chime
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.4);

      g.gain.setValueAtTime(0.15, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(g);
      g.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);

      // Higher twinkle
      setTimeout(() => this.playSparkle(), 180);
    } catch {
      // Silence
    }
  }
}

export const audioManager = new CelestialAudioManager();
