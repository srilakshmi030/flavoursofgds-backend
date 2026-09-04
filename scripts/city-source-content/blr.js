// Bengaluru chapter content transcribed from Bangalore.pdf (6 spreads).
// This is the editorial source of truth for the content inventory workbook.
// Image status: 'In PDF' = artwork exists in the deck, 'Missing' = app needs it but the deck has none.
module.exports = {
  cityCode: 'blr',
  cityName: 'Bengaluru',
  state: 'Karnataka',
  country: 'India',
  sourceDocument: 'Bangalore.pdf',
  spreads: [
    {
      page: 1,
      screen: 'City Intro',
      section: 'Bengaluru — City Introduction',
      items: [
        {
          id: 'blr-intro',
          name: 'Bengaluru',
          description:
            "Bengaluru is a city best understood in its quieter moments. Beneath its reputation as India's innovation capital lies a landscape of leafy neighbourhoods, shaded avenues, and gardens that have long earned it the title of the Garden City. As morning unfolds, steel tumblers of filter coffee glide across bustling darshini counters before the city settles into its familiar rhythm of work, conversation, and connection. Longstanding neighbourhood institutions thrive alongside contemporary cafés, breweries, and globally inspired restaurants, creating a culinary landscape that feels both rooted and forward-looking. For visitors, these everyday rituals offer one of the most authentic ways to experience a city that is constantly evolving while remaining unmistakably itself.",
          images: [
            {
              role: 'Chapter hero',
              subject: 'Green-and-yellow auto rickshaw loaded with purple bougainvillea on a shaded street',
              file: 'cities/blr/banner.jpg',
              status: 'In PDF',
              notes: 'Overlaid with the purple "B" monogram; crop right side clear for the dashboard title.',
            },
          ],
        },
      ],
    },
    {
      page: 2,
      screen: 'City Dashboard',
      section: 'About EY GDS Bengaluru',
      items: [
        {
          id: 'blr-about',
          name: 'EY GDS Bengaluru',
          description:
            'Cities are remembered as much for their people as for their skylines. Bengaluru is no different. It is a city defined by curiosity, collaboration, and the constant exchange of ideas, where people from different backgrounds come together to build something greater than themselves. Since 2002, EY GDS Bengaluru has reflected that same spirit. What began as one location has grown into one of the largest centres within the EY GDS network, bringing together thousands of professionals connected by purpose, shaped by diversity, and united by a shared commitment to excellence. Yet the true character of this centre is found beyond the work itself. It lives in the conversations between meetings, the moments of encouragement, the friendships that span teams and cultures, and the everyday experiences that transform colleagues into a community. This chapter is a celebration of that spirit — of the people who make EY GDS Bengaluru what it is, and of the connections that continue to shape its story.',
          images: [
            {
              role: 'About section image',
              subject: 'Four Yakshagana performers in full costume and headdress against a deep red backdrop',
              file: 'cities/blr/about/eygds-bengaluru.jpg',
              status: 'In PDF',
              notes: 'EY yellow/blue/green frame device sits over the image; faded Yakshagana watermark on the right.',
            },
          ],
        },
      ],
    },
    {
      page: 3,
      screen: 'Street Food',
      section: 'Street Food',
      items: [
        {
          id: 'blr-sf-1',
          name: 'Bele Obbattu',
          pronunciation: '/BELL-eh oh-BAHT-too/',
          description:
            'Soft at the centre and golden at the edges, Bele Obbattu feels like the kind of comfort best discovered at leisure. Brushed with ghee, served warm, and lentil-filled, this flatbread finds its way onto tables during long conversations, evening coffee breaks and unhurried moments in the day.',
          whereToTry: "Holige Mane, Bhaskar's Mane Holige, Basaveshwar Khanavali",
          images: [
            {
              role: 'Item image',
              subject: 'Tall stack of ghee-brushed obbattu on a banana leaf beside brass vessels',
              file: 'cities/blr/street-food/bele-obbattu.jpg',
              status: 'In PDF',
              notes: 'Full-bleed left panel of the spread.',
            },
          ],
        },
        {
          id: 'blr-sf-2',
          name: 'Idly & Vada',
          description:
            "There's something comforting about beginning the day in Bangalore with idly and vada. Pillowy, warm idlis paired with crisp golden vadas arrive at the table quickly, often alongside rushed morning conversations, strong filter coffee and plans for the day ahead. Simple, familiar and deeply satisfying, they've long been part of the city's everyday rhythm.",
          whereToTry: "Brahmin's Coffee Bar, Veena Stores, Tazza Thindi",
          images: [
            {
              role: 'Item image',
              subject: 'Idlis and vadas on a banana leaf with terracotta pots of chutney and sambar',
              file: 'cities/blr/street-food/idly-vada.jpg',
              status: 'In PDF',
              notes: 'Cut-out on white background.',
            },
          ],
        },
        {
          id: 'blr-sf-3',
          name: 'Maddur Vada',
          pronunciation: '/MUD-door VUH-da/',
          description:
            'Crisp at the edges and best enjoyed hot, Maddur Vada is the kind of snack that naturally finds its place between long workdays and evening conversations. Filled with onions and paired with a quick cup of tea during rushed breaks, it is familiar, unfussy and deeply comforting.',
          whereToTry: 'Maddur Vada Day, Brundavan Upachar, Maha',
          qaNote: 'Source PDF truncates the third venue at "Maha" — confirm the full name before publishing.',
          images: [
            {
              role: 'Item image',
              subject: 'Round basket of golden maddur vadas lined with paper, garnished with herbs',
              file: 'cities/blr/street-food/maddur-vada.jpg',
              status: 'In PDF',
              notes: 'Circular crop.',
            },
          ],
        },
        {
          id: 'blr-sf-4',
          name: 'Masala Puri',
          pronunciation: '/muh-SAA-luh POO-ri/',
          description:
            "Crushed puris soaked in hot, peppery gravy, finished with onions, sev and lime. It's the kind of street-side meal people return to after long days, evening errands or conversations that continue well past schedule.",
          whereToTry: "Karnataka Bhel House, Gullu's Chats, Sri Sairam's Chats",
          images: [
            {
              role: 'Item image',
              subject: 'Plate of masala puri topped with chopped onion, tomato, sev and coriander',
              file: 'cities/blr/street-food/masala-puri.jpg',
              status: 'In PDF',
              notes: 'Cut-out on white background.',
            },
          ],
        },
        {
          id: 'blr-sf-5',
          name: 'Masala Dosa',
          description:
            "Crisp at the edges and filled with gently spiced potato, the masala dosa is woven into the city's everyday routines, from rushed breakfasts before work to slow weekend mornings that stretch longer than planned.",
          whereToTry: 'Vidyarthi Bhavan, Bengaluru Cafe, CTR',
          images: [
            {
              role: 'Item image',
              subject: 'Stacked steel plates of folded masala dosas carried by a server in blue',
              file: 'cities/blr/street-food/masala-dosa.jpg',
              status: 'In PDF',
              notes: 'Full-bleed right panel of the spread.',
            },
          ],
        },
      ],
    },
    {
      page: 4,
      screen: 'Landmarks',
      section: 'Culinary Landmarks',
      items: [
        {
          id: 'blr-lm-1',
          name: '13th Floor',
          description:
            "Long associated with Bangalore's after-hours dining culture, the rooftop lounge remains a favourite for late conversations, easy cocktails and dinners that stretch further into the night than intended.",
          highlights: 'Thai Crispy Chicken, Mutton Dhansak, 13th Sin Martini',
          images: [
            {
              role: 'Item image',
              subject: 'Rooftop lounge at dusk with candlelit tables and a purple twilight skyline',
              file: 'cities/blr/landmarks/13th-floor.jpg',
              status: 'In PDF',
              notes: 'Full-bleed left panel of the spread.',
            },
          ],
        },
        {
          id: 'blr-lm-2',
          name: 'Shivaji Military Hotel',
          description:
            "Shivaji Military Hotel has remained part of the city's routine for decades. Known for its Donne mutton biryani served in signature banana-leaf bowls, the restaurant draws loyal regulars, quick lunch crowds and visitors making the trip across the city for a meal that feels unmistakably Bangalore. Rich, peppery and deeply comforting, it's the kind of food that lingers long after the workday ends.",
          highlights: 'Donne mutton biryani',
          qaNote: 'Source PDF heading reads "Shivaji Millitary Hotel" (double L) while the body copy reads "Military" — fix the heading.',
          images: [
            {
              role: 'Item image',
              subject: 'Donne mutton biryani with boiled egg served in a dried-leaf donne bowl',
              file: 'cities/blr/landmarks/shivaji-military-hotel.jpg',
              status: 'In PDF',
              notes: 'Cut-out on white background.',
            },
          ],
        },
        {
          id: 'blr-lm-3',
          name: 'Mavalli Tiffin Room',
          description:
            "Founded in 1924, Mavalli Tiffin Rooms remains one of the city's most enduring breakfast institutions. Mornings here begin with crisp rava idlis, strong filter coffee and tables that fill almost as quickly as they clear. Even after decades of change around it, the restaurant continues to offer the kind of familiarity people return to instinctively.",
          highlights: 'Crisp rava idlis, filter coffee',
          images: [
            {
              role: 'Item image',
              subject: 'Three rava idlis on a white platter with a bowl of coriander chutney',
              file: 'cities/blr/landmarks/mavalli-tiffin-room.jpg',
              status: 'In PDF',
              notes: 'Cut-out on white background.',
            },
          ],
        },
        {
          id: 'blr-lm-4',
          name: 'The Only Place',
          description:
            'For decades, The Only Place has been the kind of spot people return to instinctively for long lunches, easy conversations and meals that feel reliably unchanged in the best way possible. Known for its steaks, burgers and old-school comfort food, the restaurant carries a warmth and ease that has kept regulars coming back across generations.',
          highlights: 'Steaks, burgers, old-school comfort food',
          images: [
            {
              role: 'Item image',
              subject: 'No artwork supplied — text-only entry in the deck',
              file: 'cities/blr/landmarks/the-only-place.jpg',
              status: 'Missing',
              notes: 'App list card and detail screen both need an image. Source or shoot before launch.',
            },
          ],
        },
        {
          id: 'blr-lm-5',
          name: 'Nagarjuna',
          description:
            "Known for its Andhra-style meals served on banana leaves, the restaurant is a long-time favourite for fiery curries, comforting meals and lunches that rarely stay quiet for long. From chilli chicken to biryani and hearty vegetarian meals, the food arrives full of heat, flavour and familiarity. It's the kind of place people recommend without hesitation, especially to anyone visiting the city for the first time.",
          highlights: 'Chilli chicken, biryani, vegetarian meals',
          images: [
            {
              role: 'Item image',
              subject: 'Andhra banana-leaf meal with curry bowls, poori, rice, podi and pickle',
              file: 'cities/blr/landmarks/nagarjuna.jpg',
              status: 'In PDF',
              notes: 'Full-bleed right panel of the spread.',
            },
          ],
        },
      ],
    },
    {
      page: 5,
      screen: 'Fine Dine',
      section: 'Fine Dine',
      items: [
        {
          id: 'blr-fd-1',
          name: 'Rim Nam',
          description:
            "Soft lighting, still water and slow evenings set the tone for a dining experience that encourages lingering a little longer than planned. Thai flavours unfold through dishes like Tom Kha and Chef Tam's ingredient-led creations, bringing warmth and refinement to the table. It's the kind of place that turns dinner into a pause from the rest of the day.",
          highlights: "Tom Kha, Chef Tam's ingredient-led creations",
          images: [
            {
              role: 'Item image',
              subject: 'Lantern-lit wooden pavilion over still water, framed by dark foliage',
              file: 'cities/blr/fine-dining/rim-nam.jpg',
              status: 'In PDF',
              notes: 'Sits on the dark full-bleed spread background.',
            },
          ],
        },
        {
          id: 'blr-fd-2',
          name: 'Loya',
          description:
            'Inspired by the culinary traditions of Northern India, the restaurant brings together slow-cooked dals, smoky kebabs and deeply layered flavours in a setting that feels warm, intimate and quietly celebratory. Dishes like the Dumtur and Gosht Rishta Kebab reflect a style of cooking rooted in patience and detail. It\u2019s the kind of place that naturally turns dinner into a longer evening.',
          highlights: 'Dumtur, Gosht Rishta Kebab',
          images: [
            {
              role: 'Item image',
              subject: 'Copper bowl topped with a pink woven lattice dome over a spiced dish',
              file: 'cities/blr/fine-dining/loya.jpg',
              status: 'In PDF',
              notes: 'Circular top-down crop.',
            },
          ],
        },
        {
          id: 'blr-fd-3',
          name: 'Farmlore',
          description:
            "Tucked away on a farm at the edge of the city, Farmlore offers a dining experience that feels intentionally slower than the rest of Bangalore. The restaurant's ingredient-led approach focuses on seasonal produce, thoughtful storytelling and contemporary techniques that allow each course to unfold gradually. Every meal feels carefully considered, without ever losing its sense of warmth.",
          highlights: 'Ingredient-led seasonal tasting courses',
          images: [
            {
              role: 'Item image',
              subject: 'Fine-dining plate with tomato quenelle, dill and citrus on white ceramic',
              file: 'cities/blr/fine-dining/farmlore.jpg',
              status: 'In PDF',
              notes: 'Cut-out plate on the dark background.',
            },
          ],
        },
        {
          id: 'blr-fd-4',
          name: 'Kebabs & Kurries',
          description:
            "There's a sense of familiarity to Kebabs & Kurries, the kind built through slow cooking, rich aromas and recipes that feel deeply rooted in tradition. From smoky Ajwani Jhinga and Afghani Murgh Tikka to signature Galawti Kebabs, the menu draws from North Indian culinary heritage while keeping the experience refined and understated. For many, it remains one of the city's most dependable destinations for a long, indulgent dinner.",
          highlights: 'Ajwani Jhinga, Afghani Murgh Tikka, Galawti Kebabs',
          images: [
            {
              role: 'Item image',
              subject: 'No artwork supplied — text-only entry in the deck',
              file: 'cities/blr/fine-dining/kebabs-and-kurries.jpg',
              status: 'Missing',
              notes: 'App list card and detail screen both need an image. Source or shoot before launch.',
            },
          ],
        },
        {
          id: 'blr-fd-5',
          name: 'Le Cirque Signature',
          description:
            "Set within The Leela Palace Bengaluru, Le Cirque Signature brings together New York sophistication and classic French-Italian dining with effortless ease. The atmosphere is polished yet unhurried, allowing dishes like hand-cut tagliatelle and delicately prepared Norwegian salmon to take centre stage. For evenings that call for something elegant without feeling overly formal, it remains one of Bangalore's most refined dining destinations.",
          highlights: 'Hand-cut tagliatelle, Norwegian salmon',
          images: [
            {
              role: 'Item image',
              subject: 'Server laying a long polished table set with wine glasses and linen',
              file: 'cities/blr/fine-dining/le-cirque-signature.jpg',
              status: 'In PDF',
              notes: 'Full-bleed right panel of the spread.',
            },
          ],
        },
      ],
    },
    {
      page: 6,
      screen: 'Recipe',
      section: 'Winning Recipe',
      items: [
        {
          id: 'blr-rc-1',
          name: 'Rice Roti, Coorg Pork Fry & Mango Curries',
          contributor: 'Akshitha Kariappa, EY GDS Bangalore',
          servings: 4,
          description:
            'I come from Kodagu (Coorg) in Karnataka, India, a serene hill region of misty mountains, coffee plantations and dense forests. In my family, food is more than nourishment; it carries traditions, celebrations and stories passed through generations.',
          highlights:
            'Ingredients (serves 4) across three components — rice roti, Coorg pork fry, mango curry. Method: make the rice roti, cook the Coorg pork fry, prepare the mango curry, then fold the roti like a taco, fill with pork curry and top with mango curry. Vegetarian option: serve the mango curry alone alongside the roti.',
          images: [
            {
              role: 'Recipe hero image',
              subject: 'Three folded rice rotis filled with Coorg pork fry on a rack, with mango curry and pork bowls on a dark platter',
              file: 'cities/blr/recipes/rice-roti-coorg-pork-fry.jpg',
              status: 'In PDF',
              notes: 'Full-bleed left panel; ingredients and method sit on the dark right panel.',
            },
            {
              role: 'Method video',
              subject: 'No video supplied in the deck',
              file: 'cities/blr/recipes/rice-roti-coorg-pork-fry.mp4',
              status: 'Missing',
              notes: 'Recipe detail screen renders details.videoUrl. MP4 under 10 seconds required.',
            },
          ],
        },
      ],
    },
  ],
};
