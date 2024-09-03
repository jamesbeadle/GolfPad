<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        window.scrollTo(0, 0);
    });
</script>

<div class="flex flex-col items-center space-y-6 p-4 bg-gray-50 text-gray-900 w-full">
    <img src="token.png" alt="Golfpad Token" class="w-20 h-20 rounded-full shadow-lg">

    <h2 class="text-3xl font-extrabold text-center">
        The <span class="font-extrabold text-black condensed">GOLFPAD</span> DAO
    </h2>

    <div class="space-y-4 text-base w-full">
        <p>
            The <span class="font-semibold">GOLFPAD</span> DAO will be used to govern our valuable worldwide golf dataset. 
            As a new golfer discovers the platform and adds their home course, a proposal can be raised to make their course official. 
            This consensus-backed dataset of worldwide courses will serve as the foundation for a range of Golf apps within the <span class="font-semibold">GOLFPAD</span> ecosystem.
        </p>
        <p>
            The DAO will be decentralised and governed using the utility token, $GOLF. The $GOLF token will be used throughout the <span class="font-semibold">GOLFPAD</span> ecosystem, initially ensuring we have zero 3rd party dependencies.
        </p>
        <p>
            Future features will enable golfers, coaches, and clubs to use their golf tokens as we bring additional areas of golf 100% on-chain.
        </p>
        <p>
            We will enable coaches to provide lessons and subscription-based content through our upcoming <span class="font-semibold">GOLF SCHOOL</span> features.
        </p>
        <p>
            Golf clubs will have the opportunity to manage memberships, events, and take payments all on a completely secure, tamper-proof blockchain. 
        </p>
    </div>

    <!-- Divider -->
    <div class="w-full h-px bg-gray-300"></div>

    <!-- Tokenomics Section -->
    <div class="w-full text-left">
        <h3 class="text-xl font-semibold mb-2 text-green-700">Tokenomics at Decentralisation</h3>
        <ul class="list-disc list-inside text-left space-y-2 text-base">
            <li>SNS Sale Participants: 25%</li>
            <li>Waterway Labs: 16.8%</li>
            <li>OpenFPL Neuron Holders: 3.6%</li>
            <li>OpenFPL Supporters Club: 3.6%</li>
            <li><span class="condensed">GOLFPAD</span> Treasury: 51%</li>
        </ul>
    </div>
</div>
