<script lang="ts">
    import { onMount } from "svelte";
    import type { CreateGame, Friend, GolfCourseId, GolfCourseVersion, Golfer, TeeGroupIndex } from "../../../../../../declarations/backend/backend.did";
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
    let selectedDateTime: string = '';
    let opponent: (Friend | null) = null;
    let selectedOpponentIndex: number | null = null;
    let selectedCourseVersion: GolfCourseVersion | null = null;

    $: isTeeEnabled = !!selectedCourseId;

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

    async function handleOpponentSelect(friend: Friend) {
        opponent = friend;
        selectedOpponentIndex = null;
        showOpponentModal = false;
    }

    async function createGame() {
        if (selectedCourseId && selectedTeeGroupIndex && selectedCourseVersion && selectedDateTime && opponent) {
            try{
                let dto: CreateGame = {
                    createdById: $authStore.identity?.getPrincipal().toString() ?? "",
                    courseId: selectedCourseId,
                    gameType: { Mulligans: null },
                    inviteIds: [opponent.principalId],
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
                opponent = null;
                goto('/games');
            }
         
        } else {
            toasts.addToast({type:'error', message: 'Please complete all fields before submitting.'});
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
        <p>OPPONENT</p>
        <button
            on:click={() => showOpponentModal = true}
            class="w-full p-2 bg-white border rounded"
            disabled={isLoading}
            data-index="0"
        >
            {opponent ? opponent.username : "Select Friend"}
        </button>
    </div>

    <button
        class="w-full p-2 bg-yellow-400 text-black font-bold rounded"
        on:click={createGame}
        disabled={isLoading || !selectedCourseId || !selectedTeeGroupIndex || !selectedCourseVersion || !selectedDateTime || !opponent}
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
