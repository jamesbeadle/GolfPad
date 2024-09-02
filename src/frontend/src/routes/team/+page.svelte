<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../Layout.svelte";

    onMount(() => {

    });

    const teamMembers = [
        { 
        name: "Zoe Duffy", 
        title: "Managing Director", 
        image: "zoe.jpg",
        handicap: 'Unknown',
        bio: [
            "Zoe has been instrumental in leading our team towards success. With a background in management and a passion for golf, Zoe ensures that our operations are always on par with the best in the industry.",
            "In addition to her leadership role, Zoe is an avid golfer who regularly competes in local tournaments, bringing her competitive spirit to both the course and the boardroom."
        ]
        },
        { 
        name: "Kelly Howlett", 
        title: "Head of Operations", 
        image: "kelly.jpeg",
        handicap: 18,
        bio: [
            "Kelly is the backbone of our daily operations, making sure everything runs smoothly. Her organizational skills and attention to detail are unparalleled.",
            "As a keen golfer, Kelly balances her work with her love for the sport, often spending weekends on the green perfecting her swing."
        ]
        },
        { 
        name: "James Beadle", 
        title: "Development Manager", 
        image: "james.jpg",
        handicap: 18,
        bio: [
            "James oversees all of our development projects, ensuring that our software meets the highest standards. His technical expertise is matched only by his love for golf.",
            "When he's not coding, you can find James on the course, where he enjoys strategizing his next big project while perfecting his short game."
        ]
        },
        { 
        name: "George Robinson", 
        title: "Community Manager", 
        image: "george.jpg",
        handicap: 24,
        bio: [
            "George is our go-to person for all things community-related. His ability to connect with users and understand their needs makes him an invaluable part of our team.",
            "Off the course, George enjoys organizing golf events and helping others improve their game, making him a true ambassador for the sport."
        ]
        },
        { 
        name: "Josh Wray", 
        title: "Head of Promotion", 
        image: "josh.jpg",
        handicap: 28,
        bio: [
            "Josh is the creative force behind our promotional strategies. His innovative ideas and deep understanding of the market help us reach new heights.",
            "A competitive golfer, Josh brings the same level of creativity and focus to the course as he does to his work, making him a formidable opponent both on and off the green."
        ]
        },
        { 
        name: "Dfinity Designer", 
        title: "Head of Design", 
        image: "dfd.jpg",
        handicap: 18,
        bio: [
            "Our design head, known for their attention to detail, ensures that every aspect of our product is visually stunning and user-friendly.",
            "They are also a passionate golfer, believing that both design and golf require precision, patience, and a keen eye for detail."
        ]
        }
    ];
</script>
<Layout>
    <div class="flex flex-col space-y-6 text-base text-black p-4">
        <h2 class="text-3xl md:text-5xl font-black text-black mb-4 mt-3 condensed tracking-tight leading-tight">
        OUR TEAM
        </h2>
      
    
      <p class="text-lg leading-relaxed">
        Waterway Labs have a team of keen golfers. The team has experience of being long-time club members along with playing courses with friends on an ad-hoc basis. Using the team's domain knowledge will ensure that <span class="condensed">GOLFPAD</span> contains everything a golfer expects from an all-in-one golf solution and more.
      </p>
      
      <p class="text-lg leading-relaxed">
        The Waterway Labs team is in the process of expansion, bringing on a new Managing Director & Head of Operations in June 2024.
      </p>
    
      <h2 class="text-2xl font-semibold">Meet the Team</h2>
    
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each teamMembers as member}
          <div class="bg-gray-100 p-6 rounded-lg shadow-lg space-y-4">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src={`team/${member.image}`} alt={member.name} class="w-full h-full object-cover" />
              </div>
              <div>
                <h3 class="text-xl font-medium">{member.name}</h3>
                <p class="text-sm text-gray-500">{member.title}</p>
                <p class="text-sm text-gray-600">Handicap: {member.handicap}</p>
              </div>
            </div>
            <div class="text-sm text-gray-700 space-y-2">
              {#each member.bio as paragraph}
                <p>{paragraph}</p>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
</Layout>
  
  