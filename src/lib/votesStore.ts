export type VoteSource = "topg" | "votifier" | "minecraft-mp" | "minecraftservers-org" | "planetminecraft" | string;

export type StoredVote = {
  source: VoteSource;
  usernameOrId: string;
  voterIp?: string;
  receivedAt: number; // epoch ms
};

const votes: StoredVote[] = [];

export function addVote(vote: StoredVote) {
  votes.push(vote);
}

export function getVotesSnapshot(): StoredVote[] {
  return votes.slice();
}

export function getMonthlyLeaderboard(limit = 50) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const counts = new Map<string, number>();
  for (const v of votes) {
    if (v.receivedAt >= monthStart) {
      counts.set(v.usernameOrId, (counts.get(v.usernameOrId) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([player, votes]) => ({ player, votes }))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, limit);
}


