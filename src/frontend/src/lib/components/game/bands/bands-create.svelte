<script lang="ts">
    import type { Game } from "../../../../../../declarations/backend/backend.did";
    import GolfCourseSelectModal from "../golf-course-select-modal.svelte";

    export let game: Game;
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