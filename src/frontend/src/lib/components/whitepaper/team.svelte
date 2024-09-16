
<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
      window.scrollTo(0, 0);
  });
  
  const teamMembers = [
    { name: "Zoe Duffy", title: "Managing Director", image: "zoe.jpg"  },
    { name: "Kelly Howlett", title: "Head of Operations", image: "kelly.jpeg" },
    { name: "James Beadle", title: "Development Manager", image: "james.jpg"  },
    { name: "Dfinity Designer", title: "Head of Design", image: "dfd.jpg"  },
    { name: "Thilly Thana", title: "Lead Developer", image: "thilly.jpg"  },
    { name: "George Robinson", title: "Community Manager", image: "george.jpg"  },
    { name: "Josh Wray", title: "Head of Promotion", image: "josh.jpg"  },
    { name: "Ashutosh Yadav", title: "Media Production Manager", image: "ashutosh.jpg"  }
  ];
</script>

<div class="flex flex-col space-y-6 text-base">
  <h2 class="text-2xl font-black text-black condensed">OUR TEAM</h2>
 
  <p class="text-lg leading-relaxed">
    Waterway Labs have a team of keen golfers. The team have experience of being long time club members along with playing courses with friends on an adhoc basis. Using the team's domain knowledge will ensure that <span class="condensed">GOLFPAD</span> contains everything a golfer expects from an all-in-one golf solution and more.
  </p>
  
  <p class="text-lg leading-relaxed">
    The Waterway Labs team is in the process of expansion, bringing on a new Managing Director & Head of Operations in June 2024.
  </p>

  <h2 class="text-2xl font-semibold">Meet the Team</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each teamMembers as member}
      <div class="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-lg">
        <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <img src={`team/${member.image}`} alt={member.name} class="w-full h-full object-cover" />
        </div>
        <div>
          <h3 class="text-xl font-medium">{member.name}</h3>
          <p class="text-sm text-gray-500">{member.title}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
