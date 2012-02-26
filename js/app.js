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

var categoryTemplate = new Ext.XTemplate( "<div class = 'cat_{id}'>{name}</div>" );

var patternTemplate = new Ext.XTemplate( "<div class = 'cat_{category_id}'>{name}</div>" );

var patternDetailTemplate = new Ext.XTemplate([
  "<img src='{picture}'>",
  "<div id='patternDetailHeart'>",
    "{heart}",
  "</div>",
  "<div id='patternRelatedPatterns'>",
    "Related Patterns: ",
    "<tpl for='related_pattern_ids'>",
      "<div class = 'cat_{[patternStore.findRecord('id', values).get('category_id')]}_left'><a href='#' onclick='showPattern({.})'>{[patternStore.findRecord('id', values).get('name')]}</a></div>",
    "</tpl>",
  "</div>"
]);

var categoryStore = new Ext.data.JsonStore({
  model: 'Category',
  sorters: 'id',

  getGroupString: function( record ) {
      return record.get( 'name' )[ 0 ];
  },

  data: [
    { id: 0,  name: 'Intention' },
    { id: 1,  name: 'Context' },
    { id: 2,  name: 'Relationship' },
    { id: 3,  name: 'Flow' },
    { id: 4,  name: 'Creativity' },
    { id: 5,  name: 'Perspective' },
    { id: 6,  name: 'Modelling' },
    { id: 7,  name: 'Inquiry & Synthesis' },
    { id: 8,  name: 'Faith' }
  ]
});

var patternStore = new Ext.data.JsonStore({
  model: 'Pattern',
  sorters: 'name', 

  data: patternData
});

var categoryPatternStore = new Ext.data.JsonStore({
  model: 'Pattern',
  sorters: 'name', 

  data: patternData
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
  name: 'Group Works',

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

              categoryPatternStore.clearFilter();
              categoryPatternStore.filter( "category_id", category.get( 'id' ) );

              cardStack.setActiveItem( 2 );
            });
          }
      },
      flex: 1
    });

    // Pattern List
    var patternList = new Ext.dataview.List({
      itemTpl: patternTemplate,
      store: categoryPatternStore,
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
      title: 'Group Works'  
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
              text: 'About', 
              handler: function() {
                navigation.applyState( function() {
                  cardStack.setActiveItem( 4 );
                });
              }
            },
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
                  categoryPatternStore.clearFilter();
                  patternListToolbar.setTitle( 'Patterns' );
                  cardStack.setActiveItem( 2 );
                });                
              }
            },
            {
              xtype: 'button',
              text: 'Order', 
              handler: function() {
                window.location.href = 'http://100fires.com/cgi-bin/product_display.cgi?ordernum=800019'; 
              }
            },
            {
              xtype: 'button',
              text: 'Donate', 
              handler: function() {
                window.location.href = 'http://groupworksdeck.org/donate';
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
      scrollable: 'both',
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

    // About Toolbar
    var aboutToolbar = new Ext.Toolbar({
      dock: 'top',
      title: 'About',
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

    // About Panel
    var aboutTextCard = new Ext.Panel({
      layout: 'vbox', 
      flex: 1,
      scrollable: 'vertical',
      styleHtmlContent: true,
      html: "The <b>Group Works</b> card deck is designed to support your process as a group convenor, planner, facilitator, or participant.  The people who developed this deck spent several years pooling our knowledge of the best group events we had ever witnessed.  We looked at meetings, conferences, retreats, town halls, and other sessions that give organizations life, solve a longstanding dilemma, get stuck relationships flowing, result in clear decisions with wide support, and make a lasting difference.  We also looked at routine, well-run meetings that simply bring people together and get lots of stuff done.  We aim here to name the core wisdom of what makes deliberative group work successful.<br><br>Why are we doing this?  Our world is, to a very real extent, based on dialogue.  Every action taken that involves more than one person arises from conversation that generates, coordinates, and reflects those actions.  Those actions have impact.  If our human world is based on conversations, then the work of creating and supporting those conversations is central to shaping a world that works.  Designing and conducting meetings and other group sessions well is vital to determining our common future.  This project grew around a shared understanding that in an urgent way, our survival depends on our ability to work and play well together, and on discovering and creating group processes which are at the same time effective and life-affirming.  Because this is easier said than done, we wanted to deepen and spread the insights, skills, and capacity to make that promise real.<br><br><i>The following core beliefs guide our work:</i>Seeing a world in flux and deep need, we believe the work of facilitators, both formal and informal, can make a significant difference to the quality and outcomes of essential conversations.  Thus we accept a responsibility, as facilitators and participants in group process, to act for the common good.<br><br>We expect convenors of group process to act with full transparency regarding the motives and expected results of the sessions we organize and run.  With honesty and humility, we strive to continuously improve the calibre of our work.<br><br>We choose to assume the best of people.  We believe people flourish when entrusted with the opportunity to authentically self-manage, collaborate, and make decisions collectively, as true respected equals.  Because the most critical issues facing us in the world and in our organizations are complex and interconnected, we need each other to do this.the challenges we face are beyond solving by leaders or experts in isolation.  We believe in sharing power, that we are wiser when we work together.<br><br>We believe that effective group processes are clearly driven by the purpose for which they are called.  We respect participants. life energy by invoking processes that productively use their time, resulting in cooperative sessions that meet a high standard in engagement, achievement and connection.  We draw on experience and knowledge to create elegant designs with great care, yet remain flexible and open to change as the circumstances, will of participants and flow of events may dictate.<br><br>Good process builds strong communities.  Our work is an act of love in service to the world.<br><br>We were inspired by Christopher Alexander and the other co-authors of <i>A Pattern Language: Towns, Buildings, Construction</i>, who in 1977 published a seminal work on how to create built spaces that nourish people.s souls.  They were seekers after wholeness, grace, .the quality that has no name,. which they asserted was both deeply subjective and empirically verifiable.  Their book was beautiful in form, accessible to the layperson, and aimed to democratize their field.  It took the arcane knowledge of how to design the best possible human-scale architecture and crystallized it into 253 principles that have influenced a generation of builders.  Their book was also deeply interconnected, listing which patterns connect to each other and how, long before the advent of the World Wide Web made such thinking commonplace.  Our project aims to apply the same approach to deliberative group process, and takes advantage of tools (such as wikis) that weren.t available in the 1970s.<br><br>There are already plenty of good books and models out there to help people run good meetings, and we do not want to replicate them.  The <b>Group Works</b> cards express shared wisdom underlying successful approaches that is more specific than general values and less specific than tools and techniques.  In order to distinguish whether or not a particular idea was a pattern, we asked ourselves questions like:<ul><li>Does this describe a feature that shows up over and over again in group processes that fulfill the purpose for which they were called?<li>Does it happen across many different methods?<li>Can it take a variety of forms?<li>Does it show up at more than one scale (for example: balancing the emphasis on process and on content happens both within one session at a conference and within the conference as a whole).<li>Does it describe an action that can be consciously undertaken by convenors and/or participants?<li>Does my gut respond to this with a sense of recognition?</ul>Because of space limitations, each card aims only to name the essential What and Why of that particular element.  In order to actually use the patterns, you.ll need to come up with the How.  A lot of Hows are supplied on our website, where you will find a growing pool of information about the patterns represented in this deck.  Some cards have plenty of resources already on the website, while others remain to be fleshed out.  Over fifty people were involved in the creation of this card deck, and we.d be delighted for you to join the circle by helping explain how to apply the patterns.see more on this below.<br><br>The people who put this together engaged in a multi-year, collaborative process alternating between in-person meetings and work online, learning as we went.  We are a cross-section of North Americans from a variety of organizational backgrounds including:  higher education, software development, communal living, corporate finance, youth groups, indigenous tribes, political activism, nonprofit management, government agencies, faith groups, and more.<br><br><i>Note on Spellings:</i>As a mixed group of volunteers located north and south of the US/Canadian border, after some deliberation we chose to go with uniform Canadian spellings.<br><br>For more information please visit <a href='#' onclick='window.location.href = \"http://www.groupworksdeck.org\"; return false;'>www.groupworksdeck.org</a>"
    });

    // About Panel
    var aboutCard = new Ext.Panel({
      layout: 'vbox', 
      items: [
        aboutToolbar,
        aboutTextCard
      ]
    });

    // Order Toolbar
    var orderToolbar = new Ext.Toolbar({
      dock: 'top',
      title: 'Order',
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

    // Order Panel
    var orderTextCard = new Ext.Panel({
      layout: 'vbox', 
      flex: 1,
      scrollable: 'vertical',
      styleHtmlContent: true,
      html: "To order decks go <a href ='http://100fires.com/cgi-bin/product_display.cgi?ordernum=800019'>Here </a>"
    });

    // Order Panel
    var orderCard = new Ext.Panel({
      layout: 'vbox', 
      items: [
        orderToolbar,
        orderTextCard
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
        patternDetailCard,
        aboutCard,
        orderCard,
      ]
    });

    // start with showing Home panel
    navigation.applyState( function() {
      cardStack.setActiveItem( 0 );
    })

  }
});

