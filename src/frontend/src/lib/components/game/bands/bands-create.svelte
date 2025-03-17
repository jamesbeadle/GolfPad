<script lang="ts">
    import { onMount } from "svelte";
    import type { CreateGame, Friend, GolfCourseId, GolfCourseVersion, TeeGroupIndex } from "../../../../../../declarations/backend/backend.did";
    import SelectGolfCourseModal from "$lib/components/golf-course/select-golf-course-modal.svelte";
    import TeeSelectModal from "$lib/components/golf-course/tee-select-modal.svelte";
    import OpponentSelectModal from "../opponent-select-modal.svelte";
    import { gameStore } from "$lib/stores/game-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { convertDateTimeInputToUnixNano } from "$lib/utils/helpers";

    let isLoading = true;
    let showGolfCourseModal = false;
    let showTeeModal = false;
    let showOpponentModal = false;

    let selectedCourseId: GolfCourseId | null = null;
    let selectedTeeGroupIndex: TeeGroupIndex | null = null;
    let selectedCourseVersion: GolfCourseVersion | null = null;
    let selectedDateTime: string = '';
    let players: (Friend | null)[] = [null, null, null];
    let selectedOpponentIndex: number | null = null;

    $: isTeeEnabled = !!selectedCourseId;
    $: isPlayerBEnabled = !!players[0];
    $: isPlayerCEnabled = !!players[1];

    onMount(async () => {
        isLoading = false;
    });

    function handleCourseSelect(courseId: GolfCourseId, courseVersion: GolfCourseVersion) {
        selectedCourseId = courseId;
        selectedCourseVersion = courseVersion;
        showGolfCourseModal = false;
        selectedTeeGroupIndex = null;
    }

    function handleTeeSelect(teeIndex: TeeGroupIndex) {
        selectedTeeGroupIndex = teeIndex;
        showTeeModal = false;
    }

    function openOpponentModal(index: number) {
        selectedOpponentIndex = index;
        showOpponentModal = true;
    }

    async function handleOpponentSelect(friend: Friend) {
        if (selectedOpponentIndex !== null && selectedOpponentIndex >= 0 && selectedOpponentIndex < 3) {
            players[selectedOpponentIndex] = friend;
        }
        selectedOpponentIndex = null;
        showOpponentModal = false;
    }

    async function createGame() {
        if (selectedCourseId && selectedTeeGroupIndex && selectedCourseVersion && selectedDateTime && players[0]) {
            try {
                const inviteIds = players
                    .filter((player): player is Friend => player !== null)
                    .map(player => player.principalId);

                let dto: CreateGame = {
                    createdById: $authStore.identity?.getPrincipal().toString() ?? "",
                    courseId: selectedCourseId,
                    gameType: { Mulligans: null },
                    inviteIds: inviteIds,
                    teeOffTime: convertDateTimeInputToUnixNano(selectedDateTime),
                    teeGroupIndex: selectedTeeGroupIndex,
                    courseVersion: selectedCourseVersion
                };
                await gameStore.createGame(dto);
            } catch {
                toasts.addToast({type:'error', message: 'Error creating game.'})
            } finally {
                selectedCourseId = null;
                selectedTeeGroupIndex = null;
                selectedCourseVersion = null;
                selectedDateTime = '';
                players = [null, null, null];
                goto('/games');
            }
        } else {
            toasts.addToast({type:'error', message: 'Please complete all required fields before submitting.'});
        }
    }
</script>

<div class="space-y-4">
    <p class="text-lg font-bold">GAME DETAILS</p>

    <div>
        <p>Course</p>
        <button
            on:click={() => showGolfCourseModal = true}
            class="w-full p-2 bg-white border rounded"
            disabled={isLoading}
        >
            {selectedCourseId ? "Course Selected" : "Select a Course"}
        </button>
    </div>

    <div>
        <p>Tee</p>
        <button
            on:click={() => showTeeModal = true}
            class="w-full p-2 bg-white border rounded"
            disabled={!isTeeEnabled || isLoading}
        >
            {selectedTeeGroupIndex ? "Tee Selected" : "Select a Tee"}
        </button>
    </div>

    <div>
        <p>DATE</p>
        <input
            bind:value={selectedDateTime}
            type="datetime-local"
            class="w-full p-2 bg-white border rounded"
            disabled={isLoading}
            required
        />
    </div>

    <div>
        <p>PLAYER A</p>
        <button
            on:click={() => openOpponentModal(0)}
            class="w-full p-2 bg-white border rounded"
            disabled={isLoading}
        >
            {players[0] ? `${players[0].firstName} ${players[0].lastName}` : "Select Friend"}
        </button>
    </div>

    <div>
        <p>PLAYER B</p>
        <button
            on:click={() => openOpponentModal(1)}
            class="w-full p-2 bg-white border rounded"
            disabled={!isPlayerBEnabled || isLoading}
        >
            {players[1] ? `${players[1].firstName} ${players[1].lastName}` : "Select Friend"}
        </button>
    </div>

    <div>
        <p>PLAYER C</p>
        <button
            on:click={() => openOpponentModal(2)}
            class="w-full p-2 bg-white border rounded"
            disabled={!isPlayerCEnabled || isLoading}
        >
            {players[2] ? `${players[2].firstName} ${players[2].lastName}` : "Select Friend"}
        </button>
    </div>

    <button
        class="w-full p-2 bg-yellow-400 text-black font-bold rounded"
        on:click={createGame}
        disabled={isLoading || !selectedCourseId || !selectedTeeGroupIndex || !selectedCourseVersion || !selectedDateTime || !players[0]}
    >
        CREATE GAME
    </button>

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

    {#if showOpponentModal}
        <OpponentSelectModal
            onClose={() => showOpponentModal = false}
            showModal={showOpponentModal}
            selectOpponent={handleOpponentSelect}
        />
    {/if}
</div>