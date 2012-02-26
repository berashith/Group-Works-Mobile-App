Ext.define(
  'Category', 
  {
    extend: "Ext.data.Model",
    fields: [
      { name: 'id',   type: 'int' },
      { name: 'name', type: 'string' }
    ],
  }
);

Ext.define(
  'Pattern',
  {
    extend: "Ext.data.Model",
    fields: [
      { name: 'id',           type: 'int' },
      { name: 'name',         type: 'string' }, 
      { name: 'heart',        type: 'string' },
      { name: 'picture',      type: 'string' },
      { name: 'category_id',  type: 'int' }, 
      { name: 'related_pattern_ids' }
    ],
  }
);

var categoryTemplate = new Ext.XTemplate( '{name}' );

var patternTemplate = new Ext.XTemplate( '{name}' );

var patternDetailTemplate = new Ext.XTemplate([
  "<img src='{picture}'>",
  "<div id='patternDetailHeart'>",
    "{heart}",
  "</div>",
  "<div id='patternRelatedPatterns'>",
    "Related Patterns: ",
    "<tpl for='related_pattern_ids'>",
      "<a href='#' onclick='showPattern({.})'>{[patternStore.findRecord('id', values).get('name')]}</a>&nbsp;",
    "</tpl>",
  "</div>"
]);

var categoryStore = new Ext.data.JsonStore({
  model: 'Category',
  sorters: 'name',

  getGroupString: function( record ) {
      return record.get( 'name' )[ 0 ];
  },

  data: [
    { id: 0,  name: 'Context' },
    { id: 1,  name: 'Creativity' },
    { id: 2,  name: 'Faith' },
    { id: 3,  name: 'Flow' },
    { id: 4,  name: 'Inquiry & Synthesis' },
    { id: 5,  name: 'Intention' },
    { id: 6,  name: 'Modelling' },
    { id: 7,  name: 'Perspective' },
    { id: 8,  name: 'Relationship' }
  ]
});

var patternStore = new Ext.data.JsonStore({
  model: 'Pattern',
  sorters: 'name', 

  data: [
    {
      id: 0,
      name: 'Aesthetics of Space',
      heart: 'Gathering places that are beautiful, comfortable, functional, and creatively designed to serve the purpose of the meeting call forth participants\' best life energy to contribute. Thoughtfully arrange the space and decor to inspire, focus, and sustain the group\'s work.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2671/NatureRoom1_medium.JPG',
      category_id: 0,
      related_pattern_ids: [9, 27, 38, 56, 57, 59, 52]
},    {
      id: 1,
      name: 'All Grist for the Mill',
      heart: 'Play the ball where it lands. Handled well, everything that happens.mistakes, upsets, tangents, jokes, confusion.is potentially useful fodder for learning, surfacing truth, and community bonding.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2496/grist_mill_medium.jpg',
      category_id: 2,
      related_pattern_ids: [2, 21, 44, 24, 25, 39, 4]
},    {
      id: 2,
      name: 'Appreciation',
      heart: 'Enthusiasm and thankfulness are infectious, deepening trust and connection. Positive energy provides the most generative base for whatever comes next. Look for the good in what\'s happening and who people are, then work from there.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3021/poppy-gift_medium.jpg',
      category_id: 8,
      related_pattern_ids: [7, 24, 31, 32, 37, 45, 79]
},    {
      id: 3,
      name: 'Appropriate Boundaries',
      heart: 'As stewards of the process, maintain safety and integrity of the container by drawing lines when needed. Compassionately acknowledge individual suffering to open the group heart, while reaffirming the group\'s purpose to keep it on track. Face membership questions with clarity and candour.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2521/stile_medium.jpg',
      category_id: 6,
      related_pattern_ids: [36, 53, 61, 52, 89, 4, 25]
},    {
      id: 4,
      name: 'Balance Process and Content',
      heart: 'Content refers to what you are talking about and the results of a session. Process is how the conversation happens. Like two wings of a bird, both are needed for balance, lift, and progress.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3040/flying-bike_medium.jpg',
      category_id: 3,
      related_pattern_ids: [25, 36, 62, 83, 19, 61, 30]
},    {
      id: 5,
      name: 'Balance Structure and Flexibility',
      heart: 'Structures, such as a clear agenda, time limits, or raising hands before speaking, can create safety, focus, and a form for the group\'s energy to pour into. Yet to sustain the life of a group, this must be balanced with a great openness to change, dancing between the two as needed.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2406/stepping_stones_medium.jpg',
      category_id: 3,
      related_pattern_ids: [18, 21, 25, 36, 39, 56, 4]
},    {
      id: 6,
      name: 'Breaking Bread Together',
      heart: 'Gathering over a meal is one of the most ancient forms of community process, as people sharing food appreciate each other at a profound level. Nourished bodies and relationships pave the way for better collaboration and higher quality work.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4327/b_5366921238_a04b15727a_b_2_medium.jpg',
      category_id: 8,
      related_pattern_ids: [7, 12, 32, 38, 64, 66, 79]
},    {
      id: 7,
      name: 'Celebrate',
      heart: 'With joy and zest, publicly celebrate milestones and recurring events. Affirming shared history, we nourish community, crystallize a sense of accomplishment, and build group identity by unifying our stories and common goals. Can be planned and ritualized, or as spontaneous as a group cheer.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3542/celebrate_-_5810972882_760a4dbb31_o_1__medium.jpg',
      category_id: 8,
      related_pattern_ids: [2, 6, 12, 32, 66, 76, 55]
},    {
      id: 8,
      name: 'Challenge',
      heart: 'Challenging something.accepted wisdom, ideas, information, practices or ways of looking at things.provokes learning and new thinking, surmounts complacency and blind spots, and engenders creativity. It also invites us to reexamine our uncritical acceptance of convention and the status quo.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4332/5546539046_e67ab4b8a8_b_medium.jpg',
      category_id: 1,
      related_pattern_ids: [1, 20, 45, 79, 84]
},    {
      id: 9,
      name: 'Circle',
      heart: 'A Circle is a safe, solid, yet permeable space with an inside, an outside, and a focus that moves from person to person. A welcoming form where everyone can see each other and all voices are heard, it creates a field that invites sharing and story.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3537/schoolyard_circle_medium.jpg',
      category_id: 0,
      related_pattern_ids: [0, 32, 54, 58, 71, 72, 36]
},    {
      id: 10,
      name: 'Closing',
      heart: 'The formal ritual that concludes the collective time and space by completing the cycle of a group process. Include everyone, acknowledge the end of the time together and mark the transition point, ushering in a shift to what follows.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3552/closing_-_5810406567_e5b8aeb91e_o_medium.jpg',
      category_id: 3,
      related_pattern_ids: [7, 11, 24, 34, 50, 66, 18]
},    {
      id: 11,
      name: 'Commitment',
      heart: 'A group dedicated to its work persists through obstacles, distractions, and lulls. Remind yourselves of your larger purpose and what you really care about. As the group moves toward action, support effectiveness by getting clear on who will do what by when and how to ensure it really happens.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4277/1800236987_109606ad72_b_medium.jpg',
      category_id: 5,
      related_pattern_ids: [10, 13, 37, 62, 70, 72, 78]
},    {
      id: 12,
      name: 'Common Ground',
      heart: 'Consciously decide to give more attention to where we agree than where we don.t. By tuning in to what we share, we find the way to make progress together.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2861/IMGP0032_1_medium.jpg',
      category_id: 7,
      related_pattern_ids: [6, 11, 50, 53, 85, 31, 20]
},    {
      id: 13,
      name: 'Courageous Modelling',
      heart: 'Someone needs to risk going first: to speak out, try a new behaviour, raise concerns, welcome feedback. Be honest, open, authentic, bold, and smart about it. You can catalyze forward movement by taking the lead to show others it can be done, and how.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3607/woman_out_front_-_5565515695_5b06c02b73_o_medium.jpg',
      category_id: 6,
      related_pattern_ids: [24, 51, 58, 78, 83, 8, 17]
},    {
      id: 14,
      name: 'Deliberate',
      heart: 'Take time to reflect on the issues at hand and make wise decisions. Done well, thinking things through together helps us understand a bigger picture, so we can deal capably and creatively with changing realities. ',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2016/Pondering_Woman_medium.jpg',
      category_id: 4,
      related_pattern_ids: [44, 29, 40, 41, 63, 73]
},    {
      id: 15,
      name: 'Discharging',
      heart: 'Blocked by frustration, anger, hurt, fear, or despair, we acknowledge and let go of what grips us in order to shift and move on. Tune in to discern whether to do this directly (such as making space in a meeting to express tough feelings), or indirectly through humour, breathing, or taking a walk.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2851/monkey-shout_medium.jpg',
      category_id: 6,
      related_pattern_ids: [19, 20, 89, 48, 53, 69, 8]
},    {
      id: 16,
      name: 'Distilling',
      heart: 'To keep a conversation or inquiry focused, regularly summarize and synthesize what has been said or learned. Articulate the common ground of meaning. Assess what it all adds up to. Distil elements to an essential, integrated whole.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3277/arranging_post-its_medium.jpg',
      category_id: 4,
      related_pattern_ids: [12, 18, 34, 40, 47, 50, 51]
},    {
      id: 17,
      name: 'Dive In',
      heart: 'Sometimes, when the way ahead is a little murky, choosing to just begin and try things out is the best way to approach the challenge, task, or issue at hand. With a commitment to learning from whatever happens, Dive In to discover the path ahead.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3372/group_jump_medium.jpg',
      category_id: 2,
      related_pattern_ids: [29, 39, 41, 60, 81, 1, 84]
},    {
      id: 18,
      name: 'Divergence and Convergence Rhythm',
      heart: 'Diverging widens perspective, explores new terrain and opens up options. Converging coalesces collective wisdom in moving toward focused decisions, concrete outcomes, and the end of the session. Good group process naturally cycles between these two, so be thoughtful about which to engage when.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3952/train_tracks__cropped_medium.jpg',
      category_id: 3,
      related_pattern_ids: [28, 20, 43, 50, 81, 67, 16]
},    {
      id: 19,
      name: 'Dwell with Emotions',
      heart: 'Let emotions be expressed and acknowledged, without jumping in to \"fix\" or change them. Explore strong feelings to find what drives the passion underneath them and ensure important values and perspectives aren\'t glossed over.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4137/quiet-comfort_medium.jpg',
      category_id: 6,
      related_pattern_ids: [15, 89, 45, 4, 60]
},    {
      id: 20,
      name: 'Embrace Dissonance and Difference',
      heart: 'Encourage your group to honour contradictory viewpoints, sitting with the uncertainty and ambiguity this brings. Acknowledge all perspectives as equally valid and explore them as fully as needed, especially when tensions are high and agreement seems far away.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2911/confrontation_medium.jpg',
      category_id: 7,
      related_pattern_ids: [12, 29, 37, 45, 8, 79, 31]
},    {
      id: 21,
      name: 'Emergence',
      heart: 'Welcome the spaces between rigid structure and unproductive chaos, numbing familiarity and paralyzing anxiety. To work with complexity as a generative cauldron, encourage flexibility, self-organization, and mutual discovery. Embracing what arises, the group gives birth to new insights and forms.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3422/monarch_butterfly_medium.jpg',
      category_id: 2,
      related_pattern_ids: [44, 25, 41, 60, 84, 86, 88]
},    {
      id: 22,
      name: 'Experts on Tap',
      heart: 'Experts play excellent supporting roles, providing technical help and  judgements based on specific training. Respect their value as one resource to  draw on, while recognizing that ultimately as stakeholders we must empower ourselves, relying  on our own experience, values, and commitments to deliberate and make  decisions on the issues that affect us.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3517/experts_conferring_medium.jpg',
      category_id: 4,
      related_pattern_ids: [40, 41, 58, 71, 72, 88]
},    {
      id: 23,
      name: 'Expressive Arts',
      heart: 'Linear discussion only takes us so far. For a more intuitive, holistic experience put on skits, write songs together, do art, listen to poetry, experiment with movement. The arts can move and teach us, inspire and engage, bringing a group to places we would never otherwise reach.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2956/group_enactment_medium.jpg',
      category_id: 1,
      related_pattern_ids: [17, 29, 34, 49, 55, 32, 76]
},    {
      id: 24,
      name: 'Feedback',
      heart: 'Feedback is offering and receiving information in various forms that enables adaptation and learning, both for individuals and the group as a whole. Feedback lets us know what\'s working and what\'s not, helping us stay on track for achieving our goals.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3417/applause_medium.jpg',
      category_id: 4,
      related_pattern_ids: [2, 25, 45, 47, 48, 34]
},    {
      id: 25,
      name: 'Follow the Energy',
      heart: 'What does the group really want in this moment? Let your observation of cues and \"vibes\" guide your response and steering of topics and process. Paying attention to where the life is, you help it flower.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2456/harness_power_medium.jpg',
      category_id: 3,
      related_pattern_ids: [5, 21, 24, 39, 84, 60, 4]
},    {
      id: 26,
      name: 'Fractal',
      heart: 'Phenomena tend to repeat at a variety of scales. For example, a team dynamic manifests in the whole organization, or an issue arising during a planning session shows up at other times, too. Astute group members observe patterns at one level or time, and use these insights to make changes at another.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3837/335549647_9102f46f15_o_medium.jpg',
      category_id: 7,
      related_pattern_ids: [29, 35, 43, 68, 77, 88]
},    {
      id: 27,
      name: 'Gaia',
      heart: 'The presence of nature in group activities.through natural settings, altars, decorations, and more.provides grounding, beauty and inspiration. Nature gives perspective, letting us know we are one small part of a very large whole, always connected.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3507/boardroom-forest_medium.jpg',
      category_id: 0,
      related_pattern_ids: [0, 49, 57, 64, 73, 52, 75]
},    {
      id: 28,
      name: 'Generate Possibilities',
      heart: 'Freedom and stimulation help creativity blossom. Climb out of the box! Shake things up with brainstorming, play, improvisation, art, and unusual questions. What is possible now? Invite an abundant flow.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4522/DSCN0379_medium.JPG',
      category_id: 1,
      related_pattern_ids: [18, 41, 55, 77, 49, 87, 56]
},    {
      id: 29,
      name: 'Go Deeper',
      heart: 'Recognize and attend to what calls out for more intensive exploration. Take the time to unpack comments, drill down into issues, peel back the layers, delve further into underlying dynamics or feelings.in search of the crux of what matters most.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2186/path_to_enlightenment_medium.jpg',
      category_id: 4,
      related_pattern_ids: [13, 36, 41, 43, 45, 68, 77]
},    {
      id: 30,
      name: 'Go Meta',
      heart: 'Sometimes we benefit from changing to a wider lens of analysis:  from tactics to strategy, this year.s planning to a ten-year horizon, or from content to process reflection. If the current level of focus seems inadequate, consider shifting outward. ',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3677/fisheye-group_medium.jpg',
      category_id: 7,
      related_pattern_ids: [1, 26, 35, 62, 68, 87, 4]
},    {
      id: 31,
      name: 'Good Faith Assumptions',
      heart: 'Assuming others\' good intent increases trust and effectiveness. Instead of interpreting \"negative\" actions as attempts at manipulation, insult, or power-play, we choose to believe people are doing the best they can and look for underlying values or needs in common. Searching for a better story, we find or create one.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3597/lap_sit_-_5565503335_75fe6a44e_o_medium.jpg',
      category_id: 8,
      related_pattern_ids: [2, 12, 53, 70, 78, 89, 79]
},    {
      id: 32,
      name: 'Group Culture',
      heart: 'Groups tend to develop their own culture over time, based on knowledge, beliefs, practices and behaviours their members hold in common. Awareness of shared culture builds trust, cohesion, and a sense of safety among the members, thus furthering collaboration.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3492/Red_Hat_medium.jpg',
      category_id: 0,
      related_pattern_ids: [6, 7, 35, 66, 79, 76, 85]
},    {
      id: 33,
      name: 'Guerrilla Facilitation',
      heart: 'Guerilla Facilitation arises in gatherings with no formal leadership structures or when designated facilitators are inadequate or floundering. Any participant might sense how to advance a group\'s work by stepping up and constructively intervening in the moment.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3357/protest_in_front_of_building_medium.jpg',
      category_id: 6,
      related_pattern_ids: [13, 25, 39, 61, 72, 78, 84]
},    {
      id: 34,
      name: 'Harvesting',
      heart: 'When the process is complete, the harvest is what you hold in your hands. Collect and disseminate what has been said, done, debated, decided, left undecided, or agreed upon as next steps. Record the collective memory of the event.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4117/harvest_greens_5706779733_fb08abda18_b_medium.jpg',
      category_id: 4,
      related_pattern_ids: [18, 47, 49, 16, 85, 40, 63]
},    {
      id: 35,
      name: 'History and Context',
      heart: 'History and Context hugely influence how the rest of the patterns are invoked. Pay attention to why things are the way they are and what the people coming expect. Tune in to discern when to respect the existing culture vs. when it benefits to stretch toward something new.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2226/context_medium.jpg',
      category_id: 0,
      related_pattern_ids: [1, 32, 51, 54, 59, 76, 87]
},    {
      id: 36,
      name: 'Holding Space',
      heart: 'Be fully present, aware of what\'s happening in the whole gathering right now.physically, energetically, emotionally, and intellectually. Open and hold the psychological and spiritual space to provide a steady centre and container. Calmly maintain trust, safety, and focus.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3142/Hand-holding-a-soap-bubble_medium.jpg',
      category_id: 6,
      related_pattern_ids: [3, 20, 54, 61, 4, 60, 19]
},    {
      id: 37,
      name: 'Honour Each Person',
      heart: 'Respect each person\'s essential human dignity. View others\' unique beliefs, approaches and concerns as a resource for group wisdom. Tolerate and even embrace idiosyncrasies, knowing that each person brings their gifts to the whole more fully when affirmed and appreciated. ',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2506/namaste_india_medium.jpg',
      category_id: 8,
      related_pattern_ids: [2, 31, 45, 48, 72, 79, 35]
},    {
      id: 38,
      name: 'Hosting',
      heart: 'Help the session feel like home. Making a place and arrangements comfortable for everyone supports accomplishment of the group\'s work. Attend to the well-being of each person and the whole.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3297/mc_medium.jpg',
      category_id: 8,
      related_pattern_ids: [0, 6, 37, 54, 59, 32, 64]
},    {
      id: 39,
      name: 'Improvise',
      heart: 'For all our careful planning, sometimes circumstances call upon us to wing it. Ad lib. Extemporize. Spontaneously invent a new approach. Making it up as we go along may lead to unexpectedly desirable outcomes. Be open, and ready!',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3717/pile_of_bikes_medium.jpg',
      category_id: 1,
      related_pattern_ids: [17, 44, 25, 60, 67, 13, 1]
},    {
      id: 40,
      name: 'Inform the Group Mind',
      heart: 'We gather facts, feelings, and perspectives to reveal and deepen the group\'s awareness of itself and its world. The most helpful information comes from diverse sources and is accurate, relevant, accessible, and compelling.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2316/group-teaching-africa_medium.jpg',
      category_id: 4,
      related_pattern_ids: [22, 24, 34, 41, 47, 16, 88]
},    {
      id: 41,
      name: 'Inquiry',
      heart: 'Choose to cultivate a curious attitude. Great questions frame and provoke, opening us to new pathways. Many successful methods have questions at their core, such as: \"What\'s at the heart of the matter?\" and \"If you were czar, what would you do?\" So what\'s the most powerful question we could ask right now?',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3227/alignment-group_medium.jpg',
      category_id: 4,
      related_pattern_ids: [44, 25, 29, 40, 14, 76, 28]
},    {
      id: 42,
      name: 'Invitation',
      heart: 'Bring people together by expressing a clear call toward shared purpose, tuned to getting the right people into the room with shared intent. Let people know why this is important and what to expect, while requesting the honour of their presence.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4602/invitation2_medium.jpg',
      category_id: 5,
      related_pattern_ids: [3, 12, 35, 62, 88, 70, 79]
},    {
      id: 43,
      name: 'Iteration',
      heart: 'Try it a second time, even a third. Outcomes of one round of activity or conversation inform the next, deepening, expanding, and generating new understandings and possibilities. For more powerful effect, repeat a process multiple times in the moment, or revisit at a later time.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2856/DSCF1851_medium.JPG',
      category_id: 3,
      related_pattern_ids: [21, 24, 29, 41, 63, 81, 18]
},    {
      id: 44,
      name: 'Letting Go',
      heart: 'Release preconceived notions, your ego and your fears, to be fully open without attachment to outcome. As a clear channel, you allow whatever needs to come through in order to be of service to yourself, your group, and the world.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2606/dandelion_medium.jpg',
      category_id: 2,
      related_pattern_ids: [27, 53, 64, 73, 75, 84, 69]
},    {
      id: 45,
      name: 'Listening',
      heart: 'Listen from genuine curiosity, welcoming the expression of thoughts, opinions, and especially feelings. When we listen with our whole selves to more than the words, people feel heard and their energy moves into new channels, naturally weaving connection.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2981/intent_listening_medium.jpg',
      category_id: 6,
      related_pattern_ids: [37, 41, 48, 53, 60, 89, 71]
},    {
      id: 46,
      name: 'Magic',
      heart: 'At certain moments, something beyond the group emerges, accompanied by a sense of awe . . . and resulting in a unanimous feeling of astonished accomplishment. Conditions inviting Magic include shared passion, urgency, openness, energy and trust.yet the quality is always mysterious, never guaranteed.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4082/butterfly_nebula_3903384725_aa3019b5bf_o_2_medium.jpg',
      category_id: 2,
      related_pattern_ids: [21, 39, 60, 62, 75, 88, 44]
},    {
      id: 47,
      name: 'Mapping and Measurement',
      heart: 'Show the past, chart collated data, sketch what lies ahead. Skilful use of record-keeping, timelines, graphs, murals, videos, etc. directs our attention, helps us make sense of our experience, reinforces collective memory, and enables us to share group outcomes with people who weren\'t there.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/1256/nancy-white-vis-rec_medium.jpg',
      category_id: 4,
      related_pattern_ids: [22, 34, 40, 49, 59, 63, 16]
},    {
      id: 48,
      name: 'Mirroring',
      heart: 'Empathically reflect back the essence of what someone has said so the speaker feels heard, genuinely acknowledged and appreciated. Honouring people.s gifts can heal individuals and relationships, unblock stuck places, and get energy flowing again.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4222/Karen-Emily-Mirroring_medium.jpg',
      category_id: 6,
      related_pattern_ids: [31, 45, 53, 16, 89]
},    {
      id: 49,
      name: 'Mode Choice',
      heart: 'Rather than default to general discussion, consider what mode of interaction.visual, auditory or kinaesthetic, formal or informal, a dialogue circle or a roleplay.is the best fit to support the group in reaching its intention. Strategically shifting formats energizes participants, accesses different ways of knowing, and advances the work.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3031/colorful_tiles_L__medium.jpg',
      category_id: 1,
      related_pattern_ids: [23, 55, 71, 77, 87, 32, 17]
},    {
      id: 50,
      name: 'Moving toward Alignment',
      heart: 'To act jointly, we journey from disparate places to a coherent, collective sense of what is real, what we desire, and what we will do to accomplish it. Group alignment emerges through conversations that generate shared stories, understandings, and decisions.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4162/rowers-martin-2_medium.jpg',
      category_id: 4,
      related_pattern_ids: [12, 18, 44, 70, 16, 81, 11]
},    {
      id: 51,
      name: 'Naming',
      heart: 'Call it out, stating directly what is perceived. Naming functions to birth things not yet recognized by the group, sometimes things that are taboo. Akin to an alchemical process, to name can be to transform, and brings change in its wake.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3442/pointing-the-finger_medium.jpg',
      category_id: 4,
      related_pattern_ids: [13, 45, 53, 58, 67, 83]
},    {
      id: 52,
      name: 'Nooks in Space and Time',
      heart: 'Incubate creativity and nurture relationships by encouraging unstructured time and semi-private space. Insight arises fruitfully during times of open-ended conversation or in solo musing at the edges of a group. Can be designed ahead, or may arise in the moment.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3287/people_in_circle_of_chairs_medium.jpg',
      category_id: 0,
      related_pattern_ids: [29, 20, 40, 77, 86, 0]
},    {
      id: 53,
      name: 'Not about You',
      heart: 'Don.t take things personally. Separate what is said or suggested from the person who said it. Leave the baggage of interpersonal relationships and disagreements at the door to consider ideas on their own merits. Work on the same side, together against the problem or challenge.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3697/buried-in-flipcharts_medium.jpg',
      category_id: 6,
      related_pattern_ids: [12, 44, 31, 45, 79, 89]
},    {
      id: 54,
      name: 'Opening and Welcome',
      heart: 'The beginning sets the tone. Start intentionally, in a manner that invites group members to connect with one another, enter their voice into the circle, and participate as their authentic selves. Attend to building enthusiasm, focus, and commitment for the work to come.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4177/Opening___Welcome_sa_3E0B7C_medium.JPG',
      category_id: 3,
      related_pattern_ids: [0, 32, 38, 62, 76, 35, 70]
},    {
      id: 55,
      name: 'Playfulness',
      heart: 'Invite light-hearted and high-spirited interaction to exercise mind, senses, imagination and body, to engender creativity, and deepen relationships. Playfulness may be evoked through structured but fun ways to engage relevant topics, or restorative breaks that allow laughter free reign, or may simply show up as humour.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3642/mp3_smile_medium.jpg',
      category_id: 1,
      related_pattern_ids: [17, 23, 25, 39, 49, 64]
},    {
      id: 56,
      name: 'Power of Constraints',
      heart: 'Embrace limitations and boundaries as a source of inspiration. Appreciating the obstacles helps you see more fully how to overcome or adapt to them. Accepting constraints, they can morph into useful forms that open up new possibilities, spurring creativity.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3862/bonsai_5524991164_99ffcc6afb_b_medium.jpg',
      category_id: 1,
      related_pattern_ids: [1, 44, 28, 39, 41, 78, 87]
},    {
      id: 57,
      name: 'Power of Place',
      heart: 'The location, setting, and beauty of the site for an event have a major impact on the group\'s energy, attentiveness, and ability to connect. Do your best to choose a place that is the right fit and expression for your intention.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4167/Power_of_Place_saradent.ca_medium.jpg',
      category_id: 0,
      related_pattern_ids: [0, 27, 32, 35, 38, 62, 52]
},    {
      id: 58,
      name: 'Power Shift',
      heart: 'Critical awareness and transparency around existing power differences can, if held well, allow the group to adapt authority structures to best reflect their values or serve their aims. Sharing power isn\'t always easy, but the rewards for groups who do so can be profound.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2231/mandela-dalai-lama_medium.jpg',
      category_id: 8,
      related_pattern_ids: [9, 51, 71, 72, 83, 86, 8]
},    {
      id: 59,
      name: 'Preparedness',
      heart: 'Anticipate what might happen and be ready for it. Do this both before the event, and in your ongoing alert attention. Think through how the agenda will unfold, and do what you can to ensure the right people and resources are present.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2076/Ballplayer_Ready_medium.jpg',
      category_id: 3,
      related_pattern_ids: [22, 35, 38, 62, 81]
},    {
      id: 60,
      name: 'Presence',
      heart: 'Bring your full being to this very moment. Offering total attention, and deep listening, you are wholly open and connected with the here and now. From this grounded place love and service flow.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4252/3022290830_7856d7d24e_o_medium.jpg',
      category_id: 2,
      related_pattern_ids: [44, 25, 36, 45, 54, 75, 69]
},    {
      id: 61,
      name: 'Priority Focus',
      heart: 'Guide the group\'s energies, pace, and trajectory appropriately to achieve the stated intention and purpose. Help the group set and stick to priorities, recognizing that what\'s most important to the group sometimes shifts.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3262/temporary_flipchart_medium.jpg',
      category_id: 5,
      related_pattern_ids: [3, 36, 50, 62, 70, 81, 4]
},    {
      id: 62,
      name: 'Purpose',
      heart: 'Purpose is the destination we choose from a sea of possibilities. Shared purpose calls us together and focuses us, evolving as understanding deepens. It gives impetus and energy to our work.when we\'re connected with genuine purpose, energy flows and things happen.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3747/holding_seedling_-_4612232633_72c91a1615_o_medium.jpg',
      category_id: 5,
      related_pattern_ids: [12, 36, 61, 70, 68, 11, 75]
},    {
      id: 63,
      name: 'Reflection-Action Cycle',
      heart: 'Consider. Enact. Debrief. Experiment further. Effective processes that move groups forward often involve cycles of reflection, followed by action, leading to additional reflection, and so on. Alternating in this manner fosters engagement and integration, deepens experiential learning, and promotes adaptive problem-solving.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2821/tai-chi-surfers_medium.jpg',
      category_id: 3,
      related_pattern_ids: [24, 41, 43, 47, 14, 16, 81]
},    {
      id: 64,
      name: 'Rest',
      heart: 'Create unscheduled times for rest, reflection, integration, and nurturing important social connections. Building sufficient \"down time\" into group process yields better overall results, as participants return to group sessions renewed and often with new insights and ideas.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/1976/At_Rest_medium.jpg',
      category_id: 3,
      related_pattern_ids: [6, 25, 27, 38, 52, 63, 73]
},    {
      id: 65,
      name: 'Right Size Bite',
      heart: 'Break tasks, processes, and content to be absorbed into chunks that are an appropriate match for the time and people you have. Tackle complex topics and larger goals piece by piece.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3367/toucan_bite_medium.jpg',
      category_id: 3,
      related_pattern_ids: [26, 56, 61, 68, 77, 59, 81]
},    {
      id: 66,
      name: 'Ritual',
      heart: 'Ceremony is primal; it grounds, connects, and deeply nourishes group spirit. Use it to mark opening, transition, cycles, milestones, or closing. Ritual is also the formal or habitual repetition of intentional practices that have proven their value.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4507/4778126944_1ab0e021f5_b_medium.jpg',
      category_id: 3,
      related_pattern_ids: [6, 7, 10, 27, 54, 75, 49]
},    {
      id: 67,
      name: 'Seasoned Timing',
      heart: 'When is the right time to propose an idea, switch processes, end discussion, challenge someone to go deeper, or bring in an outside expert or facilitator? Sense the timing of things to swim with the flow, instead of against it. Be patient and alert for ripeness. When the time is right, act.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3497/sundial_with_shadow_medium.jpg',
      category_id: 3,
      related_pattern_ids: [18, 24, 25, 36, 61, 81, 4]
},    {
      id: 68,
      name: 'Seeing the Forest, Seeing the Trees',
      heart: 'Shepherding a group discussion includes discerning when the group needs a wider view vs. when to sink down into the details. Zoom out to see vision, patterns, and overall trends; zoom in for examples, specific data, and other particulars.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4242/tall_trees_medium.jpg',
      category_id: 7,
      related_pattern_ids: [26, 29, 30, 77, 87, 18, 65]
},    {
      id: 69,
      name: 'Self-Awareness',
      heart: 'The more you know who you and your group really are, the more effectively you can engage, make choices that are the right fit, and achieve your goals. Discover your values, feelings, dreams, needs, biases, and more.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2826/Girl_Reflection_medium.jpg',
      category_id: 6,
      related_pattern_ids: [24, 35, 48, 53, 60, 63, 83]
},    {
      id: 70,
      name: 'Setting Intention',
      heart: 'Envision and name what will be done to reach toward or achieve the purpose of the group. Setting Intention reminds us of our responsibilities, guiding us to actions that fulfill the reason for which a gathering was called.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2151/intent-mountaineers_medium.jpg',
      category_id: 5,
      related_pattern_ids: [11, 36, 42, 54, 61, 62, 66]
},    {
      id: 71,
      name: 'Shared Airtime',
      heart: 'Everyone deserves to be heard, and everyone has a piece of the truth. Find ways to invite sharing from all, not just the loudest, most senior or most articulate. Actively draw out the wisdom of quieter or hesitant participants.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3202/Meeting_nieuwe_leden_medium.jpg',
      category_id: 8,
      related_pattern_ids: [5, 9, 36, 37, 45, 77, 86]
},    {
      id: 72,
      name: 'Shared Leadership and Roles',
      heart: 'Rotate facilitators. Trade off note-taking. Let a voice at the margin take centre stage. Sharing responsibility increases participation and investment, taps the gifts of all group members, and leads to better results. Nurture equity and empowerment by sharing power, skills, and collective care for the whole.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2411/geese_in_dc_medium.jpg',
      category_id: 6,
      related_pattern_ids: [2, 22, 49, 58, 62, 77, 88]
},    {
      id: 73,
      name: 'Silence',
      heart: 'The rests between notes make the music. Take a quiet moment to tune into yourself or the group. Invite Silence to slow the process, make space for questions, transition, or simply deepen.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2281/fence_medium.jpg',
      category_id: 2,
      related_pattern_ids: [44, 29, 45, 64, 52, 75]
},    {
      id: 74,
      name: 'Simplify',
      heart: 'A simple process allows you to stay focused on your purpose. A clear understanding of your purpose allows you to do what is needed, no more, no less. Include only the details that are significant, so participants will understand what is and is not important.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/906/Ens__medium.jpg',
      category_id: 6,
      related_pattern_ids: [9, 44, 59, 60, 62, 73, 16]
},    {
      id: 75,
      name: 'Spirit',
      heart: 'To work with Spirit is to invite the deeper forces of the universe to be with us as co-creators. Bringing in this wider perspective keeps us in touch with what\'s most important and provides wisdom, inspiration, and support.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4487/3719230543_78241ac921_b_medium.jpg',
      category_id: 2,
      related_pattern_ids: [46, 66, 73, 21, 27, 60, 44]
},    {
      id: 76,
      name: 'Story',
      heart: 'Stories, metaphors, and myths convey complex ideas, context, meaning and nuance that simple data cannot. By telling personal stories we build trust and connection, encourage imagination, and express the essence of who we are. By telling cultural stories we connect ourselves to others. experience and interact with whole systems.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3387/men_on_bench_with_bicycle_medium.jpg',
      category_id: 4,
      related_pattern_ids: [32, 40, 49, 54, 71, 23, 90]
},    {
      id: 77,
      name: 'Subgroup and Whole Group',
      heart: 'Small subgroups are ideal for involving all participants, accomplishing specific tasks, and creating a safer space for sharing. Convening in the whole group provides context, meaning and convergence at critical junctures. Strategically shift between the two to take advantage of their complementary natures. ',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3972/world-cafe-group_medium.jpg',
      category_id: 3,
      related_pattern_ids: [12, 49, 68, 71, 52, 85]
},    {
      id: 78,
      name: 'Taking Responsibility',
      heart: 'Taking Responsibility keeps a group connected with its own power, both collectively and individually.  Regardless of who did what, when, let us ask, \"What can we do here and now?\"  And, if you see something that needs doing, step up!',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2886/STH71613_medium.JPG',
      category_id: 6,
      related_pattern_ids: [44, 31, 33, 20, 70, 11, 72]
},    {
      id: 79,
      name: 'Tend Relationships',
      heart: 'We take care of each other to reach the goals we are striving for.to get there in one piece, together. Balancing a focus on task and product with nurturing relations between people sustains organizations and movements for the long haul.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2626/karen_anneSmiling_medium.jpg',
      category_id: 8,
      related_pattern_ids: [2, 6, 37, 45, 48, 89, 31]
},    {
      id: 80,
      name: 'Time Shift',
      heart: 'Invite people to consider events and possibilities from the vantage point of either the past or the future, in order to change assumptions about what is possible in the present.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3957/grave_4602825092_b673463bcd_o_medium.jpg',
      category_id: 7,
      related_pattern_ids: [35, 68, 76, 87, 40, 23]
},    {
      id: 81,
      name: 'Trajectory',
      heart: 'Group work is a collective journey. How long will it take, and what will be the shape of the path? Consider what happens before, and after. Structure agendas in light of anticipated stages, choosing activities that align with each phase. Complete the arc to arrive at your desired destination.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3927/archers_-_4876043702_52b80f12c3_o_medium.jpg',
      category_id: 3,
      related_pattern_ids: [5, 18, 43, 62, 63, 65, 68]
},    {
      id: 82,
      name: 'Translation',
      heart: 'Translation forms a bridge of understanding from one person or group to another. Overcome barriers of difference in social standing, culture, language, life experience, or communication style by using neutral wording, metaphor, story, or otherwise converting something into terms others can more easily grasp.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3932/sign_5882838988_cea95f655d_o_medium.jpg',
      category_id: 7,
      related_pattern_ids: [31, 37, 40, 45, 48, 86, 87]
},    {
      id: 83,
      name: 'Transparency',
      heart: 'Be open about what\'s real:  feelings, experiences, how decisions get made, finances, and more. Transparency arises from a belief that the free flow of information and taking action in direct and honest ways best serves group needs. Handled well, openness nurtures trust, collaboration, and authentic community.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3432/forest-window_medium.jpg',
      category_id: 8,
      related_pattern_ids: [40, 51, 58, 72, 78, 69, 13]
},    {
      id: 84,
      name: 'Trust the Wisdom of the Group',
      heart: 'When the path is uncertain, seek intelligence, intuition, and direction from the collective. No matter the problem, with patience and good listening a group usually generates the needed solution, options, or route forward.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3612/indoor_circle_at_VBC_-_5565508093_2618553905_o_medium.jpg',
      category_id: 2,
      related_pattern_ids: [21, 44, 25, 41, 60, 88]
},    {
      id: 85,
      name: 'Unity and Diversity',
      heart: 'Hold simultaneous awareness of both what is shared in common and what is unique. Sometimes it is more important to honour the distinctions and hear the differences; other times it is crucial to focus on similarities and common territory. Both are needed.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4562/4381277644_13704af9af_b_medium.jpg',
      category_id: 7,
      related_pattern_ids: [12, 18, 20, 37, 50, 77, 86]
},    {
      id: 86,
      name: 'Value the Margins',
      heart: 'Edges of ecosystems are fertile ground for adaptation. Similarly in group dynamics, growth often comes from generative disturbances at the margins, perhaps from participants less invested in the status quo. Welcome and embrace people and ideas that may at first seem alien.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3011/faerie-guy_medium.jpg',
      category_id: 7,
      related_pattern_ids: [20, 37, 45, 82, 8, 88, 85]
},    {
      id: 87,
      name: 'Viewpoint Shift',
      heart: 'Step from your usual perspective into another, in order to better understand someone, shift energy, reframe meanings, open up new ideas, or simply see a situation with new eyes.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/2031/Circle_Heads_medium.jpg',
      category_id: 7,
      related_pattern_ids: [23, 30, 20, 76, 86, 89, 80]
},    {
      id: 88,
      name: 'Whole System in the Room',
      heart: 'A critical mass of diverse stakeholders working together helps the whole system adapt and learn more effectively. Spark transformative change by gathering a cross-section of the organization or community to coordinate visioning, innovate novel solutions, make more informed choices and motivate quick implementation.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3977/large_white_room_88836657_c8d622643f_o_medium.jpg',
      category_id: 0,
      related_pattern_ids: [12, 35, 40, 42, 59, 77, 87]
},    {
      id: 89,
      name: 'Witness with Compassion',
      heart: 'Grounded in your heart, offer gentle observations free of judgement. With kindness and presence, place attention on what you notice happening, rather than your reaction to it.',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/4452/copy_1931998999_58f95f829d_o_2_medium.jpg',
      category_id: 6,
      related_pattern_ids: [45, 48, 53, 60, 76, 19, 36]
},    {
      id: 90,
      name: 'Yes, and',
      heart: 'Build on what someone just said to offer encouragement and carry it further. Affirm their ideas, then extend them to a deeper understanding or add a new twist. Create momentum by saying \"Yes, and . . .\"',
      picture: 'http://s3.amazonaws.com/grouppatterns.wagn.org/card_images/3727/pyramid_crop_medium.jpg',
      category_id: 4,
      related_pattern_ids: [50, 29, 16, 25, 45, 14]
}
  ]
});

// Navigation
var navigation = {
  
  // an array of idempotent nav state functions
  history: [ ],

  // add a new nav state to the stack and apply it
  applyState: function( state ) {
    navigation.history.push( state );
    state();
  },

  // pop current state off the stack and apply previous
  back: function() {
    var currentState = navigation.history.pop();
    navigation.history[ navigation.history.length - 1 ]();
  }
};

Ext.application({
  name: 'Pattern Language of Group Process',

  launch: function() {

    // GLOBAL
    // Show a particular pattern
    showPattern = function ( pattern ) {

      if ( typeof pattern == "number" ) {
        pattern = patternStore.findRecord( 'id', pattern );
      };

      navigation.applyState( function() {

        patternDetailToolbar.setTitle( pattern.get( 'name' ) );

        patternDetailTemplate
          .overwrite( patternDetailContainer, pattern.data );

        cardStack.setActiveItem( 3 );

      });
    };
 
    // Category List
    var categoryList = new Ext.dataview.List({
      itemTpl: categoryTemplate,
      store: categoryStore,
      listeners: {
        itemtap:
          function( list, index, item, evt ) {
            var category = categoryStore.getAt( index );

            navigation.applyState( function() {
              patternListToolbar.setTitle( 'Patterns of ' + category.get( 'name' ) );

              patternStore.clearFilter();
              patternStore.filter( "category_id", category.get( 'id' ) );

              cardStack.setActiveItem( 2 );
            });
          }
      },
      flex: 1
    });

    // Pattern List
    var patternList = new Ext.dataview.List({
      itemTpl: patternTemplate,
      store: patternStore,
      listeners: {
        itemtap:
          function( list, index, item, evt ) {
            var pattern = patternStore.getAt( index );
            showPattern( pattern );
          }
      },
      flex: 1
    });

    // Home Toolbar
    var homeToolbar = new Ext.Toolbar({
      dock: 'top', 
      title: 'Pattern Language of Group Process'  
    });

    // Home Panel
    var homeCard = new Ext.Panel({
      layout: 'vbox',
      items: [
        homeToolbar,
        {
          xtype: 'container', 
          layout: {
            type: 'vbox',
            pack: 'center'
          },
          items: [
            {
              xtype: 'button',
              text: 'Categories', 
              handler: function() {
                navigation.applyState( function() {
                  cardStack.setActiveItem( 1 );
                });
              }
            },
            {
              xtype: 'button', 
              text: 'Patterns',
              handler: function() {
                navigation.applyState( function() {
                  patternStore.clearFilter();
                  patternListToolbar.setTitle( 'Patterns' );
                  cardStack.setActiveItem( 2 );
                });                
              }
            }
          ]
        }
      ]
    });

    // Category Toolbar
    var categoryToolbar = new Ext.Toolbar({
      dock: 'top',
      title: 'Categories',
      items: [
        {
          text: 'Back',
          ui: 'back',
          handler: function() {
            navigation.back();
          }
        }
      ]
    });

    // Category Panel
    var categoryCard = new Ext.Panel({
      layout: 'vbox',
      items: [
        categoryToolbar,
        categoryList
      ]
    });

    // Pattern List Toolbar
    var patternListToolbar = new Ext.Toolbar({
      dock: 'top', 
      title: 'Patterns',
      items: [
        {
          text: 'Back',
          ui: 'back',
          handler: function() {
            navigation.back();
          }
        }
      ]
    });

    // Pattern List Panel
    var patternListCard = new Ext.Panel({
      layout: 'vbox', 
      items: [
        patternListToolbar,
        patternList
      ]      
    });

    // Pattern Detail Toolbar
    var patternDetailToolbar = new Ext.Toolbar({
      dock: 'top', 
      title: 'Pattern', 
      items: [
        {
          text: 'Back', 
          ui: 'back',
          handler: function() {
            navigation.back();
          }  
        }
      ]  
    });

    var patternDetail = new Ext.Panel({
      layout: 'vbox',
      flex: 1,
      contentEl: 'patternDetailContainer'
    });

    // Pattern Detail Panel
    var patternDetailCard = new Ext.Panel({
      layout: 'vbox', 
      items: [
        patternDetailToolbar,
        patternDetail
      ]
    });

    // Card Stack
    var cardStack = Ext.create('Ext.Panel', {
      fullscreen: true,
      activeItem: 0,
      layout: {
        type: 'card', 
        animation: {
          type: 'fade'
        }
      },
      items: [
        homeCard,
        categoryCard,
        patternListCard,
        patternDetailCard
      ]
    });

    // start with showing Home panel
    navigation.applyState( function() {
      cardStack.setActiveItem( 0 );
    })

  }
});

