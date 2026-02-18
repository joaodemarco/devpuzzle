import { ref, onMounted, onUnmounted } from "vue";

export function useCountdownUntilNextGame(serverTime) {
    const timeUntilNextGame = ref("");
    const clientNow = Math.floor(Date.now() / 1000);
    const nowOffset = clientNow - serverTime.now;

    let interval;

    function updateCountdown() {
        const realNow = Math.floor(Date.now() / 1000) - nowOffset;

        const remainingSeconds = serverTime.nextPuzzleAt - realNow;

        const formattedDate = new Date(remainingSeconds * 1000)
            .toISOString()
            .slice(11, 19); // gets the date on a HH:mm:ss format

        timeUntilNextGame.value = formattedDate;
    }

    onMounted(() => {
        updateCountdown();

        interval = setInterval(updateCountdown, 1000);
    });

    onUnmounted(() => {
        clearInterval(interval);
    });

    return timeUntilNextGame;
}
