<script lang="ts">
    import ShowSelectGameModal from "$lib/components/games/show-select-game-modal.svelte";
    import Layout from "../../Layout.svelte";
    import Select from 'svelte-select';
    import { goto } from "$app/navigation";
    //TODO Needs to actually get course, tee and opponents from backend then save game when created
    type Course = {
        value: string;
        label: string;
        img: string;
    }

    type Tee = {
        value: string;
        label: string;
    }

    type Opponent = {
        name: string;
        title: string;
        image: string;
    }

    let tees: Tee[] = [
        { value: 'blue-tee', label: 'Blue Tee'},
        { value: 'white_tee', label: 'White Tee' },
        { value: 'black_tee', label: 'Black Tee' },
        { value: 'red_tee', label: 'Red Tee' }
    ];

    let courses: Course[] = [
        { value: 'royal_dornoch', label: 'Royal Dornoch', img: '/golfCourse.png' },
        { value: 'swinley_forest', label: 'Swinley Forest', img: '/golfCourse.png' },
        { value: 'trump_turnberry', label: 'Trump Turnberry', img: '/golfCourse.png' },
        { value: 'royal_birkdale', label: 'Royal Birkdale Golf Club', img: '/golfCourse.png' },
        { value: 'royal_liverpool', label: 'Royal Liverpool Golf Club', img: '/golfCourse.png' },
        { value: 'royal_st_george', label: 'Royal St. Georges', img: '/golfCourse.png' },
        { value: 'waterville', label: 'Waterville', img: '/golfCourse.png' }
    ];

    let opponents: Opponent[] = [
        { name: 'Zoe Duffy', title: 'Managing Director', image: '/zoe.jpg'  },
        { name: 'Kelly Howlett', title: 'Head of Operations', image: '/kelly.jpeg' },
        { name: 'James Beadle', title: 'Development Manager', image: '/james.jpg'  },
        { name: 'Dfinity Designer', title: 'Head of Design', image: '/dfd.jpg'  },
        { name: 'Thilly Thana', title: 'Lead Developer', image: '/thilly.jpg'  },
        { name: 'George Robinson', title: 'Community Manager', image: '/george.jpg'  },
        { name: 'Josh Wray', title: 'Head of Promotion', image: '/josh.jpg'  },
        { name: 'Ashutosh Yadav', title: 'Media Production Manager', image: '/ashutosh.jpg'  }
  ];

    let selectedOpponent: Opponent[]=[];
    let selectedCourse: { value: string, label: string, img:string } | null = null;
    let selectedTee: Tee | null = null;

    //TODO there is a bug with when an opponent is selected then the array gets deleted for some reason
    function handleSelectionChange(selected: Opponent[]) {
        selectedOpponent = selected.map((opponent) => ({ ...opponent }));
    }

    function isSelected(opponent: Opponent): boolean {
        return selectedOpponent.some(sel => sel.name === opponent.name);
    }

    function generateGameId(){
        //TODO there is a getGameDTO with the game id inside it 
        return Math.random().toString(36).substr(2,9);
    }
</script>

<Layout>
    <div class="flex flex-col w-full">
        <div class="w-full p-2 px-4 text-black">
            <h2 class="mt-2 mb-0 text-3xl font-black text-black md:text-5xl condensed">MULLIGANS</h2>
        </div>
  
        <div class="w-full p-4 text-black bg-gray-100">
            <h3 class="mt-0 mb-2 text-3xl font-black text-black md:text-3xl condensed">GAME DETAILS</h3>

            <label for="course" class="block mt-4 text-lg font-bold text-black">Course</label>
            <!-- Course -->
            <div class="flex items-center w-full mt-2 text-black bg-gray-100">
                <div class="flex-grow max-w-md">
                    <Select 
                        id="course"
                        items={courses}
                        bind:value={selectedCourse}
                        label="label"
                        placeholder="Select a Course"
                        searchable
                        class="p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override"
                    >
                        <svelte:fragment slot="item" let:item>
                            <div class="flex items-center w-12 h-12 p-2 space-x-3">
                                <img src={item.img} alt={item.label} class="object-cover w-8 h-8 rounded-lg" />
                                <span class="text-black">{item.label}</span>
                            </div>
                        </svelte:fragment>
                    </Select>
                </div>
            
                <!-- Add New Course Button -->
                <button class="flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-black rounded-full shadow-md" style="margin-left: 8px" >
                   +
                </button>
            </div>

            <label for="tee" class="block mt-4 text-lg font-bold text-black">Tee</label>

            <div class="flex items-center w-full mt-2 text-black bg-gray-100">
                <div class="flex-grow max-w-md">
                    <Select 
                        id="tee"
                        items={tees}
                        bind:value={selectedTee}
                        label="label"
                        placeholder="Select a Tee"
                        searchable
                        class="p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override"
                    />
                </div>
            </div>

            <!-- Date Selection -->
            <div class="mt-4">
                <label for="date" class="block mb-2 text-lg font-bold text-black">Date</label>
                <input type="date" id="date" name="date" class="w-full max-w-md p-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>

            <!--Opponent Selection-->
            <label for="opponent" class="block mt-4 text-lg font-bold text-black">Opponents</label>

            <div class="flex items-center w-full mt-2 text-black bg-gray-100">
                <div class="flex-grow max-w-md">
                    <Select 
                        id="opponent"
                        items={opponents}
                        bind:value={selectedOpponent}
                        label="name"
                        placeholder="Select your Opponent(s)"
                        multiple={true}
                        searchable
                        on:change={(e) => handleSelectionChange(e.detail)}
                        class="p-2 text-black bg-white rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none active:bg-white select-override"
                    >
                        <svelte:fragment slot="item" let:item > <!-- Custom rendering for items -->
                                <div class="flex items-center justify-between w-full p-2">
                                    <span>{item.name}</span>
                                   <!--  {#if isSelected (item)}
                                        <FaIcon icon={faCheck} class="text-green-500" />
                                    {/if} -->
                                </div>
                        </svelte:fragment>
                    </Select>
                </div>
            </div>
        </div>    
        <button class="btn btn-new-game" on:click={() => goto(`/games/mulligans/${generateGameId()}`)}>
            Create New Game
        </button>
    </div>
</Layout>

<style>
    :global(.select-override .svelte-select__control) {
        background-color: white !important;
        color: black !important;
    }
    .btn {
        padding: 10px 10px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        width: 400px;
        margin: 1rem 0 1rem 1.5rem;
    }

    .btn-new-game {
        background-color: #f6c200;
        color: #1C4932;
        border: none;
    }

    .btn-new-game:hover {
        background-color: #e4c013; /* Darker yellow on hover */
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2); /* More shadow on hover */
    }

    .create-button:active {
        background-color: #d3a913; /* Even darker on click */
        transform: translateY(2px); /* Simulating a pressed state */
    }

</style>