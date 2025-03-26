<script lang="ts">
    import { onMount } from "svelte";
    import type { CreateGame, Friend, Friends, GolfCourseId, GetGolfCourses, GetGolfCourseTees, GolfCourses, GolfCourseTees, GolfCourseVersion, Golfer, TeeGroupIndex, GetFriends } from "../../../../../../declarations/backend/backend.did";
    import { gameStore } from "$lib/stores/game-store";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import { userStore } from "$lib/stores/user-store";
    import { toasts } from "$lib/stores/toasts-store";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/auth-store";
    import { convertDateTimeInputToUnixNano } from "$lib/utils/helpers";

    import DropdownSelect from "$lib/components/shared/dropdown-select.svelte";

    let isLoading = true;
    let showGolfCourseModal = false;
    let showTeeModal = false;
    let showOpponentModal = false;
    let currentPage = 1n;

    let selectedCourseId: GolfCourseId | null = null;
    let selectedTeeGroupIndex: TeeGroupIndex | null = null;
    let selectedDateTime: string = '';
    let opponent: (Friend | null) = null;
    let opponents: Friends | null = null;
    let selectedOpponentIndex: number | null = null;
    let selectedCourseVersion: GolfCourseVersion | null = null;
    let golfCourses: GolfCourses | null = null;
    let golfCouseTees: GolfCourseTees | null =  null;
    let golfCourseId: GolfCourseId;

    $: isTeeEnabled = !!selectedCourseId;

    onMount(async () => {
        getGolfCourses();
        getFriends();
        isLoading = false;
    });

    async function getGolfCourses() {
        //TODO: get golf courses from backend
        let dto: GetGolfCourses = {page: BigInt(1), searchTerm: '', principalId: $authStore.identity?.getPrincipal().toString() ?? ""};
        //golfCourses = await golfCourseStore.getFavouriteGolfCourses(dto);
        golfCourses = await golfCourseStore.getGolfCourses(dto);
    }

    async function getFriends() {
        try{
            let dto: GetFriends = {
                principalId: $authStore.identity?.getPrincipal().toString() ?? "",
                page: currentPage
            };
            opponents = await userStore.getFriends(dto);
        } catch {
            toasts.addToast({type:'error', message: 'Error getting friends.'})
        } finally {
            isLoading = false;
        }
    }
    async function getTees() {
        try {
            if (!selectedCourseId) return;
            let dto: GetGolfCourseTees = {
                golfCourseId: selectedCourseId
            };
            golfCouseTees = await golfCourseStore.getGolfCourseTees(dto);
        } catch {
            toasts.addToast({ type: 'error', message: 'Error getting golf course tees.'});
        } finally {
            isLoading = false;
        }
    }

    async function handleCourseSelect(courseId: GolfCourseId, courseVersion: GolfCourseVersion) {
        selectedCourseId = courseId;
        selectedCourseVersion = courseVersion;
        showGolfCourseModal = false;
        selectedTeeGroupIndex = null;
        await getTees();
    }

    function handleTeeSelect(teeIndex: TeeGroupIndex) {
        selectedTeeGroupIndex = teeIndex;
        showTeeModal = false;
    }

    async function handleOpponentSelect(username: string) {
        const selected = opponents?.friends.find(o => o.username === username);
        if (selected) {
            opponent = {
                principalId: selected.principalId,
                username: selected.username,
                firstName: "",
                lastName: "",
                profilePicture: []
            };
        }
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

<div class="p-4 space-y-4 text-black rounded-lg bg-BrandLightGray">
    <h2 class="text-2xl condensed">GAME DETAILS</h2>
    
    <div class="space-y-4">
        <div class="space-y-2">
            <label for="course" class="text-sm">COURSE</label>
            <DropdownSelect
                value={selectedCourseId ?? ""}
                options={golfCourses?.entries.map(c => ({id: c.id, label: c.name})) ?? []}
                onChange={(id) => handleCourseSelect(id as bigint, 1)}
                placeholder="Select a Course"
                searchOn={true}
            />
        </div>

        <div class="space-y-2">
            <label for="tee" class="text-sm">TEE</label>
            <DropdownSelect
                value={selectedTeeGroupIndex ?? ""}
                options={golfCouseTees?.tees.map(t => ({id: t.index, label: t.name})) ?? []}
                onChange={(id) => handleTeeSelect(id as number)}
                placeholder="Select a Tee"
            />
        </div>

        <div class="space-y-2">
            <label for="date" class="text-sm">DATE</label>
            <div class="relative">
                <input
                    id="date"
                    bind:value={selectedDateTime}
                    type="datetime-local"
                    class="w-full p-3 text-black bg-white border rounded-lg cursor-pointer border-BrandDivider"
                    disabled={isLoading}
                    required
                    on:click={(e) => (e.target as HTMLInputElement).showPicker()}
                />
            </div>
        </div>

        <div class="space-y-2">
            <label for="opponent" class="text-sm">OPPONENT</label>
            <DropdownSelect
                value={opponent?.username ?? ""}
                options={opponents?.friends.map(o => ({id: o.username, label: o.username})) ?? []}
                onChange={(id) => handleOpponentSelect(id as string)}
                placeholder="Select Friend"
                searchOn={true}
                scrollOnOpen={true}
            />
        </div>
    </div>

    <button
        class="w-full p-3 text-center text-black rounded-lg bg-BrandYellow hover:opacity-90"
        on:click={createGame}
        disabled={isLoading || !selectedCourseId || !selectedTeeGroupIndex || !selectedCourseVersion || !selectedDateTime || !opponent}
    >
        CREATE GAME
    </button>
</div>

<style>
    input[type="datetime-local"]::-webkit-calendar-picker-indicator {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
    }
</style>
