import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';
import { products } from '../../data/products';

const GAME_SECONDS = 30;
const BASKET_WIDTH = 94;
const BASKET_HEIGHT = 38;
const PRODUCT_SIZE = 54;
const BOARD_HEIGHT = 310;

const randomDrop = (width) => ({
  id: `${Date.now()}-${Math.random()}`,
  productIndex: Math.floor(Math.random() * products.length),
  x: Math.max(8, Math.random() * Math.max(8, width - PRODUCT_SIZE - 16)),
  y: -PRODUCT_SIZE,
});

export default function GameScreen() {
  const [boardWidth, setBoardWidth] = useState(0);
  const [basketX, setBasketX] = useState(0);
  const [drops, setDrops] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const basketXRef = useRef(0);
  const scorePulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isPlaying || !boardWidth) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setDrops([]);
          setIsFinished(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, boardWidth]);

  useEffect(() => {
    if (!isPlaying || !boardWidth) return undefined;

    const fall = setInterval(() => {
      setDrops((currentDrops) => {
        const catchLine = BOARD_HEIGHT - BASKET_HEIGHT - 10;
        const activeDropCount = timeLeft <= 10 ? 3 : timeLeft <= 20 ? 2 : 1;
        let caughtCount = 0;
        const fallingDrops = currentDrops
          .map((currentDrop) => ({ ...currentDrop, y: currentDrop.y + 11 }))
          .filter((currentDrop) => {
            if (currentDrop.y < catchLine) return true;
            const productCenter = currentDrop.x + PRODUCT_SIZE / 2;
            const caught = productCenter >= basketXRef.current && productCenter <= basketXRef.current + BASKET_WIDTH;
            if (caught) caughtCount += 1;
            return false;
          });

        if (caughtCount) {
          setScore((currentScore) => currentScore + caughtCount * 10);
          Animated.sequence([
            Animated.timing(scorePulse, { duration: 90, toValue: 1.22, useNativeDriver: true }),
            Animated.spring(scorePulse, { friction: 4, toValue: 1, useNativeDriver: true }),
          ]).start();
        }

        while (fallingDrops.length < activeDropCount) fallingDrops.push(randomDrop(boardWidth));
        return fallingDrops;
      });
    }, 70);

    return () => clearInterval(fall);
  }, [isPlaying, boardWidth, scorePulse, timeLeft]);

  function startGame() {
    if (!boardWidth) return;
    const startX = Math.max(0, (boardWidth - BASKET_WIDTH) / 2);
    basketXRef.current = startX;
    setBasketX(startX);
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setDrops([randomDrop(boardWidth)]);
    setIsFinished(false);
    setIsPlaying(true);
  }

  function moveBasket(direction) {
    if (!isPlaying) return;
    const nextX = Math.max(0, Math.min(boardWidth - BASKET_WIDTH, basketXRef.current + direction * 42));
    basketXRef.current = nextX;
    setBasketX(nextX);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>RIDER CHALLENGE / 01</Text>
      <Text style={styles.title}>Catch the gear.</Text>
      <Text style={styles.intro}>Vang zoveel mogelijk producten in 30 seconden.</Text>

      <View style={styles.stats}>
        <View><Text style={styles.statLabel}>SCORE</Text><Animated.Text style={[styles.statValue, { transform: [{ scale: scorePulse }] }]}>{score}</Animated.Text></View>
        <View style={styles.timerCard}><Text style={styles.statLabel}>TIJD</Text><Text style={styles.statValue}>{timeLeft}s</Text></View>
      </View>

      <View style={styles.board} onLayout={(event) => {
        const width = event.nativeEvent.layout.width;
        setBoardWidth(width);
        if (!isPlaying) {
          const startX = Math.max(0, (width - BASKET_WIDTH) / 2);
          basketXRef.current = startX;
          setBasketX(startX);
        }
      }}>
        <Text style={styles.boardHint}>{isPlaying ? 'VANG HET PRODUCT' : 'KLAAR VOOR JE RIT?'}</Text>
        {isPlaying && drops.map((drop) => <Animated.View key={drop.id} style={[styles.drop, { left: drop.x, top: drop.y }]}><Image source={products[drop.productIndex].image} style={styles.dropImage} resizeMode="contain" /></Animated.View>)}
        <View style={[styles.basket, { left: basketX }]}><View style={styles.basketLip} /><Text style={styles.basketText}>EKO</Text></View>
      </View>

      <View style={styles.controls}>
        <Pressable style={({ pressed }) => [styles.arrow, pressed && styles.arrowPressed]} onPress={() => moveBasket(-1)}><Text style={styles.arrowText}>←</Text></Pressable>
        <Pressable style={[styles.startButton, isPlaying && styles.startButtonDisabled]} onPress={startGame} disabled={isPlaying}><Text style={styles.startText}>{isPlaying ? 'Rijden...' : 'Start game'}</Text></Pressable>
        <Pressable style={({ pressed }) => [styles.arrow, pressed && styles.arrowPressed]} onPress={() => moveBasket(1)}><Text style={styles.arrowText}>→</Text></Pressable>
      </View>

      <Modal animationType="fade" transparent visible={isFinished} onRequestClose={() => setIsFinished(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalKicker}>TIJD IS OP</Text>
            <Text style={styles.modalTitle}>Sterke rit.</Text>
            <Text style={styles.modalScore}>{score} punten</Text>
            <Text style={styles.modalText}>Klaar om je score te verbeteren?</Text>
            <Pressable style={styles.restartButton} onPress={startGame}><Text style={styles.restartText}>Opnieuw spelen</Text></Pressable>
            <Pressable style={styles.closeButton} onPress={() => setIsFinished(false)}><Text style={styles.closeText}>Sluiten</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1, padding: 20 },
  label: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.7, marginTop: 10 },
  title: { color: colors.text, fontSize: 34, fontWeight: '900', letterSpacing: -1.4, marginTop: 8 },
  intro: { color: colors.textMuted, fontSize: 14, marginTop: 5 },
  stats: { flexDirection: 'row', gap: 10, marginTop: 18 },
  timerCard: { marginLeft: 'auto', textAlign: 'right' },
  statLabel: { color: colors.textFaint, fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
  statValue: { color: colors.text, fontSize: 25, fontWeight: '900', marginTop: 2 },
  board: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.large, borderWidth: 1, height: BOARD_HEIGHT, marginTop: 12, overflow: 'hidden', position: 'relative' },
  boardHint: { color: colors.textFaint, fontSize: 10, fontWeight: '800', left: 16, letterSpacing: 1.4, position: 'absolute', top: 15 },
  drop: { alignItems: 'center', backgroundColor: '#F4F4F1', borderRadius: 12, height: PRODUCT_SIZE, justifyContent: 'center', position: 'absolute', width: PRODUCT_SIZE },
  dropImage: { height: '90%', width: '90%' },
  basket: { alignItems: 'center', backgroundColor: colors.text, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, bottom: 10, height: BASKET_HEIGHT, justifyContent: 'center', position: 'absolute', width: BASKET_WIDTH },
  basketLip: { borderColor: colors.text, borderRadius: 12, borderWidth: 4, height: 15, position: 'absolute', top: -10, width: BASKET_WIDTH - 12 },
  basketText: { color: colors.accentText, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  controls: { alignItems: 'center', flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 16 },
  arrow: { alignItems: 'center', borderColor: colors.line, borderRadius: radius.small, borderWidth: 1, height: 52, justifyContent: 'center', width: 56 },
  arrowPressed: { backgroundColor: colors.surfaceSoft, transform: [{ scale: 0.95 }] },
  arrowText: { color: colors.text, fontSize: 25, fontWeight: '700' },
  startButton: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: radius.small, flex: 1, height: 52, justifyContent: 'center' },
  startButtonDisabled: { opacity: 0.5 },
  startText: { color: colors.accentText, fontSize: 14, fontWeight: '900' },
  modalOverlay: { alignItems: 'center', backgroundColor: 'rgba(5, 8, 12, 0.78)', flex: 1, justifyContent: 'center', padding: 28 },
  modalCard: { backgroundColor: colors.surface, borderColor: colors.line, borderRadius: radius.large, borderWidth: 1, padding: 26, width: '100%' },
  modalKicker: { color: colors.textFaint, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  modalTitle: { color: colors.text, fontSize: 32, fontWeight: '900', letterSpacing: -1.3, marginTop: 8 },
  modalScore: { color: colors.text, fontSize: 24, fontWeight: '900', marginTop: 18 },
  modalText: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: 6 },
  restartButton: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: radius.small, marginTop: 22, padding: 15 },
  restartText: { color: colors.accentText, fontSize: 14, fontWeight: '900' },
  closeButton: { alignItems: 'center', marginTop: 10, padding: 10 },
  closeText: { color: colors.textMuted, fontSize: 14, fontWeight: '800', textDecorationLine: 'underline' },
});
