import React, { useEffect, useRef, useState } from "react";
import { FileCard, Closing, TextLink } from "./ui";
import team from "./photos/2-team.jpg";
import paddles from "./photos/3-paddles.jpg";
import indoor from "./photos/4-indoor.jpg";
import outdoor from "./photos/5-outdoor.jpg";
import community from "./photos/6-community.jpg";
import winners from "./photos/1-7-winners.jpg";
import ncpaBanner from "./photos/2-8-ncpa-banner.jpg";
import interview from "./photos/3-9-interview.jpg";
import groupCourt from "./photos/4-10-group-court.jpg";
import lawn from "./photos/5-11-lawn.jpg";
import gameNight from "./photos/6-12-game-night.jpg";
import friends from "./photos/7-14-friends.jpg";
import roadside from "./photos/8-15-roadside.jpg";
import sunset from "./photos/9-16-sunset.jpg";
import winnersWide from "./photos/10-17-winners-wide.jpg";
import "./style.css";
import logo from "./photos/13-logo.png";
import { CourtScene } from "./CourtScene";
type Photo = { src: string; alt: string; label: string; court: boolean };
const photos: Photo[] = [
  {
    src: winners,
    alt: "Four Husky players holding an NCPA Collegiate Tour bid winner banner",
    label: "Bid winners. The road to Nationals.",
    court: true,
  },
  {
    src: groupCourt,
    alt: "The whole club posing on a pickleball court",
    label: "The whole crew",
    court: true,
  },
  {
    src: lawn,
    alt: "Club members laughing together on a lawn",
    label: "Good company, zero rush",
    court: false,
  },
  {
    src: ncpaBanner,
    alt: "Four club players in front of NCPA and JOOLA banners at a tournament",
    label: "NCPA weekend",
    court: true,
  },
  {
    src: friends,
    alt: "Four club members smiling for a photo indoors",
    label: "Off the court, still a team",
    court: false,
  },
  {
    src: sunset,
    alt: "Pickleball courts at dusk under stadium lights during a tournament",
    label: "Tournament lights",
    court: true,
  },
  {
    src: interview,
    alt: "Club players being interviewed courtside at a tournament",
    label: "Mic on, game faces off",
    court: true,
  },
  {
    src: roadside,
    alt: "Club members laughing in a circle outdoors on a trip",
    label: "Road trip energy",
    court: false,
  },
  {
    src: paddles,
    alt: "Two club players smiling with JOOLA paddles",
    label: "Game faces. Good company.",
    court: true,
  },
  {
    src: gameNight,
    alt: "Club members gathered in a living room",
    label: "Game night",
    court: false,
  },
  {
    src: team,
    alt: "Husky players together at an outdoor pickleball tournament",
    label: "Purple on the road",
    court: true,
  },
  {
    src: community,
    alt: "Club members gathered together on a porch",
    label: "Porch season",
    court: false,
  },
  {
    src: indoor,
    alt: "Club members cheering beside an indoor pickleball court",
    label: "The sideline is part of the team",
    court: true,
  },
  {
    src: outdoor,
    alt: "Players rallying on a tree-lined outdoor court",
    label: "A little fresh air, a lot of rallies",
    court: true,
  },
];
const N = photos.length;
const board = [
  ["Presidents", "Cosmo · Raine · Nick"],
  ["Member of Technical Staff", "Rohan"],
  ["Social media", "Molly · Eric"],
  ["Fundraising", "Melody · Ada · Annabelle"],
  ["External relations", "Jayden"],
  ["Open play coordinator", "Spencer"],
  ["General board members", "Tati"],
];
const tabs = [
  ["Club", "club"],
  ["Play", "play"],
  ["Sponsors", "sponsors"],
  ["Photos", "photos"],
  ["Board", "board"],
  ["Support", "support"],
  ["Contact", "contact"],
];
const tryoutForm =
  "https://docs.google.com/forms/d/e/1FAIpQLSdv2k5x-bVMLG1mjtz4mzIa9k2oYeAvyB79FOkhdiKbbA1yOw/viewform";
const instagram = "https://www.instagram.com/huskypickleballclub/";
export function App() {
  // Navigation, gallery filters, and the full-size photo viewer are local UI state.
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const ball = useRef<HTMLDivElement>(null);
  // Re-observe the gallery whenever a category changes. Reveals work in both scroll directions.
  useEffect(() => {
    const nodes = document.querySelectorAll(".rv");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("in", e.isIntersecting),
        ),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [filter]);
  // Throttle active-section tracking to one calculation per animation frame.
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const y = 220;
      let cur = "";
      for (const [, id] of tabs) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= y) cur = id;
      }
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4)
        cur = "contact";
      setActive(cur);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);
  useEffect(() => {
    if (selected === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setSelected((v) => (v === null ? v : (v + 1) % N));
      if (e.key === "ArrowLeft")
        setSelected((v) => (v === null ? v : (v + N - 1) % N));
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [selected]);
  // Keep the native dialog in sync so its focus and Escape behavior remain intact.
  useEffect(() => {
    if (selected !== null) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenu(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      history.replaceState(null, "", "#" + id);
    });
  };
  const visible = photos
    .map((p, i) => ({ ...p, i }))
    .filter(
      (p) => filter === "All" || (filter === "On court" ? p.court : !p.court),
    );
  return (
    <FileCard>
      <div className="club">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={(e) => go(e, "home")}>
            <img
              className="club-logo"
              src={logo}
              alt="Husky Pickleball Club logo"
            />
            <span>
              HUSKY
              <br />
              PICKLEBALL CLUB
            </span>
          </a>
          <button
            className="menu"
            aria-expanded={menu}
            aria-controls="navlinks"
            onClick={() => setMenu(!menu)}
          >
            {menu ? "Close" : "Menu"} <span>☰</span>
          </button>
          <div id="navlinks" className={"navlinks " + (menu ? "open" : "")}>
            {tabs.map(([name, id]) => (
              <a
                key={id}
                className={active === id ? "active" : ""}
                aria-current={active === id ? "location" : undefined}
                href={"#" + id}
                onClick={(e) => go(e, id)}
              >
                {name}
              </a>
            ))}
            <a
              className="navcta"
              href="#contact"
              onClick={(e) => go(e, "contact")}
            >
              Get in touch
            </a>
          </div>
        </nav>
        <section id="home" className="hero">
          <div className="hero-topline">
            <span>UNIVERSITY OF WASHINGTON</span>
            <span>SEATTLE, WA</span>
          </div>
          <div className="hero-type">
            <p className="eyebrow">
              <span className="tinyball">✳</span> YOUR NEXT GOOD GAME STARTS
              HERE
            </p>
            <h1>
              More than
              <br />a <em>good rally.</em>
            </h1>
            <p className="hero-description">
              A little competition. A lot of community.
              <br />
              Pickleball, the Husky way.
            </p>
            <div className="actions">
              <a
                className="btn gold"
                href="#play"
                onClick={(e) => go(e, "play")}
              >
                Find your court <span>↗</span>
              </a>
              <a
                className="underlink"
                href="#club"
                onClick={(e) => go(e, "club")}
              >
                Meet the club ↓
              </a>
            </div>
          </div>
          <CourtScene />
          <div className="hero-bottom">
            <span>COMPETE. CONNECT. COME AS YOU ARE.</span>
            <span>SCROLL FOR THE GOOD STUFF ↓</span>
          </div>
        </section>
        <div className="filmstrip">
          <div className="rv">
            <span className="eyebrow">ON COURT / OFF COURT</span>
            <p>
              Same team.
              <br />
              <em>Different moments.</em>
            </p>
          </div>
          <img className="rv" src={winners} alt={photos[0].alt} />
          <img className="rv" src={lawn} alt={photos[2].alt} />
          <img className="rv" src={friends} alt={photos[4].alt} />
        </div>
        <section id="club" className="section intro">
          <div className="intro-left">
            <p className="eyebrow rv">01 / THE CLUB</p>
            <h2 className="rv">
              Built for the game.
              <br />
              <em>Made for each other.</em>
            </h2>
            <ol className="pillars">
              <li className="rv">
                <b>01</b>
                <div>
                  <h3>Competition</h3>
                  <p>
                    A travel team that competes in the NCPA and represents UW.
                  </p>
                </div>
              </li>
              <li className="rv">
                <b>02</b>
                <div>
                  <h3>Community</h3>
                  <p>Monthly open plays that bring the whole club together.</p>
                </div>
              </li>
              <li className="rv">
                <b>03</b>
                <div>
                  <h3>Connection</h3>
                  <p>
                    New friends, familiar faces, and a reason to keep showing
                    up.
                  </p>
                </div>
              </li>
            </ol>
            <figure className="intro-tall rv">
              <img src={sunset} alt={photos[5].alt} loading="lazy" />
              <figcaption>TOURNAMENT LIGHTS</figcaption>
            </figure>
          </div>
          <div className="intro-right">
            <p className="lead rv">
              We bring competition and a fun, social atmosphere together.
            </p>
            <p className="rv">
              Our club connects pickleball lovers on and off the court, with a
              competitive travel team and a larger social team that comes
              together for monthly open plays. Whether you're chasing the next
              tournament or your next favorite rally, there's a place to
              connect.
            </p>
            <div className="intro-photo rv">
              <img
                src={winnersWide}
                alt="Four club players holding an NCPA Collegiate Tour bid winner banner on court"
                loading="lazy"
              />
              <span>ONE CLUB. EVERY KIND OF PLAYER.</span>
            </div>
            <div className="intro-duo">
              <img
                className="rv"
                src={groupCourt}
                alt={photos[1].alt}
                loading="lazy"
              />
              <img
                className="rv"
                src={lawn}
                alt={photos[2].alt}
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <section id="play" className="section">
          <div className="sectionhead rv">
            <div>
              <p className="eyebrow">02 / FIND YOUR COURT</p>
              <h2>
                Two ways to play.
                <br />
                One Husky community.
              </h2>
            </div>
            <span className="smallnote">
              Come for the game.
              <br />
              Stay for the people.
            </span>
          </div>
          <div className="playgrid">
            <article className="playcard competitive rv">
              <img className="play-bg" src={indoor} alt="" />
              <span className="cardnumber">01</span>
              <h3>The travel team</h3>
              <p>
                For players ready to compete and represent UW on the collegiate
                stage.
              </p>
              <div className="event">
                <span className="eyebrow">TRYOUTS</span>
                <strong>October 11</strong>
                <span>IMA Gym B · 8-10 PM</span>
                <small>
                  Fill out the short form to be considered.
                  <br />
                  Questions? Message us on Instagram.
                </small>
              </div>
              <div className="cardactions">
                <a
                  className="btn gold"
                  href={tryoutForm}
                  target="_blank"
                  rel="noreferrer"
                >
                  Sign up for tryouts ↗
                </a>
                <a
                  className="underlink"
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask a question
                </a>
              </div>
            </article>
            <article className="playcard social rv">
              <img className="play-bg" src={outdoor} alt="" />
              <span className="cardnumber">02</span>
              <h3>The social team</h3>
              <p>
                Monthly open plays that bring our larger club community
                together. Good games, familiar faces, and room to connect.
              </p>
              <div className="event">
                <span className="eyebrow">OPEN PLAY</span>
                <strong>
                  Next session?
                  <br />
                  Stay in the loop.
                </strong>
                <small>
                  The open play schedule is on its way.
                  <br />
                  Check Instagram for club updates.
                </small>
              </div>
              <a
                className="btn outline"
                href={instagram}
                target="_blank"
                rel="noreferrer"
              >
                Follow club updates ↗
              </a>
            </article>
          </div>
        </section>
        <section id="sponsors" className="section sponsors">
          <div className="sectionhead rv">
            <div>
              <p className="eyebrow">THIS SEASON'S SPONSORS</p>
              <h2>
                Backed by people
                <br />
                <em>who love the game.</em>
              </h2>
            </div>
          </div>
          <div className="sponsorgrid">
            <article className="sponsorcard rv">
              <span className="eyebrow">EQUIPMENT PARTNER</span>
              <div className="sponsorword">JOOLA</div>
              <p className="sp-lead">Inclusion. Innovation. Inspiration.</p>
              <p>
                Supported by the JOOLA Pickleball line, we're building an
                inclusive, welcoming community in the pickleball world.
              </p>
            </article>
            <article className="sponsorcard picklr rv">
              <span className="eyebrow">HOME COURT PARTNER</span>
              <div className="sponsorword">THE PICKLR</div>
              <p className="sp-lead">Fremont · Seattle</p>
              <p>
                An indoor pickleball club with 10 dedicated courts, open daily
                at 124 N 35th St in Seattle's Fremont neighborhood.
              </p>
              <a
                className="btn gold"
                href="https://thepicklr.com/location/fremont/"
                target="_blank"
                rel="noreferrer"
              >
                See The Picklr Fremont <span>↗</span>
              </a>
            </article>
          </div>
        </section>
        <section id="photos" className="section">
          <div className="sectionhead rv">
            <div>
              <p className="eyebrow">03 / CLUB LIFE</p>
              <h2>This is our kind of court.</h2>
            </div>
            <div className="filters" aria-label="Photo categories">
              {["All", "On court", "Off court"].map((v) => (
                <button
                  key={v}
                  aria-pressed={filter === v}
                  className={filter === v ? "active" : ""}
                  onClick={() => setFilter(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="gallery">
            {visible.map((p) => (
              <button
                key={p.i}
                className={"photocard rv"}
                onClick={() => setSelected(p.i)}
              >
                <img src={p.src} alt={p.alt} loading="lazy" />
                <span>
                  {p.label}
                  <b>↗</b>
                </span>
              </button>
            ))}
          </div>
          <p className="photofoot rv">
            Photos from the club. Tap a photo for the full view.
          </p>
        </section>
        <section id="board" className="section boardsection">
          <p className="eyebrow rv">04 / THE PEOPLE BEHIND THE PLAY</p>
          <h2 className="rv">Meet the board.</h2>
          <div className="boardgrid">
            {board.map(([role, names]) => (
              <article className="rv" key={role}>
                <span>{role}</span>
                <h3>{names}</h3>
              </article>
            ))}
          </div>
        </section>
        <section id="support" className="section support">
          <div className="rv">
            <p className="eyebrow">05 / BACK THE HUSKIES</p>
            <h2>
              Help us take
              <br />
              our game further.
            </h2>
            <p>
              If you'd like to support the UW team's competition in the NCPA,
              you can find us on Venmo at <strong>@HuskyPickleball</strong>.
            </p>
            <a
              className="btn purple"
              href="https://venmo.com/HuskyPickleball"
              target="_blank"
              rel="noreferrer"
            >
              Support on Venmo ↗
            </a>
            <small>Opens our Venmo profile. No payment is made here.</small>
          </div>
          <div className="resources rv">
            <h3>Follow the collegiate game.</h3>
            <p>Tournaments, rankings, and the road to nationals.</p>
            <TextLink href="https://ncpaofficial.com/">
              Explore the NCPA
            </TextLink>
          </div>
        </section>
        <section id="contact" className="section contactsec">
          <div className="sectionhead rv">
            <div>
              <p className="eyebrow">06 / CONTACT US</p>
              <h2>
                Let's talk
                <br />
                <em>pickleball.</em>
              </h2>
            </div>
            <span className="smallnote">
              Questions about the club, tryouts,
              <br />
              or supporting the team?
            </span>
          </div>
          <div className="contactgrid">
            <a
              className="contactcard rv"
              href={instagram}
              target="_blank"
              rel="noreferrer"
            >
              <span className="eyebrow">INSTAGRAM</span>
              <strong>@huskypickleballclub</strong>
              <b>↗</b>
            </a>
            <a className="contactcard rv" href="mailto:thawaniroh000@gmail.com">
              <span className="eyebrow">EMAIL</span>
              <strong>thawaniroh000@gmail.com</strong>
              <b>↗</b>
            </a>
            <a className="contactcard rv" href="tel:+13609916943">
              <span className="eyebrow">PHONE</span>
              <strong>360-991-6943</strong>
              <b>↗</b>
            </a>
          </div>
        </section>
        <footer className="clubfooter">
          <a className="brand" href="#home" onClick={(e) => go(e, "home")}>
            <img className="club-logo" src={logo} alt="" />
            HUSKY PICKLEBALL CLUB ↗
          </a>
          <span>University of Washington · Seattle</span>
          <a href="#home" onClick={(e) => go(e, "home")}>
            Back to top ↑
          </a>
        </footer>
        <Closing>
          Open play schedule coming soon. Follow @huskypickleballclub for
          updates.
        </Closing>
        <dialog
          ref={dialog}
          onCancel={() => setSelected(null)}
          onClick={(e) => {
            if (e.target === dialog.current) setSelected(null);
          }}
        >
          <button
            className="closephoto"
            onClick={() => setSelected(null)}
            aria-label="Close photo"
          >
            Close ×
          </button>
          {selected !== null && (
            <>
              <img src={photos[selected].src} alt={photos[selected].alt} />
              <p>{photos[selected].label}</p>
              <div className="photoarrows">
                <button onClick={() => setSelected((selected + N - 1) % N)}>
                  ← Previous
                </button>
                <button onClick={() => setSelected((selected + 1) % N)}>
                  Next →
                </button>
              </div>
            </>
          )}
        </dialog>
      </div>
    </FileCard>
  );
}

