import { GET_USER } from '@/api/offline-fake-api/generators/users.js';

let prevMonthNum = new Date().getMonth();
const prevMonth = prevMonthNum < 10 ? '0' + prevMonthNum : prevMonthNum;

const getUser = (id) => {
  return GET_USER(id, ['posts', 'commented', 'about', 'password']);
};

const articles = [
  {
    title: '1 How to read 700 books at 15 hours. Part 1',
    creationDate: `25.${prevMonth}.21, 15:34`,
    author: getUser(234861),
    body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet porta ipsum. Cras a turpis elit. Nunc dictum nisi id leo varius vulputate. Maecenas placerat, elit eget dignissim elementum, sapien dui tincidunt lectus, ut suscipit magna purus et neque. Praesent ultricies, dui ac malesuada ornare, lacus libero congue mauris, in feugiat arcu lacus eget nisl. Nullam dui enim, varius sed convallis efficitur, fringilla quis sem. Fusce lacinia lacus sed metus vehicula, nec maximus arcu vehicula. In hendrerit, ex in tristique viverra, urna tellus dapibus eros, eu bibendum massa odio ut neque. Phasellus quis ante rutrum arcu sollicitudin sodales. Nullam sed sagittis velit. Sed vel arcu purus. Integer at porttitor orci.
Nulla malesuada consectetur lacus, et fermentum sem suscipit a. Duis aliquet hendrerit egestas. Aenean tempus sem ut vehicula tempor. In pellentesque, nibh vitae fringilla laoreet, nisi purus congue est, ac laoreet mi ex quis quam. In dignissim, ipsum vitae placerat dignissim, ex lacus laoreet justo, congue congue nulla nibh dictum enim. Donec cursus suscipit dui vel maximus. Integer non lacinia nisl, et porta enim. Pellentesque eu risus eget risus tempus luctus. Sed felis diam, fermentum at imperdiet at, venenatis ac velit. Aliquam varius justo eu magna varius fringilla. Donec elementum turpis nec enim imperdiet, vel aliquet turpis dignissim. Curabitur mauris felis, condimentum eget mauris sed, tempor condimentum augue. Fusce ut venenatis arcu. Etiam pharetra tincidunt eros, sit amet dictum magna dignissim vel. Praesent varius mi ut quam suscipit, non scelerisque purus accumsan.
Integer sed nibh non nulla fringilla suscipit et nec dui. Curabitur ac ex nec tellus condimentum lacinia. Phasellus non mi ut justo suscipit laoreet. Sed hendrerit elit vitae erat interdum semper. Nullam a lorem eget enim interdum pulvinar. Etiam dui nisi, dictum at malesuada sit amet, blandit eget arcu. Maecenas dictum vel ex non efficitur. Curabitur sed diam vitae sem dictum gravida quis id metus. Nam rutrum hendrerit lectus non volutpat. Proin sit amet lacus ac neque vehicula aliquam vel vel tellus. Nulla tristique, metus et gravida mollis, leo odio malesuada nunc, at rutrum dui sem nec turpis. Aenean rutrum mauris sed pretium ultrices. Vivamus eu mattis lacus. Nunc et massa dui. Phasellus sed magna nisl. Nunc condimentum posuere condimentum.
Quisque egestas vel augue quis ornare. Nunc elit eros, pellentesque ac scelerisque et, suscipit nec urna. Pellentesque cursus id est eu venenatis. Suspendisse at tempus enim. Ut finibus fringilla magna, egestas posuere ipsum scelerisque eu. Integer a enim sit amet tellus malesuada molestie. Morbi cursus facilisis nisl, id porttitor metus. Quisque luctus a velit in finibus. Maecenas condimentum sodales massa vitae dictum.
Ut in neque vel nibh imperdiet vehicula in non ipsum. Sed tincidunt erat a tellus imperdiet facilisis. Vivamus ac purus vel ligula euismod ultrices. Praesent libero leo, tempor ac nisl non, tempor faucibus metus. Duis hendrerit semper purus. Sed congue sollicitudin est eu scelerisque. Nulla sit amet eros vel justo tempus ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam vestibulum leo urna, sed euismod nisi volutpat nec. Praesent et ex feugiat, commodo nisi non, luctus massa. Donec quis condimentum ante, vel sollicitudin felis. Nulla facilisi.</p>`,
    img: 'https://picsum.photos/id/155/800/450',
    id: 21033,
    tags: ['Books', 'JavaScript', 'Math'],
    comments: [
      {
        author: getUser(341445),
        commentBody: 'Yes!',
        time: `25.${prevMonth}.21, 16:12`,
      },
      {
        author: getUser(147511),
        commentBody: 'No! It`s impossible! u are crazy!)',
        time: `26.${prevMonth}.21, 18:32`,
      },
      {
        author: getUser(117234),
        commentBody: 'How are you do this?)',
        time: `27.${prevMonth}.21, 18:32`,
      },
    ],
  },
  {
    title: '2 Angular is Costing Companies Billions',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(341445),
    body: `<p>I know I’m going to get hate-mail for writing this piece, but, so be it. Someone has got to finally say what many of us as experienced software engineers have been thinking for some time now.
I’ve been a developer for over 20 years working for some of North America’s most prestigious companies. For several years now I’ve been watching the state of UI and how it’s gone from bad to worse. Specifically, I’m talking about “fad-tech”, those cutesy not-so-little pieces of JS and CSS that are supposed to be all the rage with the newbie crowd and now even with some seasoned engineers who should know better.
The snowballing culture of using these frameworks, like Angular, have avalanched us into code hell with no end in sight of when this nonsense is ever going to level off.
Everyday I see job postings come into my email, companies of all sizes scrambling for EXPERIENCED Angular 4, 5, 6, 7, 8, 10, 12 developers with at least 5 years of experience building and maintaining this mess we call “state-of-the-art” UI.
It’s not “state-of-the-art”. It’s a mess.
Several years ago I had an interview with EA (Electronic Arts) during which I was told that the company was junking all of their UI frameworks and returning to simply writing plain vanilla ECMA (JavaScript) enclosures. (That would be JS “plugins” for us jQuery people.) I was surprised but also curious.
Now the rest of us know why.
Keep It Stupid-Simple
I don’t like calling people “stupid”, so I’ve sort of rearranged the classic KISS acronym. But the KISS principle has been utterly lost with the latest versions of Angular. It’s no longer just a UI framework, but a backend service as well. Your UI people are now having to write backend code that goes beyond mere HTML templating. Some people would like to say that is a good thing! But it’s not.
Yes, Angular has some cool “whiz-bang” features—ALL of which are completely unnecessary to write effective and stunning UI or deliver a professional UX.
SPA’s (single-page applications) are out. They are difficult to maintain and wreak havoc with analytics and search engine crawlers which rely on the URL actually changing.
Yes, there are work arounds for these issues, but THAT’S THE POINT! You shouldn’t have to write code to “work around” how the web actually works!
Just Say No to UI Compilers
Another “fad-tech” that’s been around a while that also needs to go is Sass and Less. Honestly, I like the code organization that these CSS frameworks offer. What I don’t like are “mixins” and that they need to be compiled to run.
At this point, I don’t know why browsers don’t just natively support SCSS as a standard way to ingest CSS code, but that’s a topic for another time.
The bottom line with these CSS pseudo-languages is that they really don’t save time; they’re not easier to use and learn; and at the end of the day, all they really do is generate nice clean well-targeted CSS code that all of us should be writing natively anyway.
If you want to use Sass or Less and pre-compile them in your own dev environment, I don’t have a problem with that. But what we should never see are these files entering the CICD pipeline for compiling during deployments.
The same goes for any other JavaScript library or framework that eventually compiles to plain vanilla ECMA as well.
Every step you add to the CICD pipeline just gums up and bloats what should be a very simple deployment process. We should be looking for ways to decrease the number of steps in the process, not pile on more just because “Jenkins” allows us to do it.
Angular is Bloating the UI
Call me a UI purist, but the current state of UI is not “art”—it’s a cluster-(expletive omitted). I get that people at Google are bored and need something to do, but Angular and other similar frameworks are destroying the simplicity of the UI, not making it easier.
The point is you don’t need a bloated framework to write clean, elegant UI or build an effective UX. You can use whatever native templating engine your backend provides without bloating the frontend with incomprehensible and un-debuggable compiled JS.
Angular is Costing Companies Billions
At the end of the day, a framework is supposed to make coding easier, not harder. It’s supposed to save companies money with that ease of use, not cost them more.
But this is exactly what is happening—Angular is expensive to run.
Unfortunately, Angular (and other UI frameworks as well) cost companies more money, lots of money, to train and re-train employees to learn and re-learn a framework that keeps changing versions every year or so. Yes, Angular has now promised that all new versions will be backward compatible, but again, that is just going to add to the already bloated complexity when the next new “really cool” component needs to change everything again.
And God help you if you’re a contractor who works with several enterprises who are all using different UI frameworks. You now need to learn and know not just 12 different flavors of Angular, but various versions of Vue and React as well that some newbie programmer saddled the company with 4 years ago but has now left to ruin someone else’s technology stack.
It’s time to relegate Angular (and the others) to the junk pile of failed experiments where it belongs.
What Should Replace Angular?
The answer is quite simply—replace it with nothing. Get rid of it entirely. Rip it out and write plain, easy to use and understand JavaScript enclosures.
I’m not opposed to using open source libraries like jQuery, or other UI components, or CSS frameworks like Bootstrap. These can be “included” with one or two lines of code and they actually do make our lives as develoeprs a lot easier!
But if the framework needs Node.js to run, like Tailwind, or you need to train and re-train people to use it because the maintainers keep updating it year after year, that stuff is just costing you money—and for what? It’s “super-cool” to use?
The bottom line is Angular is gumming up the works; it’s costing your company thousands, perhaps tens of thousands, and if you’re a Fortune 1,000 enterprise, it’s likely costing you millions each year in maintenance, updates, training, and lost time just finding experienced people (or people who even want) to support the monstrosity.
Whenever I see a company desperate for UI engineers, invariably now they NEED someone with 3 to 5 years of Angular experience. That’s nonsense. I can build elegant, fully functional UI in less time with plain JS, and without all of the Angular frontend and backend complexity.
JavaScript encloses built with single-minded purposes provide the perfect fit and balance between harnessing the complexities of modern UI while maintaining elegant simplicity within the DOM.
If something breaks in production with an enclosure written in plain JS, it takes seconds to find the problem within any browser’s dev tools, and I don’t need to install or include yet another layer of bloat to tell me how to debug the compiled code.
Conclusion
The Holy Grail of writing code, any code, lies within its simplicity. However, as modern engineers, we’ve all but totally lost sight of that simplicity. We’ve gotten caught up in the fad of whatever shiny new tech has gotten released from which ever fav tech giant or college has shoved in our face as “state-of-the-art”.
Well, Google or whichever university isn’t paying your staffing bills. It’s time CTO’s took charge of the technology stack, deprecated the fad-tech, and returned all of us to rational reasoned UI that is simple, maintainable, and beautiful.</p>`,
    img: 'https://picsum.photos/id/172/800/450',
    id: 12411,
    tags: ['Angular', 'JavaScript', 'UI'],
    comments: [
      {
        author: getUser(234861),
        commentBody: 'Vue.js the best!)',
        time: `30.${prevMonth}.21, 16:12`,
      },
      {
        author: getUser(117234),
        commentBody:
          'Angular has its drawbacks and good points. It is a tool. I feel sorry for people who do not know how to choose a tool for a specific task.',
        time: `30.${prevMonth}.21, 17:35`,
      },
    ],
  },
  {
    title:
      '3 Science Just Confirmed Elon Musk’s Favorite Interview Question Is Brilliant',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: `<p>Every entrepreneur and hiring manager goes into a job interview looking to hire the best person for the job. The problem is research shows they generally fail spectacularly. One Yale professor has even called job interviews as they’re usually conducted “useless.”
The problem isn’t bad intentions. It’s human fallibility. Study after study confirms most bosses just can’t seem to stop themselves from being taken in by overconfident blowhards.
Is there a way to get better at sniffing out BS or even flat-out lying in job interviews (or any other context)? A new study has uncovered a simple, research-validated technique, and funnily enough, it’s exactly how Tesla and SpaceX boss Elon Musk has been interviewing job candidates for years.
No polygraph required.
As psychologist Cody Porter explained in a recent piece for The Conversation, the method was developed for law enforcement and designed as an alternative to the notoriously unreliable lie detector tests you’ve seen on TV cop shows. Instead of hooking up suspects to a stress-measuring machine, Porter and her collaborators suggest a particular interview technique to sniff out liars.
That’s handy for bosses, as you probably don’t have a polygraph laying around the office. Given that the new approach just boils down to a different way of asking questions, there is no reason it couldn’t be adapted easily to a professional context.
Porter’s method is based on a simple observation about liars — they don’t like to get into specifics because they know they are more likely to get caught out if they do. True tellers, on the other hand, are happy to get into the nitty gritty with you. You can leverage this truth to your advantage with the new technique, which goes by the fancy name of asymmetric information management (AIM).
“Essentially, the AIM method involves informing suspects of these facts,” Porter explains. “Specifically, interviewers make it clear to interviewees that if they provide longer, more detailed statements about the event of interest, then the investigator will be better able to detect if they are telling the truth or lying. For truth-tellers, this is good news. For liars, this is less good news.”
Research shows that when you tell a suspect that more details are better, truth tellers rush to discuss the minutiae of the case. Liars try to stick to generalities, offering as few specifics as they can get away with. And the difference is easy to spot. In one experiment, interviewers’ ability to spot a liar jumped from 48 percent (the same as blind chance) to 81 percent of the time when they started using the AIM technique.
Elon Musk already knew that.
That huge jump in BS-detection rates might come as a happy surprise to many cops, but one person it likely wouldn’t shock is Elon Musk. He told the World Government Summit back in 2017 that he always uses the same approach to interviewing, asking every candidate, “Tell me about some of the most difficult problems you worked on and how you solved them.”
Musk goes on to explain that “the people who really solved the problem, they know exactly how they solved it, they know the little details.” In other words, Musk long ago intuitively grasped the truth behind Porter’s research — genuinely skilled (if sometimes socially awkward) truth tellers will be thrilled to get into the weeds with you. Those who skate by on charisma can’t do the same.
So if you want your next job interview to be significantly better than useless, follow Musk’s lead and borrow this trick to cut through the BS. Research shows it works for the police. Musk’s endorsement suggests it’s equally useful for hiring.</p>`,
    img: 'https://picsum.photos/id/214/800/450',
    id: 16422,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: 'This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: `<p>Let me tell you about this obscure package, which generated over 700 thousand downloads in the past year.
The package name is - and it does literally nothing. It contains the usual empty boilerplate. And yet, people are still downloading it for their projects. I couldn’t wrap my head around it, so I did a little bit of digging.
In this story, I’ll share what I found out.
Why Are People Downloading It?
As hard as it is to believe, the people are actually downloading this package. And the number of downloads is rising each month. The following graph illustrates the number of downloads since the package was published on npm.
the graph showing number of downloads of -
Number of downloads per month (source: npm-stat)
But if this comes as a surprise to you, wait until I tell you the even crazier part. It’s used as a dependency of over 60 npm packages. I am sensing there will be some readers who will question this statement.
I went ahead and took a screenshot directly from npm. But if you still think I’m just a Photoshop master, you can check it out for yourself.
dependants of - package
Number of dependents (source: npm)
At first, I thought that’s why it has so many downloads. And I bet you’re thinking about it as well. But it’s so far from the truth. In fact, all these packages have only a few downloads.
While they could generate a couple of extra downloads, it’s nowhere near the final number. So where are all the downloads coming from? That’s the final piece of the puzzle, which I’m gonna reveal to you in just a moment.
What if I tell you, you downloaded it into your project as well. And it happened without you even knowing about it. Maybe it’s sitting quietly in your package.json right now. And you have no idea about it. Maybe you’re one of the 700,000.
But how did it end up there?
We all know in order to install the npm package, we need to run one of the following commands. Or in fact, many of its variations.
npm i package
# or
npm install --save package
# or 
npm i -g package
Because you and I are humans, we tend to do mistakes. Sometimes you press the spacebar too early, sometimes you forgot one letter. Or if you’re like me, sometimes you end up writing something completely different. The point is, it’s very easy to make a typo. Notice the space between - and g.
npm i - g package
This is one example of how you can install - into your project.
I was very curious to try this on my system. I couldn’t see how this can result in something else than an error. But you can imagine my surprise when the command finished successfully. I had 3 new additions to my project. Their names were - g and package.
As you’re probably guessing. The high number of downloads is a result of user typos. By making a silly mistake in the npm command. You can end up with packages you don’t want. The same as I end up with my 3 friends. Needless to say, our friendship didn’t last long.
Now that you know what’s the reason behind all the downloads. Let’s examine the package further. Does it really do nothing? And what does the author have to say about it?
What’s Inside the Package?
I took the time and looked at the source code of the package myself. But quickly, I encountered a small problem. Have you ever see an npm package without a Github repository? Today, I found the first one. To this day, I didn’t even know it’s possible.
Anyway, after a couple of minutes of good old detective work. I was able to track the author and his Github profile. Luckily for us, the repository is public. Which makes a lot of sense considering its content.
I found the right repository and was finally able to check it out. I immediately realized, this package is about as useful as nipples on a man. Apart from config files. There is only one index.ts file inside the src directory. It contains the following code.
export default null;
I know it’s not much. But as my colleague used to say, “The less you do, the less you break.”
Knowledge meme
GIF by Giphy
I couldn’t help but wonder why was this package created. And as a matter of fact, why was it published? Then the thought crossed my mind. This author is some kind of Sneaky Sneakerson. Trying to be famous in the world of npm.
But we can’t leave that on my guess. We have to investigate further.
Who’s the Author?
As I already mentioned, I was able to track the author down. I bet you’re wondering who’s this mysterious man behind the package. His name is Dmitry Parzhitsky and from the sheer look at his repository, he loves Typescript.
As Dmitry clearly stated in the interview for Bleeping Computer, he didn’t mean to cause any harm to anyone in any way. The idea behind the package was simple. Test if it’s possible to publish a package with a name - to the npm registry.
And it clearly was.
Dmitry also clarified that while the package does nothing as of this moment, he’s planning to extend it, by throwing error messages when people try to install it by accident. While this can sound pointless, it can save you 1kb in bundle size at the end.
Now that we discovered who’s the author. And what was the motivation behind -. It’s clear the package is not causing any harm, and won’t be in the future. But - is not the only package out there. What about others? And is there any security to be considered?
Why It Could Be Dangerous?
Suffice to say, there is nothing right now in - that makes it malicious. However, we should be careful that packages like - don’t accidentally slip into our builds.
There are other examples of single-letter packages. To name a few: i, g, install or s. None of them is dangerous, but there is still a potential risk. What if someone with unpure intentions misuses this naming? You can easily end up with the unwanted dependency just by making a silly typo.
The other problem is that upon installing a package, npm presents a summarized success message. It doesn’t show you what packages were installed. It only shows you the final number. Ending up with an unwanted dependency might be easier thank you think.
Concluding Thoughts
As we’ve learned today, we should make attention when typing npm commands in the terminal. Especially when using flags. It also won’t hurt you to check and audit your package.json from time to time.
I don’t know about you, but when I first heard about this, I immediately looked into my package.json file. The question is, will you?</p>`,
    img: 'https://picsum.photos/id/366/800/450',
    id: 16423,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '4() How to read 700 books at 15 hours. Part 1',
    creationDate: `25.${prevMonth}.21, 15:34`,
    author: getUser(234861),
    body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet porta ipsum. Cras a turpis elit. Nunc dictum nisi id leo varius vulputate. Maecenas placerat, elit eget dignissim elementum, sapien dui tincidunt lectus, ut suscipit magna purus et neque. Praesent ultricies, dui ac malesuada ornare, lacus libero congue mauris, in feugiat arcu lacus eget nisl. Nullam dui enim, varius sed convallis efficitur, fringilla quis sem. Fusce lacinia lacus sed metus vehicula, nec maximus arcu vehicula. In hendrerit, ex in tristique viverra, urna tellus dapibus eros, eu bibendum massa odio ut neque. Phasellus quis ante rutrum arcu sollicitudin sodales. Nullam sed sagittis velit. Sed vel arcu purus. Integer at porttitor orci.
Nulla malesuada consectetur lacus, et fermentum sem suscipit a. Duis aliquet hendrerit egestas. Aenean tempus sem ut vehicula tempor. In pellentesque, nibh vitae fringilla laoreet, nisi purus congue est, ac laoreet mi ex quis quam. In dignissim, ipsum vitae placerat dignissim, ex lacus laoreet justo, congue congue nulla nibh dictum enim. Donec cursus suscipit dui vel maximus. Integer non lacinia nisl, et porta enim. Pellentesque eu risus eget risus tempus luctus. Sed felis diam, fermentum at imperdiet at, venenatis ac velit. Aliquam varius justo eu magna varius fringilla. Donec elementum turpis nec enim imperdiet, vel aliquet turpis dignissim. Curabitur mauris felis, condimentum eget mauris sed, tempor condimentum augue. Fusce ut venenatis arcu. Etiam pharetra tincidunt eros, sit amet dictum magna dignissim vel. Praesent varius mi ut quam suscipit, non scelerisque purus accumsan.
Integer sed nibh non nulla fringilla suscipit et nec dui. Curabitur ac ex nec tellus condimentum lacinia. Phasellus non mi ut justo suscipit laoreet. Sed hendrerit elit vitae erat interdum semper. Nullam a lorem eget enim interdum pulvinar. Etiam dui nisi, dictum at malesuada sit amet, blandit eget arcu. Maecenas dictum vel ex non efficitur. Curabitur sed diam vitae sem dictum gravida quis id metus. Nam rutrum hendrerit lectus non volutpat. Proin sit amet lacus ac neque vehicula aliquam vel vel tellus. Nulla tristique, metus et gravida mollis, leo odio malesuada nunc, at rutrum dui sem nec turpis. Aenean rutrum mauris sed pretium ultrices. Vivamus eu mattis lacus. Nunc et massa dui. Phasellus sed magna nisl. Nunc condimentum posuere condimentum.
Quisque egestas vel augue quis ornare. Nunc elit eros, pellentesque ac scelerisque et, suscipit nec urna. Pellentesque cursus id est eu venenatis. Suspendisse at tempus enim. Ut finibus fringilla magna, egestas posuere ipsum scelerisque eu. Integer a enim sit amet tellus malesuada molestie. Morbi cursus facilisis nisl, id porttitor metus. Quisque luctus a velit in finibus. Maecenas condimentum sodales massa vitae dictum.
Ut in neque vel nibh imperdiet vehicula in non ipsum. Sed tincidunt erat a tellus imperdiet facilisis. Vivamus ac purus vel ligula euismod ultrices. Praesent libero leo, tempor ac nisl non, tempor faucibus metus. Duis hendrerit semper purus. Sed congue sollicitudin est eu scelerisque. Nulla sit amet eros vel justo tempus ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam vestibulum leo urna, sed euismod nisi volutpat nec. Praesent et ex feugiat, commodo nisi non, luctus massa. Donec quis condimentum ante, vel sollicitudin felis. Nulla facilisi.</p>`,
    img: 'https://picsum.photos/id/155/800/450',
    id: 210331,
    tags: ['Books', 'JavaScript', 'Math'],
    comments: [
      {
        author: getUser(341445),
        commentBody: 'Yes!',
        time: `25.${prevMonth}.21, 16:12`,
      },
      {
        author: getUser(147511),
        commentBody: 'No! It`s impossible! u are crazy!)',
        time: `26.${prevMonth}.21, 18:32`,
      },
      {
        author: getUser(117234),
        commentBody: 'How are you do this?)',
        time: `27.${prevMonth}.21, 18:32`,
      },
    ],
  },
  {
    title: '5 Angular is Costing Companies Billions',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(341445),
    body: `<p>I know I’m going to get hate-mail for writing this piece, but, so be it. Someone has got to finally say what many of us as experienced software engineers have been thinking for some time now.
I’ve been a developer for over 20 years working for some of North America’s most prestigious companies. For several years now I’ve been watching the state of UI and how it’s gone from bad to worse. Specifically, I’m talking about “fad-tech”, those cutesy not-so-little pieces of JS and CSS that are supposed to be all the rage with the newbie crowd and now even with some seasoned engineers who should know better.
The snowballing culture of using these frameworks, like Angular, have avalanched us into code hell with no end in sight of when this nonsense is ever going to level off.
Everyday I see job postings come into my email, companies of all sizes scrambling for EXPERIENCED Angular 4, 5, 6, 7, 8, 10, 12 developers with at least 5 years of experience building and maintaining this mess we call “state-of-the-art” UI.
It’s not “state-of-the-art”. It’s a mess.
Several years ago I had an interview with EA (Electronic Arts) during which I was told that the company was junking all of their UI frameworks and returning to simply writing plain vanilla ECMA (JavaScript) enclosures. (That would be JS “plugins” for us jQuery people.) I was surprised but also curious.
Now the rest of us know why.
Keep It Stupid-Simple
I don’t like calling people “stupid”, so I’ve sort of rearranged the classic KISS acronym. But the KISS principle has been utterly lost with the latest versions of Angular. It’s no longer just a UI framework, but a backend service as well. Your UI people are now having to write backend code that goes beyond mere HTML templating. Some people would like to say that is a good thing! But it’s not.
Yes, Angular has some cool “whiz-bang” features—ALL of which are completely unnecessary to write effective and stunning UI or deliver a professional UX.
SPA’s (single-page applications) are out. They are difficult to maintain and wreak havoc with analytics and search engine crawlers which rely on the URL actually changing.
Yes, there are work arounds for these issues, but THAT’S THE POINT! You shouldn’t have to write code to “work around” how the web actually works!
Just Say No to UI Compilers
Another “fad-tech” that’s been around a while that also needs to go is Sass and Less. Honestly, I like the code organization that these CSS frameworks offer. What I don’t like are “mixins” and that they need to be compiled to run.
At this point, I don’t know why browsers don’t just natively support SCSS as a standard way to ingest CSS code, but that’s a topic for another time.
The bottom line with these CSS pseudo-languages is that they really don’t save time; they’re not easier to use and learn; and at the end of the day, all they really do is generate nice clean well-targeted CSS code that all of us should be writing natively anyway.
If you want to use Sass or Less and pre-compile them in your own dev environment, I don’t have a problem with that. But what we should never see are these files entering the CICD pipeline for compiling during deployments.
The same goes for any other JavaScript library or framework that eventually compiles to plain vanilla ECMA as well.
Every step you add to the CICD pipeline just gums up and bloats what should be a very simple deployment process. We should be looking for ways to decrease the number of steps in the process, not pile on more just because “Jenkins” allows us to do it.
Angular is Bloating the UI
Call me a UI purist, but the current state of UI is not “art”—it’s a cluster-(expletive omitted). I get that people at Google are bored and need something to do, but Angular and other similar frameworks are destroying the simplicity of the UI, not making it easier.
The point is you don’t need a bloated framework to write clean, elegant UI or build an effective UX. You can use whatever native templating engine your backend provides without bloating the frontend with incomprehensible and un-debuggable compiled JS.
Angular is Costing Companies Billions
At the end of the day, a framework is supposed to make coding easier, not harder. It’s supposed to save companies money with that ease of use, not cost them more.
But this is exactly what is happening—Angular is expensive to run.
Unfortunately, Angular (and other UI frameworks as well) cost companies more money, lots of money, to train and re-train employees to learn and re-learn a framework that keeps changing versions every year or so. Yes, Angular has now promised that all new versions will be backward compatible, but again, that is just going to add to the already bloated complexity when the next new “really cool” component needs to change everything again.
And God help you if you’re a contractor who works with several enterprises who are all using different UI frameworks. You now need to learn and know not just 12 different flavors of Angular, but various versions of Vue and React as well that some newbie programmer saddled the company with 4 years ago but has now left to ruin someone else’s technology stack.
It’s time to relegate Angular (and the others) to the junk pile of failed experiments where it belongs.
What Should Replace Angular?
The answer is quite simply—replace it with nothing. Get rid of it entirely. Rip it out and write plain, easy to use and understand JavaScript enclosures.
I’m not opposed to using open source libraries like jQuery, or other UI components, or CSS frameworks like Bootstrap. These can be “included” with one or two lines of code and they actually do make our lives as develoeprs a lot easier!
But if the framework needs Node.js to run, like Tailwind, or you need to train and re-train people to use it because the maintainers keep updating it year after year, that stuff is just costing you money—and for what? It’s “super-cool” to use?
The bottom line is Angular is gumming up the works; it’s costing your company thousands, perhaps tens of thousands, and if you’re a Fortune 1,000 enterprise, it’s likely costing you millions each year in maintenance, updates, training, and lost time just finding experienced people (or people who even want) to support the monstrosity.
Whenever I see a company desperate for UI engineers, invariably now they NEED someone with 3 to 5 years of Angular experience. That’s nonsense. I can build elegant, fully functional UI in less time with plain JS, and without all of the Angular frontend and backend complexity.
JavaScript encloses built with single-minded purposes provide the perfect fit and balance between harnessing the complexities of modern UI while maintaining elegant simplicity within the DOM.
If something breaks in production with an enclosure written in plain JS, it takes seconds to find the problem within any browser’s dev tools, and I don’t need to install or include yet another layer of bloat to tell me how to debug the compiled code.
Conclusion
The Holy Grail of writing code, any code, lies within its simplicity. However, as modern engineers, we’ve all but totally lost sight of that simplicity. We’ve gotten caught up in the fad of whatever shiny new tech has gotten released from which ever fav tech giant or college has shoved in our face as “state-of-the-art”.
Well, Google or whichever university isn’t paying your staffing bills. It’s time CTO’s took charge of the technology stack, deprecated the fad-tech, and returned all of us to rational reasoned UI that is simple, maintainable, and beautiful.</p>`,
    img: 'https://picsum.photos/id/172/800/450',
    id: 124111,
    tags: ['Angular', 'JavaScript', 'UI'],
    comments: [
      {
        author: getUser(234861),
        commentBody: 'Vue.js the best!)',
        time: `30.${prevMonth}.21, 16:12`,
      },
      {
        author: getUser(117234),
        commentBody:
          'Angular has its drawbacks and good points. It is a tool. I feel sorry for people who do not know how to choose a tool for a specific task.',
        time: `30.${prevMonth}.21, 17:35`,
      },
    ],
  },
  {
    title:
      '6 Science Just Confirmed Elon Musk’s Favorite Interview Question Is Brilliant',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: `<p>Every entrepreneur and hiring manager goes into a job interview looking to hire the best person for the job. The problem is research shows they generally fail spectacularly. One Yale professor has even called job interviews as they’re usually conducted “useless.”
The problem isn’t bad intentions. It’s human fallibility. Study after study confirms most bosses just can’t seem to stop themselves from being taken in by overconfident blowhards.
Is there a way to get better at sniffing out BS or even flat-out lying in job interviews (or any other context)? A new study has uncovered a simple, research-validated technique, and funnily enough, it’s exactly how Tesla and SpaceX boss Elon Musk has been interviewing job candidates for years.
No polygraph required.
As psychologist Cody Porter explained in a recent piece for The Conversation, the method was developed for law enforcement and designed as an alternative to the notoriously unreliable lie detector tests you’ve seen on TV cop shows. Instead of hooking up suspects to a stress-measuring machine, Porter and her collaborators suggest a particular interview technique to sniff out liars.
That’s handy for bosses, as you probably don’t have a polygraph laying around the office. Given that the new approach just boils down to a different way of asking questions, there is no reason it couldn’t be adapted easily to a professional context.
Porter’s method is based on a simple observation about liars — they don’t like to get into specifics because they know they are more likely to get caught out if they do. True tellers, on the other hand, are happy to get into the nitty gritty with you. You can leverage this truth to your advantage with the new technique, which goes by the fancy name of asymmetric information management (AIM).
“Essentially, the AIM method involves informing suspects of these facts,” Porter explains. “Specifically, interviewers make it clear to interviewees that if they provide longer, more detailed statements about the event of interest, then the investigator will be better able to detect if they are telling the truth or lying. For truth-tellers, this is good news. For liars, this is less good news.”
Research shows that when you tell a suspect that more details are better, truth tellers rush to discuss the minutiae of the case. Liars try to stick to generalities, offering as few specifics as they can get away with. And the difference is easy to spot. In one experiment, interviewers’ ability to spot a liar jumped from 48 percent (the same as blind chance) to 81 percent of the time when they started using the AIM technique.
Elon Musk already knew that.
That huge jump in BS-detection rates might come as a happy surprise to many cops, but one person it likely wouldn’t shock is Elon Musk. He told the World Government Summit back in 2017 that he always uses the same approach to interviewing, asking every candidate, “Tell me about some of the most difficult problems you worked on and how you solved them.”
Musk goes on to explain that “the people who really solved the problem, they know exactly how they solved it, they know the little details.” In other words, Musk long ago intuitively grasped the truth behind Porter’s research — genuinely skilled (if sometimes socially awkward) truth tellers will be thrilled to get into the weeds with you. Those who skate by on charisma can’t do the same.
So if you want your next job interview to be significantly better than useless, follow Musk’s lead and borrow this trick to cut through the BS. Research shows it works for the police. Musk’s endorsement suggests it’s equally useful for hiring.</p>`,
    img: 'https://picsum.photos/id/214/800/450',
    id: 164212,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '7 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: `<p>Let me tell you about this obscure package, which generated over 700 thousand downloads in the past year.
The package name is - and it does literally nothing. It contains the usual empty boilerplate. And yet, people are still downloading it for their projects. I couldn’t wrap my head around it, so I did a little bit of digging.
In this story, I’ll share what I found out.
Why Are People Downloading It?
As hard as it is to believe, the people are actually downloading this package. And the number of downloads is rising each month. The following graph illustrates the number of downloads since the package was published on npm.
the graph showing number of downloads of -
Number of downloads per month (source: npm-stat)
But if this comes as a surprise to you, wait until I tell you the even crazier part. It’s used as a dependency of over 60 npm packages. I am sensing there will be some readers who will question this statement.
I went ahead and took a screenshot directly from npm. But if you still think I’m just a Photoshop master, you can check it out for yourself.
dependants of - package
Number of dependents (source: npm)
At first, I thought that’s why it has so many downloads. And I bet you’re thinking about it as well. But it’s so far from the truth. In fact, all these packages have only a few downloads.
While they could generate a couple of extra downloads, it’s nowhere near the final number. So where are all the downloads coming from? That’s the final piece of the puzzle, which I’m gonna reveal to you in just a moment.
What if I tell you, you downloaded it into your project as well. And it happened without you even knowing about it. Maybe it’s sitting quietly in your package.json right now. And you have no idea about it. Maybe you’re one of the 700,000.
But how did it end up there?
We all know in order to install the npm package, we need to run one of the following commands. Or in fact, many of its variations.
npm i package
# or
npm install --save package
# or 
npm i -g package
Because you and I are humans, we tend to do mistakes. Sometimes you press the spacebar too early, sometimes you forgot one letter. Or if you’re like me, sometimes you end up writing something completely different. The point is, it’s very easy to make a typo. Notice the space between - and g.
npm i - g package
This is one example of how you can install - into your project.
I was very curious to try this on my system. I couldn’t see how this can result in something else than an error. But you can imagine my surprise when the command finished successfully. I had 3 new additions to my project. Their names were - g and package.
As you’re probably guessing. The high number of downloads is a result of user typos. By making a silly mistake in the npm command. You can end up with packages you don’t want. The same as I end up with my 3 friends. Needless to say, our friendship didn’t last long.
Now that you know what’s the reason behind all the downloads. Let’s examine the package further. Does it really do nothing? And what does the author have to say about it?
What’s Inside the Package?
I took the time and looked at the source code of the package myself. But quickly, I encountered a small problem. Have you ever see an npm package without a Github repository? Today, I found the first one. To this day, I didn’t even know it’s possible.
Anyway, after a couple of minutes of good old detective work. I was able to track the author and his Github profile. Luckily for us, the repository is public. Which makes a lot of sense considering its content.
I found the right repository and was finally able to check it out. I immediately realized, this package is about as useful as nipples on a man. Apart from config files. There is only one index.ts file inside the src directory. It contains the following code.
export default null;
I know it’s not much. But as my colleague used to say, “The less you do, the less you break.”
Knowledge meme
GIF by Giphy
I couldn’t help but wonder why was this package created. And as a matter of fact, why was it published? Then the thought crossed my mind. This author is some kind of Sneaky Sneakerson. Trying to be famous in the world of npm.
But we can’t leave that on my guess. We have to investigate further.
Who’s the Author?
As I already mentioned, I was able to track the author down. I bet you’re wondering who’s this mysterious man behind the package. His name is Dmitry Parzhitsky and from the sheer look at his repository, he loves Typescript.
As Dmitry clearly stated in the interview for Bleeping Computer, he didn’t mean to cause any harm to anyone in any way. The idea behind the package was simple. Test if it’s possible to publish a package with a name - to the npm registry.
And it clearly was.
Dmitry also clarified that while the package does nothing as of this moment, he’s planning to extend it, by throwing error messages when people try to install it by accident. While this can sound pointless, it can save you 1kb in bundle size at the end.
Now that we discovered who’s the author. And what was the motivation behind -. It’s clear the package is not causing any harm, and won’t be in the future. But - is not the only package out there. What about others? And is there any security to be considered?
Why It Could Be Dangerous?
Suffice to say, there is nothing right now in - that makes it malicious. However, we should be careful that packages like - don’t accidentally slip into our builds.
There are other examples of single-letter packages. To name a few: i, g, install or s. None of them is dangerous, but there is still a potential risk. What if someone with unpure intentions misuses this naming? You can easily end up with the unwanted dependency just by making a silly typo.
The other problem is that upon installing a package, npm presents a summarized success message. It doesn’t show you what packages were installed. It only shows you the final number. Ending up with an unwanted dependency might be easier thank you think.
Concluding Thoughts
As we’ve learned today, we should make attention when typing npm commands in the terminal. Especially when using flags. It also won’t hurt you to check and audit your package.json from time to time.
I don’t know about you, but when I first heard about this, I immediately looked into my package.json file. The question is, will you?</p>`,
    img: 'https://picsum.photos/id/366/800/450',
    id: 164231,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '8 How to read 700 books at 15 hours. Part 1',
    creationDate: `25.${prevMonth}.21, 15:34`,
    author: getUser(234861),
    body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet porta ipsum. Cras a turpis elit. Nunc dictum nisi id leo varius vulputate. Maecenas placerat, elit eget dignissim elementum, sapien dui tincidunt lectus, ut suscipit magna purus et neque. Praesent ultricies, dui ac malesuada ornare, lacus libero congue mauris, in feugiat arcu lacus eget nisl. Nullam dui enim, varius sed convallis efficitur, fringilla quis sem. Fusce lacinia lacus sed metus vehicula, nec maximus arcu vehicula. In hendrerit, ex in tristique viverra, urna tellus dapibus eros, eu bibendum massa odio ut neque. Phasellus quis ante rutrum arcu sollicitudin sodales. Nullam sed sagittis velit. Sed vel arcu purus. Integer at porttitor orci.
Nulla malesuada consectetur lacus, et fermentum sem suscipit a. Duis aliquet hendrerit egestas. Aenean tempus sem ut vehicula tempor. In pellentesque, nibh vitae fringilla laoreet, nisi purus congue est, ac laoreet mi ex quis quam. In dignissim, ipsum vitae placerat dignissim, ex lacus laoreet justo, congue congue nulla nibh dictum enim. Donec cursus suscipit dui vel maximus. Integer non lacinia nisl, et porta enim. Pellentesque eu risus eget risus tempus luctus. Sed felis diam, fermentum at imperdiet at, venenatis ac velit. Aliquam varius justo eu magna varius fringilla. Donec elementum turpis nec enim imperdiet, vel aliquet turpis dignissim. Curabitur mauris felis, condimentum eget mauris sed, tempor condimentum augue. Fusce ut venenatis arcu. Etiam pharetra tincidunt eros, sit amet dictum magna dignissim vel. Praesent varius mi ut quam suscipit, non scelerisque purus accumsan.
Integer sed nibh non nulla fringilla suscipit et nec dui. Curabitur ac ex nec tellus condimentum lacinia. Phasellus non mi ut justo suscipit laoreet. Sed hendrerit elit vitae erat interdum semper. Nullam a lorem eget enim interdum pulvinar. Etiam dui nisi, dictum at malesuada sit amet, blandit eget arcu. Maecenas dictum vel ex non efficitur. Curabitur sed diam vitae sem dictum gravida quis id metus. Nam rutrum hendrerit lectus non volutpat. Proin sit amet lacus ac neque vehicula aliquam vel vel tellus. Nulla tristique, metus et gravida mollis, leo odio malesuada nunc, at rutrum dui sem nec turpis. Aenean rutrum mauris sed pretium ultrices. Vivamus eu mattis lacus. Nunc et massa dui. Phasellus sed magna nisl. Nunc condimentum posuere condimentum.
Quisque egestas vel augue quis ornare. Nunc elit eros, pellentesque ac scelerisque et, suscipit nec urna. Pellentesque cursus id est eu venenatis. Suspendisse at tempus enim. Ut finibus fringilla magna, egestas posuere ipsum scelerisque eu. Integer a enim sit amet tellus malesuada molestie. Morbi cursus facilisis nisl, id porttitor metus. Quisque luctus a velit in finibus. Maecenas condimentum sodales massa vitae dictum.
Ut in neque vel nibh imperdiet vehicula in non ipsum. Sed tincidunt erat a tellus imperdiet facilisis. Vivamus ac purus vel ligula euismod ultrices. Praesent libero leo, tempor ac nisl non, tempor faucibus metus. Duis hendrerit semper purus. Sed congue sollicitudin est eu scelerisque. Nulla sit amet eros vel justo tempus ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam vestibulum leo urna, sed euismod nisi volutpat nec. Praesent et ex feugiat, commodo nisi non, luctus massa. Donec quis condimentum ante, vel sollicitudin felis. Nulla facilisi.</p>`,
    img: 'https://picsum.photos/id/155/800/450',
    id: 2103311,
    tags: ['Books', 'JavaScript', 'Math'],
    comments: [
      {
        author: getUser(341445),
        commentBody: 'Yes!',
        time: `25.${prevMonth}.21, 16:12`,
      },
      {
        author: getUser(147511),
        commentBody: 'No! It`s impossible! u are crazy!)',
        time: `26.${prevMonth}.21, 18:32`,
      },
      {
        author: getUser(117234),
        commentBody: 'How are you do this?)',
        time: `27.${prevMonth}.21, 18:32`,
      },
    ],
  },
  {
    title: '9 Angular is Costing Companies Billions',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(341445),
    body: `<p>I know I’m going to get hate-mail for writing this piece, but, so be it. Someone has got to finally say what many of us as experienced software engineers have been thinking for some time now.
I’ve been a developer for over 20 years working for some of North America’s most prestigious companies. For several years now I’ve been watching the state of UI and how it’s gone from bad to worse. Specifically, I’m talking about “fad-tech”, those cutesy not-so-little pieces of JS and CSS that are supposed to be all the rage with the newbie crowd and now even with some seasoned engineers who should know better.
The snowballing culture of using these frameworks, like Angular, have avalanched us into code hell with no end in sight of when this nonsense is ever going to level off.
Everyday I see job postings come into my email, companies of all sizes scrambling for EXPERIENCED Angular 4, 5, 6, 7, 8, 10, 12 developers with at least 5 years of experience building and maintaining this mess we call “state-of-the-art” UI.
It’s not “state-of-the-art”. It’s a mess.
Several years ago I had an interview with EA (Electronic Arts) during which I was told that the company was junking all of their UI frameworks and returning to simply writing plain vanilla ECMA (JavaScript) enclosures. (That would be JS “plugins” for us jQuery people.) I was surprised but also curious.
Now the rest of us know why.
Keep It Stupid-Simple
I don’t like calling people “stupid”, so I’ve sort of rearranged the classic KISS acronym. But the KISS principle has been utterly lost with the latest versions of Angular. It’s no longer just a UI framework, but a backend service as well. Your UI people are now having to write backend code that goes beyond mere HTML templating. Some people would like to say that is a good thing! But it’s not.
Yes, Angular has some cool “whiz-bang” features—ALL of which are completely unnecessary to write effective and stunning UI or deliver a professional UX.
SPA’s (single-page applications) are out. They are difficult to maintain and wreak havoc with analytics and search engine crawlers which rely on the URL actually changing.
Yes, there are work arounds for these issues, but THAT’S THE POINT! You shouldn’t have to write code to “work around” how the web actually works!
Just Say No to UI Compilers
Another “fad-tech” that’s been around a while that also needs to go is Sass and Less. Honestly, I like the code organization that these CSS frameworks offer. What I don’t like are “mixins” and that they need to be compiled to run.
At this point, I don’t know why browsers don’t just natively support SCSS as a standard way to ingest CSS code, but that’s a topic for another time.
The bottom line with these CSS pseudo-languages is that they really don’t save time; they’re not easier to use and learn; and at the end of the day, all they really do is generate nice clean well-targeted CSS code that all of us should be writing natively anyway.
If you want to use Sass or Less and pre-compile them in your own dev environment, I don’t have a problem with that. But what we should never see are these files entering the CICD pipeline for compiling during deployments.
The same goes for any other JavaScript library or framework that eventually compiles to plain vanilla ECMA as well.
Every step you add to the CICD pipeline just gums up and bloats what should be a very simple deployment process. We should be looking for ways to decrease the number of steps in the process, not pile on more just because “Jenkins” allows us to do it.
Angular is Bloating the UI
Call me a UI purist, but the current state of UI is not “art”—it’s a cluster-(expletive omitted). I get that people at Google are bored and need something to do, but Angular and other similar frameworks are destroying the simplicity of the UI, not making it easier.
The point is you don’t need a bloated framework to write clean, elegant UI or build an effective UX. You can use whatever native templating engine your backend provides without bloating the frontend with incomprehensible and un-debuggable compiled JS.
Angular is Costing Companies Billions
At the end of the day, a framework is supposed to make coding easier, not harder. It’s supposed to save companies money with that ease of use, not cost them more.
But this is exactly what is happening—Angular is expensive to run.
Unfortunately, Angular (and other UI frameworks as well) cost companies more money, lots of money, to train and re-train employees to learn and re-learn a framework that keeps changing versions every year or so. Yes, Angular has now promised that all new versions will be backward compatible, but again, that is just going to add to the already bloated complexity when the next new “really cool” component needs to change everything again.
And God help you if you’re a contractor who works with several enterprises who are all using different UI frameworks. You now need to learn and know not just 12 different flavors of Angular, but various versions of Vue and React as well that some newbie programmer saddled the company with 4 years ago but has now left to ruin someone else’s technology stack.
It’s time to relegate Angular (and the others) to the junk pile of failed experiments where it belongs.
What Should Replace Angular?
The answer is quite simply—replace it with nothing. Get rid of it entirely. Rip it out and write plain, easy to use and understand JavaScript enclosures.
I’m not opposed to using open source libraries like jQuery, or other UI components, or CSS frameworks like Bootstrap. These can be “included” with one or two lines of code and they actually do make our lives as develoeprs a lot easier!
But if the framework needs Node.js to run, like Tailwind, or you need to train and re-train people to use it because the maintainers keep updating it year after year, that stuff is just costing you money—and for what? It’s “super-cool” to use?
The bottom line is Angular is gumming up the works; it’s costing your company thousands, perhaps tens of thousands, and if you’re a Fortune 1,000 enterprise, it’s likely costing you millions each year in maintenance, updates, training, and lost time just finding experienced people (or people who even want) to support the monstrosity.
Whenever I see a company desperate for UI engineers, invariably now they NEED someone with 3 to 5 years of Angular experience. That’s nonsense. I can build elegant, fully functional UI in less time with plain JS, and without all of the Angular frontend and backend complexity.
JavaScript encloses built with single-minded purposes provide the perfect fit and balance between harnessing the complexities of modern UI while maintaining elegant simplicity within the DOM.
If something breaks in production with an enclosure written in plain JS, it takes seconds to find the problem within any browser’s dev tools, and I don’t need to install or include yet another layer of bloat to tell me how to debug the compiled code.
Conclusion
The Holy Grail of writing code, any code, lies within its simplicity. However, as modern engineers, we’ve all but totally lost sight of that simplicity. We’ve gotten caught up in the fad of whatever shiny new tech has gotten released from which ever fav tech giant or college has shoved in our face as “state-of-the-art”.
Well, Google or whichever university isn’t paying your staffing bills. It’s time CTO’s took charge of the technology stack, deprecated the fad-tech, and returned all of us to rational reasoned UI that is simple, maintainable, and beautiful.</p>`,
    img: 'https://picsum.photos/id/172/800/450',
    id: 1241111,
    tags: ['Angular', 'JavaScript', 'UI'],
    comments: [
      {
        author: getUser(234861),
        commentBody: 'Vue.js the best!)',
        time: `30.${prevMonth}.21, 16:12`,
      },
      {
        author: getUser(117234),
        commentBody:
          'Angular has its drawbacks and good points. It is a tool. I feel sorry for people who do not know how to choose a tool for a specific task.',
        time: `30.${prevMonth}.21, 17:35`,
      },
    ],
  },
  {
    title:
      '10 Science Just Confirmed Elon Musk’s Favorite Interview Question Is Brilliant',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: `<p>Every entrepreneur and hiring manager goes into a job interview looking to hire the best person for the job. The problem is research shows they generally fail spectacularly. One Yale professor has even called job interviews as they’re usually conducted “useless.”
The problem isn’t bad intentions. It’s human fallibility. Study after study confirms most bosses just can’t seem to stop themselves from being taken in by overconfident blowhards.
Is there a way to get better at sniffing out BS or even flat-out lying in job interviews (or any other context)? A new study has uncovered a simple, research-validated technique, and funnily enough, it’s exactly how Tesla and SpaceX boss Elon Musk has been interviewing job candidates for years.
No polygraph required.
As psychologist Cody Porter explained in a recent piece for The Conversation, the method was developed for law enforcement and designed as an alternative to the notoriously unreliable lie detector tests you’ve seen on TV cop shows. Instead of hooking up suspects to a stress-measuring machine, Porter and her collaborators suggest a particular interview technique to sniff out liars.
That’s handy for bosses, as you probably don’t have a polygraph laying around the office. Given that the new approach just boils down to a different way of asking questions, there is no reason it couldn’t be adapted easily to a professional context.
Porter’s method is based on a simple observation about liars — they don’t like to get into specifics because they know they are more likely to get caught out if they do. True tellers, on the other hand, are happy to get into the nitty gritty with you. You can leverage this truth to your advantage with the new technique, which goes by the fancy name of asymmetric information management (AIM).
“Essentially, the AIM method involves informing suspects of these facts,” Porter explains. “Specifically, interviewers make it clear to interviewees that if they provide longer, more detailed statements about the event of interest, then the investigator will be better able to detect if they are telling the truth or lying. For truth-tellers, this is good news. For liars, this is less good news.”
Research shows that when you tell a suspect that more details are better, truth tellers rush to discuss the minutiae of the case. Liars try to stick to generalities, offering as few specifics as they can get away with. And the difference is easy to spot. In one experiment, interviewers’ ability to spot a liar jumped from 48 percent (the same as blind chance) to 81 percent of the time when they started using the AIM technique.
Elon Musk already knew that.
That huge jump in BS-detection rates might come as a happy surprise to many cops, but one person it likely wouldn’t shock is Elon Musk. He told the World Government Summit back in 2017 that he always uses the same approach to interviewing, asking every candidate, “Tell me about some of the most difficult problems you worked on and how you solved them.”
Musk goes on to explain that “the people who really solved the problem, they know exactly how they solved it, they know the little details.” In other words, Musk long ago intuitively grasped the truth behind Porter’s research — genuinely skilled (if sometimes socially awkward) truth tellers will be thrilled to get into the weeds with you. Those who skate by on charisma can’t do the same.
So if you want your next job interview to be significantly better than useless, follow Musk’s lead and borrow this trick to cut through the BS. Research shows it works for the police. Musk’s endorsement suggests it’s equally useful for hiring.</p>`,
    img: 'https://picsum.photos/id/214/800/450',
    id: 1642121,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '11 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: `<p>Let me tell you about this obscure package, which generated over 700 thousand downloads in the past year.
The package name is - and it does literally nothing. It contains the usual empty boilerplate. And yet, people are still downloading it for their projects. I couldn’t wrap my head around it, so I did a little bit of digging.
In this story, I’ll share what I found out.
Why Are People Downloading It?
As hard as it is to believe, the people are actually downloading this package. And the number of downloads is rising each month. The following graph illustrates the number of downloads since the package was published on npm.
the graph showing number of downloads of -
Number of downloads per month (source: npm-stat)
But if this comes as a surprise to you, wait until I tell you the even crazier part. It’s used as a dependency of over 60 npm packages. I am sensing there will be some readers who will question this statement.
I went ahead and took a screenshot directly from npm. But if you still think I’m just a Photoshop master, you can check it out for yourself.
dependants of — package
Number of dependents (source: npm)
At first, I thought that’s why it has so many downloads. And I bet you’re thinking about it as well. But it’s so far from the truth. In fact, all these packages have only a few downloads.
While they could generate a couple of extra downloads, it’s nowhere near the final number. So where are all the downloads coming from? That’s the final piece of the puzzle, which I’m gonna reveal to you in just a moment.
What if I tell you, you downloaded it into your project as well. And it happened without you even knowing about it. Maybe it’s sitting quietly in your package.json right now. And you have no idea about it. Maybe you’re one of the 700,000.
But how did it end up there?
We all know in order to install the npm package, we need to run one of the following commands. Or in fact, many of its variations.
npm i package
# or
npm install --save package
# or 
npm i -g package
Because you and I are humans, we tend to do mistakes. Sometimes you press the spacebar too early, sometimes you forgot one letter. Or if you’re like me, sometimes you end up writing something completely different. The point is, it’s very easy to make a typo. Notice the space between - and g.
npm i - g package
This is one example of how you can install - into your project.
I was very curious to try this on my system. I couldn’t see how this can result in something else than an error. But you can imagine my surprise when the command finished successfully. I had 3 new additions to my project. Their names were - g and package.
As you’re probably guessing. The high number of downloads is a result of user typos. By making a silly mistake in the npm command. You can end up with packages you don’t want. The same as I end up with my 3 friends. Needless to say, our friendship didn’t last long.
Now that you know what’s the reason behind all the downloads. Let’s examine the package further. Does it really do nothing? And what does the author have to say about it?
What’s Inside the Package?
I took the time and looked at the source code of the package myself. But quickly, I encountered a small problem. Have you ever see an npm package without a Github repository? Today, I found the first one. To this day, I didn’t even know it’s possible.
Anyway, after a couple of minutes of good old detective work. I was able to track the author and his Github profile. Luckily for us, the repository is public. Which makes a lot of sense considering its content.
I found the right repository and was finally able to check it out. I immediately realized, this package is about as useful as nipples on a man. Apart from config files. There is only one index.ts file inside the src directory. It contains the following code.
export default null;
I know it’s not much. But as my colleague used to say, “The less you do, the less you break.”
Knowledge meme
GIF by Giphy
I couldn’t help but wonder why was this package created. And as a matter of fact, why was it published? Then the thought crossed my mind. This author is some kind of Sneaky Sneakerson. Trying to be famous in the world of npm.
But we can’t leave that on my guess. We have to investigate further.
Who’s the Author?
As I already mentioned, I was able to track the author down. I bet you’re wondering who’s this mysterious man behind the package. His name is Dmitry Parzhitsky and from the sheer look at his repository, he loves Typescript.
As Dmitry clearly stated in the interview for Bleeping Computer, he didn’t mean to cause any harm to anyone in any way. The idea behind the package was simple. Test if it’s possible to publish a package with a name - to the npm registry.
And it clearly was.
Dmitry also clarified that while the package does nothing as of this moment, he’s planning to extend it, by throwing error messages when people try to install it by accident. While this can sound pointless, it can save you 1kb in bundle size at the end.
Now that we discovered who’s the author. And what was the motivation behind -. It’s clear the package is not causing any harm, and won’t be in the future. But - is not the only package out there. What about others? And is there any security to be considered?
Why It Could Be Dangerous?
Suffice to say, there is nothing right now in - that makes it malicious. However, we should be careful that packages like - don’t accidentally slip into our builds.
There are other examples of single-letter packages. To name a few: i, g, install or s. None of them is dangerous, but there is still a potential risk. What if someone with unpure intentions misuses this naming? You can easily end up with the unwanted dependency just by making a silly typo.
The other problem is that upon installing a package, npm presents a summarized success message. It doesn’t show you what packages were installed. It only shows you the final number. Ending up with an unwanted dependency might be easier thank you think.
Concluding Thoughts
As we’ve learned today, we should make attention when typing npm commands in the terminal. Especially when using flags. It also won’t hurt you to check and audit your package.json from time to time.
I don’t know about you, but when I first heard about this, I immediately looked into my package.json file. The question is, will you?</p>`,
    img: 'https://picsum.photos/id/366/800/450',
    id: 1642311,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '12 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>12</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 16423111,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '13 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>13</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 23456,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '14 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>14</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 234256,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '15 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>15</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 16423111,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '16 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>16</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 23456,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '17 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>17</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 234256,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '18 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>18</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 234256,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '19 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>19</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 16423111,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '20 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>20</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 23456,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
  {
    title: '21 This Empty NPM Package Has Over 700,000 Downloads',
    creationDate: `30.${prevMonth}.21, 12:22`,
    author: getUser(234861),
    body: '<p>21</p>',
    img: 'https://picsum.photos/id/366/800/450',
    id: 234256,
    tags: ['Elon Musk', 'Science', 'News'],
    comments: [],
  },
];

export default articles;

export function ITERATE_ARTICLES_AND_COMMENTS_AUTHORS(
  articlesDB = articles,
  callback = () => {}
) {
  articlesDB.forEach((article) => {
    callback(article.author);
    article.comments.forEach((comment) => {
      callback(comment);
    });
  });
}
