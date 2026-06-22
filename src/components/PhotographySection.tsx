"use client";


import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import photo01 from "@/assets/Photography/photo01.png";
import photo5 from "@/assets/Photography/photo5.png";
import photo8 from "@/assets/Photography/photo8.jpg";
import photo12 from "@/assets/Photography/photo12.webp";
import photo0 from "@/assets/Photography/photo0.jpg";
import photo1 from "@/assets/Photography/photo1.jpeg";
import photo2 from "@/assets/Photography/photo2.jpeg";
import photo3 from "@/assets/Photography/photo3.jpeg";
import photo4 from "@/assets/Photography/photo4.png";
import photo7 from "@/assets/Photography/photo7.webp";
import photo9 from "@/assets/Photography/photo9.jpg";
import photo10 from "@/assets/Photography/photo10.jpg";
import photo11 from "@/assets/Photography/photo11.webp";

const PHOTOS = [
  { id: "p01", src: photo01, title: "Somewhere Between", location: "Coorg, Karnataka", year: "2024", desc: "Fog settling over the valley like a held breath. I stood here for forty minutes without moving.", aspect: "wide" },
  { id: "p5", src: photo5, title: "Still Water", location: "Kerala Backwaters", year: "2022", desc: "The surface so still it made everything above it look uncertain.", aspect: "wide" },
  { id: "p8", src: photo8, title: "Forest Floor", location: "Wayanad, Kerala", year: "2022", desc: "The light arrives late here. By the time it does, it has forgotten what it was looking for.", aspect: "wide" },
  { id: "p12", src: photo12, title: "Against the Light", location: "Hampi, Karnataka", year: "2023", desc: "The sun behind him made everything else a silhouette. I kept the frame anyway.", aspect: "tall" },
  { id: "p0", src: photo0, title: "Quiet Corner", location: "Hampi, Karnataka", year: "2023", desc: "A quiet corner untouched by time. Some places feel older than they are.", aspect: "wide" },
  { id: "p7", src: photo7, title: "Open Road", location: "Rajasthan", year: "2023", desc: "The highway at dusk. Nothing behind, everything ahead, neither of which matters.", aspect: "tall" },
  { id: "p1", src: photo1, title: "Concrete Hours", location: "Bengaluru", year: "2023", desc: "The city at 6am belongs to no one. Or everyone. I never figured out which.", aspect: "wide" },
  { id: "p2", src: photo2, title: "Salt & Light", location: "Goa", year: "2024", desc: "Golden hour on the shore. A moment so obvious in its beauty it almost felt cheap to photograph.", aspect: "wide" },
  { id: "p3", src: photo3, title: "Altitude", location: "Himachal Pradesh", year: "2023", desc: "Above the treeline, the silence has texture. You can feel it pressing in.", aspect: "wide" },
  { id: "p4", src: photo4, title: "Neon Rain", location: "Bengaluru", year: "2024", desc: "Monsoon turns every puddle into a different city. One I'd rather live in.", aspect: "wide" },
  { id: "p9", src: photo9, title: "Borrowed Light", location: "Mysuru", year: "2024", desc: "The camera was wrong about the time. I've kept its version of events.", aspect: "wide" },
  { id: "p10", src: photo10, title: "Mirror Lake", location: "Uttarakhand", year: "2023", desc: "Two skies. One of them had clouds. The other had ambition.", aspect: "wide" },
  { id: "p11", src: photo11, title: "The Weight of a Look", location: "Bengaluru", year: "2024", desc: "She looked at the camera like it owed her something. I think it did.", aspect: "tall" }
];


const POEMS = [
  {
    id: "w1",
    title: "Kiss Me to Life",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "Love is a poem that keeps on writing itself, sweeping us along. I could only muster the courage and prudence to write about the one who is worth dying for.",
      "",
      "You're the kind of girl who deserves poetry n not mere cheesy pick up lines. You showed me love was transendental devotion beyond perspectives and of sense perceptions. You are the most reality in this world of colors masking the chaos within.",
      "",
      "All these words written with ease but my romanticized feeling formidably restraints within for it to find expression beyond the poetic words when you and me meet in reality.",
      "",
      "Perchance I might lose my self in trance when i feel your divine scent. I desire you to kiss me back to life, after which the reality of mine will be filled by you beyond my thoughts."
    ]
  },
  {
    id: "w2",
    title: "She Is the Reason for My Smile",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "Let the fire of love you have within cherish your feelings of sweetness and let them prevail so pervasively. Oh, you, the one who has become a part of my soul.",
      "",
      "You have enough madness within you to make me feel excited about you. You're someone I would fall for with closed eyes. Love was too much risk to take for me, but you showed me that risking for you would let me discover the rarest heavenly beauty.",
      "",
      "I'm but a guy on a walk with you under the moonlight, telling the truth, which is what we call poetry. You never fear to walk away late at night, but all your fear is that what if I don't follow the steps you tread.",
      "",
      "You know for sure that the heart of yours within me would never let me rest when you're in distress, my love. Self-assured you are, and I would forever wait for you to open your arms and embrace me, ending the fury which you never meant within."
    ]
  },

  {
    id: "w3",
    title: "The Old Photograph",
    date: "Oct 2024",
    tag: "MEMORY",
    lines: [
      "Within a box of chest covered with dust, as I opened it just to see if something of significance remained there, I found a small stack of long-lost photographs telling stories of a glorious past. The moments indelibly written on the walls of mind revived themselves again for a few seconds.",
      "",
      "One might wish that something of the past had changed and never happened, hoping some events could be taken back. Yet the best of moments speak to the mind, making me want to live them all over again. Looking within the frame at people unknown who stood behind me, I feel I am but an album of some unknown person, the best photograph of their past.",
      "",
      "Just a piece of art it is, a poem with no language, yet expressed in every language that exists. It is still a life paused to be relived whenever one wishes it. It is a surreal painting sketched by God Himself, a song with a musical note depending on how one feels.",
      "",
      "A lot more remains to be stacked, a lot more moments to be cherished, and many records yet to beat. There is much to improve and a million more things that old photos teach with their insight. Let life pass with a heart full of imperishable memories."
    ]
  },
  {
    id: "w4",
    title: "She's the One for Me",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "The girl I saw with all my eyes and then I closed them, for nothing more in the world held any worth in beauty that I wished to see. She possessed a beauty my eyes could scarcely contain, and she deserved to be loved with all my heart, showering my face with her adorable smile.",
      "",
      "She's that magical essence which pours letter by letter into my eyes, describing a poetic feeling. I have nothing to think of or picture, only to wonder from what heavenly world she arrived.",
      "",
      "I look into the mirror and always wait for her to appear, a shining receptacle and kiss me. It's been far too long since I have seen my own face in reflection; it is her with whom my eyes are filled.",
      "",
      "I'm an awestruck child, and she's that magical bird I dreamt would descend one day and take me flying with her into the clouds."
    ]
  },

  {
    id: "w5",
    title: "Sunset",
    date: "Oct 2024",
    tag: "REFLECTION",
    lines: [
      "I walk the beach every evening wanting to capture the sun as he intends to descend and rise in another world. Most of the times I feel lost in my purpose when he appears there in his glorious form, dissolving me into him.",
      "",
      "It just takes a couple of seconds for him to go down, spreading his wings over the ocean or beneath the mountains. Sometimes he falls, sometimes it is just clouds fading away into thin air, and sometimes the clouds block my way as the culminating shine never reaches all the way.",
      "",
      "I wait for the perfect moment to capture him in the frame, as he stays there for an hour and then the moment comes. He's gone until the next day, and I feel the chill of his absence. The child within me smiles and awaits his return.",
      "",
      "When he is there, he makes me feel the colors of life. When he is gone, he gives me hope that sunshine will come again, and it is on its way. As he descends, he teaches me how every second of time that you live was never there and will never stay.",
      "",
      "He rises in some other place while I wait for him to come back to me and teach something new every day."
    ]
  },
  {
    id: "w6",
    title: "The Culmination of Life",
    date: "Oct 2024",
    tag: "LIFE",
    lines: [
      "As I sleep counting my days on my bed, grown too old to live and almost exhausted, there will still be more. With every breath, hoping the last is on its way, stars all over the body speak of everything that life has offered and the wisdom it has grown.",
      "",
      "What if life were uncivilized, untouched and unrestrained, just full of exuberance? There she was beside me, the love of my life, spending her time for me, as they say, a partner in crime always entwined in every moment of magic we witnessed.",
      "",
      "A life with no regrets never had our heads bent down for injustice. You made this world a better place. You may not be a queen within concrete walls, and you may not possess stacks of dead money, but your everlasting moments are treasures no wealth can buy.",
      "",
      "I truly love that smile upon your face as I look at you. After all the life we've been through, you've always been mine, untouched by the ways of life. We came, we saw, and we conquered.",
      "",
      "There is no more fear of dying after living a story when told seems illogical, yet that is the beauty of love—it redefines life. What more of life would you expect? As I pause my mind at work for now, I anticipate your presence once again."
    ]
  }, {
    id: "w7",
    title: "The Warrior",
    date: "Oct 2024",
    tag: "STRENGTH",
    lines: [
      "He is the one who never gets too old to die. He smiles in the face of death when it arrives. The one who never loses calm when taunted. He's not the one who shouts war cries as he licks the sword and swings while cutting the heads of enemies.",
      "",
      "He's not the one who sounds the toughest. He knows he's not here to kill but to win the world. He has the blessing of divine intents. He's the one who never pales or infuriates on losing a war. He's the dude they never saw coming, the guy who remained unplanned to be hunted.",
      "",
      "He is unconquered by power and wealth. All that he bows down for is love and his will. Destined are his ways. He's the guy with predictions aside. He's the winner who always remained unconsidered.",
      "",
      "He's the flower who blossomed facing the moon. He's the one who stood tall and smiled when there was no sunshine. He's the one who is the reason for lives to survive and finds his fulfillment in a war to define his boundaries in pursuit of the absolute.",
      "",
      "And when he dies on the battlefield with a smile, all his glory remains celebrated among the folklore, all their love becoming an expression of remembrance for the hero who made their lives rise for glory."
    ]
  },

  {
    id: "w8",
    title: "Burning to Ashes from Within",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "When you're at your extreme fury, the moment I can hardly bear the intensity of your exasperation setting me on flame, your nails pierce my skin and your eloquence turns to pitch silence while my body reacts, perspiring and anticipating the ascending hell.",
      "",
      "As my feet turn cold and my mind turns numb, I try to still my shivering self. Yet your silence makes me want to disappear into the dark and scream, to relieve myself of your haunting quiet that tears me apart into shatters.",
      "",
      "Your rage intensifies with the tone of your voice as you ask me to be still and utter no words, even when you know I rarely run out of them. I never turn speechless.",
      "",
      "You see an inexplicable smile on my face, flooding all my love for you. Nevertheless, I walk every step until you exhale with calm and I feel your bliss, for I have destined my will never to make you turn pale again."
    ]
  }, {
    id: "w9",
    title: "Eager to Be with You in My Deepest Sleep!",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "My world only exists, composed of you and my vivid hallucinations of us experiencing our time. It's all rainbows and unicorns in my running thoughts. When we're together it's all wild and couth. When you're asleep, you're never lost from my reality; you're the only being painting my world for me.",
      "",
      "Even in the moments after you sleep and I lose myself to the darkness in its purest semblance, all I think of is your charming face, ready to sleep, to hit refresh and come falling into my heart exuding grace. I start picturing your essence, the indelible exclamation to my life in my sleep.",
      "",
      "I wish to have your flair, flamboyant in all streams of my dreams. To not have you in my dream turns me desolate when it's dawn in my reality. All of a sudden my sky turns dark and so does my spirit when you leave unsettled.",
      "",
      "Mistakes happen inevitably, but what to do, oh my queen? Your fire of passion in rage won't resolve. I apologize a million times, but all I can say is that I believe in us, and all this fire would make you love me more beyond what you feel for me."
    ]
  },
  {
    id: "w10",
    title: "Reminiscing Our Video Call...",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "Miles apart we stay, but our phones never made us feel that way. All it takes is a video call for me to get entwined in your eyes. I blame my dismay sometimes; you can't spell the magic of your voice. All I can have is your smile and those lips eager to speak, while the emotions remain in the shadows expressed through floating texts.",
      "",
      "We realize there is something beyond the screens when we see each other within us. It's not all fun and laughter. Sometimes she's moody, sometimes she cries in a fit of rage or in an outpouring of her love. Sometimes we pull the switch of our emotions and forget that we were fighting.",
      "",
      "I wish the red button that ends the call disappears and we stay staring for everlasting time. Whatever it takes, in the end it all culminates with a smile. On a video call I thought I'd be happy just to see her, little did I know that all my craving intensifies to have the real her by my side.",
      "",
      "I want to call her the next second, but I tame myself and eagerly wait until I get another chance to enchant the divine beauty that she is."
    ]
  },
  {
    id: "w11",
    title: "True Love",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "A world within changes and makes a lad into a man. That moment when your eyes stop staring at girls on the street, when all that magnet loses its pull. No more fantasies and dreams are created by passing faces, for those words and worlds have gone far away from the ends of life.",
      "",
      "She is the reality which imagination failed to describe. From a jerk to a gentleman, all it takes is the spirit of love from a girl who defies stereotypes and sketches the art within the heart. She yearned an undefined need and let you view the new you who was always there inside, waiting to be mined.",
      "",
      "This is for the girl who made me forget that in this world other girls exist. From a wanderer to one with the will of a conqueror, she changed me. That's the moment which means you're feeling true love, when all that matters are the matters of the heart and a stronger truth than the sight the eyes have seen.",
      "",
      "Love the girl who makes you obsessed with your dreams. She taught me how to respect other girls. Life simply turned around. She introduced me to the world where beauty remains when compulsions and attractions fade away."
    ]
  },
  {
    id: "w12",
    title: "That Smile on My Face!!!",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "In a world where trust is a risky game, I'm unsure about many things but never about you. In you I smile blindly. You're the impeccable optimism for me in a world where people shake hands with one and stab with the other, where smiles are often pretentious.",
      "",
      "You made me laugh with all my heart and made that joy contagious to the world around me. Among the infinite stars, you're the moon. Your whispers of endearments and your magical spells soothe my mood, and I wish for nothing more to be happy.",
      "",
      "You're adorned with the jewelry of eternal youth. Every time I see that charm within my mind, I miss that radiant feeling I experience when I'm with you.",
      "",
      "I await your return into my phone, so I may recline once again and lose myself in that feeling which always brings that smile upon my face."
    ]
  },
  {
    id: "w13",
    title: "Enshrined to Immortality!",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "To the one who is enshrined within the deepest part of my being. Words are but limited expressions of thought which never truly describe what I intend to say, for you're an experience beyond the thought process, my holy grail of light and magic. I enchant your voice within my silence.",
      "",
      "You're entwined in the constant stream of thoughts I've been in. I wish I could swim through the stream of screams of your expression of love towards me. I want you to close your eyes, take a breath, and fall with me into the limitless, endless existence of my being.",
      "",
      "Stay there for eternal life, where only I enjoy the fall into me while you see my words, where there is only you and a world completely filled with you alone.",
      "",
      "The one who always resided in the lyrics of love songs, who built a shrine and waited for you to be immortalized within."
    ]
  },
  {
    id: "w14",
    title: "You're My Nectar of Euphoria",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "There is a lust for something the charmer plays with the venomous snake. Death held within bare hands still a smile. Insanity makes him want to kiss upon its hood. There is a chance that he might never breathe his next, the passion within risking death for a feeling born from within. That's what I have for you.",
      "",
      "Whatever it takes, even impending death, my love for you is unwavering. You've become the intoxicating drug within those lips, a nectar of euphoria. I feel my moment of death, venom piercing my heart to bleed as I see tears within those eyes.",
      "",
      "It would make me feel like I'm losing my breath, bitten by the sharpest fangs. You're that alluring enigma, deserving to be loved a little louder and with elevated intensity on every breath.",
      "",
      "For whatever madness resides within passion, I would still embrace it, if only to taste once more the nectar of euphoria that is you."
    ]
  },
  {
    id: "w15",
    title: "Drunk in Love.",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "Like a narrative grandly staged, it was more of an implausible happening that brought you into my life. What more do I need on a rainy day than a cup of coffee, a blanket, and you? I was a mad dreamer, always expecting the impossible to come true, mostly a frown when it came to love, until I found you.",
      "",
      "I might fade at the end of my time, but these stains of ink—words written from my heart for you—shall last, inspiring hope for mad men to wonder if someone like you could ever exist and imagine what it feels like to love someone truly special.",
      "",
      "Fortunate am I to have you as my significant one. I end up doing little things late, always a little drunk in love. When I'm with you, the light of my life, even my shadow disappears and there remains only you and I, dear, in a world of our own.",
      "",
      "All my life was but a journey to explore and find you, and here you are. Now all we need to do is disappear into our own world and get drunk in love."
    ]
  },
  {
    id: "w16",
    title: "An Evening Walk",
    date: "Oct 2024",
    tag: "LIFE",
    lines: [
      "Let me go on a walk as my freezing mind longed to feel some air. In the late evening, drooping blossoms of the trees covering the street painted clouds all red in the evening sky. In the middle of no man's land, a desolate war zone stood in the vicinity.",
      "",
      "As I advanced further, there stood a bunch of kids playing with sand and stones, never bothered by any disease, full of life and carefree in spirit. The elderly folks sat upon their balconies talking and staring into the emptiness of the place, while within the houses the television screamed that death stood at every doorstep.",
      "",
      "Forget the rest and keep your head beneath the shelter of your home, they said, while minds quarantined in desperation wished to wake from their seats. As the streetlights came alive, women stepped out to gather and meet.",
      "",
      "I perceived the planes halted at their ports, those majestic wheels of flight that almost looked like birds when flying. I wandered around spots that were once crowded and realized how much people value their lives.",
      "",
      "Life is but a play. Make your move without hesitation and never delay. Live the moment, for when the game ends, we take nothing with us."
    ]
  },
  {
    id: "w17",
    title: "Lost in the Wild",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "I wonder how the smallest things in life are often the most mesmerizing. I wondered why birds fly happily in the evening sky, and then I remember that it is the time you come to me, when silence embraces our places and makes us feel cozy enough to speak of romance.",
      "",
      "Even I dream of flying to you. I wish to get lost in the woods with you, where we would reside beside the fire in the chilling dark, with animals screeching and insects buzzing throughout the night.",
      "",
      "You would run into me and hold me tightly as though you never wanted to let me go. The more frightened you become, the warmer the embrace, and those eyes would drown into mine.",
      "",
      "Smile as the cries fade away. Sit beside me while I wait for those moments to return, for you to come and fall upon my heart all over again."
    ]
  },
  {
    id: "w18",
    title: "Drunk in You",
    date: "Oct 2024",
    tag: "LOVE",
    lines: [
      "Every time I promise myself to never let you drift away from me, I ask why you are so beautiful. The perfect being with an unblemished nature, as pure as no ordinary soul could ever be. I'm fortunate to have you beside me, making me feel life as though it had only just begun.",
      "",
      "You always belonged to a world beyond the skies. Your arms are my armour, and your genuine heart feels more real than reality itself. Such purity and beauty would leave the standards of the world astonished. Ooh, my munchkin, what a blessing you are.",
      "",
      "As darkness ascends, we cherish the feeling it brings. The darker the night, the brighter the light and the deeper the emotions. I await your presence only to let burst forth everything that was contained within.",
      "",
      "I truly feel intoxicated by that feeling which electrifies my nerves whenever I see you come to me. Lost in your essence, I remain forever drunk in you."
    ]
  },

];


const PHOTOS_PER_PAGE = 8;
const POEMS_PER_PAGE = 8;


function Lightbox({ photo, onClose, onPrev, onNext }) {
  const [colored, setColored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const isPortrait = photo.aspect === "tall" || photo.aspect === "portrait";

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setColored(true), 420);
    return () => { document.body.style.overflow = prev; clearTimeout(t); };
  }, [photo]);

  useEffect(() => {
    let lastWheelTime = 0;
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    const wheel = (e) => {
      const now = Date.now();
      if (now - lastWheelTime < 500) return;
      if (e.deltaX > 20 || e.deltaY > 20) { onNext?.(); lastWheelTime = now; }
      else if (e.deltaX < -20 || e.deltaY < -20) { onPrev?.(); lastWheelTime = now; }
    };
    window.addEventListener("keydown", h);
    window.addEventListener("wheel", wheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", h);
      window.removeEventListener("wheel", wheel);
    };
  }, [onClose, onPrev, onNext]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{ background: "rgba(4,4,4,0.97)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      onClick={onClose}
      onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
      onTouchEnd={(e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) onNext?.();
        if (touchStart - touchEnd < -50) onPrev?.();
      }}
    >
      <div
        className="relative w-full max-w-[98vw] sm:max-w-[92vw] lg:max-w-[1200px] flex flex-col lg:flex-row bg-[#0d0d0d] border border-white/10 overflow-y-auto"
        style={{ maxHeight: "90vh", boxShadow: "0 0 100px rgba(0,0,0,0.9)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative cursor-pointer bg-[#080808] w-full flex-shrink-0 lg:flex-1"
          style={{ height: isPortrait ? "clamp(300px, 65vw, 75vh)" : "clamp(250px, 55vw, 65vh)" }}
          onClick={() => setColored((v) => !v)}
        >
          <img
            src={photo.src}
            alt={photo.title}
            className="absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={photo.src}
            alt=""
            className="absolute inset-0 w-full h-full transition-opacity duration-700 object-contain"
            style={{ filter: "grayscale(1) contrast(1.08)", opacity: colored ? 0 : 1 }}
            onLoad={() => setLoaded(true)}
          />
          {!colored && loaded && (
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="font-mono text-[8px] tracking-[0.26em] uppercase text-white/65 bg-black/55 backdrop-blur-sm px-3 py-1.5 border border-white/15">
                TAP TO REVEAL
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <span className="font-mono text-[7px] tracking-[0.2em] text-white/40">
              {colored ? "COLOUR" : "B&W"}
            </span>
            <div className={"w-2 h-2 rounded-full border transition-all duration-500 " + (colored ? "bg-emerald-400 border-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-transparent border-white/30")} />
          </div>
        </div>
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
          <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/40">{photo.location}</span>
              <span className="text-white/20 text-[8px]">·</span>
              <span className="font-mono text-[7.5px] tracking-[0.2em] text-white/28">{photo.year}</span>
            </div>
            <h2
              className="text-white leading-[1.05] text-[clamp(1.3rem,5vw,1.75rem)] py-0.5"
              style={{ fontFamily: "Boldonse, sans-serif", wordBreak: "break-word", overflowWrap: "anywhere" }}
            >
              {photo.title}
            </h2>
            <p className="font-mono text-[9.5px] sm:text-[10px] italic text-white/60 leading-[1.95]">
              {photo.desc}
            </p>
          </div>
          <div className="shrink-0 border-t border-white/10 p-4 sm:p-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setColored((v) => !v)}
              className="font-mono text-[7.5px] tracking-[0.2em] uppercase border border-white/20 text-white/50 px-3 py-2 hover:bg-white hover:text-black transition-all duration-200"
            >
              {colored ? "B&W MODE" : "COLOUR"}
            </button>
            <button
              onClick={onClose}
              className="font-mono text-[8.5px] tracking-[0.2em] font-bold uppercase border border-white/30 text-white/80 px-4 py-2 hover:bg-white hover:text-black transition-all duration-200"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


function PaginationBar({ page, total, perPage, onPage }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;


  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);


  return (
    <div className="border-t border-white/[0.07] px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-baseline gap-3">
        <span className="text-white text-[clamp(1.2rem,2vw,1.6rem)] tracking-[0.04em]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          {String(start).padStart(2, "0")}&mdash;{String(end).padStart(2, "0")}
        </span>
        <span className="font-mono text-[8px] tracking-[0.2em] text-white/30">
          OF {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPage(p)}
            className="font-mono text-[8px] tracking-[0.18em] w-8 h-8 flex items-center justify-center border transition-all duration-200"
            style={{
              borderColor: p === page ? "#fff" : "rgba(255,255,255,0.15)",
              background: p === page ? "#fff" : "transparent",
              color: p === page ? "#000" : "rgba(255,255,255,0.4)",
            }}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="font-mono text-[8px] tracking-[0.18em] uppercase border border-white/15 text-white/40 px-3 py-2 disabled:opacity-20 disabled:cursor-not-allowed hover:border-white/50 hover:text-white/80 transition-all duration-150"
        >
          &#8592; PREV
        </button>
        <button
          onClick={() => onPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="font-mono text-[8px] tracking-[0.18em] uppercase border border-white/15 text-white/40 px-3 py-2 disabled:opacity-20 disabled:cursor-not-allowed hover:border-white/50 hover:text-white/80 transition-all duration-150"
        >
          NEXT &#8594;
        </button>
      </div>
    </div>
  );
}


function PhotosTab() {
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(1);

  const start = (page - 1) * PHOTOS_PER_PAGE;
  const visible = PHOTOS.slice(start, start + PHOTOS_PER_PAGE);

  function goPage(p) {
    setPage(p);
    document.getElementById("cg-photos-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const handlePrev = () => {
    if (!active) return;
    const idx = PHOTOS.findIndex(p => p.id === active.id);
    if (idx > 0) setActive(PHOTOS[idx - 1]);
  };

  const handleNext = () => {
    if (!active) return;
    const idx = PHOTOS.findIndex(p => p.id === active.id);
    if (idx < PHOTOS.length - 1) setActive(PHOTOS[idx + 1]);
  };

  const renderPhoto = (photo, idx) => (
    <div
      key={photo.id}
      className="break-inside-avoid mb-3 lg:mb-4 group cursor-pointer relative overflow-hidden cg-fi w-full"
      style={{ animationDelay: idx * 0.05 + "s" }}
      onClick={() => setActive(photo)}
    >
      <div
        className={
          "relative overflow-hidden " +
          (photo.aspect === "portrait" ? "aspect-[9/16]" :
            photo.aspect === "tall" ? "aspect-[2/3]" :
              photo.aspect === "wide" ? "aspect-[4/3]" : "aspect-square")
        }
      >
        <img
          src={photo.src}
          alt={photo.title}
          className={"absolute inset-0 w-full h-full " + (photo.aspect === "portrait" ? "object-contain" : "object-cover")}
        />
        <img
          src={photo.src}
          alt=""
          className={"absolute inset-0 w-full h-full scale-100 transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-[1.04] " + (photo.aspect === "portrait" ? "object-contain" : "object-cover")}
          style={{ filter: "grayscale(1) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-black/45 transition-opacity duration-500 group-hover:opacity-10" />
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-1 transition-all duration-300 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          <p className="text-white text-[16px] tracking-[0.06em] leading-none" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            {photo.title}
          </p>
          <p className="font-mono text-white/55 text-[7.5px] tracking-[0.18em] uppercase mt-0.5">
            {photo.location}
          </p>
        </div>
        <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-white/30 transition-all duration-300 group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_8px_#34d399]" />
        <div className="absolute top-2.5 left-2.5 font-mono text-[7px] tracking-[0.18em] text-white/30">
          {String(PHOTOS.findIndex(p => p.id === photo.id) + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {active && <Lightbox photo={active} onClose={() => setActive(null)} onPrev={handlePrev} onNext={handleNext} />}
      <div id="cg-photos-grid" className="relative">
        <div className="p-4 sm:p-5 lg:p-8 columns-2 lg:columns-3 gap-3 lg:gap-4 relative z-10">
          {visible.map((photo, idx) => renderPhoto(photo, idx))}
        </div>
        <PaginationBar page={page} total={PHOTOS.length} perPage={PHOTOS_PER_PAGE} onPage={goPage} />
      </div>
    </>
  );
}


function PoemCard({ poem, idx }) {
  const [open, setOpen] = useState(false);
  const num = String(idx + 1).padStart(2, "0");


  return (
    <article
      className="relative border-b border-white/[0.08] last:border-b-0 group cursor-pointer transition-colors duration-200 hover:bg-white/[0.02]"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-start gap-5 lg:gap-8 px-5 lg:px-8 py-6 lg:py-8">
        <span
          className="text-white/[0.08] leading-none shrink-0 select-none group-hover:text-white/[0.15] transition-colors duration-300 text-[clamp(3rem,6vw,5rem)]"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {num}
        </span>
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-black bg-white/80 px-2 py-[2px]">
              {poem.tag}
            </span>
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/30">
              {poem.date}
            </span>
          </div>
          <h3
            className="text-white leading-[0.9] tracking-[0.04em] text-[clamp(1.6rem,4vw,3rem)] group-hover:tracking-[0.07em] transition-all duration-300"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {poem.title}
          </h3>
          <p className={"font-mono italic text-white/35 text-[9px] leading-[1.7] transition-all duration-300 " + (open ? "opacity-0 h-0 overflow-hidden mt-0" : "opacity-100 mt-2")}>
            {poem.lines.find((l) => l !== "") || ""}
          </p>
        </div>
        <div
          className="shrink-0 mt-2 w-7 h-7 flex items-center justify-center border border-white/15 text-white/30 group-hover:border-white/40 group-hover:text-white/60 transition-all duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s ease" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? 800 : 0 }}
      >
        <div className="px-5 lg:px-8 pb-8 lg:pb-10">
          <div className="h-px bg-white/[0.07] mb-8" />
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="flex-1">
              <div className="text-white/[0.06] text-[100px] leading-none select-none -mb-8 -ml-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                &ldquo;
              </div>
              <div className="relative pl-5 border-l-2 border-white/20">
                {poem.lines.map((line, i) =>
                  line === "—"
                    ? <div key={i} className="my-4 w-8 h-px bg-white/25" />
                    : line === ""
                      ? <div key={i} className="h-4" />
                      : <p key={i} className="font-mono italic text-white/85 text-[clamp(11px,1.4vw,14px)] leading-[2.1]">{line}</p>
                )}
              </div>
            </div>
            <div className="lg:w-44 shrink-0 flex flex-col gap-5">
              <div>
                <p className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/30 mb-1">WRITTEN</p>
                <p className="text-white text-[18px] tracking-[0.04em]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>{poem.date}</p>
              </div>
              <div>
                <p className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/30 mb-1">FORM</p>
                <p className="font-mono text-[9px] tracking-[0.18em] text-white/60 uppercase">{poem.tag}</p>
              </div>
              <div>
                <p className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/30 mb-1">LINES</p>
                <p className="text-white text-[18px] tracking-[0.04em]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  {poem.lines.filter((l) => l !== "" && l !== "—").length}
                </p>
              </div>
              <div className="mt-auto">
                <p className="text-white/[0.06] text-[64px] leading-none select-none" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                  {num}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


function PoetryTab() {
  const [page, setPage] = useState(1);
  const start = (page - 1) * POEMS_PER_PAGE;
  const visible = POEMS.slice(start, start + POEMS_PER_PAGE);


  function goPage(p) {
    setPage(p);
    document.getElementById("cg-poetry-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }


  return (
    <div id="cg-poetry-list">
      <div className="divide-y divide-white/[0.05]">
        {visible.map((poem, idx) => (
          <PoemCard key={poem.id} poem={poem} idx={start + idx} />
        ))}
      </div>
      <PaginationBar page={page} total={POEMS.length} perPage={POEMS_PER_PAGE} onPage={goPage} />
    </div>
  );
}


export default function CreativeGallery({ activeTab, onTabChange }: { activeTab?: string, onTabChange?: (tab: string) => void }) {
  const [internalTab, setInternalTab] = useState("photos");
  const tab = activeTab !== undefined ? activeTab : internalTab;
  const setTab = onTabChange || setInternalTab;


  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Boldonse&family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
      />
      <style>{[
        "@keyframes cg-fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}",
        "@keyframes cg-pulse{0%,100%{opacity:1}50%{opacity:0.35}}",
        ".cg-fi{animation:cg-fadein 0.4s ease both}",
        ".cg-pulse{animation:cg-pulse 2s ease infinite}",
      ].join("")}</style>


      <div id="section-2" className="w-full min-h-screen snap-start snap-always relative z-10 bg-[#0a0a0a] text-white overflow-x-hidden border-b-[24px] border-black box-border">
        <div className="sticky top-0 z-50 bg-[#0a0a0a] pt-4 lg:pt-6">
          <div className="border-b border-white/10 px-5 lg:px-8 py-4 lg:py-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="font-mono text-[7.5px] tracking-[0.3em] uppercase text-white/30 mb-1.5">
                GIRIDHAR &#183; CREATIVE ARCHIVE
              </p>
              <h2
                className="text-white leading-[0.88] text-[clamp(1.2rem,7.5vw,2rem)] sm:text-[clamp(1.8rem,5.5vw,3.2rem)] whitespace-nowrap transition-all duration-500"
                style={{ fontFamily: "Boldonse, sans-serif" }}
              >
                {tab === "photos" ? "THROUGH THE LENS" : "WRITTEN THINGS"}
              </h2>
            </div>
            <div className="flex shrink-0 gap-3 self-start sm:self-auto mt-2 sm:mt-0">
              {[
                { id: "photos", label: "PHOTOGRAPHY" },
                { id: "poetry", label: "POETRY" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={"font-['Space_Mono'] text-[10px] tracking-[0.2em] font-bold uppercase px-6 lg:px-8 py-2.5 transition-all duration-300 border " +
                    (tab === t.id ? "bg-white text-black border-white shadow-[4px_4px_0_#fff] translate-y-[-2px] translate-x-[-2px]" : "bg-[#0a0a0a] text-white/50 border-white/20 hover:text-white hover:border-white/50")}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-b border-white/[0.06] px-5 lg:px-8 py-2.5 flex items-center justify-between">
            <p className="font-mono text-[7.5px] tracking-[0.25em] text-white/28">
              {tab === "photos"
                ? PHOTOS.length + " FRAMES · 8 PER PAGE — HOVER TO PREVIEW · CLICK TO OPEN"
                : POEMS.length + " PIECES · 8 PER PAGE — CLICK ANY TO READ"}
            </p>
            <div className="flex items-center gap-2">
              <span className="cg-pulse w-[5px] h-[5px] rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="font-mono text-[7.5px] tracking-[0.2em] text-emerald-400/65">LIVE</span>
            </div>
          </div>
        </div>


        <div key={tab} className="cg-fi">
          {tab === "photos" ? <PhotosTab /> : <PoetryTab />}
        </div>


        <div className="border-t border-white/[0.06] px-5 lg:px-8 py-4 flex items-center justify-between mt-4">
          <span className="text-[20px] text-white/[0.07] tracking-[0.06em]" style={{ fontFamily: "Bebas Neue, sans-serif" }}>&#169;2026</span>
          <span className="font-mono text-[7px] tracking-[0.28em] text-white/18">GIRIDHAR.DEV</span>
        </div>
      </div>
    </>
  );
}
