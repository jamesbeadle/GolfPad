<script>
    import LogoIcon from "$lib/icons/logo-icon.svelte";
    import Layout from "../Layout.svelte";

</script>
<Layout>    
      
    <div class="p-4">
        <div class="flex flex-col bg-BrandGold rounded-md rounded-b-lg">
            <div class="flex flex-row items-center px-4 border-b border-b-BrandGreen justify-between">
                <div class="flex items-center">
                    <LogoIcon fill='#FFFFFF' className="w-8 mr-2 my-2" />
                    <p class="text-base text-BrandBlue">GolfPad Whitepaper</p>
                </div>
            </div>
            
            <div class="w-full bg-BrandDeepGreen p-4 rounded-b-md flex flex-col text-sm">
               
                
                <p class="mt-2">GolfPad was created for the golfer looking for alternative game formats to play alongside the standard strokeplay round they may be having.
                    Our first 5 game formats have been designed to make golf a lot more fun, allowing you to compete based on your golf game's unique skill areas over just your final total score.
                </p>
                <p class="mt-2 mb-4">Phase 1 of GolfPad is the enhanced gamification of a golf round using on of our unique games. 
                    Phase 2 is the organisation of golf clubs into DAOs withing the GolfPad framework, enhancing the club membership experience. 
                </p>
                <b class="text-lg"><u>Our Games</u></b>
                <p class="mt-2 mb-4">
                    Phase 1 of the GolfPad launch is with our 6 unique games. 
                    These games give a golfer, their friends & club a chance to particpiate in new challenges, refreshing their golf experience. 
                    Our games are listed below:
                </p>
    
                <b class="text-lg"><u>Bands</u></b>
                <p class="mt-2 mb-4">
                    'Bands' is all about predicting those purple patches in golf, the times you know you are on fire. 
                    Whether you start well or only get going towards the end, playing well at the right time is what counts. 
                </p>
                <p class="mt-2 mb-4">
                    [Bands Rules]
    
          //Pick ranges of 3 holes
          //can't pick the same group of 3 holes and they must be consecutive
    
          //Won't double bogey or worse
          //Won't bogie or worse
          //Be par or under (handicap adjusted)
          //Be under par (handicap adjusted)
          //Will hit 2/3 fairways
          //Will hit 2/3 greens
          //Will 1 putt 2/3 greens
          //Won't lose a ball
          //Won't enter a bunker (on any hole)
                </p>
    
                <b class="text-lg"><u>Prophet</u></b>
                <p class="mt-2 mb-4">
                    'Prophet' goes a step further than Bands with predicting what will happen in your golf round. 
                    Within prophet you select specific holes across a range of categories. 
                    Prophet helps train a golfer to think about the individual shot and wider game in general.
                </p>
    
                //predict your exact score a hole for small points
          //pick 9 holes you will get a net par or better
          //pick 3 holes you will get a net birdie or better
          //pick your best hole
          //pick your worst hole
          //pick 3 fairways you will hit
          //pick 3 holes in which you will reach the green in regulation (handicap adjusted, assumes 2 shots per green)
          //any 3 holes you 1 putt
    
                <b class="text-lg"><u>Mulligans</u></b>
                <p class="mt-2 mb-4">
                    Game Description
    
          //Get a certain number of mulligans to start with
          //if you make them count you can get more but if you waste them you get less
        //start with 1 mulligan every 3 holes
          //hit handicap or better on the hole you use the mulligan then get another mulligan on the following hole only
          //hit bogey or worse (hanidcap adjusted then you have to wait for the next 3rd hole interval to get a mulligan)
            //taking a mulligan on a first hole for instant would mean you have to start well to get one on the second hole
          //you can either take the original shot or the mulligan shot without penalty interchangeably
        //
                </p>
    
                <b class="text-lg"><u>Next Up</u></b>
                <p class="mt-2 mb-4">
                    Game Description
    
          //the holes are divided up randomly and a player is selected on each tee to lead the way, 
          //any players who beat them on the hole get points
          //you can only get points if you are attempting to beat a player
          //if no one beats you then you get points
          //remainder 
                </p>
    
                <b class="text-lg"><u>Call It</u></b>
                <p class="mt-2 mb-4">
                    Game Description
                </p>
    
                <b class="text-lg"><u>Build It</u></b>
                <p class="mt-2 mb-4">
                    Game Description
    
          //Setup a team where you build a card
          //Play against other teams on a course
          //Set the game up for a period or multiple periods of time
            //best score card over a date range, month, year etc
        //team games involving alternate shots
                </p>
    
                <div class="horizontal-divider my-2 mb-4" />
                <b class="text-lg"><u>Contract Center</u></b>
                <b class="text-lg"></b>
    
                <p class="mt-2 mb-4">You can fill contracts by accessing the 'Contract Center' through the side navigation panel.
                </p>
    
                <p class="mt-2 mb-4">Phase 2 of GolfPad is to give golf clubs to chance to organise under a DAO structure, enabling to reap the rewards of decentralised governance of their golf clubs rules. 
                    Organisating on GolfPad will give the club's players access to unique games that span their membership, all members and formats.
                </p>
    
                <!--Tokens-->





            </div>
        </div>
    </div>
</Layout>
