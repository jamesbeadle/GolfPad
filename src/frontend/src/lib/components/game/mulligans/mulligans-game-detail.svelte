

<div class="flex flex-col w-full">
    <p>Scorecard</p>
</div>

<div class="flex flex-row">
    <div class="w-1/4">
        <div class="flex flex-col">
            <p class="text-xs">HOLE</p>
            <p>{currentHole}</p>
        </div>
    </div>
    <div class="w-1/4">
        <div class="flex flex-col">
            <p class="text-xs">PAR</p>
            <p>{currentPar}</p>
        </div>
    
    </div>
    <div class="w-1/4">
        <div class="flex flex-col">
            <p class="text-xs">YARDS</p>
            <p>{currentYard}</p>
        </div>
    </div>
    <div class="w-1/4">
        <div class="flex flex-col">
            <p class="text-xs">S.I.</p>
            <p>{currentSI}</p>
        </div>
    </div>
</div>

<div class="flex flex-row">
    <div class="w-1/2">
        <p>PLAYER</p>
    </div>
    <div class="w-1/2">
        <p>AVAILABLE MULLIGANS</p>
    </div>
</div>

{#each players as player}
    <div class="w-1/2">
        <UserProfileScoreWidget />
    </div>
    <div class="w-1/4">
        <p>{player.availableMulligans}</p>
    </div>
    <div class="w-1/4">
        <button class="brand-button">USE</button>
    </div>
{/each}

<div class="flex flex-row">
    <div class="w-1/2">
        <p>WINNER</p>
    </div>
    <div>
        <p>SELECT THE WINNER OF THE HOLE</p>
    </div>
</div>

<div class="flex flex-row">

    {#each players as player}
        <div class="w-1/2">
            <UserSelectWidget />
        </div>
    {/each}
</div>

<div class="flex flex-row">
    <button class="w-1/2">PREVIOUS HOLE</button>
    <button class="w-1/2">NEXT HOLE</button>
</div>