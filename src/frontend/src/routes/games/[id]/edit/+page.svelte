<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../../../Layout.svelte";
    import type { Game, UpdateGame } from "../../../../../../declarations/backend/backend.did";
    import { gameStore } from "$lib/stores/game-store";
    import { page } from "$app/state";
    import { convertDateInputToUnixNano } from "$lib/utils/helpers";
    import SelectGolfCourseModal from "$lib/components/golf-course/select-golf-course-modal.svelte";
    import TeeSelectModal from "$lib/components/golf-course/tee-select-modal.svelte";


    let game: Game | null = null;

    let teeOffTime: string = "";
    let selectedCourseId: bigint | null = null;
    let selectedCourseVersion: number | null = null;
    let selectedTeeGroupIndex: number | null = null;
    let playerIds: string[] = [];
    let newPlayerId: string = "";

    let showGolfCourseModal = false;
    let showTeeModal = false;


    onMount(async () => {
        game = await gameStore.getGame({ gameId: BigInt(page.params.id) });
        if (game) {
            teeOffTime = new Date(Number(game.teeOffTime)).toISOString().slice(0, 16);
            selectedCourseId = game.courseId;
            selectedCourseVersion = game.courseSnapshot.courseVersion;
            selectedTeeGroupIndex = game.courseSnapshot.teeGroupIndex;
            playerIds = game.playerIds.map(id => id.toString());
        }
    });

    function handleCourseSelect(courseId: bigint, courseVersion: number) {
        selectedCourseId = courseId;
        selectedCourseVersion = courseVersion;
        showGolfCourseModal = false;
        selectedTeeGroupIndex = null;
    }
    function handleTeeSelect(teeIndex: number) {
        selectedTeeGroupIndex = teeIndex;
        showTeeModal = false;
    }

    function addPlayer() {
        if (!newPlayerId || playerIds.includes(newPlayerId)) return;
        playerIds = [...playerIds, newPlayerId];
        newPlayerId = "";
    }

    function removePlayer(index: number) {
        playerIds = playerIds.filter((_, i) => i !== index);
    }

    async function submitGameUpdate() {
        if (!game || !selectedCourseId || !selectedCourseVersion || !selectedTeeGroupIndex) return;

        let dto: UpdateGame = {
            gameId: game.id,
            courseId: selectedCourseId,
            inviteIds: playerIds,
            teeOffTime: convertDateInputToUnixNano(teeOffTime),
            teeGroupIndex: selectedTeeGroupIndex,
            courseVersion: selectedCourseVersion,
        };

        await gameStore.updateGame(dto);
    }

    function resetForm() {
        if (game) {
            teeOffTime = new Date(Number(game.teeOffTime)).toISOString().slice(0, 16);
            selectedCourseId = game.courseId;
            selectedCourseVersion = game.courseSnapshot.courseVersion;
            selectedTeeGroupIndex = game.courseSnapshot.teeGroupIndex;
            playerIds = game.playerIds.map(id => id.toString());
        }
    }

</script>

<Layout>
    {#if game && Object.keys(game.status)[0] != "Unplayed"}
        <p>Game cannot be edited after it has begun.</p>
    {:else}
        <div class="form-section">
            <label for="tee-off-time">TEE OFF TIME</label>
            <input 
                id="tee-off-time" 
                type="datetime-local" 
                bind:value={teeOffTime}
            />

            <div>
                <p>COURSE</p>
                <button
                    on:click={() => showGolfCourseModal = true}
                    class="w-full p-2 bg-white border rounded"
                >
                    {selectedCourseId ? "Course Selected" : "Select a Course"}
                </button>
            </div>

            <div>
                <p>TEE</p>
                <button
                    on:click={() => showTeeModal = true}
                    class="w-full p-2 bg-white border rounded"
                    disabled={!selectedCourseId}
                >
                    {selectedTeeGroupIndex !== null ? "Tee Selected" : "Select a Tee"}
                </button>
            </div>

            <div class="player-management">
                <label for="new-player">PLAYERS</label>
                <div class="player-input-group">
                    <input
                        id="new-player"
                        type="text"
                        bind:value={newPlayerId}
                        placeholder="Enter Player ID"
                    />
                    <button class="add-btn" on:click={addPlayer}>+</button>
                </div>

                <div class="player-list">
                    {#each playerIds as playerId, index}
                        <div class="player-item">
                            <span>{playerId}</span>
                            <button 
                                class="remove-btn" 
                                on:click={() => removePlayer(index)}
                            >✕</button>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="form-actions">
                <button class="cancel-btn" on:click={resetForm}>RESET</button>
                <button 
                    class="update-btn" 
                    on:click={submitGameUpdate}
                    disabled={!selectedCourseId || !selectedCourseVersion || !selectedTeeGroupIndex}
                >UPDATE</button>
            </div>
        </div>
    {/if}

    {#if showGolfCourseModal}
        <SelectGolfCourseModal
            onClose={() => showGolfCourseModal = false}
            showModal={showGolfCourseModal}
            selectCourse={handleCourseSelect}
        />
    {/if}

    {#if selectedCourseId && showTeeModal}
        <TeeSelectModal
            onClose={() => showTeeModal = false}
            showModal={showTeeModal}
            golfCourseId={selectedCourseId}
            selectTee={handleTeeSelect}
        />
    {/if}
</Layout>