import { useLayoutEffect } from "preact/hooks";

interface Props {
  maxCount?: number;
}

export const snowStyleId = "snow";

export default function Snow({ maxCount = 200 }: Props) {
  const count = maxCount;
  useLayoutEffect(() => {
    generateSnowCSS(count);
  }, [count]);
  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    >
      {Array.from(
        { length: count },
        (_, i) => <div className="snowflake" key={i} />,
      )}
    </div>
  );
}

function generateSnowCSS(snowDensity: number) {
  const pageHeightVh = 100 * document.body.offsetHeight /
    globalThis.innerHeight;
  const snowflakeName = "snowflake";
  let rule = "";

  for (let i = 1; i < snowDensity; i++) {
    const randomX = Math.random() * 100; // vw
    const randomOffset = Math.random() * 10; // vw;
    const randomXEnd = randomX + randomOffset;
    const randomXEndYoyo = randomX + (randomOffset / 2);
    const randomYoyoTime = getRandomArbitrary(0.3, 0.8);
    const randomYoyoY = randomYoyoTime * pageHeightVh; // vh
    const randomScale = Math.random();
    const fallDuration = randomIntRange(10, pageHeightVh / 10 * 3); // s
    const fallDelay = randomInt(pageHeightVh / 10 * 3) * -1; // s
    const opacity = Math.random();

    rule += `
      .${snowflakeName}:nth-child(${i}) {
        opacity: ${opacity};
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
      }
      @keyframes fall-${i} {
        ${randomYoyoTime * 100}% {
          transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
        }
        to {
          transform: translate(${randomXEndYoyo}vw, ${pageHeightVh}vh) scale(${randomScale});
        }
      }
    `;
  }
  addCSS(rule);
}

function addCSS(rule: string) {
  const cssElement = document.getElementById(snowStyleId) as HTMLStyleElement;
  cssElement.innerHTML = rule;
}

function randomInt(value = 100) {
  return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
