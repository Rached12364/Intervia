import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioAmbientService {
  readonly isPlaying = signal<boolean>(false);
  readonly volume = signal<number>(0.2); // 20% par défaut
  readonly isMuted = signal<boolean>(false);

  private audioCtx?: AudioContext;
  private osc1?: OscillatorNode;
  private osc2?: OscillatorNode;
  private filter?: BiquadFilterNode;
  private gainNode?: GainNode;

  toggleSound(): void {
    if (this.isPlaying()) {
      this.stop();
    } else {
      this.start();
    }
  }

  start(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // Synthèse d'une nappe zen apaisante (108Hz / 112Hz)
      const ctx = this.audioCtx;
      this.osc1 = ctx.createOscillator();
      this.osc2 = ctx.createOscillator();
      this.filter = ctx.createBiquadFilter();
      this.gainNode = ctx.createGain();

      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(108, ctx.currentTime);

      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(112, ctx.currentTime);

      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(220, ctx.currentTime);

      const targetGain = this.isMuted() ? 0 : this.volume() * 0.08;
      this.gainNode.gain.setValueAtTime(targetGain, ctx.currentTime);

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.filter.connect(this.gainNode);
      this.gainNode.connect(ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.isPlaying.set(true);
    } catch {
      console.warn("Audio non supporté par ce navigateur");
    }
  }

  stop(): void {
    if (this.gainNode && this.audioCtx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.3);
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.isPlaying.set(false);
        }, 300);
      } catch {
        this.isPlaying.set(false);
      }
    } else {
      this.isPlaying.set(false);
    }
  }

  setVolume(newVol: number): void {
    this.volume.set(newVol);
    if (this.gainNode && this.audioCtx && !this.isMuted()) {
      this.gainNode.gain.setValueAtTime(newVol * 0.08, this.audioCtx.currentTime);
    }
  }

  toggleMute(): void {
    const nextMuted = !this.isMuted();
    this.isMuted.set(nextMuted);
    if (this.gainNode && this.audioCtx) {
      const target = nextMuted ? 0 : this.volume() * 0.08;
      this.gainNode.gain.setValueAtTime(target, this.audioCtx.currentTime);
    }
  }
}
