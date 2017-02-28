# final-halite-bot
My bot for the halite.io programming competition.  It placed 720th out of almost 1,600 competitors.

# Strategy
The tl;dr version of my bot's strategy: OMG ZERG RUSH KEKEKEKEKE ^_^

To go into a bit more detail: the main idea is to go for a win by aggressively seeking out the nearest enemy and destroying them.  Repeat until no enemies are left, and you have won, even if most of the map is unexplored.

Some improvements I added along the way:
* Playing around with how long a bot should wait to grow.
* Understanding how to wrap around the board.  This proved to be extremely useful, as my bot will aggressively push to open up back attacks and pincer attacks on enemies, which are very difficult to defend against.
* Pathfinding optimizations.  I wasn't able to implement anything like Dijkstra's algorithm, but a Pathfinder helper class pushes bots to the most efficient route to their target.
* Adding in a bit of neutral territory expansion.  I would've liked to do a bit more with this, but I unfortunately was unable to.
* Pseudo-NATs.  I say "pseudo" because you really can't have full non-aggression treaties when you're just trying to rush everyone.  But in any case, the bot will not attack other players unless (a)They're two spaces away or (b)They're the closest opponent if no one is two spaces away.  This prevented my bot from splitting up its forces over two fronts with different opponents.

# Architecture
I built a rule engine to make my bot's behavior a bit flexible.  Each individual bot is run through a series of if-then statements in order, and depending on its situation, it is assigned a corresponding behavior.  Here is the logic the rule engine uses:

1. Is your strength less than 25?  If so, stay STILL.
2. Is there an enemy two spaces away from you?  If so, use the RUSH behavior.
3. Is there a neutral space next to you with a higher production from yours?  If so, use the EXPLORE behavior.
4. Otherwise, use the RUSH behavior.

The RUSH behavior simply states that the individual bot should find the nearest enemy to it and move towards it.  It moves through friendly territory if possible, then through low-strength neutral territory.
The EXPLORE behavior makes the bot wait until it's strong enough to take over the highest-production neutral territory, then take it over.

# Analysis
My strategy was very high-risk, high-reward.  If the initial rush did not succeed, my bot was often very far behind in territory, which would often result in early, avoidable losses.  Clearly, committing to a rush is not always the right move, especially on boards with high neutral strength or low production.

Additionally, even when a rush is a strong strategy, my bot could have done more in terms of orchestrating the rush.  Nothing was done in terms of making sure that there would be several strong individuals available to land an attack at about the same time; instead, it tended to be lone bots attacking one at a time, causing a bit of damage individually.  Sometimes, the result of me attacking an opponent is that it just kept both of us in a stalemate for long enough for another opponent to take out both of us.

Interestingly enough, the pathfinding logic was a bit of a mixed blessing.  While finding an efficient route to the target saved the bot a lot of strength, it curtailed the bot's ability to take over neutral territory, and also frequently meant that attacks would happen at a single point instead of a whole front.  More effective neutral expansion would have fixed this, as would trying to focus on an opponent's weak spot.

Overall, I feel like this bot is a part of a very, very strong bot.  When it is able to obtain an advantage, it is very often successful due to its aggression.  It is next to impossible for weaker bots to escape.  With some additional care built into obtaining neutral territory earlier and orchestrating attacks, I think this bot could've gone very far.
