<script lang="ts">
    import { goto } from "$app/navigation";
    import ConfirmModal from "$lib/components/shared/confirm-modal.svelte";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import type { CreateGolfCourse, TeeGroup, Hole } from "../../../../../declarations/backend/backend.did";
    import Layout from "../../+layout.svelte";

    let courseName = "";
    let founded = 0n;
    let totalHoles = 18;
    let countryId = 0;
    let manager = "";
    let mainImage: File | null = null;
    let mainImageExtension = "";
    let teeGroups: TeeGroup[] = [];
    let activeTabIndex: number | null = null;
    let newTeeColor: string = "";

    let showConfirmDeleteTee = false;
    let teeToRemove: number | null = null; 

    function handleImageUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files && input.files[0]) {
            mainImage = input.files[0];
            mainImageExtension = mainImage.name.split(".").pop() || "";
        }
    }

    function addTeeGroup() {
        if (!newTeeColor) {
            alert("Please enter a tee color.");
            return;
        }

        if (teeGroups.some((tee) => tee.colour.toLowerCase() === newTeeColor.toLowerCase())) {
            alert("This tee color is already in use. Please choose a different color.");
            return;
        }

        const newIndex = teeGroups.length;
        teeGroups = [
            ...teeGroups,
            {
                index: newIndex,
                name: newTeeColor,
                colour: newTeeColor,
                added: BigInt(Date.now()),
                holes: Array.from({ length: totalHoles }, (_, i) => ({
                    number: Number(i + 1),
                    name: `Hole ${i + 1}`,
                    colour: newTeeColor,
                    yardage: BigInt(0),
                    par: Number(0),
                    strokeIndex: Number(0),
                    images: [],
                })) as unknown as Hole[],
            },
        ];
        activeTabIndex = newIndex;
        newTeeColor = "";
    }

    function removeTeeGroup(index: number) {
        teeGroups = teeGroups.filter((_, i) => i !== index);
        if (activeTabIndex === index) {
            activeTabIndex = teeGroups.length > 0 ? 0 : null;
        } else if (activeTabIndex && activeTabIndex > index) {
            activeTabIndex = activeTabIndex - 1;
        }
    }

    function switchTab(index: number) {
        activeTabIndex = index;
    }

    function updateHole(teeIndex: number, holeIndex: number, field: keyof Hole, value: string) {
        if (activeTabIndex === teeIndex && teeGroups[teeIndex]) {
            const numericFields: (keyof Hole)[] = ["number", "yardage", "par", "strokeIndex"];
            if (numericFields.includes(field)) {
                if (field === "yardage") {
                    (teeGroups[teeIndex].holes[holeIndex] as any)[field] = BigInt(value);
                } else {
                    (teeGroups[teeIndex].holes[holeIndex] as any)[field] = Number(value);
                }
            } else if (field === "name" || field === "colour") {
                teeGroups[teeIndex].holes[holeIndex][field] = value;
            } else if (field === "images") {
                teeGroups[teeIndex].holes[holeIndex][field] = [] as any;
            }
            teeGroups = [...teeGroups];
        }
    }



    function copyToOtherTees() {
        if (activeTabIndex === null) return;
        const sourceHoles = teeGroups[activeTabIndex].holes;
        const updatedTeeGroups = teeGroups.map((tee, index) => {
            if (index !== activeTabIndex) {
                return { ...tee, holes: sourceHoles.map((h) => ({ ...h, colour: tee.colour })) };
            }
            return tee;
        });
        teeGroups = updatedTeeGroups;
    }

    function resetForm() {
        courseName = "";
        mainImage = null;
        mainImageExtension = "";
    }

    async function submitGolfCourse() {
        if (!courseName || teeGroups.length === 0) {
            alert("Please fill in the course name and add at least one tee group.");
            return;
        }

        let mainImageBlob: number[] | null = null;
        if (mainImage) {
            const arrayBuffer = await mainImage.arrayBuffer();
            mainImageBlob = Array.from(new Uint8Array(arrayBuffer));
        }

        const dto: CreateGolfCourse = {
            name: courseName,
            founded,
            totalHoles: totalHoles,
            teeGroups,
            mainImage: mainImageBlob ? [mainImageBlob] : [],
            mainImageExtension,
            bannerImage: [],
            countryId: countryId,
            manager,
        };

        await golfCourseStore.addGolfCourse(dto);
        goto("/governance");
    }
</script>

<Layout>
    <div class="modal">
        <div class="modal-header">
            <h1>EDIT COURSE DETAILS</h1>
            <p>Your home course should be the one you play at most frequently, serving as your default for tracking scores.</p>
            <button class="close-btn" on:click={() => goto("/governance")}>✕</button>
        </div>

        <div class="form-section">
            <label for="course-name">COURSE NAME</label>
            <input id="course-name" type="text" bind:value={courseName} placeholder="Enter Golf Course Name" />

            <div class="image-upload">
                <p>COURSE IMAGE</p>
                <div class="upload-box">
                    {#if mainImage}
                        <p>{mainImage.name}</p>
                    {:else}
                        <p>800px x 800px min</p>
                    {/if}
                    <input type="file" accept="image/*" on:change={handleImageUpload} />
                    <button>UPLOAD</button>
                </div>
            </div>

            <div class="tee-color-input">
                <label for="tee-color">ADD TEE COLOR</label>
                <div class="tee-input-group">
                    <input
                        id="tee-color"
                        type="text"
                        bind:value={newTeeColor}
                        placeholder="Enter Tee Color (e.g., Pink)"
                    />
                    <button class="tab-btn add-tab" on:click={addTeeGroup}>+</button>
                </div>
            </div>

            <div class="tab-row">
                {#each teeGroups as teeGroup, index}
                    <div class="tab-container">
                        <button
                            class="tab-btn"
                            class:active={activeTabIndex === index}
                            style="background-color: {teeGroup.colour.toLowerCase()};"
                            on:click={() => switchTab(index)}
                        >
                            {teeGroup.name}
                        </button>
                        <button
                            class="remove-btn"
                            on:click={() => {
                                teeToRemove = index;
                                showConfirmDeleteTee = true;
                            }}
                        >
                            ✕
                        </button>
                    </div>
                {/each}
            </div>

            {#if activeTabIndex !== null}
                <div class="tee-group">
                    <h3>{teeGroups[activeTabIndex].name} Tees</h3>
                    <button class="copy-btn" on:click={copyToOtherTees}>Copy To Other Tees</button>
                    <table>
                        <thead>
                            <tr>
                                <th>HOLE</th>
                                <th>PAR</th>
                                <th>S.I</th>
                                <th>YARDS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each teeGroups[activeTabIndex].holes as hole, holeIndex}
                                <tr>
                                    <td>{hole.number}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            value={Number(hole.par)}
                                            on:change={(e) =>
                                                updateHole(activeTabIndex!, holeIndex, "par", (e.target as HTMLInputElement).value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            value={Number(hole.strokeIndex)}
                                            on:change={(e) =>
                                                updateHole(activeTabIndex!, holeIndex, "strokeIndex", (e.target as HTMLInputElement).value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            value={Number(hole.yardage)}
                                            on:change={(e) =>
                                                updateHole(activeTabIndex!, holeIndex, "yardage", (e.target as HTMLInputElement).value)}
                                        />
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}

            <div class="form-actions">
                <button class="cancel-btn" on:click={resetForm}>RESET</button>
                <button class="update-btn" on:click={submitGolfCourse}>UPDATE</button>
            </div>
        </div>
    </div>
    {#if showConfirmDeleteTee}
        <ConfirmModal
            message={`Are you sure you want to remove the ${teeGroups[teeToRemove!].name} tee group?`}
            onConfirm={() => {
                removeTeeGroup(teeToRemove!);
                showConfirmDeleteTee = false;
                teeToRemove = null;
            }}
            onCancel={() => {
                showConfirmDeleteTee = false;
                teeToRemove = null;
            }}
        />
    {/if}
</Layout>

