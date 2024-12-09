import { courseStore } from "$lib/stores/course-store";
import { gameStore } from "$lib/stores/game-store";
import { playerStore } from "$lib/stores/player-store";

import { CourseServices } from "$lib/services/course-services";
import { GameServices } from "$lib/services/game-services";
import { PlayerServices } from "$lib/services/player-services";

import { isError, replacer } from "$lib/utils/helpers";

class StoreManager {
  private courseServices: CourseServices;
  private gameServices: GameServices;
  private playerServices: PlayerServices;

  private categories: string[] = ["course", "game", "player"];

  constructor() {
    this.courseServices = new CourseServices();
    this.gameServices = new GameServices();
    this.playerServices = new PlayerServices();
  }

  async syncStores(): Promise<void> {}

  // private async syncCategory(category: string): Promise<void> {
  //     switch (category) {
  //         case "course":
  //             const updatedCourses = await this.courseServices.getCourse();
  //             courseStore.setCourse(updatedCourses);
  //             localStorage.setItem("courses", JSON.stringify(updatedCourses, replacer),
  //         );
  //             break;
  //         case "game":
  //             const updatedGames = await this.gameServices.getGame();
  //             gameStore.setGame(updatedGames);
  //             localStorage.setItem("games", JSON.stringify(updatedGames, replacer));
  //             break;
  //         case "player":
  //             const updatedPlayers = await this.playerServices.getPlayer();
  //             playerStore.setPlayer(updatedPlayers);
  //             localStorage.setItem("players", JSON.stringify(updatedPlayers, replacer));
  //             break;
  //     }
  // }

  private loadFromCache(category: string): void {
    const cachedData = localStorage.getItem(category);
    switch (category) {
      case "course":
        const cachedCourses = JSON.parse(cachedData || "[]");
        courseStore.setCourse(cachedCourses);
        break;
      case "game":
        const cachedGames = JSON.parse(cachedData || "[]");
        gameStore.setGame(cachedGames);
        break;
      case "player":
        const cachedPlayers = JSON.parse(cachedData || "[]");
        playerStore.setPlayer(cachedPlayers);
        break;
    }
  }
}
