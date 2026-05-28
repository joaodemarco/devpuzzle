import { NextResponse } from 'next/server';
import { getOrCreateDailyGame as getGuessTheTechGame } from '@/lib/games/guess-the-tech';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const game = await getGuessTheTechGame(today);

    console.log('[cron] Daily game ensured:', { date: today, gameId: game.id });
    return NextResponse.json({ success: true, gameId: game.id });
  } catch (error) {
    console.error('[cron] Failed to ensure daily game:', error);
    return NextResponse.json(
      { error: 'Failed to ensure daily game' },
      { status: 500 },
    );
  }
}
