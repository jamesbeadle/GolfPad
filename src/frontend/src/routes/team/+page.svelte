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
            "With a robust background in the software development and technology industries, Zoe brings a wealth of experience to her role as Managing Director.",
            "Her career spans over 20 years, during which she has cultivated expertise in sales, customer success, and marketing, driving growth and innovation across multiple organisations.",
            "A passionate advocate for supporting women in tech, Zoe is committed to fostering an inclusive and diverse workplace where everyone can thrive.",
            "She believes in empowering the next generation of female leaders and actively mentors women seeking to advance their careers in technology.",
            "Outside of her professional life, Zoe is a dedicated mum to two children. She balances her dynamic career with a love for running, cycling, and exploring the great outdoors."
        ]
        },
        { 
        name: "Kelly Howlett", 
        title: "Head of Operations", 
        image: "kelly.jpeg",
        handicap: 18,
        bio: [
            "Kelly is head of Operations at Waterway Labs, ensuring our dynamic UK based team can work together smoothly. Kelly turns our vision to bring real world users to the Internet Computer into a reality with his dedication to our UK marketing strategy. Kelly lives with our unofficial head of security, Trevor, both of whom can be found touring the UK in the OpenFPL podcast studio.",
            "Kelly studied Ecology and Conservation and Natural History in Cambridge, building extensive experience in geotechnical engineering in his professional career. Kelly has worked on large-scale projects throughout Europe and the United States, specialising in utilising advanced technology to acheive wide ranging goals.",
            "Kelly has always had a passion for sports, previously being sponsored as a professional kiter. Nowadays he prefers to keep his feet on the ground, enjoying a game of football or round of golf."
        ]
        },
        { 
        name: "James Beadle", 
        title: "Development Manager", 
        image: "james.jpg",
        handicap: 18,
        bio: [
            "James oversees all of our development projects, ensuring that our software meets the highest standards.", 
            "James has over 15 years experience delivering projects for worldwide brands, including Ford, Coca Cola & GSK.",
            "The Internet Computer blockchain attracted James due it's ability to create a more equitable future for people. James believes passionately about using this new technology to create truly decentralised services.",
            "When he's not coding, you can find James on his narrowboat, where he enjoys thinking about his next big project while perfecting his short game."
        ]
        },
        { 
        name: "George Robinson", 
        title: "Community Manager", 
        image: "george.jpg",
        handicap: 24,
        bio: [
          "George is our go-to person for all things community-related. His ability to connect with users and understand their needs makes him an invaluable part of our team.",
          "George has been in crypto for almost 5 years, specifically championing the unique features of ICP since 2021.",
          "Needing something to do during the football offseason, George picked up golf at the start of the 2024 summer. If he’s not on the course or the driving range, he’ll be at the club bar!"
        ]
        },
        { 
        name: "Josh Wray", 
        title: "Head of Promotion", 
        image: "josh.jpg",
        handicap: 28,
        bio: [
            "Josh brings a wealth of experience from a background in the pharmaceutical industry, where attention to detail and a deep understanding of complex technologies were essential.",
            "Over the past five years, Josh has shifted focus towards blockchain technology, with a particular interest in the Internet Computer (ICP) ecosystem.",
            "Josh's passion for innovation and emerging technologies has driven their success in promoting and growing blockchain projects.",
            "As Head of Promotion at Waterway Labs, Josh leverages this expertise to build strong relationships, drive engagement, and enhance the visibility of our cutting-edge initiatives within the tech community and beyond."
        ]
        },
        { 
        name: "Dfinity Designer", 
        title: "Head of Design", 
        image: "dfd.jpg",
        handicap: 18,
        bio: [
            "We believe we have the best designer in the world. Dfinity Designer maps out the user journey from start to finish, always ensuring a simple yet stunning product is created.",
            "Dfinity Designer's work can be enjoyed throughout the ICP blockchain, having designed a range of applications including OpenChat and OpenFPL.",
            "Dfinity Designer is also a keen golfer, making it even easier for him to design the perfect golf platform."
        ]
        }
    ];
</script>
<Layout>
    <div class="flex flex-col space-y-6 text-base text-black p-4">
      <h2 class="text-3xl md:text-5xl font-black text-black mb-4 mt-3 condensed">
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
  
  