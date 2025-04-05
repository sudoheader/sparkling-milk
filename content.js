/**
 * content.js
 *
 * This script injects sparkling emojis onto the current webpage.
 */

console.log("Sparkling Milk Extension Loaded");

// --- Configuration ---
const EMOJIS = ['🥛', '⬜', '⚪', '✨', '☁️', '❄️', '🤍']; // Emojis to use
const EMOJI_COUNT_PER_INTERVAL = 3; // How many emojis to add each time
const INTERVAL_DELAY_MS = 500; // How often to add new emojis (in milliseconds)
const MIN_ANIMATION_DURATION_S = 1.5; // Minimum fade duration
const MAX_ANIMATION_DURATION_S = 4.0; // Maximum fade duration
const EMOJI_FONT_SIZE_PX = 24; // Size of the emojis

// --- Functions ---

/**
 * Selects a random element from an array.
 * @param {Array} arr - The array to choose from.
 * @returns {*} A random element from the array.
 */
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a random number between min and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random number within the range.
 */
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Creates and animates a single sparkling emoji.
 */
function createSparkle() {
  try {
    const emojiChar = getRandomElement(EMOJIS);
    const sparkle = document.createElement('span');

    // --- Styling and Positioning ---
    sparkle.classList.add('sparkling-milk-emoji');
    sparkle.textContent = emojiChar;
    sparkle.style.left = `${getRandomNumber(0, 100)}vw`; // Use viewport width percentage
    sparkle.style.top = `${getRandomNumber(0, 100)}vh`; // Use viewport height percentage
    sparkle.style.fontSize = `${EMOJI_FONT_SIZE_PX}px`;

    // --- Animation ---
    const animationDuration = getRandomNumber(MIN_ANIMATION_DURATION_S, MAX_ANIMATION_DURATION_S);
    sparkle.style.animationDuration = `${animationDuration}s`;

    // --- Add to Page ---
    document.body.appendChild(sparkle);

    // --- Cleanup ---
    // Remove the emoji element after its animation completes
    sparkle.addEventListener('animationend', () => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, { once: true }); // Use 'once: true' for automatic listener removal

  } catch (error) {
    console.error("Sparkling Milk: Error creating sparkle:", error);
    // Optional: Stop the interval if errors persist
    // clearInterval(sparkleInterval);
  }
}

// --- Main Execution ---

// Use setInterval to continuously create sparkles
const sparkleInterval = setInterval(() => {
  // Add a small burst of emojis each interval
  for (let i = 0; i < EMOJI_COUNT_PER_INTERVAL; i++) {
    createSparkle();
  }
}, INTERVAL_DELAY_MS);

// Optional: Add a way to stop the sparkles (e.g., after a certain time or via a browser action)
// For example, to stop after 1 minute:
// setTimeout(() => {
//   clearInterval(sparkleInterval);
//   console.log("Sparkling Milk stopped.");
//   // Optional: Remove any remaining sparkles
//   document.querySelectorAll('.sparkling-milk-emoji').forEach(el => el.remove());
// }, 60000);

