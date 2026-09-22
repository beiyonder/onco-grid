import { useEffect, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { createUISFX } from "uisfx";

function isInteractive(target: EventTarget | null): target is Element {
  return target instanceof Element && Boolean(target.closest("button:not(:disabled), a[href], select, summary, [role='button'], [role='tab']"));
}

export function ExperienceSound() {
  const [player] = useState(() => createUISFX({
    pack: "glass",
    volume: 0.28,
    preferences: { key: "trial-relay:experience-sound" },
  }));
  const [enabled, setEnabled] = useState(() => player.isEnabled());

  useEffect(() => {
    let unlocked = false;
    let lastScrollBucket = Math.floor(window.scrollY / Math.max(480, window.innerHeight * 0.72));
    let lastScrollSoundAt = 0;

    const unlock = async () => {
      if (unlocked || !player.isEnabled()) return;
      unlocked = await player.unlock();
      if (unlocked) void player.preload(["press", "select", "progress-step", "toggle-on", "toggle-off"]);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isTrusted || !isInteractive(event.target)) return;
      void unlock().then(() => player.play("press", { volume: 0.45 }));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.isTrusted || (event.key !== "Enter" && event.key !== " ") || !isInteractive(event.target)) return;
      void unlock().then(() => player.play("select", { volume: 0.42 }));
    };

    const onScroll = () => {
      if (!unlocked || !player.isEnabled()) return;
      const bucket = Math.floor(window.scrollY / Math.max(480, window.innerHeight * 0.72));
      const now = performance.now();
      if (bucket === lastScrollBucket || now - lastScrollSoundAt < 420) return;
      lastScrollBucket = bucket;
      lastScrollSoundAt = now;
      player.play("progress-step", { volume: 0.22, cooldownMs: 380 });
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("scroll", onScroll);
      player.stopAll();
      void player.destroy();
    };
  }, [player]);

  const toggleSound = async () => {
    const next = !enabled;
    if (next) {
      player.setEnabled(true);
      await player.unlock();
      player.play("toggle-on", { volume: 0.45 });
    } else {
      player.play("toggle-off", { volume: 0.4 });
      player.setEnabled(false);
    }
    setEnabled(next);
  };

  return (
    <button className="sound-toggle" type="button" aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"} aria-pressed={enabled} onClick={toggleSound}>
      <ThinkingOrb state={enabled ? "listening" : "breathing"} size={20} theme="light" paused={!enabled} aria-hidden="true" />
      <span>{enabled ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
