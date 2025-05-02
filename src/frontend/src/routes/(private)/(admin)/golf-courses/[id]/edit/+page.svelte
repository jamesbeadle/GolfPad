<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import ConfirmModal from "$lib/components/shared/confirm-modal.svelte";
    import { golfCourseStore } from "$lib/stores/golf-course-store";
    import type { CreateGolfCourse, TeeGroup, Hole, GolfCourse, UpdateGolfCourse } from "../../../../../../declarations/backend/backend.did";
    import { page } from "$app/state";
    import Layout from "../../../+layout.svelte";
    
    let courseId: bigint = BigInt(page.params.id);
    let golfCourse: GolfCourse | null = null;
    let loading = true;
    let error: string | null = null;

    let courseName = "";
    let founded = 0n;
    let totalHoles = 18;
    let countryId = 0;
    let manager = "";
    let mainImage: File | null = null;
    let mainImageExtension = "";
    let bannerImage: File | null = null;
    let bannerImageExtension = "";
    let teeGroups: TeeGroup[] = [];
    let activeTabIndex: number | null = null;
    let newTeeColor: string = "";
    let showConfirmDeleteTee = false;
    let teeToRemove: number | null = null;

    onMount(async () => {
        try {
            golfCourse = await golfCourseStore.getGolfCourse({ id: courseId });
            if (golfCourse) {
                courseName = golfCourse.name;
                founded = golfCourse.founded;
                totalHoles = golfCourse.totalHoles;
                countryId = golfCourse.countryId;
                manager = golfCourse.manager;
                mainImageExtension = golfCourse.mainImageExtension || "";
                
                teeGroups = golfCourse.tees.map((tee, index) => ({
                    index,
                    name: tee.name,
                    colour: tee.colour,
                    added: tee.added,
                    holes: tee.holes.map(hole => ({
                        number: Number(hole.number),
                        name: hole.name || `Hole ${hole.number}`,
                        colour: tee.colour,
                        yardage: hole.yardage,
                        par: Number(hole.par),
                        strokeIndex: Number(hole.strokeIndex)
                    })) as Hole[]
                }));
                
                activeTabIndex = teeGroups.length > 0 ? 0 : null;
            }
        } catch (err) {
            error = err instanceof Error ? err.message : 'An unexpected error occurred';
        } finally {
            loading = false;
        }
    });

    function handleImageUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
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
                    number: i + 1,
                    name: `Hole ${i + 1}`,
                    colour: newTeeColor,
                    yardage: BigInt(0),
                    par: 0,
                    strokeIndex: 0,
                    images: []
                })) as Hole[]
            }
        ];
        activeTabIndex = newIndex;
        newTeeColor = "";
    }

    function removeTeeGroup(index: number) {
        teeGroups = teeGroups.filter((_, i) => i !== index);
        if (activeTabIndex === index) {
            activeTabIndex = teeGroups.length > 0 ? 0 : null;
        } else if (activeTabIndex && activeTabIndex > index) {
            activeTabIndex -= 1;
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
                    (teeGroups[teeIndex].holes[holeIndex] as any)[field] = BigInt(value || "0");
                } else {
                    (teeGroups[teeIndex].holes[holeIndex] as any)[field] = Number(value || "0");
                }
            } else if (field === "name" || field === "colour") {
                teeGroups[teeIndex].holes[holeIndex][field] = value;
            }
            teeGroups = [...teeGroups];
        }
    }

    function copyToOtherTees() {
        if (activeTabIndex === null) return;
        const sourceHoles = teeGroups[activeTabIndex].holes;
        teeGroups = teeGroups.map((tee, index) => {
            if (index !== activeTabIndex) {
                return { ...tee, holes: sourceHoles.map(h => ({ ...h, colour: tee.colour })) };
            }
            return tee;
        });
    }

    function resetForm() {
        if (golfCourse) {
            courseName = golfCourse.name;
            founded = golfCourse.founded;
            totalHoles = golfCourse.totalHoles;
            countryId = golfCourse.countryId;
            manager = golfCourse.manager;
            mainImage = null;
            mainImageExtension = golfCourse.mainImageExtension || "";
            teeGroups = golfCourse.tees.map((tee, index) => ({
                index,
                name: tee.name,
                colour: tee.colour,
                added: tee.added,
                holes: tee.holes.map(hole => ({
                    number: Number(hole.number),
                    name: hole.name || `Hole ${hole.number}`,
                    colour: tee.colour,
                    yardage: hole.yardage,
                    par: Number(hole.par),
                    strokeIndex: Number(hole.strokeIndex)
                })) as Hole[]
            }));
            activeTabIndex = teeGroups.length > 0 ? 0 : null;
        }
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

        let bannerImageBlob: number[] | null = null;
        if (bannerImage) {
            const arrayBuffer = await bannerImage.arrayBuffer();
            bannerImageBlob = Array.from(new Uint8Array(arrayBuffer));
        }

        const dto: UpdateGolfCourse = {
            courseId: BigInt(page.params.id),
            name: courseName,
            teeGroups,
            mainImage: mainImageBlob ? [mainImageBlob] : [],
            mainImageExtension,
            bannerImage: bannerImageBlob ? [bannerImageBlob] : [],
            bannerImageExtension,
            manager
        };

        await golfCourseStore.updateGolfCourse(dto);
        goto("/governance");
    }
</script>

<Layout>
    {#if loading}
        <div class="loading">Loading golf course...</div>
    {:else if error}
        <div class="error">Error: {error}</div>
    {:else}
        <div class="modal">
            <div class="modal-header">
                <h1>EDIT COURSE DETAILS</h1>
                <p>Update your golf course details and submit a proposal for changes.</p>
                <button class="close-btn" onclick={() => goto("/governance")}>✕</button>
            </div>

            <div class="form-section">
                <label for="course-name">COURSE NAME</label>
                <input id="course-name" type="text" bind:value={courseName} placeholder="Enter Golf Course Name" />

                <div class="image-upload">
                    <p>COURSE IMAGE</p>
                    <div class="upload-box">
                        {#if mainImage}
                            <p>{mainImage.name}</p>
                        {:else if mainImageExtension}
                            <p>Current image: .{mainImageExtension}</p>
                        {:else}
                            <p>800px x 800px min</p>
                        {/if}
                        <input type="file" accept="image/*" onchange={handleImageUpload} />
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
                        <button class="tab-btn add-tab" onclick={addTeeGroup}>+</button>
                    </div>
                </div>

                <div class="tab-row">
                    {#each teeGroups as teeGroup, index}
                        <div class="tab-container">
                            <button
                                class="tab-btn"
                                class:active={activeTabIndex === index}
                                style="background-color: {teeGroup.colour.toLowerCase()};"
                                onclick={() => switchTab(index)}
                            >
                                {teeGroup.name}
                            </button>
                            <button
                                class="remove-btn"
                                onclick={() => {
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
                        <button class="copy-btn" onclick={copyToOtherTees}>Copy To Other Tees</button>
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
                                                onchange={(e) =>
                                                    updateHole(activeTabIndex!, holeIndex, "par", (e.target as HTMLInputElement).value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                min="0"
                                                value={Number(hole.strokeIndex)}
                                                onchange={(e) =>
                                                    updateHole(activeTabIndex!, holeIndex, "strokeIndex", (e.target as HTMLInputElement).value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                min="0"
                                                value={Number(hole.yardage)}
                                                onchange={(e) =>
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
                    <button class="cancel-btn" onclick={resetForm}>RESET</button>
                    <button class="update-btn" onclick={submitGolfCourse}>UPDATE</button>
                </div>
            </div>
        </div>
    {/if}
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