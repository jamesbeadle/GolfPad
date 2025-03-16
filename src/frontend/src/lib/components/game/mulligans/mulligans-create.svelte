<script lang="ts">
    import { onMount } from "svelte";
    import type { CreateGame, Game, GolfCourseSummary } from "../../../../../../declarations/backend/backend.did";
    import { userStore } from "$lib/stores/user-store";
    import { authStore } from "$lib/stores/auth-store";
    import GolfCourseSelectModal from "../golf-course-select-modal.svelte";
    import OpponentSelectModal from "../opponent-select-modal.svelte";
    import { gameStore } from "$lib/stores/game-store";
    import SelectBox from "$lib/components/shared/select-box.svelte";

    export let game: Game;
    
    let courses: GolfCourseSummary[] = [];
    let teeSelectList = ["Tee 1", "Tee 2", "Tee 3"];
    let opponentSelectList = ["Player 1", "Player 2", "Player 3"];
    
    let showGolfCourseModal = false;
    let showTeeModal = false;
    let showOpponentModal = false;
    
    let selectedCourseIndex = 0;
    let selectedTeeIndex = 0;
    let selectedOpponentIndex = 0;

    onMount(async () => {
        let principalId = $authStore.identity?.getPrincipal().toString() ?? '';
        let userFavouriteCourses = await userStore.getUserFavouriteCourses(principalId);
        courses = userFavouriteCourses.courses;
    });

    function selectCourse() {
        showGolfCourseModal = true;
    }

    function selectTee() {
        showTeeModal = true;
    }

    function selectOpponent() {
        showOpponentModal = true;
    }

    async function createGame() {
        let dto: CreateGame = {
            inviteIds: [], 
            createdById: '', 
            teeOffTime: 0n, 
            courseVersion: 0, 
            gameType: { Mulligans: null }, 
            courseId: 1n, 
            teeGroupIndex: 0
        };
        await gameStore.createGame(dto);
    }

    function selectTee(){

    }

</script>

<div class="space-y-4">
    <p>GAME DETAILS</p>

    <div>
        <p>Course</p>
        <SelectBox 
            items={courses}
            selectedIndex={selectedCourseIndex}
            onSelect={selectCourse}
            placeholder="Select a course"
        >
            <svelte:fragment slot="selected" let:selectedItem>
                {selectedItem.name}
            </svelte:fragment>
        </SelectBox>
    </div>

    <div>
        <p>Tee</p>
        <SelectBox 
            items={teeSelectList}
            selectedIndex={selectedTeeIndex}
            onSelect={selectTee}
            disabled={!selectedCourseIndex}
            placeholder="Select a tee"
        />
    </div>

    <div>
        <p>DATE</p>
        <DateSelect 
            onSelect={selectDate}
            placeholder="Select game date."
        />
    </div>

    <div>
        <p>Opponent</p>
        <SelectBox 
            items={opponentSelectList}
            selectedIndex={selectedOpponentIndex}
            onSelect={selectOpponent}
            placeholder="Select an opponent"
        />
    </div>

    <button class="brand-button" on:click={createGame}>CREATE GAME</button>

    {#if showGolfCourseModal}
        <GolfCourseSelectModal 
            on:close={() => showGolfCourseModal = false}
            on:select={(e) => {
                selectedCourseIndex = e.detail.index;
                showGolfCourseModal = false;
            }}
        />
    {/if}

    {#if showTeeModal}
        <TeeSelectModal {selectTee} />
    {/if}

    {#if showOpponentModal}
        <OpponentSelectModal 
            on:close={() => showOpponentModal = false}
            on:select={(e) => {
                selectedOpponentIndex = e.detail.index;
                showOpponentModal = false;
            }}
        />
    {/if}
</div>