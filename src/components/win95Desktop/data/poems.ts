export interface Poem {
  id: string;
  title: string;
  content: string;
  created: Date;
  modified: Date;
}

export const poems: Poem[] = [
  {
    id: 'poem1',
    title: 'Dial-Up Dreams',
    content: `The screech and hiss of connection,
A symphony of digital affection,
Waiting for the world to load,
One pixel at a time, down the road.

The hourglass spins, we sit and wait,
For knowledge, love, or twist of fate,
In those patient moments, pure and bright,
We learned the value of the light.

No instant gratification here,
Each webpage earned, each friend held dear,
The modem sang its ancient song,
And we knew where we belonged.`,
    created: new Date('1996-03-15'),
    modified: new Date('1996-03-15')
  },
  {
    id: 'poem2',
    title: 'Floppy Disk Memory',
    content: `1.44 megabytes of hope,
Saved inside a plastic envelope,
"Save" icon for eternity,
Though the young ones cannot see.

Click and whirr, the drive accepts,
These precious digital concepts,
Fragile as a butterfly wing,
Yet holding everything.`,
    created: new Date('1995-08-22'),
    modified: new Date('1995-08-22')
  },
  {
    id: 'poem3',
    title: 'Windows to the Soul',
    content: `Teal screen at the dawn of time,
Start button, yours and mine,
Pixelated dreams in grey and white,
Icons glowing in the night.

Click and drag across the screen,
The future's here, or so we've seen,
Maximize these memories,
Minimize the anxieties.

In every window that we open,
Hope and wonder, softly spoken,
The cursor points to paths unknown,
In this digital home we've grown.

Shut down, restart, but never end,
These systems that we comprehend,
For in this box of plastic, wire,
Burns humanity's brightest fire.`,
    created: new Date('1995-11-20'),
    modified: new Date('1997-02-14')
  },
  {
    id: 'poem4',
    title: 'Y2K Anxiety',
    content: `The millennium approaches fast,
Will our computers be our last?
Two digits holding back the tide,
Nowhere left for us to hide.

They say the systems all will crash,
Our data turned to digital ash,
But something in me wants to believe,
We'll find a way, we won't just leave.

So here we stand at century's end,
Uncertain what the fates will send,
But in this moment, crystal clear,
I'm grateful that I'm here.

Update: We made it through just fine,
The apocalypse postponed one more time.`,
    created: new Date('1999-09-15'),
    modified: new Date('2000-01-01')
  },
  {
    id: 'poem5',
    title: 'Screensaver Meditation',
    content: `Watch the pipes connect and flow,
Maze of colors, watch them grow,
Starfield pulling me inside,
Where do these virtual pathways glide?

Mystify me with your dance,
Geometric, hypnotic trance,
Flying toasters in the sky,
Never asking how or why.

In the stillness of the screen,
Lies a world that few have seen,
Where the only rule that matters here:
Beauty blooms when we draw near.`,
    created: new Date('1996-05-10'),
    modified: new Date('1996-05-10')
  },
  {
    id: 'poem6',
    title: 'Desktop Garden',
    content: `My icons bloom in ordered rows,
Each one a seed, a path that grows,
Folders full of secret things,
Documents with invisible wings.

Right-click to see what lies beneath,
Properties wrapped like a wreath,
Size and type and modified date,
Metadata of love and hate.

Drag them here, arrange with care,
Create a garden bright and fair,
For on this screen of teal and grey,
I cultivate my digital day.`,
    created: new Date('1997-04-03'),
    modified: new Date('1997-04-03')
  },
  {
    id: 'poem7',
    title: 'The Blue Screen Speaks',
    content: `A fatal exception has occurred,
In spaces between the heard and heard,
The system stops, the cursor fades,
Into the blue, where error cascades.

But don't you see, in this mistake,
A kind of beauty starts to wake?
For even machines must sometimes rest,
Even circuits need to decompress.

Press any key to continue on,
Though what we had might now be gone,
The journey matters more than destination,
Even in this blue frustration.`,
    created: new Date('1998-02-28'),
    modified: new Date('1998-02-28')
  },
  {
    id: 'poem8',
    title: 'Recycle Bin Redemption',
    content: `Send to the bin, but not erased,
Second chances, gently placed,
In this temporary purgatory,
Files await their final story.

Will you restore what once was dear?
Or empty out, and persevere?
The choice is yours, the power clear,
In this icon we hold near.

Nothing's truly lost until,
We make that choice with iron will,
The bin reminds us, soft and kind,
Delete with purpose, heart, and mind.`,
    created: new Date('1996-12-10'),
    modified: new Date('1996-12-10')
  },
  {
    id: 'poem9',
    title: 'Cursor Journey',
    content: `I am the arrow on your screen,
Pointing to worlds you've never seen,
Following the movement of your hand,
Across this pixelated land.

Sometimes I'm a hand for clicking,
Sometimes an hourglass, time ticking,
Text cursor blinking in the field,
Waiting for the words you'll yield.

I am your avatar in this space,
Your digital presence, hand and face,
Together we explore and play,
In this Windows 95 ballet.`,
    created: new Date('1997-07-19'),
    modified: new Date('1997-07-19')
  },
  {
    id: 'poem10',
    title: 'Sound of Progress',
    content: `Beep and bloop and system chime,
Audio markers keeping time,
Each notification has its voice,
Error, warning, or just noise.

The hard drive churns its ancient song,
Seeking, reading all day long,
Fan exhales its steady breath,
Keeping cool the dance with death.

And when you press the power down,
That final sigh, that settling sound,
Of capacitors releasing charge,
The symphony of the tech at large.

These are the sounds we used to know,
Before the silent solid flow,
When computers had a heartbeat strong,
And we could hear when things went wrong.`,
    created: new Date('1998-11-05'),
    modified: new Date('1998-11-05')
  },
  {
    id: 'poem11',
    title: 'Taskbar Philosophy',
    content: `At the bottom of my world it sits,
The bar that holds my working bits,
Start button glowing, ready, true,
Opening menus, old and new.

Windows lined up, side by side,
Each a world where I can hide,
Click to switch, to change the view,
From document to game to avenue.

System tray with quiet friends,
Volume, clock, and other trends,
Always there, but seldom seen,
The supporting cast of the screen.

In this strip of gray and light,
I find my way through digital night,
The taskbar teaches me this truth:
Everything has its place, its use, its youth.`,
    created: new Date('1997-01-30'),
    modified: new Date('1997-01-30')
  },
  {
    id: 'poem12',
    title: 'README.TXT',
    content: `They always told us "read me first,"
Before we satisfied our thirst,
For clicking, dragging, installing fast,
These text files, remnants of the past.

Plain and simple, no fancy style,
Just words that stretch for mile on mile,
Instructions written clear and true,
By programmers who once were new.

Now we skip them, rush ahead,
Ignore the wisdom that they've said,
But in those files, if we'd just look,
Lives the manual, the sacred book.

So here's to README.TXT files,
And all their mono-spaced wiles,
The poetry of the practical,
The beauty of the technical.`,
    created: new Date('1996-06-25'),
    modified: new Date('1996-06-25')
  }
];

export const getRandomPoem = (): Poem => {
  return poems[Math.floor(Math.random() * poems.length)];
};

export const searchPoems = (query: string): Poem[] => {
  const lowerQuery = query.toLowerCase();
  return poems.filter(poem => 
    poem.title.toLowerCase().includes(lowerQuery) ||
    poem.content.toLowerCase().includes(lowerQuery)
  );
};