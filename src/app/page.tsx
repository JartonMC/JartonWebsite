
import Home from "@/components/home/Home";

import data from "@/components/home/data.json";

const HomePage = async () => {
  let playersCount = 0;
  let onlineMembersCount = 0;

  try {
    const res = await fetch(
      `https://mcstatsapi.dramaticscripts.com/status/minecraft/java?ip=${data.status.ip}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const body = await res.json();
      playersCount = body?.players?.online ?? 0;
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${data.status.discord.id}/widget.json`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const body = await res.json();
      onlineMembersCount = body.members.filter(
        (member: { status: string }) => member.status !== "offline"
      ).length;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <Home
        playersCount={playersCount}
        onlineMembersCount={onlineMembersCount}
      />
    </>
  );
};

export default HomePage;
